import { ILogger } from "@microsoft/signalr";

const LogLevelNames = {
  [0]: "Trace",
  [1]: "Debug",
  [2]: "Information",
  [3]: "Warning",
  [4]: "Error",
  [5]: "Critical",
  [6]: "None",
} as const;

type LogLevel = keyof typeof LogLevelNames;

export const logger: ILogger = {
  log: (level: number, message: string) => {
    if (!(level in LogLevelNames)) {
      console.log("%cUnknown level:", "color: red;", message);
      return;
    }

    const levelName = LogLevelNames[level as LogLevel];
    const levelColor = getLevelColor(level);

    // Пытаемся найти и распарсить JSON (для WebSocket)
    const jsonData = tryParseJson(message);

    if (jsonData) {
      // Если это JSON - выводим как объект с подсветкой
      console.log(
        `%c${levelName}:%c (JSON)`,
        `color: ${levelColor}; font-weight: bold;`,
        "color: gray;",
        jsonData
      );
    } else {
      // Обычное сообщение
      console.log(
        `%c${levelName}:%c`,
        `color: ${levelColor}; font-weight: bold;`,
        "color: inherit;",
        message
      );
    }
  },
};

// Вспомогательные функции
function tryParseJson(str: string) {
  try {
    // Ищем JSON в строках вида: Content: '{"protocol":"json"}'
    const jsonMatch = str.match("Content: '(.*?)[\u001E']");
    const jsonString = jsonMatch?.[1] || str;

    return JSON.parse(jsonString);
  } catch {
    return null;
  }
}

function getLevelColor(level: number): string {
  switch (level) {
    case 0:
      return "#9E9E9E"; // Trace - серый
    case 1:
      return "#4CAF50"; // Debug - зеленый
    case 2:
      return "#2196F3"; // Info - синий
    case 3:
      return "#FFC107"; // Warning - желтый
    case 4:
      return "#F44336"; // Error - красный
    case 5:
      return "#9C27B0"; // Critical - фиолетовый
    default:
      return "#34aeeb";
  }
}
