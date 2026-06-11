import { Suspense, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { allRoutes, RouteConfig } from "@/routes/config";

import { reactBitsBackgroundComponentRegistry } from "@/shared/components/ReactBitsBackgroundsLegacy/registry";

const GridMotionBg = reactBitsBackgroundComponentRegistry.GridMotion;

const typeLabels: Record<string, string> = {
  site: "Страницы сайта",
  obs: "OBS Компоненты",
  "control panel": "Панель управления",
  special: "Специальные",
};

const typeIcons: Record<string, string> = {
  site: "🌐",
  obs: "📹",
  "control panel": "⚙️",
  special: "⭐",
};

const typeColors: Record<string, string> = {
  site: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  obs: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  "control panel": "bg-amber-500/10 text-amber-500 border-amber-500/20",
  special: "bg-purple-500/10 text-purple-500 border-purple-500/20",
};

const RoutesPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const types = useMemo(() => {
    const uniqueTypes = [...new Set(allRoutes.map((r) => r.type))];
    return ["all", ...uniqueTypes];
  }, []);

  const filteredRoutes = useMemo(() => {
    let routes = allRoutes;
    if (activeFilter !== "all") {
      routes = routes.filter((r) => r.type === activeFilter);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      routes = routes.filter(
        (r) => r.name.toLowerCase().includes(query) || r.path.toLowerCase().includes(query)
      );
    }
    return routes;
  }, [activeFilter, searchQuery]);

  const groupedFiltered = useMemo(() => {
    return filteredRoutes.reduce(
      (acc, route) => {
        if (!acc[route.type]) acc[route.type] = [];
        acc[route.type].push(route);
        return acc;
      },
      {} as Record<string, RouteConfig[]>
    );
  }, [filteredRoutes]);

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const route of allRoutes) {
      counts[route.type] = (counts[route.type] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <div className="relative min-h-screen" data-testid="routes-page">
      <div className="fixed inset-0 -z-10 opacity-30">
        <Suspense fallback={null}>
          <GridMotionBg className="absolute inset-0" />
        </Suspense>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--site-text-primary)]">
            Все маршруты
          </h1>
          <span className="rounded-full bg-[var(--site-bg-accent)] px-2.5 py-0.5 text-xs font-semibold text-[var(--site-text-light)]">
            {allRoutes.length}
          </span>
        </header>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5" data-testid="filter-tabs">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                  activeFilter === type
                    ? "border-[var(--site-border-accent)] bg-[var(--site-bg-accent)] text-[var(--site-text-light)]"
                    : "border-[var(--site-border-primary)] bg-[var(--site-bg-secondary)] text-[var(--site-text-primary)] hover:bg-[var(--site-hover-bg)] hover:border-[var(--site-border-accent)]"
                }`}
                data-testid={`filter-tab-${type}`}
              >
                {type === "all" ? (
                  "Все"
                ) : (
                  <>
                    <span>{typeIcons[type] || "📄"}</span>
                    {typeLabels[type] || type}
                    <span
                      className={`ml-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${typeColors[type] || "bg-gray-500/10 text-gray-500"}`}
                    >
                      {typeCounts[type] || 0}
                    </span>
                  </>
                )}
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Поиск маршрутов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-56 rounded-lg border border-[var(--site-border-primary)] bg-[var(--site-bg-tertiary)] px-3 py-1.5 pr-8 text-sm text-[var(--site-text-primary)] outline-none transition-all focus:border-[var(--site-border-accent)] focus:ring-2 focus:ring-[var(--site-focus-ring)]"
              data-testid="search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs opacity-50 hover:opacity-100"
                data-testid="search-clear"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {filteredRoutes.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16">
            <div className="text-4xl opacity-50">🔍</div>
            <p className="text-[var(--site-text-secondary)]">Маршруты не найдены</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {Object.entries(groupedFiltered).map(([type, routes]) => (
              <div key={type}>
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-lg">{typeIcons[type] || "📄"}</span>
                  <h2 className="text-base font-semibold text-[var(--site-text-primary)]">
                    {typeLabels[type] || type}
                  </h2>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${typeColors[type] || "bg-gray-500/10 text-gray-500 border-gray-500/20"}`}
                  >
                    {routes.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {routes.map((route, index) => (
                    <Link
                      key={index}
                      to={route.path}
                      className="group flex items-center justify-between rounded-xl border border-[var(--site-border-primary)] bg-[var(--site-bg-card)] p-3.5 no-underline transition-all hover:-translate-y-0.5 hover:border-[var(--site-border-accent)] hover:shadow-[var(--site-shadow-medium)]"
                      data-testid={`route-card-${route.path.replace(/\//g, "-").replace(/^-/, "")}`}
                    >
                      <div className="flex min-w-0 flex-col gap-0.5">
                        <span className="truncate text-sm font-semibold text-[var(--site-text-primary)]">
                          {route.name || route.path}
                        </span>
                        <code className="truncate text-xs text-[var(--site-text-muted)] opacity-60">
                          {route.path}
                        </code>
                      </div>
                      <span className="ml-2 flex-shrink-0 text-sm opacity-30 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-6 rounded-xl border border-[var(--site-border-primary)] bg-[var(--site-bg-secondary)]/80 p-4 backdrop-blur-sm">
          {Object.entries(typeCounts).map(([type, count]) => (
            <div key={type} className="flex items-center gap-1.5">
              <span>{typeIcons[type] || "📄"}</span>
              <span className="text-xs text-[var(--site-text-secondary)] opacity-70">
                {typeLabels[type] || type}
              </span>
              <span className="text-sm font-bold text-[var(--site-text-primary)]">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoutesPage;
