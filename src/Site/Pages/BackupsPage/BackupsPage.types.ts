// Типы для страницы управления бекапами

// Информация о бекапе
export interface BackupInfo {
  fileName: string;
  fileSize: string;
  createdAt: string;
  databaseName: string;
}

// Статус бекапов
export interface BackupStatus {
  totalBackups: number;
  totalSize: string;
  lastBackupDate: string;
  backupDirectory: string;
}

// Форма создания бекапа
export interface CreateBackupForm {
  databaseName: string;
}

// Форма очистки бекапов
export interface CleanupForm {
  keepCount: number;
}

// Настройки pg_dump (соответствуют серверной части)
export interface PgDumpSettings {
  pgDumpPath: string; // Путь к исполняемому файлу pg_dump
  comment?: string; // Комментарий к настройкам
  backupPath?: string; // Путь для сохранения бекапов
}

// Настройки путей
export interface PathSettings {
  backupDirectory: string;
  tempDirectory: string;
  logDirectory: string;
  useCustomPath: boolean;
  autoCreateDirectories: boolean;
}

// История операций pg_dump
export interface PgDumpHistoryItem {
  id: number;
  operation: string;
  database: string;
  timestamp: string;
  status: "success" | "error";
}

// Состояние компонента
export interface BackupsPageState {
  backups: BackupInfo[];
  status: BackupStatus | null;
  isLoading: boolean;
  isCreating: boolean;
  isCleaning: boolean;
  isSavingSettings: boolean;
  error: string;
  createForm: CreateBackupForm;
  cleanupForm: CleanupForm;
  pgDumpSettings: PgDumpSettings;
  pathSettings: PathSettings;
  showSettings: boolean;
}
