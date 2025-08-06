# Резюме реализации рантайм определения VITE_BASE_PATH

## Выполненные изменения

### 1. Обновление build-api.js

#### Добавлена функция `createApiConfig()` с рантайм определением
- ✅ Создает файл `api-config.ts` с утилитами для работы с `VITE_BASE_PATH` в рантайме
- ✅ Функция `getApiBaseUrl()` - определяет базовый URL в рантайме (не при сборке)
- ✅ Поддержка как браузерной (`import.meta.env`), так и серверной (`process.env`) среды
- ✅ Автоматическая обработка trailing slash
- ✅ Fallback на пустую строку если переменная не установлена

#### Обновлена функция `generateMainAxiosClient()`
- ✅ После генерации axios-client.ts автоматически заменяет статический `basePath = ""` на динамический IIFE
- ✅ Использует IIFE (Immediately Invoked Function Expression) для рантайм определения
- ✅ Поддерживает как браузерную, так и серверную среду

#### Обновлены функции генерации клиентов
- ✅ `generateControllerClients()` - все контроллеры теперь используют `getApiBaseUrl()` в рантайме
- ✅ `generateSignalRClients()` - все SignalR клиенты теперь используют `getApiBaseUrl()` в рантайме
- ✅ Добавлены импорты `getApiBaseUrl` из `./api-config`

### 2. Созданные файлы

#### api-config.ts с рантайм определением
```typescript
/**
 * Получает базовый URL для API запросов в рантайме
 * Учитывает VITE_BASE_PATH из переменных окружения
 */
export function getApiBaseUrl(): string {
  // В браузере используем import.meta.env
  if (typeof window !== 'undefined' && typeof import.meta !== 'undefined') {
    const basePath = import.meta.env.VITE_BASE_PATH;
    if (basePath) {
      return basePath.replace(/\/$/, "");
    }
  }
  
  // В Node.js используем process.env
  if (typeof process !== 'undefined' && process.env) {
    const basePath = process.env.VITE_BASE_PATH;
    if (basePath) {
      return basePath.replace(/\/$/, "");
    }
  }
  
  // По умолчанию возвращаем пустую строку
  return "";
}
```

#### Обновленный axios-client.ts с IIFE
```typescript
// Динамически определяем базовый путь в рантайме
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
})();
```

#### Обновленные клиенты контроллеров
```typescript
constructor(baseURL?: string) {
  // Используем переданный baseURL или получаем из переменных окружения в рантайме
  const apiBaseUrl = baseURL || getApiBaseUrl();
  this.httpClient = new HttpClient({ baseUrl: apiBaseUrl });
}
```

### 3. Использование

#### Настройка переменных окружения
Создайте файл `.env` в корне проекта:

```env
# Для разработки
VITE_BASE_PATH=http://localhost:5000/api

# Для продакшена
VITE_BASE_PATH=https://api.example.com/api

# Или относительный путь
VITE_BASE_PATH=/api/v1
```

#### Автоматическое использование в рантайме
```typescript
import { CommandsService } from "@/shared/api/generated";

// Автоматически использует VITE_BASE_PATH в рантайме
const commandsService = new CommandsService();

// Запрос будет отправлен на: {VITE_BASE_PATH}/api/commands/user/platform/Api/info
const userCommands = await commandsService.getUserCommandsInfoForPlatform("Api");
```

#### Ручное переопределение
```typescript
import { CommandsService } from "@/shared/api/generated";

// Переопределяем базовый путь
const commandsService = new CommandsService("https://custom-api.com");

// Запрос будет отправлен на: https://custom-api.com/api/commands/user/platform/Api/info
const userCommands = await commandsService.getUserCommandsInfoForPlatform("Api");
```

#### Использование утилит
```typescript
import { getApiBaseUrl, createApiUrl } from "@/shared/api/generated";

// Получить базовый URL в рантайме
const baseUrl = getApiBaseUrl(); // например: "/api/v1"

// Создать полный URL для endpoint
const fullUrl = createApiUrl("/api/commands"); // например: "/api/v1/api/commands"
```

### 4. Преимущества рантайм определения

1. **Гибкость**: Базовый путь определяется в момент выполнения, а не при сборке
2. **Универсальность**: Поддерживает как браузерную, так и серверную среду
3. **Динамичность**: Можно изменять API endpoint без пересборки приложения
4. **Обратная совместимость**: Сохранена возможность ручного переопределения
5. **Автоматическая обработка**: Trailing slash и fallback значения

### 5. Особенности реализации

#### IIFE в axios-client.ts
```typescript
export const basePath = (() => {
  // Логика определения в рантайме
  return result;
})();
```

#### Универсальная функция getApiBaseUrl()
```typescript
export function getApiBaseUrl(): string {
  // Проверяем среду выполнения
  if (typeof window !== 'undefined' && typeof import.meta !== 'undefined') {
    // Браузерная среда
  }
  
  if (typeof process !== 'undefined' && process.env) {
    // Серверная среда
  }
  
  return "";
}
```

### 6. Запуск генератора

```bash
cd mars.client
node build-api.js
```

Генератор автоматически:
- Создаст/обновит `api-config.ts` с рантайм определением
- Обновит `basePath` в `axios-client.ts` с IIFE
- Обновит все клиенты контроллеров для использования рантайм определения
- Создаст/обновит `index.ts` с экспортами
- Создаст/обновит `README.md` с документацией

### 7. Проверка работы

```bash
# Проверка типов
yarn tsc --noEmit

# Сборка проекта
yarn build
```

## Заключение

Генератор API теперь создает клиенты с рантайм определением `VITE_BASE_PATH`. Это обеспечивает максимальную гибкость и позволяет изменять API endpoints без пересборки приложения. Базовый путь определяется в момент выполнения запроса, что делает систему более динамичной и адаптивной к различным окружениям. 