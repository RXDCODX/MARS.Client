# Краткое руководство по использованию ToastModal

## Быстрый старт

### 1. Установка зависимостей

```bash
yarn add react-toastify react-bootstrap
```

### 2. Оберните приложение

```tsx
import { ToastModalProvider } from '@/shared/Utils/ToastModal';

function App() {
  return (
    <ToastModalProvider>
      {/* Ваше приложение */}
    </ToastModalProvider>
  );
}
```

### 3. Покажите тост

```tsx
import { showToastWithModal } from '@/shared/Utils/ToastModal';

showToastWithModal({
  type: 'success',
  message: 'Операция выполнена!',
  title: 'Успех'
});
```

## Основные функции

### Простой тост

```tsx
showToastWithModal({
  type: 'info',
  message: 'Простое сообщение'
});
```

### Тост с данными

```tsx
showToastWithModal({
  type: 'success',
  message: 'Данные загружены',
  data: { userId: 123, name: 'Иван' },
  timestamp: new Date()
});
```

### Тост с метаданными

```tsx
showToastWithModal({
  type: 'warning',
  message: 'Предупреждение',
  metadata: { source: 'API', version: '1.0' }
});
```

## Утилиты для создания тостов

### Создание тоста с ошибкой

```tsx
import { createErrorToast } from '@/shared/Utils/ToastModal';

try {
  // Ваш код
} catch (error) {
  showToastWithModal(createErrorToast('Произошла ошибка', error));
}
```

### Создание тоста с API данными

```tsx
import { createApiToast } from '@/shared/Utils/ToastModal';

const response = await api.getUser(123);
showToastWithModal(createApiToast('Пользователь загружен', response));
```

### Создание тоста с прогрессом

```tsx
import { createProgressToast } from '@/shared/Utils/ToastModal';

showToastWithModal(createProgressToast('Загрузка файла', 0.75));
```

## Использование хука

```tsx
import { useToastModal } from '@/shared/Utils/ToastModal';

function MyComponent() {
  const { openModal } = useToastModal();

  const handleClick = () => {
    openModal({
      title: 'Модальное окно',
      message: 'Содержимое',
      data: { key: 'value' }
    });
  };

  return <button onClick={handleClick}>Открыть</button>;
}
```

## Кастомизация

### Настройка позиции и времени

```tsx
showToastWithModal(
  { type: 'info', message: 'Сообщение' },
  undefined,
  {
    position: 'top-center',
    autoClose: 10000
  }
);
```

### Кастомный обработчик клика

```tsx
showToastWithModal(
  { type: 'warning', message: 'Нажмите для подробностей' },
  (data) => {
    console.log('Тост кликнут:', data);
    // Ваша логика
  }
);
```

## Типы тостов

- `info` - информационные сообщения (синий)
- `success` - успешные операции (зеленый)  
- `warning` - предупреждения (желтый)
- `error` - ошибки (красный)

## Особенности

- ✅ Тосты автоматически исчезают через 5 секунд
- ✅ Клик по тосту открывает модальное окно с подробностями
- ✅ Поддержка структурированных данных и метаданных
- ✅ Адаптивный дизайн для мобильных устройств
- ✅ Интеграция с системой цветов сайта
- ✅ TypeScript поддержка
- ✅ Готовые утилиты для создания тостов

## Интеграция с существующим кодом

Замените обычные тосты:

```tsx
// Было
toast.success('Сообщение');

// Стало  
showToastWithModal({
  type: 'success',
  message: 'Сообщение'
});
```
