import { resolve } from "path";
import { generateApi } from "swagger-typescript-api";
import process from "process";
import { codegen } from "swagger-axios-codegen";
import fs from "fs";

// Функция для автоматического определения контроллеров из swagger.json
function getControllersFromSwagger(swaggerSource) {
  const controllers = new Set();
  
  Object.keys(swaggerSource.paths).forEach(path => {
    const match = path.match(/^\/api\/([^\/]+)/);
    if (match) {
      controllers.add(match[1]);
    }
  });
  
  return Array.from(controllers);
}

// Функция для автоматического определения SignalR хабов из swagger.json
function getSignalRHubsFromSwagger(swaggerSource) {
  const hubs = new Set();
  
  // Ищем в тегах
  if (swaggerSource.tags) {
    swaggerSource.tags.forEach(tag => {
      if (tag.name && tag.name.toLowerCase().includes('hub')) {
        hubs.add(tag.name);
      }
    });
  }
  
  // Ищем в путях
  Object.keys(swaggerSource.paths).forEach(path => {
    const match = path.match(/\/api\/([^\/]+)/);
    if (match && match[1].toLowerCase().includes('hub')) {
      hubs.add(match[1]);
    }
  });
  
  return Array.from(hubs);
}

// Определяем контроллеры и хабы динамически
let CONTROLLERS = [];
let SIGNALR_HUBS = [];

const OUTPUT_DIR = resolve(process.cwd(), "./src/shared/api/generated/");

// Создаем директории если их нет
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Функция для генерации типов
async function generateTypes() {
  const params = {
    input: resolve(process.cwd(), "./api/swagger.json"),
    output: OUTPUT_DIR,
    name: "Api.ts",
    cleanOutput: false,
    prettier: {
      trailingComma: "all",
      tabWidth: 4,
      printWidth: 160,
    },
    generateClient: true, // Генерируем клиент с методами
    sortTypes: true,
    extractEnums: true,
    codeGenConstructs: (constructs) => ({
      ...constructs,
      NullValue: () => "undefined",
      TypeField: ({ readonly, key, value }) => {
        const finalValue = value.includes(" | null")
          ? value.replace(" | null", " | undefined")
          : value;
        return [...(readonly ? ["readonly "] : []), key, ": ", finalValue].join("");
      },
    }),
  };

  await generateApi(params);
  
  // Копируем содержимое в types.ts (только типы)
  const apiPath = resolve(OUTPUT_DIR, "Api.ts");
  const typesPath = resolve(OUTPUT_DIR, "types.ts");
  if (fs.existsSync(apiPath)) {
    const content = fs.readFileSync(apiPath, "utf-8");
    // Извлекаем только типы (до класса Api)
    const typesMatch = content.match(/(.*?)(export class Api)/s);
    if (typesMatch) {
      fs.writeFileSync(typesPath, typesMatch[1]);
    } else {
      fs.writeFileSync(typesPath, content);
    }
  }
  
  console.log("✅ Типы сгенерированы в types.ts");
}

// Функция для генерации SignalR типов
async function generateSignalRTypes() {
  const params = {
    input: resolve(process.cwd(), "./api/swagger.json"),
    output: OUTPUT_DIR,
    name: "SignalRApi.ts",
    cleanOutput: false,
    prettier: {
      trailingComma: "all",
      tabWidth: 4,
      printWidth: 160,
    },
    generateClient: false,
    sortTypes: true,
    extractEnums: true,
    templates: resolve(process.cwd(), "./api/signalr-templates"), // Можно добавить кастомные шаблоны
    codeGenConstructs: (constructs) => ({
      ...constructs,
      NullValue: () => "undefined",
      TypeField: ({ readonly, key, value }) => {
        const finalValue = value.includes(" | null")
          ? value.replace(" | null", " | undefined")
          : value;
        return [...(readonly ? ["readonly "] : []), key, ": ", finalValue].join("");
      },
    }),
  };

  await generateApi(params);
  
  // Копируем содержимое в signalr_types.ts
  const signalrApiPath = resolve(OUTPUT_DIR, "SignalRApi.ts");
  const signalrTypesPath = resolve(OUTPUT_DIR, "signalr_types.ts");
  if (fs.existsSync(signalrApiPath)) {
    const content = fs.readFileSync(signalrApiPath, "utf-8");
    fs.writeFileSync(signalrTypesPath, content);
    // Удаляем временный файл
    fs.unlinkSync(signalrApiPath);
  }
  
  console.log("✅ SignalR типы сгенерированы в signalr_types.ts");
}

// Функция для генерации клиентов по контроллерам
async function generateControllerClients() {
  for (const controller of CONTROLLERS) {
    // Создаем простую обертку над основным клиентом
    const controllerContent = `// Клиент для контроллера ${controller}
import { HttpClient } from './types';

// Экспортируем только методы для этого контроллера
export class ${controller}Service {
  private httpClient: HttpClient;

  constructor(baseURL?: string) {
    this.httpClient = new HttpClient({ baseUrl: baseURL });
  }

  // Методы будут добавлены вручную или через другой генератор
  // Пока что используем основной клиент
  getHttpClient() {
    return this.httpClient;
  }
}
`;

    fs.writeFileSync(resolve(OUTPUT_DIR, `${controller.toLowerCase()}-client.ts`), controllerContent);
    console.log(`✅ Клиент для ${controller} создан в ${controller.toLowerCase()}-client.ts`);
  }
}

// Функция для генерации SignalR клиентов
async function generateSignalRClients() {
  for (const hub of SIGNALR_HUBS) {
    // Создаем простую обертку для SignalR хаба
    const hubContent = `// SignalR клиент для ${hub}
import { HttpClient } from './types';

// Экспортируем только методы для этого хаба
export class ${hub}Service {
  private httpClient: HttpClient;

  constructor(baseURL?: string) {
    this.httpClient = new HttpClient({ baseUrl: baseURL });
  }

  // SignalR методы будут добавлены вручную или через другой генератор
  // Пока что используем основной клиент
  getHttpClient() {
    return this.httpClient;
  }
}
`;

    fs.writeFileSync(resolve(OUTPUT_DIR, `${hub.toLowerCase()}-client.ts`), hubContent);
    console.log(`✅ SignalR клиент для ${hub} создан в ${hub.toLowerCase()}-client.ts`);
  }
}

// Функция для генерации основного axios клиента (для обратной совместимости)
async function generateMainAxiosClient() {
  const swaggerJsonPath = resolve(process.cwd(), "./api/swagger.json");
  const swaggerSource = JSON.parse(fs.readFileSync(swaggerJsonPath, "utf-8"));

  await codegen({
    methodNameMode: "operationId",
    source: swaggerSource,
    outputDir: OUTPUT_DIR,
    fileName: "axios-client.ts",
    useStaticMethod: true,
    modelMode: "interface",
    strictNullChecks: true,
    prettier: {
      trailingComma: "all",
      tabWidth: 4,
      printWidth: 160,
    },
  });

  console.log("✅ Основной axios клиент сгенерирован в axios-client.ts");
}

// Функция для создания индексного файла
function createIndexFile() {
  const indexContent = `// Автоматически сгенерированный индексный файл
// Импорты типов
export * from './types';
export * from './signalr_types';

// Импорты клиентов контроллеров
${CONTROLLERS.map(controller => `export { ${controller}Service } from './${controller.toLowerCase()}-client';`).join('\n')}

// Импорты SignalR клиентов
${SIGNALR_HUBS.map(hub => `export { ${hub}Service } from './${hub.toLowerCase()}-client';`).join('\n')}

// Основной HTTP клиент (для обратной совместимости)
export { HttpClient } from './types';
`;

  fs.writeFileSync(resolve(OUTPUT_DIR, 'index.ts'), indexContent);
  console.log("✅ Индексный файл создан");
}

// Основная функция
async function main() {
  try {
    console.log("🚀 Начинаем генерацию API...");
    
    // Читаем swagger.json для определения контроллеров и хабов
    const swaggerJsonPath = resolve(process.cwd(), "./api/swagger.json");
    const swaggerSource = JSON.parse(fs.readFileSync(swaggerJsonPath, "utf-8"));
    
    // Определяем контроллеры и хабы
    CONTROLLERS = getControllersFromSwagger(swaggerSource);
    SIGNALR_HUBS = getSignalRHubsFromSwagger(swaggerSource);
    
    console.log(`📋 Найдено контроллеров: ${CONTROLLERS.join(', ')}`);
    console.log(`📋 Найдено SignalR хабов: ${SIGNALR_HUBS.join(', ')}`);
    
    // Генерируем типы
    await generateTypes();
    
    // Генерируем SignalR типы
    await generateSignalRTypes();
    
    // Генерируем основной axios клиент (для обратной совместимости)
    await generateMainAxiosClient();
    
    // Генерируем клиенты для каждого контроллера
    await generateControllerClients();
    
    // Генерируем SignalR клиенты
    await generateSignalRClients();
    
    // Создаем индексный файл
    createIndexFile();
    
    console.log("🎉 Генерация API завершена успешно!");
  } catch (error) {
    console.error("❌ Ошибка при генерации API:", error);
    process.exit(1);
  }
}

// Запускаем генерацию
main();
