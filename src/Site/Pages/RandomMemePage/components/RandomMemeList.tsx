import React, { useMemo } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Spinner,
  Tab,
  Tabs,
} from "react-bootstrap";
import {
  Folder,
  Image,
  Plus,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";

import { MemeTypeDto, MemeOrderDto } from "@/shared/api/http-clients/data-contracts";
import { RandomMemeListProps } from "../RandomMemePage.types";

const RandomMemeList: React.FC<RandomMemeListProps> = ({
  memeTypes,
  memeOrders,
  isLoading,
  error,
  searchQuery,
  activeTab,
  onSearchChange,
  onTabChange,
  onTypeSelect,
  onOrderSelect,
  onCreateClick,
  onRefresh,
}) => {
  // Фильтрация данных по поисковому запросу
  const filteredTypes = useMemo(() => {
    if (!searchQuery) return memeTypes;

    const query = searchQuery.toLowerCase();
    return memeTypes.filter(
      (type) =>
        type.name.toLowerCase().includes(query) ||
        type.folderPath.toLowerCase().includes(query)
    );
  }, [memeTypes, searchQuery]);

  const filteredOrders = useMemo(() => {
    if (!searchQuery) return memeOrders;

    const query = searchQuery.toLowerCase();
    return memeOrders.filter(
      (order) =>
        order.filePath.toLowerCase().includes(query) ||
        order.type?.name.toLowerCase().includes(query)
    );
  }, [memeOrders, searchQuery]);

  // Рендер карточки типа мема
  const renderTypeCard = (type: MemeTypeDto) => (
    <Card
      key={type.id}
      className="h-100 cursor-pointer transition-all hover:shadow-lg"
      onClick={() => onTypeSelect(type)}
      style={{ cursor: "pointer" }}
    >
      <Card.Body className="d-flex flex-column">
        <div className="d-flex align-items-center mb-3">
          <div className="bg-primary rounded-circle p-2 me-3">
            <Folder size={20} className="text-white" />
          </div>
          <div className="flex-grow-1">
            <h6 className="mb-1 fw-bold">{type.name}</h6>
            <small className="text-muted">ID: {type.id}</small>
          </div>
        </div>

        <div className="mb-3">
          <small className="text-muted d-block">Папка:</small>
          <code className="bg-light px-2 py-1 rounded small">
            {type.folderPath}
          </code>
        </div>

        <div className="mt-auto">
          <Badge bg="secondary" className="me-2">
            <Image size={12} className="me-1" />
            {memeOrders.filter((order) => order.memeTypeId === type.id).length} файлов
          </Badge>
        </div>
      </Card.Body>
    </Card>
  );

  // Рендер карточки заказа мема
  const renderOrderCard = (order: MemeOrderDto) => (
    <Card
      key={order.id}
      className="h-100 cursor-pointer transition-all hover:shadow-lg"
      onClick={() => onOrderSelect(order)}
      style={{ cursor: "pointer" }}
    >
      <Card.Body className="d-flex flex-column">
        <div className="d-flex align-items-center mb-3">
          <div className="bg-success rounded-circle p-2 me-3">
            <Image size={20} className="text-white" />
          </div>
          <div className="flex-grow-1">
            <h6 className="mb-1 fw-bold">Заказ #{order.order}</h6>
            <small className="text-muted">ID: {order.id.slice(0, 8)}...</small>
          </div>
        </div>

        <div className="mb-3">
          <small className="text-muted d-block">Файл:</small>
          <code className="bg-light px-2 py-1 rounded small text-truncate d-block">
            {order.filePath}
          </code>
        </div>

        {order.type && (
          <div className="mb-3">
            <small className="text-muted d-block">Тип:</small>
            <Badge bg="info" className="me-2">
              <Folder size={12} className="me-1" />
              {order.type.name}
            </Badge>
          </div>
        )}

        <div className="mt-auto">
          <small className="text-muted">
            Порядок: {order.order}
          </small>
        </div>
      </Card.Body>
    </Card>
  );

  // Отображение загрузки
  if (isLoading && !memeTypes.length && !memeOrders.length) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status" className="mb-3">
          <span className="visually-hidden">Загрузка...</span>
        </Spinner>
        <h4>Загрузка данных...</h4>
        <p className="text-muted">Получаем информацию о мемах</p>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      {/* Заголовок страницы */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="d-flex align-items-center gap-3 mb-2">
                <Image size={32} />
                Random Meme Manager
              </h1>
              <p className="text-muted mb-0">
                Управление типами и заказами мемов для рандомизации
              </p>
            </div>

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
                onClick={onCreateClick}
                className="d-flex align-items-center gap-2"
              >
                <Plus size={16} />
                Создать {activeTab === "types" ? "тип" : "заказ"}
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Статистика */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <div className="display-4 text-primary">{memeTypes.length}</div>
              <small className="text-muted">Типов мемов</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <div className="display-4 text-success">{memeOrders.length}</div>
              <small className="text-muted">Заказов</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <div className="display-4 text-info">
                {new Set(memeOrders.map((o) => o.filePath)).size}
              </div>
              <small className="text-muted">Уникальных файлов</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <div className="display-4 text-warning">
                {Object.keys(
                  memeTypes.reduce((acc, type) => {
                    acc[type.folderPath] = true;
                    return acc;
                  }, {} as Record<string, boolean>)
                ).length}
              </div>
              <small className="text-muted">Папок</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Ошибки */}
      {error && (
        <Alert variant="danger" className="mb-4">
          <Alert.Heading>Ошибка загрузки данных</Alert.Heading>
          <p className="mb-0">{error}</p>
        </Alert>
      )}

      {/* Поиск */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <InputGroup>
                <InputGroup.Text>
                  <Search size={20} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder={`🔍 Поиск ${activeTab === "types" ? "типов мемов" : "заказов"}...`}
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    variant="outline-secondary"
                    onClick={() => onSearchChange("")}
                  >
                    <Trash2 size={16} />
                  </Button>
                )}
              </InputGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Табы и контент */}
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Список элементов</h5>
                <Badge bg="secondary">
                  {activeTab === "types"
                    ? `${filteredTypes.length} типов`
                    : `${filteredOrders.length} заказов`}
                </Badge>
              </div>
            </Card.Header>
            <Card.Body>
              <Tabs
                activeKey={activeTab}
                onSelect={(k) => onTabChange(k as "types" | "orders")}
                className="mb-4"
              >
                <Tab
                  eventKey="types"
                  title={
                    <div className="d-flex align-items-center gap-2">
                      <Folder size={16} />
                      Типы мемов ({memeTypes.length})
                    </div>
                  }
                >
                  {filteredTypes.length > 0 ? (
                    <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
                      {filteredTypes.map(renderTypeCard)}
                    </Row>
                  ) : (
                    <div className="text-center py-5">
                      <Folder size={48} className="text-muted mb-3" />
                      <h5>Типы мемов не найдены</h5>
                      <p className="text-muted">
                        {searchQuery
                          ? `По запросу "${searchQuery}" ничего не найдено`
                          : "Создайте первый тип мема"}
                      </p>
                      {!searchQuery && (
                        <Button
                          variant="primary"
                          onClick={onCreateClick}
                          className="mt-3"
                        >
                          <Plus size={16} className="me-2" />
                          Создать тип
                        </Button>
                      )}
                    </div>
                  )}
                </Tab>

                <Tab
                  eventKey="orders"
                  title={
                    <div className="d-flex align-items-center gap-2">
                      <Image size={16} />
                      Заказы ({memeOrders.length})
                    </div>
                  }
                >
                  {filteredOrders.length > 0 ? (
                    <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
                      {filteredOrders.map(renderOrderCard)}
                    </Row>
                  ) : (
                    <div className="text-center py-5">
                      <Image size={48} className="text-muted mb-3" />
                      <h5>Заказы не найдены</h5>
                      <p className="text-muted">
                        {searchQuery
                          ? `По запросу "${searchQuery}" ничего не найдено`
                          : "Создайте первый заказ мема"}
                      </p>
                      {!searchQuery && (
                        <Button
                          variant="success"
                          onClick={onCreateClick}
                          className="mt-3"
                        >
                          <Plus size={16} className="me-2" />
                          Создать заказ
                        </Button>
                      )}
                    </div>
                  )}
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RandomMemeList;
