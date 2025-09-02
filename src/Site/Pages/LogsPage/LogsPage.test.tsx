import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "@/shared/Utils/ToastModal";

import LogsPage from "./LogsPage";

// Мокаем API
jest.mock("@/shared/api", () => ({
  Logs: jest.fn().mockImplementation(() => ({
    logsList: jest.fn().mockResolvedValue({
      data: {
        logs: [],
        totalCount: 0,
        page: 1,
        pageSize: 25,
        totalPages: 0,
      },
    }),
    logsStatisticsList: jest.fn().mockResolvedValue({
      data: {
        totalLogs: 0,
        warningLogs: 0,
        errorLogs: 0,
        criticalLogs: 0,
      },
    }),
  })),
}));

// Мокаем хуки
jest.mock("@/shared/Utils/useSiteColors", () => ({
  useSiteColors: () => ({
    utils: {
      getTextStyle: () => ({}),
    },
  }),
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ToastProvider>
        {component}
      </ToastProvider>
    </BrowserRouter>
  );
};

describe("LogsPage", () => {
  it("renders without crashing", () => {
    renderWithProviders(<LogsPage />);
    expect(screen.getByText("Логи приложения")).toBeInTheDocument();
  });

  it("displays page title", () => {
    renderWithProviders(<LogsPage />);
    expect(screen.getByText("Логи приложения")).toBeInTheDocument();
    expect(screen.getByText("Просмотр и анализ логов системы MARS в реальном времени")).toBeInTheDocument();
  });

  it("renders filters section", () => {
    renderWithProviders(<LogsPage />);
    expect(screen.getByText("Поиск по тексту")).toBeInTheDocument();
    expect(screen.getByText("Уровень логирования")).toBeInTheDocument();
    expect(screen.getByText("Дата начала")).toBeInTheDocument();
    expect(screen.getByText("Дата окончания")).toBeInTheDocument();
  });

  it("renders search button", () => {
    renderWithProviders(<LogsPage />);
    expect(screen.getByText("Найти логи")).toBeInTheDocument();
  });

  it("renders reset button", () => {
    renderWithProviders(<LogsPage />);
    expect(screen.getByText("Сбросить")).toBeInTheDocument();
  });

  it("renders last 24 hours button", () => {
    renderWithProviders(<LogsPage />);
    expect(screen.getByText("Последние 24 часа")).toBeInTheDocument();
  });
});
