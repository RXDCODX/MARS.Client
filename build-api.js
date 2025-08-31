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

// Новая структура папок для разделения типов и клиентов
const OUTPUT_DIR_ROOT = resolve(process.cwd(), "./src/shared/api/");
const OUTPUT_DIR_TYPES = resolve(OUTPUT_DIR_ROOT, "./types/"); // Общие типы
const OUTPUT_DIR_DATA_CONTRACTS = resolve(OUTPUT_DIR_ROOT, "./data-contracts/"); // Data contracts
const OUTPUT_DIR_HTTP_CLIENTS = resolve(OUTPUT_DIR_ROOT, "./http-clients/"); // HTTP клиенты
const OUTPUT_DIR_SIGNALR_TYPES = resolve(OUTPUT_DIR_ROOT, "./signalr-types/"); // SignalR типы
const OUTPUT_DIR_SIGNALR_CLIENTS = resolve(
  OUTPUT_DIR_ROOT,
  "./signalr-clients/"
); // SignalR клиенты

// Создаем директории если их нет
[
  OUTPUT_DIR_ROOT,
  OUTPUT_DIR_TYPES,
  OUTPUT_DIR_DATA_CONTRACTS,
  OUTPUT_DIR_HTTP_CLIENTS,
  OUTPUT_DIR_SIGNALR_TYPES,
  OUTPUT_DIR_SIGNALR_CLIENTS,
].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

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
    generateClient: false, // Только типы
    modular: false, // Один файл с типами
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

// Функция для генерации data-contracts отдельно
async function generateDataContracts() {
  console.log("📋 Генерируем data-contracts...");

  // Вместо генерации новых data-contracts, просто копируем типы из types
  // и переименовываем файл для обратной совместимости
  const typesFilePath = resolve(OUTPUT_DIR_TYPES, "types.ts");
  const dataContractsFilePath = resolve(
    OUTPUT_DIR_DATA_CONTRACTS,
    "data-contracts.ts"
  );

  if (fs.existsSync(typesFilePath)) {
    fs.copyFileSync(typesFilePath, dataContractsFilePath);
    console.log(
      "✅ Data-contracts скопированы из types/ для обратной совместимости"
    );
  } else {
    console.log(
      "⚠️ Файл types/types.ts не найден, пропускаем генерацию data-contracts"
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
    name: "Api.ts",
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
    extractEnums: false, // Типы уже есть отдельно
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

  // // Исправляем импорты в каждом клиенте
  // const clientFiles = fs
  //   .readdirSync(OUTPUT_DIR_HTTP_CLIENTS)
  //   .filter(file => file.endsWith(".ts"));
  // clientFiles.forEach(file => {
  //   const filePath = resolve(OUTPUT_DIR_HTTP_CLIENTS, file);
  //   let content = fs.readFileSync(filePath, "utf-8");

  //   // Заменяем все неправильные импорты на правильные
  //   content = content.replace(
  //     /import \{ ([^}]+) \} from "\.\/data-contracts";/g,
  //     'import type { $1 } from "../../types/types";'
  //   );

  //   content = content.replace(
  //     /import \{ ([^}]+) \} from "\.\/http-client";/g,
  //     'import type { $1 } from "../../types/types";'
  //   );

  //   // Убираем лишние пустые строки
  //   content = content.replace(/\n\s*\n\s*\n/g, "\n\n");

  //   fs.writeFileSync(filePath, content);
  // });

  console.log("✅ HTTP клиенты сгенерированы в http-clients/");
}

// Функция для генерации SignalR типов отдельно
async function generateSignalRTypes() {
  console.log("📡 Генерируем SignalR типы...");

  const swaggerHubsJsonPath = resolve(process.cwd(), "./api/swagger_hubs.json");

  await generateApi({
    input: swaggerHubsJsonPath,
    output: OUTPUT_DIR_SIGNALR_TYPES,
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
  const apiFilePath = resolve(OUTPUT_DIR_SIGNALR_TYPES, "Api.ts");
  const signalrTypesFilePath = resolve(
    OUTPUT_DIR_SIGNALR_TYPES,
    "signalr-types.ts"
  );
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
    "✅ SignalR типы сгенерированы в signalr-types/signalr-types.ts (дубликаты удалены)"
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

// Импорты типов (основной источник)
export * from "./types/types";

// Импорты SignalR типов
export * from "./signalr-types/signalr-types";

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

// Функция для создания файла с типами для обратной совместимости
function createLegacyCompatibilityFiles() {
  // Создаем shim для обратной совместимости старого импорта data-contracts
  const legacyDataContractsPath = resolve(OUTPUT_DIR_ROOT, "data-contracts.ts");
  fs.writeFileSync(legacyDataContractsPath, 'export * from "./types/types";\n');

  // Создаем shim для обратной совместимости старого импорта signalr-types
  const legacySignalRTypesDir = resolve(OUTPUT_DIR_ROOT, "./SignalR/types/");
  if (!fs.existsSync(legacySignalRTypesDir)) {
    fs.mkdirSync(legacySignalRTypesDir, { recursive: true });
  }
  const legacyShimPath = resolve(legacySignalRTypesDir, "signalr-types.ts");
  fs.writeFileSync(
    legacyShimPath,
    'export * from "../../signalr-types/signalr-types";\n'
  );

  console.log("✅ Файлы обратной совместимости созданы");
}

// Основная функция
async function main() {
  try {
    console.log("🚀 Начинаем генерацию API с разделением типов и клиентов...");

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

    // Генерируем типы отдельно
    await generateTypesOnly();
    await generateDataContracts();
    await generateSignalRTypes();

    // Создаем утилиты конфигурации API
    createApiConfig();

    // Генерируем клиенты отдельно (без типов)
    await generateHttpClients();
    await generateSignalRClients();

    // Создаем файлы обратной совместимости
    createLegacyCompatibilityFiles();

    // Создаем индексный файл
    createIndexFile();

    console.log("🎉 Генерация API завершена успешно!");
    console.log("📁 Структура папок:");
    console.log("   - types/ - общие типы");
    console.log("   - data-contracts/ - data contracts");
    console.log("   - http-clients/ - HTTP клиенты");
    console.log("   - signalr-types/ - SignalR типы");
    console.log("   - signalr-clients/ - SignalR клиенты");
  } catch (error) {
    console.error("❌ Ошибка при генерации API:", error);
    process.exit(1);
  }
}

// Запускаем генерацию
main();
