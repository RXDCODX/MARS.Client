import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Select,
  SimpleGrid,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  faBolt,
  faCheckCircle,
  faClock,
  faExclamationTriangle,
  faEyeSlash,
  faList,
  faPlay,
  faRedo,
  faRefresh,
  faSearch,
  faStop,
  faSyncAlt,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch"; // Keep this for now

import { useServiceStore } from "@/shared/serviceStore";

import LogViewer from "./LogViewer";
import ServiceDetails from "./ServiceDetails";

const statusColors: Record<string, string> = {
  Running: "#198754",
  Stopped: "#6c757d",
  Starting: "#0dcaf0",
  Stopping: "#ffc107",
  Error: "#dc3545",
  Unknown: "#343a40",
};

const statusOrder = [
  "Running",
  "Stopped",
  "Starting",
  "Stopping",
  "Error",
  "Unknown",
];

const ServerViewerUI: React.FC = () => {
  const { selectedService, setSelectedService, clearSelectedService } =
    useServiceStore();
  const {
    services,
    loading,
    error,
    actionLoading,
    logs,
    logsService,
    logsLoading,
    statusFilter,
    search,
    autoRefresh,
    progress,
    fetchServices,
    handleAction,
    handleShowLogs,
    handleCloseLogs,
    setStatusFilter,
    setSearch,
    setAutoRefresh,
    setProgress,
  } = useServiceStore();

  const navigate = useNavigate();

  // Chakra UI color mode values
  const bgPrimary = useColorModeValue("white", "gray.800");
  const bgSecondary = useColorModeValue("gray.50", "gray.700");
  const textPrimary = useColorModeValue("gray.800", "white");
  const textSecondary = useColorModeValue("gray.600", "gray.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const accentColor = useColorModeValue("blue.500", "blue.300");

  // Disclosure for LogViewer modal
  const {
    isOpen: isLogsOpen,
    onOpen: onLogsOpen,
    onClose: onLogsClose,
  } = useDisclosure();
  // Disclosure for ServiceDetails modal
  const {
    isOpen: isDetailsOpen,
    onOpen: onDetailsOpen,
    onClose: onDetailsClose,
  } = useDisclosure();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let progressInt: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(fetchServices, 5000);
      let p = 0;
      progressInt = setInterval(() => {
        p = (p + 20) % 100;
        setProgress(p);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
      if (progressInt) clearInterval(progressInt);
      setProgress(0);
    };
  }, [autoRefresh, fetchServices, setProgress]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // Handle opening logs modal
  useEffect(() => {
    if (showLogs) {
      onLogsOpen();
    } else {
      onLogsClose();
    }
  }, [showLogs, onLogsOpen, onLogsClose]);

  // Handle opening details modal
  useEffect(() => {
    if (selectedService) {
      onDetailsOpen();
    } else {
      onDetailsClose();
    }
  }, [selectedService, onDetailsOpen, onDetailsClose]);

  // Filtered services memoization
  const filteredServices = useMemo(
    () =>
      services.filter(
        s =>
          (!statusFilter || s.status === statusFilter) &&
          (!search ||
            s.displayName.toLowerCase().includes(search.toLowerCase()) ||
            s.name.toLowerCase().includes(search.toLowerCase()))
      ),
    [services, statusFilter, search]
  );

  const getStatusColorScheme = (status: string) => {
    switch (status) {
      case "Running":
        return "green";
      case "Stopped":
        return "gray";
      case "Starting":
        return "cyan";
      case "Stopping":
        return "orange";
      case "Error":
        return "red";
      default:
        return "gray";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Running":
        return faCheckCircle;
      case "Error":
        return faExclamationTriangle;
      case "Stopped":
        return faTimesCircle;
      case "Starting":
        return faClock;
      case "Stopping":
        return faBolt;
      default:
        return faEyeSlash;
    }
  };

  return (
    <Box minH="100vh" py={4} position="relative" bg={bgPrimary}>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={6} px={4}>
        <Heading as="h2" size="xl" color={textPrimary}>
          <FontAwesomeIcon icon={faList} /> Service Manager
        </Heading>
        <Flex gap={2}>
          <Button
            colorScheme={autoRefresh ? "green" : "gray"}
            onClick={() => setAutoRefresh(!autoRefresh)}
            leftIcon={<FontAwesomeIcon icon={faSyncAlt} spin={autoRefresh} />}
            title={
              autoRefresh
                ? "Автообновление включено"
                : "Включить автообновление"
            }
            size="md"
          >
            {autoRefresh ? "Автообновление" : "Вручную"}
          </Button>
          <Button
            colorScheme="blue"
            onClick={fetchServices}
            leftIcon={<FontAwesomeIcon icon={faRefresh} />}
            title="Обновить сейчас"
            size="md"
          >
            Обновить
          </Button>
        </Flex>
      </Flex>

      {/* Search and Filter */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={6} px={4}>
        <Box>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<FontAwesomeIcon icon={faSearch} color="gray.300" />}
            />
            <Input
              placeholder="Поиск по имени..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              bg={bgSecondary}
              borderColor={borderColor}
              color={textPrimary}
              _placeholder={{ color: textSecondary }}
              pl={10} // Padding for the icon
            />
          </InputGroup>
        </Box>
        <Flex justify={{ base: "start", md: "end" }} gap={2}>
          <Button
            size="sm"
            colorScheme={statusFilter === "" ? "blue" : "gray"}
            onClick={() => setStatusFilter("")}
          >
            Все
          </Button>
          {statusOrder.map(st => (
            <Button
              key={st}
              size="sm"
              colorScheme={statusFilter === st ? "blue" : "gray"}
              onClick={() => setStatusFilter(st)}
              minW="90px"
              textTransform="none"
            >
              {st}
            </Button>
          ))}
        </Flex>
      </SimpleGrid>

      {/* Error Alert */}
      {error && (
        <Alert status="error" mb={6} borderRadius="md" mx={4}>
          <AlertIcon />
          <Text>{error}</Text>
        </Alert>
      )}

      {/* Progress Bar */}
      {autoRefresh && (
        <Progress value={progress} size="xs" colorScheme="blue" mb={2} />
      )}

      {/* Services Table */}
      <Box maxH="70vh" overflowY="auto" mx={4} pb={4} position="relative">
        <Table variant="simple" size="sm" bg="white" shadow="sm">
          <Thead position="sticky" top={0} zIndex={2} bg={bgSecondary}>
            <Tr>
              <Th color={textPrimary}>Имя</Th>
              <Th color={textPrimary}>Описание</Th>
              <Th color={textPrimary}>Статус</Th>
              <Th color={textPrimary}>Время старта</Th>
              <Th color={textPrimary}>Последняя активность</Th>
              <Th color={textPrimary}>Включен</Th>
              <Th color={textPrimary}>Действия</Th>
              <Th color={textPrimary}>Логи</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredServices.map(s => (
              <Tr key={s.name} _hover={{ bg: bgSecondary }}>
                <Td>
                  <Button
                    variant="link"
                    p={0}
                    fontWeight="medium"
                    onClick={() => {
                      setSelectedService(s.name);
                      navigate(
                        `/services/details?name=${encodeURIComponent(s.name)}`
                      );
                    }}
                    color={textPrimary}
                  >
                    {s.displayName || s.name}
                  </Button>
                </Td>
                <Td color={textSecondary}>{s.description}</Td>
                <Td>
                  <Badge
                    colorScheme={getStatusColorScheme(s.status)}
                    px={2}
                    py={1}
                    borderRadius="full"
                  >
                    <FontAwesomeIcon icon={getStatusIcon(s.status)} />{" "}
                    {s.status}
                  </Badge>
                </Td>
                <Td color={textSecondary}>
                  {s.startTime ? new Date(s.startTime).toLocaleString() : "-"}
                </Td>
                <Td color={textSecondary}>
                  {s.lastActivity
                    ? new Date(s.lastActivity).toLocaleString()
                    : "-"}
                </Td>
                <Td>
                  <Tooltip
                    label={s.isEnabled ? "Отключить сервис" : "Включить сервис"}
                    placement="top"
                  >
                    <Switch
                      onChange={() => handleAction(s.name, "toggle")}
                      isChecked={s.isEnabled}
                      colorScheme="green" // Chakra UI color scheme
                      size="md" // Chakra UI size
                      isDisabled={actionLoading === s.name + "toggle"}
                    />
                  </Tooltip>
                </Td>
                <Td>
                  <Flex gap={1}>
                    <Tooltip label="Старт" placement="top">
                      <Button
                        size="sm"
                        variant="outline"
                        colorScheme="green"
                        isDisabled={actionLoading === s.name + "start"}
                        onClick={() => handleAction(s.name, "start")}
                      >
                        <FontAwesomeIcon icon={faPlay} />
                      </Button>
                    </Tooltip>
                    <Tooltip label="Стоп" placement="top">
                      <Button
                        size="sm"
                        variant="outline"
                        colorScheme="red"
                        isDisabled={actionLoading === s.name + "stop"}
                        onClick={() => handleAction(s.name, "stop")}
                      >
                        <FontAwesomeIcon icon={faStop} />
                      </Button>
                    </Tooltip>
                    <Tooltip label="Рестарт" placement="top">
                      <Button
                        size="sm"
                        variant="outline"
                        colorScheme="orange"
                        isDisabled={actionLoading === s.name + "restart"}
                        onClick={() => handleAction(s.name, "restart")}
                      >
                        <FontAwesomeIcon icon={faRedo} />
                      </Button>
                    </Tooltip>
                  </Flex>
                </Td>
                <Td>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => handleShowLogs(s.name)}
                    leftIcon={<FontAwesomeIcon icon={faList} />}
                  >
                    Логи
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {loading && (
          <Box
            position="absolute"
            inset={0}
            bg="whiteAlpha.600"
            zIndex={10}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Spinner size="xl" color={accentColor} />
          </Box>
        )}
      </Box>

      {/* Service Details Modal */}
      <Modal isOpen={isDetailsOpen} onClose={onDetailsClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Service Details</ModalHeader>
          <ModalBody p={0}>
            {selectedService && <ServiceDetails onClose={onDetailsClose} />}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Logs Modal */}
      <Modal isOpen={isLogsOpen} onClose={onLogsClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Service Logs</ModalHeader>
          <ModalBody p={0}>
            {logsService && (
              <LogViewer
                logs={logs}
                loading={logsLoading}
                onClose={onLogsClose}
                serviceName={logsService}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ServerViewerUI;
