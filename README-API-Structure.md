# Структура API папок

Этот документ описывает новую структуру папок для API, где типы и data-contracts создаются отдельно от контроллеров и SignalR хабов.

## 📁 Структура папок

```
src/shared/api/
├── types/                    # Общие типы API
│   ├── types.ts             # Основные типы (генерируется из swagger_api.json)
│   └── common-enums.ts      # Общие enum'ы для переиспользования
├── data-contracts/          # Data contracts
│   └── data-contracts.ts    # Data contracts (генерируется из swagger_api.json)
├── http-clients/            # HTTP клиенты для контроллеров
│   ├── Api.ts               # Основной API клиент
│   └── [controller]/        # Отдельные клиенты для каждого контроллера
├── signalr-types/           # Типы для SignalR
│   └── signalr-types.ts     # SignalR типы (генерируется из swagger_hubs.json)
├── signalr-clients/         # SignalR клиенты
│   └── [hub-name]/          # Отдельные клиенты для каждого хаба
│       ├── SignalRContext.ts
│       └── SignalRHubWrapper.tsx
├── api-config.ts            # Утилиты конфигурации API
├── index.ts                 # Главный индексный файл
└── data-contracts.ts        # Shim для обратной совместимости
```

## 🔧 Процесс генерации

### 1. Генерация типов (types/)
- Генерируются только типы без клиентов
- Один файл `types.ts` со всеми типами
- Включает enum'ы и базовые типы

### 2. Генерация data-contracts (data-contracts/)
- Отдельная генерация data-contracts
- Один файл `data-contracts.ts`
- Применяется дедупликация enum'ов

### 3. Генерация HTTP клиентов (http-clients/)
- Генерируются только клиенты без типов
- Модульная структура по контроллерам
- Автоматически добавляются импорты типов

### 4. Генерация SignalR типов (signalr-types/)
- Отдельная генерация типов для SignalR
- Один файл `signalr-types.ts`
- Применяется дедупликация enum'ов

### 5. Генерация SignalR клиентов (signalr-clients/)
- React wrapper'ы для каждого хаба
- Использует типы из `signalr-types/`

## 📥 Импорты

### Основные типы
```typescript
import type * as Types from "@/shared/api/types/types";
import type * as DataContracts from "@/shared/api/data-contracts/data-contracts";
import type * as SignalRTypes from "@/shared/api/signalr-types/signalr-types";
```

### HTTP клиенты
```typescript
import { Commands, Framedata } from "@/shared/api/http-clients";
```

### SignalR клиенты
```typescript
import { ScoreboardSignalRContext } from "@/shared/api/signalr-clients/Scoreboard/SignalRContext";
import ScoreboardSignalRHubWrapper from "@/shared/api/signalr-clients/Scoreboard/SignalRHubWrapper";
```

## 🔄 Обратная совместимость

Для сохранения обратной совместимости создаются shim-файлы:

- `data-contracts.ts` → реэкспортирует из `data-contracts/data-contracts.ts`
- `SignalR/types/signalr-types.ts` → реэкспортирует из `signalr-types/signalr-types.ts`

## 🚀 Запуск генерации

```bash
yarn build-api
```

## ✨ Преимущества новой структуры

1. **Разделение ответственности** - типы и клиенты генерируются отдельно
2. **Лучшая организация** - четкая структура папок
3. **Переиспользование типов** - типы можно импортировать независимо от клиентов
4. **Модульность** - каждый компонент в своей папке
5. **Обратная совместимость** - существующий код продолжит работать
6. **Легкость поддержки** - проще найти и изменить нужные файлы
