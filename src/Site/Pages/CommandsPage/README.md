# CommandsPage

Страница для выполнения команд системы MARS.

## Изменения

### Переделка с использованием типов из generated

Компонент был переделан для использования строгой типизации из папки `@/shared/api/generated`:

#### Используемые типы:
- `CommandInfo` - информация о команде
- `CommandParameterInfo` - информация о параметре команды  
- `CommandInfoAvailablePlatformsEnum` - перечисление доступных платформ

#### Улучшения:

1. **Строгая типизация**: Все состояния и пропсы теперь используют типы из generated
2. **Единое состояние**: Заменили множественные useState на единый объект состояния
3. **Типизированные enum**: Используем `CommandInfoAvailablePlatformsEnum.Api` вместо строковых литералов
4. **Улучшенная структура**: Добавлены комментарии и более четкое разделение логики
5. **Типизированные экспорты**: Экспортируем типы для использования в других компонентах

#### Структура состояния:

```typescript
interface CommandsPageState {
  userCommands: CommandInfo[];
  adminCommands: CommandInfo[];
  selectedCommand: CommandInfo | null;
  commandParameters: CommandParameterInfo[];
  parameterValues: Record<string, string>;
  executionResult: string;
  isExecuting: boolean;
  error: string;
  isLoading: boolean;
  activeTab: "user" | "admin";
}
```

#### API методы:

Используются методы из `CommandsService`:
- `getUserCommandsInfoForPlatform()` - получение пользовательских команд
- `getAdminCommandsInfoForPlatform()` - получение админских команд  
- `getCommandParameters()` - получение параметров команды
- `executeCommand()` - выполнение команды

## Использование

```typescript
import CommandsPage from "@/pages/CommandsPage";

// В роутере
<Route path="/commands" element={<CommandsPage />} />
``` 