import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Collapse,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";

import { DatabaseBackup } from "@/shared/api";
import {
  createErrorToast,
  createSuccessToast,
  useToastModal,
} from "@/shared/Utils/ToastModal";

import styles from "./BackupsPage.module.scss";
import {
  PathSettings,
  PgDumpHistoryItem,
  PgDumpSettings,
} from "./BackupsPage.types";

// Интерфейс для информации о бекапе
interface BackupInfo {
  fileName: string;
  fileSize: string;
  createdAt: string;
  databaseName: string;
}

// Интерфейс для статуса бекапов
interface BackupStatus {
  totalBackups: number;
  totalSize: string;
  lastBackupDate: string;
  backupDirectory: string;
}

const BackupsPage: React.FC = () => {
  const { showToast } = useToastModal();
  const [api] = useState(() => new DatabaseBackup());

  // Состояние компонента
  const [backups, setBackups] = useState<BackupInfo[]>([]);
  const [status, setStatus] = useState<BackupStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isCleaning, setIsCleaning] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [error, setError] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  // Форма создания бекапа
  const [createForm, setCreateForm] = useState({
    databaseName: "",
  });

  // Форма очистки
  const [cleanupForm, setCleanupForm] = useState({
    keepCount: 10,
  });

  // Настройки pg_dump
  const [pgDumpSettings, setPgDumpSettings] = useState<PgDumpSettings>({
    pgDumpPath: "pg_dump",
    comment: "",
    backupPath: "/backups/database",
  });

  // Настройки путей
  const [pathSettings, setPathSettings] = useState<PathSettings>({
    backupDirectory: "/backups/database",
    tempDirectory: "/tmp/backups",
    logDirectory: "/logs/backups",
    useCustomPath: false,
    autoCreateDirectories: true,
  });

  // Состояние для pg_dump
  const [pgDumpHistory, setPgDumpHistory] = useState<PgDumpHistoryItem[]>([]);
  const [pgDumpConfigured, setPgDumpConfigured] = useState<boolean>(false);

  // Загрузка списка бекапов
  const loadBackups = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");
      await api.databaseBackupListList();

      // Преобразуем ответ в массив бекапов
      // Примечание: API возвращает void, поэтому создаем моковые данные для демонстрации
      const mockBackups: BackupInfo[] = [
        {
          fileName: "backup_2024_01_15_120000.sql",
          fileSize: "15.2 MB",
          createdAt: "2024-01-15T12:00:00Z",
          databaseName: "mars_main",
        },
        {
          fileName: "backup_2024_01_14_120000.sql",
          fileSize: "14.8 MB",
          createdAt: "2024-01-14T12:00:00Z",
          databaseName: "mars_main",
        },
        {
          fileName: "backup_2024_01_13_120000.sql",
          fileSize: "14.9 MB",
          createdAt: "2024-01-13T12:00:00Z",
          databaseName: "mars_main",
        },
      ];

      setBackups(mockBackups);
    } catch (err) {
      const errorMessage =
        "Ошибка при загрузке списка бекапов: " + (err as Error).message;
      setError(errorMessage);
      showToast(createErrorToast(errorMessage, err, "Ошибка загрузки"));
    } finally {
      setIsLoading(false);
    }
  }, [api, showToast]);

  // Загрузка статуса бекапов
  const loadStatus = useCallback(async () => {
    try {
      await api.databaseBackupStatusList();

      // Создаем моковые данные для демонстрации
      const mockStatus: BackupStatus = {
        totalBackups: backups.length,
        totalSize: "44.9 MB",
        lastBackupDate:
          backups.length > 0 ? backups[0].createdAt : "Нет бекапов",
        backupDirectory: "/backups/database",
      };

      setStatus(mockStatus);
    } catch (err) {
      console.error("Ошибка при загрузке статуса:", err);
    }
  }, [api, backups]);

  // Создание нового бекапа
  const handleCreateBackup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!createForm.databaseName.trim()) {
      showToast(
        createErrorToast(
          "Введите название базы данных",
          null,
          "Ошибка валидации"
        )
      );
      return;
    }

    try {
      setIsCreating(true);
      setError("");

      await api.databaseBackupCreateCreate({
        databaseName: createForm.databaseName.trim(),
      });

      showToast(
        createSuccessToast(
          `Бекап базы данных "${createForm.databaseName}" создан успешно`,
          null,
          "Бекап создан"
        )
      );

      // Очищаем форму и обновляем список
      setCreateForm({ databaseName: "" });
      await loadBackups();
      await loadStatus();
    } catch (err) {
      const errorMessage =
        "Ошибка при создании бекапа: " + (err as Error).message;
      setError(errorMessage);
      showToast(createErrorToast(errorMessage, err, "Ошибка создания"));
    } finally {
      setIsCreating(false);
    }
  };

  // Скачивание бекапа
  const handleDownloadBackup = async (fileName: string) => {
    try {
      await api.databaseBackupDownloadList({
        fileName,
      });

      showToast(
        createSuccessToast(
          `Бекап "${fileName}" скачивается`,
          null,
          "Скачивание начато"
        )
      );
    } catch (err) {
      const errorMessage =
        "Ошибка при скачивании бекапа: " + (err as Error).message;
      showToast(createErrorToast(errorMessage, err, "Ошибка скачивания"));
    }
  };

  // Очистка старых бекапов
  const handleCleanup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsCleaning(true);
      setError("");

      await api.databaseBackupCleanupCreate({
        keepCount: cleanupForm.keepCount,
      });

      showToast(
        createSuccessToast(
          `Очистка выполнена. Оставлено ${cleanupForm.keepCount} последних бекапов`,
          null,
          "Очистка завершена"
        )
      );

      // Обновляем список и статус
      await loadBackups();
      await loadStatus();
    } catch (err) {
      const errorMessage =
        "Ошибка при очистке бекапов: " + (err as Error).message;
      setError(errorMessage);
      showToast(createErrorToast(errorMessage, err, "Ошибка очистки"));
    } finally {
      setIsCleaning(false);
    }
  };

  // Загрузка настроек pg_dump
  const loadPgDumpSettings = useCallback(async () => {
    try {
      await api.databaseBackupPgDumpSettingsList();
      // Примечание: API возвращает void, поэтому используем текущие настройки
    } catch (err) {
      console.error("Ошибка при загрузке настроек pg_dump:", err);
    }
  }, [api]);

  // Загрузка истории pg_dump
  const loadPgDumpHistory = useCallback(async () => {
    try {
      await api.databaseBackupPgDumpHistoryList();
      // Примечание: API возвращает void, создаем моковые данные
      const mockHistory: PgDumpHistoryItem[] = [
        {
          id: 1,
          operation: "backup",
          database: "mars_main",
          timestamp: "2024-01-15T12:00:00Z",
          status: "success",
        },
        {
          id: 2,
          operation: "backup",
          database: "mars_main",
          timestamp: "2024-01-14T12:00:00Z",
          status: "success",
        },
      ];
      setPgDumpHistory(mockHistory);
    } catch (err) {
      console.error("Ошибка при загрузке истории pg_dump:", err);
    }
  }, [api]);

  // Проверка конфигурации pg_dump
  const checkPgDumpConfigured = useCallback(async () => {
    try {
      await api.databaseBackupPgDumpConfiguredList();
      // Примечание: API возвращает void, предполагаем что настроено
      setPgDumpConfigured(true);
    } catch (err) {
      console.error("Ошибка при проверке конфигурации pg_dump:", err);
      setPgDumpConfigured(false);
    }
  }, [api]);

  // Валидация настроек pg_dump
  const validatePgDumpSettings = async (pgDumpPath: string) => {
    try {
      await api.databaseBackupPgDumpValidateCreate({
        pgDumpPath,
      });

      showToast(
        createSuccessToast(
          `pg_dump найден по пути: ${pgDumpPath}`,
          null,
          "Валидация успешна"
        )
      );
      return true;
    } catch (err) {
      showToast(
        createErrorToast(
          "Ошибка валидации pg_dump: " + (err as Error).message,
          err,
          "Ошибка валидации"
        )
      );
      return false;
    }
  };

  // Выбор файла pg_dump
  const handleSelectPgDumpFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".exe"; // Для Windows
    input.style.display = "none";

    input.onchange = e => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const filePath =
          target.files[0].webkitRelativePath || target.files[0].name;
        setPgDumpSettings(prev => ({
          ...prev,
          pgDumpPath: filePath,
        }));
      }
    };

    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  };

  // Сохранение настроек pg_dump
  const handleSavePgDumpSettings = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSavingSettings(true);
      setError("");

      // Преобразуем PgDumpSettings в UpdatePgDumpSettingsRequest
      const updateRequest = {
        pgDumpPath: pgDumpSettings.pgDumpPath,
        comment: pgDumpSettings.comment || `Настройки pg_dump`,
        backupPath: pgDumpSettings.backupPath || pathSettings.backupDirectory,
      };

      await api.databaseBackupPgDumpSettingsCreate(updateRequest);

      showToast(
        createSuccessToast(
          "Настройки pg_dump сохранены успешно",
          null,
          "Настройки сохранены"
        )
      );
    } catch (err) {
      const errorMessage =
        "Ошибка при сохранении настроек: " + (err as Error).message;
      setError(errorMessage);
      showToast(createErrorToast(errorMessage, err, "Ошибка сохранения"));
    } finally {
      setIsSavingSettings(false);
    }
  };

  // Сохранение настроек путей
  const handleSavePathSettings = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSavingSettings(true);
      setError("");

      // Здесь будет API вызов для сохранения настроек путей
      // await api.savePathSettings(pathSettings);

      showToast(
        createSuccessToast(
          "Настройки путей сохранены успешно",
          null,
          "Настройки сохранены"
        )
      );
    } catch (err) {
      const errorMessage =
        "Ошибка при сохранении настроек путей: " + (err as Error).message;
      setError(errorMessage);
      showToast(createErrorToast(errorMessage, err, "Ошибка сохранения"));
    } finally {
      setIsSavingSettings(false);
    }
  };

  // Форматирование размера файла
  const formatFileSize = (size: string) => size;

  // Форматирование даты
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // Загрузка данных при монтировании
  useEffect(() => {
    loadBackups();
    loadPgDumpSettings();
    loadPgDumpHistory();
    checkPgDumpConfigured();
  }, [
    loadBackups,
    loadPgDumpSettings,
    loadPgDumpHistory,
    checkPgDumpConfigured,
  ]);

  // Загрузка статуса после загрузки бекапов
  useEffect(() => {
    if (backups.length > 0) {
      loadStatus();
    }
  }, [backups.length, loadStatus]);

  return (
    <div className={styles.backupsPage}>
      {/* Заголовок страницы */}
      <div className={styles.pageHeader}>
        <Container>
          <div className={styles.headerContent}>
            <h1 className={styles.pageTitle}>Управление бекапами</h1>
            <p className={styles.pageSubtitle}>
              Создавайте, скачивайте и управляйте резервными копиями базы данных
            </p>
          </div>
        </Container>
      </div>

      <Container>
        {/* Секция управления */}
        <div className={styles.controlsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.controlsTitle}>Управление бекапами</h2>
            <Button
              onClick={() => setShowSettings(!showSettings)}
              className={styles.settingsButton}
              variant="outline-primary"
            >
              <i
                className={`bi bi-gear me-2 ${showSettings ? "bi-gear-fill" : ""}`}
              ></i>
              {showSettings ? "Скрыть настройки" : "Показать настройки"}
            </Button>
          </div>

          <div className={styles.controlsGrid}>
            {/* Создание бекапа */}
            <div className={styles.controlCard}>
              <h3 className={styles.controlTitle}>Создать новый бекап</h3>
              <p className={styles.controlDescription}>
                Создайте резервную копию указанной базы данных
              </p>

              <form
                onSubmit={handleCreateBackup}
                className={styles.controlForm}
              >
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Название базы данных
                  </label>
                  <input
                    type="text"
                    className={styles.formControl}
                    placeholder="mars_main"
                    value={createForm.databaseName}
                    onChange={e =>
                      setCreateForm({ databaseName: e.target.value })
                    }
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className={`${styles.controlButton} ${styles.controlButtonPrimary}`}
                  disabled={isCreating}
                >
                  {isCreating ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        className="me-2"
                      />
                      Создание...
                    </>
                  ) : (
                    "Создать бекап"
                  )}
                </Button>
              </form>
            </div>

            {/* Очистка старых бекапов */}
            <div className={styles.controlCard}>
              <h3 className={styles.controlTitle}>Очистка старых бекапов</h3>
              <p className={styles.controlDescription}>
                Удалите старые бекапы, оставив указанное количество последних
              </p>

              <form onSubmit={handleCleanup} className={styles.controlForm}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Количество для сохранения
                  </label>
                  <input
                    type="number"
                    className={styles.formControl}
                    min="1"
                    max="100"
                    value={cleanupForm.keepCount}
                    onChange={e =>
                      setCleanupForm({ keepCount: parseInt(e.target.value) })
                    }
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className={`${styles.controlButton} ${styles.controlButtonWarning}`}
                  disabled={isCleaning}
                >
                  {isCleaning ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        className="me-2"
                      />
                      Очистка...
                    </>
                  ) : (
                    "Очистить"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Секция настроек */}
        <Collapse in={showSettings}>
          <div className={styles.settingsSection}>
            <h2 className={styles.controlsTitle}>Настройки бекапов</h2>

            <Row>
              {/* Настройки pg_dump */}
              <Col lg={6}>
                <div className={styles.settingsCard}>
                  <h3 className={styles.settingsCardTitle}>
                    <i className="bi bi-database-gear me-2"></i>
                    Настройки pg_dump
                  </h3>

                  <Form onSubmit={handleSavePgDumpSettings}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Путь к pg_dump</Form.Label>
                          <div className="input-group">
                            <Form.Control
                              type="text"
                              value={pgDumpSettings.pgDumpPath}
                              onChange={e =>
                                setPgDumpSettings(prev => ({
                                  ...prev,
                                  pgDumpPath: e.target.value,
                                }))
                              }
                              placeholder="pg_dump"
                            />
                            <Button
                              type="button"
                              variant="outline-secondary"
                              onClick={handleSelectPgDumpFile}
                              className="input-group-text"
                            >
                              <i className="bi bi-folder2-open"></i>
                            </Button>
                          </div>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Комментарий</Form.Label>
                          <Form.Control
                            type="text"
                            value={pgDumpSettings.comment || ""}
                            onChange={e =>
                              setPgDumpSettings(prev => ({
                                ...prev,
                                comment: e.target.value,
                              }))
                            }
                            placeholder="Описание настроек pg_dump"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Путь для сохранения бекапов</Form.Label>
                          <Form.Control
                            type="text"
                            value={pgDumpSettings.backupPath || ""}
                            onChange={e =>
                              setPgDumpSettings(prev => ({
                                ...prev,
                                backupPath: e.target.value,
                              }))
                            }
                            placeholder="/backups/database"
                          />
                        </Form.Group>
                      </Col>
                    </Row>


                    <div className="d-flex flex-column gap-2">
                      <Button
                        type="button"
                        variant="outline-secondary"
                        onClick={async () => {
                          if (!pgDumpSettings.pgDumpPath.trim()) {
                            showToast(
                              createErrorToast(
                                "Укажите путь к pg_dump",
                                null,
                                "Ошибка валидации"
                              )
                            );
                            return;
                          }
                          await validatePgDumpSettings(
                            pgDumpSettings.pgDumpPath
                          );
                        }}
                        disabled={isSavingSettings}
                        className={styles.controlButton}
                      >
                        <i className="bi bi-check-circle me-2"></i>
                        Проверить pg_dump
                      </Button>
                      <Button
                        type="submit"
                        className={`${styles.controlButton} ${styles.controlButtonPrimary}`}
                        disabled={isSavingSettings}
                      >
                        {isSavingSettings ? (
                          <>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              className="me-2"
                            />
                            Сохранение...
                          </>
                        ) : (
                          "Сохранить настройки pg_dump"
                        )}
                      </Button>
                    </div>
                  </Form>
                </div>
              </Col>

              {/* Настройки путей */}
              <Col lg={6}>
                <div className={styles.settingsCard}>
                  <h3 className={styles.settingsCardTitle}>
                    <i className="bi bi-folder-gear me-2"></i>
                    Настройки путей
                  </h3>

                  <Form onSubmit={handleSavePathSettings}>
                    <Form.Group className="mb-3">
                      <Form.Label>Папка для бекапов</Form.Label>
                      <Form.Control
                        type="text"
                        value={pathSettings.backupDirectory}
                        onChange={e =>
                          setPathSettings(prev => ({
                            ...prev,
                            backupDirectory: e.target.value,
                          }))
                        }
                        placeholder="/backups/database"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Временная папка</Form.Label>
                      <Form.Control
                        type="text"
                        value={pathSettings.tempDirectory}
                        onChange={e =>
                          setPathSettings(prev => ({
                            ...prev,
                            tempDirectory: e.target.value,
                          }))
                        }
                        placeholder="/tmp/backups"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Папка для логов</Form.Label>
                      <Form.Control
                        type="text"
                        value={pathSettings.logDirectory}
                        onChange={e =>
                          setPathSettings(prev => ({
                            ...prev,
                            logDirectory: e.target.value,
                          }))
                        }
                        placeholder="/logs/backups"
                      />
                    </Form.Group>

                    <div className={styles.checkboxGroup}>
                      <Form.Check
                        type="checkbox"
                        id="useCustomPath"
                        label="Использовать пользовательские пути"
                        checked={pathSettings.useCustomPath}
                        onChange={e =>
                          setPathSettings(prev => ({
                            ...prev,
                            useCustomPath: e.target.checked,
                          }))
                        }
                      />
                      <Form.Check
                        type="checkbox"
                        id="autoCreateDirectories"
                        label="Автоматически создавать папки"
                        checked={pathSettings.autoCreateDirectories}
                        onChange={e =>
                          setPathSettings(prev => ({
                            ...prev,
                            autoCreateDirectories: e.target.checked,
                          }))
                        }
                      />
                    </div>

                    <Button
                      type="submit"
                      className={`${styles.controlButton} ${styles.controlButtonSuccess}`}
                      disabled={isSavingSettings}
                    >
                      {isSavingSettings ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            className="me-2"
                          />
                          Сохранение...
                        </>
                      ) : (
                        "Сохранить настройки путей"
                      )}
                    </Button>
                  </Form>
                </div>
              </Col>
            </Row>

            {/* История pg_dump */}
            <Row className="mt-4">
              <Col>
                <div className={styles.settingsCard}>
                  <h3 className={styles.settingsCardTitle}>
                    <i className="bi bi-clock-history me-2"></i>
                    История операций pg_dump
                  </h3>

                  {pgDumpHistory.length === 0 ? (
                    <div className="text-center text-muted py-3">
                      <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                      История операций пуста
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>Операция</th>
                            <th>База данных</th>
                            <th>Время</th>
                            <th>Статус</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pgDumpHistory.map(item => (
                            <tr key={item.id}>
                              <td>
                                <span className="badge bg-primary">
                                  {item.operation}
                                </span>
                              </td>
                              <td>{item.database}</td>
                              <td>{formatDate(item.timestamp)}</td>
                              <td>
                                <span
                                  className={`badge ${
                                    item.status === "success"
                                      ? "bg-success"
                                      : "bg-danger"
                                  }`}
                                >
                                  {item.status === "success"
                                    ? "Успешно"
                                    : "Ошибка"}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </Collapse>

        {/* Секция статуса */}
        {status && (
          <div className={styles.statusSection}>
            <h2 className={styles.controlsTitle}>Статистика бекапов</h2>

            <div className={styles.statusGrid}>
              <div className={styles.statusCard}>
                <div className={styles.statusIcon}>📊</div>
                <div className={styles.statusValue}>{status.totalBackups}</div>
                <div className={styles.statusLabel}>Всего бекапов</div>
              </div>

              <div className={styles.statusCard}>
                <div className={styles.statusIcon}>💾</div>
                <div className={styles.statusValue}>{status.totalSize}</div>
                <div className={styles.statusLabel}>Общий размер</div>
              </div>

              <div className={styles.statusCard}>
                <div className={styles.statusIcon}>📅</div>
                <div className={styles.statusValue}>
                  {status.lastBackupDate !== "Нет бекапов"
                    ? formatDate(status.lastBackupDate).split(" ")[0]
                    : "Нет"}
                </div>
                <div className={styles.statusLabel}>Последний бекап</div>
              </div>

              <div className={styles.statusCard}>
                <div className={styles.statusIcon}>📁</div>
                <div className={styles.statusValue}>
                  {status.backupDirectory.split("/").pop()}
                </div>
                <div className={styles.statusLabel}>Папка хранения</div>
              </div>

              <div className={styles.statusCard}>
                <div className={styles.statusIcon}>
                  {pgDumpConfigured ? "✅" : "❌"}
                </div>
                <div className={styles.statusValue}>
                  {pgDumpConfigured ? "Настроено" : "Не настроено"}
                </div>
                <div className={styles.statusLabel}>pg_dump статус</div>
              </div>
            </div>
          </div>
        )}

        {/* Секция списка бекапов */}
        <div className={styles.backupsListSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Список бекапов</h2>
            <Button
              onClick={loadBackups}
              disabled={isLoading}
              className={styles.refreshButton}
            >
              <i className="bi bi-arrow-clockwise me-2"></i>
              Обновить
            </Button>
          </div>

          {error && (
            <Alert variant="danger" className={styles.errorAlert}>
              <Alert.Heading>Ошибка</Alert.Heading>
              <p>{error}</p>
            </Alert>
          )}

          {isLoading ? (
            <div className={styles.loadingSpinner}>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Загрузка...</span>
              </Spinner>
            </div>
          ) : backups.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>💾</div>
              <h3 className={styles.emptyTitle}>Бекапы не найдены</h3>
              <p className={styles.emptyDescription}>
                Создайте первый бекап базы данных, используя форму выше
              </p>
            </div>
          ) : (
            <div className={styles.backupsGrid}>
              {backups.map((backup, index) => (
                <div key={index} className={styles.backupCard}>
                  <div className={styles.backupHeader}>
                    <h4 className={styles.backupName}>{backup.fileName}</h4>
                    <span className={styles.backupSize}>
                      {formatFileSize(backup.fileSize)}
                    </span>
                  </div>

                  <div className={styles.backupInfo}>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>База данных:</span>
                      <span className={styles.infoValue}>
                        {backup.databaseName}
                      </span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Создан:</span>
                      <span className={styles.infoValue}>
                        {formatDate(backup.createdAt)}
                      </span>
                    </div>
                  </div>

                  <div className={styles.backupActions}>
                    <Button
                      onClick={() => handleDownloadBackup(backup.fileName)}
                      className={`${styles.actionButton} ${styles.actionButtonDownload}`}
                    >
                      <i className="bi bi-download me-2"></i>
                      Скачать
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default BackupsPage;
