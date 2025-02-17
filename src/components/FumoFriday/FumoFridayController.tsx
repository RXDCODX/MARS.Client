import { useCallback, useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { SignalRContext } from "../../app";
import { Cirno } from "./Cirno";
import { Reimu } from "./Reimu";

enum Action {
  add,
  remove,
}

export interface Message {
  id: string;
  message: string;
  color?: string;
}

interface State {
  messages: Message[];
  currentMessage?: Message;
}

function reducer(
  prevState: State,
  event: { type: Action; message: Message },
): State {
  switch (event.type) {
    case Action.add:
      if (!prevState.currentMessage) {
        return {
          messages: [...prevState.messages],
          currentMessage: event.message,
        };
      }

      return { ...prevState, messages: [...prevState.messages, event.message] };

    case Action.remove: {
      const array = prevState.messages.filter(
        (message) => message.id != event.message.id,
      );
      const message = array[0] as Message | undefined;

      console.log("DELETED", message, array);

      return {
        messages: array,
        currentMessage: message,
      };
    }
  }
}

export function FumoFridayController() {
  const initState: State = {
    messages: [],
    currentMessage: undefined,
  };

  const [{ currentMessage }, dispatch] = useReducer(reducer, initState);
  const [switcher, setSwitcher] = useState(false);

  SignalRContext.useSignalREffect(
    "fumofriday",
    (message, color) => {
      const id = uuidv4();
      const newMessage: Message = { id: id, message: message, color: color };
      handleAddEvent(newMessage);
    },
    [],
  );

  const handleAddEvent = useCallback((message: Message) => {
    dispatch({ type: Action.add, message: message });
  }, []);

  const changeSwitcher = useCallback(() => {
    setSwitcher((prevSwitcher) => !prevSwitcher);
  }, []);

  const handleRemoveEvent = useCallback(
    (message: Message) => {
      dispatch({ type: Action.remove, message: message });
      changeSwitcher();
    },
    [changeSwitcher],
  );

  return (
    <>
      {currentMessage && switcher && (
        <Reimu
          key={currentMessage.id}
          callback={() => handleRemoveEvent(currentMessage)}
          displayName={currentMessage}
        />
      )}
      {currentMessage && !switcher && (
        <Cirno
          key={currentMessage.id}
          callback={() => handleRemoveEvent(currentMessage)}
          displayName={currentMessage}
        />
      )}
    </>
  );
}
