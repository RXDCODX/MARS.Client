import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`${styles.footer} bg-dark text-light py-5 mt-auto text-wrap`}
    >
      <Container>
        <Row className="g-4">
          <Col lg={3} md={6}>
            <div className={styles.section}>
              <h3 className="h5 mb-3">
                <i className="bi bi-rocket-takeoff me-2"></i>
                MARS Client
              </h3>
              <p className="text-muted">
                Мощная платформа для управления стримингом и создания
                интерактивных компонентов для OBS.
              </p>
            </div>
          </Col>

          <Col lg={3} md={6}>
            <div className={styles.section}>
              <h4 className="h6 mb-3">Быстрые ссылки</h4>
              <ListGroup variant="flush" className="bg-transparent">
                <ListGroup.Item className="bg-transparent border-0 px-0">
                  <Link to="/" className="text-decoration-none text-muted">
                    Главная
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 px-0">
                  <Link to="/about" className="text-decoration-none text-muted">
                    О проекте
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 px-0">
                  <Link to="/docs" className="text-decoration-none text-muted">
                    Документация
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 px-0">
                  <Link
                    to="/contacts"
                    className="text-decoration-none text-muted"
                  >
                    Контакты
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>

          <Col lg={3} md={6}>
            <div className={styles.section}>
              <h4 className="h6 mb-3">OBS Компоненты</h4>
              <ListGroup variant="flush" className="bg-transparent">
                <ListGroup.Item className="bg-transparent border-0 px-0">
                  <Link
                    to="/pyroalerts"
                    className="text-decoration-none text-muted"
                  >
                    Pyro Alerts
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 px-0">
                  <Link to="/waifu" className="text-decoration-none text-muted">
                    Waifu Alerts
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 px-0">
                  <Link to="/chath" className="text-decoration-none text-muted">
                    Горизонтальный чат
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 px-0">
                  <Link to="/chatv" className="text-decoration-none text-muted">
                    Вертикальный чат
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>

          <Col lg={3} md={6}>
            <div className={styles.section}>
              <h4 className="h6 mb-3">Панель управления</h4>
              <ListGroup variant="flush" className="bg-transparent">
                <ListGroup.Item className="bg-transparent border-0 px-0">
                  <Link to="/admin" className="text-decoration-none text-muted">
                    Админ панель
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 px-0">
                  <Link
                    to="/dashboard"
                    className="text-decoration-none text-muted"
                  >
                    Дашборд
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 px-0">
                  <Link to="/main" className="text-decoration-none text-muted">
                    Просмотр серверов
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 px-0">
                  <Link
                    to="/services"
                    className="text-decoration-none text-muted"
                  >
                    Сервисы
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>
        </Row>

        <hr className="my-4" />

        <Row className="align-items-center">
          <Col md={6}>
            <div className={styles.copyright}>
              <p className="mb-0 text-muted">
                &copy; {currentYear} MARS Client. Все права защищены.
              </p>
            </div>
          </Col>

          <Col md={6} className="text-md-end">
            <div className={styles.social}>
              <a href="#" className="text-muted me-3" aria-label="GitHub">
                <i className="bi bi-github fs-5"></i>
              </a>
              <a href="#" className="text-muted me-3" aria-label="Discord">
                <i className="bi bi-discord fs-5"></i>
              </a>
              <a href="#" className="text-muted" aria-label="Twitter">
                <i className="bi bi-twitter-x fs-5"></i>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
