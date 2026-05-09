import { Edit, Eye, Folder, Plus, RefreshCw, Trash2 } from "lucide-react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";

import { RandomMemeTypesListProps } from "../RandomMemePage.types";

const RandomMemeTypesList: React.FC<RandomMemeTypesListProps> = ({
  memeTypes,
  isLoading,
  error,
  onRefresh,
  onViewDetails,
  onEdit,
  onDelete,
  onCreate,
}) => {
  if (isLoading && !memeTypes.length) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status" className="mb-3">
          <span className="visually-hidden">Загрузка...</span>
        </Spinner>
        <h4>Загрузка типов мемов...</h4>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <Row className="mb-3">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="mb-0">Типы мемов</h1>
            <div className="d-flex gap-2">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={onRefresh}
                disabled={isLoading}
                className="d-flex align-items-center gap-2"
              >
                <RefreshCw size={16} />
                Обновить
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={onCreate}
                className="d-flex align-items-center gap-2"
              >
                <Plus size={16} />
                Добавить тип
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {error && (
        <Alert variant="danger" className="mb-3">
          <Alert.Heading>Ошибка загрузки</Alert.Heading>
          <p className="mb-0">{error}</p>
        </Alert>
      )}

      {memeTypes.length === 0 ? (
        <Card className="text-center">
          <Card.Body>
            <Folder size={64} className="text-muted mb-3" />
            <h5 className="mb-1">Типы мемов не найдены</h5>
            <div className="text-muted">Создайте первый тип мема</div>
          </Card.Body>
        </Card>
      ) : (
        <Row xs={1} sm={2} lg={3} xl={4}>
          {memeTypes.map(type => (
            <Col key={type.id} className="mb-3">
              <Card
                className="h-100 cursor-pointer"
                style={{ cursor: "pointer" }}
                onClick={() => onViewDetails(type)}
              >
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-3">
                      <Folder size={32} className="text-primary" />
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-1 fw-bold">{type.name}</h6>
                      <small className="text-muted">ID: {type.id}</small>
                    </div>
                  </div>

                  <div className="mb-3">
                    <small className="text-muted d-block">Папка</small>
                    <code
                      className="d-block text-truncate"
                      style={{
                        backgroundColor: "var(--bs-light)",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "0.25rem",
                        fontSize: "0.8rem",
                      }}
                      title={type.folderPath}
                    >
                      {type.folderPath}
                    </code>
                  </div>

                  <div className="d-flex gap-1">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={e => {
                        e.stopPropagation();
                        onViewDetails(type);
                      }}
                      className="d-flex align-items-center justify-content-center"
                      title="Просмотр"
                    >
                      <Eye size={14} />
                    </Button>
                    <Button
                      variant="outline-warning"
                      size="sm"
                      onClick={e => {
                        e.stopPropagation();
                        onEdit(type);
                      }}
                      className="d-flex align-items-center justify-content-center"
                      title="Редактировать"
                    >
                      <Edit size={14} />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={e => {
                        e.stopPropagation();
                        onDelete(type);
                      }}
                      className="d-flex align-items-center justify-content-center"
                      title="Удалить"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default RandomMemeTypesList;
