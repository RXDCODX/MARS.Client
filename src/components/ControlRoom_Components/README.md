# ControlRoom Components

Компоненты админ панели для мониторинга ASP.NET приложения MARS.

## Структура

```
ControlRoom_Components/
├── AdminPanel/           # Главный компонент админ панели
├── Navbar/              # Навигационная панель
├── Dashboard/           # Дашборд с метриками
│   ├── MetricCard/      # Карточки метрик
│   ├── SystemStatus/    # Статус сервисов
│   ├── PerformanceChart/ # График производительности
│   ├── ActiveUsers/     # Активные пользователи
│   └── RecentLogs/      # Последние логи
└── ServerViewer/        # Просмотр серверов (существующий)
```

## Компоненты

### AdminPanel
Главный компонент, который объединяет навигацию и контент. Поддерживает переключение между различными вкладками админ панели.

```tsx
import { AdminPanel } from './ControlRoom_Components';

<AdminPanel />
```

### Navbar
Навигационная панель с вкладками для переключения между разделами админ панели.

**Вкладки:**
- 📊 Дашборд
- 🖥️ Серверы
- 📝 Логи
- 👥 Пользователи
- ⚡ Производительность
- ⚙️ Настройки

### Dashboard
Основной дашборд с метриками и статистикой приложения.

**Включает:**
- Карточки метрик (CPU, память, соединения, ошибки, время работы)
- Статус сервисов
- График производительности за 24 часа
- Активные пользователи
- Последние логи

### MetricCard
Карточка для отображения отдельной метрики с трендом.

**Параметры:**
- `title` - название метрики
- `value` - значение
- `icon` - иконка
- `color` - цветовая схема (blue, green, purple, orange, red, teal)
- `trend` - тренд изменения
- `trendDirection` - направление тренда (up, down, stable)

### SystemStatus
Компонент для отображения статуса различных сервисов системы.

### PerformanceChart
Интерактивный график производительности с данными за последние 24 часа.

### ActiveUsers
Список активных пользователей с их статусом и временем последней активности.

### RecentLogs
Последние системные логи с фильтрацией по уровням (info, warning, error, debug).

## Использование

### Базовое использование
```tsx
import { AdminPanel } from './ControlRoom_Components';

function App() {
  return <AdminPanel />;
}
```

### Отдельные компоненты
```tsx
import { Dashboard, MetricCard, SystemStatus } from './ControlRoom_Components';

function CustomDashboard() {
  return (
    <div>
      <Dashboard />
      <MetricCard 
        title="Кастомная метрика"
        value="42"
        icon="🎯"
        color="blue"
        trend="+5"
        trendDirection="up"
      />
    </div>
  );
}
```

## Стилизация

Все компоненты используют CSS Modules для стилизации. Основные цвета и темы:

- **Primary**: Градиент `#667eea` → `#764ba2`
- **Success**: `#10b981`
- **Warning**: `#f59e0b`
- **Error**: `#ef4444`
- **Info**: `#3b82f6`

## Адаптивность

Все компоненты адаптивны и корректно отображаются на различных устройствах:

- **Desktop**: Полный интерфейс с боковой навигацией
- **Tablet**: Адаптированная сетка метрик
- **Mobile**: Вертикальное расположение элементов

## Интеграция с API

Для интеграции с реальным ASP.NET API замените имитацию данных в компонентах на реальные API вызовы:

```tsx
// В Dashboard.tsx
useEffect(() => {
  const loadMetrics = async () => {
    const response = await fetch('/api/metrics');
    const data = await response.json();
    setMetrics(data);
  };
  
  loadMetrics();
  const interval = setInterval(loadMetrics, 30000);
  return () => clearInterval(interval);
}, []);
```

## Storybook

Компоненты включают Storybook истории для демонстрации и тестирования:

```bash
npm run storybook
```

Доступные истории:
- AdminPanel/Default
- Dashboard/Default
- MetricCard/CPUUsage, MemoryUsage, etc. 