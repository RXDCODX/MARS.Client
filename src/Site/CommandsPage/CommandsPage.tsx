import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Select,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { useSiteColors } from "@/shared/Utils/useSiteColors";

interface CommandInfo {
  name: string;
  description: string;
  availablePlatforms: string[];
  parameters: string[];
}

interface CommandParameterInfo {
  name: string;
  type: string;
  description: string;
  required: boolean;
  defaultValue?: string;
}

const CommandsPage: React.FC = () => {
  const [userCommands, setUserCommands] = useState<CommandInfo[]>([]);
  const [adminCommands, setAdminCommands] = useState<CommandInfo[]>([]);
  const [selectedCommand, setSelectedCommand] = useState<CommandInfo | null>(null);
  const [commandParameters, setCommandParameters] = useState<CommandParameterInfo[]>([]);
  const [parameterValues, setParameterValues] = useState<Record<string, string>>({});
  const [executionResult, setExecutionResult] = useState<string>("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"user" | "admin">("user");

  const colors = useSiteColors();
  const toast = useToast();

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const cardBg = useColorModeValue("gray.50", "gray.700");

  useEffect(() => {
    loadCommands();
  }, []);

  const loadCommands = async () => {
    setIsLoading(true);
    try {
      // Имитация загрузки команд
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUserCommands: CommandInfo[] = [
        {
          name: "!help",
          description: "Показать список доступных команд",
          availablePlatforms: ["Twitch", "YouTube", "Discord"],
          parameters: [],
        },
        {
          name: "!song",
          description: "Запросить песню в очереди",
          availablePlatforms: ["Twitch", "YouTube"],
          parameters: ["song_name"],
        },
        {
          name: "!points",
          description: "Показать количество очков",
          availablePlatforms: ["Twitch", "YouTube"],
          parameters: [],
        },
        {
          name: "!raffle",
          description: "Участвовать в розыгрыше",
          availablePlatforms: ["Twitch"],
          parameters: [],
        },
      ];

      const mockAdminCommands: CommandInfo[] = [
        {
          name: "!ban",
          description: "Забанить пользователя",
          availablePlatforms: ["Twitch", "YouTube", "Discord"],
          parameters: ["username", "reason", "duration"],
        },
        {
          name: "!timeout",
          description: "Временно замутить пользователя",
          availablePlatforms: ["Twitch", "YouTube"],
          parameters: ["username", "duration", "reason"],
        },
        {
          name: "!clear",
          description: "Очистить чат",
          availablePlatforms: ["Twitch", "YouTube"],
          parameters: [],
        },
        {
          name: "!announce",
          description: "Сделать объявление",
          availablePlatforms: ["Twitch", "YouTube", "Discord"],
          parameters: ["message"],
        },
      ];

      setUserCommands(mockUserCommands);
      setAdminCommands(mockAdminCommands);
      setIsLoading(false);
    } catch (err) {
      setError("Ошибка загрузки команд");
      setIsLoading(false);
    }
  };

  const handleCommandSelect = async (command: CommandInfo) => {
    setSelectedCommand(command);
    setExecutionResult("");
    setError("");

    // Имитация загрузки параметров команды
    const mockParameters: CommandParameterInfo[] = command.parameters.map(param => ({
      name: param,
      type: "string",
      description: `Параметр: ${param}`,
      required: true,
      defaultValue: "",
    }));

    setCommandParameters(mockParameters);
    setParameterValues({});
  };

  const handleParameterChange = (parameterName: string, value: string) => {
    setParameterValues(prev => ({
      ...prev,
      [parameterName]: value,
    }));
  };

  const buildCommandInput = (): string => {
    if (!selectedCommand) return "";

    let command = selectedCommand.name;
    commandParameters.forEach(param => {
      const value = parameterValues[param.name] || param.defaultValue || "";
      if (value) {
        command += ` ${value}`;
      }
    });

    return command;
  };

  const executeCommand = async () => {
    if (!selectedCommand) return;

    setIsExecuting(true);
    setError("");

    try {
      // Имитация выполнения команды
      await new Promise(resolve => setTimeout(resolve, 2000));

      const commandInput = buildCommandInput();
      const result = `Команда "${commandInput}" выполнена успешно!\n\nРезультат: ${selectedCommand.description}`;

      setExecutionResult(result);
      toast({
        title: "Команда выполнена",
        description: "Команда была успешно выполнена",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      setError("Ошибка выполнения команды");
      toast({
        title: "Ошибка",
        description: "Не удалось выполнить команду",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const handleCancelCommand = () => {
    setSelectedCommand(null);
    setCommandParameters([]);
    setParameterValues({});
    setExecutionResult("");
    setError("");
  };

  const renderParameterInput = (parameter: CommandParameterInfo) => (
    <FormControl key={parameter.name} isRequired={parameter.required}>
      <FormLabel color={textColor}>
        {parameter.name}
        {parameter.required && <Text as="span" color="red.500"> *</Text>}
      </FormLabel>
      <Input
        value={parameterValues[parameter.name] || ""}
        onChange={(e) => handleParameterChange(parameter.name, e.target.value)}
        placeholder={parameter.description}
        bg={bgColor}
        borderColor={borderColor}
        _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
      />
      <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.300")} mt={1}>
        {parameter.description}
      </Text>
    </FormControl>
  );

  const renderCommandCard = (command: CommandInfo) => (
    <Box
      key={command.name}
      p={6}
      bg={cardBg}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="lg"
      cursor="pointer"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "lg",
      }}
      onClick={() => handleCommandSelect(command)}
    >
      <VStack spacing={4} align="stretch">
        <Heading as="h3" size="md" color={textColor}>
          {command.name}
        </Heading>
        <Text color={useColorModeValue("gray.600", "gray.300")}>
          {command.description}
        </Text>
        
        <Box>
          <Text fontSize="sm" fontWeight="semibold" color={textColor} mb={2}>
            Доступно на:
          </Text>
          <Flex gap={2} flexWrap="wrap">
            {command.availablePlatforms.map((platform) => (
              <Box
                key={platform}
                px={2}
                py={1}
                bg="blue.100"
                color="blue.800"
                borderRadius="md"
                fontSize="xs"
                fontWeight="medium"
              >
                {platform}
              </Box>
            ))}
          </Flex>
        </Box>

        {command.parameters.length > 0 && (
          <Box>
            <Text fontSize="sm" fontWeight="semibold" color={textColor} mb={2}>
              Параметры:
            </Text>
            <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.300")}>
              {command.parameters.join(", ")}
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );

  if (isLoading) {
    return (
      <Box p={8} bg={bgColor} minH="100vh">
        <Flex direction="column" align="center" justify="center" height="100vh">
          <Spinner size="xl" color={colors.primary} />
          <Text fontSize="lg" color={textColor} mt={4}>
            Загрузка команд...
          </Text>
        </Flex>
      </Box>
    );
  }

  return (
    <Box p={8} bg={bgColor} minH="100vh">
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box textAlign="center">
          <Heading as="h1" size="2xl" color={textColor} mb={6}>
            📋 Команды MARS
          </Heading>
          <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.300")} maxW="3xl" mx="auto">
            Управление командами для различных платформ. Настройте автоматические 
            ответы и действия для вашего стрима.
          </Text>
        </Box>

        <Tabs value={activeTab} onChange={(value) => setActiveTab(value as "user" | "admin")}>
          <TabList>
            <Tab>👤 Пользовательские команды</Tab>
            <Tab>⚙️ Админ команды</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
                  {userCommands.map(renderCommandCard)}
                </Grid>
              </VStack>
            </TabPanel>

            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
                  {adminCommands.map(renderCommandCard)}
                </Grid>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>

        {/* Command Execution Panel */}
        {selectedCommand && (
          <Box
            p={6}
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="xl"
          >
            <VStack spacing={6} align="stretch">
              <Flex justify="space-between" align="center">
                <Heading as="h2" size="lg" color={textColor}>
                  Выполнение команды: {selectedCommand.name}
                </Heading>
                <Button
                  variant="outline"
                  colorScheme="gray"
                  onClick={handleCancelCommand}
                  size="sm"
                >
                  Отмена
                </Button>
              </Flex>

              <Text color={useColorModeValue("gray.600", "gray.300")}>
                {selectedCommand.description}
              </Text>

              {/* Parameters */}
              {commandParameters.length > 0 && (
                <Box>
                  <Heading as="h3" size="md" color={textColor} mb={4}>
                    Параметры команды
                  </Heading>
                  <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                    {commandParameters.map(renderParameterInput)}
                  </Grid>
                </Box>
              )}

              {/* Command Preview */}
              <Box>
                <Heading as="h3" size="md" color={textColor} mb={3}>
                  Предварительный просмотр
                </Heading>
                <Box
                  p={4}
                  bg={bgColor}
                  border="1px solid"
                  borderColor={borderColor}
                  borderRadius="md"
                  fontFamily="mono"
                  fontSize="lg"
                  color={textColor}
                >
                  {buildCommandInput()}
                </Box>
              </Box>

              {/* Execute Button */}
              <Button
                colorScheme="blue"
                size="lg"
                onClick={executeCommand}
                isLoading={isExecuting}
                loadingText="Выполнение..."
                isDisabled={commandParameters.some(p => p.required && !parameterValues[p.name])}
              >
                Выполнить команду
              </Button>

              {/* Results */}
              {executionResult && (
                <Box>
                  <Heading as="h3" size="md" color={textColor} mb={3}>
                    Результат выполнения
                  </Heading>
                  <Textarea
                    value={executionResult}
                    isReadOnly
                    rows={6}
                    bg={bgColor}
                    borderColor={borderColor}
                    fontFamily="mono"
                  />
                </Box>
              )}

              {/* Error Display */}
              {error && (
                <Alert status="error" borderRadius="md">
                  <AlertIcon />
                  <Text>{error}</Text>
                </Alert>
              )}
            </VStack>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default CommandsPage;
