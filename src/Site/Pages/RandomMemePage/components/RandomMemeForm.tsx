import React, { useEffect, useState } from "react";
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
import { ArrowLeft, Save } from "lucide-react";


import {
  RandomMemeFormProps,
  MemeFormData,
  MemeTypeFormData,
  MemeOrderFormData,
} from "../RandomMemePage.types";

const RandomMemeForm: React.FC<RandomMemeFormProps> = ({
  memeType,
  memeOrder,
  memeTypes = [],
  isSubmitting,
  mode,
  onSubmit,
  onCancel,
}) => {
  const isType = !!memeType;
  const isEdit = mode === "edit";

  // Состояние формы
  const [formData, setFormData] = useState<MemeFormData>(
    isType
      ? {
          name: memeType?.name || "",
          folderPath: memeType?.folderPath || "",
        }
      : {
          filePath: memeOrder?.filePath || "",
          memeTypeId: memeOrder?.memeTypeId || 0,
          order: memeOrder?.order || 1,
        }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string>("");

  // Обновление формы при изменении пропсов
  useEffect(() => {
    if (isType && memeType) {
      setFormData({
        name: memeType.name,
        folderPath: memeType.folderPath,
      });
    } else if (!isType && memeOrder) {
      setFormData({
        filePath: memeOrder.filePath,
        memeTypeId: memeOrder.memeTypeId || 0,
        order: memeOrder.order,
      });
    }
  }, [memeType, memeOrder, isType]);

  // Обработчик изменения полей
  const handleInputChange = (
    field: string,
    value: string | number
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Очистка ошибки поля при изменении
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // Валидация формы
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (isType) {
      const typeData = formData as MemeTypeFormData;
      if (!typeData.name.trim()) {
        newErrors.name = "Название типа обязательно";
      } else if (typeData.name.length > 50) {
        newErrors.name = "Название не может быть длиннее 50 символов";
      }

      if (!typeData.folderPath.trim()) {
        newErrors.folderPath = "Путь к папке обязателен";
      }
    } else {
      const orderData = formData as MemeOrderFormData;
      if (!orderData.filePath.trim()) {
        newErrors.filePath = "Путь к файлу обязателен";
      }

      if (!orderData.memeTypeId || orderData.memeTypeId <= 0) {
        newErrors.memeTypeId = "Необходимо выбрать тип мема";
      }

      if (orderData.order < 1) {
        newErrors.order = "Порядок должен быть положительным числом";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData as unknown as Record<string, unknown>);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : `Ошибка ${isEdit ? "обновления" : "создания"} ${isType ? "типа" : "заказа"}`
      );
    }
  };

  // Рендер формы типа мема
  const renderTypeForm = () => {
    const data = formData as MemeTypeFormData;

    return (
      <Row className="g-3">
        <Col md={12}>
          <Form.Group>
            <Form.Label className="fw-bold">
              Название типа <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={data.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              isInvalid={!!errors.name}
              placeholder="Введите название типа мема"
              maxLength={50}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Максимум 50 символов
            </Form.Text>
          </Form.Group>
        </Col>

        <Col md={12}>
          <Form.Group>
            <Form.Label className="fw-bold">
              Путь к папке <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={data.folderPath}
              onChange={(e) => handleInputChange("folderPath", e.target.value)}
              isInvalid={!!errors.folderPath}
              placeholder="Введите путь к папке с мемами"
            />
            <Form.Control.Feedback type="invalid">
              {errors.folderPath}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Абсолютный или относительный путь к папке
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>
    );
  };

  // Рендер формы заказа мема
  const renderOrderForm = () => {
    const data = formData as MemeOrderFormData;

    return (
      <Row className="g-3">
        <Col md={12}>
          <Form.Group>
            <Form.Label className="fw-bold">
              Путь к файлу <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={data.filePath}
              onChange={(e) => handleInputChange("filePath", e.target.value)}
              isInvalid={!!errors.filePath}
              placeholder="Введите путь к файлу мема"
            />
            <Form.Control.Feedback type="invalid">
              {errors.filePath}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Полный путь к файлу мема
            </Form.Text>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label className="fw-bold">
              Тип мема <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              value={data.memeTypeId}
              onChange={(e) => handleInputChange("memeTypeId", parseInt(e.target.value))}
              isInvalid={!!errors.memeTypeId}
            >
              <option value={0}>Выберите тип мема</option>
              {memeTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name} (ID: {type.id})
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.memeTypeId}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label className="fw-bold">
              Порядок <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={data.order}
              onChange={(e) => handleInputChange("order", parseInt(e.target.value) || 1)}
              isInvalid={!!errors.order}
              placeholder="1"
            />
            <Form.Control.Feedback type="invalid">
              {errors.order}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Порядок отображения в рандомизации
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>
    );
  };

  return (
    <Container fluid className="py-4">
      {/* Заголовок */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="d-flex align-items-center gap-3 mb-2">
                <Save size={32} />
                {isEdit ? "Редактирование" : "Создание"} {isType ? "типа мема" : "заказа мема"}
              </h1>
              <p className="text-muted mb-0">
                {isEdit
                  ? `Редактирование ${isType ? "типа мема" : "заказа мема"}`
                  : `Создание нового ${isType ? "типа мема" : "заказа мема"}`
                }
              </p>
            </div>

            <Button
              variant="outline-secondary"
              onClick={onCancel}
              className="d-flex align-items-center gap-2"
            >
              <ArrowLeft size={16} />
              Отмена
            </Button>
          </div>
        </Col>
      </Row>

      {/* Ошибка отправки */}
      {submitError && (
        <Row className="mb-4">
          <Col>
            <Alert variant="danger">
              <Alert.Heading>Ошибка сохранения</Alert.Heading>
              <p className="mb-0">{submitError}</p>
            </Alert>
          </Col>
        </Row>
      )}

      {/* Форма */}
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">
                {isType ? "Параметры типа мема" : "Параметры заказа мема"}
              </h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                {isType ? renderTypeForm() : renderOrderForm()}

                {/* Кнопки действий */}
                <Row className="mt-4">
                  <Col>
                    <div className="d-flex gap-3 justify-content-end">
                      <Button
                        variant="outline-secondary"
                        onClick={onCancel}
                        disabled={isSubmitting}
                      >
                        Отмена
                      </Button>

                      <Button
                        variant="primary"
                        type="submit"
                        disabled={isSubmitting}
                        className="d-flex align-items-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <Spinner animation="border" size="sm" />
                            Сохранение...
                          </>
                        ) : (
                          <>
                            <Save size={16} />
                            {isEdit ? "Сохранить изменения" : "Создать"}
                          </>
                        )}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Информация о валидации */}
      <Row className="mt-4">
        <Col>
          <Alert variant="info">
            <Alert.Heading>Правила валидации</Alert.Heading>
            <ul className="mb-0">
              {isType ? (
                <>
                  <li>Название типа обязательно и не может быть длиннее 50 символов</li>
                  <li>Путь к папке обязателен</li>
                </>
              ) : (
                <>
                  <li>Путь к файлу обязателен</li>
                  <li>Необходимо выбрать тип мема</li>
                  <li>Порядок должен быть положительным числом</li>
                </>
              )}
            </ul>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default RandomMemeForm;
