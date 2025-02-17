import { JSX } from "react";
import { Container, Row } from "react-bootstrap";
import { Textfit } from "react-textfit";

import { MediaDto } from "../../api/generated/baza";
import styles from "./BigTextStyles.module.scss";
import { replaceEmotes } from "..";

interface Props {
  mediaInfo: MediaDto;
}

export function BigTextBlockForAudio({ mediaInfo }: Props) {
  const text = mediaInfo.mediaInfo.textInfo.text;

  if (text === null && text === "") {
    return null;
  }

  const splits = text?.split("=");

  const length = splits?.length;

  if (!length) {
    return null;
  } else if (length && length > 2) {
    console.error("Дохуя разделителей в тексте алерта");
    return null;
  }

  const emotesSplits: Array<string | JSX.Element | JSX.Element[]> = [];
  for (let i = 0; i < splits.length; i++) {
    splits[i] = splits[i].trim();
    if (splits[i]) {
      const result = replaceEmotes(splits[i]);
      if (result) {
        emotesSplits[i] = result;
      }
    }
  }

  const is2Exists = splits[1] != undefined && emotesSplits[1] != undefined;

  return (
    <Container className={styles.grid}>
      <Row className={styles.grid_cell}>
        <Textfit
          forceSingleModeWidth
          style={{
            width: "100%",
            height: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexWrap: "nowrap",
            alignItems: "stretch",
          }}
        >
          {emotesSplits[0]}
        </Textfit>
      </Row>
      <Row className={styles.grid_cell}></Row>
      <Row className={styles.grid_cell}></Row>
      <Row className={styles.grid_cell}></Row>
      <Row
        className={
          styles.grid_cell + ` down-cell ${is2Exists ? " bg-black" : ""}`
        }
      >
        <Textfit
          forceSingleModeWidth
          style={{
            width: "100%",
            height: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexWrap: "nowrap",
            alignItems: "stretch",
          }}
        >
          {is2Exists ? emotesSplits[1] : ""}
        </Textfit>
      </Row>
    </Container>
  );
}
