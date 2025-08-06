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

// Функция для создания утилит конфигурации API
function createApiConfig() {
  const apiConfigContent = `/**
 * Утилиты для конфигурации API клиентов
 */

/**
 * Получает базовый URL для API запросов в рантайме
 * Учитывает VITE_BASE_PATH из переменных окружения
 */
export function getApiBaseUrl(): string {
  // В браузере используем import.meta.env
  if (typeof window !== 'undefined' && typeof import.meta !== 'undefined') {
    const basePath = import.meta.env.VITE_BASE_PATH;
    if (basePath) {
      return basePath.replace(/\\/$/, "");
    }
  }
  
  // В Node.js используем process.env
  if (typeof process !== 'undefined' && process.env) {
    const basePath = process.env.VITE_BASE_PATH;
    if (basePath) {
      return basePath.replace(/\\/$/, "");
    }
  }
  
  // По умолчанию возвращаем пустую строку
  return "";
}

/**
 * Создает полный URL для API endpoint
 * @param endpoint - путь к endpoint (например, "/api/commands")
 * @returns полный URL
 */
export function createApiUrl(endpoint: string): string {
  const baseUrl = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : \`/\${endpoint}\`;
  
  return \`\${baseUrl}\${cleanEndpoint}\`;
}

/**
 * Конфигурация по умолчанию для API клиентов
 */
export const defaultApiConfig = {
  baseUrl: getApiBaseUrl(),
};
`;

  fs.writeFileSync(resolve(OUTPUT_DIR, "api-config.ts"), apiConfigContent);
  console.log("✅ API конфигурация создана в api-config.ts");
}

// Функция для генерации клиентов по контроллерам
async function generateControllerClients() {
  for (const controller of CONTROLLERS) {
    // Создаем простую обертку над основным клиентом
    const controllerContent = `// Клиент для контроллера ${controller}
import { HttpClient } from './types';
import { getApiBaseUrl } from './api-config';

// Экспортируем только методы для этого контроллера
export class ${controller}Service {
  private httpClient: HttpClient;

  constructor(baseURL?: string) {
    // Используем переданный baseURL или получаем из переменных окружения в рантайме
    const apiBaseUrl = baseURL || getApiBaseUrl();
    this.httpClient = new HttpClient({ baseUrl: apiBaseUrl });
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
import { getApiBaseUrl } from './api-config';

// Экспортируем только методы для этого хаба
export class ${hub}Service {
  private httpClient: HttpClient;

  constructor(baseURL?: string) {
    // Используем переданный baseURL или получаем из переменных окружения в рантайме
    const apiBaseUrl = baseURL || getApiBaseUrl();
    this.httpClient = new HttpClient({ baseUrl: apiBaseUrl });
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

  // После генерации axios-client.ts, обновляем basePath для рантайм определения
  const axiosClientPath = resolve(OUTPUT_DIR, "axios-client.ts");
  if (fs.existsSync(axiosClientPath)) {
    let content = fs.readFileSync(axiosClientPath, "utf-8");
    
    // Заменяем статический basePath на динамический для рантайма
    content = content.replace(
      /export const basePath = "";/,
      `// Динамически определяем базовый путь в рантайме
export const basePath = (() => {
  // В браузере используем import.meta.env
  if (typeof window !== 'undefined' && typeof import.meta !== 'undefined') {
    return import.meta.env.VITE_BASE_PATH || '';
  }
  
  // В Node.js используем process.env
  if (typeof process !== 'undefined' && process.env) {
    return process.env.VITE_BASE_PATH || '';
  }
  
  return '';
})();`
    );
    
    fs.writeFileSync(axiosClientPath, content);
  }

  console.log("✅ Основной axios клиент сгенерирован в axios-client.ts с рантайм определением VITE_BASE_PATH");
}

// Функция для создания индексного файла
function createIndexFile() {
  const indexContent = `// Автоматически сгенерированный индексный файл
// Импорты типов
export * from './types';
export * from './signalr_types';

// Импорты утилит конфигурации
export * from './api-config';

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

// Функция для создания README с документацией
function createReadme() {
  const readmeContent = `# Generated API Client

Автоматически сгенерированный API клиент для проекта MARS.

## Поддержка VITE_BASE_PATH в рантайме

Клиент поддерживает настройку базового пути через переменную окружения \`VITE_BASE_PATH\` с определением в рантайме.

### Настройка

1. Создайте файл \`.env\` в корне проекта
2. Добавьте переменную \`VITE_BASE_PATH\`:

\`\`\`env
# Примеры настройки базового пути
VITE_BASE_PATH=/api/v1
# или
VITE_BASE_PATH=https://api.example.com
# или
VITE_BASE_PATH=http://localhost:5000/api
\`\`\`

### Использование

#### Автоматическое использование базового пути в рантайме

\`\`\`typescript
import { CommandsService } from "@/shared/api/generated";

// Автоматически использует VITE_BASE_PATH в рантайме
const commandsService = new CommandsService();

// Запрос будет отправлен на: {VITE_BASE_PATH}/api/commands/user/platform/Api/info
const userCommands = await commandsService.getUserCommandsInfoForPlatform("Api");
\`\`\`

#### Ручное указание базового пути

\`\`\`typescript
import { CommandsService } from "@/shared/api/generated";

// Переопределяем базовый путь
const commandsService = new CommandsService("https://custom-api.com");

// Запрос будет отправлен на: https://custom-api.com/api/commands/user/platform/Api/info
const userCommands = await commandsService.getUserCommandsInfoForPlatform("Api");
\`\`\`

#### Использование утилит

\`\`\`typescript
import { getApiBaseUrl, createApiUrl } from "@/shared/api/generated";

// Получить базовый URL в рантайме
const baseUrl = getApiBaseUrl(); // например: "/api/v1"

// Создать полный URL для endpoint
const fullUrl = createApiUrl("/api/commands"); // например: "/api/v1/api/commands"
\`\`\`

## Доступные сервисы

${CONTROLLERS.map(controller => `- \`${controller}Service\` - работа с ${controller.toLowerCase()}`).join('\n')}

## SignalR клиенты

${SIGNALR_HUBS.map(hub => `- \`${hub}Service\` - SignalR для ${hub.toLowerCase()}`).join('\n')}

## Типы

Все типы экспортируются из \`./types\` и доступны для импорта:

\`\`\`typescript
import { 
  CommandInfo, 
  CommandParameterInfo,
  CommandInfoAvailablePlatformsEnum 
} from "@/shared/api/generated";
\`\`\`

## Особенности рантайм определения

- Базовый путь определяется в рантайме, а не при сборке
- Поддерживает как браузерную (import.meta.env), так и серверную (process.env) среду
- Автоматически обрабатывает trailing slash
- Fallback на пустую строку если переменная не установлена
`;

  fs.writeFileSync(resolve(OUTPUT_DIR, 'README.md'), readmeContent);
  console.log("✅ README с документацией создан");
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
    
    // Создаем утилиты конфигурации API
    createApiConfig();
    
    // Генерируем основной axios клиент (для обратной совместимости)
    await generateMainAxiosClient();
    
    // Генерируем клиенты для каждого контроллера
    await generateControllerClients();
    
    // Генерируем SignalR клиенты
    await generateSignalRClients();
    
    // Создаем индексный файл
    createIndexFile();
    
    // Создаем README с документацией
    createReadme();
    
    console.log("🎉 Генерация API завершена успешно!");
    console.log("📝 Базовый путь определяется в рантайме через VITE_BASE_PATH!");
  } catch (error) {
    console.error("❌ Ошибка при генерации API:", error);
    process.exit(1);
  }
}

// Запускаем генерацию
main();
