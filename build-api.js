import { resolve } from "path";
import { generateApi } from "swagger-typescript-api";
import process from "process";

const params = {
  input: resolve(process.cwd(), "./api/swagger.json"),
  output: resolve(process.cwd(), "./src/shared/api/generated/"),
  name: "baza.ts",
  cleanOutput: true,
  prettier: {
    trailingComma: "all",
    tabWidth: 4,
    printWidth: 160,
  },
  generateClient: false,
  sortTypes: true,
  extractEnums: true,
  codeGenConstructs: (constructs) => ({
    ...constructs,
    NullValue: () => "undefined", // Заменяем null на undefined
    TypeField: ({ readonly, key, value }) => {
      // Обрабатываем nullable типы в полях
      const finalValue = value.includes(" | null")
        ? value.replace(" | null", " | undefined") // Заменяем null на undefined
        : value;
      return [...(readonly ? ["readonly "] : []), key, ": ", finalValue].join(
        "",
      );
    },
  }),
};

generateApi(params);
