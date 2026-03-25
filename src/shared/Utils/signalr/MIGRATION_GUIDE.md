# Миграция компонентов на Mock систему

Пошаговая инструкция как добавить SignalR Mock систему к существующим компонентам.

## 📋 План миграции

### Уровень 1: Минимальная интеграция (5 минут)

Просто добавьте HOC к вашему компоненту в stories файле.

**До:**
```tsx
export const Default: Story = {
  render: () => <MyScoreboardComponent />,
};
```

**После:**
```tsx
import { withStorybookMockPanel } from '@/shared/components/StorybookMockPanel';

const MyScoreboardComponentWithMock = withStorybookMockPanel(MyScoreboardComponent, {
  hubName: 'ScoreboardHub',
  autoMock: true,
});

export const Default: Story = {
  render: () => <MyScoreboardComponentWithMock />,
};
```

**Результат:** Панель управления появится внизу экрана в Storybook ✅

---

### Уровень 2: Добавить тестовые кнопки (10 минут)

Добавьте кнопки внутри компонента для быстрого тестирования.

**Код:**
```tsx
import { useSignalRMockable } from '@/shared/utils/signalr';

function MyComponent() {
  const { emitScenario } = useSignalRMockable('ScoreboardHub');

  return (
    <div>
      <YourComponent />
      
      {/* Тестовые кнопки */}
      <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
        <button onClick={() => emitScenario('ReceiveState', 'initial-state')}>
          Test: Initial
        </button>
        <button onClick={() => emitScenario('ReceiveState', 'active-game')}>
          Test: Active
        </button>
      </div>
    </div>
  );
}
```

**Результат:** Кнопки тестирования в компоненте, плюс панель внизу ✅

---

### Уровень 3: Полная интеграция событий (20 минут)

Подпишитесь на mock события и обновляйте компонент.

**Шаг 1:** Добавьте hook
```tsx
const { interceptor } = useSignalRMockable('ScoreboardHub');
```

**Шаг 2:** Подпишитесь на события
```tsx
useEffect(() => {
  if (!interceptor) return;

  interceptor.on('ReceiveState', (newState) => {
    console.log('State received:', newState);
    // Обновите ваше состояние
  });

  interceptor.on('StateChanged', (change) => {
    console.log('State changed:', change);
  });
}, [interceptor]);
```

**Результат:** Зависит от mock нет - используются реальные события, включена mock - используются мокированные ✅

---

### Уровень 4: Кастомные сценарии (15 минут)

Добавьте свои сценарии тестирования.

**Шаг 1:** Откройте `registerMockScenarios.ts`

**Шаг 2:** Добавьте ваш сценарий
```typescript
mockScenarioRegistry.registerScenarios('ScoreboardHub', 'ReceiveState', [
  // ... существующие
  {
    id: 'my-custom-scenario',
    name: 'Мой кастомный сценарий',
    description: 'Уникальное состояние',
    data: {
      homeScore: 123,
      awayScore: 456,
      // ваши данные
    },
  },
]);
```

**Результаты:**
- Новый сценарий появится в выпадающем меню
- Кнопка "Test: My Custom Scenario" готова к использованию ✅

---

## 🎯 Выбор подхода

| Подход | Сложность | Время | Результат |
|--------|-----------|-------|-----------|
| **Уровень 1** | ⭐ | 5 мин | Панель внизу экрана |
| **Уровень 2** | ⭐⭐ | 10 мин | Кнопки + панель |
| **Уровень 3** | ⭐⭐⭐ | 20 мин | Полная работа |
| **Уровень 4** | ⭐⭐⭐⭐ | 15 мин | Кастомные сценарии |

---

## 📝 Примеры миграции

### Пример 1: Простой компонент (Уровень 1)

**Было:**
```tsx
// Scoreboard.stories.tsx
export const Default: Story = {};

export default {
  component: Scoreboard,
};
```

**Стало:**
```tsx
import { withStorybookMockPanel } from '@/shared/components/StorybookMockPanel';

export default withStorybookMockPanel(Scoreboard, {
  hubName: 'ScoreboardHub',
});

export const Default: Story = {};
```

---

### Пример 2: Компонент с логикой (Уровень 2-3)

**Было:**
```tsx
function ChatComponent() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // реальный SignalR
  }, []);

  return <div>{/* чат */}</div>;
}
```

**Стало:**
```tsx
import { useSignalRMockable } from '@/shared/utils/signalr';

function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const { interceptor, emitScenario } = useSignalRMockable('TelegramusHub');

  useEffect(() => {
    if (!interceptor) return; // mock режим
    
    interceptor.on('NewMessage', (msg) => {
      setMessages(prev => [...prev, msg]);
    });
  }, [interceptor]);

  return (
    <div>
      {/* чат */}
      <button onClick={() => emitScenario('NewMessage', 'simple-message')}>
        Test Message
      </button>
    </div>
  );
}

export default withStorybookMockPanel(ChatComponent, {
  hubName: 'TelegramusHub',
});
```

---

### Пример 3: Компонент с несколькими хабами (Уровень 3)

**Было:**
```tsx
function DashboardComponent() {
  // слушаем Scoreboard
  // слушаем TelegramusHub
  // слушаем SoundRequestHub
}
```

**Стало:**
```tsx
import { useSignalRMockable } from '@/shared/utils/signalr';
import { withStorybookMockPanel } from '@/shared/components/StorybookMockPanel';

function DashboardComponent() {
  const scoreboard = useSignalRMockable('ScoreboardHub');
  const telegramus = useSignalRMockable('TelegramusHub');
  const sound = useSignalRMockable('SoundRequestHub');

  useEffect(() => {
    scoreboard.interceptor?.on('ReceiveState', ...);
    telegramus.interceptor?.on('NewMessage', ...);
    sound.interceptor?.on('PlayerStateChange', ...);
  }, [scoreboard.interceptor, telegramus.interceptor, sound.interceptor]);

  return <>{/* компонент */}</>;
}

// Выберите основной хаб для панели
export default withStorybookMockPanel(DashboardComponent, {
  hubName: 'ScoreboardHub',
});
```

---

## ✅ Чек-лист миграции

### Для Уровня 1:
- [ ] Импортировал `withStorybookMockPanel`
- [ ] Обернул компонент в HOC
- [ ] Указал правильный `hubName`
- [ ] Тестирую в Storybook
- [ ] Панель появляется внизу

### Для Уровня 2:
- [ ] Добавил `useSignalRMockable` хук
- [ ] Добавил тестовые кнопки
- [ ] Кнопки вызывают `emitScenario`
- [ ] Кнопки работают в Storybook

### Для Уровня 3:
- [ ] Добавил `useEffect` для подписи на события
- [ ] Вызываю `interceptor.on()` для каждого события
- [ ] Состояние обновляется при mock событиях
- [ ] Все работает в обоих режимах (mock и real)

### Для Уровня 4:
- [ ] Добавил сценарии в `registerMockScenarios.ts`
- [ ] Новые сценарии видны в панели
- [ ] Сценарии эмулируют правильно

---

## 🚀 Полный пример пошагово

Давайте мигрируем компонент `Scoreboard`:

### Шаг 1: Откройте компонент
```tsx
// Scoreboard/Scoreboard.stories.tsx
import { StoryObj } from '@storybook/react';
import { Scoreboard } from './Scoreboard';

const meta = {
  title: 'Components/Scoreboard',
  component: Scoreboard,
};

type Story = StoryObj<typeof Scoreboard>;

export const Default: Story = {
  render: () => <Scoreboard />,
};

export default meta;
```

### Шаг 2: Добавьте HOC
```tsx
// Scoreboard/Scoreboard.stories.tsx
+ import { withStorybookMockPanel } from '@/shared/components/StorybookMockPanel';

const meta = {
  title: 'Components/Scoreboard',
  component: Scoreboard,
};

+ export default withStorybookMockPanel(Scoreboard, {
+   hubName: 'ScoreboardHub',
+   autoMock: true,
+ });
```

### Шаг 3: Добавьте хук в компонент
```tsx
// Scoreboard/Scoreboard.tsx
+ import { useSignalRMockable } from '@/shared/utils/signalr';

export function Scoreboard() {
+   const { emitScenario } = useSignalRMockable('ScoreboardHub');

  return <div>...</div>;
}
```

### Шаг 4: Добавьте тестовую кнопку
```tsx
export function Scoreboard() {
  const { emitScenario } = useSignalRMockable('ScoreboardHub');

  return (
    <div>
      {/* компонент */}
+     <button onClick={() => emitScenario('ReceiveState', 'active-game')}>
+       🧪 Test: Active Game
+     </button>
    </div>
  );
}
```

### Готово! ✅

Теперь в Storybook:
1. Панель появляется внизу
2. Можно выбирать события и сценарии
3. Кнопка Test в компоненте работает
4. Компонент обновляется при эмуляции

---

## 🎓 Советы

- **Начните с Уровня 1** - это самый быстрый результат
- **Постепенно поднимайтесь** - не нужно делать все сразу
- **Уровень 3 - оптимальный** - полная функциональность
- **Уровень 4 - экспериментируйте** - добавляйте свои сценарии
- **Читайте примеры** - копируйте паттерны

## ⚠️ Частые ошибки

❌ **Забыли import**
```tsx
// ❌ Неправильно
export default withStorybookMockPanel(Component, ...);

// ✅ Правильно
import { withStorybookMockPanel } from '@/shared/components/StorybookMockPanel';
export default withStorybookMockPanel(Component, ...);
```

❌ **Неправильное имя хаба**
```tsx
// ❌ 'scoresboard' - опечатка
useSignalRMockable('scoresboard');

// ✅ 'ScoreboardHub' - точное имя
useSignalRMockable('ScoreboardHub');
```

❌ **Забываем проверить interceptor**
```tsx
// ❌ Может быть null
interceptor.on('Event', ...);

// ✅ Правильно
if (!interceptor) return;
interceptor.on('Event', ...);
```

---

**Готовы? Начните с QUICKSTART.md** 👉
