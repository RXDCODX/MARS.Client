import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { useSiteColors } from "@/shared/Utils/useSiteColors";

const WelcomePage = () => {
  const colors = useSiteColors();

  const bgColor = "white";
  const textColor = "gray.800";
  const borderColor = "gray.200";
  const cardBg = "gray.50";
  const textSecondary = "gray.600";

  const features = [
    {
      icon: "🎮",
      title: "OBS Компоненты",
      description: "Готовые компоненты для стриминга: алерты, чаты, счетчики",
      path: "/obs",
      color: "blue" as const,
    },
    {
      icon: "📊",
      title: "Панель управления",
      description: "Мониторинг сервисов и управление системой MARS",
      path: "/admin",
      color: "green" as const,
    },
    {
      icon: "🔧",
      title: "API и интеграции",
      description: "REST API, SignalR хабы и готовые SDK",
      path: "/api",
      color: "purple" as const,
    },
    {
      icon: "📚",
      title: "Документация",
      description: "Подробные руководства и примеры использования",
      path: "/docs",
      color: "orange" as const,
    },
  ];

  const actions = [
    {
      icon: "🚀",
      label: "Начать работу",
      path: "/docs",
      color: "blue" as const,
    },
    {
      icon: "💬",
      label: "Поддержка",
      path: "/contacts",
      color: "green" as const,
    },
    {
      icon: "📖",
      label: "О проекте",
      path: "/about",
      color: "purple" as const,
    },
  ];

  const stats = [
    { value: "100+", label: "OBS компонентов" },
    { value: "24/7", label: "Доступность" },
    { value: "99.9%", label: "Время работы" },
    { value: "1000+", label: "Активных пользователей" },
  ];

  return (
    <Box p={8} bg={bgColor} minH="100vh">
      <VStack gap={16} align="stretch">
        {/* Hero Section */}
        <Box textAlign="center" py={12}>
          <VStack gap={8}>
            <Text fontSize="6xl" fontWeight="bold">
              🚀
            </Text>
            <Heading as="h1" size="2xl" color={textColor}>
              Добро пожаловать в MARS
            </Heading>
            <Text fontSize="xl" color={textSecondary} maxW="2xl">
              Мощная платформа для создания интерактивных стримов и управления 
              OBS компонентами с интеграцией в ASP.NET приложения
            </Text>
            <Flex gap={4} flexWrap="wrap" justify="center">
              {actions.map((action, index) => (
                <Link key={index} to={action.path}>
                  <Button
                    size="lg"
                    variant="outline"
                    colorScheme={action.color}
                    _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                    transition="all 0.2s ease"
                  >
                    {action.icon} {action.label}
                  </Button>
                </Link>
              ))}
            </Flex>
          </VStack>
        </Box>

        {/* Features Section */}
        <Box>
          <Heading as="h2" size="xl" color={textColor} textAlign="center" mb={12}>
            Основные возможности
          </Heading>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6}>
            {features.map((feature, index) => (
              <Box
                key={index}
                p={6}
                bg={cardBg}
                borderRadius="xl"
                border="1px solid"
                borderColor={borderColor}
                textAlign="center"
                cursor="pointer"
                transition="all 0.3s ease"
                _hover={{
                  transform: "translateY(-8px)",
                  boxShadow: "xl",
                  borderColor: `${feature.color}.400`,
                }}
                onClick={() => window.location.href = feature.path}
              >
                <VStack gap={4}>
                  <Text fontSize="5xl" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.1))">
                    {feature.icon}
                  </Text>
                  <Heading as="h3" size="md" color={textColor}>
                    {feature.title}
                  </Heading>
                  <Text color={textSecondary} fontSize="sm">
                    {feature.description}
                  </Text>
                  <Button
                    colorScheme={feature.color}
                    size="sm"
                    variant="outline"
                    _hover={{ bg: `${feature.color}.500`, color: "white" }}
                  >
                    Подробнее
                  </Button>
                </VStack>
              </Box>
            ))}
          </Grid>
        </Box>

        {/* Stats Section */}
        <Box
          p={8}
          bg={cardBg}
          borderRadius="xl"
          border="1px solid"
          borderColor={borderColor}
        >
          <VStack gap={8}>
            <Heading as="h2" size="xl" color={textColor} textAlign="center">
              MARS в цифрах
            </Heading>
            <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={8} w="full">
              {stats.map((stat, index) => (
                <Box key={index} textAlign="center">
                  <Text fontSize="4xl" fontWeight="bold" color={colors.text.accent} mb={2}>
                    {stat.value}
                  </Text>
                  <Text color={textSecondary}>
                    {stat.label}
                  </Text>
                </Box>
              ))}
            </Grid>
          </VStack>
        </Box>

        {/* CTA Section */}
        <Box textAlign="center" py={8}>
          <VStack gap={6}>
            <Heading as="h2" size="xl" color={textColor}>
              Готовы начать?
            </Heading>
            <Text fontSize="lg" color={textSecondary} maxW="md">
              Присоединяйтесь к сообществу MARS и создавайте потрясающие стримы
            </Text>
            <Flex gap={4} flexWrap="wrap" justify="center">
              <Link to="/docs">
                <Button
                  size="lg"
                  colorScheme="blue"
                >
                  📚 Изучить документацию
                </Button>
              </Link>
              <Link to="/contacts">
                <Button
                  size="lg"
                  variant="outline"
                  colorScheme="gray"
                >
                  💬 Связаться с нами
                </Button>
              </Link>
            </Flex>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default WelcomePage;
