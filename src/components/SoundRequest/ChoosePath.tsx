import styles from "./ChoosePath.module.scss";

export const ChoosePath: React.FC = () => {
  return (
    <div className="choose-path">
      <a href="/sr/tracklist" className={styles["left-path"]}>
        TrackList
      </a>
      <a href="/sr/videoscreen" className={styles["right-path"]}>
        VideoScreen
      </a>
    </div>
  );
};
