import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const WelcomePage: React.FC = () => {
  const bgPrimary = useColorModeValue("white", "gray.800");
  const bgSecondary = useColorModeValue("gray.50", "gray.700");
  const bgAccent = useColorModeValue("blue.500", "blue.600");
  const bgCard = useColorModeValue("white", "gray.700");
  const textPrimary = useColorModeValue("gray.800", "white");
  const textSecondary = useColorModeValue("gray.600", "gray.300");
  const textAccent = useColorModeValue("blue.500", "blue.300");
  const textLight = useColorModeValue("white", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const shadowLight = useColorModeValue("sm", "lg");
  const shadowMedium = useColorModeValue("md", "xl");

  const features = [
    {
      icon: "🎮",
      title: "OBS Компоненты",
      description:
        "Множество готовых компонентов для OBS Studio: чаты, алерты, анимации и многое другое.",
      link: "/pyroalerts",
    },
    {
      icon: "⚙️",
      title: "Панель управления",
      description:
        "Мощная админ-панель для управления всеми аспектами вашего стрима.",
      link: "/admin",
    },
    {
      icon: "📊",
      title: "Аналитика",
      description:
        "Детальная статистика и аналитика для отслеживания успеха вашего контента.",
      link: "/dashboard",
    },
    {
      icon: "🔧",
      title: "API Интеграция",
      description: "Полная интеграция с различными платформами и сервисами.",
      link: "/services",
    },
    {
      icon: "⌨️",
      title: "Выполнение команд",
      description:
        "Интерфейс для выполнения команд с разделенными инпутами для разных параметров.",
      link: "/commands",
    },
  ];

  const obsComponents = [
    {
      name: "Pyro Alerts",
      path: "/pyroalerts",
      description: "Красивые алерты для донатов",
    },
    {
      name: "Waifu Alerts",
      path: "/waifu",
      description: "Алерты с аниме персонажами",
    },
    {
      name: "Chat Horizontal",
      path: "/chath",
      description: "Горизонтальный чат",
    },
    { name: "Chat Vertical", path: "/chatv", description: "Вертикальный чат" },
    { name: "Fumo Friday", path: "/fumofriday", description: "Пятничные фумо" },
    {
      name: "Screen Particles",
      path: "/confetti",
      description: "Экранные эффекты",
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box bg={bgSecondary} py={20}>
        <Container maxW="container.xl">
          <Flex
            direction={{ base: "column", lg: "row" }}
            align="center"
            gap={8}
          >
            <Box flex={1} textAlign="center">
              <Heading
                as="h1"
                size="2xl"
                mb={6}
                color={textPrimary}
                fontWeight="bold"
              >
                Добро пожаловать в{" "}
                <Text as="span" color={textAccent}>
                  MARS Client
                </Text>
              </Heading>
              <Text fontSize="xl" mb={6} color={textSecondary}>
                Мощная платформа для создания профессиональных стримов с
                интерактивными компонентами
              </Text>
            </Box>
            <Box flex={1} textAlign="center">
              <Card
                bg={bgCard}
                borderColor={borderColor}
                shadow={shadowMedium}
                borderRadius="xl"
                overflow="hidden"
              >
                <CardBody p={8} textAlign="center">
                  <Text fontSize="6xl" mb={4}>
                    🚀
                  </Text>
                  <Heading as="h3" size="lg" mb={3} color={textPrimary}>
                    Быстрый старт
                  </Heading>
                  <Text color={textSecondary}>
                    Начните использовать компоненты за минуты
                  </Text>
                </CardBody>
              </Card>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Features Section */}
      <Box bg={bgPrimary} py={20}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <Box textAlign="center">
              <Heading as="h2" size="xl" mb={4} color={textPrimary}>
                Возможности платформы
              </Heading>
            </Box>
            <Grid
              templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              }}
              gap={6}
            >
              {features.map((feature, index) => (
                <GridItem key={index}>
                  <Card
                    h="100%"
                    borderColor={borderColor}
                    shadow={shadowLight}
                    borderRadius="xl"
                    overflow="hidden"
                    _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
                    transition="all 0.2s"
                  >
                    <CardBody p={6} textAlign="center">
                      <Text fontSize="5xl" mb={4}>
                        {feature.icon}
                      </Text>
                      <Heading as="h3" size="md" mb={3} color={textPrimary}>
                        {feature.title}
                      </Heading>
                      <Text mb={4} color={textSecondary}>
                        {feature.description}
                      </Text>
                      <Button
                        as={Link}
                        to={feature.link}
                        variant="outline"
                        colorScheme="blue"
                        size="sm"
                      >
                        Узнать больше →
                      </Button>
                    </CardBody>
                  </Card>
                </GridItem>
              ))}
            </Grid>
          </VStack>
        </Container>
      </Box>

      {/* OBS Components Section */}
      <Box bg={bgSecondary} py={20}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <Box textAlign="center">
              <Heading as="h2" size="xl" mb={4} color={textPrimary}>
                OBS Компоненты
              </Heading>
              <Text fontSize="xl" color={textSecondary}>
                Готовые компоненты для интеграции в OBS Studio
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
                  <Card
                    as={Link}
                    to={component.path}
                    h="100%"
                    borderColor={borderColor}
                    shadow={shadowLight}
                    borderRadius="xl"
                    overflow="hidden"
                    _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
                    transition="all 0.2s"
                    textDecoration="none"
                  >
                    <CardBody p={6}>
                      <Heading as="h3" size="md" mb={2} color={textPrimary}>
                        {component.name}
                      </Heading>
                      <Text mb={3} color={textSecondary}>
                        {component.description}
                      </Text>
                      <Text color={textAccent} fontSize="xl">
                        →
                      </Text>
                    </CardBody>
                  </Card>
                </GridItem>
              ))}
            </Grid>
          </VStack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box bg={bgAccent} py={20} color={textLight}>
        <Container maxW="container.xl">
          <VStack spacing={8} textAlign="center">
            <Heading as="h2" size="xl" mb={4}>
              Готовы начать?
            </Heading>
            <Text fontSize="xl" opacity={0.9}>
              Присоединяйтесь к тысячам стримеров, которые уже используют MARS
              Client
            </Text>
            <Flex
              direction={{ base: "column", sm: "row" }}
              gap={4}
              justify="center"
            >
              <Button
                as={Link}
                to="/admin"
                size="lg"
                bg={bgPrimary}
                color={textPrimary}
                borderColor={borderColor}
                _hover={{ bg: bgSecondary }}
              >
                Перейти к панели управления
              </Button>
              <Button
                as={Link}
                to="/contacts"
                size="lg"
                variant="outline"
                borderColor={textLight}
                color={textLight}
                _hover={{ bg: "whiteAlpha.200" }}
              >
                Связаться с нами
              </Button>
            </Flex>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default WelcomePage;
