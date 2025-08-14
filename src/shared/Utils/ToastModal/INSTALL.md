# Установка зависимостей для ToastModal

## Необходимые зависимости

Компонент ToastModal требует следующие пакеты:

```bash
yarn add react-toastify react-bootstrap
```

## Проверка версий

Убедитесь, что у вас установлены совместимые версии:

- `react-toastify`: ^9.1.3 или выше
- `react-bootstrap`: ^2.9.0 или выше
- `react`: ^16.8.0 или выше (для хуков)
- `react-dom`: ^16.8.0 или выше

## Установка через yarn

```bash
# Основные зависимости
yarn add react-toastify react-bootstrap

# Типы для TypeScript (если используете)
yarn add -D @types/react @types/react-dom
```

## Установка через npm

```bash
# Основные зависимости
npm install react-toastify react-bootstrap

# Типы для TypeScript (если используете)
npm install -D @types/react @types/react-dom
```

## Проверка установки

После установки проверьте, что пакеты добавлены в `package.json`:

```json
{
  "dependencies": {
    "react-toastify": "^9.1.3",
    "react-bootstrap": "^2.9.0"
  }
}
```

## Импорт CSS

Убедитесь, что CSS файлы импортируются в вашем приложении:

```tsx
// В главном файле приложения (например, main.tsx или App.tsx)
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // если еще не импортирован
```

## Проверка работоспособности

Создайте простой тест:

```tsx
import { showToastWithModal } from '@/shared/Utils/ToastModal';

// Простой тост
showToastWithModal({
  type: 'success',
  message: 'Тест установки!'
});
```

Если тост отображается, значит установка прошла успешно!

## Возможные проблемы

### Ошибка "Module not found"

Если возникает ошибка о том, что модуль не найден:

1. Проверьте, что пакеты установлены
2. Перезапустите dev сервер
3. Очистите кэш: `yarn cache clean` или `npm cache clean --force`

### Конфликт версий

Если есть конфликты версий:

1. Удалите `node_modules` и `yarn.lock` (или `package-lock.json`)
2. Выполните `yarn install` заново

### Проблемы с TypeScript

Если возникают ошибки типов:

1. Убедитесь, что установлены типы для React
2. Проверьте версию TypeScript (должна быть 4.0+)
3. Перезапустите TypeScript сервер в IDE

## Альтернативная установка

Если у вас есть проблемы с установкой через yarn/npm, можно использовать CDN:

```html
<!-- В index.html -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/react-toastify@9.1.3/dist/ReactToastify.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
```

**Примечание**: Использование CDN не рекомендуется для продакшена.
