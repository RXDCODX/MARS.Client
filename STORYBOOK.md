# Storybook для MARS Client

Этот проект использует Storybook для демонстрации и тестирования компонентов.

## Запуск Storybook

```bash
yarn storybook
```

Storybook будет доступен по адресу: http://localhost:6006

## Структура историй

Истории организованы по категориям:

### 🎨 Animations
- **GradientText** - Текст с анимированным градиентом
  - Различные скорости анимации
  - Настройка теней
  - Кастомные цвета

### 💬 Chat
- **ChatHorizontal** - Горизонтальный чат
- **ChatVertical** - Вертикальный чат  
- **Message** - Отдельное сообщение чата
  - VIP пользователи
  - Модераторы
  - Стримеры

### 🚨 Alerts
- **PyroAlerts** - Система алертов для стрима
  - Поддержка изображений, видео, аудио
  - Приоритеты алертов

### ✨ Particles
- **Manager** - Менеджер экранных частиц
  - Конфетти
  - Фейерверки
  - Эмодзи-частицы

### 🌸 Waifu
- **WaifuAlerts** - Система вайфу-алертов
  - Рулетка
  - Анимации
  - Свадебные события

### 🎭 FumoFriday
- **FumoFriday** - Компонент для празднования Fumo Friday

### 🧩 Components
- **RainbowText** - Текст с радужным градиентом
- **KeyWordText** - Текст с выделением ключевых слов
- **PageName** - Название страницы

## Особенности

### Автоматическая документация
Все компоненты имеют автоматически генерируемую документацию благодаря тегу `autodocs`.

### Интерактивные контролы
Многие компоненты имеют интерактивные контролы для изменения параметров в реальном времени.

### Различные фоны
Доступны различные фоны для демонстрации:
- Темный фон
- Светлый фон  
- Градиентный фон

### Тестирование
Интегрировано тестирование с Vitest для проверки компонентов.

## Добавление новых историй

1. Создайте файл `ComponentName.stories.tsx` рядом с компонентом
2. Импортируйте компонент и типы из Storybook
3. Создайте мета-объект с настройками
4. Добавьте различные варианты (stories) компонента

Пример:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import MyComponent from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  title: 'Category/MyComponent',
  component: MyComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // контролы для параметров
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // параметры по умолчанию
  },
};
```

## Полезные ссылки

- [Storybook документация](https://storybook.js.org/)
- [React Storybook](https://storybook.js.org/docs/react/get-started/introduction)
- [Addons](https://storybook.js.org/docs/react/addons/introduction) 