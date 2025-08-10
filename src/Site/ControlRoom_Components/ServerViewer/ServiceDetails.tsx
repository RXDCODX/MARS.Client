import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Spinner,
  Switch,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useServiceStore } from "@/shared/serviceStore";

const ServiceDetails: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { selectedService, services, setSelectedService, fetchServices } =
    useServiceStore();
  const [searchParams] = useSearchParams();
  const [commands, setCommands] = useState<
    { name: string; description: string }[]
  >([]);
  const [config, setConfig] = useState<Record<string, object>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [execResult, setExecResult] = useState<string | null>(null);
  const [execLoading, setExecLoading] = useState<string | null>(null);
  const [toggleLoading, setToggleLoading] = useState(false);

  // Состояния для логов
  const [logs, setLogs] = useState<string[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [logsError, setLogsError] = useState<string | null>(null);
  const [logFilter, setLogFilter] = useState("");
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [logLevel, setLogLevel] = useState<string>("all");

  // Chakra UI color mode values
  const bgPrimary = useColorModeValue("white", "gray.800");
  const bgSecondary = useColorModeValue("gray.50", "gray.700");
  const bgCard = useColorModeValue("white", "gray.700");
  const textPrimary = useColorModeValue("gray.800", "white");
  const textSecondary = useColorModeValue("gray.600", "gray.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const accentColor = useColorModeValue("blue.500", "blue.300");
  const shadowMedium = useColorModeValue("md", "xl");
  const successColor = useColorModeValue("green.500", "green.300");
  const warningColor = useColorModeValue("orange.500", "orange.300");
  const errorColor = useColorModeValue("red.500", "red.300");
  const infoColor = useColorModeValue("blue.500", "blue.300");
  const lightBg = useColorModeValue("gray.100", "gray.800");
  const mutedTextColor = useColorModeValue("gray.600", "gray.400");

  // Отладочная информация
  console.log("ServiceDetails render:", {
    selectedService,
    servicesCount: services.length,
    searchParams: searchParams.get("name"),
    loading,
    error,
  });

  useEffect(() => {
    const name = searchParams.get("name");
    console.log("ServiceDetails useEffect - name from params:", name);
    if (name && name !== selectedService) {
      console.log("Setting selected service:", name);
      setSelectedService(name);
    }
  }, [searchParams, selectedService, setSelectedService]);

  useEffect(() => {
    // Загружаем сервисы, если их нет
    if (services.length === 0) {
      console.log("Fetching services...");
      fetchServices();
    }
  }, [services.length, fetchServices]);

  const info = services.find(s => s.name === selectedService) || null;

  useEffect(() => {
    if (!selectedService) return;
    console.log("Loading service details for:", selectedService);
    setLoading(true);
    setError(null);
    Promise.all([
      axios.get(`/api/ServiceManager/service/${selectedService}/commands`),
      axios.get(`/api/ServiceManager/service/${selectedService}/configuration`),
    ])
      .then(([cmdRes, cfgRes]) => {
        console.log("Service details loaded successfully");
        setCommands(cmdRes.data);
        setConfig(cfgRes.data);
      })
      .catch(e => {
        console.error("Error loading service details:", e);
        setError(e.message || "Ошибка загрузки данных");
      })
      .finally(() => setLoading(false));
  }, [selectedService]);

  const handleExecute = async (cmd: string) => {
    if (!selectedService) return;
    setExecLoading(cmd);
    setExecResult(null);
    try {
      const res = await axios.post(
        `/api/ServiceManager/service/${selectedService}/execute`,
        { command: cmd }
      );
      setExecResult(
        res.data === true
          ? `Команда \'${cmd}\' выполнена успешно`
          : `Ошибка выполнения команды \'${cmd}\'`
      );
    } catch {
      setExecResult(`Ошибка выполнения команды \'${cmd}\'`);
    } finally {
      setExecLoading(null);
    }
  };

  const handleToggleService = async () => {
    if (!selectedService || !info) return;
    setToggleLoading(true);
    try {
      const action = info.isEnabled ? "stop" : "start";
      await axios.post(
        `/api/ServiceManager/service/${selectedService}/${action}`
      );
      // Обновляем список сервисов после изменения состояния
      await fetchServices();
      setExecResult(
        `Сервис ${info.isEnabled ? "остановлен" : "запущен"} успешно`
      );
    } catch {
      setExecResult(
        `Ошибка ${info.isEnabled ? "остановки" : "запуска"} сервиса`
      );
    } finally {
      setToggleLoading(false);
    }
  };

  // Функция загрузки логов
  const fetchLogs = useCallback(async () => {
    if (!selectedService) return;
    setLogsLoading(true);
    setLogsError(null);
    try {
      const params = new URLSearchParams();
      if (logLevel !== "all") {
        params.append("level", logLevel);
      }
      const res = await axios.get(
        `/api/ServiceManager/service/${selectedService}/logs?${params}`
      );
      setLogs(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error loading logs:", error);
      setLogsError("Ошибка загрузки логов");
    } finally {
      setLogsLoading(false);
    }
  }, [selectedService, logLevel]);

  // Автообновление логов
  useEffect(() => {
    if (!autoRefresh || !selectedService) return;

    const interval = setInterval(fetchLogs, 5000); // Обновляем каждые 5 секунд
    return () => clearInterval(interval);
  }, [autoRefresh, selectedService, logLevel, fetchLogs]);

  // Загружаем логи при изменении сервиса или уровня логирования
  useEffect(() => {
    if (selectedService) {
      fetchLogs();
    }
  }, [selectedService, logLevel, fetchLogs]);

  // Фильтрация логов
  const filteredLogs = logs.filter(
    log =>
      logFilter === "" || log.toLowerCase().includes(logFilter.toLowerCase())
  );

  // Показываем загрузку, если сервис не выбран или данные загружаются
  if (!selectedService) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        height="100vh"
        bg={bgPrimary}
        color={textPrimary}
      >
        <Spinner size="xl" color={accentColor} />
        <Text mt={3} fontSize="lg">
          Загрузка информации о сервисе...
        </Text>
        <Text mt={2} color={mutedTextColor}>
          Параметр name: {searchParams.get("name") || "не указан"}
        </Text>
      </Flex>
    );
  }

  // Показываем загрузку, если данные еще загружаются
  if (loading) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        height="100vh"
        bg={bgPrimary}
        color={textPrimary}
      >
        <Spinner size="xl" color={accentColor} />
        <Text mt={3} fontSize="lg">
          Загрузка деталей сервиса...
        </Text>
        <Text mt={2} color={mutedTextColor}>
          Сервис: {selectedService}
        </Text>
      </Flex>
    );
  }

  // Показываем ошибку, если она есть
  if (error) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        height="100vh"
        bg={bgPrimary}
        color={textPrimary}
      >
        <Alert status="error" mb={6} borderRadius="md" maxW="600px">
          <AlertIcon />
          <Box>
            <Heading as="h4" size="md">
              Ошибка загрузки
            </Heading>
            <Text>{error}</Text>
            <Button
              mt={3}
              variant="outline"
              colorScheme="red"
              onClick={onClose}
            >
              Закрыть
            </Button>
          </Box>
        </Alert>
      </Flex>
    );
  }

  // Показываем ошибку, если сервис не найден
  if (!info) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        height="100vh"
        bg={bgPrimary}
        color={textPrimary}
      >
        <Alert status="warning" mb={6} borderRadius="md" maxW="600px">
          <AlertIcon />
          <Box>
            <Heading as="h4" size="md">
              Сервис не найден
            </Heading>
            <Text>
              Сервис "{selectedService}" не найден в списке доступных сервисов.
            </Text>
            <Text mt={2} fontSize="sm" color={mutedTextColor}>
              Доступные сервисы: {services.map(s => s.name).join(", ") || "нет"}
            </Text>
            <Button
              mt={3}
              variant="outline"
              colorScheme="orange"
              onClick={onClose}
            >
              Закрыть
            </Button>
          </Box>
        </Alert>
      </Flex>
    );
  }

  return (
    <Box flex="1" p={4} bg={bgPrimary} minH="100vh">
      <Flex direction="column" h="100%">
        {/* Заголовок */}
        <Flex
          justify="space-between"
          align="center"
          mb={6}
          pb={4}
          borderBottom="1px solid"
          borderColor={borderColor}
        >
          <Box>
            <Heading as="h2" size="xl" mb={1} color={textPrimary}>
              {info.displayName || info.name}
            </Heading>
            <Flex align="center" gap={3}>
              <Badge
                colorScheme={info.isEnabled ? "green" : "gray"}
                fontSize="md"
                px={3}
                py={2}
              >
                {info.status}
              </Badge>
              <Text color={textSecondary}>
                {info.isEnabled ? "Активен" : "Неактивен"}
              </Text>
            </Flex>
          </Box>
          <Button
            variant="outline"
            colorScheme="gray"
            size="lg"
            onClick={onClose}
          >
            ✕ Закрыть
          </Button>
        </Flex>

        {/* Основная информация */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
          <Card
            bg={bgCard}
            borderColor={borderColor}
            shadow={shadowMedium}
            borderRadius="lg"
          >
            <CardHeader
              pb={3}
              borderBottom="1px solid"
              borderColor={borderColor}
            >
              <Heading as="h5" size="md" color={textPrimary}>
                Информация о сервисе
              </Heading>
            </CardHeader>
            <CardBody p={6}>
              <Text color={textSecondary} mb={4}>
                {info.description}
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
                <Box>
                  <Text fontWeight="bold" color={textPrimary}>
                    Время старта:
                  </Text>
                  <Text color={textSecondary}>
                    {info.startTime
                      ? new Date(info.startTime).toLocaleString()
                      : "-"}
                  </Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" color={textPrimary}>
                    Последняя активность:
                  </Text>
                  <Text color={textSecondary}>
                    {info.lastActivity
                      ? new Date(info.lastActivity).toLocaleString()
                      : "-"}
                  </Text>
                </Box>
              </SimpleGrid>

              {/* Кнопки управления сервисом */}
              <Box mt={4}>
                <Button
                  colorScheme={info.isEnabled ? "orange" : "green"}
                  size="lg"
                  onClick={handleToggleService}
                  isLoading={toggleLoading}
                  loadingText="Обработка..."
                  mr={3}
                >
                  {info.isEnabled
                    ? "⏹ Остановить сервис"
                    : "▶ Запустить сервис"}
                </Button>
              </Box>
            </CardBody>
          </Card>

          <Card
            bg={bgCard}
            borderColor={borderColor}
            shadow={shadowMedium}
            borderRadius="lg"
          >
            <CardHeader
              pb={3}
              borderBottom="1px solid"
              borderColor={borderColor}
            >
              <Heading as="h5" size="md" color={textPrimary}>
                Конфигурация
              </Heading>
            </CardHeader>
            <CardBody p={6} maxH="400px" overflowY="auto">
              {Object.keys(config).length > 0 ? (
                <Table variant="simple" size="sm">
                  <Tbody>
                    {Object.entries(config).map(([k, v]) => (
                      <Tr key={k}>
                        <Td
                          fontWeight="bold"
                          color={mutedTextColor}
                          px={0}
                          py={1}
                          borderBottom="none"
                        >
                          {k}:
                        </Td>
                        <Td
                          color={textSecondary}
                          px={0}
                          py={1}
                          borderBottom="none"
                          whiteSpace="normal"
                          wordBreak="break-word"
                        >
                          {String(v)}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              ) : (
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  py={4}
                  color={mutedTextColor}
                >
                  <Text fontSize="2xl">📄</Text>
                  <Text>Нет данных конфигурации</Text>
                </Flex>
              )}
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Команды */}
        <SimpleGrid columns={1} mb={6}>
          <Card
            bg={bgCard}
            borderColor={borderColor}
            shadow={shadowMedium}
            borderRadius="lg"
          >
            <CardHeader
              pb={3}
              borderBottom="1px solid"
              borderColor={borderColor}
            >
              <Heading as="h5" size="md" color={textPrimary}>
                Доступные команды
              </Heading>
            </CardHeader>
            <CardBody p={6} maxH="300px" overflowY="auto">
              {Array.isArray(commands) && commands.length > 0 ? (
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr bg={bgSecondary}>
                      <Th
                        color={textPrimary}
                        py={2}
                        px={3}
                        textTransform="uppercase"
                        fontSize="xs"
                      >
                        Команда
                      </Th>
                      <Th
                        color={textPrimary}
                        py={2}
                        px={3}
                        textTransform="uppercase"
                        fontSize="xs"
                      >
                        Описание
                      </Th>
                      <Th
                        color={textPrimary}
                        py={2}
                        px={3}
                        textTransform="uppercase"
                        fontSize="xs"
                      >
                        Действие
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {commands.map(cmd => (
                      <Tr key={cmd.name} _hover={{ bg: bgSecondary }}>
                        <Td py={2} px={3}>
                          <Text
                            as="code"
                            bg={lightBg}
                            px={2}
                            py={1}
                            borderRadius="md"
                            color={textPrimary}
                          >
                            {cmd.name}
                          </Text>
                        </Td>
                        <Td py={2} px={3}>
                          <Text color={textSecondary}>{cmd.description}</Text>
                        </Td>
                        <Td py={2} px={3}>
                          <Button
                            size="sm"
                            colorScheme="blue"
                            onClick={() => handleExecute(cmd.name)}
                            isLoading={execLoading === cmd.name}
                            loadingText="Выполнение..."
                          >
                            ▶ Выполнить
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              ) : (
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  py={4}
                  color={mutedTextColor}
                >
                  <Text fontSize="2xl">⚙️</Text>
                  <Text>Нет доступных команд</Text>
                </Flex>
              )}
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Логи */}
        <SimpleGrid columns={1}>
          <Card
            bg={bgCard}
            borderColor={borderColor}
            shadow={shadowMedium}
            borderRadius="lg"
          >
            <CardHeader
              pb={3}
              borderBottom="1px solid"
              borderColor={borderColor}
            >
              <Flex justify="space-between" align="center">
                <Heading as="h5" size="md" color={textPrimary}>
                  📋 Логи сервиса
                </Heading>
                <Flex gap={2} align="center">
                  <Select
                    size="sm"
                    width="auto"
                    value={logLevel}
                    onChange={e => setLogLevel(e.target.value)}
                    bg={lightBg}
                    color={textPrimary}
                    borderColor={borderColor}
                  >
                    <option value="all">Все уровни</option>
                    <option value="debug">Debug</option>
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                  </Select>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel
                      htmlFor="auto-refresh-switch"
                      mb="0"
                      mr="2"
                      fontSize="sm"
                      color={textPrimary}
                    >
                      Автообновление
                    </FormLabel>
                    <Switch
                      id="auto-refresh-switch"
                      isChecked={autoRefresh}
                      onChange={e => setAutoRefresh(e.target.checked)}
                      colorScheme="green"
                    />
                  </FormControl>
                  <Button
                    size="sm"
                    variant="outline"
                    colorScheme="blue"
                    onClick={fetchLogs}
                    isLoading={logsLoading}
                    loadingText="Обновить..."
                  >
                    🔄 Обновить
                  </Button>
                </Flex>
              </Flex>
            </CardHeader>
            <CardBody p={6}>
              {/* Фильтр логов */}
              <Box mb={4}>
                <Input
                  type="text"
                  placeholder="🔍 Фильтр логов..."
                  value={logFilter}
                  onChange={e => setLogFilter(e.target.value)}
                  size="sm"
                  bg={lightBg}
                  color={textPrimary}
                  borderColor={borderColor}
                />
              </Box>

              {/* Содержимое логов */}
              <Box
                maxH="400px"
                overflowY="auto"
                bg={lightBg}
                border="1px solid"
                borderColor={borderColor}
                borderRadius="md"
                p={4}
                fontFamily="monospace"
                fontSize="sm"
              >
                {logsError ? (
                  <Text color={errorColor} textAlign="center">
                    ❌ {logsError}
                  </Text>
                ) : logsLoading ? (
                  <Flex justify="center" align="center" py={4}>
                    <Spinner size="sm" color={accentColor} mr={2} />
                    <Text color={textPrimary}>Загрузка логов...</Text>
                  </Flex>
                ) : filteredLogs.length > 0 ? (
                  <VStack align="stretch" spacing={2}>
                    {filteredLogs.map((log, index) => (
                      <Box
                        key={index}
                        pb={2}
                        borderBottom={
                          index < filteredLogs.length - 1 ? "1px solid" : "none"
                        }
                        borderColor={borderColor}
                      >
                        <Text fontSize="sm" color={textPrimary}>
                          <Text
                            as="span"
                            color={
                              log.includes("Error")
                                ? errorColor
                                : log.includes("Warning")
                                  ? warningColor
                                  : infoColor
                            }
                            mr={2}
                          >
                            [{new Date().toLocaleTimeString()}]{" "}
                            {log.split(":")[0] || ""}:
                          </Text>
                          {log.split(":").slice(1).join(":")}
                        </Text>
                      </Box>
                    ))}
                    <Text color={mutedTextColor} mt={2}>
                      Показано {filteredLogs.length} из {logs.length} записей
                      {logFilter && ` (отфильтровано по "${logFilter}")`}
                    </Text>
                  </VStack>
                ) : (
                  <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    py={4}
                    color={mutedTextColor}
                  >
                    <Text fontSize="2xl">📝</Text>
                    <Text>
                      {logFilter
                        ? "Нет логов, соответствующих фильтру"
                        : "Нет доступных логов"}
                    </Text>
                  </Flex>
                )}
              </Box>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Результат выполнения */}
        {execResult && (
          <Box mt={6}>
            <Alert
              status="info"
              borderRadius="md"
              onClose={() => setExecResult(null)}
            >
              <AlertIcon />
              <Text>{execResult}</Text>
            </Alert>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default ServiceDetails;
