/**
 * Регистрация mock-сценариев для SignalR хабов
 *
 * Этот файл импортируется в main.tsx и регистрирует все доступные сценарии
 * для использования в Storybook и тестировании компонентов
 */

import { mockScenarioRegistry } from './MockScenarioRegistry';

// ============================================================================
// SCOREBOARD HUB
// ============================================================================

mockScenarioRegistry.registerScenarios('ScoreboardHub', 'ReceiveState', [
  {
    id: 'initial-state',
    name: 'Начальное состояние (0-0)',
    description: 'Счет 0-0, ничья',
    data: {
      homeScore: 0,
      awayScore: 0,
      homeTeam: 'Команда 1',
      awayTeam: 'Команда 2',
      timeElapsed: 0,
      status: 'idle',
    },
  },
  {
    id: 'active-game',
    name: 'Активная игра (5-3)',
    description: 'Идет матч, счет 5-3',
    data: {
      homeScore: 5,
      awayScore: 3,
      homeTeam: 'FC Home',
      awayTeam: 'FC Away',
      timeElapsed: 1250,
      status: 'playing',
    },
  },
  {
    id: 'game-finished',
    name: 'Игра завершена (10-8)',
    description: 'Матч закончился, финальный счет 10-8',
    data: {
      homeScore: 10,
      awayScore: 8,
      homeTeam: 'FC Home',
      awayTeam: 'FC Away',
      timeElapsed: 3600,
      status: 'finished',
    },
  },
]);

mockScenarioRegistry.registerScenarios('ScoreboardHub', 'StateChanged', [
  {
    id: 'score-updated',
    name: 'Счет обновлен',
    description: 'Счет дома увеличился на 1 очко',
    data: {
      field: 'homeScore',
      oldValue: 4,
      newValue: 5,
      timestamp: new Date().toISOString(),
    },
  },
  {
    id: 'time-updated',
    name: 'Время обновлено',
    description: 'Прошла еще одна секунда матча',
    data: {
      field: 'timeElapsed',
      oldValue: 1250,
      newValue: 1251,
      timestamp: new Date().toISOString(),
    },
  },
]);

// ============================================================================
// TELEGRAMUS HUB
// ============================================================================

mockScenarioRegistry.registerScenarios('TelegramusHub', 'NewMessage', [
  {
    id: 'simple-message',
    name: 'Простое сообщение',
    description: 'Обычное текстовое сообщение от пользователя',
    data: {
      id: 'msg-1',
      username: 'TestUser',
      message: 'Привет! Это тестовое сообщение',
      color: '#FF0000',
      timestamp: new Date().toISOString(),
    },
  },
  {
    id: 'message-with-emotes',
    name: 'Сообщение с эмотами',
    description: 'Сообщение содержит emotes',
    data: {
      id: 'msg-2',
      username: 'EmoteUser',
      message: 'Классно Kappa Pog',
      color: '#1E90FF',
      emotes: [
        { id: '33', positions: [[7, 12]] },
        { id: '88', positions: [[13, 16]] },
      ],
      timestamp: new Date().toISOString(),
    },
  },
  {
    id: 'long-message',
    name: 'Длинное сообщение',
    description: 'Сообщение с большим объемом текста',
    data: {
      id: 'msg-3',
      username: 'LongMessageUser',
      message: 'Это очень длинное сообщение которое содержит много текста и должно красиво виться в интерфейсе чата. Оно может содержать несколько строк и тестировать верстку.',
      color: '#00FF00',
      timestamp: new Date().toISOString(),
    },
  },
]);

mockScenarioRegistry.registerScenarios('TelegramusHub', 'PostTwitchInfo', [
  {
    id: 'twitch-info',
    name: 'Информация Twitch',
    description: 'Получена информация о Twitch аккаунте',
    data: {
      clientId: 'test-client-id-12345',
      clientSecret: 'test-secret-67890',
      isAuthorized: true,
      username: 'TestStreamer',
    },
  },
]);

mockScenarioRegistry.registerScenarios('TelegramusHub', 'UpdateWaifuPrizes', [
  {
    id: 'waifus-list',
    name: 'Список waifus',
    description: 'Получена информация о доступных вайфу',
    data: [
      {
        id: 'waifu-1',
        name: 'Miku',
        imageUrl: 'https://example.com/miku.png',
        price: 100,
      },
      {
        id: 'waifu-2',
        name: 'Rin',
        imageUrl: 'https://example.com/rin.png',
        price: 150,
      },
    ],
  },
]);

// ============================================================================
// SOUND REQUEST HUB
// ============================================================================

mockScenarioRegistry.registerScenarios('SoundRequestHub', 'PlayerStateChange', [
  {
    id: 'player-idle',
    name: 'Плеер в режиме ожидания',
    description: 'Плеер неактивен, ничего не играет',
    data: {
      status: 'idle',
      currentTrack: null,
      isPlaying: false,
      volume: 0.5,
    },
  },
  {
    id: 'player-playing',
    name: 'Плеер воспроизводит трек',
    description: 'Активное воспроизведение музыки',
    data: {
      status: 'playing',
      currentTrack: {
        id: 'track-1',
        trackName: 'Play Button OST',
        artist: 'Composer',
        duration: 180,
      },
      isPlaying: true,
      volume: 0.8,
      currentTime: 45,
    },
  },
  {
    id: 'player-paused',
    name: 'Плеер на паузе',
    description: 'Воспроизведение приостановлено',
    data: {
      status: 'paused',
      currentTrack: {
        id: 'track-1',
        trackName: 'Play Button OST',
        artist: 'Composer',
        duration: 180,
      },
      isPlaying: false,
      volume: 0.8,
      currentTime: 45,
    },
  },
]);

mockScenarioRegistry.registerScenarios('SoundRequestHub', 'Started', [
  {
    id: 'track-started',
    name: 'Трек начал воспроизведение',
    description: 'Музыкальный трек начинает играть',
    data: {
      id: 'track-1',
      trackName: 'Play Button OST',
      artist: 'Composer',
      duration: 180,
      currentTime: 0,
      source: 'youtube',
    },
  },
]);

mockScenarioRegistry.registerScenarios('SoundRequestHub', 'Ended', [
  {
    id: 'track-ended',
    name: 'Трек завершен',
    description: 'Трек дошел до конца',
    data: {
      id: 'track-1',
      trackName: 'Play Button OST',
      duration: 180,
      totalTime: 180,
    },
  },
]);

mockScenarioRegistry.registerScenarios('SoundRequestHub', 'QueueChanged', [
  {
    id: 'queue-empty',
    name: 'Пустая очередь',
    description: 'Очередь не содержит треков',
    data: [],
  },
  {
    id: 'queue-with-tracks',
    name: 'Очередь с треками',
    description: 'В очередь добавлены новые треки',
    data: [
      {
        id: 'track-2',
        trackName: 'Next Track',
        artist: 'Artist Name',
        duration: 240,
        requestedBy: 'User123',
      },
      {
        id: 'track-3',
        trackName: 'Another Track',
        artist: 'Another Artist',
        duration: 200,
        requestedBy: 'User456',
      },
      {
        id: 'track-4',
        trackName: 'Third Track',
        artist: 'Third Artist',
        duration: 150,
        requestedBy: 'User789',
      },
    ],
  },
]);

// ============================================================================
// LOGGER HUB
// ============================================================================

mockScenarioRegistry.registerScenarios('LoggerHub', 'SendLogMessage', [
  {
    id: 'info-log',
    name: 'Информационное сообщение',
    description: 'Обычное информационное сообщение логов',
    data: {
      id: 'log-1',
      timestamp: new Date().toISOString(),
      logLevel: 'Information',
      category: 'Application',
      message: 'Приложение запущено успешно',
    },
  },
  {
    id: 'warning-log',
    name: 'Предупреждение',
    description: 'Предупреждение в логах',
    data: {
      id: 'log-2',
      timestamp: new Date().toISOString(),
      logLevel: 'Warning',
      category: 'Network',
      message: 'Медленное соединение с сервером',
    },
  },
  {
    id: 'error-log',
    name: 'Ошибка',
    description: 'Сообщение об ошибке',
    data: {
      id: 'log-3',
      timestamp: new Date().toISOString(),
      logLevel: 'Error',
      category: 'Database',
      message: 'Ошибка подключения к базе данных',
      exception: 'Connection timeout',
    },
  },
]);

// ============================================================================
// TUNA HUB
// ============================================================================

mockScenarioRegistry.registerScenarios('TunaHub', 'DataReceived', [
  {
    id: 'tuna-data-1',
    name: 'Данные Tuna',
    description: 'Получены данные от Tuna хаба',
    data: {
      id: 'data-1',
      timestamp: new Date().toISOString(),
      payload: { some: 'data' },
    },
  },
]);
