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

import { TekkenCharacter } from "@/shared/api/types/data-contracts";

import styles from "../../FramedataPage.module.scss";
import {
  getCharacterAvatar,
  getCharacterFullBody,
  handleImageError,
} from "../Shared/imageUtils";

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
  const [showHoming, setShowHoming] = useState(false);
  const [showTornado, setShowTornado] = useState(false);

  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    {
      command: true,
      hitLevel: true,
      damage: true,
      startUpFrame: true,
      blockFrame: true,
      hitFrame: true,
      counterHitFrame: true,
      features: true,
      notes: true,
    }
  );

  const filteredMoves = useMemo(() => {
    if (!character.movelist) return [];

    return character.movelist.filter(move => {
      const matchesSearch =
        move.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (move.notes &&
          move.notes
            ?.join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()));

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
      {/* Full-body background image */}
      <div className={styles.fullBodyBackground}>
        <img
          src={getCharacterFullBody(character, "800x1200")}
          alt={`${charName} full body`}
          className={styles.fullBodyImage}
          onError={e => handleImageError(e, charName, "800x1200")}
        />
      </div>

      <div className={styles.movesContent}>
        <div className="d-flex align-items-center mb-4">
          <Button variant="outline-secondary" onClick={onBack} className="me-3">
            ← Назад к персонажу
          </Button>
          <div className="d-flex align-items-center">
            <img
              src={getCharacterAvatar(character, "150x200")}
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
            <Row>
              <Col lg={6} md={12} className="mb-3">
                <Form.Group>
                  <Form.Label>Поиск по команде или заметкам</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Введите команду или заметку..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={3} md={6} className="mb-3">
                <Form.Group>
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
              <Col lg={3} md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Фильтры</Form.Label>
                  <div className="d-flex flex-wrap gap-2">
                    <Form.Check
                      type="checkbox"
                      label="Heat удары"
                      checked={showHeatOnly}
                      onChange={e => setShowHeatOnly(e.target.checked)}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Power Crush"
                      checked={showPowerCrushOnly}
                      onChange={e => setShowPowerCrushOnly(e.target.checked)}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Throw"
                      checked={showThrow}
                      onChange={e => setShowThrow(e.target.checked)}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Homing"
                      checked={showHoming}
                      onChange={e => setShowHoming(e.target.checked)}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Tornado"
                      checked={showTornado}
                      onChange={e => setShowTornado(e.target.checked)}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col lg={12} md={12} className="mb-3">
                <Form.Group>
                  <Form.Label>Видимые столбцы</Form.Label>
                  <div className="d-flex flex-wrap gap-2">
                    {Object.keys(visibleColumns).map(columnKey => (
                      <Form.Check
                        key={columnKey}
                        type="checkbox"
                        label={(() => {
                          switch (columnKey) {
                            case "command":
                              return "Команда";
                            case "hitLevel":
                              return "Уровень";
                            case "damage":
                              return "Урон";
                            case "startUpFrame":
                              return "Старт";
                            case "blockFrame":
                              return "Блок";
                            case "hitFrame":
                              return "Попадание";
                            case "counterHitFrame":
                              return "Контр-удар";
                            case "features":
                              return "Особенности";
                            case "notes":
                              return "Заметки";
                            default:
                              return columnKey;
                          }
                        })()}
                        checked={visibleColumns[columnKey]}
                        onChange={() =>
                          setVisibleColumns(prev => ({
                            ...prev,
                            [columnKey]: !prev[columnKey],
                          }))
                        }
                      />
                    ))}
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
            <Table
              responsive="lg"
              striped
              hover
              className={styles.compactMovesTable}
            >
              <thead>
                <tr>
                  {visibleColumns.command && <th>Команда</th>}
                  {visibleColumns.hitLevel && <th>Уровень</th>}
                  {visibleColumns.damage && <th>Урон</th>}
                  {visibleColumns.startUpFrame && <th>Старт</th>}
                  {visibleColumns.blockFrame && <th>Блок</th>}
                  {visibleColumns.hitFrame && <th>Попадание</th>}
                  {visibleColumns.counterHitFrame && <th>Контр-удар</th>}
                  {visibleColumns.features && <th>Особенности</th>}
                  {visibleColumns.notes && <th>Заметки</th>}
                </tr>
              </thead>
              <tbody>
                {filteredMoves.map((move, index) => (
                  <tr key={`${move.command}-${index}`}>
                    {visibleColumns.command && (
                      <td className={styles.commandCell}>
                        <code>{move.command}</code>
                      </td>
                    )}
                    {visibleColumns.hitLevel && (
                      <td className={styles.numericCell}>
                        {move.hitLevel || "-"}
                      </td>
                    )}
                    {visibleColumns.damage && (
                      <td
                        className={`${styles.numericCell} ${styles.damageCell}`}
                      >
                        {move.damage || "-"}
                      </td>
                    )}
                    {visibleColumns.startUpFrame && (
                      <td
                        className={`${styles.numericCell} ${styles.frameCell}`}
                      >
                        {move.startUpFrame || "-"}
                      </td>
                    )}
                    {visibleColumns.blockFrame && (
                      <td
                        className={`${styles.numericCell} ${styles.frameCell}`}
                      >
                        {move.blockFrame || "-"}
                      </td>
                    )}
                    {visibleColumns.hitFrame && (
                      <td
                        className={`${styles.numericCell} ${styles.frameCell}`}
                      >
                        {move.hitFrame || "-"}
                      </td>
                    )}
                    {visibleColumns.counterHitFrame && (
                      <td
                        className={`${styles.numericCell} ${styles.frameCell}`}
                      >
                        {move.counterHitFrame || "-"}
                      </td>
                    )}
                    {visibleColumns.features && (
                      <td className={styles.featuresCell}>
                        <div className={styles.compactMoveBadges}>
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
                    )}
                    {visibleColumns.notes && (
                      <td className={styles.notesCell}>
                        {move.notes && move.notes.length > 0 ? (
                          <div className={styles.notesContainer}>
                            {move.notes.map((note, noteIndex) => (
                              <div key={noteIndex} className={styles.noteItem}>
                                <span className={styles.noteNumber}>
                                  #{noteIndex + 1}
                                </span>
                                <span className={styles.noteText}>{note}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          "-"
                        )}
                      </td>
                    )}
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
    </div>
  );
};

export default MovesView;
