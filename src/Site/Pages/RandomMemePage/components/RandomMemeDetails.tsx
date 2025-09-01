import {
  ArrowLeft,
  Edit,
  Folder,
  Image,
  RefreshCw,
  Trash2,
} from "lucide-react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";

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

      {/* Основная информация */}
      <Row className="mb-4">
        <Col lg={8}>
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
                        <code className="bg-light px-2 py-1 rounded">
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
                    <Col sm={12}>
                      <div className="border rounded p-3">
                        <small className="text-muted d-block mb-1">Файл</small>
                        <code className="bg-light px-2 py-1 rounded d-block">
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

        <Col lg={4}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Статистика</h5>
            </Card.Header>
            <Card.Body>
              <div className="text-center">
                <div className="mb-3">
                  <div className="display-4 text-primary">
                    {isType ? (
                      "?" // Здесь можно добавить количество связанных заказов
                    ) : (
                      <Image size={48} />
                    )}
                  </div>
                  <small className="text-muted">
                    {isType ? "Связанных заказов" : "Файл мема"}
                  </small>
                </div>

                {isType && (
                  <Badge bg="info" className="me-2">
                    <Folder size={12} className="me-1" />
                    Тип мема
                  </Badge>
                )}

                {!isType && memeOrder!.type && (
                  <Badge bg="success" className="me-2">
                    <Folder size={12} className="me-1" />
                    {memeOrder!.type.name}
                  </Badge>
                )}
              </div>
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
                      <code className="bg-light px-2 py-1 rounded">
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
                      <code className="bg-light px-2 py-1 rounded d-block text-break">
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
