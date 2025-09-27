import { Badge, Button, Card, Spinner } from "react-bootstrap";
import { ArrowClockwise, Eye, Pencil, Trash } from "react-bootstrap-icons";

import { ChannelRewardRecord } from "@/shared/api";

import styles from "../ChannelRewardsPage.module.scss";
import { RewardsListProps } from "../ChannelRewardsPage.types";

const RewardsList: React.FC<RewardsListProps> = ({
  rewards,
  isLoading,
  error,
  onViewDetails,
  onEdit,
  onDelete,
  onSync,
  isSyncing,
}) => {
  const getStatusBadge = (isEnabled: boolean) => (
    <Badge
      className={`${styles.statusBadge} ${isEnabled ? styles.enabled : styles.disabled}`}
    >
      {isEnabled ? "Активна" : "Неактивна"}
    </Badge>
  );

  const getSettingsBadges = (reward: ChannelRewardRecord) => {
    const badges = [];

    if (reward.isUserInputRequired) {
      badges.push(
        <Badge key="input" className={styles.settingBadge}>
          Требует ввод
        </Badge>
      );
    }

    if (reward.isMaxPerStreamEnabled) {
      badges.push(
        <Badge key="max-stream" className={styles.settingBadge}>
          Лимит на стрим
        </Badge>
      );
    }

    if (reward.isMaxPerUserPerStreamEnabled) {
      badges.push(
        <Badge key="max-user" className={styles.settingBadge}>
          Лимит на пользователя
        </Badge>
      );
    }

    if (reward.isGlobalCooldownEnabled) {
      badges.push(
        <Badge key="cooldown" className={styles.settingBadge}>
          Глобальная задержка
        </Badge>
      );
    }

    if (reward.shouldRedemptionsSkipRequestQueue) {
      badges.push(
        <Badge key="skip-queue" className={styles.settingBadge}>
          Пропустить очередь
        </Badge>
      );
    }

    return badges;
  };

  const renderRewardCard = (reward: ChannelRewardRecord) => (
    <Card key={reward.id} className={styles.rewardCard}>
      <Card.Header>
        <h5 className={styles.rewardTitle}>{reward.title}</h5>
        <p className={styles.rewardCost}>{reward.cost} очков</p>
      </Card.Header>
      <Card.Body>
        {reward.prompt && (
          <p className={styles.rewardDescription}>{reward.prompt}</p>
        )}
        <div className={styles.rewardStatus}>
          {getStatusBadge(reward.isEnabled)}
        </div>
        <div className={styles.rewardSettings}>{getSettingsBadges(reward)}</div>
      </Card.Body>
      <Card.Footer className={styles.cardFooter}>
        <div className={styles.actionButtons}>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => onViewDetails(reward)}
          >
            <Eye className="me-1" />
            Просмотр
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => onEdit(reward)}
          >
            <Pencil className="me-1" />
            Редактировать
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => onDelete(reward)}
          >
            <Trash className="me-1" />
            Удалить
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );

  if (isLoading) {
    return (
      <div className={styles.loadingState}>
        <Spinner animation="border" className={styles.spinner} />
        <p className={styles.loadingText}>Загрузка наград...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorState}>
        <div className={styles.errorIcon}>⚠️</div>
        <p className={styles.errorText}>{error}</p>
        <Button variant="primary" onClick={() => window.location.reload()}>
          Попробовать снова
        </Button>
      </div>
    );
  }

  if (!rewards || rewards.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>🎁</div>
        <p className={styles.emptyText}>Награды не найдены</p>
        <Button variant="primary" onClick={onSync} disabled={isSyncing}>
          <ArrowClockwise className={`me-1 ${isSyncing ? "spinning" : ""}`} />
          Синхронизировать с Twitch
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Награды канала ({rewards?.length || 0})</h3>
        <Button variant="primary" onClick={onSync} disabled={isSyncing}>
          <ArrowClockwise className={`me-1 ${isSyncing ? "spinning" : ""}`} />
          {isSyncing ? "Синхронизация..." : "Синхронизировать"}
        </Button>
      </div>

      <div className={styles.rewardsGrid}>
        {Array.isArray(rewards) && rewards.map(renderRewardCard)}
      </div>
    </div>
  );
};

export default RewardsList;
