import { CheckIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Code,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  VStack,
  Text,
} from "@chakra-ui/react";
import { List } from "@chakra-ui/react";
import { useSiteColors } from "@/shared/Utils/useSiteColors";

import { useState } from "react";
import { Link } from "react-router-dom";

const DocsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("getting-started");

  const colors = useSiteColors();
  const bgPrimary = colors.background.primary;
  const bgSecondary = colors.background.secondary;
  const bgCard = colors.background.card;
  const textPrimary = colors.text.primary;
  const textSecondary = colors.text.secondary;
  const textAccent = colors.text.accent;
  const borderColor = colors.border.primary;

  const tabs = [
    { id: "getting-started", label: "Начало работы" },
    { id: "obs-components", label: "OBS Компоненты" },
    { id: "admin-panel", label: "Панель управления" },
    { id: "api", label: "API Документация" },
  ];

  const obsComponents = [
    {
      name: "Pyro Alerts",
      path: "/pyroalerts",
      description: "Красивые алерты для донатов и подписок",
      features: [
        "Настраиваемые анимации",
        "Поддержка различных платформ",
        "Кастомные звуки",
      ],
    },
    {
      name: "Waifu Alerts",
      path: "/waifu",
      description: "Алерты с аниме персонажами",
      features: [
        "Аниме персонажи",
        "Интерактивные элементы",
        "Настраиваемые реакции",
      ],
    },
    {
      name: "Chat Horizontal",
      path: "/chath",
      description: "Горизонтальный чат для стримов",
      features: [
        "Горизонтальное отображение",
        "Фильтрация сообщений",
        "Настройка стилей",
      ],
    },
    {
      name: "Chat Vertical",
      path: "/chatv",
      description: "Вертикальный чат с анимациями",
      features: [
        "Вертикальное отображение",
        "Плавные анимации",
        "Кастомные эффекты",
      ],
    },
    {
      name: "Fumo Friday",
      path: "/fumofriday",
      description: "Пятничные фумо анимации",
      features: ["Фумо персонажи", "Пятничные эффекты", "Интерактивность"],
    },
    {
      name: "Screen Particles",
      path: "/confetti",
      description: "Экранные эффекты и частицы",
      features: [
        "Конфетти эффекты",
        "Настраиваемые частицы",
        "Триггеры событий",
      ],
    },
  ];

  const renderGettingStarted = () => (
    <Box>
      <VStack spacing={6} align="stretch">
        <Heading as="h2" size="xl" color={textPrimary}>
          Быстрый старт
        </Heading>
        <Text fontSize="lg" color={textSecondary}>
          Добро пожаловать в документацию MARS Client! Этот раздел поможет вам
          быстро начать работу с платформой.
        </Text>

        <Box
          bg={bgCard}
          p={6}
          borderRadius="xl"
          border="1px solid"
          borderColor={borderColor}
          shadow="md"
        >
          <Heading as="h3" size="md" mb={3} color={textPrimary}>
            Шаг 1: Установка
          </Heading>
          <Text mb={3} color={textSecondary}>
            Скачайте и установите MARS Client на ваш компьютер.
          </Text>
          <Code p={3} borderRadius="md" bg={bgSecondary} color={textPrimary}>
            npm install mars-client
          </Code>
        </Box>

        <Box
          bg={bgCard}
          p={6}
          borderRadius="xl"
          border="1px solid"
          borderColor={borderColor}
          shadow="md"
        >
          <Heading as="h3" size="md" mb={3} color={textPrimary}>
            Шаг 2: Настройка OBS
          </Heading>
          <Text mb={3} color={textSecondary}>
            Добавьте компоненты в OBS Studio как Browser Source.
          </Text>
          <Code p={3} borderRadius="md" bg={bgSecondary} color={textPrimary}>
            URL: http://localhost:3000/pyroalerts
          </Code>
        </Box>

        <Box
          bg={bgCard}
          p={6}
          borderRadius="xl"
          border="1px solid"
          borderColor={borderColor}
          shadow="md"
        >
          <Heading as="h3" size="md" mb={3} color={textPrimary}>
            Шаг 3: Настройка панели управления
          </Heading>
          <Text mb={3} color={textSecondary}>
            Откройте панель управления для настройки компонентов.
          </Text>
          <Button
            as={Link}
            to="/admin"
            colorScheme="blue"
            leftIcon={<ExternalLinkIcon />}
          >
            Открыть панель управления
          </Button>
        </Box>
      </VStack>
    </Box>
  );

  const renderObsComponents = () => (
    <Box>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading as="h2" size="xl" mb={3} color={textPrimary}>
            OBS Компоненты
          </Heading>
          <Text fontSize="lg" color={textSecondary}>
            Все доступные компоненты для интеграции в OBS Studio.
          </Text>
        </Box>

        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={6}
        >
          {obsComponents.map((component, index) => (
            <GridItem key={index}>
              <Box
                bg={bgCard}
                p={6}
                borderRadius="xl"
                border="1px solid"
                borderColor={borderColor}
                shadow="md"
                h="100%"
                _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
                transition="all 0.2s"
              >
                <VStack spacing={4} align="stretch" h="100%">
                  <Heading as="h3" size="md" color={textPrimary}>
                    {component.name}
                  </Heading>
                  <Text color={textSecondary} flex={1}>
                    {component.description}
                  </Text>
                  <List spacing={2}>
                    {component.features.map((feature, featureIndex) => (
                      <ListItem key={featureIndex} color={textSecondary}>
                        <ListIcon as={CheckIcon} color={textAccent} />
                        {feature}
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    as={Link}
                    to={component.path}
                    colorScheme="blue"
                    variant="outline"
                    size="sm"
                    w="100%"
                  >
                    Попробовать
                  </Button>
                </VStack>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </VStack>
    </Box>
  );

  const renderAdminPanel = () => (
    <Box>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading as="h2" size="xl" mb={3} color={textPrimary}>
            Панель управления
          </Heading>
          <Text fontSize="lg" color={textSecondary}>
            Мощная админ-панель для управления всеми аспектами вашего стрима.
          </Text>
        </Box>

        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
          <GridItem>
            <Box
              bg={bgCard}
              p={6}
              borderRadius="xl"
              border="1px solid"
              borderColor={borderColor}
              shadow="md"
              textAlign="center"
            >
              <Text fontSize="4xl" mb={3}>
                📊
              </Text>
              <Heading as="h3" size="md" mb={3} color={textPrimary}>
                Дашборд
              </Heading>
              <Text mb={4} color={textSecondary}>
                Мониторинг статистики и производительности в реальном времени.
              </Text>
              <Button
                as={Link}
                to="/dashboard"
                colorScheme="blue"
                size="sm"
                leftIcon={<ExternalLinkIcon />}
              >
                Открыть дашборд
              </Button>
            </Box>
          </GridItem>

          <GridItem>
            <Box
              bg={bgCard}
              p={6}
              borderRadius="xl"
              border="1px solid"
              borderColor={borderColor}
              shadow="md"
              textAlign="center"
            >
              <Text fontSize="4xl" mb={3}>
                ⚙️
              </Text>
              <Heading as="h3" size="md" mb={3} color={textPrimary}>
                Настройки
              </Heading>
              <Text mb={4} color={textSecondary}>
                Конфигурация всех компонентов и интеграций.
              </Text>
              <Button
                as={Link}
                to="/admin"
                colorScheme="blue"
                size="sm"
                leftIcon={<ExternalLinkIcon />}
              >
                Открыть настройки
              </Button>
            </Box>
          </GridItem>

          <GridItem>
            <Box
              bg={bgCard}
              p={6}
              borderRadius="xl"
              border="1px solid"
              borderColor={borderColor}
              shadow="md"
              textAlign="center"
            >
              <Text fontSize="4xl" mb={3}>
                🔧
              </Text>
              <Heading as="h3" size="md" mb={3} color={textPrimary}>
                Сервисы
              </Heading>
              <Text mb={4} color={textSecondary}>
                Управление подключенными сервисами и API.
              </Text>
              <Button
                as={Link}
                to="/services"
                colorScheme="blue"
                size="sm"
                leftIcon={<ExternalLinkIcon />}
              >
                Управление сервисами
              </Button>
            </Box>
          </GridItem>
        </Grid>
      </VStack>
    </Box>
  );

  const renderApi = () => (
    <Box>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading as="h2" size="xl" mb={3} color={textPrimary}>
            API Документация
          </Heading>
          <Text fontSize="lg" color={textSecondary}>
            Полная документация по API для разработчиков.
          </Text>
        </Box>

        <Box
          bg={bgCard}
          p={6}
          borderRadius="xl"
          border="1px solid"
          borderColor={borderColor}
          shadow="md"
        >
          <VStack spacing={6} align="stretch">
            <Box>
              <Heading as="h3" size="md" mb={2} color={textPrimary}>
                Базовый URL
              </Heading>
              <Code
                p={3}
                borderRadius="md"
                bg={bgSecondary}
                color={textPrimary}
              >
                https://api.marsclient.com/v1
              </Code>
            </Box>

            <Box>
              <Heading as="h3" size="md" mb={2} color={textPrimary}>
                Аутентификация
              </Heading>
              <Text mb={2} color={textSecondary}>
                Все API запросы требуют API ключ в заголовке:
              </Text>
              <Code
                p={3}
                borderRadius="md"
                bg={bgSecondary}
                color={textPrimary}
              >
                Authorization: Bearer YOUR_API_KEY
              </Code>
            </Box>

            <Divider />

            <Box>
              <Heading as="h3" size="md" mb={4} color={textPrimary}>
                Примеры запросов
              </Heading>
              <VStack spacing={4} align="stretch">
                <Box>
                  <Heading as="h4" size="sm" mb={2} color={textPrimary}>
                    Получение алертов
                  </Heading>
                  <Code
                    p={3}
                    borderRadius="md"
                    bg={bgSecondary}
                    color={textPrimary}
                    display="block"
                    whiteSpace="pre"
                  >
                    GET /alerts{`\n`}
                    Response: {`{`}
                    {`\n`}
                    &nbsp;&nbsp;"alerts": [...]{`\n`}
                    {`}`}
                  </Code>
                </Box>

                <Box>
                  <Heading as="h4" size="sm" mb={2} color={textPrimary}>
                    Создание алерта
                  </Heading>
                  <Code
                    p={3}
                    borderRadius="md"
                    bg={bgSecondary}
                    color={textPrimary}
                    display="block"
                    whiteSpace="pre"
                  >
                    POST /alerts{`\n`}
                    Body: {`{`}
                    {`\n`}
                    &nbsp;&nbsp;"type": "donation",{`\n`}
                    &nbsp;&nbsp;"message": "Спасибо за донат!"{`\n`}
                    {`}`}
                  </Code>
                </Box>
              </VStack>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "getting-started":
        return renderGettingStarted();
      case "obs-components":
        return renderObsComponents();
      case "admin-panel":
        return renderAdminPanel();
      case "api":
        return renderApi();
      default:
        return renderGettingStarted();
    }
  };

  return (
    <Box bg={bgPrimary} minH="100vh">
      <Container maxW="container.xl" py={8}>
        <Flex direction={{ base: "column", lg: "row" }} gap={8} align="start">
          {/* Sidebar */}
          <Box
            w={{ base: "100%", lg: "250px" }}
            flexShrink={0}
            bg={bgCard}
            p={6}
            borderRadius="xl"
            border="1px solid"
            borderColor={borderColor}
            shadow="md"
          >
            <VStack spacing={6} align="stretch">
              <Heading as="h2" size="lg" color={textPrimary}>
                Документация
              </Heading>
              <VStack spacing={2} align="stretch">
                {tabs.map(tab => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "solid" : "ghost"}
                    colorScheme={activeTab === tab.id ? "blue" : "gray"}
                    justifyContent="start"
                    onClick={() => setActiveTab(tab.id)}
                    size="lg"
                  >
                    {tab.label}
                  </Button>
                ))}
              </VStack>
            </VStack>
          </Box>

          {/* Content */}
          <Box
            flex={1}
            bg={bgCard}
            p={8}
            borderRadius="xl"
            border="1px solid"
            borderColor={borderColor}
            shadow="md"
          >
            {renderTabContent()}
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default DocsPage;
