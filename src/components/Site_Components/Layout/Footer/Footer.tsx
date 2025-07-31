import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSiteColors } from "../../../../shared/Utils/useSiteColors";

import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const colors = useSiteColors();

  return (
    <footer
      className={`${styles.footer} py-5 mt-auto text-wrap`}
      style={{
        backgroundColor: colors.background.secondary,
        color: colors.text.primary,
        borderTop: `1px solid ${colors.border.primary}`,
      }}
    >
      <Container>
        <Row className="g-4">
          <Col lg={3} md={6}>
            <div className={styles.section}>
              <h3 className="h5 mb-3" style={colors.utils.getTextStyle('primary')}>
                <i className="bi bi-rocket-takeoff me-2"></i>
                MARS Client
              </h3>
              <p style={colors.utils.getTextStyle('secondary')}>
                Мощная платформа для управления стримингом и создания
                интерактивных компонентов для OBS.
              </p>
            </div>
          </Col>

          <Col lg={3} md={6}>
            <div className={styles.section}>
              <h4 className="h6 mb-3" style={colors.utils.getTextStyle('primary')}>Быстрые ссылки</h4>
              <ListGroup variant="flush" className="bg-transparent">
                <ListGroup.Item className="bg-transparent border-0 px-0">
                  <Link to="/" className="text-decoration-none" style={colors.utils.getTextStyle('secondary')}>
                    Главная
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 px-0">
                  <Link to="/about" className="text-decoration-none" style={colors.utils.getTextStyle('secondary')}>
                    О проекте
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 px-0">
                  <Link to="/docs" className="text-decoration-none" style={colors.utils.getTextStyle('secondary')}>
                    Документация
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 px-0">
                  <Link
                    to="/contacts"
                    className="text-decoration-none"
                    style={colors.utils.getTextStyle('secondary')}
                  >
                    Контакты
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>

          <Col lg={3} md={6}>
            <div className={styles.section}>
              <h4 className="h6 mb-3" style={colors.utils.getTextStyle('primary')}>OBS Компоненты</h4>
              <ListGroup variant="flush" className="bg-transparent">
                <ListGroup.Item className="bg-transparent border-0 px-0">
                  <Link
                    to="/pyroalerts"
                    className="text-decoration-none"
                    style={colors.utils.getTextStyle('secondary')}
                  >
                    Pyro Alerts
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 px-0">
                  <Link to="/waifu" className="text-decoration-none" style={colors.utils.getTextStyle('secondary')}>
                    Waifu Alerts
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 px-0">
                  <Link to="/chath" className="text-decoration-none" style={colors.utils.getTextStyle('secondary')}>
                    Горизонтальный чат
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 px-0">
                  <Link to="/chatv" className="text-decoration-none" style={colors.utils.getTextStyle('secondary')}>
                    Вертикальный чат
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>

          <Col lg={3} md={6}>
            <div className={styles.section}>
              <h4 className="h6 mb-3" style={colors.utils.getTextStyle('primary')}>Панель управления</h4>
              <ListGroup variant="flush" className="bg-transparent">
                <ListGroup.Item className="bg-transparent border-0 px-0">
                  <Link to="/admin" className="text-decoration-none" style={colors.utils.getTextStyle('secondary')}>
                    Админ панель
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 px-0">
                  <Link
                    to="/dashboard"
                    className="text-decoration-none"
                    style={colors.utils.getTextStyle('secondary')}
                  >
                    Дашборд
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 px-0">
                  <Link to="/main" className="text-decoration-none" style={colors.utils.getTextStyle('secondary')}>
                    Просмотр серверов
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 px-0">
                  <Link
                    to="/services"
                    className="text-decoration-none"
                    style={colors.utils.getTextStyle('secondary')}
                  >
                    Сервисы
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>
        </Row>

        <hr className="my-4" style={{ borderColor: colors.border.primary }} />

        <Row className="align-items-center">
          <Col md={6}>
            <div className={styles.copyright}>
              <p className="mb-0" style={colors.utils.getTextStyle('muted')}>
                &copy; {currentYear} MARS Client. Все права защищены.
              </p>
            </div>
          </Col>

          <Col md={6} className="text-md-end">
            <div className={styles.social}>
              <a href="#" className="me-3" aria-label="GitHub" style={colors.utils.getTextStyle('secondary')}>
                <i className="bi bi-github fs-5"></i>
              </a>
              <a href="#" className="me-3" aria-label="Discord" style={colors.utils.getTextStyle('secondary')}>
                <i className="bi bi-discord fs-5"></i>
              </a>
              <a href="#" aria-label="Twitter" style={colors.utils.getTextStyle('secondary')}>
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
