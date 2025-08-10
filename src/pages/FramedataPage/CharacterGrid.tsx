import { Alert, Card, Col, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

import { TekkenCharacter } from "@/shared/api/data-contracts";

import styles from "./FramedataPage.module.scss";
import { getCharacterImage, handleImageError } from "./imageUtils";

interface CharacterGridProps {
  characters: TekkenCharacter[];
  isLoading: boolean;
  error: string;
  onCharacterSelect: (character: TekkenCharacter) => void;
}

const CharacterGrid: React.FC<CharacterGridProps> = ({
  characters,
  isLoading,
  error,
  onCharacterSelect,
}) => {
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
    <div className={styles.characterGrid}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Персонажи Tekken</h2>
        <Link to="/framedata/pending" className="btn btn-warning">
          Ожидающие изменения
        </Link>
      </div>
      <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
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
                    src={getCharacterImage(character, "200x300")}
                    alt={charName}
                    className={styles.characterImage}
                    onError={e => handleImageError(e, charName, "200x300")}
                  />
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-center mb-2">
                    {charName}
                  </Card.Title>
                  {character.description && (
                    <Card.Text className="text-muted small flex-grow-1">
                      {character.description.length > 100
                        ? `${character.description.substring(0, 100)}...`
                        : character.description}
                    </Card.Text>
                  )}
                  <div className="mt-auto">
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
          );
        })}
      </Row>
    </div>
  );
};

export default CharacterGrid;
