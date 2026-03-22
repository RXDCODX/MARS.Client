import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Form, Spinner } from "react-bootstrap";

import { SpotifyAuth } from "@/shared/api";
import {
  OperationResult,
  SpotifyAuthStartResult,
  SpotifyAuthStatusResult,
} from "@/shared/api/types/data-contracts";
import { useToastModal } from "@/shared/Utils/ToastModal";

import styles from "./SpotifyAuthManager.module.scss";

const SpotifyAuthManager: React.FC = () => {
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [status, setStatus] = useState<SpotifyAuthStatusResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);
  const { showToast } = useToastModal();

  const apiClient = new SpotifyAuth();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setIsCheckingStatus(true);
    try {
      const response = await apiClient.spotifyAuthStatusList();
      const result =
        response as unknown as OperationResult<SpotifyAuthStatusResult>;
      if (result.success && result.data) {
        setStatus(result.data);
        setClientId(result.data.hasClientCredentials ? "████████████" : "");
        setClientSecret(result.data.hasClientCredentials ? "████████████" : "");
      }
    } catch (error) {
      console.error("Ошибка проверки статуса Spotify:", error);
    } finally {
      setIsCheckingStatus(false);
    }
  };

  const handleStartAuth = async () => {
    if (
      !clientId ||
      !clientSecret ||
      clientId === "████████████" ||
      clientSecret === "████████████"
    ) {
      showToast({
        success: false,
        message: "Пожалуйста, введите ClientId и ClientSecret",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiClient.spotifyAuthStartCreate({
        clientId: clientId.trim(),
        clientSecret: clientSecret.trim(),
      });
      const result =
        response as unknown as OperationResult<SpotifyAuthStartResult>;

      if (result.success && result.data?.authUrl) {
        showToast({
          success: true,
          message: "Открываю Spotify для авторизации...",
        });
        window.open(result.data.authUrl, "_blank");

        setTimeout(() => {
          checkAuthStatus();
        }, 2000);
      } else {
        showToast({
          success: false,
          message: result.message || "Ошибка при старте авторизации",
        });
      }
    } catch (error) {
      console.error("Ошибка при старте авторизации:", error);
      showToast({
        success: false,
        message: "Ошибка при старте авторизации",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    if (!window.confirm("Вы уверены, что хотите отключить Spotify?")) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiClient.spotifyAuthDisconnectCreate();
      const result = response as unknown as OperationResult;
      if (result.success) {
        showToast({
          success: true,
          message: "Spotify аккаунт отключен",
        });
        setStatus(null);
        setClientId("");
        setClientSecret("");
      } else {
        showToast({
          success: false,
          message: result.message || "Ошибка при отключении",
        });
      }
    } catch (error) {
      console.error("Ошибка при отключении:", error);
      showToast({
        success: false,
        message: "Ошибка при отключении",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingStatus) {
    return (
      <Card className={styles.spotifyManager}>
        <Card.Body className="text-center">
          <Spinner animation="border" role="status" className="me-2" />
          <span>Проверяю статус Spotify...</span>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className={styles.spotifyManager}>
      <Card.Header className={styles.header}>
        <h3>🎵 Spotify для SoundRequest</h3>
      </Card.Header>
      <Card.Body>
        {status?.isLinked && (
          <Alert variant="success" className={styles.statusAlert}>
            <div className={styles.statusContent}>
              <div>
                <strong>Spotify подключен</strong>
                <p className={styles.userInfo}>
                  👤 {status.displayName} ({status.product})
                </p>
                {status.deviceId && (
                  <p className={styles.deviceInfo}>
                    🎧 Устройство: {status.deviceId}
                  </p>
                )}
              </div>
              <Button
                variant="danger"
                onClick={handleDisconnect}
                disabled={isLoading}
                className={styles.disconnectBtn}
              >
                Отключить
              </Button>
            </div>
          </Alert>
        )}

        {!status?.isLinked && (
          <div className={styles.formContainer}>
            <Form.Group className="mb-3">
              <Form.Label>Spotify Client ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите Client ID"
                value={clientId}
                onChange={e => setClientId(e.target.value)}
                disabled={isLoading || status?.hasClientCredentials}
              />
              <Form.Text className="text-muted">
                Получите на{" "}
                <a
                  href="https://developer.spotify.com/dashboard"
                  target="_blank"
                  rel="noreferrer"
                >
                  Spotify Developer Dashboard
                </a>
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Spotify Client Secret</Form.Label>
              <Form.Control
                type="password"
                placeholder="Введите Client Secret"
                value={clientSecret}
                onChange={e => setClientSecret(e.target.value)}
                disabled={isLoading || status?.hasClientCredentials}
              />
              <Form.Text className="text-muted">
                Никогда не делитесь этим ключом
              </Form.Text>
            </Form.Group>

            <div className={styles.buttonGroup}>
              <Button
                variant="success"
                onClick={handleStartAuth}
                disabled={isLoading || !clientId || !clientSecret}
                className={styles.connectBtn}
              >
                {isLoading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Подключение...
                  </>
                ) : (
                  "Подключить Spotify"
                )}
              </Button>
            </div>

            {status?.hasClientCredentials && !status?.isLinked && (
              <Alert variant="warning" className="mt-3">
                ⚠️ Учетные данные сохранены, но аккаунт еще не подключен.
                Нажмите кнопку выше для авторизации.
              </Alert>
            )}
          </div>
        )}

        <div className={styles.info}>
          <h5>ℹ️ Информация</h5>
          <ul>
            <li>
              Spotify режим позволяет заказывать треки из Spotify вместо YouTube
            </li>
            <li>
              После подключения приватные ключи хранятся безопасно только на
              сервере
            </li>
            <li>
              Управление соединением работает как Songify: берет активное
              устройство Spotify
            </li>
          </ul>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SpotifyAuthManager;
