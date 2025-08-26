import { useEffect, useMemo, useState } from "react";
import { Alert, Badge, Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import type {
  MovePendingDto,
  TekkenCharacter,
  TekkenCharacterPendingDto,
} from "@/shared/api";
import { FramedataChanges } from "@/shared/api";

import styles from "../../FramedataPage.module.scss";
import { GlobalSearch } from "../Search";
import { getCharacterAvatar, handleImageError } from "../Shared/imageUtils";

interface CharacterGridProps {
  characters: TekkenCharacter[];
  isLoading: boolean;
  error: string;
  onCharacterSelect: (character: TekkenCharacter) => void;
}

// Создаем интерфейс для изменений фреймдаты
interface FramedataChange {
  id: string;
  characterName: string;
  changeType: string;
  status: string;
  description: string;
  detectedAt: string;
}

// Enum для типов изменений
enum FramedataChangeChangeTypeEnum {
  NewCharacter = "NewCharacter",
  NewMove = "NewMove",
  MoveUpdate = "MoveUpdate",
  MoveRemoval = "MoveRemoval",
  CharacterUpdate = "CharacterUpdate",
}

const CharacterGrid: React.FC<CharacterGridProps> = ({
  characters,
  isLoading,
  error,
  onCharacterSelect,
}) => {
  const navigate = useNavigate();
  const [pendingChanges, setPendingChanges] = useState<FramedataChange[]>([]);
  const [pendingError, setPendingError] = useState<string>("");
  const [isLoadingPending, setIsLoadingPending] = useState<boolean>(true);
  const [isBulkActionInProgress, setIsBulkActionInProgress] =
    useState<boolean>(false);

  const api = useMemo(() => new FramedataChanges(), []);

  const loadPending = useMemo(
    () => () => {
      setIsLoadingPending(true);
      setPendingError("");

      // Загружаем pending characters и moves
      Promise.all([
        api.framedataChangesPendingCharactersList(),
        api.framedataChangesPendingMovesList(),
      ])
        .then(([charactersRes, movesRes]) => {
          const characters = charactersRes.data ?? [];
          const moves = movesRes.data ?? [];

          // Создаем FramedataChange объекты из полученных данных
          const changes: FramedataChange[] = [
            ...characters.map((char: TekkenCharacterPendingDto) => ({
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
            })),
            ...moves.map((move: MovePendingDto) => ({
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
            })),
          ];

          setPendingChanges(changes);
          setIsLoadingPending(false);
        })
        .catch(err => {
          setPendingError(
            (err as Error)?.message ||
              "Не удалось загрузить ожидающие изменения"
          );
          setIsLoadingPending(false);
        });
    },
    [api]
  );

  useEffect(() => {
    loadPending();
  }, [loadPending]);

  const statsByType = useMemo(() => {
    const map: Partial<Record<FramedataChangeChangeTypeEnum, number>> = {};
    for (const ch of pendingChanges) {
      const changeType = ch.changeType as FramedataChangeChangeTypeEnum;
      map[changeType] = (map[changeType] || 0) + 1;
    }
    return map;
  }, [pendingChanges]);

  const changeTypeVariantMap: Record<string, string> = {
    [FramedataChangeChangeTypeEnum.NewCharacter]: "primary",
    [FramedataChangeChangeTypeEnum.NewMove]: "info",
    [FramedataChangeChangeTypeEnum.MoveUpdate]: "secondary",
    [FramedataChangeChangeTypeEnum.MoveRemoval]: "dark",
    [FramedataChangeChangeTypeEnum.CharacterUpdate]: "secondary",
  };

  const statEntries = useMemo(() => Object.entries(statsByType), [statsByType]);
  const gridSize = useMemo(
    () => Math.ceil(Math.sqrt(Math.max(1, statEntries.length))),
    [statEntries.length]
  );

  const handleApplyAll = async () => {
    if (!pendingChanges.length) return;
    setIsBulkActionInProgress(true);
    setPendingError("");
    try {
      await api.framedataChangesApproveAllCreate();
      loadPending();
    } catch (e) {
      setPendingError(
        e instanceof Error ? e.message : "Не удалось применить все изменения"
      );
    } finally {
      setIsBulkActionInProgress(false);
    }
  };

  const handleRejectAll = async () => {
    if (!pendingChanges.length) return;
    setIsBulkActionInProgress(true);
    setPendingError("");
    try {
      await api.framedataChangesRejectAllCreate();
      loadPending();
    } catch (e) {
      setPendingError(
        e instanceof Error ? e.message : "Не удалось отменить все изменения"
      );
    } finally {
      setIsBulkActionInProgress(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Ошибка загрузки</Alert.Heading>
        <p>{error}</p>
      </Alert>
    );
  }

  if (characters.length === 0) {
    return (
      <Alert variant="info">
        <Alert.Heading>Персонажи не найдены</Alert.Heading>
        <p>Пока нет доступных персонажей.</p>
      </Alert>
    );
  }

  return (
    <div className={`${styles.characterGrid} ${styles.compactGrid}`}>
      {/* Глобальный поиск по фреймдате */}
      <GlobalSearch characters={characters} />

      <Card className="mb-4">
        <Card.Header>
          <h5 className="mb-0">Ожидающие изменения фреймдаты</h5>
        </Card.Header>
        <Card.Body>
          {isLoadingPending ? (
            <div className="text-center py-3">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Загрузка...</span>
              </Spinner>
            </div>
          ) : pendingError ? (
            <Alert variant="danger" className="mb-0">
              {pendingError}
            </Alert>
          ) : pendingChanges.length === 0 ? (
            <Alert variant="info" className="mb-0">
              Нет ожидающих изменений
            </Alert>
          ) : (
            <div className="d-flex flex-column gap-3">
              <div>
                Всего ожидает:{" "}
                <Badge bg="secondary">{pendingChanges.length}</Badge>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                  gap: "0.5rem",
                }}
              >
                {Array.from({ length: gridSize * gridSize }).map((_, idx) => {
                  const entry = statEntries[idx];
                  if (!entry) {
                    return (
                      <div
                        key={`empty-${idx}`}
                        className="p-3 border rounded"
                        style={{ visibility: "hidden" }}
                      />
                    );
                  }
                  const [type, count] = entry as [string, number];
                  return (
                    <div
                      key={type}
                      className="text-center p-3 border rounded d-flex flex-column justify-content-center align-items-center"
                    >
                      <div className="fs-4 fw-bold">{count}</div>
                      <Badge bg={changeTypeVariantMap[type] || "secondary"}>
                        {type}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </Card.Body>
        <Card.Footer>
          <Row className="g-2 justify-content-center">
            <Col xs={4}>
              <Button
                size="sm"
                variant="success"
                className="w-100"
                onClick={handleApplyAll}
                disabled={
                  isLoadingPending ||
                  isBulkActionInProgress ||
                  pendingChanges.length === 0
                }
              >
                Принять все
              </Button>
            </Col>
            <Col xs={4}>
              <Button
                size="sm"
                variant="warning"
                className="w-100"
                onClick={() => navigate("/framedata/pending")}
              >
                Начать рассматривать
              </Button>
            </Col>
            <Col xs={4}>
              <Button
                size="sm"
                variant="danger"
                className="w-100"
                onClick={handleRejectAll}
                disabled={
                  isLoadingPending ||
                  isBulkActionInProgress ||
                  pendingChanges.length === 0
                }
              >
                Отменить все
              </Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2 className="mb-0">Персонажи Tekken</h2>
      </div>
      <Row xs={3} sm={4} md={6} lg={8} xl={10} xxl={12} className="g-1">
        {characters.map(character => {
          const charName =
            character.name.charAt(0).toUpperCase() + character.name.slice(1);

          return (
            <Col key={charName}>
              <Card
                className={`${styles.characterCard} h-100`}
                onClick={() => onCharacterSelect(character)}
              >
                <div className={styles.characterImageContainer}>
                  <Card.Img
                    variant="top"
                    src={getCharacterAvatar(character, "200x300")}
                    alt={charName}
                    className={styles.characterImage}
                    onError={e => handleImageError(e, charName, "200x300")}
                  />
                </div>
                <Card.Body
                  className={`${styles.compactCardBody} d-flex flex-column`}
                >
                  <Card.Title
                    className={`${styles.compactCardTitle} text-center mb-0`}
                  >
                    {charName}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default CharacterGrid;
