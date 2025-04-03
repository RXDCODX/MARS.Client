import { useCallback, useState } from "react";
import { MediaDto } from "../../../shared/api/generated/baza";
import { Container, Row } from "react-bootstrap";
import { Textfit } from "react-textfit";
import styles from "./Media.module.scss";

interface Props {
  mediaInfo: MediaDto;
  callback: () => void;
}

export function Voice({ mediaInfo, callback }: Props) {
  const { metaInfo, fileInfo, textInfo } = mediaInfo.mediaInfo;
  const bellSrc = import.meta.env.VITE_BASE_PATH + "Alerts/bell.wav";
  const voiceSrc = fileInfo.filePath;
  const imageSrc = import.meta.env.VITE_BASE_PATH + textInfo.text;

  const [isBellPlayed, setIsBellPlayed] = useState(false);

  const error = useCallback(() => {
    callback();
    throw Error("Failed to play audio");
  }, [callback]);

  return (
    <>
      {!isBellPlayed && (
        <audio
          autoPlay
          src={bellSrc}
          onEnded={() => setIsBellPlayed(true)}
          onError={() => error()}
          onErrorCapture={() => error()}
        />
      )}
      {isBellPlayed && (
        <audio
          autoPlay
          src={voiceSrc}
          onEnded={() => callback()}
          onError={() => error()}
          onErrorCapture={() => error()}
        />
      )}
      {
        <Container className={styles.container}>
          <Row className={styles.block}>
            <Textfit forceSingleModeWidth max={2000} min={1}>
              всем тихо
            </Textfit>
          </Row>
          <Row className={styles.block_image}>
            <img src={import.meta.env.VITE_BASE_PATH + "Alerts/mute.png"} />
          </Row>
          <Row className={styles.block}>
            <Textfit forceSingleModeWidth max={2000} min={1}>
              Сейчас говорит <img className="emote" src={imageSrc} />
              {metaInfo.displayName}
            </Textfit>
          </Row>
        </Container>
      }
    </>
  );
}
