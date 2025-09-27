import { Badge, Button, Col, Row } from "react-bootstrap";
import {
  ArrowClockwise,
  ArrowLeft,
  Pencil,
  Trash,
} from "react-bootstrap-icons";

import styles from "../ChannelRewardsPage.module.scss";
import { RewardDetailsProps } from "../ChannelRewardsPage.types";

const RewardDetails: React.FC<RewardDetailsProps> = ({
  reward,
  onBack,
  onEdit,
  onDelete,
  onRefresh,
}) => {
  if (!reward) {
    return (
      <div className={styles.errorState}>
        <div className={styles.errorIcon}>⚠️</div>
        <p className={styles.errorText}>Награда не найдена</p>
        <Button variant="primary" onClick={onBack}>
          Назад
        </Button>
      </div>
    );
  }
  const formatCooldown = (seconds?: number) => {
    if (!seconds) return "Не установлена";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}ч ${minutes}м ${secs}с`;
    } else if (minutes > 0) {
      return `${minutes}м ${secs}с`;
    } else {
      return `${secs}с`;
    }
  };

  const getStatusBadge = (isEnabled: boolean) => (
    <Badge
      className={`${styles.statusBadge} ${isEnabled ? styles.enabled : styles.disabled}`}
    >
      {isEnabled ? "Активна" : "Неактивна"}
    </Badge>
  );

  return (
    <div className={styles.rewardDetails}>
      <div className={styles.detailsHeader}>
        <div>
          <h2 className={styles.detailsTitle}>{reward.title}</h2>
          <p className={styles.detailsCost}>{reward.cost} очков</p>
        </div>
        <div className={styles.actionButtons}>
          <Button variant="outline-secondary" onClick={onBack}>
            <ArrowLeft className="me-1" />
            Назад
          </Button>
          <Button variant="outline-primary" onClick={onEdit}>
            <Pencil className="me-1" />
            Редактировать
          </Button>
          <Button variant="outline-danger" onClick={onDelete}>
            <Trash className="me-1" />
            Удалить
          </Button>
          <Button variant="outline-info" onClick={onRefresh}>
            <ArrowClockwise className="me-1" />
            Обновить
          </Button>
        </div>
      </div>

      <div className={styles.detailsContent}>
        <Row>
          <Col md={6}>
            <div className={styles.detailsSection}>
              <h4 className={styles.sectionTitle}>Основная информация</h4>
              <div className={styles.sectionContent}>
                <p>
                  <strong>ID:</strong> {reward.id}
                </p>
                <p>
                  <strong>Twitch ID:</strong>{" "}
                  {reward.twitchRewardId || "Не установлен"}
                </p>
                <p>
                  <strong>Статус:</strong> {getStatusBadge(reward.isEnabled)}
                </p>
                <p>
                  <strong>Стоимость:</strong> {reward.cost} очков
                </p>
                {reward.backgroundColor && (
                  <p>
                    <strong>Цвет фона:</strong>{" "}
                    <span
                      style={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        backgroundColor: reward.backgroundColor,
                        border: "1px solid #ccc",
                        borderRadius: "3px",
                        marginLeft: "8px",
                      }}
                    />
                    {reward.backgroundColor}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.detailsSection}>
              <h4 className={styles.sectionTitle}>Описание</h4>
              <div className={styles.sectionContent}>
                {reward.prompt ? (
                  <p>{reward.prompt}</p>
                ) : (
                  <p className="text-muted">Описание не указано</p>
                )}
              </div>
            </div>
          </Col>

          <Col md={6}>
            <div className={styles.detailsSection}>
              <h4 className={styles.sectionTitle}>Настройки</h4>
              <div className={styles.sectionContent}>
                <p>
                  <strong>Требует ввод пользователя:</strong>{" "}
                  {reward.isUserInputRequired ? "Да" : "Нет"}
                </p>
                <p>
                  <strong>Пропускать очередь запросов:</strong>{" "}
                  {reward.shouldRedemptionsSkipRequestQueue ? "Да" : "Нет"}
                </p>
              </div>
            </div>

            <div className={styles.detailsSection}>
              <h4 className={styles.sectionTitle}>Лимиты</h4>
              <div className={styles.sectionContent}>
                <p>
                  <strong>Максимум на стрим:</strong>{" "}
                  {reward.isMaxPerStreamEnabled
                    ? `${reward.maxPerStream || 0} раз`
                    : "Не ограничено"}
                </p>
                <p>
                  <strong>Максимум на пользователя за стрим:</strong>{" "}
                  {reward.isMaxPerUserPerStreamEnabled
                    ? `${reward.maxPerUserPerStream || 0} раз`
                    : "Не ограничено"}
                </p>
                <p>
                  <strong>Глобальная задержка:</strong>{" "}
                  {reward.isGlobalCooldownEnabled
                    ? formatCooldown(reward.globalCooldownSeconds)
                    : "Не установлена"}
                </p>
              </div>
            </div>

            <div className={styles.detailsSection}>
              <h4 className={styles.sectionTitle}>Медиа</h4>
              <div className={styles.sectionContent}>
                <p>
                  <strong>ID медиа:</strong>{" "}
                  {reward.mediaInfoId || "Не привязано"}
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RewardDetails;
