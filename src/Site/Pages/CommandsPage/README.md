# CommandsPage

Страница для выполнения команд системы MARS.

## Изменения

### Переделка с использованием типов из generated

Компонент был переделан для использования строгой типизации из папки `@/shared/api/generated`:

#### Используемые типы

- `CommandInfo` - информация о команде
- `CommandParameterInfo` - информация о параметре команды  
- `CommandInfoAvailablePlatformsEnum` - перечисление доступных платформ

#### Улучшения

1. **Строгая типизация**: Все состояния и пропсы теперь используют типы из generated
2. **Единое состояние**: Заменили множественные useState на единый объект состояния
3. **Типизированные enum**: Используем `CommandInfoAvailablePlatformsEnum.Api` вместо строковых литералов
4. **Улучшенная структура**: Добавлены комментарии и более четкое разделение логики
5. **Типизированные экспорты**: Экспортируем типы для использования в других компонентах

### Новые функции (2024)

#### Toast уведомления

- Убран отдельный блок с результатом выполнения команды
- Результаты и ошибки теперь отображаются через toast уведомления
- Используется `useToastModal` из папки утилит
- **Новая логика**: Сначала появляется toast уведомление, при клике на него открывается модальное окно с детальной информацией
- Успешные операции показываются как success toast
- Ошибки показываются как error toast с детальной информацией
- **Исправлено**: Используется React Context для правильной передачи состояния модального окна между провайдером и компонентами
- **Архитектура**: Разделено на файлы для лучшей совместимости с Fast Refresh (компоненты в ToastModal.tsx, хуки в ToastModal.hooks.ts)

#### Два режима отображения команд

1. **Список** (по умолчанию) - вертикальное расположение команд одна под другой
2. **Сетка** - карточки команд в виде сетки 2x2

- Переключатель режимов в правом верхнем углу
- Адаптивная сетка для мобильных устройств
- Карточки в сетке имеют одинаковую высоту

#### Архитектура

Компонент разделен на три части для лучшей читаемости и поддержки:

1. **CommandsPage** - основной компонент с состоянием и логикой
2. **ListView** - компонент для отображения команд в виде списка
3. **GridView** - компонент для отображения команд в виде сетки

**Особенности:**

- `ListView` показывает команды вертикально одна под другой с подробной информацией
- `GridView` показывает команды в виде сетки 2x2 с компактным отображением
- `ListView` показывает div с "Выберите команду для выполнения" когда команда не выбрана
- `GridView` не показывает этот div, предоставляя более чистый интерфейс для сетки
- В режиме **списка**: команды занимают 4 колонки, параметры - 8 колонок
- В режиме **сетки**: команды занимают всю ширину (12 колонок), параметры показываются в отдельном окне снизу
- Каждый компонент получает необходимые пропсы: команды, выбранную команду, колбэки и стили

#### Структура состояния

```typescript
interface CommandsPageState {
  userCommands: CommandInfo[];
  adminCommands: CommandInfo[];
  selectedCommand: CommandInfo | null;
  commandParameters: CommandParameterInfo[];
  parameterValues: Record<string, string>;
  isExecuting: boolean;
  error: string;
  isLoading: boolean;
  activeTab: "user" | "admin";
  displayMode: "list" | "grid"; // Новое поле
}
```

#### API методы

Используются методы из `CommandsService`:

- `getUserCommandsInfoForPlatform()` - получение пользовательских команд
- `getAdminCommandsInfoForPlatform()` - получение админских команд  
- `getCommandParameters()` - получение параметров команды
- `executeCommand()` - выполнение команды

#### Toast интеграция

```typescript
import { useToastModal, createSuccessToast, createErrorToast } from "@/shared/Utils/ToastModal";

const { showToast } = useToastModal();

// Показ успешного результата (сначала toast, при клике - модалка)
showToast(createSuccessToast(
  `Команда /${commandName} выполнена успешно`,
  resultData,
  "Результат выполнения команды"
));

// Показ ошибки (сначала toast, при клике - модалка)
showToast(createErrorToast(
  errorMessage,
  error,
  "Ошибка выполнения команды"
));
```

## Использование

```typescript
import CommandsPage from "@/pages/CommandsPage";

// В роутере
<Route path="/commands" element={<CommandsPage />} />
```

## Режимы отображения

### Список

- Вертикальное расположение команд одна под другой
- Подробная информация о каждой команде
- Компактное отображение
- Показывает div "Выберите команду для выполнения" когда команда не выбрана
- **Макет**: команды (4 колонки) + параметры (8 колонок) в одной строке

### Сетка  

- Карточки команд в виде сетки 2x2
- Визуально привлекательное отображение
- Адаптивная сетка для разных размеров экрана
- Карточки одинаковой высоты
- Не показывает div "Выберите команду" для более чистого интерфейса
- **Макет**: команды занимают всю ширину (12 колонок), параметры показываются в отдельном окне снизу
- Отдельное окно с параметрами появляется под сеткой команд при выборе команды

## Архитектура компонентов

```typescript
// Основной компонент
const CommandsPage: React.FC = () => {
  // Состояние и логика
  // Рендер ListView или GridView в зависимости от displayMode
};

// Компонент для списка
const ListView: React.FC<{
  commands: CommandInfo[];
  selectedCommand: CommandInfo | null;
  onCommandSelect: (command: CommandInfo) => void;
  colors: Record<string, any>;
  styles: Record<string, string>;
}> = ({ commands, selectedCommand, onCommandSelect, colors, styles }) => {
  // Рендер команд в виде списка
};

// Компонент для сетки
const GridView: React.FC<{
  commands: CommandInfo[];
  selectedCommand: CommandInfo | null;
  onCommandSelect: (command: CommandInfo) => void;
  colors: Record<string, any>;
  styles: Record<string, string>;
}> = ({ commands, selectedCommand, onCommandSelect, colors, styles }) => {
  // Рендер команд в виде сетки
};
```
