import { useCallback, useState } from "react";
import { Textfit } from "react-textfit";
import { Box, Container, VStack } from "@chakra-ui/react";

import { MediaDto } from "@/shared/api";

import styles from "./aa.module.scss";

interface Props {
  mediaInfo: MediaDto;
  callback: () => void;
}

export function BigTextBlockForVoice({ mediaInfo, callback }: Props) {
  const { metaInfo, fileInfo, textInfo } = mediaInfo.mediaInfo;
  const bellSrc = import.meta.env.VITE_BASE_PATH + "Alerts/bell.wav";
  const voiceSrc = import.meta.env.VITE_BASE_PATH + fileInfo.filePath;

  const [isBellPlayed, setIsBellPlayed] = useState(false);

  const error = useCallback(() => {
    throw Error("Failed to play audio");
    callback();
  }, [callback]);

  return (
    <>
      {!isBellPlayed && (
        <audio
          src={bellSrc}
          onEnded={() => setIsBellPlayed(true)}
          onError={() => error()}
          onErrorCapture={() => error()}
        />
      )}
      {isBellPlayed && (
        <audio
          src={voiceSrc}
          onEnded={() => callback()}
          onError={() => error()}
          onErrorCapture={() => error()}
        />
      )}
      {
        <Container maxW="container.xl" className={styles.container}>
          <VStack className={styles.block}>
            <Textfit
              forceSingleModeWidth
              style={{
                width: "100%",
                height: "100%",
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "center",
                alignContent: "center",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
              max={2000}
            >
              Стример, заткнись
            </Textfit>
          </VStack>
          <Box className={styles.block_image}>
            <img src={import.meta.env.VITE_BASE_PATH + "Alerts/mute.png"} />
          </Box>
          <VStack className={styles.block}>
            <Textfit
              forceSingleModeWidth
              style={{
                width: "100%",
                height: "100%",
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "center",
                alignContent: "center",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Сейчас говорит <img className="emote" src={textInfo.text} />
              {metaInfo.displayName}
            </Textfit>
          </VStack>
        </Container>
      }
    </>
  );
}
