import { CSSProperties, JSX } from "react";
import type { ContentPart } from "../../shared/Utils";
import { Textfit } from "react-textfit";
import { ChatMessage } from "../../shared/api/generated/baza";

interface Props {
  className?: string;
  style?: CSSProperties;
  part: ContentPart;
  message: ChatMessage;
  convertMediaToJustLinks: boolean;
  replaceEmotes: ({
    message,
  }: {
    message?: string | ChatMessage;
  }) => string | JSX.Element | JSX.Element[] | undefined;
}

export default function ContentPiece({
  part,
  style,
  message,
  className,
  convertMediaToJustLinks,
  replaceEmotes,
}: Props) {
  if (convertMediaToJustLinks) {
    switch (part.type) {
      case "text":
        const text = replaceEmotes({ message: message });
        return (
          <Textfit
            min={10}
            max={10000}
            mode="multi"
            className={className}
            style={style}
          >
            {text}
          </Textfit>
        );

      default:
        return (
          <div className={className} style={style}>
            <span
              style={{
                color: "rgb(51, 255, 0);",
                textDecoration: "underline;",
                textDecorationColor: "rgb(38, 0, 255);",
              }}
            >
              Ссылка
            </span>
          </div>
        );
    }
  }
  switch (part.type) {
    case "text":
      const text = replaceEmotes({ message: message });

      return (
        <Textfit
          min={10}
          max={10000}
          mode="multi"
          className={className}
          style={style}
        >
          {text}
        </Textfit>
      );
    case "image":
      return (
        <div className={className} style={style}>
          <img
            src={part.content}
            className="image"
            loading="lazy"
            decoding="async"
          ></img>
        </div>
      );
    case "video":
      return (
        <div className={className} style={style}>
          <video src={part.content} className="video"></video>
        </div>
      );
    case "link":
      return (
        <div className={className} style={style}>
          <span
            style={{
              color: "rgb(51, 255, 0);",
              textDecoration: "underline;",
              textDecorationColor: "rgb(38, 0, 255);",
            }}
          >
            Ссылка
          </span>
        </div>
      );
  }
}
