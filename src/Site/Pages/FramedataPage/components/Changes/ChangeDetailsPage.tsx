import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

import { Framedata, FramedataChanges } from "@/shared/api";
import { Move } from "@/shared/api/types/data-contracts";

import styles from "../../FramedataPage.module.scss";

const api = new FramedataChanges();
const framedataApi = new Framedata();

// Интерфейс для изменений фреймдаты
interface FramedataChange {
  id: string;
  characterName: string;
  changeType: string;
  status: string;
  description: string;
  detectedAt: string;
  newData?: {
    name?: string;
    description?: string;
    linkToImage?: string;
    pageUrl?: string;
    strengths?: string[];
    weaknesess?: string[];
    command?: string;
    stanceCode?: string;
    stanceName?: string;
    hitLevel?: string;
    damage?: string;
    startUpFrame?: string;
    blockFrame?: string;
    hitFrame?: string;
    counterHitFrame?: string;
    heatEngage?: boolean;
    heatSmash?: boolean;
    powerCrush?: boolean;
    throw?: boolean;
    homing?: boolean;
    tornado?: boolean;
    heatBurst?: boolean;
    requiresHeat?: boolean;
    notes?: string[];
  };
}

// Интерфейс для персонажа
interface CharacterData {
  name: string;
  description?: string;
  linkToImage?: string;
  pageUrl?: string;
  strengths?: string[];
  weaknesess?: string[];
}

interface ChangeDetailsPageProps {
  change?: FramedataChange;
}

const ChangeDetailsPage: React.FC<ChangeDetailsPageProps> = ({
  change: propChange,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [change] = useState<FramedataChange | undefined>(
    propChange || location.state?.change
  );
  const [originalData, setOriginalData] = useState<Move | Move[] | unknown>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Функция для отображения заметок с разными цветами фона
  const renderNotes = (notes: string[] | undefined) => {
    if (!notes || notes.length === 0) return "-";

    return (
      <div className={styles.notesContainer}>
        {notes.map((note, index) => (
          <div key={index} className={styles.noteItem}>
            <span className={styles.noteNumber}>#{index + 1}</span>
            <span className={styles.noteText}>{note}</span>
          </div>
        ))}
      </div>
    );
  };

  const loadOriginalData = useCallback(async () => {
    if (!change) return;

    setIsLoading(true);
    setError("");

    try {
      if (change.changeType === "NewCharacter") {
        // Для нового персонажа нет оригинальных данных
        setOriginalData(null);
      } else if (change.changeType === "CharacterUpdate") {
        // Для обновления персонажа загружаем оригинальные данные
        const response = await framedataApi.framedataCharactersDetail(
          change.characterName
        );
        setOriginalData(response.data);
      } else if (change.changeType === "NewMove") {
        // Для нового удара загружаем существующие удары персонажа
        const response = await framedataApi.framedataCharactersMovesList(
          change.characterName
        );
        const existingMoves = response.data || [];
        setOriginalData(existingMoves);
      } else if (change.changeType === "MoveUpdate") {
        // Для обновления удара загружаем оригинальный удар
        const response = await framedataApi.framedataCharactersMovesList(
          change.characterName
        );
        const existingMoves = response.data || [];
        const originalMove = existingMoves.find(
          (m: Move) => m.command === change.newData?.command
        );
        setOriginalData(originalMove || null);
      } else if (change.changeType === "MoveRemoval") {
        // Для удаления удара загружаем оригинальный удар
        const response = await framedataApi.framedataCharactersMovesList(
          change.characterName
        );
        const existingMoves = response.data || [];
        const originalMove = existingMoves.find(
          (m: Move) => m.command === change.newData?.command
        );
        setOriginalData(originalMove || null);
      }
    } catch (err) {
      console.error("Ошибка загрузки оригинальных данных:", err);
      setError("Не удалось загрузить оригинальные данные");
    } finally {
      setIsLoading(false);
    }
  }, [change]);

  useEffect(() => {
    if (!change) {
      setError("Изменение не найдено");
      return;
    }

    loadOriginalData();
  }, [change, loadOriginalData]);

  const handleApprove = async () => {
    if (!change) return;

    try {
      if (
        change.changeType === "NewCharacter" ||
        change.changeType === "CharacterUpdate"
      ) {
        await api.framedataChangesApproveCharacterCreate(change.characterName);
      } else if (
        change.changeType === "NewMove" ||
        change.changeType === "MoveUpdate"
      ) {
        const command =
          change.changeType === "NewMove"
            ? change.newData?.command
            : change.id.replace(`move-${change.characterName}-`, "");
        if (command) {
          await api.framedataChangesApproveMoveCreate(
            change.characterName,
            command
          );
        }
      } else if (change.changeType === "MoveRemoval") {
        const command = change.id.replace(`move-${change.characterName}-`, "");
        await api.framedataChangesApproveMoveCreate(
          change.characterName,
          command
        );
      }
      navigate("/framedata/pending");
    } catch (err) {
      console.error("Ошибка при принятии изменения:", err);
      setError("Не удалось принять изменение");
    }
  };

  const handleReject = async () => {
    if (!change) return;

    try {
      if (
        change.changeType === "NewCharacter" ||
        change.changeType === "CharacterUpdate"
      ) {
        await api.framedataChangesRejectCharacterCreate(change.characterName);
      } else if (
        change.changeType === "NewMove" ||
        change.changeType === "MoveUpdate"
      ) {
        const command =
          change.changeType === "NewMove"
            ? change.newData?.command
            : change.id.replace(`move-${change.characterName}-`, "");
        if (command) {
          await api.framedataChangesRejectMoveCreate(
            change.characterName,
            command
          );
        }
      } else if (change.changeType === "MoveRemoval") {
        const command = change.id.replace(`move-${change.characterName}-`, "");
        await api.framedataChangesRejectMoveCreate(
          change.characterName,
          command
        );
      }
      navigate("/framedata/pending");
    } catch (err) {
      console.error("Ошибка при отклонении изменения:", err);
      setError("Не удалось отклонить изменение");
    }
  };

  // Функция для сравнения значений и определения, нужно ли выделять поле
  const isFieldDifferent = (
    _fieldName: string,
    newValue: unknown,
    oldValue: unknown
  ): boolean => {
    if (oldValue === null || oldValue === undefined) return true;

    if (Array.isArray(newValue) && Array.isArray(oldValue)) {
      return (
        JSON.stringify(newValue.sort()) !== JSON.stringify(oldValue.sort())
      );
    }

    if (typeof newValue === "boolean" && typeof oldValue === "boolean") {
      return newValue !== oldValue;
    }

    return String(newValue || "") !== String(oldValue || "");
  };

  // Функция для получения CSS класса поля
  const getFieldClass = (
    fieldName: string,
    newValue: unknown,
    oldValue: unknown
  ): string => {
    if (isFieldDifferent(fieldName, newValue, oldValue)) {
      return styles.newField;
    }
    return "";
  };

  const renderCharacterComparison = () => {
    if (
      !change ||
      (change.changeType !== "NewCharacter" &&
        change.changeType !== "CharacterUpdate")
    )
      return null;

    const newChar = change.newData;
    const oldChar = originalData as CharacterData | null;

    if (!newChar) return null;

    return (
      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>
              <h5>
                Новые данные персонажа
                {oldChar && (
                  <Badge
                    bg="info"
                    className="ms-2"
                    style={{ fontSize: "0.7rem" }}
                  >
                    Сравнение
                  </Badge>
                )}
              </h5>
            </Card.Header>
            <Card.Body>
              <Table striped bordered>
                <tbody>
                  <tr>
                    <td>
                      <strong>Имя</strong>
                    </td>
                    <td
                      className={getFieldClass(
                        "name",
                        newChar.name,
                        oldChar?.name
                      )}
                    >
                      {newChar.name}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Описание</strong>
                    </td>
                    <td
                      className={getFieldClass(
                        "description",
                        newChar.description,
                        oldChar?.description
                      )}
                    >
                      {newChar.description || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Ссылка на изображение</strong>
                    </td>
                    <td
                      className={getFieldClass(
                        "linkToImage",
                        newChar.linkToImage,
                        oldChar?.linkToImage
                      )}
                    >
                      {newChar.linkToImage ? (
                        <a
                          href={newChar.linkToImage}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {newChar.linkToImage}
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>URL страницы</strong>
                    </td>
                    <td
                      className={getFieldClass(
                        "pageUrl",
                        newChar.pageUrl,
                        oldChar?.pageUrl
                      )}
                    >
                      {newChar.pageUrl ? (
                        <a
                          href={newChar.pageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {newChar.pageUrl}
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Сильные стороны</strong>
                    </td>
                    <td
                      className={getFieldClass(
                        "strengths",
                        newChar.strengths,
                        oldChar?.strengths
                      )}
                    >
                      {newChar.strengths && newChar.strengths.length > 0 ? (
                        <div>
                          {newChar.strengths.map(
                            (strength: string, index: number) => (
                              <Badge key={index} bg="success" className="me-1">
                                {strength}
                              </Badge>
                            )
                          )}
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Слабые стороны</strong>
                    </td>
                    <td
                      className={getFieldClass(
                        "weaknesess",
                        newChar.weaknesess,
                        oldChar?.weaknesess
                      )}
                    >
                      {newChar.weaknesess && newChar.weaknesess.length > 0 ? (
                        <div>
                          {newChar.weaknesess.map(
                            (weakness: string, index: number) => (
                              <Badge key={index} bg="danger" className="me-1">
                                {weakness}
                              </Badge>
                            )
                          )}
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>
              <h5>
                Оригинальные данные
                {oldChar && (
                  <Badge
                    bg="secondary"
                    className="ms-2"
                    style={{ fontSize: "0.7rem" }}
                  >
                    Текущие
                  </Badge>
                )}
              </h5>
            </Card.Header>
            <Card.Body>
              {oldChar ? (
                <Table striped bordered>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Имя</strong>
                      </td>
                      <td>{oldChar.name}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Описание</strong>
                      </td>
                      <td>{oldChar.description || "-"}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Ссылка на изображение</strong>
                      </td>
                      <td>
                        {oldChar.linkToImage ? (
                          <a
                            href={oldChar.linkToImage}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {oldChar.linkToImage}
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>URL страницы</strong>
                      </td>
                      <td>
                        {oldChar.pageUrl ? (
                          <a
                            href={oldChar.pageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {oldChar.pageUrl}
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Сильные стороны</strong>
                      </td>
                      <td>
                        {oldChar.strengths && oldChar.strengths.length > 0 ? (
                          <div>
                            {oldChar.strengths.map(
                              (strength: string, index: number) => (
                                <Badge
                                  key={index}
                                  bg="success"
                                  className="me-1"
                                >
                                  {strength}
                                </Badge>
                              )
                            )}
                          </div>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Слабые стороны</strong>
                      </td>
                      <td>
                        {oldChar.weaknesess && oldChar.weaknesess.length > 0 ? (
                          <div>
                            {oldChar.weaknesess.map(
                              (weakness: string, index: number) => (
                                <Badge key={index} bg="danger" className="me-1">
                                  {weakness}
                                </Badge>
                              )
                            )}
                          </div>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              ) : (
                <div className="text-center text-muted">
                  <p>Персонаж новый, оригинальных данных нет</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  };

  const renderMoveComparison = () => {
    if (
      !change ||
      (change.changeType !== "NewMove" &&
        change.changeType !== "MoveUpdate" &&
        change.changeType !== "MoveRemoval")
    )
      return null;

    const newMove = change.newData;
    const oldMove = originalData as Move;
    const existingMoves = Array.isArray(originalData) ? originalData : [];

    if (!newMove) return null;

    return (
      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>
              <h5>
                {change.changeType === "NewMove"
                  ? "Новые данные удара"
                  : change.changeType === "MoveUpdate"
                    ? "Обновленные данные удара"
                    : "Удаляемый удар"}
                {oldMove && (
                  <Badge
                    bg="info"
                    className="ms-2"
                    style={{ fontSize: "0.7rem" }}
                  >
                    Сравнение
                  </Badge>
                )}
              </h5>
            </Card.Header>
            <Card.Body>
              <Table striped bordered>
                <tbody>
                  <tr>
                    <td>
                      <strong>Команда</strong>
                    </td>
                    <td
                      className={getFieldClass(
                        "command",
                        newMove.command,
                        oldMove?.command
                      )}
                    >
                      <code>{newMove.command}</code>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Стойка</strong>
                    </td>
                    <td
                      className={getFieldClass(
                        "stance",
                        `${newMove.stanceCode}-${newMove.stanceName}`,
                        oldMove
                          ? `${oldMove.stanceCode}-${oldMove.stanceName}`
                          : null
                      )}
                    >
                      {newMove.stanceCode} - {newMove.stanceName}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Уровень попадания</strong>
                    </td>
                    <td
                      className={getFieldClass(
                        "hitLevel",
                        newMove.hitLevel,
                        oldMove?.hitLevel
                      )}
                    >
                      {newMove.hitLevel || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Урон</strong>
                    </td>
                    <td
                      className={getFieldClass(
                        "damage",
                        newMove.damage,
                        oldMove?.damage
                      )}
                    >
                      {newMove.damage || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Стартовые кадры</strong>
                    </td>
                    <td
                      className={getFieldClass(
                        "startUpFrame",
                        newMove.startUpFrame,
                        oldMove?.startUpFrame
                      )}
                    >
                      {newMove.startUpFrame || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Кадры при блоке</strong>
                    </td>
                    <td
                      className={getFieldClass(
                        "blockFrame",
                        newMove.blockFrame,
                        oldMove?.blockFrame
                      )}
                    >
                      {newMove.blockFrame || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Кадры при попадании</strong>
                    </td>
                    <td
                      className={getFieldClass(
                        "hitFrame",
                        newMove.hitFrame,
                        oldMove?.hitFrame
                      )}
                    >
                      {newMove.hitFrame || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Кадры при контр-ударе</strong>
                    </td>
                    <td
                      className={getFieldClass(
                        "counterHitFrame",
                        newMove.counterHitFrame,
                        oldMove?.counterHitFrame
                      )}
                    >
                      {newMove.counterHitFrame || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Особенности</strong>
                    </td>
                    <td
                      className={getFieldClass(
                        "features",
                        {
                          heatEngage: newMove.heatEngage,
                          heatSmash: newMove.heatSmash,
                          powerCrush: newMove.powerCrush,
                          throw: newMove.throw,
                          homing: newMove.homing,
                          tornado: newMove.tornado,
                          heatBurst: newMove.heatBurst,
                          requiresHeat: newMove.requiresHeat,
                        },
                        oldMove
                          ? {
                              heatEngage: oldMove.heatEngage,
                              heatSmash: oldMove.heatSmash,
                              powerCrush: oldMove.powerCrush,
                              throw: oldMove.throw,
                              homing: oldMove.homing,
                              tornado: oldMove.tornado,
                              heatBurst: oldMove.heatBurst,
                              requiresHeat: oldMove.requiresHeat,
                            }
                          : null
                      )}
                    >
                      <div className={styles.moveBadges}>
                        {newMove.heatEngage && (
                          <Badge bg="warning" className="me-1">
                            Heat Engage
                          </Badge>
                        )}
                        {newMove.heatSmash && (
                          <Badge bg="danger" className="me-1">
                            Heat Smash
                          </Badge>
                        )}
                        {newMove.powerCrush && (
                          <Badge bg="info" className="me-1">
                            Power Crush
                          </Badge>
                        )}
                        {newMove.throw && (
                          <Badge bg="secondary" className="me-1">
                            Throw
                          </Badge>
                        )}
                        {newMove.homing && (
                          <Badge bg="primary" className="me-1">
                            Homing
                          </Badge>
                        )}
                        {newMove.tornado && (
                          <Badge bg="success" className="me-1">
                            Tornado
                          </Badge>
                        )}
                        {newMove.heatBurst && (
                          <Badge bg="dark" className="me-1">
                            Heat Burst
                          </Badge>
                        )}
                        {newMove.requiresHeat && (
                          <Badge bg="warning" className="me-1">
                            Requires Heat
                          </Badge>
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Заметки</strong>
                    </td>
                    <td
                      className={getFieldClass(
                        "notes",
                        newMove.notes,
                        oldMove?.notes
                      )}
                    >
                      {renderNotes(newMove.notes)}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>
              <h5>
                {change.changeType === "NewMove"
                  ? "Существующие удары персонажа"
                  : change.changeType === "MoveUpdate"
                    ? "Оригинальные данные удара"
                    : "Удаляемый удар"}
                {change.changeType === "NewMove" && (
                  <small className="text-muted">
                    {existingMoves.length} ударов
                  </small>
                )}
                {(change.changeType === "MoveUpdate" ||
                  change.changeType === "MoveRemoval") &&
                  oldMove && (
                    <Badge
                      bg="secondary"
                      className="ms-2"
                      style={{ fontSize: "0.7rem" }}
                    >
                      Текущие
                    </Badge>
                  )}
              </h5>
            </Card.Header>
            <Card.Body>
              {change.changeType === "MoveUpdate" && oldMove ? (
                <Table striped bordered>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Команда</strong>
                      </td>
                      <td>
                        <code>{oldMove.command}</code>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Стойка</strong>
                      </td>
                      <td>
                        {oldMove.stanceCode} - {oldMove.stanceName}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Уровень попадания</strong>
                      </td>
                      <td>{oldMove.hitLevel || "-"}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Урон</strong>
                      </td>
                      <td>{oldMove.damage || "-"}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Стартовые кадры</strong>
                      </td>
                      <td>{oldMove.startUpFrame || "-"}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Кадры при блоке</strong>
                      </td>
                      <td>{oldMove.blockFrame || "-"}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Кадры при попадании</strong>
                      </td>
                      <td>{oldMove.hitFrame || "-"}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Кадры при контр-ударе</strong>
                      </td>
                      <td>{oldMove.counterHitFrame || "-"}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Особенности</strong>
                      </td>
                      <td>
                        <div className={styles.moveBadges}>
                          {oldMove.heatEngage && (
                            <Badge bg="warning" className="me-1">
                              Heat Engage
                            </Badge>
                          )}
                          {oldMove.heatSmash && (
                            <Badge bg="danger" className="me-1">
                              Heat Smash
                            </Badge>
                          )}
                          {oldMove.powerCrush && (
                            <Badge bg="info" className="me-1">
                              Power Crush
                            </Badge>
                          )}
                          {oldMove.throw && (
                            <Badge bg="secondary" className="me-1">
                              Throw
                            </Badge>
                          )}
                          {oldMove.homing && (
                            <Badge bg="primary" className="me-1">
                              Homing
                            </Badge>
                          )}
                          {oldMove.tornado && (
                            <Badge bg="success" className="me-1">
                              Tornado
                            </Badge>
                          )}
                          {oldMove.heatBurst && (
                            <Badge bg="dark" className="me-1">
                              Heat Burst
                            </Badge>
                          )}
                          {oldMove.requiresHeat && (
                            <Badge bg="warning" className="me-1">
                              Requires Heat
                            </Badge>
                          )}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Заметки</strong>
                      </td>
                      <td>{renderNotes(oldMove.notes)}</td>
                    </tr>
                  </tbody>
                </Table>
              ) : change.changeType === "MoveRemoval" && oldMove ? (
                <Table striped bordered>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Команда</strong>
                      </td>
                      <td>
                        <code>{oldMove.command}</code>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Стойка</strong>
                      </td>
                      <td>
                        {oldMove.stanceCode} - {oldMove.stanceName}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Уровень попадания</strong>
                      </td>
                      <td>{oldMove.hitLevel || "-"}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Урон</strong>
                      </td>
                      <td>{oldMove.damage || "-"}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Стартовые кадры</strong>
                      </td>
                      <td>{oldMove.startUpFrame || "-"}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Кадры при блоке</strong>
                      </td>
                      <td>{oldMove.blockFrame || "-"}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Кадры при попадании</strong>
                      </td>
                      <td>{oldMove.hitFrame || "-"}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Кадры при контр-ударе</strong>
                      </td>
                      <td>{oldMove.counterHitFrame || "-"}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Особенности</strong>
                      </td>
                      <td>
                        <div className={styles.moveBadges}>
                          {oldMove.heatEngage && (
                            <Badge bg="warning" className="me-1">
                              Heat Engage
                            </Badge>
                          )}
                          {oldMove.heatSmash && (
                            <Badge bg="danger" className="me-1">
                              Heat Smash
                            </Badge>
                          )}
                          {oldMove.powerCrush && (
                            <Badge bg="info" className="me-1">
                              Power Crush
                            </Badge>
                          )}
                          {oldMove.throw && (
                            <Badge bg="secondary" className="me-1">
                              Throw
                            </Badge>
                          )}
                          {oldMove.homing && (
                            <Badge bg="primary" className="me-1">
                              Homing
                            </Badge>
                          )}
                          {oldMove.tornado && (
                            <Badge bg="success" className="me-1">
                              Tornado
                            </Badge>
                          )}
                          {oldMove.heatBurst && (
                            <Badge bg="dark" className="me-1">
                              Heat Burst
                            </Badge>
                          )}
                          {oldMove.requiresHeat && (
                            <Badge bg="warning" className="me-1">
                              Requires Heat
                            </Badge>
                          )}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Заметки</strong>
                      </td>
                      <td>{renderNotes(oldMove.notes)}</td>
                    </tr>
                  </tbody>
                </Table>
              ) : change.changeType === "NewMove" ? (
                existingMoves.length > 0 ? (
                  <div className={styles.existingMovesList}>
                    {existingMoves
                      .slice(0, 10)
                      .map((move: Move, index: number) => (
                        <div key={index} className={styles.existingMoveItem}>
                          <code>{move.command}</code>
                          <span className="text-muted ms-2">
                            {move.hitLevel || "-"} | {move.damage || "-"}
                          </span>
                        </div>
                      ))}
                    {existingMoves.length > 10 && (
                      <div className="text-muted text-center mt-2">
                        ... и еще {existingMoves.length - 10} ударов
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-muted text-center">
                    У персонажа пока нет ударов
                  </p>
                )
              ) : (
                <p className="text-muted text-center">
                  Оригинальные данные не найдены
                </p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  };

  if (!change) {
    return (
      <Container className={styles.framedataPage}>
        <Alert variant="danger">
          <Alert.Heading>Изменение не найдено</Alert.Heading>
          <p>Вернитесь к списку ожидающих изменений.</p>
          <Button onClick={() => navigate("/framedata/pending")}>
            Вернуться к списку
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className={styles.framedataPage}>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <Button
            variant="outline-secondary"
            onClick={() => navigate("/framedata/pending")}
            className="me-3"
          >
            ← Назад к списку
          </Button>
          <h2 className="mb-0 d-inline-block">
            Детали изменения: {change.characterName}
          </h2>
        </div>
        <div className="d-flex gap-2">
          <Button variant="success" onClick={handleApprove}>
            Принять
          </Button>
          <Button variant="danger" onClick={handleReject}>
            Отклонить
          </Button>
        </div>
      </div>

      <Card className="mb-4">
        <Card.Header>
          <h5>Информация об изменении</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <p>
                <strong>Тип изменения:</strong>
                <Badge bg="primary" className="ms-2">
                  {change.changeType}
                </Badge>
              </p>
              <p>
                <strong>Персонаж:</strong> {change.characterName}
              </p>
              <p>
                <strong>Описание:</strong> {change.description}
              </p>
            </Col>
            <Col md={6}>
              <p>
                <strong>Статус:</strong>
                <Badge bg="warning" className="ms-2">
                  {change.status}
                </Badge>
              </p>
              <p>
                <strong>Обнаружено:</strong>{" "}
                {new Date(change.detectedAt).toLocaleString("ru-RU")}
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {error && (
        <Alert variant="danger" className="mb-3">
          <Alert.Heading>Ошибка</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}

      {isLoading ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {renderCharacterComparison()}
          {renderMoveComparison()}
        </>
      )}
    </Container>
  );
};

export default ChangeDetailsPage;
