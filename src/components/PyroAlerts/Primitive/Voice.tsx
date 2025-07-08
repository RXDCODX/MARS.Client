import { useCallback, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Textfit } from "react-textfit";

import { SignalRContext } from "../../../app";
import { MediaDto } from "../../../shared/api/generated/baza";
import styles from "./Media.module.scss";

interface Props {
  mediaInfo: MediaDto;
  callback: () => void;
  isHighPrior?: boolean;
}

export function Voice({ mediaInfo, callback, isHighPrior }: Props) {
  const { metaInfo, fileInfo, textInfo } = mediaInfo.mediaInfo;
  const bellSrc = import.meta.env.VITE_BASE_PATH + "Alerts/bell.wav";
  const voiceSrc = fileInfo.filePath;
  const imageSrc = import.meta.env.VITE_BASE_PATH + textInfo.text;

  const [isBellPlayed, setIsBellPlayed] = useState(false);

  const error = useCallback(() => {
    unmuteAll();
    callback();
    throw Error("Failed to play audio");
  }, [callback]);

  const muteAll = useCallback(() => {
    if (isHighPrior) {
      SignalRContext.invoke("MuteAll");
    }
  }, []);

  const unmuteAll = useCallback(() => {
    if (isHighPrior) {
      SignalRContext.invoke("UnmuteSessions");
    }
  }, []);

  return (
    <>
      {!isBellPlayed && (
        <audio
          autoPlay
          src={bellSrc}
          onEnded={() => setIsBellPlayed(true)}
          onError={() => error()}
          onErrorCapture={() => error()}
          onCanPlayThrough={muteAll}
        />
      )}
      {isBellPlayed && (
        <audio
          autoPlay
          src={voiceSrc}
          onEnded={() => {
            unmuteAll();
            callback();
          }}
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
