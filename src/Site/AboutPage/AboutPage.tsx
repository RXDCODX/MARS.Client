import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Text,
  VStack,
  Image,
  Badge,
  Divider,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const features = [
    {
      icon: "🎮",
      title: "OBS Интеграция",
      description: "Полная интеграция с OBS Studio для создания профессиональных стримов",
    },
    {
      icon: "⚡",
      title: "Высокая производительность",
      description: "Оптимизированная архитектура для работы с большими нагрузками",
    },
    {
      icon: "🔧",
      title: "Гибкая настройка",
      description: "Модульная система с возможностью кастомизации под любые нужды",
    },
    {
      icon: "🌐",
      title: "Web интерфейс",
      description: "Современный веб-интерфейс для управления всеми компонентами",
    },
  ];

  const technologies = [
    { name: "ASP.NET Core", type: "Backend", color: "purple" },
    { name: "React", type: "Frontend", color: "blue" },
    { name: "SignalR", type: "Real-time", color: "green" },
    { name: "TypeScript", type: "Language", color: "cyan" },
    { name: "Chakra UI", type: "UI Framework", color: "teal" },
    { name: "PostgreSQL", type: "Database", color: "orange" },
  ];

  const team = [
    {
      name: "Команда разработки",
      role: "Core Team",
      description: "Основная команда разработчиков MARS",
      avatar: "👨‍💻",
    },
    {
      name: "Тестировщики",
      role: "QA Team",
      description: "Обеспечивают качество и стабильность системы",
      avatar: "🧪",
    },
    {
      name: "DevOps",
      role: "Infrastructure",
      description: "Поддерживают инфраструктуру и развертывание",
      avatar: "🚀",
    },
  ];

  return (
    <Box p={8} bg="white" minH="100vh">
      <VStack gap={16} align="stretch">
        {/* Hero Section */}
        <Box textAlign="center" py={12}>
          <VStack gap={8}>
            <Text fontSize="6xl" fontWeight="bold">
              🚀
            </Text>
            <Heading as="h1" size="2xl" color="gray.800">
              О проекте MARS
            </Heading>
            <Text fontSize="xl" color="gray.600" maxW="3xl">
              MARS (Media And Real-time Streaming) - это инновационная платформа для создания 
              интерактивных стримов и управления OBS компонентами, построенная на современном 
              стеке технологий
            </Text>
          </VStack>
        </Box>

        {/* Mission Section */}
        <Box
          p={8}
          bg="gray.50"
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.200"
        >
          <VStack gap={6}>
            <Heading as="h2" size="xl" color="gray.800" textAlign="center">
              Наша миссия
            </Heading>
            <Text fontSize="lg" color="gray.600" textAlign="center" maxW="2xl">
              Мы стремимся сделать создание профессиональных стримов доступным для всех. 
              MARS предоставляет инструменты, которые позволяют стримерам сосредоточиться 
              на контенте, а не на технических деталях.
            </Text>
          </VStack>
        </Box>

        {/* Features Grid */}
        <Box>
          <Heading as="h2" size="xl" color="gray.800" textAlign="center" mb={12}>
            Ключевые особенности
          </Heading>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6}>
            {features.map((feature, index) => (
              <Box
                key={index}
                p={6}
                bg="gray.50"
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.200"
                textAlign="center"
                transition="all 0.3s ease"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "lg",
                }}
              >
                <VStack gap={4}>
                  <Text fontSize="4xl" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))">
                    {feature.icon}
                  </Text>
                  <Heading as="h3" size="md" color="gray.800">
                    {feature.title}
                  </Heading>
                  <Text color="gray.600" fontSize="sm">
                    {feature.description}
                  </Text>
                </VStack>
              </Box>
            ))}
          </Grid>
        </Box>

        {/* Technologies Section */}
        <Box
          p={8}
          bg="gray.50"
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.200"
        >
          <VStack gap={8}>
            <Heading as="h2" size="xl" color="gray.800" textAlign="center">
              Технологический стек
            </Heading>
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)", lg: "repeat(6, 1fr)" }} gap={4} w="full">
              {technologies.map((tech, index) => (
                <Box key={index} textAlign="center">
                  <VStack gap={2}>
                    <Badge colorScheme={tech.color} variant="solid" px={3} py={1} borderRadius="full">
                      {tech.name}
                    </Badge>
                    <Text fontSize="xs" color="gray.500" textTransform="uppercase">
                      {tech.type}
                    </Text>
                  </VStack>
                </Box>
              ))}
            </Grid>
          </VStack>
        </Box>

        {/* Team Section */}
        <Box>
          <Heading as="h2" size="xl" color="gray.800" textAlign="center" mb={12}>
            Наша команда
          </Heading>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
            {team.map((member, index) => (
              <Box
                key={index}
                p={6}
                bg="gray.50"
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.200"
                textAlign="center"
                transition="all 0.3s ease"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "lg",
                }}
              >
                <VStack gap={4}>
                  <Text fontSize="4xl" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))">
                    {member.avatar}
                  </Text>
                  <Heading as="h3" size="md" color="gray.800">
                    {member.name}
                  </Heading>
                  <Badge colorScheme="blue" variant="outline">
                    {member.role}
                  </Badge>
                  <Text color="gray.600" fontSize="sm">
                    {member.description}
                  </Text>
                </VStack>
              </Box>
            ))}
          </Grid>
        </Box>

        {/* History Section */}
        <Box
          p={8}
          bg="gray.50"
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.200"
        >
          <VStack gap={6}>
            <Heading as="h2" size="xl" color="gray.800" textAlign="center">
              История проекта
            </Heading>
            <VStack gap={4} align="stretch">
              <Box>
                <Heading as="h3" size="md" color="gray.800" mb={2}>
                  2023 - Начало разработки
                </Heading>
                <Text color="gray.600">
                  Проект MARS был запущен как внутренний инструмент для стриминга. 
                  Первые версии включали базовые OBS компоненты и простую панель управления.
                </Text>
              </Box>
              <Divider />
              <Box>
                <Heading as="h3" size="md" color="gray.800" mb={2}>
                  2024 - Расширение функциональности
                </Heading>
                <Text color="gray.600">
                  Добавлены новые компоненты, улучшена производительность, 
                  создан полноценный веб-интерфейс и API для интеграций.
                </Text>
              </Box>
              <Divider />
              <Box>
                <Heading as="h3" size="md" color="gray.800" mb={2}>
                  Будущее - Открытая платформа
                </Heading>
                <Text color="gray.600">
                  Планируется открытие платформы для сообщества, создание 
                  экосистемы плагинов и расширений.
                </Text>
              </Box>
            </VStack>
          </VStack>
        </Box>

        {/* CTA Section */}
        <Box textAlign="center" py={8}>
          <VStack gap={6}>
            <Heading as="h2" size="xl" color="gray.800">
              Присоединяйтесь к проекту
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="md">
              Изучите документацию, попробуйте компоненты или свяжитесь с нами для сотрудничества
            </Text>
            <Flex gap={4} flexWrap="wrap" justify="center">
              <Link to="/docs">
                <Button size="lg" colorScheme="blue">
                  📚 Документация
                </Button>
              </Link>
              <Link to="/contacts">
                <Button size="lg" variant="outline" colorScheme="gray">
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

export default AboutPage;
