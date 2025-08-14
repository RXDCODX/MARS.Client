import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from "react-bootstrap";

import { useToastModal } from "./ToastModal.hooks";
import { ToastModalData } from "./ToastModal.types";

// Пример компонента с демонстрацией различных типов тостов
export const ToastModalExamples: React.FC = () => {
  const { showToast } = useToastModal();

  const showSimpleToast = () => {
    showToast({
      type: "info",
      message: "Простое информационное сообщение",
      title: "Информация",
    });
  };

  const showSuccessToast = () => {
    showToast({
      type: "success",
      message: "Операция выполнена успешно!",
      title: "Успех",
      timestamp: new Date(),
    });
  };

  const showWarningToast = () => {
    showToast({
      type: "warning",
      message: "Внимание! Это предупреждение.",
      title: "Предупреждение",
      timestamp: new Date(),
    });
  };

  const showErrorToast = () => {
    showToast({
      type: "error",
      message: "Произошла ошибка при выполнении операции.",
      title: "Ошибка",
      timestamp: new Date(),
    });
  };

  const showToastWithData = () => {
    const userData = {
      id: 12345,
      name: "Иван Иванов",
      email: "ivan@example.com",
      role: "admin",
      lastLogin: "2024-01-15T10:30:00Z",
      preferences: {
        theme: "dark",
        language: "ru",
        notifications: true,
      },
    };

    showToast({
      type: "info",
      message: "Получены данные пользователя",
      title: "Данные пользователя",
      data: userData,
      timestamp: new Date(),
      metadata: {
        source: "API",
        version: "1.0.0",
        requestId: "req-12345",
      },
    });
  };

  const showToastWithComplexData = () => {
    const complexData = {
      orders: [
        { id: 1, product: "Телефон", price: 25000, status: "доставлен" },
        { id: 2, product: "Ноутбук", price: 45000, status: "в пути" },
        { id: 3, product: "Наушники", price: 5000, status: "отменен" },
      ],
      statistics: {
        totalOrders: 3,
        totalRevenue: 75000,
        averageOrderValue: 25000,
        successRate: 0.67,
      },
    };

    showToast({
      type: "success",
      message: "Статистика заказов загружена",
      title: "Статистика заказов",
      data: complexData,
      timestamp: new Date(),
      metadata: {
        period: "Январь 2024",
        dataSource: "Database",
        lastUpdated: "2024-01-15T15:45:00Z",
      },
    });
  };

  const showToastWithCustomClick = () => {
    const toastData: ToastModalData = {
      type: "info",
      message: "Нажмите на этот тост, чтобы открыть модальное окно!",
      title: "Интерактивный тост",
      data: {
        message: "Это модальное окно открылось при клике на тост!",
        timestamp: new Date().toISOString(),
        action: "toast_click",
      },
    };

    showToast(toastData);
  };

  return (
    <div className="p-4">
      <h2 className="mb-4">Примеры использования ToastModal</h2>

      <Row className="g-4">
        <Col md={6} lg={4}>
          <Card>
            <CardHeader>
              <CardTitle>Простой тост</CardTitle>
            </CardHeader>
            <CardBody>
              <Button
                variant="info"
                onClick={showSimpleToast}
                className="w-100"
              >
                Показать информационный тост
              </Button>
            </CardBody>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card>
            <CardHeader>
              <CardTitle>Успешный тост</CardTitle>
            </CardHeader>
            <CardBody>
              <Button
                variant="success"
                onClick={showSuccessToast}
                className="w-100"
              >
                Показать успешный тост
              </Button>
            </CardBody>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card>
            <CardHeader>
              <CardTitle>Предупреждение</CardTitle>
            </CardHeader>
            <CardBody>
              <Button
                variant="warning"
                onClick={showWarningToast}
                className="w-100"
              >
                Показать предупреждение
              </Button>
            </CardBody>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card>
            <CardHeader>
              <CardTitle>Ошибка</CardTitle>
            </CardHeader>
            <CardBody>
              <Button
                variant="danger"
                onClick={showErrorToast}
                className="w-100"
              >
                Показать ошибку
              </Button>
            </CardBody>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card>
            <CardHeader>
              <CardTitle>Тост с данными</CardTitle>
            </CardHeader>
            <CardBody>
              <Button
                variant="primary"
                onClick={showToastWithData}
                className="w-100"
              >
                Тост с данными пользователя
              </Button>
            </CardBody>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card>
            <CardHeader>
              <CardTitle>Сложные данные</CardTitle>
            </CardHeader>
            <CardBody>
              <Button
                variant="secondary"
                onClick={showToastWithComplexData}
                className="w-100"
              >
                Тост со статистикой
              </Button>
            </CardBody>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card>
            <CardHeader>
              <CardTitle>Интерактивный тост</CardTitle>
            </CardHeader>
            <CardBody>
              <Button
                variant="outline-primary"
                onClick={showToastWithCustomClick}
                className="w-100"
              >
                Кликните на тост!
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <div className="mt-4 p-3 bg-light rounded">
        <h5>Инструкция по использованию:</h5>
        <ol>
          <li>Нажмите на любую кнопку выше, чтобы показать тост</li>
          <li>Тосты автоматически исчезают через 5 секунд (по умолчанию)</li>
          <li>
            Кликните на тост, чтобы открыть модальное окно с подробностями
          </li>
          <li>
            В модальном окне можно просмотреть все данные, метаданные и
            временные метки
          </li>
        </ol>
      </div>
    </div>
  );
};

export default ToastModalExamples;
