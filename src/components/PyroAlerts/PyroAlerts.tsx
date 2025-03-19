import { useCallback, useReducer, useState } from "react";

import { SignalRContext } from "../../app";
import Announce from "../../shared/Utils/Announce/Announce";
import { Audio, Image, Video, Voice } from "./Primitive";
import TelegramSticker from "./Primitive/TelegramSticker";
import {
  MediaDto,
  MediaFileInfoTypeEnum,
} from "../../shared/api/generated/baza";

enum StateStatus {
  add,
  remove,
}

interface State {
  messages: (MediaDto | undefined)[];
}

function reducer(
  state: State,
  action: { type: StateStatus; mediaInfo?: MediaDto },
): State {
  const md = action.mediaInfo;

  switch (action.type) {
    case StateStatus.add:
      return { messages: [...state.messages, md] };

    case StateStatus.remove:
      return {
        messages: state.messages.filter(
          (m) => m!.mediaInfo.id != md!.mediaInfo.id,
        ),
      };
  }
}

export default function PyroAlerts() {
  document.title = "PyroAlerts";

  const initState: State = {
    messages: [],
  };
  const [{ messages }, dispatch] = useReducer(reducer, initState);
  const [announced, setAnnounced] = useState(false);
  const [count, setCount] = useState(0);

  SignalRContext.useSignalREffect(
    "alert",
    (message) => {
      const parsedMessage: MediaDto = { ...message };
      parsedMessage.mediaInfo.fileInfo.localFilePath =
        import.meta.env.VITE_BASE_PATH +
        parsedMessage.mediaInfo.fileInfo.localFilePath;

      console.log(parsedMessage);
      setCount(count + 1);
      add(parsedMessage);
    },
    [],
  );

  const add = useCallback(
    (mediaInfo: MediaDto) => {
      dispatch({ type: StateStatus.add, mediaInfo });
    },
    [dispatch],
  );

  const remove = useCallback(
    (mediaInfo: MediaDto) => {
      dispatch({ type: StateStatus.remove, mediaInfo });
    },
    [dispatch],
  );

  return (
    <>
      {!announced && (
        <Announce title={"PyroAlerts"} callback={() => setAnnounced(true)} />
      )}
      {messages.map((message) => {
        if (!message) return null;

        debugger;

        const { fileInfo } = message.mediaInfo;
        const callback = () => remove(message);

        switch (fileInfo.type) {
          case MediaFileInfoTypeEnum.Image || MediaFileInfoTypeEnum.Gif:
            return (
              <Image
                key={message.mediaInfo.id}
                mediaInfo={message}
                callBack={callback}
              />
            );
          case MediaFileInfoTypeEnum.Video:
            return (
              <Video
                key={message.mediaInfo.id}
                MediaInfo={message}
                callback={callback}
              />
            );
          case MediaFileInfoTypeEnum.Audio:
            return (
              <Audio
                key={message.mediaInfo.id}
                mediaInfo={message}
                callback={callback}
              />
            );
          case MediaFileInfoTypeEnum.Voice:
            return (
              <Voice
                key={message.mediaInfo.id}
                mediaInfo={message}
                callback={callback}
              />
            );
          case MediaFileInfoTypeEnum.TelegramSticker:
            return (
              <TelegramSticker
                key={message.mediaInfo.id}
                mediaInfo={message}
                callBack={callback}
              />
            );
        }
      })}
    </>
  );
}
