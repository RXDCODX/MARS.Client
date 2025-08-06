// Автоматически сгенерированный индексный файл
// Импорты типов
export * from './types';
export * from './signalr_types';

// Импорты утилит конфигурации
export * from './api-config';

// Импорты клиентов контроллеров
export { CheckersService } from './checkers-client';
export { CommandsService } from './commands-client';
export { ScoreboardService } from './scoreboard-client';
export { ServiceManagerService } from './servicemanager-client';
export { SoundBarService } from './soundbar-client';

// Импорты SignalR клиентов
export { ScoreboardHubService } from './scoreboardhub-client';
export { SoundRequestHubService } from './soundrequesthub-client';
export { TelegramusHubService } from './telegramushub-client';
export { TunaHubService } from './tunahub-client';

// Основной HTTP клиент (для обратной совместимости)
export { HttpClient } from './types';
