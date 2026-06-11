import { Suspense, useEffect, useRef, useState } from "react";
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
    <div className="relative min-h-screen" data-testid="page-welcome">
      <div className="fixed inset-0 -z-10">
        <Suspense fallback={null}>
          <ParticlesBg
            className="absolute inset-0"
            particleCount={80}
            speed={1}
            color="#667eea"
            opacity={0.3}
          />
        </Suspense>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold tracking-tight text-[var(--site-text-primary)]">
              MARS Server Dashboard
            </h1>
            <div className="flex items-center gap-2 text-sm">
              <span
                className={`h-2 w-2 rounded-full ${error ? "bg-red-500 shadow-[0_0_6px_#ef4444]" : "bg-emerald-500 shadow-[0_0_6px_#22c55e]"}`}
              />
              <span className="text-[var(--site-text-secondary)]">
                {error ? "Офлайн" : "Онлайн"}
              </span>
            </div>
          </div>
          {stats && (
            <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--site-text-secondary)] opacity-80">
              <span>{stats.machineName}</span>
              <span className="opacity-40">|</span>
              <span>{stats.osVersion}</span>
              <span className="opacity-40">|</span>
              <span>{stats.runtimeVersion}</span>
            </div>
          )}
        </header>

        {loading && (
          <div className="flex flex-col items-center justify-center gap-4 py-16">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--site-border-primary)] border-t-[var(--site-text-accent)]" />
            <p className="text-[var(--site-text-secondary)]">Загрузка статистики...</p>
          </div>
        )}

        {error && !stats && (
          <div className="flex flex-col items-center justify-center gap-4 py-16">
            <div className="text-4xl">⚠️</div>
            <p className="text-[var(--site-text-secondary)]">{error}</p>
            <button
              onClick={fetchStats}
              className="rounded-lg border border-[var(--site-border-primary)] bg-[var(--site-bg-secondary)] px-4 py-2 text-sm font-medium text-[var(--site-text-primary)] transition-all hover:-translate-y-0.5 hover:bg-[var(--site-bg-tertiary)]"
            >
              Повторить
            </button>
          </div>
        )}

        {stats && (
          <>
            <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
              <div className="col-span-1 rounded-xl border border-[var(--site-border-primary)] bg-[var(--site-bg-card)] p-5 shadow-[var(--site-shadow-light)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--site-shadow-medium)] sm:col-span-2 lg:col-span-2">
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[var(--site-text-secondary)]">
                  Быстрые ссылки
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { to: "/admin", icon: "🔧", label: "Панель управления" },
                    { to: "/logs", icon: "📋", label: "Логи" },
                    { to: "/services", icon: "🔌", label: "Сервисы" },
                    { to: "/routes", icon: "🗺️", label: "Маршруты" },
                  ].map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="flex items-center gap-2 rounded-lg bg-[var(--site-bg-tertiary)] px-3 py-2.5 text-sm font-medium text-[var(--site-text-primary)] transition-all hover:translate-x-1 hover:bg-[var(--site-hover-bg)]"
                      data-testid={`link-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      <span>{link.icon}</span>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
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
  <div
    className="rounded-xl border border-[var(--site-border-primary)] bg-[var(--site-bg-card)] p-5 shadow-[var(--site-shadow-light)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--site-shadow-medium)]"
    data-testid={dataTestId}
  >
    <div className="mb-2 flex items-center gap-2">
      <span className="text-lg">{icon}</span>
      <span className="text-xs font-medium uppercase tracking-wider text-[var(--site-text-secondary)]">
        {title}
      </span>
    </div>
    <div className="mb-0.5 text-2xl font-bold text-[var(--site-text-primary)]">{value}</div>
    <div className="text-xs text-[var(--site-text-muted)] opacity-70">{subtitle}</div>
    {progress !== undefined && (
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-[var(--site-bg-tertiary)]">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${Math.min(progress, 100)}%`,
            backgroundColor:
              progress > 80
                ? "var(--site-text-danger)"
                : progress > 60
                  ? "var(--site-text-warning)"
                  : "var(--site-text-success)",
          }}
        />
      </div>
    )}
  </div>
);

export default WelcomePage;
