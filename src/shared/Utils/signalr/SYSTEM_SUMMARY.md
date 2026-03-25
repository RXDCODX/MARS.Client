## SignalR Interceptor & Mock System ✨

Полная система для перехвата, мокирования и управления SignalR сообщениями при разработке React компонентов в Storybook.

### 📁 Структура

```
src/shared/
├── utils/signalr/                          # Основная система
│   ├── SignalRInterceptor.ts              # Класс перехватчика ядро
│   ├── MockScenarioRegistry.ts             # Реестр сценариев
│   ├── useSignalRMockable.ts              # Основной хук
│   ├── registerMockScenarios.ts           # Регистрация сценариев при загрузке
│   ├── index.ts                           # Экспорты
│   ├── README.md                          # Полная документация
│   ├── QUICKSTART.md                      # Быстрый старт (START HERE!)
│   ├── mockScenarios.example.ts           # Примеры для копирования
│   ├── SignalRMockDemo.stories.tsx        # Примеры в Storybook
│   └── SignalRMockDemo.module.scss        # Стили demo
└── components/
    ├── StorybookMockPanel/
    │   ├── StorybookMockPanel.tsx         # Компонент панели
    │   ├── StorybookMockPanel.module.scss # Стили панели
    │   ├── withStorybookMockPanel.tsx     # HOC для автоматической панели
    │   └── index.ts                       # Экспорты
    └── SignalRMockWrapper/
        ├── SignalRMockWrapper.tsx         # Обертка над SignalRContext
        └── index.ts                       # Экспорты
```

### 🚀 Быстрый старт (2 минуты)

1. **Import**:
```tsx
import { useSignalRMockable } from '@/shared/utils/signalr';
```

2. **Use**:
```tsx
const { emitScenario } = useSignalRMockable('ScoreboardHub');

<button onClick={() => emitScenario('ReceiveState', 'active-game')}>
  Test
</button>
```

3. **In Storybook**:
```tsx
import { withStorybookMockPanel } from '@/shared/components/StorybookMockPanel';

export default withStorybookMockPanel(MyComponent, {
  hubName: 'ScoreboardHub',
});
```

👉 **Full guide**: `QUICKSTART.md`

### 🎛️ Основные API

#### 1️⃣ `useSignalRMockable(hubName, options)`

Основной хук для работы с перехватчиком:

```tsx
const {
  emitScenario,         // Вызвать зарегистрированный сценарий
  emitEvent,            // Вызвать событие с кастомными данными
  mockMode,             // boolean - включен ли mock режим
  setMockMode,          // Переключить режим
  getRegisteredEvents,  // Получить список событий
  getAvailableScenarios, // Получить сценарии для события
} = useSignalRMockable('HubName', { autoMockInStorybook: true });
```

#### 2️⃣ `withStorybookMockPanel(Component, options)`

HOC для автоматического добавления панели управления:

```tsx
export default withStorybookMockPanel(MyComponent, {
  hubName: 'ScoreboardHub',
  autoMock: true,
});
```

#### 3️⃣ `<StorybookMockPanel>`

Компонент панели управления (появляется внизу экрана):

```tsx
<StorybookMockPanel
  hubName="ScoreboardHub"
  mockMode={mockMode}
  onEmitScenario={emitScenario}
/>
```

#### 4️⃣ `<SignalRMockWrapper>`

Обертка для перехвата реального SignalRContext:

```tsx
<SignalRMockWrapper
  hubName="ScoreboardHub"
  context={ScoreboardHubSignalRContext}
  eventsToIntercept={['ReceiveState']}
>
  {children}
</SignalRMockWrapper>
```

### 📚 Документация

| Файл | Назначение |
|------|-----------|
| **QUICKSTART.md** | 👈 **START HERE** - 5 минут до первого теста |
| **README.md** | Полная документация, примеры, API |
| **mockScenarios.example.ts** | Примеры сценариев для копирования |
| **SignalRMockDemo.stories.tsx** | Live примеры в Storybook |

### 🔍 Что где

```
Нужно быстро?          → QUICKSTART.md
Нужны примеры?         → SignalRMockDemo.stories.tsx в Storybook
Нужны коды сценариев?  → mockScenarios.example.ts
Буду в Storybook?      → withStorybookMockPanel или <StorybookMockPanel>
Буду в коде?           → useSignalRMockable хук
```

### 📦 Зарегистрированные хабы

- **ScoreboardHub**
  - Events: `ReceiveState`, `StateChanged`
  - Scenarios: `initial-state`, `active-game`, `game-finished`, `score-updated`, `time-updated`

- **TelegramusHub**
  - Events: `NewMessage`, `PostTwitchInfo`, `UpdateWaifuPrizes`
  - Scenarios: `simple-message`, `message-with-emotes`, `long-message`, `twitch-info`, `waifus-list`

- **SoundRequestHub**
  - Events: `PlayerStateChange`, `Started`, `Ended`, `QueueChanged`
  - Scenarios: `player-idle`, `player-playing`, `player-paused`, `track-started`, `track-ended`, `queue-empty`, `queue-with-tracks`

- **LoggerHub**
  - Events: `SendLogMessage`
  - Scenarios: `info-log`, `warning-log`, `error-log`

- **TunaHub**
  - Events: `DataReceived`
  - Scenarios: `tuna-data-1`

### ➕ Как добавить свой сценарий

1. Откройте: `src/shared/utils/signalr/registerMockScenarios.ts`
2. Добавьте в конец:

```typescript
mockScenarioRegistry.registerScenarios('MyHub', 'MyEvent', [
  {
    id: 'my-scenario',
    name: 'My Scenario Name',
    description: 'What happens here',
    data: {
      // Your event data structure
    },
  },
]);
```

3. Готово! Сценарий будет доступен в StorybookMockPanel

### 🎯 Примеры использования

**Пример 1: HOC (самый простой)**
```tsx
export default withStorybookMockPanel(ScoreboardComponent, {
  hubName: 'ScoreboardHub',
});
```

**Пример 2: Хук с кнопками**
```tsx
function ChatComponent() {
  const { emitScenario } = useSignalRMockable('TelegramusHub');
  return (
    <>
      <Chat />
      <button onClick={() => emitScenario('NewMessage', 'simple-message')}>
        Test Message
      </button>
    </>
  );
}
```

**Пример 3: Кастомные данные**
```tsx
function MyComponent() {
  const { emitEvent } = useSignalRMockable('ScoreboardHub');
  
  return (
    <button onClick={() => emitEvent('ReceiveState', {
      homeScore: 99,
      awayScore: 99,
    })}>
      Custom Test
    </button>
  );
}
```

### 💡 Особенности

✅ **Автоматическое детектирование Storybook**
```tsx
useSignalRMockable('Hub', { autoMockInStorybook: true })
// Автоматически включит mock режим если открыто в Storybook
```

✅ **Полная типизация TypeScript**
```tsx
// Все методы полностью типизированы
const events = getRegisteredEvents(); // string[]
await emitScenario('Event', 'scenario'); // Promise<void>
```

✅ **Без влияния на реальное соединение**
- Когда mock режим отключен, работает нормальное SignalR
- Режим перехватчика не влияет на адреса и реальные события

✅ **Удобная UI панель**
- Появляется внизу экрана в mock режиме
- Позволяет выбирать события и сценарии без кода
- Фиолетовый градиент с красивым дизайном

### 🔧 Интеграция

**В main.tsx (опционально, но рекомендуется)**
```tsx
import '@/shared/utils/signalr'; // загрузит все сценарии
```

Или явно:
```tsx
import { registerAllMockScenarios } from '@/shared/utils/signalr/mockScenarios.example';
registerAllMockScenarios();
```

### 🧪 Тестирование компонентов

1. Создайте story
2. Используйте HOC или `useSignalRMockable` хук
3. Нажимайте кнопки в панели внизу экрана
4. Компонент обновляется как при реальном SignalR
5. Тестируйте UI состояния

### 📖 Файлы для изучения (в порядке важности)

1. **QUICKSTART.md** ⭐⭐⭐⭐⭐
2. **SignalRMockDemo.stories.tsx** ⭐⭐⭐⭐
3. **README.md** ⭐⭐⭐
4. **useSignalRMockable.ts** ⭐⭐
5. **SignalRInterceptor.ts** ⭐

### ❓ FAQ

**Q: Это работает с реальным SignalR?**
A: Да! Mock режим не влияет на реальное соединение, только перехватывает события.

**Q: Можно ли использовать кастомные данные?**
A: Да, используйте метод `emitEvent(eventName, customData)`.

**Q: Нужно ли что-то менять на бэке?**
A: Нет, это полностью фронтенд решение.

**Q: Работает только в Storybook?**
A: Нет, можно использовать везде - в компонентах, тестах, любом приложении.

**Q: Как отключить mock режим?**
A: `setMockMode(false)` или отключите `autoMockInStorybook: true`.

---

👉 **Ready to start?** → `QUICKSTART.md`
👀 **Want to see examples?** → Open Storybook and find `Utils → SignalR Mock System`
🎯 **Full reference?** → `README.md`
