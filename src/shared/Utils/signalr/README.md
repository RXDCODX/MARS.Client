# SignalR Interceptor & Mock System

Система для перехвата, мокирования и эмуляции SignalR сообщений при разработке и тестировании компонентов в Storybook.

## 📋 Возможности

- ✅ **Перехват SignalR сообщений** - получайте все события без влияния на реальное соединение
- ✅ **Mock режим** - генерируйте типовые события для тестирования
- ✅ **Storybook интеграция** - автоматическая панель управления внизу экрана
- ✅ **Регистрация сценариев** - храните типовые данные для повторяемых тестов
- ✅ **Гибкий API** - используйте через хуки, HOC или компоненты-обертки

## 🚀 Быстрый старт

### 1. Регистрация mock-сценариев

В вашем `main.tsx` или `setupTests.ts`:

```typescript
import { registerAllMockScenarios } from '@/shared/utils/signalr/mockScenarios.example';

// Зарегистрировать сценарии при загрузке приложения
registerAllMockScenarios();
```

### 2. Использование в компоненте (через HOC)

```tsx
import { withStorybookMockPanel } from '@/shared/components/StorybookMockPanel';

function MyScoreboardComponent() {
  const { ScoreboardHubSignalRContext } = useContext(/* ... */);
  
  return (
    <div>
      {/* компонент */}
    </div>
  );
}

// В Storybook добавить HOC
export default withStorybookMockPanel(MyScoreboardComponent, {
  hubName: 'ScoreboardHub',
  autoMock: true,
});
```

### 3. Использование в компоненте (через хук)

```tsx
import { useSignalRMockable } from '@/shared/utils/signalr';

function MyComponent() {
  const { emitScenario, mockMode, setMockMode } = useSignalRMockable('ScoreboardHub');

  return (
    <div>
      <button onClick={() => emitScenario('ReceiveState', 'initial-state')}>
        Тест: начальное состояние
      </button>
      <button onClick={() => emitScenario('ReceiveState', 'active-game')}>
        Тест: активная игра
      </button>
    </div>
  );
}
```

### 4. Использование обертки (для оборачивания SignalRContext)

```tsx
import { SignalRMockWrapper } from '@/shared/components/SignalRMockWrapper';

export function App() {
  return (
    <SignalRMockWrapper
      hubName="ScoreboardHub"
      context={ScoreboardHubSignalRContext}
      eventsToIntercept={['ReceiveState', 'StateChanged']}
      autoMockInStorybook={true}
    >
      {/* children */}
    </SignalRMockWrapper>
  );
}
```

## 📚 API

### useSignalRMockable(hubName, options)

Основной хук для работы с перехватчиком.

```typescript
const {
  // Экземпляр перехватчика
  interceptor,
  
  // Включен ли mock режим
  mockMode,
  
  // Переключить mock режим
  setMockMode,
  
  // Эмулировать событие по сценарию
  emitScenario,
  
  // Эмулировать событие с произвольными данными
  emitEvent,
  
  // Получить сценарии для события
  getAvailableScenarios,
  
  // Получить список событий
  getRegisteredEvents,
} = useSignalRMockable('ScoreboardHub', {
  autoMockInStorybook: true, // автоматически включить в storybook
});
```

### StorybookMockPanel

Компонент панели управления эмуляцией (появляется внизу экрана).

```tsx
<StorybookMockPanel
  hubName="ScoreboardHub"
  mockMode={mockMode}
  onEmitScenario={async (eventName, scenarioId) => {
    // обработать эмуляцию
  }}
  className="my-custom-class"
/>
```

### withStorybookMockPanel(Component, options)

HOC для автоматического добавления панели.

```typescript
const options = {
  hubName: 'ScoreboardHub',        // название хаба
  panelClassName?: string;          // класс для панели
  autoMock?: boolean;               // автоматически включить
};
```

## 📝 Регистрация своих сценариев

Создайте файл для ваших сценариев или отредактируйте существующий:

```typescript
import { mockScenarioRegistry, IMockScenario } from '@/shared/utils/signalr';

const myScenarios: IMockScenario[] = [
  {
    id: 'scenario-1',
    name: 'Первый сценарий',
    description: 'Описание что происходит',
    data: {
      // ваши данные события
      score: 5,
      teamName: 'FC Example',
    },
  },
  // еще сценарии...
];

// Зарегистрировать
mockScenarioRegistry.registerScenarios(
  'ScoreboardHub',      // название хаба
  'ReceiveState',       // название события
  myScenarios           // сценарии
);
```

## 🎯 Примеры в Storybook

### Пример 1: Простой компонент с панелью

```tsx
import { StoryObj } from '@storybook/react';
import { withStorybookMockPanel } from '@/shared/components/StorybookMockPanel';

function ScoreboardComponent() {
  // ... компонент
}

const meta: Meta<typeof ScoreboardComponent> = {
  title: 'Components/Scoreboard',
  component: ScoreboardComponent,
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// С автоматической панелью мокирования
export default withStorybookMockPanel(ScoreboardComponent, {
  hubName: 'ScoreboardHub',
  autoMock: true,
});
```

### Пример 2: Компонент с ручным управлением

```tsx
function ChatComponent() {
  const { emitScenario } = useSignalRMockable('TelegramusHub');

  return (
    <div>
      <Chat />
      <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
        <button onClick={() => emitScenario('NewMessage', 'simple-message')}>
          Обычное сообщение
        </button>
        <button onClick={() => emitScenario('NewMessage', 'message-with-emotes')}>
          Сообщение с эмотами
        </button>
      </div>
      <StorybookMockPanel hubName="TelegramusHub" />
    </div>
  );
}

export default ChatComponent;
```

## 🔧 Как это работает

1. **Регистрация** - при инициализации компонента `useSignalRMockable` регистрирует перехватчик
2. **Перехват** - все события, подписанные через `on()`, регистрируются в системе
3. **Mock режим** - если включен mock режим, события генерируются локально без реального соединения
4. **UI** - `StorybookMockPanel` позволяет выбирать события и сценарии, потом эмулировать их
5. **Emulation** - эмулятор вызывает все слушатели события с переданными данными

## ⚙️ Конфигурация

### Автоматическое определение Storybook

```typescript
import { isInStorybook } from '@/shared/utils/signalr';

if (isInStorybook()) {
  // только в storybook
  setMockMode(true);
}
```

## 🐛 Отладка

```typescript
const { interceptor, getRegisteredEvents } = useSignalRMockable('ScoreboardHub');

// Запросить все события
console.log('Registered events:', getRegisteredEvents());

// Проверить режим
console.log('Mock mode:', interceptor?.isMockMode());

// Вручную эмулировать
await interceptor?.emit('ReceiveState', { score: 10 });
```

## 📖 Структура файлов

```
src/shared/
├── utils/signalr/
│   ├── SignalRInterceptor.ts           # Основной класс перехватчика
│   ├── MockScenarioRegistry.ts         # Реестр сценариев
│   ├── useSignalRMockable.ts          # Хук для использования
│   ├── mockScenarios.example.ts       # Примеры сценариев
│   └── index.ts                       # Экспорты
└── components/
    ├── StorybookMockPanel/
    │   ├── StorybookMockPanel.tsx     # Компонент панели
    │   ├── StorybookMockPanel.module.scss
    │   ├── withStorybookMockPanel.tsx # HOC обертка
    │   └── index.ts
    └── SignalRMockWrapper/
        ├── SignalRMockWrapper.tsx     # Обертка контекста
        └── index.ts
```

## 🎓 Советы

- **Для больших историй**: создавайте отдельный файл с mock-сценариями для каждого хаба
- **Для интеграции**: используйте `SignalRMockWrapper` на верхнем уровне приложения
- **Для юнитов**: используйте `useSignalRMockable` в компонентах для полного контроля
- **Для отладки**: оставляйте консоль открытой, в ней будут логи всех событий
