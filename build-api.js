import { resolve } from "path";
import { generateApi } from "swagger-typescript-api";
import process from "process";
import { codegen } from "swagger-axios-codegen";
import fs from "fs";

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
  generateClient: true,
  sortTypes: true,
  extractEnums: true,

  codeGenConstructs: (constructs) => ({
    ...constructs,
    NullValue: () => "undefined",
    TypeField: ({ readonly, key, value }) => {
      const finalValue = value.includes(" | null")
        ? value.replace(" | null", " | undefined")
        : value;
      return [...(readonly ? ["readonly "] : []), key, ": ", finalValue].join(
        "",
      );
    },
  }),
};

generateApi(params).then(() => {
  // Читаем swagger.json как объект
  const swaggerJsonPath = resolve(process.cwd(), "./api/swagger.json");
  const swaggerSource = JSON.parse(fs.readFileSync(swaggerJsonPath, "utf-8"));
  codegen({
    methodNameMode: "operationId",
    source: swaggerSource,
    outputDir: resolve(process.cwd(), "./src/shared/api/generated/"),
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
});
