import fs from "fs";
import { resolve } from "path";
import process from "process";
import { generateApi } from "swagger-typescript-api";

// Функция для автоматического определения контроллеров из swagger.json
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

// Функция для автоматического определения SignalR хабов из swagger.json
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

// Функция для создания фильтрованного swagger.json без SignalR хабов
function createFilteredSwagger(swaggerSource) {
  const filteredSwagger = { ...swaggerSource };

  // Удаляем пути, связанные с SignalR хабами
  const pathsToRemove = [];

  Object.keys(filteredSwagger.paths).forEach(path => {
    const pathData = filteredSwagger.paths[path];
    let shouldRemove = false;

    // Проверяем все методы в пути
    Object.values(pathData).forEach(methodData => {
      if (methodData.tags && Array.isArray(methodData.tags)) {
        methodData.tags.forEach(tag => {
          if (tag && tag.toLowerCase().includes("hub")) {
            shouldRemove = true;
          }
        });
      }
    });

    // Также удаляем пути, которые не начинаются с /api/
    if (!path.startsWith("/api/")) {
      shouldRemove = true;
    }

    if (shouldRemove) {
      pathsToRemove.push(path);
    }
  });

  // Удаляем найденные пути
  pathsToRemove.forEach(path => {
    delete filteredSwagger.paths[path];
  });

  return filteredSwagger;
}

// Определяем контроллеры и хабы динамически
let CONTROLLERS = [];
let SIGNALR_HUBS = [];

const OUTPUT_DIR = resolve(process.cwd(), "./src/shared/api/");

// Создаем директории если их нет
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Функция для генерации типов с модульной структурой
async function generateTypes() {
  // Создаем фильтрованный swagger без SignalR хабов
  const swaggerJsonPath = resolve(process.cwd(), "./api/swagger.json");
  const swaggerSource = JSON.parse(fs.readFileSync(swaggerJsonPath, "utf-8"));
  const filteredSwagger = createFilteredSwagger(swaggerSource);

  // Сохраняем фильтрованный swagger во временный файл
  const tempSwaggerPath = resolve(process.cwd(), "./api/swagger-filtered.json");
  fs.writeFileSync(tempSwaggerPath, JSON.stringify(filteredSwagger, null, 2));

  const params = {
    input: tempSwaggerPath,
    output: OUTPUT_DIR,
    name: "Api.ts",
    cleanOutput: false,
    httpClientType: "axios",
    prettier: {
      trailingComma: "all",
      tabWidth: 4,
      printWidth: 160,
    },
    generateClient: true, // Генерируем клиент с методами
    modular: true,
    moduleNameFirstTag: true,
    sortTypes: true,
    extractEnums: true,
    codeGenConstructs: constructs => ({
      ...constructs,
      NullValue: () => "undefined",
      TypeField: ({ readonly, key, value }) => {
        const finalValue = value.includes(" | null")
          ? value.replace(" | null", " | undefined")
          : value;
        return [...(readonly ? ["readonly "] : []), key, ": ", finalValue].join(
          ""
        );
      },
    }),
  };

  await generateApi(params);

  // Удаляем временный файл
  fs.unlinkSync(tempSwaggerPath);

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

  console.log("✅ Типы сгенерированы в types.ts с модульной структурой");
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

  fs.writeFileSync(resolve(OUTPUT_DIR, "api-config.ts"), apiConfigContent);
  console.log("✅ API конфигурация создана в api-config.ts");
}

// Функция для генерации SignalR клиентов
async function generateSignalRClients() {
  console.log(
    "📋 Используется шаблон React wrapper: react-signalr с children props"
  );

  for (const hub of SIGNALR_HUBS) {
    // Создаем папку для каждого хаба
    const hubDir = resolve(OUTPUT_DIR, `SignalR/${hub.name}`);
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
// Импорты типов
export * from "./axios-client";

// Импорты утилит конфигурации
export * from "./api-config";

// Импорты клиентов контроллеров
${CONTROLLERS.map(controller => `export { ${controller} } from "./${controller}";`).join("\n")}

// Импорты SignalR клиентов
${SIGNALR_HUBS.map(hub => `export { ${hub.name}SignalRContext } from "./SignalR/${hub.name}/SignalRContext";`).join("\n")}
${SIGNALR_HUBS.map(hub => `export { default as ${hub.name}SignalRHubWrapper } from "./SignalR/${hub.name}/SignalRHubWrapper";`).join("\n")}
`;

  fs.writeFileSync(resolve(OUTPUT_DIR, "index.ts"), indexContent);
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

    console.log(`📋 Найдено контроллеров: ${CONTROLLERS.join(", ")}`);
    console.log(
      `📋 Найдено SignalR хабов: ${SIGNALR_HUBS.map(hub => `${hub.name} (${hub.path})`).join(", ")}`
    );

    // Генерируем типы
    await generateTypes();

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
