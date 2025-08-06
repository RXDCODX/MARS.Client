# Generated API Client

Автоматически сгенерированный API клиент для проекта MARS.

## Поддержка VITE_BASE_PATH в рантайме

Клиент поддерживает настройку базового пути через переменную окружения `VITE_BASE_PATH` с определением в рантайме.

### Настройка

1. Создайте файл `.env` в корне проекта
2. Добавьте переменную `VITE_BASE_PATH`:

```env
# Примеры настройки базового пути
VITE_BASE_PATH=/api/v1
# или
VITE_BASE_PATH=https://api.example.com
# или
VITE_BASE_PATH=http://localhost:5000/api
```

### Использование

#### Автоматическое использование базового пути в рантайме

```typescript
import { CommandsService } from "@/shared/api/generated";

// Автоматически использует VITE_BASE_PATH в рантайме
const commandsService = new CommandsService();

// Запрос будет отправлен на: {VITE_BASE_PATH}/api/commands/user/platform/Api/info
const userCommands = await commandsService.getUserCommandsInfoForPlatform("Api");
```

#### Ручное указание базового пути

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

## Доступные сервисы

- `CheckersService` - работа с checkers
- `CommandsService` - работа с commands
- `ScoreboardService` - работа с scoreboard
- `ServiceManagerService` - работа с servicemanager
- `SoundBarService` - работа с soundbar

## SignalR клиенты

- `ScoreboardHubService` - SignalR для scoreboardhub
- `SoundRequestHubService` - SignalR для soundrequesthub
- `TelegramusHubService` - SignalR для telegramushub
- `TunaHubService` - SignalR для tunahub

## Типы

Все типы экспортируются из `./types` и доступны для импорта:

```typescript
import { 
  CommandInfo, 
  CommandParameterInfo,
  CommandInfoAvailablePlatformsEnum 
} from "@/shared/api/generated";
```

## Особенности рантайм определения

- Базовый путь определяется в рантайме, а не при сборке
- Поддерживает как браузерную (import.meta.env), так и серверную (process.env) среду
- Автоматически обрабатывает trailing slash
- Fallback на пустую строку если переменная не установлена
