# API Генератор

Этот каталог содержит автоматически сгенерированные файлы API для проекта MARS.

## Структура файлов

### Типы
- `types.ts` - Основные типы API (интерфейсы, энумы, типы данных)
- `signalr_types.ts` - Типы для SignalR хабов

### Клиенты контроллеров
- `checkers-client.ts` - Клиент для контроллера Checkers
- `commands-client.ts` - Клиент для контроллера Commands  
- `servicemanager-client.ts` - Клиент для контроллера ServiceManager
- `soundbar-client.ts` - Клиент для контроллера SoundBar

### SignalR клиенты
- `scoreboardhub-client.ts` - Клиент для ScoreboardHub
- `soundrequesthub-client.ts` - Клиент для SoundRequestHub
- `tunahub-client.ts` - Клиент для TunaHub

### Основные файлы
- `axios-client.ts` - Основной axios клиент (для обратной совместимости)
- `index.ts` - Индексный файл с экспортами всех модулей

## Использование

### Импорт типов
```typescript
import { MoveRequest, PlayerState } from './types';
import { ScoreboardDto } from './signalr_types';
```

### Импорт клиентов
```typescript
// Импорт конкретного контроллера
import { CheckersService } from './checkers-client';

// Импорт SignalR клиента
import { ScoreboardHubService } from './scoreboardhub-client';

// Импорт основного клиента
import { ApiService } from './axios-client';
```

### Использование клиентов
```typescript
// Использование контроллера
const checkersService = new CheckersService();
await checkersService.start();
await checkersService.move(moveRequest);

// Использование SignalR хаба
const scoreboardHub = new ScoreboardHubService();
scoreboardHub.onScoreboardUpdate((data) => {
  console.log('Scoreboard updated:', data);
});
```

## Регенерация API

Для обновления API файлов запустите:

```bash
cd mars.client
node build-api.js
```

## Примечания

- Все файлы генерируются автоматически из `swagger.json`
- Не редактируйте файлы вручную - изменения будут перезаписаны при регенерации
- Для добавления новых контроллеров обновите `swagger.json` и перезапустите генератор 