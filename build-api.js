import { exec } from "child_process";
import fs from "fs";
import { resolve } from "path";
import process from "process";
import { generateApi } from "swagger-typescript-api";

// Функция для автоматического определения контроллеров из swagger (api)
function getControllersFromSwagger(swaggerSource) {
  const controllers = new Set();

  Object.keys(swaggerSource.paths).forEach(path => {
    const pathData = swaggerSource.paths[path];

    // Проверяем все методы в пути
    Object.values(pathData).forEach(methodData => {
      if (methodData.tags && Array.isArray(methodData.tags)) {
        methodData.tags.forEach(tag => {
          if (tag && !tag.toLowerCase().includes("hub")) {
            // Добавляем тег как контроллер, если это не хаб
            controllers.add(tag);
          }
        });
      }
    });
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

// Новая структура папок: все типы хранятся в одной папке types
const OUTPUT_DIR_ROOT = resolve(process.cwd(), "./src/shared/api/");
const OUTPUT_DIR_TYPES = resolve(OUTPUT_DIR_ROOT, "./types/"); // Все общие типы: data-contracts.ts и signalr-types.ts
const OUTPUT_DIR_HTTP_CLIENTS = resolve(OUTPUT_DIR_ROOT, "./http-clients/"); // HTTP клиенты
const OUTPUT_DIR_SIGNALR_CLIENTS = resolve(
  OUTPUT_DIR_ROOT,
  "./signalr-clients/"
); // SignalR клиенты

// Функция для очистки папки API
function cleanApiDirectory() {
  console.log("🧹 Очищаем папку API...");

  if (fs.existsSync(OUTPUT_DIR_ROOT)) {
    exec('Remove-Item -Path "./src/shared/api" -Recurse -Force', {
      shell: "powershell.exe",
    });
    console.log("✅ Папка API очищена");
  }

  console.log("✅ Директории API созданы");
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

// Функция для генерации только типов (без клиентов)
async function generateTypesOnly() {
  console.log("🔧 Генерируем только типы...");

  const swaggerApiJsonPath = resolve(process.cwd(), "./api/swagger_api.json");

  await generateApi({
    input: swaggerApiJsonPath,
    output: OUTPUT_DIR_TYPES,
    name: "types.ts",
    cleanOutput: true,
    httpClientType: "axios",
    prettier: {
      trailingComma: "all",
      tabWidth: 4,
      printWidth: 160,
    },
    generateClient: true, // Только типы
    modular: true, // Один файл с типами
    sortTypes: true,
    enumNamesAsValues: false,
    generateResponses: false,
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

  // Переименовываем файл если он создался с неправильным именем
  const apiFilePath = resolve(OUTPUT_DIR_TYPES, "Api.ts");
  const typesFilePath = resolve(OUTPUT_DIR_TYPES, "types.ts");
  if (fs.existsSync(apiFilePath)) {
    fs.renameSync(apiFilePath, typesFilePath);
  }

  console.log("✅ Типы сгенерированы в types/types.ts");
}

// Функция для генерации data-contracts отдельно (внутри папки types)
async function generateDataContracts() {
  console.log("📋 Генерируем data-contracts...");

  // Копируем data-contracts из http-clients в types
  const httpClientsDataContractsPath = resolve(OUTPUT_DIR_HTTP_CLIENTS, "data-contracts.ts");
  const typesDataContractsPath = resolve(OUTPUT_DIR_TYPES, "data-contracts.ts");

  if (fs.existsSync(httpClientsDataContractsPath)) {
    // Гарантируем, что папка types существует
    if (!fs.existsSync(OUTPUT_DIR_TYPES)) {
      fs.mkdirSync(OUTPUT_DIR_TYPES, { recursive: true });
    }
    fs.copyFileSync(httpClientsDataContractsPath, typesDataContractsPath);
    console.log("✅ Data-contracts скопированы в types/data-contracts.ts");
  } else {
    console.log(
      "⚠️ Файл http-clients/data-contracts.ts не найден, пропускаем генерацию data-contracts"
    );
  }
}

// Функция для генерации HTTP клиентов (без типов)
async function generateHttpClients() {
  console.log("🌐 Генерируем HTTP клиенты...");

  const swaggerApiJsonPath = resolve(process.cwd(), "./api/swagger_api.json");

  await generateApi({
    input: swaggerApiJsonPath,
    output: OUTPUT_DIR_HTTP_CLIENTS,
    name: "types.ts",
    cleanOutput: true,
    httpClientType: "axios",
    prettier: {
      trailingComma: "all",
      tabWidth: 4,
      printWidth: 160,
    },
    generateClient: true, // Только клиенты
    modular: true, // Модульная структура
    moduleNameFirstTag: true,
    sortTypes: false, // Не нужно для клиентов
    enumNamesAsValues: false,
    generateResponses: true,
    extractEnums: true, // Извлекаем enum'ы для клиентов
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

  // Исправляем импорты в каждом клиенте на общий источник типов и удаляем локальные data-contracts
  const clientFiles = fs
    .readdirSync(OUTPUT_DIR_HTTP_CLIENTS)
    .filter(file => file.endsWith(".ts"));
  
  clientFiles.forEach(file => {
    const filePath = resolve(OUTPUT_DIR_HTTP_CLIENTS, file);
    
    // Если это файл с типами, переименовываем его в data-contracts.ts для обратной совместимости
    if (file === "types.ts") {
      const dataContractsPath = resolve(OUTPUT_DIR_HTTP_CLIENTS, "data-contracts.ts");
      fs.renameSync(filePath, dataContractsPath);
      console.log("📋 Переименован types.ts в data-contracts.ts для обратной совместимости");
      return;
    }
    
    // Если это data-contracts.ts, оставляем как есть
    if (file === "data-contracts.ts") {
      return;
    }
    
    let content = fs.readFileSync(filePath, "utf-8");

    // Заменяем импорты локальных контрактов на общий файл типов
    content = content.replace(
      /import\s+\{([^}]+)\}\s+from\s+"\.\/data-contracts";/g,
      (_m, p1) => `import type {${p1}} from "../types/data-contracts";`
    );

    // Убираем лишние пустые строки
    content = content.replace(/\n\s*\n\s*\n/g, "\n\n");

    fs.writeFileSync(filePath, content);
  });

  console.log("✅ HTTP клиенты сгенерированы в http-clients/");
}

// Функция для генерации SignalR типов отдельно (внутри папки types)
async function generateSignalRTypes() {
  console.log("📡 Генерируем SignalR типы...");

  const swaggerHubsJsonPath = resolve(process.cwd(), "./api/swagger_hubs.json");

  await generateApi({
    input: swaggerHubsJsonPath,
    output: OUTPUT_DIR_TYPES,
    name: "signalr-types.ts",
    cleanOutput: true,
    httpClientType: "axios",
    prettier: {
      trailingComma: "all",
      tabWidth: 4,
      printWidth: 160,
    },
    generateClient: false, // Только типы
    modular: false, // Один файл
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

  // Переименовываем файл если он создался с неправильным именем
  const apiFilePath = resolve(OUTPUT_DIR_TYPES, "Api.ts");
  const signalrTypesFilePath = resolve(OUTPUT_DIR_TYPES, "signalr-types.ts");
  if (fs.existsSync(apiFilePath)) {
    fs.renameSync(apiFilePath, signalrTypesFilePath);
  }

  // Теперь фильтруем файл, оставляя только уникальные типы
  if (fs.existsSync(signalrTypesFilePath)) {
    let content = fs.readFileSync(signalrTypesFilePath, "utf-8");

    // Список типов, которые уже есть в основных типах API
    const duplicateTypes = [
      "MediaFileInfo",
      "MediaFileInfoTypeEnum",
      "MediaMetaInfo",
      "MediaMetaInfoPriorityEnum",
      "MediaPositionInfo",
      "MediaStylesInfo",
      "MediaTextInfo",
      "Move",
      "MovePending",
      "MovePendingDto",
      "ParseRequest",
      "ParseRequestSourceEnum",
      "ParseResult",
      "ServiceInfo",
      "ServiceInfoStatusEnum",
      "ServiceLog",
      "TekkenCharacter",
      "TekkenCharacterPendingDto",
    ];

    // Удаляем дублирующиеся типы
    duplicateTypes.forEach(typeName => {
      // Удаляем interface
      content = content.replace(
        new RegExp(`export interface ${typeName}[\\s\\S]*?}\\s*`, "g"),
        ""
      );
      // Удаляем enum
      content = content.replace(
        new RegExp(`export enum ${typeName}[\\s\\S]*?}\\s*`, "g"),
        ""
      );
      // Удаляем type
      content = content.replace(
        new RegExp(`export type ${typeName}[\\s\\S]*?;\\s*`, "g"),
        ""
      );
    });

    // Очищаем пустые строки
    content = content.replace(/\n\s*\n\s*\n/g, "\n\n");

    fs.writeFileSync(signalrTypesFilePath, content);

    // Применяем дедупликацию enum'ов
    deduplicateEnums(signalrTypesFilePath);
  }

  console.log(
    "✅ SignalR типы сгенерированы в types/signalr-types.ts (дубликаты удалены)"
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
    const hubDir = resolve(OUTPUT_DIR_SIGNALR_CLIENTS, `${hub.name}`);
    if (!fs.existsSync(hubDir)) {
      fs.mkdirSync(hubDir, { recursive: true });
    }

    // Используем путь к хабу напрямую из swagger.json
    const hubUrl = hub.path.startsWith("/") ? hub.path.slice(1) : hub.path;

    // Первый файл - SignalR контекст
    const signalRContextContent = `import { HubConnectionBuilder, IRetryPolicy } from "@microsoft/signalr";

import { logger } from "@/shared/logger";

const policy: IRetryPolicy = { nextRetryDelayInMilliseconds: () => 5000 };

const baseUrl = import.meta.env.VITE_BASE_PATH;

export const ${hub.name}SignalRConnectionBuilder = new HubConnectionBuilder()
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

export const ${hub.name}SignalRContext = signalR.createSignalRContext({});

interface ${hub.name}Props {
  children: React.ReactNode;
}

export function ${hub.name}SignalRHubWrapper({
  children,
}: ${hub.name}Props) {
  return (
    <${hub.name}SignalRContext.Provider
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
    </${hub.name}SignalRContext.Provider>
  );
}
`;

    fs.writeFileSync(
      resolve(hubDir, "SignalRHubWrapper.tsx"),
      reactWrapperContent
    );

    console.log(
      `✅ SignalR клиент для ${hub.name} создан в signalr-clients/${hub.name}/`
    );
  }
}

// Функция для создания индексного файла
function createIndexFile() {
  const indexContent = `// Автоматически сгенерированный индексный файл
// Импорты утилит конфигурации
export * from "./api-config";

// Импорты типов
export * from "./types/data-contracts";
export * from "./types/signalr-types";

// Импорты HTTP клиентов
${CONTROLLERS.map(controller => `export { ${controller} } from "./http-clients/${controller}";`).join("\n")}

// Импорты SignalR клиентов
${SIGNALR_HUBS.map(hub => `export { ${hub.name}SignalRConnectionBuilder } from "./signalr-clients/${hub.name}/SignalRContext";`).join("\n")}
${SIGNALR_HUBS.map(hub => `export { ${hub.name}SignalRContext } from "./signalr-clients/${hub.name}/SignalRHubWrapper";`).join("\n")}
${SIGNALR_HUBS.map(hub => `export { ${hub.name}SignalRHubWrapper } from "./signalr-clients/${hub.name}/SignalRHubWrapper";`).join("\n")}
`;

  fs.writeFileSync(resolve(OUTPUT_DIR_ROOT, "index.ts"), indexContent);
  console.log("✅ Индексный файл создан");
}

// Основная функция
async function main() {
  try {
    console.log("🚀 Начинаем генерацию API с разделением типов и клиентов...");

    // Очищаем папку API перед генерацией
    cleanApiDirectory();

    // Читаем swagger файлы для контроллеров и хабов
    const swaggerApiJsonPath = resolve(process.cwd(), "./api/swagger_api.json");
    const swaggerHubsJsonPath = resolve(
      process.cwd(),
      "./api/swagger_hubs.json"
    );

    const swaggerApiSource = JSON.parse(fs.readFileSync(swaggerApiJsonPath));
    const swaggerHubsSource = JSON.parse(fs.readFileSync(swaggerHubsJsonPath));

    // Определяем контроллеры и хабы
    CONTROLLERS = getControllersFromSwagger(swaggerApiSource);
    SIGNALR_HUBS = getSignalRHubsFromSwagger(swaggerHubsSource);

    console.log(`📋 Найдено контроллеров: ${CONTROLLERS.join(", ")}`);
    console.log(
      `📋 Найдено SignalR хабов: ${SIGNALR_HUBS.map(hub => `${hub.name} (${hub.path})`).join(", ")}`
    );

    // Генерируем типы отдельно
    await generateTypesOnly();
    await generateSignalRTypes();

    // Создаем утилиты конфигурации API
    createApiConfig();

    // Генерируем клиенты отдельно (без типов)
    await generateHttpClients();
    
    // Копируем data-contracts в папку types после генерации HTTP клиентов
    await generateDataContracts();
    
    await generateSignalRClients();

    // Не создаем файлы обратной совместимости: используем единый источник типов в ./types

    // Создаем индексный файл
    createIndexFile();

    console.log("🎉 Генерация API завершена успешно!");
    console.log("📁 Структура папок:");
    console.log(
      "   - types/ - общие типы (data-contracts.ts, signalr-types.ts)"
    );
    console.log("   - http-clients/ - HTTP клиенты");
    console.log("   - signalr-clients/ - SignalR клиенты");
  } catch (error) {
    console.error("❌ Ошибка при генерации API:", error);
    process.exit(1);
  }
}

// Запускаем генерацию
main();
