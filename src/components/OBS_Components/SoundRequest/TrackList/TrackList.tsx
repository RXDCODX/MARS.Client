import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Spinner } from "react-bootstrap";

import { RootState as RootStateClient } from "@/shared/api";
import type { RootState as RootStateDto } from "@/shared/api/types/data-contracts";
import type { OperationResult } from "@/shared/types/OperationResult";
import { useToastModal } from "@/shared/Utils/ToastModal";

import { SoundRequestPlayer } from "../Player/SoundRequestPlayer";
import styles from "./TrackList.module.scss";

const SOUND_REQUEST_PROVIDER_KEY = "SoundRequestProvider";
const PROVIDER_YOUTUBE = "YouTube";
const PROVIDER_SPOTIFY = "Spotify";
const PROVIDER_ICONS = {
  [PROVIDER_YOUTUBE]: "/icons/providers/youtube.svg",
  [PROVIDER_SPOTIFY]: "/icons/providers/spotify.svg",
} as const;

type ProviderName = typeof PROVIDER_YOUTUBE | typeof PROVIDER_SPOTIFY;

const parseProvider = (value?: string): ProviderName => {
  if (value?.trim().toLowerCase() === PROVIDER_SPOTIFY.toLowerCase()) {
    return PROVIDER_SPOTIFY;
  }

  return PROVIDER_YOUTUBE;
};

/**
 * Компонент для отображения списка треков и плеера управления SoundRequest
 * Автоматически определяет разрешение экрана и рендерит соответствующий интерфейс
 */
export function TrackList() {
  const { showToast } = useToastModal();
  const api = useMemo(() => new RootStateClient(), []);

  const [provider, setProvider] = useState<ProviderName>(PROVIDER_YOUTUBE);
  const [isLoadingProvider, setIsLoadingProvider] = useState(true);
  const [isSavingProvider, setIsSavingProvider] = useState(false);

  const loadProvider = useCallback(async () => {
    setIsLoadingProvider(true);

    try {
      const response = await api.rootStateDetail(SOUND_REQUEST_PROVIDER_KEY);
      const operation = response.data as OperationResult<RootStateDto>;

      if (operation.success) {
        setProvider(parseProvider(operation.data?.value));
      } else {
        setProvider(PROVIDER_YOUTUBE);
      }
    } catch {
      setProvider(PROVIDER_YOUTUBE);
    } finally {
      setIsLoadingProvider(false);
    }
  }, [api]);

  useEffect(() => {
    void loadProvider();
  }, [loadProvider]);

  const toggleProvider = useCallback(async () => {
    const nextProvider =
      provider === PROVIDER_YOUTUBE ? PROVIDER_SPOTIFY : PROVIDER_YOUTUBE;

    setIsSavingProvider(true);
    try {
      const response = await api.rootStateCreate({
        name: SOUND_REQUEST_PROVIDER_KEY,
        value: nextProvider,
        description: "Активный провайдер SoundRequest (YouTube/Spotify)",
        typeDescription: "enum: SoundRequestProvider",
      });

      const operation = response.data as OperationResult;
      if (operation.success) {
        setProvider(nextProvider);
        showToast({
          success: true,
          message: `Провайдер переключен: ${nextProvider}`,
        });
      } else {
        showToast({
          success: false,
          message: operation.message ?? "Не удалось переключить провайдер",
        });
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Ошибка при переключении провайдера";
      showToast({ success: false, message });
    } finally {
      setIsSavingProvider(false);
    }
  }, [api, provider, showToast]);

  const isProviderButtonDisabled = isLoadingProvider || isSavingProvider;
  const providerIconUrl = PROVIDER_ICONS[provider];
  const providerButtonVariant: "success" | "danger" =
    provider === PROVIDER_SPOTIFY ? "success" : "danger";

  let providerButtonContent: ReactNode;
  if (isProviderButtonDisabled) {
    providerButtonContent = (
      <span className={styles.providerButtonContent}>
        <Spinner size="sm" animation="border" />
        <span>{provider}</span>
      </span>
    );
  } else {
    providerButtonContent = (
      <span className={styles.providerButtonContent}>
        <img
          src={providerIconUrl}
          alt={`${provider} icon`}
          className={styles.providerIcon}
          loading="lazy"
        />
        <span>{provider}</span>
      </span>
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.providerBar}>
        <span className={styles.providerLabel}>Провайдер:</span>
        <button
          type="button"
          className={`btn btn-${providerButtonVariant} ${styles.providerButton}`}
          onClick={() => void toggleProvider()}
          disabled={isProviderButtonDisabled}
        >
          {providerButtonContent}
        </button>
      </div>
      <SoundRequestPlayer />
    </div>
  );
}
