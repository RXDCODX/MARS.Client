import { JSX } from "react";
import { Container, Row } from "react-bootstrap";
import { Textfit } from "react-textfit";

import { replaceEmotes } from "..";
import { MediaDto } from "../../api/generated/baza";
import styles from "./BigTextStyles.module.scss";
import useTwitchStore from "../../twitchStore/twitchStore";

interface Props {
  mediaInfo: MediaDto;
}

export function BigTextBlockForAudio({ mediaInfo }: Props) {
  const parser = useTwitchStore((state) => state.parser);
  const parserToLink = useTwitchStore((state) => state.parseToLink);
  const text = mediaInfo.mediaInfo.textInfo.text;

  if (text === null && text === "") {
    return undefined;
  }

  if (!parser || !parserToLink) {
    return undefined;
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
      const result = replaceEmotes({
        text: splits[i],
        parser,
        newParser: parserToLink,
      });
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
          max={2000}
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
          max={2000}
        >
          {is2Exists ? emotesSplits[1] : ""}
        </Textfit>
      </Row>
    </Container>
  );
}
