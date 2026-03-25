/**
 * Пример использования SignalR Mock System в Storybook
 * Демонстрирует все способы использования: HOC, хук, ручное управление
 */

import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useSignalRMockable, isInStorybook } from '@/shared/utils/signalr';
import { StorybookMockPanel, withStorybookMockPanel } from '@/shared/components/StorybookMockPanel';
import styles from './SignalRMockDemo.module.scss';

// ============================================================================
// КОМПОНЕНТ 1: Базовый компонент с обычной панелью
// ============================================================================

function BasicMockComponent() {
  const { mockMode, emitScenario, getRegisteredEvents } = useSignalRMockable('ScoreboardHub');
  const [events, setEvents] = useState<Array<{ time: string; event: string; data: any }>>([]);

  const handleEmit = async (eventName: string, scenarioId: string) => {
    setEvents(prev => [
      ...prev,
      {
        time: new Date().toLocaleTimeString(),
        event: `${eventName} (${scenarioId})`,
        data: 'Проверьте консоль для полных данных',
      },
    ]);
    await emitScenario(eventName, scenarioId);
  };

  return (
    <div className={styles.demoContainer}>
      <div className={styles.header}>
        <h2>Demo: SignalR Mock System</h2>
        <div className={styles.status}>
          Mock mode: <strong>{mockMode ? 'ON ✅' : 'OFF ❌'}</strong>
        </div>
      </div>

      <div className={styles.section}>
        <h3>Зарегистрированные события:</h3>
        <div className={styles.eventsList}>
          {getRegisteredEvents().length > 0 ? (
            getRegisteredEvents().map(event => (
              <div key={event} className={styles.event}>
                {event}
              </div>
            ))
          ) : (
            <p>Нет зарегистрированных событий</p>
          )}
        </div>
      </div>

      <div className={styles.section}>
        <h3>Кнопки управления:</h3>
        <div className={styles.buttonGroup}>
          <button onClick={() => handleEmit('ReceiveState', 'initial-state')} className={styles.btn}>
            Обновить: Начальное состояние
          </button>
          <button onClick={() => handleEmit('ReceiveState', 'active-game')} className={styles.btn}>
            Обновить: Активная игра
          </button>
          <button onClick={() => handleEmit('ReceiveState', 'game-finished')} className={styles.btn}>
            Обновить: Игра закончена
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <h3>История событий:</h3>
        <div className={styles.eventHistory}>
          {events.length > 0 ? (
            events.map((evt, idx) => (
              <div key={idx} className={styles.historyItem}>
                <span className={styles.time}>[{evt.time}]</span>
                <span className={styles.eventName}>{evt.event}</span>
                <span className={styles.data}>{evt.data}</span>
              </div>
            ))
          ) : (
            <p className={styles.empty}>История пока пуста. Нажимайте кнопки выше!</p>
          )}
        </div>
      </div>

      {isInStorybook() && (
        <div className={styles.info}>
          <strong>💡 Совет:</strong> При использовании этого компонента внизу экрана появится панель
          управления мокированием. Вы можете выбирать события и сценарии для эмуляции.
        </div>
      )}
    </div>
  );
}

// ============================================================================
// КОМПОНЕНТ 2: Компонент с автоматической панелью (HOC)
// ============================================================================

const ComponentWithAutoPanel = withStorybookMockPanel(BasicMockComponent, {
  hubName: 'ScoreboardHub',
  autoMock: true,
  panelClassName: styles.customPanel,
});

// ============================================================================
// КОМПОНЕНТ 3: Компонент с ручным управлением несколькими хабами
// ============================================================================

function MultiHubComponent() {
  const scoreboardMock = useSignalRMockable('ScoreboardHub');
  const telegramusMock = useSignalRMockable('TelegramusHub');
  const soundMock = useSignalRMockable('SoundRequestHub');

  return (
    <div className={styles.demoContainer}>
      <div className={styles.header}>
        <h2>Multi-Hub Demo</h2>
        <div className={styles.hubStatus}>
          <div>Scoreboard: {scoreboardMock.mockMode ? '✅' : '❌'}</div>
          <div>Telegramus: {telegramusMock.mockMode ? '✅' : '❌'}</div>
          <div>SoundRequest: {soundMock.mockMode ? '✅' : '❌'}</div>
        </div>
      </div>

      <div className={styles.hubSection}>
        <h3>ScoreboardHub</h3>
        <button onClick={() => scoreboardMock.emitScenario('ReceiveState', 'active-game')}>
          Активная игра
        </button>
      </div>

      <div className={styles.hubSection}>
        <h3>TelegramusHub</h3>
        <button onClick={() => telegramusMock.emitScenario('NewMessage', 'simple-message')}>
          Простое сообщение
        </button>
        <button onClick={() => telegramusMock.emitScenario('NewMessage', 'message-with-emotes')}>
          Сообщение с эмотами
        </button>
      </div>

      <div className={styles.hubSection}>
        <h3>SoundRequestHub</h3>
        <button onClick={() => soundMock.emitScenario('PlayerStateChange', 'player-playing')}>
          Плеер воспроизводит
        </button>
        <button onClick={() => soundMock.emitScenario('QueueChanged', 'queue-with-tracks')}>
          Очередь обновлена
        </button>
      </div>

      {isInStorybook() && (
        <div className={styles.multiHubInfo}>
          <StorybookMockPanel hubName="ScoreboardHub" />
          <StorybookMockPanel hubName="TelegramusHub" />
          <StorybookMockPanel hubName="SoundRequestHub" />
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Storybook Meta и Stories
// ============================================================================

const meta: Meta = {
  title: 'Utils/SignalR Mock System',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const BasicUsage: Story = {
  render: () => <BasicMockComponent />,
};

export const WithAutoPanel: Story = {
  render: () => <ComponentWithAutoPanel />,
};

export const MultiHubDemo: Story = {
  render: () => <MultiHubComponent />,
};

export const Documentation: Story = {
  render: () => (
    <div className={styles.documentation}>
      <h1>SignalR Mock System Documentation</h1>

      <section>
        <h2>Что это?</h2>
        <p>
          Система для перехвата, мокирования и эмуляции SignalR сообщений при разработке компонентов
          в Storybook.
        </p>
      </section>

      <section>
        <h2>Возможности</h2>
        <ul>
          <li>✅ Перехват SignalR событий без влияния на реальное соединение</li>
          <li>✅ Mock режим для генерации типовых событий</li>
          <li>✅ Автоматическая панель управления в Storybook</li>
          <li>✅ Регистрация переиспользуемых сценариев</li>
          <li>✅ Гибкий API: хуки, HOC, компоненты</li>
        </ul>
      </section>

      <section>
        <h2>Использование</h2>

        <h3>1. Через HOC (самый простой)</h3>
        <pre>{`
import { withStorybookMockPanel } from '@/shared/components/StorybookMockPanel';

export default withStorybookMockPanel(MyComponent, {
  hubName: 'ScoreboardHub',
  autoMock: true,
});
        `}</pre>

        <h3>2. Через хук</h3>
        <pre>{`
import { useSignalRMockable } from '@/shared/utils/signalr';

function MyComponent() {
  const { emitScenario, mockMode } = useSignalRMockable('ScoreboardHub');
  
  return (
    <button onClick={() => emitScenario('ReceiveState', 'active-game')}>
      Test: Active Game
    </button>
  );
}
        `}</pre>

        <h3>3. Через обертку контекста</h3>
        <pre>{`
import { SignalRMockWrapper } from '@/shared/components/SignalRMockWrapper';

<SignalRMockWrapper
  hubName="ScoreboardHub"
  context={ScoreboardHubSignalRContext}
  eventsToIntercept={['ReceiveState']}
>
  {children}
</SignalRMockWrapper>
        `}</pre>
      </section>

      <section>
        <h2>Регистрированные хабы</h2>
        <ul>
          <li>ScoreboardHub - события: ReceiveState, StateChanged</li>
          <li>TelegramusHub - события: NewMessage, PostTwitchInfo, UpdateWaifuPrizes</li>
          <li>SoundRequestHub - события: PlayerStateChange, Started, Ended, QueueChanged</li>
          <li>LoggerHub - события: SendLogMessage</li>
          <li>TunaHub - события: DataReceived</li>
        </ul>
      </section>

      <section>
        <h2>Как добавить свой сценарий</h2>
        <p>
          Отредактируйте файл: <code>src/shared/utils/signalr/registerMockScenarios.ts</code>
        </p>
        <pre>{`
mockScenarioRegistry.registerScenarios('MyHub', 'MyEvent', [
  {
    id: 'my-scenario',
    name: 'My Scenario',
    description: 'What happens',
    data: { /* event data */ },
  },
]);
        `}</pre>
      </section>
    </div>
  ),
};
