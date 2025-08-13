import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

import { defaultApiConfig, Framedata, FramedataChanges } from "@/shared/api";
import { Move } from "@/shared/api/data-contracts";

import styles from "./FramedataPage.module.scss";

const api = new FramedataChanges({ baseURL: defaultApiConfig.baseURL });
const framedataApi = new Framedata({ baseURL: defaultApiConfig.baseURL });

interface ChangeDetailsPageProps {
  change?: any;
}

const ChangeDetailsPage: React.FC<ChangeDetailsPageProps> = ({ change: propChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [change] = useState<any>(propChange || location.state?.change);
  const [originalData, setOriginalData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!change) {
      setError("Изменение не найдено");
      return;
    }

    loadOriginalData();
  }, [change]);

  const loadOriginalData = async () => {
    if (!change) return;

    setIsLoading(true);
    setError("");

    try {
      if (change.changeType === "NewCharacter") {
        // Для нового персонажа нет оригинальных данных
        setOriginalData(null);
      } else if (change.changeType === "NewMove") {
        // Для нового удара загружаем существующие удары персонажа
        const response = await framedataApi.framedataCharactersMovesList(change.characterName);
        const existingMoves = response.data || [];
        setOriginalData(existingMoves);
      } else if (change.changeType === "MoveUpdate") {
        // Для обновления удара загружаем оригинальный удар
        const response = await framedataApi.framedataCharactersMovesList(change.characterName);
        const existingMoves = response.data || [];
        const originalMove = existingMoves.find((m: Move) => m.command === change.newData.command);
        setOriginalData(originalMove);
      }
    } catch (err) {
      console.error("Ошибка загрузки оригинальных данных:", err);
      setError("Не удалось загрузить оригинальные данные");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async () => {
    try {
      if (change.changeType === "NewCharacter") {
        await api.framedataChangesApproveCharacterCreate(change.characterName);
      } else if (change.changeType === "NewMove") {
        await api.framedataChangesApproveMoveCreate(change.characterName, change.id);
      }
      navigate("/framedata/pending");
    } catch (err) {
      console.error("Ошибка при принятии изменения:", err);
      setError("Не удалось принять изменение");
    }
  };

  const handleReject = async () => {
    try {
      if (change.changeType === "NewCharacter") {
        await api.framedataChangesRejectCharacterCreate(change.characterName);
      } else if (change.changeType === "NewMove") {
        await api.framedataChangesRejectMoveCreate(change.characterName, change.id);
      }
      navigate("/framedata/pending");
    } catch (err) {
      console.error("Ошибка при отклонении изменения:", err);
      setError("Не удалось отклонить изменение");
    }
  };

  const renderCharacterComparison = () => {
    if (change.changeType !== "NewCharacter") return null;

    const newChar = change.newData;
    
    return (
      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>
              <h5>Новые данные персонажа</h5>
            </Card.Header>
            <Card.Body>
              <Table striped bordered>
                <tbody>
                  <tr>
                    <td><strong>Имя</strong></td>
                    <td className={styles.newField}>{newChar.name}</td>
                  </tr>
                  <tr>
                    <td><strong>Описание</strong></td>
                    <td className={styles.newField}>{newChar.description || "-"}</td>
                  </tr>
                  <tr>
                    <td><strong>Ссылка на изображение</strong></td>
                    <td className={styles.newField}>
                      {newChar.linkToImage ? (
                        <a href={newChar.linkToImage} target="_blank" rel="noopener noreferrer">
                          {newChar.linkToImage}
                        </a>
                      ) : "-"}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>URL страницы</strong></td>
                    <td className={styles.newField}>
                      {newChar.pageUrl ? (
                        <a href={newChar.pageUrl} target="_blank" rel="noopener noreferrer">
                          {newChar.pageUrl}
                        </a>
                      ) : "-"}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Сильные стороны</strong></td>
                    <td className={styles.newField}>
                      {newChar.strengths && newChar.strengths.length > 0 ? (
                        <div>
                          {newChar.strengths.map((strength: string, index: number) => (
                            <Badge key={index} bg="success" className="me-1">
                              {strength}
                            </Badge>
                          ))}
                        </div>
                      ) : "-"}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Слабые стороны</strong></td>
                    <td className={styles.newField}>
                      {newChar.weaknesess && newChar.weaknesess.length > 0 ? (
                        <div>
                          {newChar.weaknesess.map((weakness: string, index: number) => (
                            <Badge key={index} bg="danger" className="me-1">
                              {weakness}
                            </Badge>
                          ))}
                        </div>
                      ) : "-"}
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
              <h5>Оригинальные данные</h5>
            </Card.Header>
            <Card.Body className="text-center text-muted">
              <p>Персонаж новый, оригинальных данных нет</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  };

  const renderMoveComparison = () => {
    if (change.changeType !== "NewMove") return null;

    const newMove = change.newData;
    const existingMoves = originalData || [];
    
    return (
      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>
              <h5>Новый удар</h5>
            </Card.Header>
            <Card.Body>
              <Table striped bordered>
                <tbody>
                  <tr>
                    <td><strong>Команда</strong></td>
                    <td className={styles.newField}>
                      <code>{newMove.command}</code>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Стойка</strong></td>
                    <td className={styles.newField}>{newMove.stanceCode} - {newMove.stanceName}</td>
                  </tr>
                  <tr>
                    <td><strong>Уровень попадания</strong></td>
                    <td className={styles.newField}>{newMove.hitLevel || "-"}</td>
                  </tr>
                  <tr>
                    <td><strong>Урон</strong></td>
                    <td className={styles.newField}>{newMove.damage || "-"}</td>
                  </tr>
                  <tr>
                    <td><strong>Стартовые кадры</strong></td>
                    <td className={styles.newField}>{newMove.startUpFrame || "-"}</td>
                  </tr>
                  <tr>
                    <td><strong>Кадры при блоке</strong></td>
                    <td className={styles.newField}>{newMove.blockFrame || "-"}</td>
                  </tr>
                  <tr>
                    <td><strong>Кадры при попадании</strong></td>
                    <td className={styles.newField}>{newMove.hitFrame || "-"}</td>
                  </tr>
                  <tr>
                    <td><strong>Кадры при контр-ударе</strong></td>
                    <td className={styles.newField}>{newMove.counterHitFrame || "-"}</td>
                  </tr>
                  <tr>
                    <td><strong>Особенности</strong></td>
                    <td className={styles.newField}>
                      <div className={styles.moveBadges}>
                        {newMove.heatEngage && <Badge bg="warning" className="me-1">Heat Engage</Badge>}
                        {newMove.heatSmash && <Badge bg="danger" className="me-1">Heat Smash</Badge>}
                        {newMove.powerCrush && <Badge bg="info" className="me-1">Power Crush</Badge>}
                        {newMove.throw && <Badge bg="secondary" className="me-1">Throw</Badge>}
                        {newMove.homing && <Badge bg="primary" className="me-1">Homing</Badge>}
                        {newMove.tornado && <Badge bg="success" className="me-1">Tornado</Badge>}
                        {newMove.heatBurst && <Badge bg="dark" className="me-1">Heat Burst</Badge>}
                        {newMove.requiresHeat && <Badge bg="warning" className="me-1">Requires Heat</Badge>}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Заметки</strong></td>
                    <td className={styles.newField}>
                      {newMove.notes && newMove.notes.length > 0 ? (
                        <div>
                          {newMove.notes.map((note: string, index: number) => (
                            <div key={index}>{note}</div>
                          ))}
                        </div>
                      ) : "-"}
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
              <h5>Существующие удары персонажа</h5>
              <small className="text-muted">
                {existingMoves.length} ударов
              </small>
            </Card.Header>
            <Card.Body>
              {existingMoves.length > 0 ? (
                <div className={styles.existingMovesList}>
                  {existingMoves.slice(0, 10).map((move: Move, index: number) => (
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
                <p className="text-muted text-center">У персонажа пока нет ударов</p>
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
          <Button variant="outline-secondary" onClick={() => navigate("/framedata/pending")} className="me-3">
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
              <p><strong>Тип изменения:</strong> 
                <Badge bg="primary" className="ms-2">{change.changeType}</Badge>
              </p>
              <p><strong>Персонаж:</strong> {change.characterName}</p>
              <p><strong>Описание:</strong> {change.description}</p>
            </Col>
            <Col md={6}>
              <p><strong>Статус:</strong> 
                <Badge bg="warning" className="ms-2">{change.status}</Badge>
              </p>
              <p><strong>Обнаружено:</strong> {new Date(change.detectedAt).toLocaleString("ru-RU")}</p>
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
