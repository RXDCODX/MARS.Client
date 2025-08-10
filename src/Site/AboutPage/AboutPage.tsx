import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const AboutPage: React.FC = () => {
  const bgPrimary = "white";
  const bgSecondary = "gray.50";
  const bgAccent = "blue.500";
  const bgCard = "white";
  const textPrimary = "gray.800";
  const textSecondary = "gray.600";
  const textLight = "white";
  const borderColor = "gray.200";
  const textAccent = "blue.500";

  const teamMembers = [
    {
      name: "Команда разработки",
      role: "Backend & Frontend",
      description: "Создание мощной архитектуры и современного интерфейса",
    },
    {
      name: "Дизайн команда",
      role: "UI/UX Design",
      description: "Создание красивых и удобных интерфейсов",
    },
    {
      name: "QA команда",
      role: "Тестирование",
      description: "Обеспечение качества и стабильности работы",
    },
  ];

  const milestones = [
    {
      year: "2024",
      title: "Запуск проекта",
      description: "Начало разработки MARS Client",
    },
    {
      year: "2024",
      title: "Первая версия",
      description: "Базовые OBS компоненты и панель управления",
    },
    {
      year: "2024",
      title: "Расширение функционала",
      description: "Добавление новых компонентов и улучшение UI",
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box bg={bgSecondary} py={20}>
        <Container maxW="container.xl" textAlign="center">
          <Stack gap={6}>
            <Heading as="h1" size="2xl" color={textPrimary}>
              О проекте MARS Client
            </Heading>
            <Text fontSize="xl" color={textSecondary} maxW="2xl">
              Мощная платформа для создания профессиональных стримов с
              интерактивными компонентами
            </Text>
          </Stack>
        </Container>
      </Box>

      {/* Mission Section */}
      <Box bg={bgPrimary} py={20}>
        <Container maxW="container.xl">
          <Flex
            direction={{ base: "column", lg: "row" }}
            align="center"
            gap={12}
          >
            <Box flex={1}>
              <Stack gap={6} align="start">
                <Heading as="h2" size="xl" color={textPrimary}>
                  Наша миссия
                </Heading>
                <Stack gap={4} align="start">
                  <Text fontSize="lg" color={textSecondary}>
                    MARS Client создан для того, чтобы помочь стримерам
                    создавать качественный контент с минимальными усилиями. Мы
                    предоставляем готовые решения для всех аспектов стриминга:
                    от красивых алертов до мощной панели управления.
                  </Text>
                  <Text fontSize="lg" color={textSecondary}>
                    Наша цель - сделать стриминг доступным и профессиональным
                    для всех, кто хочет делиться своим контентом с миром.
                  </Text>
                </Stack>
              </Stack>
            </Box>
            <Box flex={1}>
              <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                <Box
                  bg={bgCard}
                  p={6}
                  borderRadius="xl"
                  textAlign="center"
                  border="1px solid"
                  borderColor={borderColor}
                  shadow="md"
                >
                  <Text fontSize="3xl" fontWeight="bold" color={textAccent}>
                    100+
                  </Text>
                  <Text color={textSecondary}>Компонентов</Text>
                </Box>
                <Box
                  bg={bgCard}
                  p={6}
                  borderRadius="xl"
                  textAlign="center"
                  border="1px solid"
                  borderColor={borderColor}
                  shadow="md"
                >
                  <Text fontSize="3xl" fontWeight="bold" color={textAccent}>
                    1000+
                  </Text>
                  <Text color={textSecondary}>Пользователей</Text>
                </Box>
                <Box
                  bg={bgCard}
                  p={6}
                  borderRadius="xl"
                  textAlign="center"
                  border="1px solid"
                  borderColor={borderColor}
                  shadow="md"
                >
                  <Text fontSize="3xl" fontWeight="bold" color={textAccent}>
                    24/7
                  </Text>
                  <Text color={textSecondary}>Поддержка</Text>
                </Box>
              </Grid>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Team Section */}
      <Box bg={bgSecondary} py={20}>
        <Container maxW="container.xl">
          <Stack gap={12}>
            <Heading as="h2" size="xl" color={textPrimary} textAlign="center">
              Наша команда
            </Heading>
            <Grid
              templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              }}
              gap={8}
            >
              {teamMembers.map((member, index) => (
                <GridItem key={index}>
                  <Box
                    bg={bgCard}
                    p={8}
                    borderRadius="xl"
                    textAlign="center"
                    border="1px solid"
                    borderColor={borderColor}
                    shadow="md"
                    _hover={{ transform: "translateY(-4px)", shadow: "lg" }}
                    transition="all 0.2s"
                  >
                    <Box
                      w="80px"
                      h="80px"
                      borderRadius="full"
                      bg={textAccent}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      mx="auto"
                      mb={4}
                    >
                      <Text fontSize="2xl" fontWeight="bold" color={textLight}>
                        {member.name.charAt(0)}
                      </Text>
                    </Box>
                    <Heading as="h3" size="md" mb={2} color={textPrimary}>
                      {member.name}
                    </Heading>
                    <Text
                      fontSize="md"
                      fontWeight="semibold"
                      color={textAccent}
                      mb={3}
                    >
                      {member.role}
                    </Text>
                    <Text color={textSecondary}>{member.description}</Text>
                  </Box>
                </GridItem>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>

      {/* Timeline Section */}
      <Box bg={bgPrimary} py={20}>
        <Container maxW="container.xl">
          <Stack gap={12}>
            <Heading as="h2" size="xl" color={textPrimary} textAlign="center">
              История развития
            </Heading>
            <Stack gap={8} align="stretch">
              {milestones.map((milestone, index) => (
                <Flex
                  key={index}
                  direction={{ base: "column", md: "row" }}
                  align={{ base: "start", md: "center" }}
                  gap={6}
                  p={6}
                  bg={bgCard}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor={borderColor}
                  shadow="md"
                >
                  <Box
                    bg={textAccent}
                    color={textLight}
                    px={4}
                    py={2}
                    borderRadius="full"
                    fontWeight="bold"
                    minW="80px"
                    textAlign="center"
                  >
                    {milestone.year}
                  </Box>
                  <Box flex={1}>
                    <Heading as="h3" size="md" mb={2} color={textPrimary}>
                      {milestone.title}
                    </Heading>
                    <Text color={textSecondary}>{milestone.description}</Text>
                  </Box>
                </Flex>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box bg={bgAccent} py={20} color={textLight}>
        <Container maxW="container.xl" textAlign="center">
          <Stack gap={8}>
            <Heading as="h2" size="xl">
              Готовы присоединиться?
            </Heading>
            <Text fontSize="xl" opacity={0.9}>
              Начните использовать MARS Client уже сегодня
            </Text>
            <Flex
              direction={{ base: "column", sm: "row" }}
              gap={4}
              justify="center"
            >
              <Link
                to="/pyroalerts"
                style={{
                  display: "inline-block",
                  padding: "12px 24px",
                  backgroundColor: bgPrimary,
                  color: textPrimary,
                  textDecoration: "none",
                  borderRadius: "8px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={e =>
                  (e.currentTarget.style.backgroundColor = bgSecondary)
                }
                onMouseLeave={e =>
                  (e.currentTarget.style.backgroundColor = bgPrimary)
                }
              >
                Попробовать бесплатно
              </Link>
              <Link
                to="/contacts"
                style={{
                  display: "inline-block",
                  padding: "12px 24px",
                  backgroundColor: "transparent",
                  color: textLight,
                  textDecoration: "none",
                  borderRadius: "8px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  border: `2px solid ${textLight}`,
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={e =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.2)")
                }
                onMouseLeave={e =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                Связаться с нами
              </Link>
            </Flex>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutPage;
