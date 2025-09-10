import { Edit, Eye, Filter, Plus, RefreshCw, Trash2, X, Copy } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";

import { RandomMemeOrdersListProps } from "../RandomMemePage.types";

const RandomMemeList: React.FC<RandomMemeOrdersListProps> = ({
  memeOrders,
  memeTypes,
  isLoading,
  error,
  onRefresh,
  onViewDetails,
  onEdit,
  onDelete,
  onCreate,
  showToast,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Получаем начальные значения из URL параметров
  const getInitialTypeId = (): number | "all" | "no-type" => {
    const typeParam = searchParams.get("type");
    if (typeParam === "no-type") return "no-type";
    if (typeParam && !isNaN(Number(typeParam))) return Number(typeParam);
    return "all";
  };

  const getInitialSearchTerm = (): string => {
    return searchParams.get("search") || "";
  };

  const [selectedTypeId, setSelectedTypeId] = useState<number | "all" | "no-type">(getInitialTypeId);
  const [searchTerm, setSearchTerm] = useState<string>(getInitialSearchTerm);
  const [searchInput, setSearchInput] = useState<string>(getInitialSearchTerm);

  // Функции для обновления URL параметров
  const updateTypeFilter = (typeId: number | "all" | "no-type") => {
    setSelectedTypeId(typeId);
    const newSearchParams = new URLSearchParams(searchParams);
    
    if (typeId === "all") {
      newSearchParams.delete("type");
    } else if (typeId === "no-type") {
      newSearchParams.set("type", "no-type");
    } else {
      newSearchParams.set("type", typeId.toString());
    }
    
    setSearchParams(newSearchParams, { replace: true });
  };

  const updateSearchFilter = (search: string) => {
    setSearchTerm(search);
    const newSearchParams = new URLSearchParams(searchParams);
    
    if (search.trim()) {
      newSearchParams.set("search", search.trim());
    } else {
      newSearchParams.delete("search");
    }
    
    setSearchParams(newSearchParams, { replace: true });
  };

  const resetFilters = () => {
    setSelectedTypeId("all");
    setSearchTerm("");
    setSearchInput("");
    setSearchParams({}, { replace: true });
  };

  const copyFilteredLink = async () => {
    const currentUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(currentUrl);
      showToast?.({
        type: "success",
        title: "Ссылка скопирована",
        message: "Ссылка с примененными фильтрами скопирована в буфер обмена",
      });
    } catch (err) {
      console.error("Ошибка копирования ссылки:", err);
      showToast?.({
        type: "error",
        title: "Ошибка копирования",
        message: "Не удалось скопировать ссылку в буфер обмена",
      });
    }
  };

  // Проверяем, есть ли активные фильтры
  const hasActiveFilters = selectedTypeId !== "all" || searchTerm.trim() !== "";

  // Debounce для поиска
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== searchTerm) {
        updateSearchFilter(searchInput);
      }
    }, 500); // 500ms задержка

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Синхронизация с URL параметрами при изменении
  useEffect(() => {
    const typeParam = searchParams.get("type");
    const searchParam = searchParams.get("search");
    
    if (typeParam !== null) {
      const newTypeId = typeParam === "no-type" ? "no-type" : 
                       (!isNaN(Number(typeParam)) ? Number(typeParam) : "all");
      if (newTypeId !== selectedTypeId) {
        setSelectedTypeId(newTypeId);
      }
    } else if (selectedTypeId !== "all") {
      setSelectedTypeId("all");
    }
    
    if (searchParam !== null && searchParam !== searchTerm) {
      setSearchTerm(searchParam);
      setSearchInput(searchParam);
    } else if (searchParam === null && searchTerm !== "") {
      setSearchTerm("");
      setSearchInput("");
    }
  }, [searchParams, selectedTypeId, searchTerm]);

  // Фильтрация заказов
  const filteredOrders = useMemo(() => {
    let filtered = memeOrders;

    // Фильтр по типу
    if (selectedTypeId !== "all") {
      if (selectedTypeId === "no-type") {
        // Фильтр для заказов без типа
        filtered = filtered.filter(order => !order.memeTypeId || order.memeTypeId === 0);
      } else {
        // Фильтр по конкретному типу
        filtered = filtered.filter(order => order.memeTypeId === selectedTypeId);
      }
    }

    // Фильтр по поиску
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(order => 
        order.filePath.toLowerCase().includes(search) ||
        order.type?.name?.toLowerCase().includes(search) ||
        order.order.toString().includes(search)
      );
    }

    return filtered;
  }, [memeOrders, selectedTypeId, searchTerm]);

  // Подсчет заказов без типа
  const ordersWithoutType = useMemo(() => {
    return memeOrders.filter(order => !order.memeTypeId || order.memeTypeId === 0).length;
  }, [memeOrders]);
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
            <div>
              <h1 className="mb-0">Очередь заказов ({filteredOrders.length})</h1>
              {hasActiveFilters && (
                <div className="mt-1">
                  <small className="text-muted">
                    <Filter size={14} className="me-1" />
                    Фильтры активны
                    {selectedTypeId !== "all" && (
                      <span className="ms-2">
                        Тип: {selectedTypeId === "no-type" ? "Без типа" : 
                              memeTypes.find(t => t.id === selectedTypeId)?.name || selectedTypeId}
                      </span>
                    )}
                    {searchTerm.trim() && (
                      <span className="ms-2">
                        Поиск: "{searchTerm}"
                      </span>
                    )}
                  </small>
                </div>
              )}
            </div>
            <div className="d-flex gap-2">
              {hasActiveFilters && (
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={copyFilteredLink}
                  className="d-flex align-items-center gap-2"
                  title="Копировать ссылку с фильтрами"
                >
                  <Copy size={16} />
                  Копировать ссылку
                </Button>
              )}
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
                Добавить заказ
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Фильтры */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Row className="g-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="fw-bold">
                      <Filter size={16} className="me-1" />
                      Фильтр по типу
                    </Form.Label>
                    <Form.Select
                      value={selectedTypeId}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "all") {
                          updateTypeFilter("all");
                        } else if (value === "no-type") {
                          updateTypeFilter("no-type");
                        } else {
                          updateTypeFilter(parseInt(value));
                        }
                      }}
                    >
                      <option value="all">Все типы</option>
                      <option value="no-type">Без типа ({ordersWithoutType})</option>
                      {memeTypes.map(type => {
                        const typeCount = memeOrders.filter(order => order.memeTypeId === type.id).length;
                        return (
                          <option key={type.id} value={type.id}>
                            {type.name} ({typeCount})
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-bold">Поиск</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Поиск по файлу, типу или номеру заказа..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={2} className="d-flex align-items-end">
                  <Button
                    variant="outline-secondary"
                    onClick={resetFilters}
                    className="d-flex align-items-center gap-1"
                    disabled={selectedTypeId === "all" && !searchInput.trim()}
                  >
                    <X size={16} />
                    Сбросить
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {error && (
        <Alert variant="danger" className="mb-3">
          <Alert.Heading>Ошибка загрузки</Alert.Heading>
          <p className="mb-0">{error}</p>
        </Alert>
      )}

      {filteredOrders.length === 0 ? (
        <Card className="text-center">
          <Card.Body>
            <h5 className="mb-1">
              {memeOrders.length === 0 ? "Очередь пуста" : "Ничего не найдено"}
            </h5>
            <div className="text-muted">
              {memeOrders.length === 0 
                ? "Нет элементов в очереди" 
                : "Попробуйте изменить фильтры или поисковый запрос"
              }
            </div>
            {memeOrders.length > 0 && (
              <Button
                variant="outline-primary"
                size="sm"
                onClick={resetFilters}
                className="mt-2"
              >
                Сбросить фильтры
              </Button>
            )}
          </Card.Body>
        </Card>
      ) : (
        <Row xs={1} sm={2} lg={3} xl={4}>
          {filteredOrders
            .slice()
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            .map(order => (
              <Col key={order.id} className="mb-3">
                <Card 
                  className="h-100 cursor-pointer" 
                  style={{ cursor: 'pointer' }}
                  onClick={() => onViewDetails(order)}
                >
                  <Card.Body>
                    <div className="mb-2">
                      <small className="text-muted d-block">Файл</small>
                      <div
                        className="fw-bold text-truncate"
                        title={order.filePath}
                      >
                        {getFileName(order.filePath)}
                      </div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted d-block">Тип</small>
                      <div className="fw-semibold">
                        {order.type?.name ? (
                          <span className="text-primary">{order.type.name}</span>
                        ) : (
                          <span className="text-muted fst-italic">Без типа</span>
                        )}
                      </div>
                    </div>
                    <div className="mb-3">
                      <small className="text-muted d-block">
                        Номер в очереди
                      </small>
                      <div className="fw-semibold">#{order.order}</div>
                    </div>
                    <div className="d-flex gap-1">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewDetails(order);
                        }}
                        className="d-flex align-items-center justify-content-center"
                        title="Просмотр"
                      >
                        <Eye size={14} />
                      </Button>
                      <Button
                        variant="outline-warning"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(order);
                        }}
                        className="d-flex align-items-center justify-content-center"
                        title="Редактировать"
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(order);
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

export default RandomMemeList;
