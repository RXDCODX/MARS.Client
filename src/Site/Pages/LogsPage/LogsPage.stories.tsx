import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "@/shared/Utils/ToastModal";

import LogsPage from "./LogsPage";

const meta: Meta<typeof LogsPage> = {
  title: "Pages/LogsPage",
  component: LogsPage,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Страница для просмотра и анализа логов системы MARS с расширенными возможностями фильтрации и поиска.",
      },
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <ToastProvider>
          <Story />
        </ToastProvider>
      </BrowserRouter>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithMockData: Story = {
  args: {},
  parameters: {
    mockData: {
      logs: [
        {
          id: "1",
          whenLogged: "2024-01-15T10:30:00Z",
          message: "Приложение успешно запущено",
          logLevel: "Info",
        },
        {
          id: "2",
          whenLogged: "2024-01-15T10:31:00Z",
          message: "Предупреждение: низкий объем памяти",
          logLevel: "Warning",
        },
        {
          id: "3",
          whenLogged: "2024-01-15T10:32:00Z",
          message: "Ошибка подключения к базе данных",
          logLevel: "Error",
          stackTrace: "System.Data.SqlClient.SqlException: Connection timeout",
        },
      ],
      statistics: {
        totalLogs: 1500,
        warningLogs: 45,
        errorLogs: 12,
        criticalLogs: 2,
        oldestLogDate: "2024-01-01T00:00:00Z",
        newestLogDate: "2024-01-15T10:32:00Z",
      },
    },
  },
};

export const Loading: Story = {
  args: {},
  parameters: {
    mockData: {
      isLoading: true,
      isLoadingStats: true,
    },
  },
};

export const Error: Story = {
  args: {},
  parameters: {
    mockData: {
      error: "Ошибка подключения к серверу логов",
    },
  },
};

export const Empty: Story = {
  args: {},
  parameters: {
    mockData: {
      logs: [],
      statistics: {
        totalLogs: 0,
        warningLogs: 0,
        errorLogs: 0,
        criticalLogs: 0,
      },
    },
  },
};
