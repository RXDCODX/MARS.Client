import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useSiteColors } from "../../shared/Utils/useSiteColors";
import styles from "./WelcomePage.module.scss";

const WelcomePage: React.FC = () => {
  const colors = useSiteColors();

  const features = [
    {
      icon: "🎮",
      title: "OBS Компоненты",
      description:
        "Множество готовых компонентов для OBS Studio: чаты, алерты, анимации и многое другое.",
      link: "/pyroalerts",
    },
    {
      icon: "⚙️",
      title: "Панель управления",
      description:
        "Мощная админ-панель для управления всеми аспектами вашего стрима.",
      link: "/admin",
    },
    {
      icon: "📊",
      title: "Аналитика",
      description:
        "Детальная статистика и аналитика для отслеживания успеха вашего контента.",
      link: "/dashboard",
    },
    {
      icon: "🔧",
      title: "API Интеграция",
      description: "Полная интеграция с различными платформами и сервисами.",
      link: "/services",
    },
    {
      icon: "⌨️",
      title: "Выполнение команд",
      description:
        "Интерфейс для выполнения команд с разделенными инпутами для разных параметров.",
      link: "/commands",
    },
  ];

  const obsComponents = [
    {
      name: "Pyro Alerts",
      path: "/pyroalerts",
      description: "Красивые алерты для донатов",
    },
    {
      name: "Waifu Alerts",
      path: "/waifu",
      description: "Алерты с аниме персонажами",
    },
    {
      name: "Chat Horizontal",
      path: "/chath",
      description: "Горизонтальный чат",
    },
    { name: "Chat Vertical", path: "/chatv", description: "Вертикальный чат" },
    { name: "Fumo Friday", path: "/fumofriday", description: "Пятничные фумо" },
    {
      name: "Screen Particles",
      path: "/confetti",
      description: "Экранные эффекты",
    },
  ];

  return (
    <Container className="text-wrap text-center align-content-center text-text-bg-primary align-align-items-center">
      <div className={styles.welcomePage}>
        {/* Hero Section */}
        <section
          className={`${styles.hero} w-100 py-5`}
          style={{
            backgroundColor: colors.background.secondary,
            color: colors.text.primary,
          }}
        >
          <Container>
            <Row className="align-items-center flex-column">
              <Col lg={8} className="text-center">
                <h1
                  className="display-4 fw-bold mb-4"
                  style={colors.utils.getTextStyle("primary")}
                >
                  Добро пожаловать в{" "}
                  <span style={{ color: colors.text.accent }}>MARS Client</span>
                </h1>
                <p
                  className="lead mb-4"
                  style={colors.utils.getTextStyle("secondary")}
                >
                  Мощная платформа для создания профессиональных стримов с
                  интерактивными компонентами
                </p>
              </Col>
              <Col lg={4} className="text-center mt-4 mt-lg-0">
                <div
                  className={styles.floatingCard}
                  style={{
                    backgroundColor: colors.background.card,
                    borderColor: colors.border.primary,
                    boxShadow: colors.shadow.medium,
                  }}
                >
                  <Card
                    className="border-0 shadow-lg"
                    style={{ backgroundColor: colors.background.card }}
                  >
                    <Card.Body className="text-center p-4">
                      <div className="display-4 mb-3">🚀</div>
                      <h3 style={colors.utils.getTextStyle("primary")}>
                        Быстрый старт
                      </h3>
                      <p style={colors.utils.getTextStyle("secondary")}>
                        Начните использовать компоненты за минуты
                      </p>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Features Section */}
        <section
          className="py-5"
          style={{ backgroundColor: colors.background.primary }}
        >
          <Container>
            <Row className="text-center mb-5">
              <Col>
                <h2
                  className="display-5 fw-bold mb-3"
                  style={colors.utils.getTextStyle("primary")}
                >
                  Возможности платформы
                </h2>
              </Col>
            </Row>
            <Row className="g-4">
              {features.map((feature, index) => (
                <Col key={index} lg={3} md={6}>
                  <Card
                    className="h-100 border-0 shadow-sm"
                    style={{
                      backgroundColor: colors.background.card,
                      borderColor: colors.border.primary,
                      boxShadow: colors.shadow.light,
                    }}
                  >
                    <Card.Body className="text-center p-4">
                      <div className="display-6 mb-3">{feature.icon}</div>
                      <h3
                        className="h5 mb-3"
                        style={colors.utils.getTextStyle("primary")}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className="mb-3"
                        style={colors.utils.getTextStyle("secondary")}
                      >
                        {feature.description}
                      </p>
                      <Link
                        to={feature.link}
                        className="btn btn-outline-primary btn-sm"
                        style={{
                          borderColor: colors.border.accent,
                          color: colors.text.accent,
                        }}
                      >
                        Узнать больше →
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* OBS Components Section */}
        <section
          className="py-5"
          style={{ backgroundColor: colors.background.secondary }}
        >
          <Container>
            <Row className="text-center mb-5">
              <Col>
                <h2
                  className="display-5 fw-bold mb-3"
                  style={colors.utils.getTextStyle("primary")}
                >
                  OBS Компоненты
                </h2>
                <p
                  className="lead"
                  style={colors.utils.getTextStyle("secondary")}
                >
                  Готовые компоненты для интеграции в OBS Studio
                </p>
              </Col>
            </Row>
            <Row className="g-4">
              {obsComponents.map((component, index) => (
                <Col key={index} lg={4} md={6}>
                  <Card
                    as={Link}
                    to={component.path}
                    className="h-100 border-0 shadow-sm text-decoration-none"
                    style={{
                      backgroundColor: colors.background.card,
                      borderColor: colors.border.primary,
                      boxShadow: colors.shadow.light,
                    }}
                  >
                    <Card.Body className="p-4">
                      <h3
                        className="h5 mb-2"
                        style={colors.utils.getTextStyle("primary")}
                      >
                        {component.name}
                      </h3>
                      <p
                        className="mb-3"
                        style={colors.utils.getTextStyle("secondary")}
                      >
                        {component.description}
                      </p>
                      <div style={{ color: colors.text.accent }}>→</div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* CTA Section */}
        <section
          className="py-5"
          style={{
            backgroundColor: colors.background.accent,
            color: colors.text.light,
          }}
        >
          <Container>
            <Row className="text-center">
              <Col>
                <h2
                  className="display-5 fw-bold mb-3"
                  style={colors.utils.getTextStyle("light")}
                >
                  Готовы начать?
                </h2>
                <p
                  className="lead mb-4"
                  style={{ color: colors.text.light, opacity: 0.9 }}
                >
                  Присоединяйтесь к тысячам стримеров, которые уже используют
                  MARS Client
                </p>
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                  <Link
                    to="/admin"
                    className="btn btn-light btn-lg"
                    style={{
                      backgroundColor: colors.background.primary,
                      color: colors.text.primary,
                      borderColor: colors.border.primary,
                    }}
                  >
                    Перейти к панели управления
                  </Link>
                  <Link
                    to="/contacts"
                    className="btn btn-outline-light btn-lg"
                    style={{
                      borderColor: colors.text.light,
                      color: colors.text.light,
                    }}
                  >
                    Связаться с нами
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </Container>
  );
};

export default WelcomePage;
