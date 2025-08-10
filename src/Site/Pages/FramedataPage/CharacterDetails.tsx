import { Badge, Button, Card, Col, Row } from "react-bootstrap";

import { TekkenCharacter } from "@/shared/api/data-contracts";

import styles from "./FramedataPage.module.scss";
import { getCharacterAvatar, handleImageError } from "./imageUtils";

interface CharacterDetailsProps {
  character: TekkenCharacter;
  onBack: () => void;
  onViewMoves: (character: TekkenCharacter) => void;
  onEditCharacter: (character: TekkenCharacter) => void;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({
  character,
  onBack,
  onViewMoves,
  onEditCharacter,
}) => {
  const charName =
    character.name.charAt(0).toUpperCase() + character.name.slice(1);

  return (
    <div className={styles.characterDetails}>
      <div className="d-flex align-items-center mb-4">
        <Button variant="outline-secondary" onClick={onBack} className="me-3">
          ← Назад к персонажам
        </Button>
        <h2 className="mb-0">{charName}</h2>
      </div>

      <Row>
        <Col md={4}>
          <Card className={styles.characterDetailCard}>
            <div className={styles.characterDetailImageContainer}>
              <Card.Img
                variant="top"
                src={getCharacterAvatar(character, "300x400")}
                alt={charName}
                className={styles.characterDetailImage}
                onError={e => handleImageError(e, charName, "300x400")}
              />
            </div>
            <Card.Body>
              <div className="d-flex gap-2">
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-fill"
                  onClick={() => onViewMoves(character)}
                >
                  Просмотреть удары
                </Button>
                <Button
                  variant="outline-warning"
                  size="lg"
                  onClick={() => onEditCharacter(character)}
                >
                  Изменить
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card>
            <Card.Header>
              <h4>Информация о персонаже</h4>
            </Card.Header>
            <Card.Body>
              {character.description && (
                <div className="mb-4">
                  <h5>Описание</h5>
                  <p>{character.description}</p>
                </div>
              )}

              <Row>
                <Col md={6}>
                  {character.strengths && character.strengths.length > 0 && (
                    <div className="mb-4">
                      <h5>Сильные стороны</h5>
                      <div>
                        {character.strengths.map((strength, index) => (
                          <Badge
                            key={index}
                            bg="success"
                            className="me-2 mb-2 text-wrap"
                          >
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </Col>

                <Col md={6}>
                  {character.weaknesess && character.weaknesess.length > 0 && (
                    <div className="mb-4">
                      <h5>Слабые стороны</h5>
                      <div>
                        {character.weaknesess.map((weakness, index) => (
                          <Badge
                            key={index}
                            bg="danger"
                            className="me-2 mb-2 text-wrap"
                          >
                            {weakness}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </Col>
              </Row>

              <div className="mt-4">
                <small className="text-muted">
                  Последнее обновление:{" "}
                  {new Date(character.lastUpdateTime).toLocaleDateString(
                    "ru-RU"
                  )}
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CharacterDetails;
