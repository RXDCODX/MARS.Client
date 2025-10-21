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
    fs.rmSync(OUTPUT_DIR_ROOT, { recursive: true, force: true });
    console.log("✅ Папка API очищена");
  }

  // Создаем необходимые директории
  fs.mkdirSync(OUTPUT_DIR_ROOT, { recursive: true });
  fs.mkdirSync(OUTPUT_DIR_TYPES, { recursive: true });
  fs.mkdirSync(OUTPUT_DIR_HTTP_CLIENTS, { recursive: true });
  fs.mkdirSync(OUTPUT_DIR_SIGNALR_CLIENTS, { recursive: true });

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

// Функция для замены дублирующихся OperationResult типов на обобщенный
function replaceOperationResultTypes(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");

  console.log(`🔧 Обрабатываем OperationResult типы в ${filePath}...`);

  // Паттерн 1: Старый формат - export interface TypeNameOperationResult { ... }
  // Используем более точный паттерн, который НЕ захватит обычные интерфейсы
  const oldFormatPattern =
    /export interface (\w+OperationResult) \{\s*success:\s*boolean[,;]\s*message\?:\s*string[,;]\s*data\?:[\s\S]*?\n\}/g;

  // Паттерн 2: Новый формат с allOf - export type TypeNameOperationResult = { ... }
  const allOfPattern =
    /export type (\w+)OperationResult = \{[\s\S]*?\$ref: "#\/components\/schemas\/OperationResult"[\s\S]*?\} & object;/g;

  // Паттерн 3: Простые интерфейсы OperationResult, сгенерированные из allOf
  const simpleInterfacePattern =
    /export interface (\w+)OperationResult extends OperationResult \{[\s\S]*?\}/g;

  // Паттерн 4: Некорректные type алиасы вида: export type OperationResult<ConcreteType> = (OperationResult)
  // С возможным JSDoc комментарием, который начинается с "Результат операции"
  const incorrectAliasPattern =
    /(?:\/\*\* Результат операции[\s\S]*?\*\/\s+)?export type OperationResult<[^>]+> = \(OperationResult\)\s*/g;

  // Паттерн 5: Базовый OperationResult без Generic параметра (из Swagger)
  // /** Обобщенный результат операции */ export interface OperationResult { success, message, data: any }
  const baseOperationResultPattern =
    /\/\*\* Обобщенный результат операции \*\/\s+export interface OperationResult \{[\s\S]*?data:\s*any[,;][\s\S]*?\n\}/g;

  const foundTypes = [];
  let match;

  // Собираем все варианты
  const patterns = [
    { regex: oldFormatPattern, name: "old format" },
    { regex: allOfPattern, name: "allOf format" },
    { regex: simpleInterfacePattern, name: "simple interface" },
    { regex: incorrectAliasPattern, name: "incorrect alias" },
    { regex: baseOperationResultPattern, name: "base OperationResult" },
  ];

  patterns.forEach(({ regex, name }) => {
    const contentCopy = content;
    regex.lastIndex = 0; // Сбрасываем lastIndex для корректной работы
    while ((match = regex.exec(contentCopy)) !== null) {
      const fullMatch = match[0];
      const typeName = match[1] || "Generic";
      foundTypes.push({ fullMatch, typeName, format: name });
    }
  });

  if (foundTypes.length > 0) {
    console.log(
      `   Найдено ${foundTypes.length} дублирующихся типов OperationResult`
    );

    // Показываем первые несколько примеров
    foundTypes.slice(0, 3).forEach(({ typeName, format, fullMatch }) => {
      console.log(
        `   - ${typeName} (${format}): ${fullMatch.substring(0, 80)}...`
      );
    });
  }

  // Удаляем все найденные дублирующиеся типы OperationResult
  foundTypes.forEach(({ fullMatch }) => {
    // Простая замена первого вхождения
    const index = content.indexOf(fullMatch);
    if (index !== -1) {
      content =
        content.slice(0, index) + content.slice(index + fullMatch.length);
      // console.log(`   Удален: ${typeName}`);
    }
  });

  // Проверяем, нет ли уже обобщенного типа OperationResult
  const hasGenericOperationResult =
    /export interface OperationResult<TData/.test(content);

  if (!hasGenericOperationResult) {
    // Добавляем обобщенный тип OperationResult в начало файла
    const genericOperationResult = `
/**
 * Обобщенный результат операции
 * @template TData - Тип данных, возвращаемых в поле data
 */
export interface OperationResult<TData = any> {
    /** Флаг успешности операции */
    success: boolean;
    /** Сообщение о результате операции */
    message?: string;
    /** Данные результата операции */
    data?: TData;
}
`;

    // Находим место после служебных комментариев и импортов
    const insertPosition = content.search(/export (interface|type|class|enum)/);
    if (insertPosition !== -1) {
      content =
        content.slice(0, insertPosition) +
        genericOperationResult +
        "\n" +
        content.slice(insertPosition);
    } else {
      // Если не нашли, добавляем в начало после комментариев
      const commentEndIndex = content.indexOf("*/");
      if (commentEndIndex !== -1) {
        content =
          content.slice(0, commentEndIndex + 2) +
          "\n" +
          genericOperationResult +
          content.slice(commentEndIndex + 2);
      } else {
        content = genericOperationResult + content;
      }
    }

    console.log("   ✓ Добавлен обобщенный тип OperationResult<TData>");
  }

  // Заменяем все использования конкретных типов OperationResult на обобщенный
  const replacements = new Map();

  content = content.replace(
    /(\w+)(IEnumerable|List|Array)?OperationResult(?!<)/g,
    (match, typeName, collection) => {
      // Пропускаем, если это определение интерфейса или типа
      if (match.startsWith("export ")) {
        return match;
      }

      // Формируем замену
      let replacement;
      if (collection) {
        replacement = `OperationResult<${typeName}[]>`;
      } else {
        replacement = `OperationResult<${typeName}>`;
      }

      // Сохраняем статистику замен
      if (!replacements.has(match)) {
        replacements.set(match, replacement);
      }

      return replacement;
    }
  );

  if (replacements.size > 0) {
    console.log(`   ✓ Выполнено ${replacements.size} уникальных замен типов`);
  }

  // Убираем избыточные пустые строки
  content = content.replace(/\n{4,}/g, "\n\n");

  fs.writeFileSync(filePath, content);
  console.log(`✅ OperationResult типы успешно обработаны`);

  return {
    processedTypes: foundTypes.length,
    replacements: replacements.size,
  };
}

// Функция для генерации data-contracts отдельно (внутри папки types)
async function generateDataContracts() {
  console.log("📋 Генерируем data-contracts...");

  // Копируем data-contracts из http-clients в types
  const httpClientsDataContractsPath = resolve(
    OUTPUT_DIR_HTTP_CLIENTS,
    "data-contracts.ts"
  );
  const typesDataContractsPath = resolve(OUTPUT_DIR_TYPES, "data-contracts.ts");

  if (fs.existsSync(httpClientsDataContractsPath)) {
    // Гарантируем, что папка types существует
    if (!fs.existsSync(OUTPUT_DIR_TYPES)) {
      fs.mkdirSync(OUTPUT_DIR_TYPES, { recursive: true });
    }
    fs.copyFileSync(httpClientsDataContractsPath, typesDataContractsPath);
    console.log("✅ Data-contracts скопированы в types/data-contracts.ts");

    // Заменяем дублирующиеся OperationResult типы на обобщенный
    replaceOperationResultTypes(typesDataContractsPath);

    // Удаляем временный файл из http-clients (он нам больше не нужен)
    fs.unlinkSync(httpClientsDataContractsPath);
    console.log("   🗑️ Временный data-contracts.ts удален из http-clients");
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
    hooks: {
      onCreateComponent: component => {
        // Перехватываем создание компонентов типов
        if (
          component.typeName &&
          component.typeName.endsWith("OperationResult")
        ) {
          // Помечаем OperationResult типы для последующей обработки
          component._isOperationResult = true;
        }
        return component;
      },
      onFormatTypeName: (typeName, formatType) => {
        // Трансформируем имена типов OperationResult
        if (typeName.endsWith("OperationResult") && formatType !== "file") {
          // Извлекаем базовый тип из имени
          const match = typeName.match(
            /^(.+?)(IEnumerable|List|Array)?OperationResult$/
          );
          if (match) {
            const [, baseType, collection] = match;
            const collectionSuffix = collection ? "[]" : "";
            return `OperationResult<${baseType}${collectionSuffix}>`;
          }
        }
        return typeName;
      },
    },
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
      // Используем TypeWithGeneric для корректной генерации Generic типов
      TypeWithGeneric: (typeName, genericArgs) =>
        `${typeName}<${Array.isArray(genericArgs) ? genericArgs.join(", ") : genericArgs}>`,
    }),
  });

  // Исправляем импорты в каждом клиенте на общий источник типов и удаляем локальные data-contracts
  const clientFiles = fs
    .readdirSync(OUTPUT_DIR_HTTP_CLIENTS)
    .filter(file => file.endsWith(".ts"));

  console.log(
    `\n🔧 Обрабатываем ${clientFiles.length} файлов HTTP клиентов...`
  );

  clientFiles.forEach(file => {
    const filePath = resolve(OUTPUT_DIR_HTTP_CLIENTS, file);

    // Если это файл с типами, переименовываем его в data-contracts.ts для обратной совместимости
    if (file === "types.ts") {
      const dataContractsPath = resolve(
        OUTPUT_DIR_HTTP_CLIENTS,
        "data-contracts.ts"
      );
      fs.renameSync(filePath, dataContractsPath);
      console.log(
        "   📋 Переименован types.ts в data-contracts.ts для обратной совместимости"
      );
      return;
    }

    // Если это data-contracts.ts, оставляем как есть
    if (file === "data-contracts.ts") {
      return;
    }

    let content = fs.readFileSync(filePath, "utf-8");

    // Заменяем импорты локальных контрактов на общий файл типов
    const importsBefore = (content.match(/import.*from.*data-contracts/g) || [])
      .length;

    // Функция для парсинга импортов с учетом Generic типов
    const parseImports = importString => {
      const baseTypes = new Set();
      const enumTypes = new Set();
      const paramsTypes = new Set();

      // Разбиваем по запятым, учитывая вложенные <>
      let currentToken = "";
      let bracketDepth = 0;

      for (let char of importString + ",") {
        if (char === "<") {
          bracketDepth++;
        } else if (char === ">") {
          bracketDepth--;
        } else if (char === "," && bracketDepth === 0) {
          const trimmed = currentToken.trim();
          if (trimmed) {
            // Если это OperationResult<ConcreteType>, извлекаем ConcreteType
            const genericMatch = trimmed.match(/^OperationResult<(.+)>$/);
            if (genericMatch) {
              const innerType = genericMatch[1];
              // Убираем [] для массивов и добавляем базовый тип
              const cleanType = innerType.replace(/\[\]$/, "");
              if (
                !cleanType.match(
                  /^(string|number|boolean|object|any|Int32|String|Object)$/i
                )
              ) {
                baseTypes.add(cleanType);
              }
            }
            // Проверяем на формат без угловых скобок: OperationResultTypeName или OperationResultTypeName[]
            else if (trimmed.match(/^OperationResult[A-Z]/)) {
              // Извлекаем тип: OperationResultApiMediaInfo[] -> ApiMediaInfo
              const typeMatch = trimmed.match(
                /^OperationResult([A-Z][a-zA-Z0-9]*)/
              );
              if (typeMatch) {
                const extractedType = typeMatch[1];
                if (!extractedType.match(/^(Int32|String|Object)$/)) {
                  baseTypes.add(extractedType);
                }
              }
            } else if (trimmed.includes("Params") && trimmed.endsWith("Enum")) {
              // Это enum параметров, сохраняем отдельно
              paramsTypes.add(trimmed);
            } else if (trimmed.endsWith("Enum")) {
              // Это обычный enum, сохраняем
              enumTypes.add(trimmed);
            } else if (trimmed.endsWith("OperationResult")) {
              // Пропускаем конкретные OperationResult типы - они будут заменены на generic
              // Не добавляем их в импорты
            } else if (trimmed !== "OperationResult") {
              // Обычный тип, сохраняем
              baseTypes.add(trimmed);
            }
          }
          currentToken = "";
        } else {
          currentToken += char;
        }
      }

      return { baseTypes, enumTypes, paramsTypes };
    };

    // Обрабатываем все импорты (могут быть многострочными)
    content = content.replace(
      /import\s+(?:type\s*)?\{([^}]+)\}\s+from\s+["']\.\/data-contracts["']/gs,
      (_m, p1) => {
        const { baseTypes, enumTypes, paramsTypes } = parseImports(p1);

        // Всегда добавляем базовый OperationResult
        baseTypes.add("OperationResult");

        // Объединяем все типы в правильном порядке
        const allTypes = [
          ...Array.from(baseTypes).sort(),
          ...Array.from(enumTypes).sort(),
          ...Array.from(paramsTypes).sort(),
        ];

        const cleanedImports = allTypes.join(", ");

        return `import type { ${cleanedImports} } from "../types/data-contracts";`;
      }
    );

    // Заменяем использования конкретных типов OperationResult на обобщенный
    // в сигнатурах методов и типах возврата
    content = content.replace(
      /:\s*Promise<HttpResponse<(\w+)(IEnumerable|List|Array)?OperationResult(?!<)/g,
      (match, typeName, collection) => {
        if (collection) {
          return `: Promise<HttpResponse<OperationResult<${typeName}[]>`;
        }
        return `: Promise<HttpResponse<OperationResult<${typeName}>`;
      }
    );

    // Убираем лишние пустые строки и запятые в импортах
    content = content.replace(/\n\s*\n\s*\n/g, "\n\n");
    content = content.replace(/,\s*,/g, ","); // Двойные запятые
    content = content.replace(/,\s*\}/g, "}"); // Запятая перед закрывающей скобкой

    fs.writeFileSync(filePath, content);

    if (importsBefore > 0) {
      console.log(`   ✓ ${file}: очищено импортов`);
    }
  });

  console.log("\n✅ HTTP клиенты сгенерированы и обработаны в http-clients/");
  console.log("   ✓ Импорты переведены на общий источник типов");
  console.log("   ✓ Удалены конкретные типы OperationResult<T> из импортов");
}

// Функция для извлечения всех экспортируемых типов из файла
function extractExportedTypes(filePath) {
  if (!fs.existsSync(filePath)) {
    return new Set();
  }

  const content = fs.readFileSync(filePath, "utf-8");
  const exportedTypes = new Set();

  // Паттерны для различных экспортов
  const patterns = [
    /export\s+interface\s+(\w+)/g,
    /export\s+type\s+(\w+)\s*=/g,
    /export\s+enum\s+(\w+)/g,
    /export\s+class\s+(\w+)/g,
  ];

  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      exportedTypes.add(match[1]);
    }
  });

  return exportedTypes;
}

// Функция для удаления дублирующихся типов из файла
function removeDuplicateTypes(filePath, typesToRemove) {
  if (!fs.existsSync(filePath) || typesToRemove.size === 0) {
    return;
  }

  let content = fs.readFileSync(filePath, "utf-8");
  let removedCount = 0;

  typesToRemove.forEach(typeName => {
    // Удаляем interface с JSDoc комментариями
    const interfacePattern = new RegExp(
      `(?:\\/\\*\\*[\\s\\S]*?\\*\\/\\s*)?export\\s+interface\\s+${typeName}\\s*\\{[\\s\\S]*?\\n\\}\\s*`,
      "g"
    );
    const beforeInterface = content;
    content = content.replace(interfacePattern, "");
    if (content !== beforeInterface) removedCount++;

    // Удаляем enum с JSDoc комментариями
    const enumPattern = new RegExp(
      `(?:\\/\\*\\*[\\s\\S]*?\\*\\/\\s*)?export\\s+enum\\s+${typeName}\\s*\\{[\\s\\S]*?\\n\\}\\s*`,
      "g"
    );
    const beforeEnum = content;
    content = content.replace(enumPattern, "");
    if (content !== beforeEnum) removedCount++;

    // Удаляем type с JSDoc комментариями
    const typePattern = new RegExp(
      `(?:\\/\\*\\*[\\s\\S]*?\\*\\/\\s*)?export\\s+type\\s+${typeName}\\s*=[\\s\\S]*?;\\s*`,
      "g"
    );
    const beforeType = content;
    content = content.replace(typePattern, "");
    if (content !== beforeType) removedCount++;
  });

  // Очищаем избыточные пустые строки
  content = content.replace(/\n{3,}/g, "\n\n");

  fs.writeFileSync(filePath, content);
  return removedCount;
}

// Функция для извлечения определений типов из файла (полное определение, не только имя)
function extractTypeDefinitions(filePath) {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const content = fs.readFileSync(filePath, "utf-8");
  const definitions = [];

  // Паттерны для различных экспортов с полным определением
  const patterns = [
    {
      // interface с возможным JSDoc
      regex: /(?:\/\*\*[\s\S]*?\*\/\s*)?export\s+interface\s+(\w+)[\s\S]*?\n}/g,
      type: "interface",
    },
    {
      // type с возможным JSDoc
      regex: /(?:\/\*\*[\s\S]*?\*\/\s*)?export\s+type\s+(\w+)\s*=[\s\S]*?;/g,
      type: "type",
    },
    {
      // enum с возможным JSDoc
      regex: /(?:\/\*\*[\s\S]*?\*\/\s*)?export\s+enum\s+(\w+)\s*\{[\s\S]*?\n}/g,
      type: "enum",
    },
  ];

  patterns.forEach(({ regex, type }) => {
    let match;
    const contentCopy = content;
    regex.lastIndex = 0;
    while ((match = regex.exec(contentCopy)) !== null) {
      definitions.push({
        name: match[1],
        type: type,
        fullDefinition: match[0],
      });
    }
  });

  return definitions;
}

// Функция для объединения SignalR типов в data-contracts
async function mergeSignalRTypesIntoDataContracts() {
  console.log("📡 Добавляем уникальные SignalR типы в data-contracts...");

  const swaggerHubsJsonPath = resolve(process.cwd(), "./api/swagger_hubs.json");
  const tempDir = resolve(OUTPUT_DIR_ROOT, ".temp");

  // Создаем временную директорию
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  // Генерируем SignalR типы во временную папку
  await generateApi({
    input: swaggerHubsJsonPath,
    output: tempDir,
    name: "signalr-temp.ts",
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
  const apiFilePath = resolve(tempDir, "Api.ts");
  const tempSignalrFilePath = resolve(tempDir, "signalr-temp.ts");
  if (fs.existsSync(apiFilePath)) {
    fs.renameSync(apiFilePath, tempSignalrFilePath);
  }

  const dataContractsPath = resolve(OUTPUT_DIR_TYPES, "data-contracts.ts");

  // Извлекаем типы из обоих файлов
  const dataContractsTypes = extractExportedTypes(dataContractsPath);
  const signalrDefinitions = extractTypeDefinitions(tempSignalrFilePath);

  // Находим уникальные типы, которых нет в data-contracts
  const uniqueSignalRDefinitions = signalrDefinitions.filter(
    def => !dataContractsTypes.has(def.name)
  );

  const duplicateCount =
    signalrDefinitions.length - uniqueSignalRDefinitions.length;

  console.log(
    `   Найдено ${signalrDefinitions.length} SignalR типов, из них ${duplicateCount} дубликатов`
  );

  if (uniqueSignalRDefinitions.length > 0) {
    console.log(
      `   Добавляем ${uniqueSignalRDefinitions.length} уникальных SignalR типов в data-contracts.ts:`
    );
    console.log(
      `   ${uniqueSignalRDefinitions.map(def => def.name).join(", ")}`
    );

    // Читаем data-contracts
    let dataContractsContent = fs.readFileSync(dataContractsPath, "utf-8");

    // Добавляем уникальные типы в конец файла
    const signalRSection = `\n// ========================================\n// SignalR-специфичные типы\n// ========================================\n\n${uniqueSignalRDefinitions.map(def => def.fullDefinition).join("\n\n")}\n`;

    dataContractsContent = dataContractsContent.trimEnd() + signalRSection;

    // Сохраняем и применяем дедупликацию enum'ов
    fs.writeFileSync(dataContractsPath, dataContractsContent);
    deduplicateEnums(dataContractsPath);

    console.log("   ✓ Уникальные SignalR типы добавлены в data-contracts.ts");
  } else {
    console.log("   ✓ Все SignalR типы уже присутствуют в data-contracts.ts");
  }

  // Удаляем временную директорию
  fs.rmSync(tempDir, { recursive: true, force: true });
  console.log("   🗑️ Временные файлы удалены");

  console.log("✅ Все типы объединены в types/data-contracts.ts");
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

// Импорты типов (все типы из одного источника)
export * from "./types/data-contracts";

// Импорты HTTP клиентов
${CONTROLLERS.map(controller => `export { ${controller} } from "./http-clients/${controller}";`).join("\n")}

// Импорты SignalR клиентов
${SIGNALR_HUBS.map(hub => `export { ${hub.name}SignalRConnectionBuilder } from "./signalr-clients/${hub.name}/SignalRContext";`).join("\n")}
${SIGNALR_HUBS.map(hub => `export { ${hub.name}SignalRContext } from "./signalr-clients/${hub.name}/SignalRHubWrapper";`).join("\n")}
${SIGNALR_HUBS.map(hub => `export { ${hub.name}SignalRHubWrapper } from "./signalr-clients/${hub.name}/SignalRHubWrapper";`).join("\n")}
`;

  fs.writeFileSync(resolve(OUTPUT_DIR_ROOT, "index.ts"), indexContent);
  console.log("✅ Индексный файл создан (единый источник типов)");
}

// Функция для форматирования сгенерированных файлов с помощью Prettier
async function formatGeneratedFiles() {
  console.log("\n🎨 Форматируем сгенерированные файлы с помощью Prettier...");

  return new Promise(resolve => {
    // Запускаем Prettier для папки api
    const prettierCmd = `yarn prettier --write "src/shared/api/**/*.{ts,tsx}"`;

    exec(prettierCmd, { shell: "powershell.exe" }, (error, stdout, stderr) => {
      if (error) {
        console.warn(
          `⚠️ Prettier завершился с предупреждением: ${error.message}`
        );
        // Не прерываем процесс, так как это не критично
        resolve();
        return;
      }

      if (stderr) {
        console.log(`   ${stderr.trim()}`);
      }

      console.log("✅ Prettier форматирование завершено");
      resolve();
    });
  });
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

    // Создаем утилиты конфигурации API
    createApiConfig();

    // Генерируем HTTP клиенты (они создают data-contracts.ts в http-clients/)
    await generateHttpClients();

    // Копируем data-contracts в папку types после генерации HTTP клиентов
    await generateDataContracts();

    // ВАЖНО: Объединяем SignalR типы в data-contracts ПОСЛЕ его создания
    await mergeSignalRTypesIntoDataContracts();

    await generateSignalRClients();

    // Не создаем файлы обратной совместимости: используем единый источник типов в ./types

    // Создаем индексный файл
    createIndexFile();

    // Форматируем все сгенерированные файлы с помощью Prettier
    await formatGeneratedFiles();

    console.log("\n" + "=".repeat(60));
    console.log("🎉 Генерация API завершена успешно!");
    console.log("=".repeat(60));
    console.log("\n📁 Структура папок:");
    console.log("   ├─ types/");
    console.log("   │  └─ data-contracts.ts (все типы из API и SignalR)");
    console.log("   ├─ http-clients/ (HTTP клиенты)");
    console.log("   ├─ signalr-clients/ (SignalR клиенты)");
    console.log("   └─ index.ts (экспорты)");

    console.log("\n✨ Улучшения:");
    console.log(
      "   ✓ Все типы *OperationResult заменены на OperationResult<T>"
    );
    console.log("   ✓ Единый источник типов в types/data-contracts.ts");
    console.log("   ✓ Улучшена типизация с Generic типами");
    console.log("   ✓ HTTP и SignalR клиенты используют один файл типов");
    console.log("   ✓ Автоматическое объединение типов из API и Hubs");

    console.log("\n📝 Пример использования:");
    console.log(
      "   import { OperationResult, AutoMessageDto } from '@/shared/api';"
    );
    console.log(
      "   const response: OperationResult<AutoMessageDto> = await api.get();"
    );
    console.log("   if (response.success && response.data) { ... }");
    console.log("\n" + "=".repeat(60) + "\n");
  } catch (error) {
    console.error("\n" + "=".repeat(60));
    console.error("❌ Ошибка при генерации API");
    console.error("=".repeat(60));
    console.error(error);
    console.error("=".repeat(60) + "\n");
    process.exit(1);
  }
}

// Запускаем генерацию
main();
