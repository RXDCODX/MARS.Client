import { useRef, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";

import { defaultApiConfig, Framedata } from "@/shared/api";
import { TekkenCharacter } from "@/shared/api/data-contracts";

import styles from "./FramedataPage.module.scss";
import {
  getCharacterAvatar,
  getCharacterFullBody,
  handleImageError,
} from "./imageUtils";

interface CharacterEditFormProps {
  character: TekkenCharacter;
  onBack: () => void;
  onSave: (updatedCharacter: TekkenCharacter) => void;
}

const CharacterEditForm: React.FC<CharacterEditFormProps> = ({
  character,
  onBack,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    name:
      character.name.charAt(0).toUpperCase() +
      character.name.slice(1).toLowerCase(),
    description: character.description || "",
    linkToImage: character.linkToImage || "",
    pageUrl: character.pageUrl || "",
    strengths: character.strengths || [],
    weaknesses: character.weaknesess || [],
  });
  const [newStrength, setNewStrength] = useState("");
  const [newWeakness, setNewWeakness] = useState("");
  const [selectedAvatarImage, setSelectedAvatarImage] = useState<File | null>(
    null
  );
  const [avatarImagePreview, setAvatarImagePreview] = useState<string | null>(
    null
  );
  const [selectedFullBodyImage, setSelectedFullBodyImage] =
    useState<File | null>(null);
  const [fullBodyImagePreview, setFullBodyImagePreview] = useState<
    string | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAvatarImageLoading, setIsAvatarImageLoading] = useState(false);
  const [isFullBodyImageLoading, setIsFullBodyImageLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const avatarFileInputRef = useRef<HTMLInputElement>(null);
  const fullBodyFileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddStrength = () => {
    if (
      newStrength.trim() &&
      !formData.strengths.includes(newStrength.trim())
    ) {
      setFormData(prev => ({
        ...prev,
        strengths: [...prev.strengths, newStrength.trim()],
      }));
      setNewStrength("");
    }
  };

  const handleRemoveStrength = (strengthToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      strengths: prev.strengths.filter(s => s !== strengthToRemove),
    }));
  };

  const handleAddWeakness = () => {
    if (
      newWeakness.trim() &&
      !formData.weaknesses.includes(newWeakness.trim())
    ) {
      setFormData(prev => ({
        ...prev,
        weaknesses: [...prev.weaknesses, newWeakness.trim()],
      }));
      setNewWeakness("");
    }
  };

  const handleRemoveWeakness = (weaknessToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      weaknesses: prev.weaknesses.filter(w => w !== weaknessToRemove),
    }));
  };

  const handleAvatarImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Проверяем размер файла (5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB в байтах
      if (file.size > maxSize) {
        setError("Размер файла не должен превышать 5MB");
        return;
      }

      // Проверяем тип файла
      if (!file.type.startsWith("image/")) {
        setError("Пожалуйста, выберите файл изображения");
        return;
      }

      setError(null);
      setSelectedAvatarImage(file);
      setIsAvatarImageLoading(true);

      // Создаем превью
      const reader = new FileReader();
      reader.onload = event => {
        setAvatarImagePreview(event.target?.result as string);
        setIsAvatarImageLoading(false);
      };
      reader.onerror = () => {
        setError("Ошибка при загрузке изображения");
        setIsAvatarImageLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFullBodyImageSelect = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Проверяем размер файла (5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB в байтах
      if (file.size > maxSize) {
        setError("Размер файла не должен превышать 5MB");
        return;
      }

      // Проверяем тип файла
      if (!file.type.startsWith("image/")) {
        setError("Пожалуйста, выберите файл изображения");
        return;
      }

      setError(null);
      setSelectedFullBodyImage(file);
      setIsFullBodyImageLoading(true);

      // Создаем превью
      const reader = new FileReader();
      reader.onload = event => {
        setFullBodyImagePreview(event.target?.result as string);
        setIsFullBodyImageLoading(false);
      };
      reader.onerror = () => {
        setError("Ошибка при загрузке изображения");
        setIsFullBodyImageLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatarImage = () => {
    setSelectedAvatarImage(null);
    setAvatarImagePreview(null);
    if (avatarFileInputRef.current) {
      avatarFileInputRef.current.value = "";
    }
  };

  const handleRemoveFullBodyImage = () => {
    setSelectedFullBodyImage(null);
    setFullBodyImagePreview(null);
    if (fullBodyFileInputRef.current) {
      fullBodyFileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const updatedCharacter: TekkenCharacter = {
        ...character,
        name:
          formData.name.charAt(0).toUpperCase() +
          formData.name.slice(1).toLowerCase(),
        description: formData.description,
        linkToImage: formData.linkToImage,
        pageUrl: formData.pageUrl,
        strengths: formData.strengths,
        weaknesess: formData.weaknesses,
      };

      // Если выбрано новое изображение, конвертируем его в byte array
      if (selectedAvatarImage) {
        const arrayBuffer = await selectedAvatarImage.arrayBuffer();
        const byteArray = new Uint8Array(arrayBuffer);
        // В новом API avatarImage имеет тип string (base64)
        updatedCharacter.avatarImage = Array.from(byteArray)
          .map(byte => String.fromCharCode(byte))
          .join("");

        // Определяем расширение файла
        const extension = selectedAvatarImage.name
          .split(".")
          .pop()
          ?.toLowerCase();
        if (extension) {
          updatedCharacter.avatarImageExtension = extension;
        }
      }

      if (selectedFullBodyImage) {
        const arrayBuffer = await selectedFullBodyImage.arrayBuffer();
        const byteArray = new Uint8Array(arrayBuffer);
        // В новом API fullBodyImage имеет тип string (base64)
        updatedCharacter.fullBodyImage = Array.from(byteArray)
          .map(byte => String.fromCharCode(byte))
          .join("");

        // Определяем расширение файла
        const extension = selectedFullBodyImage.name
          .split(".")
          .pop()
          ?.toLowerCase();
        if (extension) {
          updatedCharacter.fullBodyImageExtension = extension;
        }
      }

      // Обновляем персонажа через API
      const api = new Framedata(defaultApiConfig);
      const result = await api.framedataCharactersUpdate(
        character.name,
        updatedCharacter
      );

      if (result.data) {
        onSave(result.data);
      } else {
        setError("Ошибка при обновлении персонажа");
      }
    } catch (err) {
      console.error("Ошибка при обновлении персонажа:", err);
      setError("Произошла ошибка при обновлении персонажа");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.characterEditForm}>
      <Card>
        <Card.Header>
          <div className="d-flex align-items-center justify-content-between">
            <h3 className="mb-0">Редактирование персонажа: {character.name}</h3>
            <Button variant="outline-secondary" size="sm" onClick={onBack}>
              ← Назад к персонажу
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Имя персонажа</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Введите имя персонажа"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Описание</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Описание персонажа"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Ссылка на изображение</Form.Label>
                  <Form.Control
                    type="url"
                    name="linkToImage"
                    value={formData.linkToImage}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>URL страницы</Form.Label>
                  <Form.Control
                    type="url"
                    name="pageUrl"
                    value={formData.pageUrl}
                    onChange={handleInputChange}
                    placeholder="https://example.com/character-page"
                  />
                </Form.Group>

                {/* Сильные стороны */}
                <Form.Group className="mb-3">
                  <Form.Label>Сильные стороны</Form.Label>
                  <div className="d-flex gap-2 mb-2">
                    <Form.Control
                      type="text"
                      value={newStrength}
                      onChange={e => setNewStrength(e.target.value)}
                      placeholder="Добавить сильную сторону"
                      onKeyPress={e =>
                        e.key === "Enter" &&
                        (e.preventDefault(), handleAddStrength())
                      }
                    />
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={handleAddStrength}
                      disabled={!newStrength.trim()}
                    >
                      +
                    </Button>
                  </div>
                  <div
                    className="d-flex flex-wrap gap-1"
                    style={{ overflowX: "hidden" }}
                  >
                    {formData.strengths.map((strength, index) => (
                      <Badge
                        key={index}
                        bg="success"
                        className="d-flex align-items-center gap-1"
                        style={{ whiteSpace: "normal", textAlign: "left" }}
                      >
                        {strength}
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 text-white text-decoration-none"
                          onClick={() => handleRemoveStrength(strength)}
                        >
                          ×
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </Form.Group>

                {/* Слабые стороны */}
                <Form.Group className="mb-3">
                  <Form.Label>Слабые стороны</Form.Label>
                  <div className="d-flex gap-2 mb-2">
                    <Form.Control
                      type="text"
                      value={newWeakness}
                      onChange={e => setNewWeakness(e.target.value)}
                      placeholder="Добавить слабую сторону"
                      onKeyPress={e =>
                        e.key === "Enter" &&
                        (e.preventDefault(), handleAddWeakness())
                      }
                    />
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={handleAddWeakness}
                      disabled={!newWeakness.trim()}
                    >
                      +
                    </Button>
                  </div>
                  <div
                    className="d-flex flex-wrap gap-1"
                    style={{ overflowX: "hidden" }}
                  >
                    {formData.weaknesses.map((weakness, index) => (
                      <Badge
                        key={index}
                        bg="danger"
                        className="d-flex align-items-center gap-1"
                        style={{ whiteSpace: "normal", textAlign: "left" }}
                      >
                        {weakness}
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 text-white text-decoration-none"
                          onClick={() => handleRemoveWeakness(weakness)}
                        >
                          ×
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Аватар персонажа (портрет)</Form.Label>

                  {/* Текущее изображение */}
                  <div className="mb-3">
                    {isAvatarImageLoading ? (
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ height: "300px" }}
                      >
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">
                            Загрузка изображения...
                          </span>
                        </Spinner>
                      </div>
                    ) : (
                      <img
                        src={
                          avatarImagePreview ||
                          getCharacterAvatar(character, "300x400")
                        }
                        alt={character.name}
                        className="img-fluid rounded"
                        style={{ maxHeight: "300px", width: "auto" }}
                        onError={e =>
                          handleImageError(e, character.name, "300x400")
                        }
                      />
                    )}
                  </div>

                  {/* Загрузка нового изображения */}
                  <Form.Control
                    ref={avatarFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarImageSelect}
                    className="mb-2"
                  />

                  {selectedAvatarImage && (
                    <div className="d-flex gap-2 mb-3">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={handleRemoveAvatarImage}
                      >
                        Убрать изображение
                      </Button>
                    </div>
                  )}

                  <Form.Text className="text-muted">
                    Поддерживаемые форматы: JPG, PNG, GIF, WEBP. Максимальный
                    размер: 5MB.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Полное изображение персонажа (фон)</Form.Label>

                  {/* Текущее изображение */}
                  <div className="mb-3">
                    {isFullBodyImageLoading ? (
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ height: "300px" }}
                      >
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">
                            Загрузка изображения...
                          </span>
                        </Spinner>
                      </div>
                    ) : (
                      <img
                        src={
                          fullBodyImagePreview ||
                          getCharacterFullBody(character, "300x400")
                        }
                        alt={character.name}
                        className="img-fluid rounded"
                        style={{ maxHeight: "300px", width: "auto" }}
                        onError={e =>
                          handleImageError(e, character.name, "300x400")
                        }
                      />
                    )}
                  </div>

                  {/* Загрузка нового изображения */}
                  <Form.Control
                    ref={fullBodyFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFullBodyImageSelect}
                    className="mb-2"
                  />

                  {selectedFullBodyImage && (
                    <div className="d-flex gap-2 mb-3">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={handleRemoveFullBodyImage}
                      >
                        Убрать изображение
                      </Button>
                    </div>
                  )}

                  <Form.Text className="text-muted">
                    Поддерживаемые форматы: JPG, PNG, GIF, WEBP. Максимальный
                    размер: 5MB.
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}

            <div className="d-flex gap-2 justify-content-end mt-4">
              <Button variant="secondary" onClick={onBack} disabled={isLoading}>
                Назад
              </Button>
              <Button type="submit" variant="primary" disabled={isLoading}>
                {isLoading ? (
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
                  "Сохранить изменения"
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CharacterEditForm;
