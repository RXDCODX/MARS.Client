/**
 * Пример регистрации mock-сценариев для различных хабов
 *
 * Этот файл показывает как регистрировать типовые сценарии для тестирования компонентов в Storybook
 */

import { mockScenarioRegistry, IMockScenario } from '@/shared/utils/signalr';

// ============================================================================
// SCOREBOARD HUB - примеры сценариев
// ============================================================================

export const SCOREBOARD_HUB_SCENARIOS = {
  ReceiveState: [
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
      description: 'идет матч, счет 5-3',
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
  ] as IMockScenario[],

  StateChanged: [
    {
      id: 'score-updated',
      name: 'Счет обновлен',
      description: 'Приложение обновило счет на 1 очко',
      data: {
        field: 'homeScore',
        oldValue: 4,
        newValue: 5,
        timestamp: new Date().toISOString(),
      },
    },
  ] as IMockScenario[],
};

// ============================================================================
// TELEGRAMUS HUB - примеры сценариев
// ============================================================================

export const TELEGRAMUS_HUB_SCENARIOS = {
  NewMessage: [
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
  ] as IMockScenario[],
};

// ============================================================================
// SOUND REQUEST HUB - примеры сценариев
// ============================================================================

export const SOUND_REQUEST_HUB_SCENARIOS = {
  Started: [
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
  ] as IMockScenario[],

  Ended: [
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
  ] as IMockScenario[],

  QueueChanged: [
    {
      id: 'queue-updated',
      name: 'Очередь обновлена',
      description: 'В очередь добавлен новый трек',
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
      ],
    },
  ] as IMockScenario[],
};

// ============================================================================
// Функция для регистрации всех сценариев
// ============================================================================

export function registerAllMockScenarios() {
  // Scoreboard Hub
  mockScenarioRegistry.registerScenarios('ScoreboardHub', 'ReceiveState', SCOREBOARD_HUB_SCENARIOS.ReceiveState);
  mockScenarioRegistry.registerScenarios('ScoreboardHub', 'StateChanged', SCOREBOARD_HUB_SCENARIOS.StateChanged);

  // Telegramus Hub
  mockScenarioRegistry.registerScenarios('TelegramusHub', 'NewMessage', TELEGRAMUS_HUB_SCENARIOS.NewMessage);

  // Sound Request Hub
  mockScenarioRegistry.registerScenarios('SoundRequestHub', 'Started', SOUND_REQUEST_HUB_SCENARIOS.Started);
  mockScenarioRegistry.registerScenarios('SoundRequestHub', 'Ended', SOUND_REQUEST_HUB_SCENARIOS.Ended);
  mockScenarioRegistry.registerScenarios('SoundRequestHub', 'QueueChanged', SOUND_REQUEST_HUB_SCENARIOS.QueueChanged);
}
