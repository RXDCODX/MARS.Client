import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./ChoosePath.module.scss";
import CurrentTrackInfo from "./CurrentTrack/CurrentTrackManager";
import { SoundRequestPlayer } from "./Player/SoundRequestPlayer";
import { VideoScreen } from "./VideoScreen/VideoScreen";

const ChoosePath: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  if (!isInitialized) {
    return null;
  }

  const path = location.pathname;

  // Если путь /sr - показываем страницу выбора
  if (path === "/sr") {
    return (
      <div className={styles["choose-path"]}>
        <div className={styles.column} onClick={() => navigate("/sr/player")}>
          <span className={styles.label}>VideoScreen</span>
        </div>
        <div
          className={styles.column}
          onClick={() => navigate("/sr/tracklist")}
        >
          <span className={styles.label}>Player</span>
        </div>
        <div
          className={styles.column}
          onClick={() => navigate("/sr/currenttrack")}
        >
          <span className={styles.label}>CurrentTrack</span>
        </div>
      </div>
    );
  }

  // Если путь /sr/player - рендерим VideoScreen
  if (path === "/sr/player") {
    return <VideoScreen />;
  }

  // Если путь /sr/tracklist - рендерим TrackList (Player)
  if (path === "/sr/tracklist") {
    return <SoundRequestPlayer />;
  }

  // Если путь /sr/currenttrack - рендерим CurrentTrack
  if (path === "/sr/currenttrack") {
    return <CurrentTrackInfo />;
  }

  // Если путь не соответствует ни одному из известных - показываем страницу выбора
  return (
    <div className={styles["choose-path"]}>
      <div className={styles.column} onClick={() => navigate("/sr/player")}>
        <span className={styles.label}>VideoScreen</span>
      </div>
      <div className={styles.column} onClick={() => navigate("/sr/tracklist")}>
        <span className={styles.label}>Player</span>
      </div>
      <div
        className={styles.column}
        onClick={() => navigate("/sr/currenttrack")}
      >
        <span className={styles.label}>CurrentTrack</span>
      </div>
    </div>
  );
};

export default ChoosePath;
export { ChoosePath };
