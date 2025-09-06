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

// Настройки pg_dump
export interface PgDumpSettings {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  encoding: string;
  format: "plain" | "custom" | "directory" | "tar";
  compression: number; // 0-9
  verbose: boolean;
  noOwner: boolean;
  noPrivileges: boolean;
  noTablespaces: boolean;
  ifExists: boolean;
  clean: boolean;
  create: boolean;
  dataOnly: boolean;
  schemaOnly: boolean;
  excludeTable: string[];
  includeTable: string[];
  excludeSchema: string[];
  includeSchema: string[];
}

// Настройки путей
export interface PathSettings {
  backupDirectory: string;
  tempDirectory: string;
  logDirectory: string;
  useCustomPath: boolean;
  autoCreateDirectories: boolean;
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
