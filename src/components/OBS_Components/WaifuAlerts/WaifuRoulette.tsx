import "react-roulette-pro/dist/index.css";

import { CSSProperties, useRef, useState } from "react";
import RoulettePro from "react-roulette-pro";

import { PrizeType, TwitchUser } from "@/shared/api";
import animate from "@/shared/styles/animate.module.scss";
import { getRandomColor } from "@/shared/Utils";

import styles2 from "../OBSCommon.module.scss";
import WaifuRoulettePrizeItem from "./components/WaifuRoulettePrizeItem";
import styles from "./WaifuAlerts.module.scss";

interface Props {
  rouletteIndex: number;
  prizes: PrizeType[];
  callback: () => void;
  twitchUser: TwitchUser;
}

export default function WaifuRoulette({
  rouletteIndex,
  prizes,
  callback,
  twitchUser,
}: Props) {
  if (prizes.length === 0) {
    throw new Error("Prizes is empty");
  }

  const [rouletteStart, setRouletteStart] = useState(false);
  const rouletteDiv = useRef<HTMLDivElement>(null);
  const heightDiv = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [trueColor] = useState<string>(
    twitchUser.chatColor || getRandomColor()
  );
  const [baseStyle, setBaseStyle] = useState<CSSProperties>({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyItems: "center",
    alignSelf: "center",
    animationDuration: "2.2s",
  });

  return (
    <div
      ref={rouletteDiv}
      className={" " + animate.animated + " " + animate.fadeIn}
      onAnimationEnd={() => {
        setRouletteStart(true);
        setVisible(true);
      }}
      style={baseStyle}
    >
      <div
        ref={heightDiv}
        className={styles["smooth-box"]}
        style={{
          width: "100%",
          margin: "0 auto",
          height: "100%",
          alignSelf: "center",
          position: "relative",
        }}
      >
        {visible && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "4px",
              height: `100%`,
              background: "orange",
              zIndex: 10,
              transform: "translate(-50%, -50%)",
              visibility: visible ? "visible" : "hidden",
            }}
          ></div>
        )}
        <RoulettePro
          start={rouletteStart}
          prizes={prizes}
          prizeIndex={rouletteIndex}
          spinningTime={20}
          type="horizontal"
          classes={{}}
          options={{ withoutAnimation: true }}
          defaultDesignOptions={{
            prizesWithText: true,
            hideCenterDelimiter: true,
          }}
          prizeItemRenderFunction={prize => (
            <WaifuRoulettePrizeItem image={prize.image} text={prize.text} />
          )}
          onPrizeDefined={() => {
            setVisible(false);
            const div = rouletteDiv.current!;
            div.onanimationend = () => {
              callback();
            };
            setBaseStyle(prev => ({
              ...prev,
              animationDuration: "1.5s",
            }));
            div.className = " " + animate.animated + " " + animate.fadeOut;
          }}
        />
      </div>
      <div
        className={
          styles["roulette-name-text"] + " " + styles2.textStrokeShadow
        }
      >
        <span>рулетка для</span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            marginTop: "10px",
            padding: "20px",
          }}
        >
          {twitchUser.profileImageUrl && (
            <img
              src={twitchUser.profileImageUrl}
              alt={twitchUser.displayName}
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                border: `4px solid ${trueColor}`,
                boxShadow: `0 0 20px ${trueColor}`,
              }}
            />
          )}
          <span style={{ color: trueColor, fontSize: "1.2em" }}>
            {twitchUser.displayName}
          </span>
        </div>
      </div>
    </div>
  );
}
