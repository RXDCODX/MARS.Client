import { Container, Row } from "react-bootstrap";
import { Textfit } from "react-textfit";

import styles from "./BigTextStyles.module.scss";
import { MediaDto } from "../../api/generated/baza";

interface Props {
  mediaInfo: MediaDto;
}

export function BigTextBlockForVoice({ mediaInfo: mediaInfoDto }: Props) {
  const { metaInfo, fileInfo } = mediaInfoDto.mediaInfo;

  return (
    <Container className={styles.grid}>
      <Row className={styles.grid_cell} style={{ height: "100%" }}>
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
      </Row>
      <Row className={styles.grid_cell} style={{ height: "100%" }}>
        <img
          src={import.meta.env.VITE_BASE_PATH + "Alerts/mute.png"}
          style={{ width: "100%", height: "100%" }}
        />
      </Row>
      <Row className={styles.grid_cell} style={{ height: "100%" }}>
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
          Сейчас говорит <img className="emote" src={fileInfo.fileName} />
          {metaInfo.displayName}
        </Textfit>
      </Row>
    </Container>
  );
}
