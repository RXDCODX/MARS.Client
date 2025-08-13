import fs from "fs";
import { resolve } from "path";
import process from "process";
import { generateApi } from "swagger-typescript-api";

// Функция для автоматического определения контроллеров из swagger (api)
function getControllersFromSwagger(swaggerSource) {
  const controllers = new Set();

  Object.keys(swaggerSource.paths).forEach(path => {
    const match = path.match(/^\/api\/([^\\/]+)/);
    if (match) {
      controllers.add(match[1]);
    }
  });

  return Array.from(controllers);
}

// Функция для автоматического определения SignalR хабов из swagger (hubs)
function getSignalRHubsFromSwagger(swaggerSource) {
  const hubPaths = new Map(); // Map для хранения пути к хабу

  // Ищем в путях
  Object.keys(swaggerSource.paths).forEach(path => {
    const pathData = swaggerSource.paths[path];

    // Проверяем все методы в пути
    Object.values(pathData).forEach(methodData => {
      if (methodData.tags && Array.isArray(methodData.tags)) {
        methodData.tags.forEach(tag => {
          if (tag && tag.toLowerCase().includes("hub")) {
            // Извлекаем базовый путь к хабу
            let hubPath;

            if (path.startsWith("/hubs/")) {
              // Для путей вида /hubs/HubName/...
              const hubName = path.split("/")[2];
              hubPath = `/hubs/${hubName}`;
            } else if (path.startsWith("/") && !path.startsWith("/api/")) {
              // Для путей вида /hubname/...
              const hubName = path.split("/")[1];
              hubPath = `/${hubName}`;
            }

            if (hubPath) {
              hubPaths.set(tag, hubPath);
            }
          }
        });
      }
    });
  });

  return Array.from(hubPaths.entries()).map(([hubName, hubPath]) => ({
    name: hubName,
    path: hubPath,
  }));
}

// Определяем контроллеры и хабы динамически
let CONTROLLERS = [];
let SIGNALR_HUBS = [];

// Базовые директории вывода
const OUTPUT_DIR_ROOT = resolve(process.cwd(), "./src/shared/api/");
const OUTPUT_DIR_HTTP = resolve(OUTPUT_DIR_ROOT, "./http/");
const OUTPUT_DIR_SIGNALR_TYPES = resolve(OUTPUT_DIR_ROOT, "./signalr/");
const OUTPUT_DIR_SIGNALR_WRAPPERS = resolve(OUTPUT_DIR_ROOT, "./SignalR/");

// Создаем директории если их нет
[
  OUTPUT_DIR_ROOT,
  OUTPUT_DIR_HTTP,
  OUTPUT_DIR_SIGNALR_TYPES,
  OUTPUT_DIR_SIGNALR_WRAPPERS,
].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Функция для создания файла с общими enum'ами
function createCommonEnumsFile(enumGroups) {
  const commonEnumsContent = `/**
 * Общие enum'ы для переиспользования в API
 * Этот файл автоматически создан на основе найденных дубликатов
 */

${Array.from(enumGroups.entries())
  .filter(([, group]) => group.length > 1)
  .map(([, group]) => {
    const baseEnum = group[0];
    // Извлекаем значения enum'а
    const valuesMatch = baseEnum.value.match(/=\s*([\s\S]*?);/);
    if (valuesMatch) {
      const values = valuesMatch[1].trim();
      return `/**
 * PlatformEnum - автоматически созданный enum для переиспользования
 */
export type PlatformEnum = ${values};`;
    }
    return "";
  })
  .filter(content => content.length > 0)
  .join("\n\n")}

/**
 * Legacy type aliases для обратной совместимости
 * Эти типы ссылаются на общие enum'ы выше
 */
${Array.from(enumGroups.entries())
  .filter(([, group]) => group.length > 1)
  .map(([, group]) =>
    group
      .slice(1)
      .map(duplicateEnum => `export type ${duplicateEnum.name} = PlatformEnum;`)
      .join("\n")
  )
  .filter(content => content.length > 0)
  .join("\n")}
`;

  const commonEnumsPath = resolve(OUTPUT_DIR_ROOT, "common-enums.ts");
  fs.writeFileSync(commonEnumsPath, commonEnumsContent);
  console.log("✅ Файл с общими enum'ами создан в common-enums.ts");
}

// Функция для дедупликации enum'ов в сгенерированном файле
function deduplicateEnums(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");

  // Находим все enum'ы с одинаковыми значениями
  const enumPattern = /export type (\w+) =[\s\S]*?;/g;
  const enums = [];
  let match;

  while ((match = enumPattern.exec(content)) !== null) {
    const enumName = match[1];
    const enumValue = match[0];
    enums.push({ name: enumName, value: enumValue });
  }

  // Группируем enum'ы по их значениям
  const enumGroups = new Map();
  enums.forEach(enumItem => {
    const key = enumItem.value.replace(enumItem.name, "PLACEHOLDER");
    if (!enumGroups.has(key)) {
      enumGroups.set(key, []);
    }
    enumGroups.get(key).push(enumItem);
  });

  // Для каждой группы оставляем только первый enum, остальные заменяем на type alias
  enumGroups.forEach(group => {
    if (group.length > 1) {
      const baseEnum = group[0];
      const baseName = baseEnum.name;

      // Заменяем все дублирующиеся enum'ы на type alias
      group.slice(1).forEach(duplicateEnum => {
        const aliasPattern = new RegExp(
          `export type ${duplicateEnum.name} =[\\s\\S]*?;`,
          "g"
        );
        content = content.replace(
          aliasPattern,
          `export type ${duplicateEnum.name} = ${baseName};`
        );
      });
    }
  });

  fs.writeFileSync(filePath, content);
  console.log(`✅ Дедупликация enum'ов выполнена для ${filePath}`);

  // Возвращаем группы enum'ов для создания общего файла
  return enumGroups;
}

// Функция для генерации HTTP клиентов и типов в отдельную папку
async function generateHttpTypes() {
  // Читаем swagger_api.json и фильтруем до /api/*
  const swaggerApiJsonPath = resolve(process.cwd(), "./api/swagger_api.json");

  await generateApi({
    input: swaggerApiJsonPath,
    output: OUTPUT_DIR_HTTP,
    name: "Api.ts",
    cleanOutput: true,
    httpClientType: "axios",
    prettier: {
      trailingComma: "all",
      tabWidth: 4,
      printWidth: 160,
    },
    generateClient: true,
    modular: true,
    moduleNameFirstTag: true,
    sortTypes: true,
    enumNamesAsValues: false,
    generateResponses: true,
    extractEnums: true,
    codeGenConstructs: constructs => ({
      ...constructs,
      NullValue: () => "undefined",
      TypeField: ({ readonly, key, value }) => {
        const hadNull = typeof value === "string" && /\|\s*null\b/.test(value);
        const hadUndefined =
          typeof value === "string" && /\|\s*undefined\b/.test(value);
        let cleaned = String(value)
          .replace(/\s*\|\s*null\b/g, "")
          .replace(/\s*\|\s*undefined\b/g, "")
          .trim();
        const optionalMark = hadNull || hadUndefined ? "?" : "";
        return `${readonly ? "readonly " : ""}${key}${optionalMark}: ${cleaned}`;
      },
    }),
  });

  // Применяем дедупликацию enum'ов
  const dataContractsPath = resolve(OUTPUT_DIR_HTTP, "data-contracts.ts");
  let enumGroups = null;
  if (fs.existsSync(dataContractsPath)) {
    enumGroups = deduplicateEnums(dataContractsPath);
  }

  // Создаем файл с общими enum'ами если есть дубликаты
  if (enumGroups) {
    createCommonEnumsFile(enumGroups);
  }

  // Шим-файл для обратной совместимости импорта типов из корня
  const rootTypesShim = resolve(OUTPUT_DIR_ROOT, "data-contracts.ts");
  fs.writeFileSync(rootTypesShim, 'export * from "./http/data-contracts";\n');

  console.log("✅ HTTP клиенты и типы сгенерированы в src/shared/api/http/");
}

async function generateSignalRTypes() {
  // Читаем swagger_hubs.json и генерируем только типы
  const swaggerHubsJsonPath = resolve(process.cwd(), "./api/swagger_hubs.json");
  await generateApi({
    input: swaggerHubsJsonPath,
    output: OUTPUT_DIR_SIGNALR_TYPES,
    name: "types.ts",
    cleanOutput: true,
    httpClientType: "axios",
    prettier: {
      trailingComma: "all",
      tabWidth: 4,
      printWidth: 160,
    },
    generateClient: false,
    modular: true,
    sortTypes: true,
    extractEnums: true,
    codeGenConstructs: constructs => ({
      ...constructs,
      NullValue: () => "undefined",
      TypeField: ({ readonly, key, value }) => {
        const hadNull = typeof value === "string" && /\|\s*null\b/.test(value);
        const hadUndefined =
          typeof value === "string" && /\|\s*undefined\b/.test(value);
        let cleaned = String(value)
          .replace(/\s*\|\s*null\b/g, "")
          .replace(/\s*\|\s*undefined\b/g, "")
          .trim();
        const optionalMark = hadNull || hadUndefined ? "?" : "";
        return `${readonly ? "readonly " : ""}${key}${optionalMark}: ${cleaned}`;
      },
    }),
  });

  // Применяем дедупликацию enum'ов
  const signalrDataContractsPath = resolve(
    OUTPUT_DIR_SIGNALR_TYPES,
    "data-contracts.ts"
  );
  if (fs.existsSync(signalrDataContractsPath)) {
    deduplicateEnums(signalrDataContractsPath);
  }

  // Создаем shim для обратной совместимости старого импорта signalr-types
  const legacySignalRTypesDir = resolve(OUTPUT_DIR_ROOT, "./SignalR/types/");
  if (!fs.existsSync(legacySignalRTypesDir)) {
    fs.mkdirSync(legacySignalRTypesDir, { recursive: true });
  }
  const legacyShimPath = resolve(legacySignalRTypesDir, "signalr-types.ts");
  fs.writeFileSync(
    legacyShimPath,
    'export * from "../../signalr/data-contracts";\n'
  );

  console.log(
    "✅ SignalR типы сгенерированы в signalr/types.ts (и совместимость сохранена через SignalR/types/signalr-types.ts)"
  );
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
  if (typeof window !== "undefined" && typeof import.meta !== "undefined") {
    const basePath = import.meta.env.VITE_BASE_PATH;
    if (basePath) {
      return basePath.replace(/\\/$/, "");
    }
  }

  // В Node.js используем process.env
  if (typeof process !== "undefined" && process.env) {
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
  baseURL: getApiBaseUrl(),
};
`;

  fs.writeFileSync(resolve(OUTPUT_DIR_ROOT, "api-config.ts"), apiConfigContent);
  console.log("✅ API конфигурация создана в api-config.ts");
}

// Функция для генерации SignalR клиентов
async function generateSignalRClients() {
  console.log(
    "📋 Используется шаблон React wrapper: react-signalr с children props"
  );

  for (const hub of SIGNALR_HUBS) {
    // Создаем папку для каждого хаба
    const hubDir = resolve(OUTPUT_DIR_SIGNALR_WRAPPERS, `${hub.name}`);
    if (!fs.existsSync(hubDir)) {
      fs.mkdirSync(hubDir, { recursive: true });
    }

    // Используем путь к хабу напрямую из swagger.json
    const hubUrl = hub.path;

    // Первый файл - SignalR контекст
    const signalRContextContent = `import { HubConnectionBuilder, IRetryPolicy } from "@microsoft/signalr";

import { logger } from "@/shared/logger";

const policy: IRetryPolicy = { nextRetryDelayInMilliseconds: () => 5000 };

const baseUrl = import.meta.env.VITE_BASE_PATH;

export const ${hub.name}SignalRContext = new HubConnectionBuilder()
  .withUrl(baseUrl + "${hubUrl}")
  .withAutomaticReconnect(policy)
  .configureLogging(logger);
`;

    fs.writeFileSync(
      resolve(hubDir, "SignalRContext.ts"),
      signalRContextContent
    );

    // Второй файл - React wrapper
    const reactWrapperContent = `import * as signalR from "react-signalr";

import { logger } from "@/shared/logger";

const SignalRContext = signalR.createSignalRContext({});

interface ${hub.name}Props {
  children: React.ReactNode;
}

export default function ${hub.name}SignalRHubWrapper({
  children,
}: ${hub.name}Props) {
  return (
    <SignalRContext.Provider
      automaticReconnect={true}
      onError={error => new Promise(resolve => resolve(console.log(error)))}
      onClosed={event => console.log(event)}
      onOpen={event => console.log(event)}
      logger={logger}
      withCredentials={false}
      url={import.meta.env.VITE_BASE_PATH + "${hubUrl}"}
      logMessageContent
    >
      {children}
    </SignalRContext.Provider>
  );
}
`;

    fs.writeFileSync(
      resolve(hubDir, "SignalRHubWrapper.tsx"),
      reactWrapperContent
    );

    console.log(
      `✅ SignalR клиент для ${hub.name} создан в SignalR/${hub.name}/`
    );
  }
}

// Функция для создания индексного файла
function createIndexFile() {
  const indexContent = `// Автоматически сгенерированный индексный файл
// Импорты утилит конфигурации
export * from "./api-config";
export * from "./data-contracts";
export * from "./signalr/types/signalr-types"; // Волосатые ножки

// Импорты клиентов контроллеров
${CONTROLLERS.map(controller => `export { ${controller} } from "./http/${controller}";`).join("\n")}

// Импорты SignalR клиентов
${SIGNALR_HUBS.map(hub => `export { ${hub.name}SignalRContext } from "./signalr/${hub.name}/SignalRContext";`).join("\n")}
${SIGNALR_HUBS.map(hub => `export { default as ${hub.name}SignalRHubWrapper } from "./signalr/${hub.name}/SignalRHubWrapper";`).join("\n")}
`;

  fs.writeFileSync(resolve(OUTPUT_DIR_ROOT, "index.ts"), indexContent);
  console.log("✅ Индексный файл создан");
}

// Основная функция
async function main() {
  try {
    console.log("🚀 Начинаем генерацию API...");

    // Читаем swagger файлы для контроллеров и хабов
    const swaggerApiJsonPath = resolve(process.cwd(), "./api/swagger_api.json");
    const swaggerHubsJsonPath = resolve(
      process.cwd(),
      "./api/swagger_hubs.json"
    );
    const swaggerApiSource = JSON.parse(
      fs.readFileSync(swaggerApiJsonPath, "utf-8")
    );
    const swaggerHubsSource = JSON.parse(
      fs.readFileSync(swaggerHubsJsonPath, "utf-8")
    );

    // Определяем контроллеры и хабы
    CONTROLLERS = getControllersFromSwagger(swaggerApiSource);
    SIGNALR_HUBS = getSignalRHubsFromSwagger(swaggerHubsSource);

    console.log(`📋 Найдено контроллеров: ${CONTROLLERS.join(", ")}`);
    console.log(
      `📋 Найдено SignalR хабов: ${SIGNALR_HUBS.map(hub => `${hub.name} (${hub.path})`).join(", ")}`
    );

    // Генерируем типы
    await generateHttpTypes();
    await generateSignalRTypes();

    // Создаем утилиты конфигурации API
    createApiConfig();

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
