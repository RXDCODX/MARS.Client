import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import styles from "./WelcomePage.module.scss";

const WelcomePage: React.FC = () => {
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
        <section className={`${styles.hero} bg-gradient text-blue w-100 py-5`}>
          <Container>
            <Row className="align-items-center flex-column">
              <Col lg={8} className="text-center">
                <h1 className="display-4 fw-bold mb-4">
                  Добро пожаловать в{" "}
                  <span className="text-primary">MARS Client</span>
                </h1>
                <p className="lead mb-4">
                  Мощная платформа для создания профессиональных стримов с
                  интерактивными компонентами
                </p>
              </Col>
              <Col lg={4} className="text-center mt-4 mt-lg-0">
                <div className={styles.floatingCard}>
                  <Card className="border-0 shadow-lg">
                    <Card.Body className="text-center p-4">
                      <div className="display-4 mb-3">🚀</div>
                      <h3>Быстрый старт</h3>
                      <p className="text-muted">
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
        <section className="py-5">
          <Container>
            <Row className="text-center mb-5">
              <Col>
                <h2 className="display-5 fw-bold mb-3">
                  Возможности платформы
                </h2>
              </Col>
            </Row>
            <Row className="g-4">
              {features.map((feature, index) => (
                <Col key={index} lg={3} md={6}>
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Body className="text-center p-4">
                      <div className="display-6 mb-3">{feature.icon}</div>
                      <h3 className="h5 mb-3">{feature.title}</h3>
                      <p className="text-muted mb-3">{feature.description}</p>
                      <Link
                        to={feature.link}
                        className="btn btn-outline-primary btn-sm"
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
        <section className="py-5">
          <Container>
            <Row className="text-center mb-5">
              <Col>
                <h2 className="display-5 fw-bold mb-3">OBS Компоненты</h2>
                <p className="lead text-muted">
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
                  >
                    <Card.Body className="p-4">
                      <h3 className="h5 mb-2">{component.name}</h3>
                      <p className="text-muted mb-3">{component.description}</p>
                      <div className="text-primary">→</div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-5 bg-gradient text-white">
          <Container>
            <Row className="text-center">
              <Col>
                <h2 className="display-5 fw-bold mb-3">Готовы начать?</h2>
                <p className="lead mb-4">
                  Присоединяйтесь к тысячам стримеров, которые уже используют
                  MARS Client
                </p>
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                  <Link to="/admin" className="btn btn-light btn-lg">
                    Перейти к панели управления
                  </Link>
                  <Link to="/contacts" className="btn btn-outline-light btn-lg">
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
