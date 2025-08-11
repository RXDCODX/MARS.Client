import { Box, Flex, Grid, Heading, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import ActiveUsers from "./ActiveUsers/ActiveUsers";
import { DashboardProps } from "./Dashboard.types";
import MetricCard from "./MetricCard/MetricCard";
import { MetricCardProps } from "./MetricCard/MetricCard.types";
import PerformanceChart from "./PerformanceChart/PerformanceChart";
import RecentLogs from "./RecentLogs/RecentLogs";
import SystemStatus from "./SystemStatus/SystemStatus";

const Dashboard: React.FC<DashboardProps> = () => {
  const [metrics, setMetrics] = useState({
    cpuUsage: 0,
    memoryUsage: 0,
    activeConnections: 0,
    requestsPerSecond: 0,
    errorRate: 0,
    uptime: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  // Цвета из site-colors
  const bgPrimary = "white";
  const textPrimary = "gray.800";
  const textSecondary = "gray.600";
  const primaryGradientLight = "linear(to-r, blue.500, purple.500)";

  useEffect(() => {
    // Имитация загрузки данных
    const loadMetrics = async () => {
      setIsLoading(true);

      // Имитация API вызова
      await new Promise(resolve => setTimeout(resolve, 1000));

      setMetrics({
        cpuUsage: Math.random() * 100,
        memoryUsage: Math.random() * 100,
        activeConnections: Math.floor(Math.random() * 1000),
        requestsPerSecond: Math.floor(Math.random() * 500),
        errorRate: Math.random() * 5,
        uptime: Math.floor(Math.random() * 86400), // секунды
      });

      setIsLoading(false);
    };

    loadMetrics();

    // Обновление метрик каждые 30 секунд
    const interval = setInterval(loadMetrics, 30000);

    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}ч ${minutes}м`;
  };

  const metricCards: MetricCardProps[] = [
    {
      title: "Использование CPU",
      value: `${metrics.cpuUsage.toFixed(1)}%`,
      icon: "🖥️",
      color: "blue",
      trend: "+2.5%",
      trendDirection: "up",
    },
    {
      title: "Использование памяти",
      value: `${metrics.memoryUsage.toFixed(1)}%`,
      icon: "💾",
      color: "green",
      trend: "-1.2%",
      trendDirection: "down",
    },
    {
      title: "Активные соединения",
      value: metrics.activeConnections.toString(),
      icon: "🔗",
      color: "purple",
      trend: "+15",
      trendDirection: "up",
    },
    {
      title: "Запросов в секунду",
      value: metrics.requestsPerSecond.toString(),
      icon: "📡",
      color: "orange",
      trend: "+8.3%",
      trendDirection: "up",
    },
    {
      title: "Ошибки (%)",
      value: `${metrics.errorRate.toFixed(2)}%`,
      icon: "⚠️",
      color: "red",
      trend: "-0.5%",
      trendDirection: "down",
    },
    {
      title: "Время работы",
      value: formatUptime(metrics.uptime),
      icon: "⏱️",
      color: "teal",
      trend: "Стабильно",
      trendDirection: "stable",
    },
  ];

  if (isLoading) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        height="100vh"
        gap={4}
      >
        <Spinner size="xl" color={primaryGradientLight} />
        <Text fontSize="lg" color={textSecondary}>
          Загрузка метрик...
        </Text>
      </Flex>
    );
  }

  return (
    <Box p={6} bg={bgPrimary} minH="100vh">
      <Box textAlign="center" mb={8}>
        <Heading
          as="h1"
          size="2xl"
          color={textPrimary}
          mb={2}
          bgGradient={primaryGradientLight}
          bgClip="text"
        >
          Панель управления MARS
        </Heading>
        <Text fontSize="lg" color={textSecondary}>
          Мониторинг состояния ASP.NET приложения
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={6} mb={8}>
        {metricCards.map((card, index) => (
          <MetricCard key={index} {...card} />
        ))}
      </SimpleGrid>

      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
        <Flex direction="column" gap={6}>
          <SystemStatus />
          <PerformanceChart />
        </Flex>

        <Flex direction="column" gap={6}>
          <ActiveUsers />
          <RecentLogs />
        </Flex>
      </Grid>
    </Box>
  );
};

export default Dashboard;
