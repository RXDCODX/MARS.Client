# ToastModal

Компонент для отображения уведомлений (тостов) с возможностью открытия модального окна при клике. Построен на основе `react-toastify` и `react-bootstrap`.

## Возможности

- ✅ Отображение тостов различных типов (info, success, warning, error)
- ✅ Автоматическое исчезновение тостов
- ✅ Открытие модального окна при клике на тост
- ✅ Отображение структурированных данных в модальном окне
- ✅ Поддержка метаданных и временных меток
- ✅ Адаптивный дизайн для мобильных устройств
- ✅ Интеграция с системой цветов сайта
- ✅ TypeScript поддержка

## Установка зависимостей

```bash
yarn add react-toastify react-bootstrap
```

## Быстрый старт

### 1. Оберните приложение в ToastModalProvider

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

### 2. Покажите простой тост

```tsx
import { showToastWithModal } from '@/shared/Utils/ToastModal';

// Простой информационный тост
showToastWithModal({
  type: 'info',
  message: 'Операция выполнена успешно!',
  title: 'Успех'
});
```

### 3. Тост с данными и модальным окном

```tsx
showToastWithModal({
  type: 'success',
  message: 'Данные загружены',
  title: 'Загрузка завершена',
  data: { userId: 123, name: 'Иван' },
  timestamp: new Date(),
  metadata: { source: 'API', version: '1.0' }
});
```

## API

### ToastModalData

```tsx
interface ToastModalData {
  title?: string;                    // Заголовок модального окна
  message?: string | React.ReactNode; // Сообщение тоста
  data?: any;                        // Данные для отображения в модальном окне
  type?: 'info' | 'success' | 'warning' | 'error'; // Тип тоста
  timestamp?: Date;                  // Временная метка
  metadata?: Record<string, any>;    // Дополнительные метаданные
}
```

### showToastWithModal

```tsx
showToastWithModal(
  data: ToastModalData,
  onToastClick?: (data: ToastModalData) => void,
  toastOptions?: ToastOptions
)
```

**Параметры:**

- `data` - данные для тоста и модального окна
- `onToastClick` - callback при клике на тост (опционально)
- `toastOptions` - настройки тоста (опционально)

### useToastModal

```tsx
const { modalData, showModal, openModal, closeModal } = useToastModal();
```

**Возвращает:**

- `modalData` - данные для модального окна
- `showModal` - состояние видимости модального окна
- `openModal` - функция для открытия модального окна
- `closeModal` - функция для закрытия модального окна

## Примеры использования

### Простой тост

```tsx
showToastWithModal({
  type: 'info',
  message: 'Простое сообщение'
});
```

### Тост с данными

```tsx
const userData = {
  id: 123,
  name: 'Иван Иванов',
  email: 'ivan@example.com'
};

showToastWithModal({
  type: 'success',
  message: 'Пользователь создан',
  title: 'Успех',
  data: userData,
  timestamp: new Date()
});
```

### Тост с кастомным обработчиком клика

```tsx
showToastWithModal(
  {
    type: 'warning',
    message: 'Нажмите для подробностей',
    title: 'Предупреждение'
  },
  (data) => {
    // Кастомная логика при клике на тост
    console.log('Тост кликнут:', data);
    // Можно открыть модальное окно или выполнить другое действие
  }
);
```

### Использование хука для управления модальным окном

```tsx
import { useToastModal } from '@/shared/Utils/ToastModal';

function MyComponent() {
  const { openModal, closeModal, showModal, modalData } = useToastModal();

  const handleShowModal = () => {
    openModal({
      title: 'Модальное окно',
      message: 'Содержимое модального окна',
      data: { key: 'value' }
    });
  };

  return (
    <div>
      <button onClick={handleShowModal}>Открыть модальное окно</button>
      
      {/* Модальное окно будет отображаться автоматически */}
    </div>
  );
}
```

## Настройка стилей

Компонент использует CSS модули и автоматически адаптируется к цветовой схеме сайта через `useSiteColors`.

Для кастомизации стилей отредактируйте файл `ToastModal.module.scss`.

## Интеграция с существующим кодом

### Замена обычных тостов

```tsx
// Было
toast.success('Сообщение');

// Стало
showToastWithModal({
  type: 'success',
  message: 'Сообщение'
});
```

### Добавление в существующие компоненты

```tsx
import { showToastWithModal } from '@/shared/Utils/ToastModal';

function ExistingComponent() {
  const handleSuccess = () => {
    showToastWithModal({
      type: 'success',
      message: 'Операция выполнена',
      data: { result: 'ok' }
    });
  };

  return <button onClick={handleSuccess}>Выполнить</button>;
}
```

## Типы тостов

- **info** - информационные сообщения (синий)
- **success** - успешные операции (зеленый)
- **warning** - предупреждения (желтый)
- **error** - ошибки (красный)

## Адаптивность

Компонент автоматически адаптируется под размер экрана:

- На мобильных устройствах модальное окно занимает большую часть экрана
- Данные отображаются в удобном для мобильных устройств формате
- Тосты позиционируются оптимально для каждого размера экрана

## Производительность

- Модальное окно рендерится только при необходимости
- Используется `useCallback` для оптимизации функций
- Автоматическая очистка ресурсов при размонтировании
