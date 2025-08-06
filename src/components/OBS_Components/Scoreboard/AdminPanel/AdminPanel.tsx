import { HubConnectionState } from "@microsoft/signalr";
import { useCallback, useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useSiteColors } from "@/shared/Utils/useSiteColors";

import ThemeToggle from "../../../ThemeToggle";
import ActionButtons from "./ActionButtons";
import styles from "./AdminPanel.module.scss";
import ColorPresetCard from "./ColorCard/ColorPresetCard";
import LayoutCard from "./LayoutCard";
import MetaPanel from "./MetaPanel/MetaPanel";
import PlayerCard from "./PlayerCard/PlayerCard";
import {
  ScoreboardState,
  useGeneralActions,
  usePlayerActions,
  useScoreboardStore,
} from "./store/scoreboardStore";
import VisibilityCard from "./VisibilityCard/VisibilityCard";

const AdminPanelContent = () => {
  const colors = useSiteColors();
  const { swapPlayers } = usePlayerActions();
  const { handleReceiveState, reset } = useGeneralActions();

  // Реф для отслеживания последнего обновления
  const lastUpdateRef = useRef<number>(0);

  // Функция для обработки получения состояния с сервера
  const handleReceiveStateCallback = useCallback(
    (state: ScoreboardState) => {
      const now = Date.now();
      // Дополнительная защита от слишком частых обновлений
      if (now - lastUpdateRef.current < 100) {
        console.log("Ignoring too frequent update");
        return;
      }
      lastUpdateRef.current = now;
      handleReceiveState(state);
    },
    [handleReceiveState]
  );

  const connection = useScoreboardStore(state => state._connection);

  useEffect(() => {
    if (connection.state === HubConnectionState.Connected) {
      connection.on("ReceiveState", handleReceiveStateCallback);
      connection.on("StateUpdated", handleReceiveStateCallback);
    }
  }, [connection, handleReceiveStateCallback]);

  // Редирект на админку при открытии с телефона
  const navigate = useNavigate();
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      navigate("/scoreboard-admin");
    }
  }, [navigate]);

  const handleSwapNames = useCallback(async () => {
    try {
      await swapPlayers();
    } catch (error) {
      console.error("Error swapping names:", error);
    }
  }, [swapPlayers]);

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
          <VisibilityCard />
        </Col>
        <Col xs={12} md={6} lg={6}>
          <MetaPanel />
        </Col>
      </Row>

      {/* Layout Panel */}
      <LayoutCard />

      {/* Color Preset Panel */}
      <ColorPresetCard />

      {/* Players Cards */}
      <Row className="justify-content-center align-items-center g-4">
        <Col
          xs={12}
          md={5}
          lg={4}
          className="d-flex justify-content-center mb-3 mb-md-0"
        >
          <PlayerCard playerIndex={1} label="Player 1" accent="#0dcaf0" />
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
          <PlayerCard playerIndex={2} label="Player 2" accent="#6610f2" />
        </Col>
      </Row>
    </Container>
  );
};

const AdminPanel = () => <AdminPanelContent />;

export default AdminPanel;
