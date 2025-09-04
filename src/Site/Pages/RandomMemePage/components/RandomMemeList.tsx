import { RefreshCw } from "lucide-react";
import { Alert, Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";

import { RandomMemeListProps } from "../RandomMemePage.types";

const RandomMemeList: React.FC<RandomMemeListProps> = ({ memeOrders, isLoading, error, onRefresh }) => {
  const getFileName = (filePath: string) => {
    const parts = filePath.split(/[/\\]/);
    return parts[parts.length - 1] || filePath;
  };

  if (isLoading && !memeOrders.length) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status" className="mb-3">
          <span className="visually-hidden">Загрузка...</span>
        </Spinner>
        <h4>Загрузка очереди...</h4>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <Row className="mb-3">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="mb-0">Очередь заказов</h1>
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
          </div>
        </Col>
      </Row>

      {error && (
        <Alert variant="danger" className="mb-3">
          <Alert.Heading>Ошибка загрузки</Alert.Heading>
          <p className="mb-0">{error}</p>
        </Alert>
      )}

      {memeOrders.length === 0 ? (
        <Card className="text-center">
          <Card.Body>
            <h5 className="mb-1">Очередь пуста</h5>
            <div className="text-muted">Нет элементов в очереди</div>
          </Card.Body>
        </Card>
      ) : (
        <Row xs={1} sm={2} lg={3} xl={4}>
          {memeOrders
            .slice()
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            .map(order => (
              <Col key={order.id} className="mb-3">
                <Card className="h-100">
                  <Card.Body>
                    <div className="mb-2">
                      <small className="text-muted d-block">Файл</small>
                      <div className="fw-bold text-truncate" title={order.filePath}>{getFileName(order.filePath)}</div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted d-block">Тип</small>
                      <div className="fw-semibold">{order.type?.name ?? "Без типа"}</div>
                    </div>
                    <div>
                      <small className="text-muted d-block">Номер в очереди</small>
                      <div className="fw-semibold">#{order.order}</div>
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

export default RandomMemeList;
