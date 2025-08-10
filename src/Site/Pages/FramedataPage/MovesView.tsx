import { useMemo, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Form,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";

import { TekkenCharacter } from "@/shared/api/data-contracts";

import styles from "./FramedataPage.module.scss";
import { getCharacterImage, handleImageError } from "./imageUtils";

interface MovesViewProps {
  character: TekkenCharacter;
  onBack: () => void;
  isLoading?: boolean;
}

const MovesView: React.FC<MovesViewProps> = ({
  character,
  onBack,
  isLoading = false,
}) => {
  const charName =
    character.name.charAt(0).toUpperCase() + character.name.slice(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [stanceFilter, setStanceFilter] = useState("");
  const [showHeatOnly, setShowHeatOnly] = useState(false);
  const [showPowerCrushOnly, setShowPowerCrushOnly] = useState(false);
  const [showThrow, setShowThrow] = useState(false);
  const [showHoming, setShowHomings] = useState(false);
  const [showTornado, setShowTornado] = useState(false);

  const filteredMoves = useMemo(() => {
    if (!character.movelist) return [];

    return character.movelist.filter(move => {
      const matchesSearch =
        move.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (move.notes &&
          move.notes.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStance = !stanceFilter || move.stanceCode === stanceFilter;

      const matchesHeat =
        !showHeatOnly || move.heatEngage || move.heatSmash || move.heatBurst;

      const matchesPowerCrush = !showPowerCrushOnly || move.powerCrush;

      const matchesThrow = !showThrow || move.throw;

      const matchesHoming = !showHoming || move.homing;

      const matchesTornado = !showTornado || move.tornado;

      return (
        matchesSearch &&
        matchesStance &&
        matchesHeat &&
        matchesPowerCrush &&
        matchesThrow &&
        matchesHoming &&
        matchesTornado
      );
    });
  }, [
    character.movelist,
    searchTerm,
    stanceFilter,
    showHeatOnly,
    showPowerCrushOnly,
    showThrow,
    showHoming,
    showTornado,
  ]);

  const uniqueStances = useMemo(() => {
    if (!character.movelist) return [];
    return [...new Set(character.movelist.map(move => move.stanceCode))].sort();
  }, [character.movelist]);

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Загрузка ударов...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className={styles.movesView}>
      <div className="d-flex align-items-center mb-4">
        <Button variant="outline-secondary" onClick={onBack} className="me-3">
          ← Назад к персонажу
        </Button>
        <div className="d-flex align-items-center">
          <img
            src={getCharacterImage(character, "150x200")}
            alt={charName}
            className={styles.characterThumbnail}
            onError={e => handleImageError(e, charName, "150x200")}
          />
          <h2 className="mb-0 ms-3">{charName} - Удары</h2>
        </div>
      </div>

      <Card className="mb-4">
        <Card.Header className="justify-items-center">
          <h5>Фильтры</h5>
        </Card.Header>
        <Card.Body>
          <Row className="flex-md-column align-items-center align-content-center">
            <Col md={6} className="w-75">
              <Form.Group className="mb-3">
                <Form.Label>Поиск по команде или заметкам</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите команду или заметку..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={3} className="w-75">
              <Form.Group className="mb-3">
                <Form.Label>Стойка</Form.Label>
                <Form.Select
                  value={stanceFilter}
                  onChange={e => setStanceFilter(e.target.value)}
                >
                  <option value="">Все стойки</option>
                  {uniqueStances.map(stance => (
                    <option key={stance} value={stance}>
                      {stance}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3} className="w-75">
              <Form.Group className="mb-3">
                <Form.Label>Фильтры</Form.Label>
                <div className="d-flex">
                  <Form.Check
                    type="checkbox"
                    label="Только Heat удары"
                    checked={showHeatOnly}
                    onChange={e => setShowHeatOnly(e.target.checked)}
                    className="mb-2"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Только Power Crush"
                    checked={showPowerCrushOnly}
                    onChange={e => setShowPowerCrushOnly(e.target.checked)}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Только Throw"
                    checked={showThrow}
                    onChange={e => setShowThrow(e.target.checked)}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Только Homings"
                    checked={showHoming}
                    onChange={e => setShowHomings(e.target.checked)}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Только Homings"
                    checked={showHoming}
                    onChange={e => setShowHomings(e.target.checked)}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Только Tornado"
                    checked={showTornado}
                    onChange={e => setShowTornado(e.target.checked)}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {filteredMoves.length === 0 ? (
        <Alert variant="info">
          <Alert.Heading>Удары не найдены</Alert.Heading>
          <p>Попробуйте изменить фильтры поиска.</p>
        </Alert>
      ) : (
        <div className={styles.movesTableContainer}>
          <Table responsive striped hover className={styles.movesTable}>
            <thead>
              <tr>
                <th>Команда</th>
                <th>Уровень удара</th>
                <th>Урон</th>
                <th>Старт</th>
                <th>Блок</th>
                <th>Попадание</th>
                <th>Контр-удар</th>
                <th>Особенности</th>
                <th>Заметки</th>
              </tr>
            </thead>
            <tbody>
              {filteredMoves.map((move, index) => (
                <tr key={`${move.command}-${index}`}>
                  <td className={styles.commandCell}>
                    <code>{move.command}</code>
                  </td>
                  <td>{move.hitLevel || "-"}</td>
                  <td>{move.damage || "-"}</td>
                  <td>{move.startUpFrame || "-"}</td>
                  <td>{move.blockFrame || "-"}</td>
                  <td>{move.hitFrame || "-"}</td>
                  <td>{move.counterHitFrame || "-"}</td>
                  <td>
                    <div className={styles.moveBadges}>
                      {move.heatEngage && (
                        <Badge bg="warning" className="me-1 text-wrap">
                          Heat Engage
                        </Badge>
                      )}
                      {move.heatSmash && (
                        <Badge bg="danger" className="me-1 text-wrap">
                          Heat Smash
                        </Badge>
                      )}
                      {move.powerCrush && (
                        <Badge bg="info" className="me-1 text-wrap">
                          Power Crush
                        </Badge>
                      )}
                      {move.throw && (
                        <Badge bg="secondary" className="me-1 text-wrap">
                          Throw
                        </Badge>
                      )}
                      {move.homing && (
                        <Badge bg="primary" className="me-1 text-wrap">
                          Homing
                        </Badge>
                      )}
                      {move.tornado && (
                        <Badge bg="success" className="me-1 text-wrap">
                          Tornado
                        </Badge>
                      )}
                      {move.heatBurst && (
                        <Badge bg="dark" className="me-1 text-wrap">
                          Heat Burst
                        </Badge>
                      )}
                      {move.requiresHeat && (
                        <Badge bg="warning" className="me-1 text-wrap">
                          Requires Heat
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className={styles.notesCell}>{move.notes || "-"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      <div className="mt-3">
        <small className="text-muted">
          Найдено ударов: {filteredMoves.length} из{" "}
          {character.movelist?.length || 0}
        </small>
      </div>
    </div>
  );
};

export default MovesView;
