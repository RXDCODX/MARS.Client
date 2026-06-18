import { ReloadOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Progress, Spin, Switch, Tag, Typography, message } from "antd";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { reactBitsBackgroundComponentRegistry } from "@/shared/components/ReactBitsBackgroundsLegacy/registry";

const ParticlesBg = reactBitsBackgroundComponentRegistry.Particles;

interface ServerStats {
  cpuUsagePercent: number;
  memoryWorkingSetBytes: number;
  memoryPrivateBytes: number;
  memoryGcHeapBytes: number;
  memoryTotalBytes: number;
  uptimeSeconds: number;
  threadCount: number;
  activeServicesCount: number;
  totalServicesCount: number;
  osVersion: string;
  runtimeVersion: string;
  machineName: string;
  processorCount: number;
  isEventSubConnected: boolean;
  isTwitchChatConnected: boolean;
  isAudioControllerConnected: boolean;
  isTtsConnected: boolean;
  isPuntoSwitcherEnabled: boolean;
  isTtsFilterEnabled: boolean;
  nearestWeddingAnniversaryName?: string;
  nearestWeddingAnniversaryDate?: string;
  nearestWeddingAnniversaryUser?: string;
}

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

const formatUptime = (seconds: number): string => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const parts: string[] = [];
  if (days > 0) parts.push(`${days}д`);
  if (hours > 0) parts.push(`${hours}ч`);
  if (minutes > 0) parts.push(`${minutes}м`);
  parts.push(`${secs}с`);
  return parts.join(" ");
};

const WelcomePage: React.FC = () => {
  const [stats, setStats] = useState<ServerStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/ServerStats");
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
        setError(null);
      } else {
        setError(data.message || "Ошибка получения данных");
      }
    } catch {
      setError("Сервер недоступен");
    } finally {
      setLoading(false);
    }
  };

  const handleTtsFilterToggle = useCallback(async () => {
    try {
      const response = await fetch("/api/ServerStats/toggle-tts-filter", {
        method: "POST",
      });
      const data = await response.json();
      if (data.success) {
        setStats(prev =>
          prev ? { ...prev, isTtsFilterEnabled: data.data } : prev,
        );
        message.success(data.message || "Фильтр TTS переключён");
      } else {
        message.error(data.message || "Ошибка переключения фильтра TTS");
      }
    } catch {
      message.error("Сервер недоступен");
    }
  }, []);

  useEffect(() => {
    fetchStats();
    intervalRef.current = setInterval(fetchStats, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const memoryUsedPercent = stats
    ? Math.round((stats.memoryWorkingSetBytes / stats.memoryTotalBytes) * 100)
    : 0;

  const gcUsedPercent = stats
    ? Math.round((stats.memoryGcHeapBytes / stats.memoryTotalBytes) * 100)
    : 0;

  return (
    <div
      style={{ position: "relative", minHeight: "100vh" }}
      data-testid="page-welcome"
    >
      <div style={{ position: "fixed", inset: 0, zIndex: -10 }}>
        <Suspense fallback={null}>
          <ParticlesBg
            style={{ position: "absolute", inset: 0 }}
            particleCount={80}
            speed={1}
            color="#667eea"
            opacity={0.3}
          />
        </Suspense>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
        <Flex
          justify="space-between"
          align="center"
          wrap="wrap"
          gap={16}
          style={{ marginBottom: 32 }}
        >
          <Flex align="center" gap={12}>
            <Typography.Title level={2} style={{ margin: 0 }}>
              MARS Server Dashboard
            </Typography.Title>
            <Tag color={error ? "error" : "success"}>
              {error ? "Офлайн" : "Онлайн"}
            </Tag>
          </Flex>
          {stats && (
            <Flex gap={8} align="center" wrap="wrap">
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                {stats.machineName}
              </Typography.Text>
              <Typography.Text
                type="secondary"
                style={{ fontSize: 12, opacity: 0.4 }}
              >
                |
              </Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                {stats.osVersion}
              </Typography.Text>
              <Typography.Text
                type="secondary"
                style={{ fontSize: 12, opacity: 0.4 }}
              >
                |
              </Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                {stats.runtimeVersion}
              </Typography.Text>
            </Flex>
          )}
        </Flex>

        {loading && (
          <Flex
            vertical
            align="center"
            justify="center"
            gap={16}
            style={{ padding: "64px 0" }}
          >
            <Spin size="large" />
            <Typography.Text type="secondary">
              Загрузка статистики...
            </Typography.Text>
          </Flex>
        )}

        {error && !stats && (
          <Flex
            vertical
            align="center"
            justify="center"
            gap={16}
            style={{ padding: "64px 0" }}
          >
            <Typography.Text style={{ fontSize: 32 }}>⚠️</Typography.Text>
            <Typography.Text type="secondary">{error}</Typography.Text>
            <Button icon={<ReloadOutlined />} onClick={fetchStats}>
              Повторить
            </Button>
          </Flex>
        )}

        {stats && (
          <>
            <Flex gap={12} wrap="wrap" style={{ marginBottom: 12 }}>
              <StatCard
                title="CPU"
                value={`${stats.cpuUsagePercent}%`}
                subtitle={`${stats.processorCount} ядер`}
                icon="⚡"
                progress={stats.cpuUsagePercent}
                dataTestId="stat-cpu"
              />
              <StatCard
                title="Память (Working Set)"
                value={formatBytes(stats.memoryWorkingSetBytes)}
                subtitle={`из ${formatBytes(stats.memoryTotalBytes)}`}
                icon="💾"
                progress={memoryUsedPercent}
                dataTestId="stat-memory-working"
              />
              <StatCard
                title="GC Heap"
                value={formatBytes(stats.memoryGcHeapBytes)}
                subtitle={`${gcUsedPercent}% от total`}
                icon="🗑️"
                progress={gcUsedPercent}
                dataTestId="stat-gc-heap"
              />
              <StatCard
                title="Аптайм"
                value={formatUptime(stats.uptimeSeconds)}
                subtitle="время работы"
                icon="⏱️"
                dataTestId="stat-uptime"
              />
            </Flex>

            <Flex gap={12} wrap="wrap">
              <StatCard
                title="Потоки"
                value={String(stats.threadCount)}
                subtitle="активных потоков"
                icon="🧵"
                dataTestId="stat-threads"
              />
              <StatCard
                title="Сервисы"
                value={`${stats.activeServicesCount}/${stats.totalServicesCount}`}
                subtitle="активных"
                icon="⚙️"
                dataTestId="stat-services"
              />
              <Card
                style={{
                  flex: "1 1 300px",
                  minWidth: 300,
                }}
              >
                <Typography.Text
                  type="secondary"
                  style={{
                    display: "block",
                    marginBottom: 12,
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  Быстрые ссылки
                </Typography.Text>
                <Flex gap={8} wrap="wrap">
                  {[
                    { to: "/admin", icon: "🔧", label: "Панель управления" },
                    { to: "/logs", icon: "📋", label: "Логи" },
                    { to: "/services", icon: "🔌", label: "Сервисы" },
                    { to: "/routes", icon: "🗺️", label: "Маршруты" },
                  ].map(link => (
                    <Link
                      key={link.to}
                      to={link.to}
                      style={{ textDecoration: "none" }}
                      data-testid={`link-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      <Button size="small" style={{ width: "100%" }}>
                        <span style={{ marginRight: 6 }}>{link.icon}</span>
                        {link.label}
                      </Button>
                    </Link>
                  ))}
                </Flex>
              </Card>
            </Flex>

            <Flex gap={12} wrap="wrap" style={{ marginTop: 12 }}>
              <ConnectionCard
                title="Twitch EventSub"
                connected={stats.isEventSubConnected}
                icon="🔌"
                dataTestId="stat-eventsub"
              />
              <ConnectionCard
                title="Twitch Chat"
                connected={stats.isTwitchChatConnected}
                icon="💬"
                dataTestId="stat-twitch-chat"
              />
              <ConnectionCard
                title="AudioController (SoundBar)"
                connected={stats.isAudioControllerConnected}
                icon="🔊"
                dataTestId="stat-audio-soundbar"
              />
              <ConnectionCard
                title="AudioController (TTS)"
                connected={stats.isTtsConnected}
                icon="🗣️"
                dataTestId="stat-audio-tts"
              />
              <ConnectionCard
                title="PuntoSwitcher"
                connected={stats.isPuntoSwitcherEnabled}
                icon="⌨️"
                dataTestId="stat-punto-switcher"
              />
              <ConnectionCard
                title="TTS Filter"
                connected={stats.isTtsFilterEnabled}
                icon="🔇"
                dataTestId="stat-tts-filter"
                onToggle={handleTtsFilterToggle}
                connectedText="Включено"
                disconnectedText="Выключено"
              />
            </Flex>

            {stats.nearestWeddingAnniversaryName && (
              <Card
                data-testid="card-wedding-anniversary"
                style={{ marginTop: 12 }}
              >
                <Typography.Text
                  type="secondary"
                  style={{
                    display: "block",
                    marginBottom: 12,
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  Ближайшая годовщина свадьбы 💍
                </Typography.Text>
                <Typography.Text strong>
                  @{stats.nearestWeddingAnniversaryUser}
                </Typography.Text>
                <Typography.Text> — </Typography.Text>
                <Typography.Text>
                  {stats.nearestWeddingAnniversaryName}
                </Typography.Text>
                <Typography.Text
                  type="secondary"
                  style={{ marginLeft: 8, fontSize: 12 }}
                >
                  {stats.nearestWeddingAnniversaryDate
                    ? new Date(
                        stats.nearestWeddingAnniversaryDate
                      ).toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : ""}
                </Typography.Text>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  progress?: number;
  dataTestId: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  progress,
  dataTestId,
}) => (
  <Card style={{ flex: "1 1 200px", minWidth: 200 }} data-testid={dataTestId}>
    <Flex align="center" gap={8} style={{ marginBottom: 8 }}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      <Typography.Text
        type="secondary"
        style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}
      >
        {title}
      </Typography.Text>
    </Flex>
    <Typography.Title level={3} style={{ margin: 0, lineHeight: 1.2 }}>
      {value}
    </Typography.Title>
    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
      {subtitle}
    </Typography.Text>
    {progress !== undefined && (
      <Progress
        percent={Math.min(progress, 100)}
        showInfo={false}
        strokeColor={
          progress > 80
            ? "var(--site-text-danger)"
            : progress > 60
              ? "var(--site-text-warning)"
              : "var(--site-text-success)"
        }
        size="small"
        style={{ marginTop: 8 }}
      />
    )}
  </Card>
);

interface ConnectionCardProps {
  title: string;
  connected: boolean;
  icon: string;
  dataTestId: string;
  onToggle?: () => void;
  connectedText?: string;
  disconnectedText?: string;
}

const ConnectionCard: React.FC<ConnectionCardProps> = ({
  title,
  connected,
  icon,
  dataTestId,
  onToggle,
  connectedText = "Подключено",
  disconnectedText = "Отключено",
}) => (
  <Card
    data-testid={dataTestId}
    style={{
      flex: "1 1 180px",
      minWidth: 180,
      backgroundColor: connected
        ? "var(--ant-color-success)"
        : "var(--ant-color-error)",
      borderColor: connected
        ? "var(--ant-color-success-border)"
        : "var(--ant-color-error-border)",
    }}
  >
    <Flex align="center" gap={8} style={{ marginBottom: 8 }}>
      <span style={{ fontSize: 18, color: "#fff" }}>{icon}</span>
      <Typography.Text
        style={{
          fontSize: 12,
          textTransform: "uppercase",
          letterSpacing: 1,
          color: "#fff",
        }}
      >
        {title}
      </Typography.Text>
    </Flex>
    <Flex align="center" gap={8} justify="space-between">
      <Typography.Text
        style={{ fontWeight: 600, color: "#fff" }}
      >
        {connected ? connectedText : disconnectedText}
      </Typography.Text>
      {onToggle && (
        <Switch
          checked={connected}
          onChange={onToggle}
          size="small"
          data-testid={`switch-${dataTestId}`}
        />
      )}
    </Flex>
  </Card>
);

export default WelcomePage;
