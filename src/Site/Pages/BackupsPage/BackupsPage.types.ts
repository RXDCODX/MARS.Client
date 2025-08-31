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

// Состояние компонента
export interface BackupsPageState {
  backups: BackupInfo[];
  status: BackupStatus | null;
  isLoading: boolean;
  isCreating: boolean;
  isCleaning: boolean;
  error: string;
  createForm: CreateBackupForm;
  cleanupForm: CleanupForm;
}
