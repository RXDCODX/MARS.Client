# MARS Client

Клиентское приложение для стриминговой платформы MARS с поддержкой чата, алертов и интерактивных элементов.

## 🚀 Быстрый старт

```bash
# Установка зависимостей
yarn install

# Запуск в режиме разработки
yarn dev

# Сборка для продакшена
yarn build
```

## 📚 Storybook

Storybook доступен для демонстрации и тестирования компонентов:

### Локальный запуск
```bash
yarn storybook
```
Откроется на http://localhost:6006

### Онлайн версия
Storybook развернут на GitHub Pages: [https://your-username.github.io/mars.client](https://your-username.github.io/mars.client)

### Сборка и развертывание
```bash
# Сборка Storybook
yarn build-storybook

# Развертывание на GitHub Pages
yarn deploy-storybook
```

## 🧩 Компоненты

### Чат
- **ChatHorizontal** - Горизонтальный чат с анимацией
- **ChatVertical** - Вертикальный чат
- **Message** - Отдельное сообщение чата

### Алерты
- **PyroAlerts** - Система алертов для стрима
- **WaifuAlerts** - Вайфу-алерты с рулеткой
- **FumoFriday** - Празднование Fumo Friday

### Частицы
- **Manager** - Менеджер экранных частиц
- **Confetty** - Конфетти эффекты
- **Firework** - Фейерверки

### Анимации
- **GradientText** - Текст с анимированным градиентом
- **RainbowText** - Радужный текст

## 🛠 Технологии

- **React 19** - UI библиотека
- **TypeScript** - Типизация
- **Vite** - Сборщик
- **Storybook** - Документация компонентов
- **SCSS** - Стили
- **SignalR** - Реальное время

## 📖 Документация

Подробная документация компонентов доступна в [STORYBOOK.md](./STORYBOOK.md)

## 🤝 Разработка

1. Форкните репозиторий
2. Создайте ветку для новой функции
3. Внесите изменения
4. Добавьте тесты
5. Создайте Pull Request

## 📄 Лицензия

MIT License
