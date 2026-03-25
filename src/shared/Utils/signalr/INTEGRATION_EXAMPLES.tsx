/**
 * Пример интеграции SignalR Mock System в реальный OBS компонент
 *
 * Этот файл показывает как добавить mock-тестирование к существующему компоненту
 * скопируйте паттерны оттуда в ваши компоненты
 */

import React, { useEffect, useState } from 'react';
import { useSignalRMockable } from '@/shared/utils/signalr';
import { withStorybookMockPanel } from '@/shared/components/StorybookMockPanel';

/**
 * Пример 1: Компонент-обычный с интеграцией mock системы
 */
export function ExampleScoreboardComponent() {
  const [state, setState] = useState({
    homeScore: 0,
    awayScore: 0,
    status: 'idle',
  });

  // Подключить mock систему
  const { interceptor, emitScenario } = useSignalRMockable('ScoreboardHub');

  // Подписаться на событие от перехватчика
  useEffect(() => {
    if (!interceptor) return;

    interceptor.on('ReceiveState', (newState: any) => {
      console.log('[Mock] Received state:', newState);
      setState(newState);
    });

    interceptor.on('StateChanged', (change: any) => {
      console.log('[Mock] State changed:', change);
      setState(prev => ({
        ...prev,
        [change.field]: change.newValue,
      }));
    });
  }, [interceptor]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Scoreboard</h2>
      <div style={{ fontSize: '48px', fontWeight: 'bold' }}>
        {state.homeScore} - {state.awayScore}
      </div>
      <div>Status: {state.status}</div>

      {/* Кнопки для быстрого тестирования */}
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={() => emitScenario('ReceiveState', 'initial-state')}>
          🔄 Reset (0-0)
        </button>
        <button onClick={() => emitScenario('ReceiveState', 'active-game')}>
          ▶️ Start Game (5-3)
        </button>
        <button onClick={() => emitScenario('ReceiveState', 'game-finished')}>
          ⏹️ End Game (10-8)
        </button>
      </div>
    </div>
  );
}

/**
 * Пример 2: Тот же компонент но с HOC для Storybook
 * Это версия для использования в stories файлах
 */
export const ScoreboardComponentWithMockPanel = withStorybookMockPanel(
  ExampleScoreboardComponent,
  {
    hubName: 'ScoreboardHub',
    autoMock: true,
    panelClassName: 'my-custom-panel',
  }
);

/**
 * Пример 3: Более сложный компонент с обработкой нескольких хабов
 */
export function ExampleChatComponent() {
  const [messages, setMessages] = useState<any[]>([]);
  const [players, setPlayers] = useState({
    status: 'idle',
    isPlaying: false,
  });

  const { interceptor: chatInterceptor } = useSignalRMockable('TelegramusHub');
  const { interceptor: soundInterceptor, emitScenario } = useSignalRMockable(
    'SoundRequestHub'
  );

  // Подписать на события чата
  useEffect(() => {
    if (!chatInterceptor) return;

    chatInterceptor.on('NewMessage', (msg: any) => {
      console.log('[Mock Chat] New message:', msg);
      setMessages(prev => [...prev, msg]);
    });
  }, [chatInterceptor]);

  // Подписать на события плеера
  useEffect(() => {
    if (!soundInterceptor) return;

    soundInterceptor.on('PlayerStateChange', (state: any) => {
      console.log('[Mock Sound] Player state changed:', state);
      setPlayers(state);
    });

    soundInterceptor.on('Started', (track: any) => {
      console.log('[Mock Sound] Track started:', track);
    });

    soundInterceptor.on('Ended', (track: any) => {
      console.log('[Mock Sound] Track ended:', track);
    });
  }, [soundInterceptor]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Chat & Player Demo</h2>

      {/* Секция чата */}
      <div style={{ marginBottom: '30px' }}>
        <h3>Messages ({messages.length})</h3>
        <div
          style={{
            border: '1px solid #ccc',
            height: '150px',
            overflow: 'auto',
            padding: '10px',
          }}
        >
          {messages.map((msg, i) => (
            <div key={i}>
              <strong style={{ color: msg.color }}>{msg.username}:</strong>{' '}
              {msg.message}
            </div>
          ))}
        </div>
      </div>

      {/* Секция плеера */}
      <div>
        <h3>Player Status</h3>
        <div>Status: {players.status}</div>
        <div>Playing: {players.isPlaying ? '▶️' : '⏸️'}</div>
      </div>

      {/* Кнопки для тестирования */}
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={() => emitScenario('PlayerStateChange', 'player-playing')}>
          ▶️ Player Playing
        </button>
        <button onClick={() => emitScenario('PlayerStateChange', 'player-paused')}>
          ⏸️ Player Paused
        </button>
        <button onClick={() => emitScenario('Started', 'track-started')}>
          🎵 Track Started
        </button>
      </div>
    </div>
  );
}

/**
 * Пример 4: Компонент со слушанием реального SignalR (без mock)
 * Когда mock отключен, работает обычный SignalR
 */
export function ExampleProductionComponent() {
  // В продакшене этот компонент слушает реальный SignalR
  // В Storybook будет использовать mock
  const { mockMode, emitScenario, getRegisteredEvents } =
    useSignalRMockable('ScoreboardHub');

  return (
    <div>
      <p>
        Mode: <strong>{mockMode ? '🧪 Mock' : '📡 Real'}</strong>
      </p>
      <p>Registered events: {getRegisteredEvents().length}</p>

      {mockMode && (
        <button onClick={() => emitScenario('ReceiveState', 'active-game')}>
          Test: Active Game
        </button>
      )}
    </div>
  );
}

/**
 * Пример 5: Story файл для Storybook
 * Копируйте этот паттерн в ваши .stories.tsx файлы
 */
export const storybookExample = {
  // Вариант 1: С HOC (самый простой)
  withHOC: () => (
    <ScoreboardComponentWithMockPanel />
  ),

  // Вариант 2: С ручным управлением
  withManualControl: () => (
    <div>
      <ExampleScoreboardComponent />
      {/* <StorybookMockPanel hubName="ScoreboardHub" /> */}
    </div>
  ),

  // Вариант 3: С несколькими хабами
  multiHub: () => (
    <ExampleChatComponent />
  ),
};

/**
 * Пример 6: Компонент с async операциями
 */
export function ExampleAsyncComponent() {
  const [loading, setLoading] = useState(false);
  const { emitEvent } = useSignalRMockable('ScoreboardHub');

  const handleUpdate = async () => {
    setLoading(true);
    try {
      // Имитируем сетевую задержку
      await new Promise(resolve => setTimeout(resolve, 500));

      // Отправляем мокированные данные
      await emitEvent('ReceiveState', {
        homeScore: Math.random() * 10,
        awayScore: Math.random() * 10,
        status: 'updated',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleUpdate} disabled={loading}>
        {loading ? 'Loading...' : 'Update Score'}
      </button>
    </div>
  );
}
