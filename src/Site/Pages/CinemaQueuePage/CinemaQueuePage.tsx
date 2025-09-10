import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { Pencil, PlayCircle, Plus, Trash } from "react-bootstrap-icons";

import {
  CinemaQueue,
  UpdateMediaItemRequest,
  UpdateMediaItemRequestStatusEnum,
} from "@/shared/api";
import {
  createErrorToast,
  createSuccessToast,
} from "@/shared/Utils/ToastModal";
import { useToastModal } from "@/shared/Utils/ToastModal";
import { useSiteColors } from "@/shared/Utils/useSiteColors";

import styles from "./CinemaQueuePage.module.scss";

// Используем типы из API
interface MediaItem {
  id: string;
  title: string;
  description?: string;
  mediaUrl: string;
  status: "Pending" | "InProgress" | "Completed" | "Cancelled" | "Postponed";
  priority: number;
  createdAt: string;
  scheduledFor?: string;
  addedBy?: string;
  twitchUsername?: string;
  notes?: string;
  isNext: boolean;
  lastModified?: string;
}

interface CreateMediaItemRequest {
  title: string;
  description?: string;
  mediaUrl: string;
  priority: number;
  scheduledFor?: string;
  addedBy?: string;
  twitchUserId?: string;
  twitchUsername?: string;
  notes?: string;
}

interface CinemaQueueStatistics {
  totalItems: number;
  pendingItems: number;
  inProgressItems: number;
  completedItems: number;
  cancelledItems: number;
  postponedItems: number;
}

const CinemaQueuePage: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [statistics, setStatistics] = useState<CinemaQueueStatistics | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [formData, setFormData] = useState<CreateMediaItemRequest>({
    title: "",
    description: "",
    mediaUrl: "",
    priority: 1,
    scheduledFor: new Date(Date.now() + 60 * 60 * 1000)
      .toISOString()
      .slice(0, 16), // Default to 1 hour from now
    addedBy: "",
    twitchUsername: "",
    notes: "",
  });
  const [editFormData, setEditFormData] = useState<
    Partial<UpdateMediaItemRequest>
  >({});

  const { showToast } = useToastModal();
  const colors = useSiteColors();
  const cinemaQueueApi = useMemo(() => new CinemaQueue(), []);

  // Динамические стили на основе темы
  const pageStyles = useMemo(
    () => ({
      backgroundColor: colors.background.primary,
      color: colors.text.primary,
    }),
    [colors]
  );

  const headerStyles = useMemo(
    () => ({
      backgroundColor: colors.background.card,
      borderColor: colors.border.primary,
      boxShadow: colors.shadow.light,
    }),
    [colors]
  );

  const cardStyles = useMemo(
    () => ({
      backgroundColor: colors.background.card,
      borderColor: colors.border.primary,
      boxShadow: colors.shadow.light,
    }),
    [colors]
  );

  const tableStyles = useMemo(
    () => ({
      backgroundColor: colors.background.card,
      borderColor: colors.border.primary,
    }),
    [colors]
  );

  const fetchMediaItems = useCallback(async () => {
    try {
      setLoading(true);
      const response = await cinemaQueueApi.cinemaQueueList();
      if (response.status === 200) {
        setMediaItems(response.data);
      } else {
        showToast(
          createErrorToast(
            "Не удалось загрузить медиа элементы",
            new Error("API Error")
          )
        );
      }
    } catch (error) {
      showToast(createErrorToast("Ошибка при загрузке медиа элементов", error));
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }, [cinemaQueueApi, showToast]);

  const fetchStatistics = useCallback(async () => {
    try {
      const response = await cinemaQueueApi.cinemaQueueStatisticsList();
      if (response.status === 200) {
        setStatistics(response.data);
      }
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  }, [cinemaQueueApi]);

  useEffect(() => {
    fetchMediaItems();
    fetchStatistics();
  }, [fetchMediaItems, fetchStatistics]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure scheduledFor has a value to prevent NOT NULL constraint violation
    if (!formData.scheduledFor) {
      showToast(
        createErrorToast(
          "Поле 'Scheduled For' обязательно для заполнения",
          new Error("Validation Error")
        )
      );
      return;
    }

    // Validate that scheduledFor is a valid date
    const scheduledDate = new Date(formData.scheduledFor);
    if (isNaN(scheduledDate.getTime())) {
      showToast(
        createErrorToast(
          "Неверный формат даты в поле 'Scheduled For'",
          new Error("Validation Error")
        )
      );
      return;
    }

    // Ensure the date is in the future
    if (scheduledDate <= new Date()) {
      showToast(
        createErrorToast(
          "Дата должна быть в будущем",
          new Error("Validation Error")
        )
      );
      return;
    }

    try {
      // Convert datetime-local string to ISO string for the API
      const scheduledDate = new Date(formData.scheduledFor);
      const apiFormData = {
        ...formData,
        scheduledFor: scheduledDate.toISOString(),
      };

      console.log("Original form data:", formData);
      console.log("Parsed scheduled date:", scheduledDate);
      console.log("API form data:", apiFormData);

      // Test if server is reachable first
      try {
        const testResponse = await fetch("/api/CinemaQueue");
        console.log("Server test response status:", testResponse.status);
      } catch (testError) {
        console.error("Server test failed:", testError);
        showToast(
          createErrorToast(
            "Сервер недоступен. Проверьте, запущен ли сервер.",
            testError
          )
        );
        return;
      }

      const response = await cinemaQueueApi.cinemaQueueCreate(apiFormData);
      console.log("API response:", response);
      console.log("Response data:", response.data);
      console.log("Response status:", response.status);
      if (response.status === 200) {
        showToast(
          createSuccessToast("Медиа элемент успешно создан", response.data)
        );
        setModalVisible(false);
        setFormData({
          title: "",
          description: "",
          mediaUrl: "",
          priority: 1,
          scheduledFor: new Date(Date.now() + 60 * 60 * 1000)
            .toISOString()
            .slice(0, 16), // Default to 1 hour from now
          addedBy: "",
          twitchUsername: "",
          notes: "",
        });
        fetchMediaItems();
        fetchStatistics();
      } else {
        showToast(
          createErrorToast(
            "Не удалось создать медиа элемент",
            new Error("API Error")
          )
        );
      }
    } catch (error) {
      console.error("Full error object:", error);
      console.error(
        "Error message:",
        error instanceof Error ? error.message : String(error)
      );
      console.error(
        "Error stack:",
        error instanceof Error ? error.stack : "No stack trace"
      );

      let errorMessage = "Ошибка при создании медиа элемента";
      if (error instanceof Error) {
        errorMessage += `: ${error.message}`;
      }

      showToast(createErrorToast(errorMessage, error));
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    // Ensure scheduledFor has a value to prevent NOT NULL constraint violation
    const scheduledFor =
      editFormData.scheduledFor ||
      editingItem.scheduledFor ||
      new Date().toISOString();

    // Validate that scheduledFor is a valid date
    const scheduledDate = new Date(scheduledFor);
    if (isNaN(scheduledDate.getTime())) {
      showToast(
        createErrorToast(
          "Неверный формат даты в поле 'Scheduled For'",
          new Error("Validation Error")
        )
      );
      return;
    }

    // Ensure the date is in the future
    if (scheduledDate <= new Date()) {
      showToast(
        createErrorToast(
          "Дата должна быть в будущем",
          new Error("Validation Error")
        )
      );
      return;
    }

    const updateData = {
      ...editFormData,
      scheduledFor: scheduledFor,
    };

    try {
      // Convert datetime-local string to ISO string for the API if it exists
      const apiUpdateData: UpdateMediaItemRequest = {
        ...updateData,
        status: updateData.status || UpdateMediaItemRequestStatusEnum.Pending,
        scheduledFor: updateData.scheduledFor
          ? new Date(updateData.scheduledFor).toISOString()
          : undefined,
      };

      console.log("Original update data:", updateData);
      console.log("API update data:", apiUpdateData);

      const response = await cinemaQueueApi.cinemaQueueUpdate(
        editingItem.id,
        apiUpdateData
      );
      if (response.status === 200) {
        showToast(
          createSuccessToast("Медиа элемент успешно обновлен", response.data)
        );
        setEditingItem(null);
        setEditFormData({});
        fetchMediaItems();
        fetchStatistics();
      } else {
        showToast(
          createErrorToast(
            "Не удалось обновить медиа элемент",
            new Error("API Error")
          )
        );
      }
    } catch (error) {
      console.error("Full error object:", error);
      console.error(
        "Error message:",
        error instanceof Error ? error.message : String(error)
      );
      console.error(
        "Error stack:",
        error instanceof Error ? error.stack : "No stack trace"
      );

      let errorMessage = "Ошибка при обновлении медиа элемента";
      if (error instanceof Error) {
        errorMessage += `: ${error.message}`;
      }

      showToast(createErrorToast(errorMessage, error));
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await cinemaQueueApi.cinemaQueueDelete(id);
      if (response.status === 200) {
        showToast(createSuccessToast("Медиа элемент успешно удален"));
        fetchMediaItems();
        fetchStatistics();
      } else {
        showToast(
          createErrorToast(
            "Не удалось удалить медиа элемент",
            new Error("API Error")
          )
        );
      }
    } catch (error) {
      showToast(createErrorToast("Ошибка при удалении медиа элемента", error));
      console.error("Error:", error);
    }
  };

  const handleMarkAsNext = async (id: string) => {
    try {
      const response = await cinemaQueueApi.cinemaQueueMarkAsNextCreate(id);
      if (response.status === 200) {
        showToast(createSuccessToast("Медиа элемент отмечен как следующий"));
        fetchMediaItems();
      } else {
        showToast(
          createErrorToast(
            "Не удалось отметить медиа элемент как следующий",
            new Error("API Error")
          )
        );
      }
    } catch (error) {
      showToast(
        createErrorToast(
          "Ошибка при отметке медиа элемента как следующего",
          error
        )
      );
      console.error("Error:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "primary";
      case "InProgress":
        return "warning";
      case "Completed":
        return "success";
      case "Cancelled":
        return "danger";
      case "Postponed":
        return "info";
      default:
        return "secondary";
    }
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 5) return "danger";
    if (priority >= 3) return "warning";
    return "success";
  };

  const handleInputChange = (
    field: keyof CreateMediaItemRequest,
    value: string | number
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEditInputChange = (
    field: keyof UpdateMediaItemRequest,
    value: string | number | boolean
  ) => {
    setEditFormData(prev => ({ ...prev, [field]: value }));
  };

  const openEditModal = (item: MediaItem) => {
    setEditingItem(item);
    setEditFormData({
      title: item.title,
      description: item.description,
      mediaUrl: item.mediaUrl,
      status: item.status as UpdateMediaItemRequestStatusEnum,
      priority: item.priority,
      scheduledFor: item.scheduledFor,
      isNext: item.isNext,
      notes: item.notes,
    });
  };

  return (
    <div className={styles.cinemaQueuePage} style={pageStyles}>
      <div className={styles.header} style={headerStyles}>
        <h1 style={{ color: "var(--site-text-accent)" }}>
          Cinema Queue Management
        </h1>
        <div className="d-flex gap-2">
          <Button
            variant="primary"
            onClick={() => setModalVisible(true)}
            size="lg"
          >
            <Plus className="me-2" />
            Add New Item
          </Button>
          <Button
            variant="outline-secondary"
            onClick={async () => {
              try {
                const response = await fetch("/api/CinemaQueue");
                console.log(
                  "API test response:",
                  response.status,
                  response.statusText
                );
                if (response.ok) {
                  showToast(
                    createSuccessToast("API доступен", {
                      status: response.status,
                    })
                  );
                } else {
                  showToast(
                    createErrorToast(
                      "API недоступен",
                      new Error(`Status: ${response.status}`)
                    )
                  );
                }
              } catch (error) {
                console.error("API test error:", error);
                showToast(createErrorToast("Ошибка подключения к API", error));
              }
            }}
            size="lg"
          >
            Test API
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      {statistics && (
        <Row className={styles.statisticsRow}>
          <Col md={2}>
            <Card style={cardStyles} id="stat-total">
              <Card.Body className="text-center">
                <h3
                  className="mb-1"
                  style={{ color: "var(--site-text-primary)" }}
                >
                  {statistics.totalItems}
                </h3>
                <p
                  className="mb-0"
                  style={{ color: "var(--site-text-secondary)" }}
                >
                  Total Items
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={2}>
            <Card style={cardStyles} id="stat-pending">
              <Card.Body className="text-center">
                <h3 className="mb-1" style={{ color: "var(--site-text-info)" }}>
                  {statistics.pendingItems}
                </h3>
                <p
                  className="mb-0"
                  style={{ color: "var(--site-text-secondary)" }}
                >
                  Pending
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={2}>
            <Card style={cardStyles} id="stat-in-progress">
              <Card.Body className="text-center">
                <h3
                  className="mb-1"
                  style={{ color: "var(--site-text-warning)" }}
                >
                  {statistics.inProgressItems}
                </h3>
                <p
                  className="mb-0"
                  style={{ color: "var(--site-text-secondary)" }}
                >
                  In Progress
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={2}>
            <Card style={cardStyles} id="stat-completed">
              <Card.Body className="text-center">
                <h3
                  className="mb-1"
                  style={{ color: "var(--site-text-success)" }}
                >
                  {statistics.completedItems}
                </h3>
                <p
                  className="mb-0"
                  style={{ color: "var(--site-text-secondary)" }}
                >
                  Completed
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={2}>
            <Card style={cardStyles} id="stat-cancelled">
              <Card.Body className="text-center">
                <h3
                  className="mb-1"
                  style={{ color: "var(--site-text-danger)" }}
                >
                  {statistics.cancelledItems}
                </h3>
                <p
                  className="mb-0"
                  style={{ color: "var(--site-text-secondary)" }}
                >
                  Cancelled
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={2}>
            <Card style={cardStyles} id="stat-postponed">
              <Card.Body className="text-center">
                <h3
                  className="mb-1"
                  style={{ color: "var(--site-text-accent)" }}
                >
                  {statistics.postponedItems}
                </h3>
                <p
                  className="mb-0"
                  style={{ color: "var(--site-text-secondary)" }}
                >
                  Postponed
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Media Items Table */}
      <Card className={styles.tableCard} style={tableStyles}>
        <Card.Header>
          <h5 className="mb-0">Queue Items</h5>
        </Card.Header>
        <Card.Body className="p-0">
          <Table responsive striped hover>
            <thead>
              <tr>
                <th style={{ width: "60px" }}>Next</th>
                <th>Title</th>
                <th style={{ width: "120px" }}>Status</th>
                <th style={{ width: "80px" }}>Priority</th>
                <th style={{ width: "120px" }}>Added By</th>
                <th style={{ width: "200px" }}>Scheduled For</th>
                <th style={{ width: "120px" }}>Created</th>
                <th style={{ width: "400px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mediaItems.map(item => (
                <tr key={item.id} className={item.isNext ? styles.nextRow : ""}>
                  <td>
                    {item.isNext && (
                      <Badge bg="success">
                        <PlayCircle className="me-1" />
                        NEXT
                      </Badge>
                    )}
                  </td>
                  <td>
                    <div className={styles.titleCell}>
                      <div>
                        <div className={styles.titleText}>{item.title}</div>
                        {item.description && (
                          <div className={styles.descriptionText}>
                            {item.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <Badge bg={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </td>
                  <td>
                    <Badge bg={getPriorityColor(item.priority)}>
                      {item.priority}
                    </Badge>
                  </td>
                  <td>
                    <div>
                      <div>{item.addedBy}</div>
                      {item.twitchUsername && (
                        <div className={styles.twitchUsername}>
                          @{item.twitchUsername}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    {item.scheduledFor
                      ? new Date(item.scheduledFor).toLocaleString()
                      : "Not scheduled"}
                  </td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="d-flex gap-1">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleMarkAsNext(item.id)}
                        disabled={item.isNext}
                      >
                        <PlayCircle className="me-1" />
                        Mark Next
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => openEditModal(item)}
                      >
                        <Pencil className="me-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash className="me-1" />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {loading && (
            <div className="text-center p-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Create Modal */}
      <Modal
        show={modalVisible}
        onHide={() => {
          setModalVisible(false);
          setFormData({
            title: "",
            description: "",
            mediaUrl: "",
            priority: 1,
            scheduledFor: new Date(Date.now() + 60 * 60 * 1000)
              .toISOString()
              .slice(0, 16), // Default to 1 hour from now
            addedBy: "",
            twitchUsername: "",
            notes: "",
          });
        }}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Media Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreate}>
            <Form.Group className="mb-3">
              <Form.Label>Title *</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={e => handleInputChange("title", e.target.value)}
                placeholder="Enter title"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={e => handleInputChange("description", e.target.value)}
                placeholder="Enter description"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Media URL *</Form.Label>
              <Form.Control
                type="url"
                value={formData.mediaUrl}
                onChange={e => handleInputChange("mediaUrl", e.target.value)}
                placeholder="Enter media URL"
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Priority</Form.Label>
                  <Form.Select
                    value={formData.priority}
                    onChange={e =>
                      handleInputChange("priority", parseInt(e.target.value))
                    }
                  >
                    <option value={1}>1 - Low</option>
                    <option value={2}>2 - Normal</option>
                    <option value={3}>3 - Medium</option>
                    <option value={4}>4 - High</option>
                    <option value={5}>5 - Critical</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Scheduled For *</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={formData.scheduledFor || ""}
                    onChange={e =>
                      handleInputChange("scheduledFor", e.target.value)
                    }
                    placeholder="Select date and time"
                    required
                  />
                  <Form.Text className="text-muted">
                    Выберите дату и время для показа медиа элемента
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Added By</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.addedBy}
                    onChange={e => handleInputChange("addedBy", e.target.value)}
                    placeholder="Enter your name"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Twitch Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.twitchUsername}
                    onChange={e =>
                      handleInputChange("twitchUsername", e.target.value)
                    }
                    placeholder="Enter Twitch username (optional)"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={formData.notes}
                onChange={e => handleInputChange("notes", e.target.value)}
                placeholder="Additional notes"
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" variant="primary">
                Create
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setModalVisible(false);
                  setFormData({
                    title: "",
                    description: "",
                    mediaUrl: "",
                    priority: 1,
                    scheduledFor: new Date(Date.now() + 60 * 60 * 1000)
                      .toISOString()
                      .slice(0, 16), // Default to 1 hour from now
                    addedBy: "",
                    twitchUsername: "",
                    notes: "",
                  });
                }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Modal */}
      <Modal
        show={!!editingItem}
        onHide={() => {
          setEditingItem(null);
          setEditFormData({});
        }}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Media Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Title *</Form.Label>
              <Form.Control
                type="text"
                value={editFormData.title || ""}
                onChange={e => handleEditInputChange("title", e.target.value)}
                placeholder="Enter title"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editFormData.description || ""}
                onChange={e =>
                  handleEditInputChange("description", e.target.value)
                }
                placeholder="Enter description"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Media URL</Form.Label>
              <Form.Control
                type="url"
                value={editFormData.mediaUrl || ""}
                onChange={e =>
                  handleEditInputChange("mediaUrl", e.target.value)
                }
                placeholder="Enter media URL"
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={editFormData.status || ""}
                    onChange={e =>
                      handleEditInputChange("status", e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="InProgress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Postponed">Postponed</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Priority</Form.Label>
                  <Form.Select
                    value={editFormData.priority || ""}
                    onChange={e =>
                      handleEditInputChange(
                        "priority",
                        parseInt(e.target.value)
                      )
                    }
                  >
                    <option value={1}>1 - Low</option>
                    <option value={2}>2 - Normal</option>
                    <option value={3}>3 - Medium</option>
                    <option value={4}>4 - High</option>
                    <option value={5}>5 - Critical</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Scheduled For</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={editFormData.scheduledFor || ""}
                    onChange={e =>
                      handleEditInputChange("scheduledFor", e.target.value)
                    }
                    placeholder="Select date and time"
                  />
                  <Form.Text className="text-muted">
                    Выберите дату и время для показа медиа элемента
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Mark as Next</Form.Label>
                  <Form.Select
                    value={editFormData.isNext?.toString() || ""}
                    onChange={e =>
                      handleEditInputChange("isNext", e.target.value === "true")
                    }
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Mark as Next</Form.Label>
                  <Form.Select
                    value={editFormData.isNext?.toString() || ""}
                    onChange={e =>
                      handleEditInputChange("isNext", e.target.value === "true")
                    }
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={editFormData.notes || ""}
                onChange={e => handleEditInputChange("notes", e.target.value)}
                placeholder="Additional notes"
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" variant="primary">
                Update
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setEditingItem(null);
                  setEditFormData({});
                }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CinemaQueuePage;
