import { Card, Col, Row } from "react-bootstrap";

import { CinemaQueueStatistics } from "@/shared/api";
import { useSiteColors } from "@/shared/Utils/useSiteColors";

import styles from "../CinemaQueuePage.module.scss";

interface StatisticsCardsProps {
  statistics: CinemaQueueStatistics;
}

const StatisticsCards: React.FC<StatisticsCardsProps> = ({ statistics }) => {
  const colors = useSiteColors();

  const cardStyles = {
    backgroundColor: colors.background.card,
    borderColor: colors.border.primary,
    boxShadow: colors.shadow.light,
  };

  return (
    <Row className={styles.statisticsRow}>
      <Col md={2}>
        <Card style={cardStyles} id="stat-total">
          <Card.Body className="text-center">
            <h3 className="mb-1" style={{ color: "var(--site-text-primary)" }}>
              {statistics.totalItems}
            </h3>
            <p className="mb-0" style={{ color: "var(--site-text-secondary)" }}>
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
            <p className="mb-0" style={{ color: "var(--site-text-secondary)" }}>
              Pending
            </p>
          </Card.Body>
        </Card>
      </Col>
      <Col md={2}>
        <Card style={cardStyles} id="stat-in-progress">
          <Card.Body className="text-center">
            <h3 className="mb-1" style={{ color: "var(--site-text-warning)" }}>
              {statistics.inProgressItems}
            </h3>
            <p className="mb-0" style={{ color: "var(--site-text-secondary)" }}>
              In Progress
            </p>
          </Card.Body>
        </Card>
      </Col>
      <Col md={2}>
        <Card style={cardStyles} id="stat-completed">
          <Card.Body className="text-center">
            <h3 className="mb-1" style={{ color: "var(--site-text-success)" }}>
              {statistics.completedItems}
            </h3>
            <p className="mb-0" style={{ color: "var(--site-text-secondary)" }}>
              Completed
            </p>
          </Card.Body>
        </Card>
      </Col>
      <Col md={2}>
        <Card style={cardStyles} id="stat-cancelled">
          <Card.Body className="text-center">
            <h3 className="mb-1" style={{ color: "var(--site-text-danger)" }}>
              {statistics.cancelledItems}
            </h3>
            <p className="mb-0" style={{ color: "var(--site-text-secondary)" }}>
              Cancelled
            </p>
          </Card.Body>
        </Card>
      </Col>
      <Col md={2}>
        <Card style={cardStyles} id="stat-postponed">
          <Card.Body className="text-center">
            <h3 className="mb-1" style={{ color: "var(--site-text-accent)" }}>
              {statistics.postponedItems}
            </h3>
            <p className="mb-0" style={{ color: "var(--site-text-secondary)" }}>
              Postponed
            </p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default StatisticsCards;
