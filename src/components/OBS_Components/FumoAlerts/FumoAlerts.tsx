/* eslint-disable simple-import-sort/imports */
import { useCallback, useEffect, useRef, useState } from "react";
import { Textfit } from "react-textfit";
import { useShallow } from "zustand/react/shallow";
import useTelegramusHubStore from "@/shared/stores/telegramusHubStore";
import useFumoPrizesStore from "@/shared/stores/fumoPrizesStore";
import animate from "@/shared/styles/animate.module.scss";
import useTwitchStore from "@/shared/twitchStore/twitchStore";
import Announce from "@/shared/Utils/Announce/Announce";
import InjectStyles from "@/shared/components/InjectStyles";

import common from "../OBSCommon.module.scss";
import { getFumoText, getFumoTitle } from "./helper";
import styles from "../WaifuAlerts/WaifuAlerts.module.scss";
import WaifuRoulette from "../WaifuAlerts/WaifuRoulette";

export default function FumoAlerts() {
  const currentFumoMessage = useTelegramusHubStore(
    useShallow(state => state.currentFumoMessage)
  );
  const dequeueFumoCurrent = useTelegramusHubStore(
    state => state.dequeueFumoCurrent
  );
  const startHub = useTelegramusHubStore(state => state.start);
  const [announced, setAnnounced] = useState(false);
  const divHard = useRef<HTMLDivElement>(null);
  const [isRouletted, setIsRouletted] = useState(false);
  const [rouletteIndex, setRouletteIndex] = useState(-1);
  const sendMessage = useTwitchStore(state => state.sendMsgToPyrokxnezxz);
  const imageLoadTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const prizes = useFumoPrizesStore(useShallow(state => state.prizes));
  const shufflePrizes = useFumoPrizesStore(state => state.shuffle);

  useEffect(() => {
    startHub();
  }, [startHub]);

  const handleRemoveEvent = useCallback(() => {
    dequeueFumoCurrent();
  }, [dequeueFumoCurrent]);

  useEffect(() => {
    if (currentFumoMessage) {
      if (prizes && prizes.length > 0) {
        const index = prizes.findIndex(
          prize => prize.id === currentFumoMessage.fumo.mfcId
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
  }, [prizes, currentFumoMessage]);

  useEffect(() => {
    if (currentFumoMessage && isRouletted) {
      imageLoadTimeoutRef.current = setTimeout(() => {
        handleRemoveEvent();
        setRouletteIndex(-1);
        setIsRouletted(false);
      }, 10000);

      return () => {
        if (imageLoadTimeoutRef.current) {
          clearTimeout(imageLoadTimeoutRef.current);
          imageLoadTimeoutRef.current = null;
        }
      };
    }
  }, [currentFumoMessage, isRouletted, handleRemoveEvent]);

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
        id="fumo-alerts-styles"
      />
      {!announced && (
        <Announce title={"FumoRoll"} callback={() => setAnnounced(true)} />
      )}
      {currentFumoMessage &&
        !isRouletted &&
        rouletteIndex !== -1 &&
        prizes.length > 0 && (
          <WaifuRoulette
            key={currentFumoMessage.fumo.mfcId}
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
            twitchUser={{
              twitchId: "",
              displayName: currentFumoMessage.displayName,
              profileImageUrl: "",
              chatColor: currentFumoMessage.color || undefined,
            }}
          />
        )}
      {currentFumoMessage &&
        !isRouletted &&
        rouletteIndex === -1 &&
        prizes.length === 0 && (
          <div className={styles["roulette-name-text"]}>
            <span>Загрузка рулетки Fumo...</span>
          </div>
        )}
      {currentFumoMessage && isRouletted && (
        <div
          id={String(currentFumoMessage.fumo.mfcId)}
          key={currentFumoMessage.fumo.mfcId}
          ref={divHard}
          className={
            styles.baza + " " + animate.bounceIn + " " + animate.animated
          }
        >
          <div className={styles["alert-box"]}>
            <img
              src={currentFumoMessage.fumo.thumbnailUrl}
              style={{ height: "498px", width: "320px" }}
              onLoad={() => {
                if (imageLoadTimeoutRef.current) {
                  clearTimeout(imageLoadTimeoutRef.current);
                  imageLoadTimeoutRef.current = null;
                }

                setTimeout(() => {
                  divHard.current!.onanimationend = () => {
                    handleRemoveEvent();
                    setRouletteIndex(-1);
                    setIsRouletted(false);
                    shufflePrizes();
                  };

                  divHard.current!.className =
                    styles.baza +
                    " " +
                    animate.bounceOut +
                    " " +
                    animate.animated;
                }, 7000);

                sendMessage(
                  `@${currentFumoMessage.displayName}, ${getFumoText(currentFumoMessage)} ${getFumoTitle(currentFumoMessage)}!`
                );
              }}
              onError={() => {
                if (imageLoadTimeoutRef.current) {
                  clearTimeout(imageLoadTimeoutRef.current);
                  imageLoadTimeoutRef.current = null;
                }

                handleRemoveEvent();
                setRouletteIndex(-1);
                setIsRouletted(false);
              }}
            />
          </div>
          <div className={styles["alert-box"]}>
            <span
              className={`${common.textStrokeShadow} text-shadow block-text`}
              style={{
                color: "white",
              }}
            >
              <Textfit min={1} max={1500} forceSingleModeWidth>
                {currentFumoMessage.displayName.toUpperCase()}
              </Textfit>
            </span>
            <span
              className={`${common.textStrokeShadow} text-shadow block-text`}
              style={{
                color: "cornflowerblue",
              }}
            >
              <Textfit min={1} max={1500} forceSingleModeWidth>
                {getFumoText(currentFumoMessage)}
              </Textfit>
            </span>
            <span
              className={`${common.textStrokeShadow} text-shadow block-text`}
              style={{
                color: "hotpink",
              }}
            >
              <Textfit min={1} max={1500} forceSingleModeWidth>
                {getFumoTitle(currentFumoMessage)}
              </Textfit>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
