# SignalR Mock System - Быстрый старт

## ⚡ 5 минут до первого теста

### Шаг 1: Импортируем систему
```typescript
import { useSignalRMockable } from '@/shared/utils/signalr';
```

### Шаг 2: Используем хук в компоненте
```tsx
function MyComponent() {
  const { emitScenario, mockMode } = useSignalRMockable('ScoreboardHub');

  return (
    <div>
      <h1>Мой компонент</h1>
      {/* Кнопки для тестирования */}
      <button onClick={() => emitScenario('ReceiveState', 'active-game')}>
        Протестировать: Активная игра
      </button>
    </div>
  );
}
```

### Шаг 3: Добавляем панель в Storybook
```tsx
// В файле .stories.tsx
import { withStorybookMockPanel } from '@/shared/components/StorybookMockPanel';

export default withStorybookMockPanel(MyComponent, {
  hubName: 'ScoreboardHub',
  autoMock: true,
});
```

## 🎯 Основные инструменты

### 1. Хук `useSignalRMockable` (универсальный)
```tsx
const {
  emitScenario,      // Вызвать сценарий: await emitScenario('EventName', 'scenarioId')
  emitEvent,         // Вызвать с кастомными данными: await emitEvent('EventName', {...})
  mockMode,          // Включен ли mock режим
  setMockMode,       // Включить/отключить
  getRegisteredEvents, // Получить все события
} = useSignalRMockable('HubName');
```

### 2. HOC `withStorybookMockPanel` (для автоматической панели)
```tsx
export default withStorybookMockPanel(Component, {
  hubName: 'ScoreboardHub',
  autoMock: true,  // автоматически включить в storybook
});
```

### 3. Компонент `<StorybookMockPanel>` (для ручного управления)
```tsx
<StorybookMockPanel
  hubName="ScoreboardHub"
  mockMode={mockMode}
  onEmitScenario={emitScenario}
/>
```

## 📋 Доступные сценарии

### ScoreboardHub
- **ReceiveState**: `initial-state`, `active-game`, `game-finished`
- **StateChanged**: `score-updated`, `time-updated`

### TelegramusHub
- **NewMessage**: `simple-message`, `message-with-emotes`, `long-message`

### SoundRequestHub
- **PlayerStateChange**: `player-idle`, `player-playing`, `player-paused`
- **Started**: `track-started`
- **Ended**: `track-ended`
- **QueueChanged**: `queue-empty`, `queue-with-tracks`

### LoggerHub
- **SendLogMessage**: `info-log`, `warning-log`, `error-log`

## 🔧 Как добавить свой сценарий

Edit: `src/shared/utils/signalr/registerMockScenarios.ts`

```typescript
mockScenarioRegistry.registerScenarios('MyHub', 'MyEvent', [
  {
    id: 'my-scenario',
    name: 'Мой сценарий',
    description: 'Что происходит',
    data: {
      // данные события
      score: 5,
      team: 'FC Example',
    },
  },
]);
```

## 🧪 Примеры использования

### Пример 1: Простой компонент с кнопками
```tsx
function ScoreboardComponent() {
  const { emitScenario } = useSignalRMockable('ScoreboardHub');

  return (
    <div>
      <Scoreboard />
      <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
        <button onClick={() => emitScenario('ReceiveState', 'initial-state')}>
          Начало
        </button>
        <button onClick={() => emitScenario('ReceiveState', 'active-game')}>
          Игра идет
        </button>
        <button onClick={() => emitScenario('ReceiveState', 'game-finished')}>
          Конец
        </button>
      </div>
    </div>
  );
}

export default withStorybookMockPanel(ScoreboardComponent, {
  hubName: 'ScoreboardHub',
});
```

### Пример 2: Компонент с кастомными данными
```tsx
function ChatComponent() {
  const { emitEvent } = useSignalRMockable('TelegramusHub');

  const handleCustomMessage = () => {
    emitEvent('NewMessage', {
      id: 'custom-msg',
      username: 'MyUser',
      message: 'Кастомное сообщение',
      color: '#FF5733',
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div>
      <Chat />
      <button onClick={handleCustomMessage}>Отправить кастомное сообщение</button>
    </div>
  );
}
```

## 🎬 Как это выглядит в Storybook

1. **Компонент** отображается нормально
2. **Внизу экрана** появляется цветная панель (фиолетовая)
3. **В панели**:
   - Выпадающее меню для выбора события
   - Выпадающее меню для выбора сценария
   - Кнопка "Отправить"
4. **При нажатии** компонент получит эмулированное событие
5. **Компонент** обновится как при реальном SignalR сообщении

## 💡 Советы & трюки

- **Для отладки**: откройте консоль (F12) и будете видеть логи всех событий
- **Для быстрого теста**: используйте HOC, это самый быстрый способ
- **Для complex logic**: используйте хук и вызывайте `emitEvent` с нужными данными
- **Для интеграции**: используйте `SignalRMockWrapper` на верхнем уровне приложения

## 🐛 Отладка

```tsx
const { interceptor, getRegisteredEvents, mockMode } = useSignalRMockable('MyHub');

// Проверить состояние
console.log('Mock mode:', mockMode);
console.log('Registered events:', getRegisteredEvents());

// Вручную эмулировать
await interceptor?.emit('MyEvent', { foo: 'bar' });
```

## 📚 Полная документация

Смотрите: `src/shared/utils/signalr/README.md`

## 🎓 Примеры в Storybook

Откройте в Storybook: **Utils → SignalR Mock System**

Там все рабочие примеры и демонстрация возможностей.
