import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import { allRoutes, RouteConfig } from "@/routes/config";
import { useSiteColors } from "@/shared/Utils/useSiteColors";

import styles from "./RoutesPage.module.scss";

const RoutesPage: React.FC = () => {
  const colors = useSiteColors();

  // Группируем роуты по типам
  const groupedRoutes = allRoutes.reduce(
    (acc, route) => {
      if (!acc[route.type]) {
        acc[route.type] = [];
      }
      acc[route.type].push(route);
      return acc;
    },
    {} as Record<string, RouteConfig[]>
  );

  // Функция для получения цвета бейджа в зависимости от типа
  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "site":
        return "primary";
      case "obs":
        return "success";
      case "control panel":
        return "warning";
      case "special":
        return "info";
      default:
        return "secondary";
    }
  };

  // Функция для получения иконки в зависимости от типа
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "site":
        return "bi-globe";
      case "obs":
        return "bi-camera-video";
      case "control panel":
        return "bi-gear";
      case "special":
        return "bi-star";
      default:
        return "bi-link";
    }
  };

  // Функция для получения названия типа на русском
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "site":
        return "Страницы сайта";
      case "obs":
        return "OBS Компоненты";
      case "control panel":
        return "Панель управления";
      case "special":
        return "Специальные";
      default:
        return type;
    }
  };

  return (
    <Container className={styles.container}>
      <div className={styles.header}>
        <h1
          className={styles.title}
          style={colors.utils.getTextStyle("primary")}
        >
          Все маршруты приложения
        </h1>
        <p
          className={styles.subtitle}
          style={colors.utils.getTextStyle("secondary")}
        >
          Полный список всех доступных страниц и компонентов
        </p>
      </div>

      <Row>
        {Object.entries(groupedRoutes).map(([type, routes]) => (
          <Col key={type} lg={4} md={6} className="mb-4">
            <Card
              className={styles.typeCard}
              style={{
                backgroundColor: colors.background.card,
                border: `1px solid ${colors.border.primary}`,
                boxShadow: colors.shadow.medium,
              }}
            >
              <Card.Header
                className={styles.cardHeader}
                style={{
                  backgroundColor: colors.background.secondary,
                  borderBottom: `1px solid ${colors.border.primary}`,
                }}
              >
                <div className={styles.typeHeader}>
                  <i
                    className={`bi ${getTypeIcon(type)} me-2`}
                    style={colors.utils.getTextStyle("primary")}
                  ></i>
                  <h3
                    className={styles.typeTitle}
                    style={colors.utils.getTextStyle("primary")}
                  >
                    {getTypeLabel(type)}
                  </h3>
                  <Badge
                    bg={getBadgeVariant(type)}
                    className={styles.routeCount}
                  >
                    {routes.length}
                  </Badge>
                </div>
              </Card.Header>
              <Card.Body className={styles.cardBody}>
                <div className={styles.routesList}>
                  {routes.map((route, index) => (
                    <div key={index} className={styles.routeItem}>
                      <Link
                        to={route.path}
                        className={styles.routeLink}
                        style={colors.utils.getTextStyle("primary")}
                      >
                        <div className={styles.routeInfo}>
                          <span className={styles.routeName}>
                            {route.name || route.path}
                          </span>
                          <span className={styles.routePath}>{route.path}</span>
                        </div>
                        <i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className={styles.stats}>
        <Card
          className={styles.statsCard}
          style={{
            backgroundColor: colors.background.card,
            border: `1px solid ${colors.border.primary}`,
            boxShadow: colors.shadow.medium,
          }}
        >
          <Card.Body className={styles.statsBody}>
            <Row>
              <Col md={3} className="text-center">
                <div className={styles.statItem}>
                  <h4
                    className={styles.statNumber}
                    style={colors.utils.getTextStyle("primary")}
                  >
                    {allRoutes.length}
                  </h4>
                  <p
                    className={styles.statLabel}
                    style={colors.utils.getTextStyle("secondary")}
                  >
                    Всего маршрутов
                  </p>
                </div>
              </Col>
              <Col md={3} className="text-center">
                <div className={styles.statItem}>
                  <h4
                    className={styles.statNumber}
                    style={colors.utils.getTextStyle("primary")}
                  >
                    {groupedRoutes.site?.length || 0}
                  </h4>
                  <p
                    className={styles.statLabel}
                    style={colors.utils.getTextStyle("secondary")}
                  >
                    Страниц сайта
                  </p>
                </div>
              </Col>
              <Col md={3} className="text-center">
                <div className={styles.statItem}>
                  <h4
                    className={styles.statNumber}
                    style={colors.utils.getTextStyle("primary")}
                  >
                    {groupedRoutes.obs?.length || 0}
                  </h4>
                  <p
                    className={styles.statLabel}
                    style={colors.utils.getTextStyle("secondary")}
                  >
                    OBS компонентов
                  </p>
                </div>
              </Col>
              <Col md={3} className="text-center">
                <div className={styles.statItem}>
                  <h4
                    className={styles.statNumber}
                    style={colors.utils.getTextStyle("primary")}
                  >
                    {groupedRoutes["control panel"]?.length || 0}
                  </h4>
                  <p
                    className={styles.statLabel}
                    style={colors.utils.getTextStyle("secondary")}
                  >
                    Панелей управления
                  </p>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default RoutesPage;
