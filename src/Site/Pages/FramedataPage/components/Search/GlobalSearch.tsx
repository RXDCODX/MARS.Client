import { useCallback, useEffect, useMemo, useState } from "react";
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

import { Framedata } from "@/shared/api";
import { Move, TekkenCharacter } from "@/shared/api/types/data-contracts";
import { useToastModal } from "@/shared/Utils/ToastModal";

import styles from "../../FramedataPage.module.scss";

interface GlobalSearchProps {
  characters: TekkenCharacter[];
}

interface SearchResult {
  character: TekkenCharacter;
  move: Move;
  relevanceScore: number;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ characters }) => {
  const BootstrapButton = Button as any;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string>("");
  const [hasSearched, setHasSearched] = useState(false);

  const api = useMemo(() => new Framedata(), []);
  const { showToast } = useToastModal();

  // Функция для парсинга поискового запроса
  const parseSearchQuery = (query: string) => {
    // Ищем первый не-алфавитный символ (включая пробел)
    const match = query.match(/^([a-zA-Z\s]+)([^a-zA-Z\s].*)$/);
    if (!match) return null;

    const characterQuery = match[1].trim();
    const moveQuery = match[2].trim();

    return {
      characterQuery,
      moveQuery,
    };
  };

  // Функция для поиска персонажа по имени
  const findCharacter = useCallback(
    (characterQuery: string): TekkenCharacter[] => {
      const query = characterQuery.toLowerCase();

      return characters.filter(character => {
        // Поиск по точному имени
        if (character.name.toLowerCase().includes(query)) {
          return true;
        }

        // Поиск по displayName
        if (character.displayName.toLowerCase().includes(query)) {
          return true;
        }

        return false;
      });
    },
    [characters]
  );

  // Функция для поиска ударов
  const searchMoves = useCallback(
    async (character: TekkenCharacter, moveQuery: string): Promise<Move[]> => {
      try {
        // Если у персонажа уже есть удары, используем их
        if (character.movelist && character.movelist.length > 0) {
          return character.movelist.filter(
            (move: Move) =>
              move.command.toLowerCase().includes(moveQuery.toLowerCase()) ||
              (move.notes &&
                move.notes.some((note: string) =>
                  note.toLowerCase().includes(moveQuery.toLowerCase())
                ))
          );
        }

        // Иначе загружаем удары с сервера
        const response = await api.framedataCharactersMovesList(character.name);
        const payload = response.data.data;
        return payload?.items ?? [];
      } catch (error) {
        console.error(`Ошибка загрузки ударов для ${character.name}:`, error);
        showToast({
          success: false,
          message: `Не удалось загрузить удары для ${character.name}`,
        });
        return [];
      }
    },
    [api, showToast]
  );

  // Функция для вычисления релевантности результата
  const calculateRelevanceScore = (
    characterQuery: string,
    moveQuery: string,
    character: TekkenCharacter,
    move: Move
  ): number => {
    let score = 0;

    // Бонус за точное совпадение имени персонажа
    if (character.name.toLowerCase() === characterQuery.toLowerCase()) {
      score += 100;
    } else if (
      character.name.toLowerCase().includes(characterQuery.toLowerCase())
    ) {
      score += 50;
    }

    // Бонус за точное совпадение команды удара
    if (move.command.toLowerCase() === moveQuery.toLowerCase()) {
      score += 100;
    } else if (move.command.toLowerCase().includes(moveQuery.toLowerCase())) {
      score += 50;
    }

    // Бонус за совпадение в заметках
    if (move.notes) {
      const noteMatch = move.notes.some((note: string) =>
        note.toLowerCase().includes(moveQuery.toLowerCase())
      );
      if (noteMatch) score += 25;
    }

    return score;
  };

  // Основная функция поиска
  const performSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    setError("");
    setHasSearched(true);

    try {
      const parsed = parseSearchQuery(searchQuery);
      if (!parsed) {
        setSearchResults([]);
        showToast({
          success: false,
          message:
            "Неверный формат поискового запроса. Используйте формат: 'имя_персонажа команда'",
        });
        return;
      }

      const { characterQuery, moveQuery } = parsed;

      // Ищем персонажей
      const foundCharacters = findCharacter(characterQuery);

      if (foundCharacters.length === 0) {
        setSearchResults([]);
        showToast({
          success: false,
          message: `Персонаж '${characterQuery}' не найден`,
        });
        return;
      }

      // Ищем удары для каждого найденного персонажа
      const allResults: SearchResult[] = [];

      for (const character of foundCharacters) {
        const moves = await searchMoves(character, moveQuery);

        for (const move of moves) {
          const relevanceScore = calculateRelevanceScore(
            characterQuery,
            moveQuery,
            character,
            move
          );

          allResults.push({
            character,
            move,
            relevanceScore,
          });
        }
      }

      // Сортируем по релевантности и берем топ-10
      const sortedResults = allResults
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, 10);

      setSearchResults(sortedResults);

      if (sortedResults.length > 0) {
        showToast({
          success: true,
          message: `Найдено ${sortedResults.length} результатов`,
        });
      } else {
        showToast({
          success: false,
          message: "По вашему запросу ничего не найдено",
        });
      }
    } catch (error) {
      console.error("Ошибка поиска:", error);
      const errorMessage = "Произошла ошибка при поиске";
      setError(errorMessage);
      showToast({ success: false, message: errorMessage });
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery, findCharacter, searchMoves, showToast]);

  // Автоматический поиск при изменении запроса
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        performSearch();
      } else {
        setSearchResults([]);
        setHasSearched(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, performSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch();
  };

  const handleClear = () => {
    setSearchQuery("");
    setSearchResults([]);
    setHasSearched(false);
    setError("");
  };

  return (
    <Card className="mb-4">
      <Card.Header>
        <h5 className="mb-0">🔍 Глобальный поиск по фреймдате</h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={8}>
              <Form.Group>
                <Form.Label>Поисковый запрос</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Например: kazuya df2 или heihachi 1,2"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="form-control-lg"
                />
                <Form.Text className="text-muted">
                  Введите имя персонажа, затем любой символ, затем команду удара
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={4} className="d-flex align-items-end">
              <div className="d-flex gap-2 w-100">
                <BootstrapButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="flex-fill"
                  disabled={isSearching || !searchQuery.trim()}
                >
                  {isSearching ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        className="me-2"
                      />
                      Поиск...
                    </>
                  ) : (
                    "Найти"
                  )}
                </BootstrapButton>
                <BootstrapButton
                  variant="outline-secondary"
                  size="lg"
                  onClick={handleClear}
                  disabled={!searchQuery.trim()}
                >
                  ✕
                </BootstrapButton>
              </div>
            </Col>
          </Row>
        </Form>

        {error && (
          <Alert variant="danger" className="mt-3">
            <Alert.Heading>Ошибка поиска</Alert.Heading>
            <p>{error}</p>
          </Alert>
        )}

        {hasSearched && !isSearching && (
          <div className="mt-3">
            {searchResults.length === 0 ? (
              <Alert variant="info">
                <Alert.Heading>Результаты не найдены</Alert.Heading>
                <p>
                  Попробуйте изменить поисковый запрос или проверить
                  правильность написания.
                </p>
              </Alert>
            ) : (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0">
                    Найдено результатов: {searchResults.length}
                  </h6>
                  <small className="text-muted">
                    Показано до 10 наиболее релевантных
                  </small>
                </div>

                <div className={styles.movesTableContainer}>
                  <Table
                    responsive="lg"
                    striped
                    hover
                    className={styles.compactMovesTable}
                  >
                    <thead>
                      <tr>
                        <th>Персонаж</th>
                        <th>Команда</th>
                        <th>Уровень</th>
                        <th>Урон</th>
                        <th>Старт</th>
                        <th>Блок</th>
                        <th>Попадание</th>
                        <th>Особенности</th>
                        <th>Заметки</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults.map((result, index) => (
                        <tr
                          key={`${result.character.name}-${result.move.command}-${index}`}
                        >
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={`/api/framedata/characters/${encodeURIComponent(result.character.name)}/avatar`}
                                alt={result.character.name}
                                className={styles.characterThumbnail}
                                style={{ width: "40px", height: "50px" }}
                                onError={e => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = `https://via.placeholder.com/40x50/cccccc/666666?text=${encodeURIComponent(result.character.name.charAt(0).toUpperCase())}`;
                                }}
                              />
                              <span className="ms-2 fw-bold">
                                {result.character.displayName ||
                                  result.character.name
                                    .charAt(0)
                                    .toUpperCase() +
                                    result.character.name.slice(1)}
                              </span>
                            </div>
                          </td>
                          <td className={styles.commandCell}>
                            <code>{result.move.command}</code>
                          </td>
                          <td className={styles.numericCell}>
                            {result.move.hitLevel || "-"}
                          </td>
                          <td
                            className={`${styles.numericCell} ${styles.damageCell}`}
                          >
                            {result.move.damage || "-"}
                          </td>
                          <td
                            className={`${styles.numericCell} ${styles.frameCell}`}
                          >
                            {result.move.startUpFrame || "-"}
                          </td>
                          <td
                            className={`${styles.numericCell} ${styles.frameCell}`}
                          >
                            {result.move.blockFrame || "-"}
                          </td>
                          <td
                            className={`${styles.numericCell} ${styles.frameCell}`}
                          >
                            {result.move.hitFrame || "-"}
                          </td>
                          <td className={styles.featuresCell}>
                            <div className={styles.compactMoveBadges}>
                              {result.move.heatEngage && (
                                <Badge bg="warning" className="me-1 text-wrap">
                                  Heat Engage
                                </Badge>
                              )}
                              {result.move.heatSmash && (
                                <Badge bg="danger" className="me-1 text-wrap">
                                  Heat Smash
                                </Badge>
                              )}
                              {result.move.powerCrush && (
                                <Badge bg="info" className="me-1 text-wrap">
                                  Power Crush
                                </Badge>
                              )}
                              {result.move.throw && (
                                <Badge
                                  bg="secondary"
                                  className="me-1 text-wrap"
                                >
                                  Throw
                                </Badge>
                              )}
                              {result.move.homing && (
                                <Badge bg="primary" className="me-1 text-wrap">
                                  Homing
                                </Badge>
                              )}
                              {result.move.tornado && (
                                <Badge bg="success" className="me-1 text-wrap">
                                  Tornado
                                </Badge>
                              )}
                              {result.move.heatBurst && (
                                <Badge bg="dark" className="me-1 text-wrap">
                                  Heat Burst
                                </Badge>
                              )}
                              {result.move.requiresHeat && (
                                <Badge bg="warning" className="me-1 text-wrap">
                                  Requires Heat
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className={styles.notesCell}>
                            {result.move.notes &&
                            result.move.notes.length > 0 ? (
                              <div className={styles.notesContainer}>
                                {result.move.notes.map(
                                  (note: string, noteIndex: number) => (
                                    <div
                                      key={noteIndex}
                                      className={styles.noteItem}
                                    >
                                      <span className={styles.noteNumber}>
                                        #{noteIndex + 1}
                                      </span>
                                      <span className={styles.noteText}>
                                        {note}
                                      </span>
                                    </div>
                                  )
                                )}
                              </div>
                            ) : (
                              "-"
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default GlobalSearch;
