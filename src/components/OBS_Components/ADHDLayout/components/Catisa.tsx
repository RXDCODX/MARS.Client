import styles from "./Catisa.module.scss";

export function Catisa() {
  return (
    <div className={styles.catisaContainer}>
      <img
        src="/src/components/OBS_Components/ADHDLayout/content/Catisa.gif"
        alt="Catisa"
        className={styles.catisaImage}
      />
    </div>
  );
}
