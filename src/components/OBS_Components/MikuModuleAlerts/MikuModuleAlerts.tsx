/* eslint-disable simple-import-sort/imports */
import { useCallback, useEffect, useRef, useState } from "react";
import { Textfit } from "react-textfit";
import { useShallow } from "zustand/react/shallow";
import useTelegramusHubStore from "@/shared/stores/telegramusHubStore";
import useMikuModulePrizesStore from "@/shared/stores/mikuModulePrizesStore";
import animate from "@/shared/styles/animate.module.scss";
import useTwitchStore from "@/shared/twitchStore/twitchStore";
import Announce from "@/shared/Utils/Announce/Announce";
import InjectStyles from "@/shared/components/InjectStyles";

import common from "../OBSCommon.module.scss";
import { getMikuModuleText } from "./helper";
import styles from "../WaifuAlerts/WaifuAlerts.module.scss";
import WaifuRoulette from "../WaifuAlerts/WaifuRoulette";

export default function MikuModuleAlerts() {
  const currentMikuModuleMessage = useTelegramusHubStore(
    useShallow(state => state.currentMikuModuleMessage)
  );
  const dequeueMikuModuleCurrent = useTelegramusHubStore(
    state => state.dequeueMikuModuleCurrent
  );
  const startHub = useTelegramusHubStore(state => state.start);
  const [announced, setAnnounced] = useState(false);
  const divHard = useRef<HTMLDivElement>(null);
  const [isRouletted, setIsRouletted] = useState(false);
  const [rouletteIndex, setRouletteIndex] = useState(-1);
  const sendMessage = useTwitchStore(state => state.sendMsgToPyrokxnezxz);
  const imageLoadTimeoutReference = useRef<NodeJS.Timeout | null>(null);

  const prizes = useMikuModulePrizesStore(useShallow(state => state.prizes));
  const shufflePrizes = useMikuModulePrizesStore(state => state.shuffle);

  useEffect(() => {
    startHub();
  }, [startHub]);

  const handleRemoveEvent = useCallback(() => {
    dequeueMikuModuleCurrent();
  }, [dequeueMikuModuleCurrent]);

  useEffect(() => {
    if (currentMikuModuleMessage) {
      if (prizes && prizes.length > 0) {
        const index = prizes.findIndex(
          prize => prize.id === currentMikuModuleMessage.mikuModule.pageId
        );

        if (index === -1) {
          queueMicrotask(() => {
            setRouletteIndex(-1);
            setIsRouletted(true);
          });
        } else {
          queueMicrotask(() => {
            setRouletteIndex(index);
          });
        }
      } else {
        queueMicrotask(() => {
          setRouletteIndex(-1);
        });

        const timeout = setTimeout(() => {
          setIsRouletted(true);
        }, 5000);

        return () => clearTimeout(timeout);
      }
    }
  }, [prizes, currentMikuModuleMessage]);

  useEffect(() => {
    if (!(currentMikuModuleMessage && isRouletted)) {
      return;
    }

    imageLoadTimeoutReference.current = setTimeout(() => {
      handleRemoveEvent();
      setRouletteIndex(-1);
      setIsRouletted(false);
    }, 10_000);

    return () => {
      if (!imageLoadTimeoutReference.current) {
        return;
      }

      clearTimeout(imageLoadTimeoutReference.current);
      imageLoadTimeoutReference.current = null;
    };
  }, [currentMikuModuleMessage, isRouletted, handleRemoveEvent]);

  return (
    <div className={common.textStrokeShadow}>
      <InjectStyles
        styles={`
          html, body {
            height: 100%;
            margin: 0;
          }
          
          div#root {
            min-height: 100%;
            flex-direction: column;
          }
        `}
        id="miku-module-alerts-styles"
      />
      {!announced && (
        <Announce
          title={"MikuModuleRoll"}
          callback={() => setAnnounced(true)}
        />
      )}
      {currentMikuModuleMessage &&
        !isRouletted &&
        rouletteIndex !== -1 &&
        prizes.length > 0 && (
          <WaifuRoulette
            key={currentMikuModuleMessage.mikuModule.pageId}
            shuffle={shufflePrizes}
            callback={() => {
              setIsRouletted(true);
              setRouletteIndex(-1);
            }}
            rouletteIndex={rouletteIndex}
            prizes={(prizes || []).map(p => ({
              ...p,
              id: String(p.id),
              text: p.text || "",
            }))}
            twitchUser={currentMikuModuleMessage.twitchUser}
            wide
          />
        )}
      {currentMikuModuleMessage &&
        !isRouletted &&
        rouletteIndex === -1 &&
        prizes.length === 0 && (
          <div className={styles["roulette-name-text"]}>
            <span>Загрузка рулетки Miku Module...</span>
          </div>
        )}
      {currentMikuModuleMessage && isRouletted && (
        <div
          id={String(currentMikuModuleMessage.mikuModule.pageId)}
          key={currentMikuModuleMessage.mikuModule.pageId}
          ref={divHard}
          className={
            styles.baza + " " + animate.bounceIn + " " + animate.animated
          }
        >
          <div className={styles["alert-box"]}>
            <img
              src={currentMikuModuleMessage.mikuModule.thumbnailUrl}
              style={{ height: "498px", width: "320px" }}
              onLoad={() => {
                if (imageLoadTimeoutReference.current) {
                  clearTimeout(imageLoadTimeoutReference.current);
                  imageLoadTimeoutReference.current = null;
                }

                setTimeout(() => {
                  divHard.current!.addEventListener("animationend", () => {
                    handleRemoveEvent();
                    setRouletteIndex(-1);
                    setIsRouletted(false);
                    shufflePrizes();
                  });

                  divHard.current!.className =
                    styles.baza +
                    " " +
                    animate.bounceOut +
                    " " +
                    animate.animated;
                }, 7000);

                sendMessage(
                  `@${currentMikuModuleMessage.twitchUser.displayName}, ${getMikuModuleText(currentMikuModuleMessage)}!`
                );
              }}
              onError={() => {
                if (imageLoadTimeoutReference.current) {
                  clearTimeout(imageLoadTimeoutReference.current);
                  imageLoadTimeoutReference.current = null;
                }

                handleRemoveEvent();
                setRouletteIndex(-1);
                setIsRouletted(false);
              }}
            />
          </div>
          <div className={styles["alert-box"]}>
            {currentMikuModuleMessage.twitchUser.profileImageUrl && (
              <img
                src={currentMikuModuleMessage.twitchUser.profileImageUrl}
                alt={currentMikuModuleMessage.twitchUser.displayName}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  border: `4px solid ${currentMikuModuleMessage.twitchUser.chatColor || "white"}`,
                  boxShadow: `0 0 20px ${currentMikuModuleMessage.twitchUser.chatColor || "white"}`,
                  marginBottom: "10px",
                }}
              />
            )}
            <span
              className="text-shadow block-text"
              style={{
                color: currentMikuModuleMessage.twitchUser.chatColor || "white",
              }}
            >
              <Textfit min={1} max={1500} forceSingleModeWidth>
                {currentMikuModuleMessage.twitchUser.displayName.toUpperCase()}
              </Textfit>
            </span>
            <span
              className="text-shadow block-text"
              style={{
                color: "cornflowerblue",
              }}
            >
              <Textfit min={1} max={1500} forceSingleModeWidth>
                {getMikuModuleText(currentMikuModuleMessage)}
              </Textfit>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
