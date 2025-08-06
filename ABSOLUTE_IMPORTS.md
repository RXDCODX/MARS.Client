# Абсолютные импорты в проекте

Проект настроен для использования абсолютных импортов вместо относительных. Это улучшает читаемость кода и упрощает рефакторинг.

## Настроенные алиасы

В проекте настроены следующие алиасы для абсолютных импортов:

- `@/*` - корневая папка `src/`
- `@/components/*` - компоненты (`src/components/`)
- `@/pages/*` - страницы (`src/pages/`)
- `@/shared/*` - общие ресурсы (`src/shared/`)
- `@/contexts/*` - контексты (`src/contexts/`)
- `@/routes/*` - маршруты (`src/routes/`)
- `@/app/*` - основное приложение (`src/app/`)
- `@/assets/*` - ресурсы (`src/assets/`)
- `@/styles/*` - стили (`src/styles/`)
- `@/utils/*` - утилиты (`src/shared/Utils/`)
- `@/api/*` - API (`src/shared/api/`)
- `@/types/*` - типы (`src/shared/types/`)

## Примеры использования

### Вместо относительных импортов:
```typescript
import { ThemeProvider } from "../contexts/ThemeContext";
import Routes from "../routes/Routes";
import useTwitchStore from "../shared/twitchStore/twitchStore";
```

### Используйте абсолютные импорты:
```typescript
import { ThemeProvider } from "@/contexts/ThemeContext";
import Routes from "@/routes/Routes";
import useTwitchStore from "@/shared/twitchStore/twitchStore";
```

### Для утилит:
```typescript
// Вместо
import { useSiteColors } from "../../shared/Utils/useSiteColors";

// Используйте
import { useSiteColors } from "@/utils/useSiteColors";
```

### Для API:
```typescript
// Вместо
import { CommandsService } from "../../shared/api/generated/commands-client";

// Используйте
import { CommandsService } from "@/api/generated/commands-client";
```

## Конфигурация

Абсолютные импорты настроены в следующих файлах:

1. **tsconfig.app.json** - настройки TypeScript для IDE и компиляции
2. **vite.config.ts** - настройки Vite для сборки

## Преимущества

1. **Читаемость**: Импорты более понятны и не зависят от глубины вложенности файлов
2. **Рефакторинг**: При перемещении файлов не нужно обновлять относительные пути
3. **Консистентность**: Единообразный стиль импортов во всем проекте
4. **Автодополнение**: Лучшая поддержка автодополнения в IDE

## Примечания

- Все существующие относительные импорты были автоматически обновлены на абсолютные
- При создании новых файлов используйте абсолютные импорты
- IDE (VS Code, WebStorm) должны корректно распознавать алиасы благодаря настройкам TypeScript 