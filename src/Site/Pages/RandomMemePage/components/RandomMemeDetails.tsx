import {
  ArrowLeft,
  Download,
  Edit,
  Eye,
  EyeOff,
  Folder,
  Image,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";

import { RandomMeme } from "@/shared/api";

import styles from "../RandomMemePage.module.scss";
import { RandomMemeDetailsProps } from "../RandomMemePage.types";

const RandomMemeDetails: React.FC<RandomMemeDetailsProps> = ({
  memeType,
  memeOrder,
  isLoading,
  onBack,
  onEdit,
  onDelete,
  onRefresh,
}) => {
  const api = useMemo(() => new RandomMeme(), []);

  const [memeImageUrl, setMemeImageUrl] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [showImage, setShowImage] = useState(true);

  // Загрузка медиа файла мема
  const loadMemeMedia = useCallback(async () => {
    if (!memeOrder?.id) return;

    try {
      setIsImageLoading(true);
      setImageError(null);

      // Получаем файл мема через API
      await api.randomMemeFileDetail(memeOrder.id);

      // Создаем URL для отображения медиа файла
      const mediaUrl = `/api/RandomMeme/file/${memeOrder.id}`;
      setMemeImageUrl(mediaUrl);
    } catch (error) {
      console.error("Ошибка загрузки медиа файла мема:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      setImageError(errorMessage);
    } finally {
      setIsImageLoading(false);
    }
  }, [api, memeOrder?.id]);

  // Определение типа медиа файла по расширению
  const getMediaType = useCallback((filePath: string) => {
    const extension = filePath.split(".").pop()?.toLowerCase();

    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"];
    const videoExtensions = ["mp4", "avi", "mov", "wmv", "flv", "webm", "mkv"];
    const audioExtensions = ["mp3", "wav", "ogg", "aac", "flac", "m4a"];

    if (imageExtensions.includes(extension || "")) {
      return "image";
    } else if (videoExtensions.includes(extension || "")) {
      return "video";
    } else if (audioExtensions.includes(extension || "")) {
      return "audio";
    }

    return "unknown";
  }, []);

  // Загружаем медиа файл при изменении заказа
  useEffect(() => {
    if (memeOrder?.id) {
      loadMemeMedia();
    } else {
      setMemeImageUrl(null);
      setImageError(null);
    }
  }, [memeOrder?.id, loadMemeMedia]);

  // Отображение загрузки
  if (isLoading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status" className="mb-3">
          <span className="visually-hidden">Загрузка...</span>
        </Spinner>
        <h4>Загрузка деталей...</h4>
        <p className="text-muted">Получаем информацию об элементе</p>
      </Container>
    );
  }

  // Проверка наличия данных
  if (!memeType && !memeOrder) {
    return (
      <Container>
        <Alert variant="warning">
          <Alert.Heading>Элемент не найден</Alert.Heading>
          <p>Запрашиваемый элемент не существует или был удален.</p>
          <Button variant="outline-primary" onClick={onBack}>
            <ArrowLeft size={16} className="me-2" />
            Вернуться к списку
          </Button>
        </Alert>
      </Container>
    );
  }

  const isType = !!memeType;

  return (
    <Container fluid className="py-4">
      {/* Навигация */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={onBack}
                className="d-flex align-items-center gap-2"
              >
                <ArrowLeft size={16} />
                Назад к списку
              </Button>
              <div>
                <h1 className="d-flex align-items-center gap-3 mb-1">
                  {isType ? <Folder size={32} /> : <Image size={32} />}
                  {isType ? "Тип мема" : "Заказ мема"}
                </h1>
                <p className="text-muted mb-0">
                  {isType ? memeType!.name : `Заказ #${memeOrder!.order}`}
                </p>
              </div>
            </div>

            <div className="d-flex gap-2">
              <Button
                variant="outline-primary"
                size="sm"
                onClick={onRefresh}
                disabled={isLoading}
                className="d-flex align-items-center gap-2"
              >
                <RefreshCw size={16} />
                Обновить
              </Button>

              <Button
                variant="outline-warning"
                size="sm"
                onClick={onEdit}
                className="d-flex align-items-center gap-2"
              >
                <Edit size={16} />
                Редактировать
              </Button>

              <Button
                variant="outline-danger"
                size="sm"
                onClick={onDelete}
                className="d-flex align-items-center gap-2"
              >
                <Trash2 size={16} />
                Удалить
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Отображение мема (только для заказов) */}
      {!isType && memeOrder && (
        <Row className="mb-4">
          <Col>
            <Card className={styles.memeDisplayCard}>
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Просмотр медиа файла</h5>
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => setShowImage(!showImage)}
                      className="d-flex align-items-center gap-2"
                    >
                      {showImage ? <EyeOff size={16} /> : <Eye size={16} />}
                      {showImage ? "Скрыть" : "Показать"}
                    </Button>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={loadMemeMedia}
                      disabled={isImageLoading}
                      className="d-flex align-items-center gap-2"
                    >
                      <RefreshCw
                        size={16}
                        className={isImageLoading ? styles.spin : ""}
                      />
                      Обновить
                    </Button>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                {isImageLoading ? (
                  <div className="text-center py-5">
                    <Spinner animation="border" role="status" className="mb-3">
                      <span className="visually-hidden">
                        Загрузка изображения...
                      </span>
                    </Spinner>
                    <p className="text-muted">Загружаем медиа файл мема...</p>
                  </div>
                ) : imageError ? (
                  <Alert variant="danger">
                    <Alert.Heading>Ошибка загрузки медиа файла</Alert.Heading>
                    <p>{imageError}</p>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={loadMemeMedia}
                    >
                      Попробовать снова
                    </Button>
                  </Alert>
                ) : memeImageUrl && showImage ? (
                  <div className="text-center">
                    <div className="mb-3">
                      {(() => {
                        const mediaType = getMediaType(memeOrder.filePath);

                        switch (mediaType) {
                          case "image":
                            return (
                              <img
                                src={memeImageUrl}
                                alt={`Мем #${memeOrder.order}`}
                                className={`img-fluid rounded ${styles.memeImage}`}
                                onError={() => {
                                  setImageError(
                                    "Не удалось загрузить изображение"
                                  );
                                }}
                              />
                            );

                          case "video":
                            return (
                              <video
                                src={memeImageUrl}
                                controls
                                className={`img-fluid rounded ${styles.memeImage}`}
                                onError={() => {
                                  setImageError("Не удалось загрузить видео");
                                }}
                              >
                                Ваш браузер не поддерживает видео элемент.
                              </video>
                            );

                          case "audio":
                            return (
                              <div className="d-flex flex-column align-items-center">
                                <div className="mb-3">
                                  <Image size={64} className="text-muted" />
                                </div>
                                <audio
                                  src={memeImageUrl}
                                  controls
                                  className="w-100"
                                  onError={() => {
                                    setImageError("Не удалось загрузить аудио");
                                  }}
                                >
                                  Ваш браузер не поддерживает аудио элемент.
                                </audio>
                              </div>
                            );

                          default:
                            return (
                              <div className="d-flex flex-column align-items-center">
                                <div className="mb-3">
                                  <Image size={64} className="text-muted" />
                                </div>
                                <p className="text-muted">
                                  Неподдерживаемый тип файла:{" "}
                                  {memeOrder.filePath.split(".").pop()}
                                </p>
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  onClick={() =>
                                    window.open(memeImageUrl, "_blank")
                                  }
                                  className="d-flex align-items-center gap-2"
                                >
                                  <Eye size={16} />
                                  Открыть файл
                                </Button>
                              </div>
                            );
                        }
                      })()}
                    </div>
                    <div className={styles.memeActions}>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => window.open(memeImageUrl, "_blank")}
                        className="d-flex align-items-center gap-2"
                      >
                        <Eye size={16} />
                        Открыть в новой вкладке
                      </Button>
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href = memeImageUrl;
                          const extension =
                            memeOrder.filePath.split(".").pop() || "file";
                          link.download = `meme_${memeOrder.order}.${extension}`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="d-flex align-items-center gap-2"
                      >
                        <Download size={16} />
                        Скачать
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.memePlaceholder}>
                    <Image size={64} className="placeholder-icon" />
                    <p className="placeholder-text">Медиа файл скрыт</p>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => setShowImage(true)}
                    >
                      <Eye size={16} className="me-2" />
                      Показать медиа файл
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Основная информация */}
      <Row className="">
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Основная информация</h5>
            </Card.Header>
            <Card.Body>
              <Row className="g-3">
                <Col sm={6}>
                  <div className="border rounded p-3">
                    <small className="text-muted d-block mb-1">ID</small>
                    <div className="fw-bold">
                      {isType ? memeType!.id : memeOrder!.id.slice(0, 8)}...
                    </div>
                  </div>
                </Col>

                {isType ? (
                  <>
                    <Col sm={6}>
                      <div className="border rounded p-3">
                        <small className="text-muted d-block mb-1">
                          Название
                        </small>
                        <div className="fw-bold">{memeType!.name}</div>
                      </div>
                    </Col>
                    <Col sm={12}>
                      <div className="border rounded p-3">
                        <small className="text-muted d-block mb-1">Папка</small>
                        <code
                          className="px-2 py-1 rounded"
                          style={{
                            backgroundColor: "var(--site-bg-secondary)",
                          }}
                        >
                          {memeType!.folderPath}
                        </code>
                      </div>
                    </Col>
                  </>
                ) : (
                  <>
                    <Col sm={6}>
                      <div className="border rounded p-3">
                        <small className="text-muted d-block mb-1">
                          Порядок
                        </small>
                        <div className="fw-bold">#{memeOrder!.order}</div>
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="border rounded p-3">
                        <small className="text-muted d-block mb-1">Файл</small>
                        <code
                          className="px-2 py-1 rounded d-block"
                          style={{
                            backgroundColor: "var(--site-bg-secondary)",
                          }}
                        >
                          {memeOrder!.filePath}
                        </code>
                      </div>
                    </Col>
                  </>
                )}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Дополнительная информация */}
      {!isType && memeOrder!.type && (
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Header>
                <h5 className="mb-0">Информация о типе</h5>
              </Card.Header>
              <Card.Body>
                <Row className="g-3">
                  <Col md={6}>
                    <div className="border rounded p-3">
                      <small className="text-muted d-block mb-1">
                        Название типа
                      </small>
                      <div className="fw-bold">{memeOrder!.type.name}</div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="border rounded p-3">
                      <small className="text-muted d-block mb-1">ID типа</small>
                      <div className="fw-bold">{memeOrder!.type.id}</div>
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="border rounded p-3">
                      <small className="text-muted d-block mb-1">
                        Папка типа
                      </small>
                      <code
                        className="px-2 py-1 rounded"
                        style={{ backgroundColor: "var(--site-bg-secondary)" }}
                      >
                        {memeOrder!.type.folderPath}
                      </code>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Свойства файла (для заказов) */}
      {!isType && (
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Header>
                <h5 className="mb-0">Свойства файла</h5>
              </Card.Header>
              <Card.Body>
                <Row className="g-3">
                  <Col md={6}>
                    <div className="border rounded p-3">
                      <small className="text-muted d-block mb-1">
                        Расширение
                      </small>
                      <div className="fw-bold">
                        {memeOrder!.filePath.split(".").pop()?.toUpperCase() ||
                          "N/A"}
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="border rounded p-3">
                      <small className="text-muted d-block mb-1">
                        Размер файла
                      </small>
                      <div className="fw-bold text-muted">Недоступно</div>
                      <small className="text-muted">
                        Информация о размере файла недоступна через API
                      </small>
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="border rounded p-3">
                      <small className="text-muted d-block mb-1">
                        Полный путь
                      </small>
                      <code
                        className="px-2 py-1 rounded d-block text-break"
                        style={{ backgroundColor: "var(--site-bg-secondary)" }}
                      >
                        {memeOrder!.filePath}
                      </code>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Действия */}
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Действия</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex gap-2 flex-wrap">
                <Button
                  variant="primary"
                  onClick={onEdit}
                  className="d-flex align-items-center gap-2"
                >
                  <Edit size={16} />
                  Редактировать
                </Button>

                <Button
                  variant="outline-danger"
                  onClick={onDelete}
                  className="d-flex align-items-center gap-2"
                >
                  <Trash2 size={16} />
                  Удалить {isType ? "тип" : "заказ"}
                </Button>

                <Button
                  variant="outline-secondary"
                  onClick={onRefresh}
                  disabled={isLoading}
                  className="d-flex align-items-center gap-2"
                >
                  <RefreshCw size={16} />
                  Обновить данные
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RandomMemeDetails;
