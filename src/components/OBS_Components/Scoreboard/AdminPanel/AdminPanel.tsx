import { useCallback, useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { logger } from "../../../../app/main";
import { useSiteColors } from "../../../../shared/Utils/useSiteColors";
import ThemeToggle from "../../../ThemeToggle";
import { ScoreboardSignalRContext } from "../ScoreboardContext";
import ActionButtons from "./ActionButtons";
import styles from "./AdminPanel.module.scss";
import ColorPresetCard from "./ColorCard/ColorPresetCard";
import LayoutCard from "./LayoutCard";
import MetaPanel from "./MetaPanel/MetaPanel";
import PlayerCard from "./PlayerCard/PlayerCard";
import { defaultLayout } from "./types";
import { useAdminState } from "./useAdminState";
import VisibilityCard from "./VisibilityCard/VisibilityCard";

const AdminPanelContent = () => {
  const colors = useSiteColors();
  const {
    player1,
    player2,
    meta,
    color,
    isVisible,
    animationDuration,
    layout,
    setPlayer1,
    setPlayer2,
    setMeta,
    setVisibility,
    setAnimationDuration,
    setLayout,
    swapPlayers,
    reset,
    handleColorChange,
    handleReceiveState,
  } = useAdminState();

  // Реф для отслеживания последнего обновления
  const lastUpdateRef = useRef<number>(0);

  // Единая подписка на SignalR события для получения обновлений от других клиентов
  ScoreboardSignalRContext.useSignalREffect(
    "ReceiveState",
    useCallback(
      (state) => {
        const now = Date.now();
        // Дополнительная защита от слишком частых обновлений
        if (now - lastUpdateRef.current < 100) {
          console.log("Ignoring too frequent update");
          return;
        }
        lastUpdateRef.current = now;
        handleReceiveState(state);
      },
      [handleReceiveState],
    ),
    [handleReceiveState],
  );

  // Отдельная подписка на изменения видимости
  ScoreboardSignalRContext.useSignalREffect(
    "VisibilityChanged",
    useCallback((isVisible: boolean) => {
      console.log("Visibility changed from server:", isVisible);
      // Видимость обновляется через handleReceiveState, поэтому здесь ничего не делаем
    }, []),
    [],
  );

  // Редирект на админку при открытии с телефона
  const navigate = useNavigate();
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      navigate("/scoreboard-admin");
    }
  }, [navigate]);

  const handleSwapNames = useCallback(async () => {
    try {
      await setPlayer1({ ...player1, name: player2.name });
      await setPlayer2({ ...player2, name: player1.name });
    } catch (error) {
      console.error("Error swapping names:", error);
    }
  }, [player1, player2, setPlayer1, setPlayer2]);

  return (
    <Container
      className={`py-4 admin-panel ${styles.adminPanel}`}
      style={{
        backgroundColor: colors.background.primary,
        color: colors.text.primary,
      }}
    >
      {/* Header с переключателем темы */}
      <Row className="mb-4 align-items-center">
        <Col xs={12} md={8}>
          <h2
            className={styles.adminTitle}
            style={colors.utils.getTextStyle("primary")}
          >
            Админ панель скорборда
          </h2>
        </Col>
        <Col xs={12} md={4} className="d-flex justify-content-end">
          <ThemeToggle variant="admin" size="md" />
        </Col>
      </Row>

      {/* Visibility Panel и Meta Panel в один ряд с одинаковой шириной */}
      <Row className="mb-4">
        <Col xs={12} md={6} lg={6}>
          <VisibilityCard
            isVisible={isVisible}
            onVisibilityChange={setVisibility}
            animationDuration={animationDuration}
            onAnimationDurationChange={setAnimationDuration}
          />
        </Col>
        <Col xs={12} md={6} lg={6}>
          <MetaPanel setMeta={() => setMeta(meta)} meta={meta} />
        </Col>
      </Row>

      {/* Layout Panel */}
      <LayoutCard
        layout={layout}
        onLayoutChange={setLayout}
        onReset={() => setLayout(defaultLayout)}
      />

      {/* Color Preset Panel */}
      <ColorPresetCard
        onColorChange={handleColorChange}
        currentColors={color}
      />

      {/* Players Cards */}
      <Row className="justify-content-center align-items-center g-4">
        <Col
          xs={12}
          md={5}
          lg={4}
          className="d-flex justify-content-center mb-3 mb-md-0"
        >
          <PlayerCard
            player={player1}
            onName={(name) => {
              try {
                setPlayer1({ ...player1, name });
              } catch (error) {
                console.error("Error updating player1 name:", error);
              }
            }}
            onSponsor={(sponsor) => {
              try {
                setPlayer1({ ...player1, sponsor });
              } catch (error) {
                console.error("Error updating player1 sponsor:", error);
              }
            }}
            onScore={(score) => {
              try {
                setPlayer1({
                  ...player1,
                  score: Math.max(0, Math.min(99, score)),
                });
              } catch (error) {
                console.error("Error updating player1 score:", error);
              }
            }}
            onWin={() => {
              try {
                setPlayer1({ ...player1, final: "winner" });
              } catch (error) {
                console.error("Error setting player1 as winner:", error);
              }
            }}
            onLose={() => {
              try {
                setPlayer1({ ...player1, final: "loser" });
              } catch (error) {
                console.error("Error setting player1 as loser:", error);
              }
            }}
            onTag={(tag) => {
              try {
                setPlayer1({ ...player1, tag });
              } catch (error) {
                console.error("Error updating player1 tag:", error);
              }
            }}
            onFlag={(flag) => {
              try {
                setPlayer1({ ...player1, flag });
              } catch (error) {
                console.error("Error updating player1 flag:", error);
              }
            }}
            onClearFinal={() => {
              try {
                setPlayer1({ ...player1, final: "none" });
              } catch (error) {
                console.error("Error clearing player1 final status:", error);
              }
            }}
            label="Player 1"
            accent="#0dcaf0"
          />
        </Col>
        <Col
          xs={12}
          md={2}
          lg={2}
          className="d-flex flex-column align-items-center justify-content-center gap-3 mb-3 mb-md-0 mx-2"
        >
          <ActionButtons
            onSwapNames={handleSwapNames}
            onSwapPlayers={swapPlayers}
            onReset={reset}
          />
        </Col>
        <Col
          xs={12}
          md={5}
          lg={4}
          className="d-flex justify-content-center mb-3 mb-md-0"
        >
          <PlayerCard
            player={player2}
            onName={(name) => {
              try {
                setPlayer2({ ...player2, name });
              } catch (error) {
                console.error("Error updating player2 name:", error);
              }
            }}
            onSponsor={(sponsor) => {
              try {
                setPlayer2({ ...player2, sponsor });
              } catch (error) {
                console.error("Error updating player2 sponsor:", error);
              }
            }}
            onScore={(score) => {
              try {
                setPlayer2({
                  ...player2,
                  score: Math.max(0, Math.min(99, score)),
                });
              } catch (error) {
                console.error("Error updating player2 score:", error);
              }
            }}
            onWin={() => {
              try {
                setPlayer2({ ...player2, final: "winner" });
              } catch (error) {
                console.error("Error setting player2 as winner:", error);
              }
            }}
            onLose={() => {
              try {
                setPlayer2({ ...player2, final: "loser" });
              } catch (error) {
                console.error("Error setting player2 as loser:", error);
              }
            }}
            onTag={(tag) => {
              try {
                setPlayer2({ ...player2, tag });
              } catch (error) {
                console.error("Error updating player2 tag:", error);
              }
            }}
            onFlag={(flag) => {
              try {
                setPlayer2({ ...player2, flag });
              } catch (error) {
                console.error("Error updating player2 flag:", error);
              }
            }}
            onClearFinal={() => {
              try {
                setPlayer2({ ...player2, final: "none" });
              } catch (error) {
                console.error("Error clearing player2 final status:", error);
              }
            }}
            label="Player 2"
            accent="#6610f2"
          />
        </Col>
      </Row>
    </Container>
  );
};

const AdminPanel = () => (
  <ScoreboardSignalRContext.Provider
    automaticReconnect={true}
    onError={(error) => {
      console.error("SignalR connection error:", error);
      return new Promise((resolve) => resolve(console.log(error)));
    }}
    onClosed={(event) => {
      console.log("SignalR connection closed:", event);
    }}
    onOpen={(event) => {
      console.log("SignalR connection opened:", event);
    }}
    logger={logger}
    withCredentials={false}
    url={import.meta.env.VITE_BASE_PATH + "scoreboardhub"}
    logMessageContent
  >
    <AdminPanelContent />
  </ScoreboardSignalRContext.Provider>
);

export default AdminPanel;
