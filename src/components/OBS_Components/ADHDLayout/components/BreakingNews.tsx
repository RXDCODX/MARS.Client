import { useEffect, useState } from "react";

import styles from "./BreakingNews.module.scss";

export function BreakingNews() {
  const [breakingText, setBreakingText] = useState<string>("");

  useEffect(() => {
    // Загружаем текст из breaking.txt
    fetch("/src/components/OBS_Components/ADHDLayout/content/breaking.txt")
      .then(response => response.text())
      .then(text => {
        // Очищаем текст от лишних символов и объединяем в одну строку
        const cleanedText = text
          .split("\n")
          .filter(line => line.trim() && !line.startsWith("•"))
          .map(line => line.trim())
          .join(" • ");
        setBreakingText(cleanedText);
      })
      .catch(error => {
        console.error("Ошибка загрузки breaking.txt:", error);
        // Fallback текст
        setBreakingText(
          "Scientists discover house parties • Frogs missing worldwide • Local grandma says you're too thin"
        );
      });
  }, []);

  return (
    <div className={styles.breakingNewsContainer}>
      <div className={styles.breakingNewsContent}>
        <div className={styles.breakingBadge}>BREAKING</div>
        <div className={styles.breakingNewsText}>{breakingText}</div>
      </div>
    </div>
  );
}
