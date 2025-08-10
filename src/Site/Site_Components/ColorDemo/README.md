# Глобальные цветовые переменные для компонентов сайта

## Обзор

Система глобальных цветовых переменных автоматически адаптируется к текущей теме (светлая/темная) и предоставляет консистентные цвета для всех компонентов сайта.

## CSS переменные

### Цвета текста

- `--site-text-primary` - Основной цвет текста
- `--site-text-secondary` - Вторичный цвет текста
- `--site-text-muted` - Приглушенный цвет текста
- `--site-text-light` - Светлый цвет текста
- `--site-text-dark` - Темный цвет текста
- `--site-text-accent` - Акцентный цвет текста
- `--site-text-success` - Цвет текста для успеха
- `--site-text-warning` - Цвет текста для предупреждений
- `--site-text-danger` - Цвет текста для ошибок
- `--site-text-info` - Цвет текста для информации

### Цвета фонов

- `--site-bg-primary` - Основной цвет фона
- `--site-bg-secondary` - Вторичный цвет фона
- `--site-bg-tertiary` - Третичный цвет фона
- `--site-bg-card` - Цвет фона карточек
- `--site-bg-overlay` - Цвет фона оверлеев
- `--site-bg-accent` - Акцентный цвет фона
- `--site-bg-success` - Цвет фона для успеха
- `--site-bg-warning` - Цвет фона для предупреждений
- `--site-bg-danger` - Цвет фона для ошибок
- `--site-bg-info` - Цвет фона для информации

### Цвета границ

- `--site-border-primary` - Основной цвет границ
- `--site-border-secondary` - Вторичный цвет границ
- `--site-border-accent` - Акцентный цвет границ
- `--site-border-success` - Цвет границ для успеха
- `--site-border-warning` - Цвет границ для предупреждений
- `--site-border-danger` - Цвет границ для ошибок
- `--site-border-info` - Цвет границ для информации

### Цвета теней

- `--site-shadow-light` - Легкая тень
- `--site-shadow-medium` - Средняя тень
- `--site-shadow-heavy` - Тяжелая тень
- `--site-shadow-inset` - Внутренняя тень

## CSS классы

### Текстовые классы

```css
.site-text-primary
.site-text-secondary
.site-text-muted
.site-text-light
.site-text-dark
.site-text-accent
.site-text-success
.site-text-warning
.site-text-danger
.site-text-info
```

### Фоновые классы

```css
.site-bg-primary
.site-bg-secondary
.site-bg-tertiary
.site-bg-card
.site-bg-overlay
.site-bg-accent
.site-bg-success
.site-bg-warning
.site-bg-danger
.site-bg-info
```

### Классы границ

```css
.site-border-primary
.site-border-secondary
.site-border-accent
.site-border-success
.site-border-warning
.site-border-danger
.site-border-info
```

### Классы теней

```css
.site-shadow-light
.site-shadow-medium
.site-shadow-heavy
.site-shadow-inset
```

## TypeScript хук useSiteColors

### Импорт

```typescript
import { useSiteColors } from "../../../shared/Utils/useSiteColors";
```

### Использование

```typescript
const colors = useSiteColors();

// Прямое использование переменных
const textColor = colors.text.primary;
const bgColor = colors.background.card;

// Использование утилитарных функций
const textStyle = colors.utils.getTextStyle("primary");
const cardStyle = colors.utils.getCardStyle();
const buttonStyle = colors.utils.getButtonStyle("success");
```

### Доступные методы

#### getTextStyle(type)

Возвращает объект стилей для текста

```typescript
colors.utils.getTextStyle("primary"); // { color: 'var(--site-text-primary)' }
```

#### getBackgroundStyle(type)

Возвращает объект стилей для фона

```typescript
colors.utils.getBackgroundStyle("card"); // { backgroundColor: 'var(--site-bg-card)' }
```

#### getBorderStyle(type)

Возвращает объект стилей для границ

```typescript
colors.utils.getBorderStyle("primary"); // { borderColor: 'var(--site-border-primary)' }
```

#### getShadowStyle(type)

Возвращает объект стилей для теней

```typescript
colors.utils.getShadowStyle("light"); // { boxShadow: 'var(--site-shadow-light)' }
```

#### getCardStyle()

Возвращает готовые стили для карточки

```typescript
colors.utils.getCardStyle(); // { backgroundColor: 'var(--site-bg-card)', borderColor: 'var(--site-border-primary)', boxShadow: 'var(--site-shadow-light)' }
```

#### getButtonStyle(variant)

Возвращает готовые стили для кнопки

```typescript
colors.utils.getButtonStyle("primary"); // { backgroundColor: 'var(--site-bg-primary)', color: 'var(--site-text-light)', ... }
```

## Примеры использования

### В React компоненте

```typescript
import React from 'react';
import { useSiteColors } from '../../../shared/Utils/useSiteColors';

const MyComponent: React.FC = () => {
  const colors = useSiteColors();

  return (
    <div style={colors.utils.getCardStyle()}>
      <h1 style={colors.utils.getTextStyle('primary')}>
        Заголовок
      </h1>
      <p style={colors.utils.getTextStyle('secondary')}>
        Описание
      </p>
      <button style={colors.utils.getButtonStyle('success')}>
        Кнопка
      </button>
    </div>
  );
};
```

### В CSS модулях

```scss
.myComponent {
  color: var(--site-text-primary);
  background-color: var(--site-bg-card);
  border: 1px solid var(--site-border-primary);
  box-shadow: var(--site-shadow-light);

  &:hover {
    background-color: var(--site-hover-bg);
  }
}
```

### С CSS классами

```jsx
<div className="site-bg-card site-text-primary site-border-primary site-shadow-light">
  Контент
</div>
```

## Автоматическая адаптация к теме

Все переменные автоматически меняются при переключении темы:

- **Светлая тема**: Темный текст на светлом фоне
- **Темная тема**: Светлый текст на темном фоне

Цвета инвертируются автоматически, обеспечивая хорошую читаемость в обеих темах.

## Преимущества

1. **Консистентность** - Единая система цветов по всему сайту
2. **Автоматическая адаптация** - Цвета меняются с темой автоматически
3. **TypeScript поддержка** - Полная типизация для безопасного использования
4. **Удобство использования** - Простые CSS классы и TypeScript хуки
5. **Производительность** - CSS переменные работают нативно в браузере
