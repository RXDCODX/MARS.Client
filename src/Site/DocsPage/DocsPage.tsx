import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Code,
  Link as ChakraLink,
  Divider,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";

const DocsPage = () => {
  const [activeTab, setActiveTab] = useState("getting-started");

  const tabs = [
    { id: "getting-started", label: "Начало работы", icon: "🚀" },
    { id: "obs-components", label: "OBS Компоненты", icon: "🎮" },
    { id: "admin-panel", label: "Панель управления", icon: "⚙️" },
    { id: "api", label: "API", icon: "🔧" },
  ];

  const renderGettingStarted = () => (
    <VStack gap={8} align="stretch">
      <Box>
        <Heading as="h2" size="xl" color="gray.800" mb={6}>
          🚀 Быстрый старт
        </Heading>
        <Text fontSize="lg" color="gray.600" mb={6}>
          MARS - это платформа для создания интерактивных стримов. Следуйте этому руководству, 
          чтобы быстро настроить и запустить ваши первые компоненты.
        </Text>
      </Box>

      <Box>
        <Heading as="h3" size="lg" color="gray.800" mb={4}>
          📋 Предварительные требования
        </Heading>
        <List spacing={3}>
          <ListItem>
            <ListIcon color="green.500" />
            OBS Studio версии 28.0 или выше
          </ListItem>
          <ListItem>
            <ListIcon color="green.500" />
            Современный веб-браузер (Chrome, Firefox, Safari, Edge)
          </ListItem>
          <ListItem>
            <ListIcon color="green.500" />
            Стабильное интернет-соединение
          </ListItem>
          <ListItem>
            <ListIcon color="green.500" />
            Аккаунт на платформе MARS
          </ListItem>
        </List>
      </Box>

      <Box>
        <Heading as="h3" size="lg" color="gray.800" mb={4}>
          ⚡ Установка за 5 минут
        </Heading>
        <VStack gap={4} align="stretch">
          <Box p={4} bg="blue.50" borderRadius="md" border="1px solid" borderColor="blue.200">
            <Text fontWeight="semibold" color="blue.800" mb={2}>
              Шаг 1: Регистрация
            </Text>
            <Text color="blue.700" fontSize="sm">
              Создайте аккаунт на <ChakraLink color="blue.600" href="/register">mars-project.com</ChakraLink> 
              и подтвердите email адрес.
            </Text>
          </Box>

          <Box p={4} bg="green.50" borderRadius="md" border="1px solid" borderColor="green.200">
            <Text fontWeight="semibold" color="green.800" mb={2}>
              Шаг 2: Скачивание компонентов
            </Text>
            <Text color="green.700" fontSize="sm">
              Перейдите в раздел OBS компонентов и скачайте нужные вам компоненты.
            </Text>
          </Box>

          <Box p={4} bg="purple.50" borderRadius="md" border="1px solid" borderColor="purple.200">
            <Text fontWeight="semibold" color="purple.800" mb={2}>
              Шаг 3: Установка в OBS
            </Text>
            <Text color="purple.700" fontSize="sm">
              Добавьте компоненты как источники в OBS Studio и настройте параметры.
            </Text>
          </Box>

          <Box p={4} bg="orange.50" borderRadius="md" border="1px solid" borderColor="orange.200">
            <Text fontWeight="semibold" color="orange.800" mb={2}>
              Шаг 4: Настройка
            </Text>
            <Text color="orange.700" fontSize="sm">
              Настройте компоненты через веб-интерфейс MARS и начните стрим!
            </Text>
          </Box>
        </VStack>
      </Box>

      <Box>
        <Heading as="h3" size="lg" color="gray.800" mb={4}>
          🎯 Первые шаги
        </Heading>
        <Text color="gray.600" mb={4}>
          После установки рекомендуем начать с простых компонентов:
        </Text>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
          <Link to="/pyroalerts">
            <Button variant="outline" colorScheme="blue" w="full" h="auto" p={4}>
              <VStack>
                <Text fontSize="lg">🎆</Text>
                <Text fontWeight="semibold">Pyro Alerts</Text>
                <Text fontSize="sm" color="gray.600">Алерты для донатов</Text>
              </VStack>
            </Button>
          </Link>
          <Link to="/chatv">
            <Button variant="outline" colorScheme="green" w="full" h="auto" p={4}>
              <VStack>
                <Text fontSize="lg">💬</Text>
                <Text fontWeight="semibold">Chat Vertical</Text>
                <Text fontSize="sm" color="gray.600">Вертикальный чат</Text>
              </VStack>
            </Button>
          </Link>
        </Grid>
      </Box>
    </VStack>
  );

  const renderObsComponents = () => (
    <VStack gap={8} align="stretch">
      <Box>
        <Heading as="h2" size="xl" color="gray.800" mb={6}>
          🎮 OBS Компоненты
        </Heading>
        <Text fontSize="lg" color="gray.600" mb={6}>
          MARS предоставляет широкий набор готовых компонентов для OBS Studio, 
          которые можно легко настроить и интегрировать в ваши стримы.
        </Text>
      </Box>

      <Box>
        <Heading as="h3" size="lg" color="gray.800" mb={4}>
          📊 Категории компонентов
        </Heading>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
          <Box p={6} bg="gray.50" borderRadius="xl" border="1px solid" borderColor="gray.200">
            <VStack gap={4} align="stretch">
              <HStack>
                <Text fontSize="2xl">🎆</Text>
                <Heading as="h4" size="md" color="gray.800">
                  Алерты
                </Heading>
              </HStack>
              <Text color="gray.600" fontSize="sm">
                Компоненты для отображения уведомлений о донатах, подписках, 
                рейдах и других событиях.
              </Text>
              <VStack gap={2} align="stretch">
                <Link to="/pyroalerts">
                  <Button size="sm" variant="outline" colorScheme="red" w="full">
                    Pyro Alerts
                  </Button>
                </Link>
                <Link to="/waifu">
                  <Button size="sm" variant="outline" colorScheme="pink" w="full">
                    Waifu Alerts
                  </Button>
                </Link>
              </VStack>
            </VStack>
          </Box>

          <Box p={6} bg="gray.50" borderRadius="xl" border="1px solid" borderColor="gray.200">
            <VStack gap={4} align="stretch">
              <HStack>
                <Text fontSize="2xl">💬</Text>
                <Heading as="h4" size="md" color="gray.800">
                  Чат
                </Heading>
              </HStack>
              <Text color="gray.600" fontSize="sm">
                Компоненты для отображения чата зрителей в различных стилях 
                и конфигурациях.
              </Text>
              <VStack gap={2} align="stretch">
                <Link to="/chath">
                  <Button size="sm" variant="outline" colorScheme="blue" w="full">
                    Chat Horizontal
                  </Button>
                </Link>
                <Link to="/chatv">
                  <Button size="sm" variant="outline" colorScheme="green" w="full">
                    Chat Vertical
                  </Button>
                </Link>
              </VStack>
            </VStack>
          </Box>

          <Box p={6} bg="gray.50" borderRadius="xl" border="1px solid" borderColor="gray.200">
            <VStack gap={4} align="stretch">
              <HStack>
                <Text fontSize="2xl">🎵</Text>
                <Heading as="h4" size="md" color="gray.800">
                  Звук
                </Heading>
              </HStack>
              <Text color="gray.600" fontSize="sm">
                Компоненты для управления звуком, отображения текущего трека 
                и запросов музыки от зрителей.
              </Text>
              <VStack gap={2} align="stretch">
                <Link to="/sr/currenttrack">
                  <Button size="sm" variant="outline" colorScheme="purple" w="full">
                    Current Track
                  </Button>
                </Link>
              </VStack>
            </VStack>
          </Box>

          <Box p={6} bg="gray.50" borderRadius="xl" border="1px solid" borderColor="gray.200">
            <VStack gap={4} align="stretch">
              <HStack>
                <Text fontSize="2xl">🎉</Text>
                <Heading as="h4" size="md" color="gray.800">
                  Развлечения
                </Heading>
              </HStack>
              <Text color="gray.600" fontSize="sm">
                Интерактивные компоненты для развлечения зрителей: 
                частицы, мемы, игры.
              </Text>
              <VStack gap={2} align="stretch">
                <Link to="/fumofriday">
                  <Button size="sm" variant="outline" colorScheme="orange" w="full">
                    Fumo Friday
                  </Button>
                </Link>
                <Link to="/confetti">
                  <Button size="sm" variant="outline" colorScheme="teal" w="full">
                    Screen Particles
                  </Button>
                </Link>
              </VStack>
            </VStack>
          </Box>
        </Grid>
      </Box>

      <Box>
        <Heading as="h3" size="lg" color="gray.800" mb={4}>
          🔧 Настройка компонентов
        </Heading>
        <Accordion allowToggle>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontWeight="semibold">Как добавить компонент в OBS?</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <VStack gap={3} align="stretch">
                <Text fontSize="sm" color="gray.600">
                  1. Скачайте компонент с сайта MARS
                </Text>
                <Text fontSize="sm" color="gray.600">
                  2. В OBS Studio нажмите "+" в разделе "Источники"
                </Text>
                <Text fontSize="sm" color="gray.600">
                  3. Выберите "Браузер" и вставьте URL компонента
                </Text>
                <Text fontSize="sm" color="gray.600">
                  4. Настройте размеры и позицию
                </Text>
              </VStack>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontWeight="semibold">Как настроить параметры компонента?</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text fontSize="sm" color="gray.600">
                Каждый компонент имеет веб-интерфейс для настройки. 
                Откройте компонент в браузере и используйте панель управления 
                для изменения цветов, размеров, анимаций и других параметров.
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </VStack>
  );

  const renderAdminPanel = () => (
    <VStack gap={8} align="stretch">
      <Box>
        <Heading as="h2" size="xl" color="gray.800" mb={6}>
          ⚙️ Панель управления
        </Heading>
        <Text fontSize="lg" color="gray.600" mb={6}>
          Панель управления MARS предоставляет полный контроль над системой, 
          мониторинг производительности и управление сервисами.
        </Text>
      </Box>

      <Box>
        <Heading as="h3" size="lg" color="gray.800" mb={4}>
          📊 Основные функции
        </Heading>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
          <Box p={6} bg="gray.50" borderRadius="xl" border="1px solid" borderColor="gray.200">
            <VStack gap={4} align="stretch">
              <HStack>
                <Text fontSize="2xl">📈</Text>
                <Heading as="h4" size="md" color="gray.800">
                  Мониторинг
                </Heading>
              </HStack>
              <Text color="gray.600" fontSize="sm">
                Отслеживание производительности системы, использование ресурсов 
                и статистика работы компонентов.
              </Text>
            </VStack>
          </Box>

          <Box p={6} bg="gray.50" borderRadius="xl" border="1px solid" borderColor="gray.200">
            <VStack gap={4} align="stretch">
              <HStack>
                <Text fontSize="2xl">🖥️</Text>
                <Heading as="h4" size="md" color="gray.800">
                  Управление сервисами
                </Heading>
              </HStack>
              <Text color="gray.600" fontSize="sm">
                Запуск, остановка и перезапуск сервисов, просмотр логов 
                и управление конфигурацией.
              </Text>
            </VStack>
          </Box>

          <Box p={6} bg="gray.50" borderRadius="xl" border="1px solid" borderColor="gray.200">
            <VStack gap={4} align="stretch">
              <HStack>
                <Text fontSize="2xl">👥</Text>
                <Heading as="h4" size="md" color="gray.800">
                  Пользователи
                </Heading>
              </HStack>
              <Text color="gray.600" fontSize="sm">
                Управление пользователями, правами доступа и настройками 
                безопасности системы.
              </Text>
            </VStack>
          </Box>

          <Box p={6} bg="gray.50" borderRadius="xl" border="1px solid" borderColor="gray.200">
            <VStack gap={4} align="stretch">
              <HStack>
                <Text fontSize="2xl">📝</Text>
                <Heading as="h4" size="md" color="gray.800">
                  Логи и аналитика
                </Heading>
              </HStack>
              <Text color="gray.600" fontSize="sm">
                Просмотр системных логов, анализ ошибок и генерация 
                отчетов о работе системы.
              </Text>
            </VStack>
          </Box>
        </Grid>
      </Box>

      <Box>
        <Heading as="h3" size="lg" color="gray.800" mb={4}>
          🚀 Доступ к панели
        </Heading>
        <Box p={6} bg="blue.50" borderRadius="xl" border="1px solid" borderColor="blue.200">
          <VStack gap={4}>
            <Text color="blue.800" fontWeight="semibold">
              Панель управления доступна по адресу:
            </Text>
            <Code p={3} bg="white" borderRadius="md" fontSize="lg">
              https://your-domain.com/admin
            </Code>
            <Text color="blue.700" fontSize="sm" textAlign="center">
              Для доступа требуются права администратора. 
              Обратитесь к системному администратору для получения доступа.
            </Text>
            <Link to="/admin">
              <Button colorScheme="blue" variant="solid">
                🚀 Открыть панель управления
              </Button>
            </Link>
          </VStack>
        </Box>
      </Box>
    </VStack>
  );

  const renderApi = () => (
    <VStack gap={8} align="stretch">
      <Box>
        <Heading as="h2" size="xl" color="gray.800" mb={6}>
          🔧 API и интеграции
        </Heading>
        <Text fontSize="lg" color="gray.600" mb={6}>
          MARS предоставляет мощный REST API и SignalR хабы для интеграции 
          с внешними системами и создания собственных приложений.
        </Text>
      </Box>

      <Box>
        <Heading as="h3" size="lg" color="gray.800" mb={4}>
          🌐 REST API
        </Heading>
        <VStack gap={4} align="stretch">
          <Box p={4} bg="gray.50" borderRadius="md" border="1px solid" borderColor="gray.200">
            <Text fontWeight="semibold" color="gray.800" mb={2}>
              Базовый URL
            </Text>
            <Code p={2} bg="white" borderRadius="sm">
              https://your-domain.com/api/v1
            </Code>
          </Box>

          <Box p={4} bg="gray.50" borderRadius="md" border="1px solid" borderColor="gray.200">
            <Text fontWeight="semibold" color="gray.800" mb={2}>
              Аутентификация
            </Text>
            <Text color="gray.600" fontSize="sm" mb={2}>
              API использует Bearer токены для аутентификации:
            </Text>
            <Code p={2} bg="white" borderRadius="sm">
              Authorization: Bearer YOUR_API_TOKEN
            </Code>
          </Box>

          <Box p={4} bg="gray.50" borderRadius="md" border="1px solid" borderColor="gray.200">
            <Text fontWeight="semibold" color="gray.800" mb={2}>
              Основные эндпоинты
            </Text>
            <VStack gap={2} align="stretch">
              <HStack>
                <Badge colorScheme="green">GET</Badge>
                <Code>/components</Code>
                <Text fontSize="sm" color="gray.600">Список компонентов</Text>
              </HStack>
              <HStack>
                <Badge colorScheme="blue">POST</Badge>
                <Code>/components/{'{id}'}/trigger</Code>
                <Text fontSize="sm" color="gray.600">Запуск компонента</Text>
              </HStack>
              <HStack>
                <Badge colorScheme="purple">PUT</Badge>
                <Code>/components/{'{id}'}/config</Code>
                <Text fontSize="sm" color="gray.600">Обновление конфигурации</Text>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Box>

      <Box>
        <Heading as="h3" size="lg" color="gray.800" mb={4}>
          ⚡ SignalR Хабы
        </Heading>
        <VStack gap={4} align="stretch">
          <Text color="gray.600">
            SignalR хабы обеспечивают реальное время обновления данных и 
            двустороннюю связь между клиентами и сервером.
          </Text>

          <Box p={4} bg="gray.50" borderRadius="md" border="1px solid" borderColor="gray.200">
            <Text fontWeight="semibold" color="gray.800" mb={2}>
              Доступные хабы
            </Text>
            <VStack gap={2} align="stretch">
              <HStack>
                <Text fontSize="sm" fontWeight="semibold" color="blue.600">ScoreboardHub</Text>
                <Text fontSize="sm" color="gray.600">Управление счетчиками</Text>
              </HStack>
              <HStack>
                <Text fontSize="sm" fontWeight="semibold" color="green.600">SoundRequestHub</Text>
                <Text fontSize="sm" color="gray.600">Запросы музыки</Text>
              </HStack>
              <HStack>
                <Text fontSize="sm" fontWeight="semibold" color="purple.600">TelegramusHub</Text>
                <Text fontSize="sm" color="gray.600">Интеграция с Telegram</Text>
              </HStack>
            </VStack>
          </Box>

          <Box p={4} bg="gray.50" borderRadius="md" border="1px solid" borderColor="gray.200">
            <Text fontWeight="semibold" color="gray.800" mb={2}>
              Пример подключения
            </Text>
            <Code p={3} bg="white" borderRadius="sm" fontSize="sm" whiteSpace="pre-wrap">
{`const connection = new signalR.HubConnectionBuilder()
  .withUrl("/hubs/scoreboard")
  .build();

connection.on("UpdateScore", (data) => {
  console.log("Score updated:", data);
});

await connection.start();`}
            </Code>
          </Box>
        </VStack>
      </Box>

      <Box>
        <Heading as="h3" size="lg" color="gray.800" mb={4}>
          📚 SDK и библиотеки
        </Heading>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
          <Box p={4} bg="gray.50" borderRadius="md" border="1px solid" borderColor="gray.200">
            <VStack gap={3}>
              <Text fontSize="lg">🔵</Text>
              <Heading as="h4" size="sm" color="gray.800">JavaScript SDK</Heading>
              <Text fontSize="sm" color="gray.600" textAlign="center">
                Официальная библиотека для веб-приложений
              </Text>
              <Button size="sm" variant="outline" colorScheme="blue">
                Скачать
              </Button>
            </VStack>
          </Box>

          <Box p={4} bg="gray.50" borderRadius="md" border="1px solid" borderColor="gray.200">
            <VStack gap={3}>
              <Text fontSize="lg">🟢</Text>
              <Heading as="h4" size="sm" color="gray.800">Python SDK</Heading>
              <Text fontSize="sm" color="gray.600" textAlign="center">
                Библиотека для Python приложений
              </Text>
              <Button size="sm" variant="outline" colorScheme="green">
                Скачать
              </Button>
            </VStack>
          </Box>
        </Grid>
      </Box>
    </VStack>
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
    <Box p={8} bg="white" minH="100vh">
      <VStack gap={8} align="stretch">
        {/* Header */}
        <Box textAlign="center" py={8}>
          <VStack gap={6}>
            <Text fontSize="6xl" fontWeight="bold">
              📚
            </Text>
            <Heading as="h1" size="2xl" color="gray.800">
              Документация MARS
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="3xl">
              Подробные руководства по установке, настройке и использованию 
              всех компонентов платформы MARS
            </Text>
          </VStack>
        </Box>

        {/* Navigation Tabs */}
        <Box>
          <Flex gap={2} flexWrap="wrap" justify="center">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "solid" : "outline"}
                colorScheme={activeTab === tab.id ? "blue" : "gray"}
                onClick={() => setActiveTab(tab.id)}
                size="lg"
                px={6}
                py={3}
                borderRadius="lg"
                fontWeight="medium"
                _hover={{ transform: "translateY(-2px)" }}
                transition="all 0.3s ease"
              >
                {tab.icon} {tab.label}
              </Button>
            ))}
          </Flex>
        </Box>

        <Divider />

        {/* Content */}
        <Box>
          {renderTabContent()}
        </Box>

        {/* Footer */}
        <Box textAlign="center" py={8}>
          <VStack gap={4}>
            <Text color="gray.500" fontSize="sm">
              Нужна дополнительная помощь?
            </Text>
            <Flex gap={4} flexWrap="wrap" justify="center">
              <Link to="/contacts">
                <Button variant="outline" colorScheme="blue">
                  💬 Связаться с поддержкой
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" colorScheme="gray">
                  ℹ️ О проекте
                </Button>
              </Link>
            </Flex>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default DocsPage;
