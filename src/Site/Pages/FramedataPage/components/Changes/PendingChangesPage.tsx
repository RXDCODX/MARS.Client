import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import {
  FramedataChanges,
  MovePendingDto,
  TekkenCharacterPendingDto,
} from "@/shared/api";

import styles from "../../FramedataPage.module.scss";

const api = new FramedataChanges();

const statusVariantMap: Record<string, string> = {
  Pending: "warning",
  Applied: "success",
  Rejected: "danger",
  Obsolete: "secondary",
};

const changeTypeVariantMap: Record<string, string> = {
  NewCharacter: "success",
  NewMove: "success",
  MoveUpdate: "info",
  MoveRemoval: "dark",
  CharacterUpdate: "info",
};

// Создаем интерфейс для изменений фреймдаты
interface FramedataChange {
  id: string;
  characterName: string;
  changeType: string;
  status: string;
  description: string;
  detectedAt: string;
  originalData?: TekkenCharacterPendingDto | MovePendingDto;
  newData?: TekkenCharacterPendingDto | MovePendingDto;
  isNew: boolean; // Добавляем поле для определения нового/обновления
}

// Enum для типов изменений
enum FramedataChangeChangeTypeEnum {
  NewCharacter = "NewCharacter",
  NewMove = "NewMove",
  MoveUpdate = "MoveUpdate",
  MoveRemoval = "MoveRemoval",
  CharacterUpdate = "CharacterUpdate",
}

// Enum для сортировки
enum SortField {
  Date = "date",
  CharacterName = "characterName",
  ChangeType = "changeType",
}

const PendingChangesPage: React.FC = () => {
  const navigate = useNavigate();
  const [changes, setChanges] = useState<FramedataChange[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Фильтры и сортировка
  const [searchTerm, setSearchTerm] = useState("");
  const [characterFilter, setCharacterFilter] = useState("");
  const [changeTypeFilter, setChangeTypeFilter] = useState("");
  const [sortField, setSortField] = useState<SortField>(SortField.Date);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Состояние для массовых действий
  const [isBulkActionInProgress, setIsBulkActionInProgress] = useState(false);

  // Функция для загрузки данных
  const loadChanges = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Загружаем pending characters и moves
      const [charactersRes, movesRes] = await Promise.all([
        api.framedataChangesPendingCharactersList(),
        api.framedataChangesPendingMovesList(),
      ]);

      const characters: TekkenCharacterPendingDto[] = charactersRes.data ?? [];
      const moves: MovePendingDto[] = movesRes.data ?? [];

      // Создаем FramedataChange объекты из полученных данных
      const allChanges: FramedataChange[] = [
        ...characters.map(char => ({
          id: `char-${char.name}`,
          characterName: char.name,
          changeType: char.isNew
            ? FramedataChangeChangeTypeEnum.NewCharacter
            : FramedataChangeChangeTypeEnum.CharacterUpdate,
          status: "Pending",
          description: char.isNew
            ? `Новый персонаж: ${char.name}`
            : `Обновление персонажа: ${char.name}`,
          detectedAt: char.lastUpdateTime,
          newData: char,
          isNew: char.isNew,
        })),
        ...moves.map(move => ({
          id: `move-${move.characterName}-${move.command}`,
          characterName: move.characterName,
          changeType: move.isNew
            ? FramedataChangeChangeTypeEnum.NewMove
            : FramedataChangeChangeTypeEnum.MoveUpdate,
          status: "Pending",
          description: move.isNew
            ? `Новый удар: ${move.command}`
            : `Обновление удара: ${move.command}`,
          detectedAt: new Date().toISOString(),
          newData: move,
          isNew: move.isNew,
        })),
      ];

      setChanges(allChanges);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ошибка загрузки ожидающих изменений"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    loadChanges().then(() => {
      if (!isMounted) return;
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Фильтрация и сортировка
  const filteredAndSortedChanges = useMemo(() => {
    const filtered = changes.filter(change => {
      const matchesSearch =
        change.characterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        change.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCharacter =
        !characterFilter || change.characterName === characterFilter;
      const matchesType =
        !changeTypeFilter || change.changeType === changeTypeFilter;

      return matchesSearch && matchesCharacter && matchesType;
    });

    // Сортировка
    filtered.sort((a, b) => {
      let aValue: string | number, bValue: string | number;

      switch (sortField) {
        case SortField.Date:
          aValue = new Date(a.detectedAt).getTime();
          bValue = new Date(b.detectedAt).getTime();
          break;
        case SortField.CharacterName:
          aValue = a.characterName.toLowerCase();
          bValue = b.characterName.toLowerCase();
          break;
        case SortField.ChangeType:
          aValue = a.changeType;
          bValue = b.changeType;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [
    changes,
    searchTerm,
    characterFilter,
    changeTypeFilter,
    sortField,
    sortDirection,
  ]);

  // Уникальные значения для фильтров
  const uniqueCharacters = useMemo(
    () => [...new Set(changes.map(c => c.characterName))].sort(),
    [changes]
  );

  const uniqueChangeTypes = useMemo(
    () => [...new Set(changes.map(c => c.changeType))].sort(),
    [changes]
  );

  // Обработчики действий
  const handleApprove = async (change: FramedataChange) => {
    try {
      if (
        change.changeType === FramedataChangeChangeTypeEnum.NewCharacter ||
        change.changeType === FramedataChangeChangeTypeEnum.CharacterUpdate
      ) {
        await api.framedataChangesApproveCharacterCreate(change.characterName);
      } else if (
        change.changeType === FramedataChangeChangeTypeEnum.NewMove ||
        change.changeType === FramedataChangeChangeTypeEnum.MoveUpdate
      ) {
        // Извлекаем command из ID для moves
        const command = change.id.replace(`move-${change.characterName}-`, "");
        await api.framedataChangesApproveMoveCreate(
          change.characterName,
          command
        );
      }
      // Обновляем список
      loadChanges();
    } catch (err) {
      console.error("Ошибка при принятии изменения:", err);
      setError(
        err instanceof Error ? err.message : "Не удалось принять изменение"
      );
    }
  };

  const handleReject = async (change: FramedataChange) => {
    try {
      if (
        change.changeType === FramedataChangeChangeTypeEnum.NewCharacter ||
        change.changeType === FramedataChangeChangeTypeEnum.CharacterUpdate
      ) {
        await api.framedataChangesRejectCharacterCreate(change.characterName);
      } else if (
        change.changeType === FramedataChangeChangeTypeEnum.NewMove ||
        change.changeType === FramedataChangeChangeTypeEnum.MoveUpdate
      ) {
        // Извлекаем command из ID для moves
        const command = change.id.replace(`move-${change.characterName}-`, "");
        await api.framedataChangesRejectMoveCreate(
          change.characterName,
          command
        );
      }
      // Обновляем список
      loadChanges();
    } catch (err) {
      console.error("Ошибка при отклонении изменения:", err);
      setError(
        err instanceof Error ? err.message : "Не удалось отклонить изменение"
      );
    }
  };

  const handleViewDetails = (change: FramedataChange) => {
    navigate(`/framedata/pending/${change.id}`, {
      state: { change },
    });
  };

  const handleApplyAll = async () => {
    if (!filteredAndSortedChanges.length) return;
    setIsBulkActionInProgress(true);
    setError("");
    try {
      await api.framedataChangesApproveAllCreate();
      loadChanges();
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Не удалось применить все изменения"
      );
    } finally {
      setIsBulkActionInProgress(false);
    }
  };

  const handleRejectAll = async () => {
    if (!filteredAndSortedChanges.length) return;
    setIsBulkActionInProgress(true);
    setError("");
    try {
      await api.framedataChangesRejectAllCreate();
      loadChanges();
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Не удалось отменить все изменения"
      );
    } finally {
      setIsBulkActionInProgress(false);
    }
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  if (isLoading) {
    return (
      <Container className={styles.framedataPage}>
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </Spinner>
        </div>
      </Container>
    );
  }

  return (
    <Container className={styles.framedataPage}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Ожидающие изменения</h2>
        <div className="d-flex gap-2">
          <Button
            variant="success"
            size="sm"
            onClick={handleApplyAll}
            disabled={
              isBulkActionInProgress || filteredAndSortedChanges.length === 0
            }
          >
            {isBulkActionInProgress ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  className="me-2"
                />
                Применение...
              </>
            ) : (
              "Принять все"
            )}
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleRejectAll}
            disabled={
              isBulkActionInProgress || filteredAndSortedChanges.length === 0
            }
          >
            {isBulkActionInProgress ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  className="me-2"
                />
                Отклонение...
              </>
            ) : (
              "Отклонить все"
            )}
          </Button>
        </div>
      </div>

      {/* Фильтры и поиск */}
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Поиск</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Поиск по персонажу или описанию..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Персонаж</Form.Label>
                <Form.Select
                  value={characterFilter}
                  onChange={e => setCharacterFilter(e.target.value)}
                >
                  <option value="">Все персонажи</option>
                  {uniqueCharacters.map(char => (
                    <option key={char} value={char}>
                      {char}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Тип изменения</Form.Label>
                <Form.Select
                  value={changeTypeFilter}
                  onChange={e => setChangeTypeFilter(e.target.value)}
                >
                  <option value="">Все типы</option>
                  {uniqueChangeTypes.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label>Сортировка</Form.Label>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="outline-secondary"
                    size="sm"
                    className="w-100"
                  >
                    {sortField === SortField.Date && "По дате"}
                    {sortField === SortField.CharacterName && "По персонажу"}
                    {sortField === SortField.ChangeType && "По типу"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => toggleSort(SortField.Date)}>
                      По дате{" "}
                      {sortField === SortField.Date &&
                        (sortDirection === "asc" ? "↑" : "↓")}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => toggleSort(SortField.CharacterName)}
                    >
                      По персонажу{" "}
                      {sortField === SortField.CharacterName &&
                        (sortDirection === "asc" ? "↑" : "↓")}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => toggleSort(SortField.ChangeType)}
                    >
                      По типу{" "}
                      {sortField === SortField.ChangeType &&
                        (sortDirection === "asc" ? "↑" : "↓")}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {!!error && (
        <Alert variant="danger" className="mb-3">
          <Alert.Heading>Ошибка</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}

      {filteredAndSortedChanges.length === 0 ? (
        <Alert variant="info">
          <Alert.Heading>Нет ожидающих изменений</Alert.Heading>
          <p>
            Все изменения уже обработаны или не найдены по заданным фильтрам.
          </p>
        </Alert>
      ) : (
        <>
          <div className="mb-3">
            <small className="text-muted">
              Найдено изменений: {filteredAndSortedChanges.length} из{" "}
              {changes.length}
            </small>
          </div>

          <Row xs={1} md={2} lg={3} className="g-4">
            {filteredAndSortedChanges.map(change => (
              <Col key={change.id}>
                <Card
                  className={`h-100 ${styles.changeCard}`}
                  onClick={() => handleViewDetails(change)}
                >
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <Card.Title className="mb-0">
                        {change.characterName}
                      </Card.Title>
                      <Badge
                        bg={statusVariantMap[change.status] || "secondary"}
                      >
                        {change.status}
                      </Badge>
                    </div>
                    <div className="mb-2">
                      <Badge
                        bg={
                          changeTypeVariantMap[change.changeType] || "secondary"
                        }
                      >
                        {change.changeType ===
                        FramedataChangeChangeTypeEnum.NewCharacter
                          ? "Новый персонаж"
                          : change.changeType ===
                              FramedataChangeChangeTypeEnum.CharacterUpdate
                            ? "Обновление персонажа"
                            : change.changeType ===
                                FramedataChangeChangeTypeEnum.NewMove
                              ? "Новый удар"
                              : change.changeType ===
                                  FramedataChangeChangeTypeEnum.MoveUpdate
                                ? "Обновление удара"
                                : change.changeType}
                      </Badge>
                    </div>
                    {change.description && (
                      <Card.Text className="text-muted small">
                        {change.description}
                      </Card.Text>
                    )}
                    <div className="mt-auto">
                      <div className="text-muted small mb-2">
                        Обнаружено:{" "}
                        {new Date(change.detectedAt).toLocaleString("ru-RU")}
                      </div>
                      <div className="d-flex gap-2">
                        <Button
                          variant="success"
                          size="sm"
                          className="flex-fill"
                          onClick={e => {
                            e.stopPropagation();
                            handleApprove(change);
                          }}
                        >
                          Принять
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          className="flex-fill"
                          onClick={e => {
                            e.stopPropagation();
                            handleReject(change);
                          }}
                        >
                          Отклонить
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default PendingChangesPage;
