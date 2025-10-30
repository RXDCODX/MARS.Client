import {
  ArrowDownUp,
  ChevronsDown,
  ChevronsUp,
  Clock,
  List,
} from "lucide-react";

import { TrackListViewMode } from "../../stores/usePlayerStore";
import styles from "./ViewModeToggle.module.scss";

interface ViewModeToggleProps {
  viewMode: TrackListViewMode;
  onToggle: () => void;
}

export function ViewModeToggle({ viewMode, onToggle }: ViewModeToggleProps) {
  const getIcon = () => {
    switch (viewMode) {
      case TrackListViewMode.Default:
        return <List size={24} />;
      case TrackListViewMode.WithHistory:
        return <Clock size={24} />;
      case TrackListViewMode.Reversed:
        return <ArrowDownUp size={24} />;
      default:
        return <List size={24} />;
    }
  };

  const getLabel = () => {
    switch (viewMode) {
      case TrackListViewMode.Default:
        return "Обычный";
      case TrackListViewMode.WithHistory:
        return "Общий";
      case TrackListViewMode.Reversed:
        return "История↓";
      default:
        return "Режим";
    }
  };

  const getTitle = () => {
    switch (viewMode) {
      case TrackListViewMode.Default:
        return "Обычный режим: текущий трек + очередь";
      case TrackListViewMode.WithHistory:
        return "Общий режим: история → текущий трек → очередь";
      case TrackListViewMode.Reversed:
        return "Обратный режим: история + текущий трек снизу";
      default:
        return "Переключить режим отображения";
    }
  };

  return (
    <button
      className={`${styles.viewModeToggle} ${styles[viewMode]}`}
      onClick={onToggle}
      title={getTitle()}
      type="button"
    >
      <div className={styles.iconWrapper}>
        {getIcon()}
        {viewMode === TrackListViewMode.Default && (
          <ChevronsDown className={styles.indicator} size={10} />
        )}
        {viewMode === TrackListViewMode.WithHistory && (
          <div className={styles.historyDots}>
            <span />
            <span />
            <span />
          </div>
        )}
        {viewMode === TrackListViewMode.Reversed && (
          <ChevronsUp className={styles.indicator} size={10} />
        )}
      </div>
      <span className={styles.label}>{getLabel()}</span>
      <div className={styles.modeIndicators}>
        <span
          className={`${styles.dot} ${viewMode === TrackListViewMode.Default ? styles.active : ""}`}
        />
        <span
          className={`${styles.dot} ${viewMode === TrackListViewMode.WithHistory ? styles.active : ""}`}
        />
        <span
          className={`${styles.dot} ${viewMode === TrackListViewMode.Reversed ? styles.active : ""}`}
        />
      </div>
    </button>
  );
}

