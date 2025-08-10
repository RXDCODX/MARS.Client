import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

import { Commands } from "@/shared/api";
import {
  CommandInfo,
  CommandParameterInfo,
  CommandsAdminPlatformInfoListParamsEnum,
} from "@/shared/api/data-contracts";

import { CommandsUserPlatformInfoListParamsEnum } from "../../shared/api/data-contracts";

// Типы для состояния компонента
interface CommandsPageState {
  userCommands: CommandInfo[];
  adminCommands: CommandInfo[];
  selectedCommand: CommandInfo | null;
  commandParameters: CommandParameterInfo[];
  parameterValues: Record<string, string>;
  executionResult: string;
  isExecuting: boolean;
  error: string;
  isLoading: boolean;
  activeTab: "user" | "admin";
}

const CommandsPage: React.FC = () => {
  const [commandsService] = useState(() => new Commands());

  // Цветовые переменные - Reverted to hardcoded values to avoid useColorModeValue issues in non-component functions
  const bgPrimary = "white";
  const bgSecondary = "gray.50";
  const bgCard = "white";
  const textPrimary = "gray.800";
  const textSecondary = "gray.600";
  const borderColor = "gray.200";
  const shadowLight = "sm";

  // Состояние компонента
  const [state, setState] = useState<CommandsPageState>({
    userCommands: [],
    adminCommands: [],
    selectedCommand: null,
    commandParameters: [],
    parameterValues: {},
    executionResult: "",
    isExecuting: false,
    error: "",
    isLoading: true,
    activeTab: "user",
  });

  // Обновление состояния
  const updateState = useCallback((updates: Partial<CommandsPageState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  // Загрузка команд
  const loadCommands = useCallback(async () => {
    try {
      updateState({ isLoading: true, error: "" });

      // Загружаем команды для API платформы
      const resultUser = await commandsService.commandsAdminPlatformInfoList(
        CommandsAdminPlatformInfoListParamsEnum.Api
      );
      const adminResult = await commandsService.commandsUserPlatformInfoList(
        CommandsUserPlatformInfoListParamsEnum.Api
      );

      const userCommandsData = resultUser.data;
      const adminCommandsData = adminResult.data;

      updateState({
        userCommands: userCommandsData,
        adminCommands: adminCommandsData,
        isLoading: false,
      });
    } catch (err) {
      updateState({
        error: "Ошибка при загрузке команд: " + (err as Error).message,
        isLoading: false,
      });
    }
  }, [commandsService, updateState]);

  // Загрузка команд при монтировании компонента
  useEffect(() => {
    loadCommands();
  }, [loadCommands]);

  // Выбор команды
  const handleCommandSelect = async (command: CommandInfo) => {
    try {
      updateState({
        selectedCommand: command,
        commandParameters: [],
        parameterValues: {},
        executionResult: "",
        error: "",
      });

      // Загружаем параметры команды
      const result = await commandsService.commandsParametersList(command.name);
      const parameters = result.data;

      // Инициализируем значения параметров
      const initialValues: Record<string, string> = {};
      parameters.forEach((param: CommandParameterInfo) => {
        if (param.defaultValue) {
          initialValues[param.name] = param.defaultValue;
        } else {
          initialValues[param.name] = "";
        }
      });

      updateState({
        commandParameters: parameters,
        parameterValues: initialValues,
      });
    } catch (err) {
      updateState({
        error:
          "Ошибка при загрузке параметров команды: " + (err as Error).message,
      });
    }
  };

  // Обработка изменения параметра
  const handleParameterChange = (parameterName: string, value: string) => {
    setState(prev => ({
      ...prev,
      parameterValues: {
        ...prev.parameterValues,
        [parameterName]: value,
      },
    }));
  };

  // Построение входной строки команды
  const buildCommandInput = (): string => {
    if (!state.selectedCommand) return "";

    let input = `/${state.selectedCommand.name}`;
    state.commandParameters.forEach(parameter => {
      const value = state.parameterValues[parameter.name];
      if (value && value.trim() !== "") {
        input += ` ${value}`;
      }
    });

    return input;
  };

  // Выполнение команды
  const executeCommand = async () => {
    if (!state.selectedCommand) return;

    try {
      updateState({ isExecuting: true, error: "", executionResult: "" });

      const commandInput = buildCommandInput();
      const result = await commandsService.commandsExecuteCreate(
        state.selectedCommand.name,
        commandInput
      );

      updateState({
        executionResult: result.data || "Команда выполнена успешно",
        isExecuting: false,
      });

      // toast({
      //   title: "Команда выполнена",
      //   description: "Команда была успешно выполнена",
      //   status: "success",
      //   duration: 3000,
      //   isClosable: true,
      // });
    } catch (err) {
      updateState({
        error: "Ошибка при выполнении команды: " + (err as Error).message,
        isExecuting: false,
      });

      // toast({
      //   title: "Ошибка выполнения",
      //   description: "Не удалось выполнить команду",
      //   status: "error",
      //   duration: 5000,
      //   isClosable: true,
      // });
    }
  };

  // Отмена команды
  const handleCancelCommand = () => {
    updateState({
      selectedCommand: null,
      commandParameters: [],
      parameterValues: {},
      executionResult: "",
      error: "",
    });
  };

  // Рендер поля ввода параметра
  const renderParameterInput = (parameter: CommandParameterInfo) => {
    const value = state.parameterValues[parameter.name] || "";

    switch (parameter.type) {
      case "string":
        return (
          <Input
            type="text"
            placeholder={parameter.description}
            value={value}
            onChange={e =>
              handleParameterChange(parameter.name, e.target.value)
            }
            required={parameter.required}
            bg={bgPrimary}
            borderColor={borderColor}
            _focus={{ borderColor: "blue.400", boxShadow: "outline" }}
          />
        );
      case "int":
      case "long":
        return (
          <Input
            type="number"
            placeholder={parameter.description}
            value={value}
            onChange={e =>
              handleParameterChange(parameter.name, e.target.value)
            }
            min={0}
            required={parameter.required}
            bg={bgPrimary}
            borderColor={borderColor}
            _focus={{ borderColor: "blue.400", boxShadow: "outline" }}
          />
        );
      case "double":
        return (
          <Input
            type="number"
            step="0.1"
            placeholder={parameter.description}
            value={value}
            onChange={e =>
              handleParameterChange(parameter.name, e.target.value)
            }
            min={0}
            required={parameter.required}
            bg={bgPrimary}
            borderColor={borderColor}
            _focus={{ borderColor: "blue.400", boxShadow: "outline" }}
          />
        );
      default:
        return (
          <Input
            type="text"
            placeholder={parameter.description}
            value={value}
            onChange={e =>
              handleParameterChange(parameter.name, e.target.value)
            }
            required={parameter.required}
            bg={bgPrimary}
            borderColor={borderColor}
            _focus={{ borderColor: "blue.400", boxShadow: "outline" }}
          />
        );
    }
  };

  // Рендер карточки команды
  const renderCommandCard = (command: CommandInfo) => (
    <Box
      key={command.name}
      mb={2}
      bg={state.selectedCommand?.name === command.name ? "blue.50" : bgCard} // Revert color to hardcoded
      borderColor={
        state.selectedCommand?.name === command.name ? "blue.400" : borderColor // Revert color to hardcoded
      }
      borderWidth="1px"
      shadow={shadowLight}
      cursor="pointer"
      _hover={{ transform: "translateY(-1px)", shadow: "md" }}
      transition="all 0.2s"
      onClick={() => handleCommandSelect(command)}
      p={3}
      borderRadius="md"
    >
      <Flex justify="space-between" align="start">
        <Box>
          <Heading as="h6" size="sm" mb={1} color={textPrimary}>
            /{command.name}
          </Heading>
          <Text fontSize="sm" color={textSecondary} mb={1}>
            {command.description}
          </Text>
        </Box>
        <Box textAlign="right">
          {command.isAdminCommand && (
            <Badge colorScheme="red" mb={1}>
              Админ
            </Badge>
          )}
          <Text fontSize="xs" color={textSecondary}>
            {command.availablePlatforms.length} платформ
          </Text>
        </Box>
      </Flex>
    </Box>
  );

  // Отображение загрузки
  if (state.isLoading) {
    return (
      <Container maxW="container.xl" py={5} textAlign="center">
        <Spinner size="xl" color="blue.500" /> {/* Revert color to hardcoded */}
        <Text mt={3} color={textSecondary}>
          Загрузка команд...
        </Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={4}>
      <Heading as="h1" size="xl" mb={6} color={textPrimary}>
        Выполнение команд
      </Heading>

      {state.error && (
        <Box
          bg="red.50" // Revert color to hardcoded
          borderColor="red.200" // Revert color to hardcoded
          borderWidth="1px"
          borderRadius="md"
          p={4}
          mb={6}
        >
          <Text color="red.800">{state.error}</Text>
        </Box>
      )}

      <Grid templateColumns={{ base: "1fr", lg: "1fr 2fr" }} gap={6}>
        {/* Список команд */}
        <GridItem>
          <Box
            bg={bgCard}
            borderColor={borderColor}
            borderWidth="1px"
            shadow={shadowLight}
            borderRadius="md"
          >
            <Box
              bg={bgSecondary}
              borderBottomWidth="1px"
              borderColor={borderColor}
              p={3}
              borderTopRadius="md"
            >
              <Flex justify="space-between" align="center">
                <Text fontWeight="semibold" color={textPrimary}>
                  Команды
                </Text>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={loadCommands}
                  disabled={state.isLoading}
                >
                  {state.isLoading && <Spinner size="sm" mr={2} />}
                  Обновить
                </Button>
              </Flex>
            </Box>
            <Box p={0}>
              <Box p={3}>
                <Box>
                  <Flex mb={3}>
                    <Button
                      variant={state.activeTab === "user" ? "solid" : "outline"}
                      size="sm"
                      mr={2}
                      onClick={() => updateState({ activeTab: "user" })}
                      colorScheme={state.activeTab === "user" ? "blue" : "gray"}
                    >
                      Пользовательские ({state.userCommands.length})
                    </Button>
                    <Button
                      variant={
                        state.activeTab === "admin" ? "solid" : "outline"
                      }
                      size="sm"
                      onClick={() => updateState({ activeTab: "admin" })}
                      colorScheme={
                        state.activeTab === "admin" ? "blue" : "gray"
                      }
                    >
                      Админские ({state.adminCommands.length})
                    </Button>
                  </Flex>

                  {state.activeTab === "user" ? (
                    <Box maxH="600px" overflowY="auto" px={3} pb={3}>
                      {state.userCommands.length > 0 ? (
                        state.userCommands.map(renderCommandCard)
                      ) : (
                        <Text color={textSecondary} textAlign="center">
                          Нет пользовательских команд
                        </Text>
                      )}
                    </Box>
                  ) : (
                    <Box maxH="600px" overflowY="auto" px={3} pb={3}>
                      {state.adminCommands.length > 0 ? (
                        state.adminCommands.map(renderCommandCard)
                      ) : (
                        <Text color={textSecondary} textAlign="center">
                          Нет админских команд
                        </Text>
                      )}
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </GridItem>

        {/* Параметры и выполнение */}
        <GridItem>
          {state.selectedCommand ? (
            <Box
              bg={bgCard}
              borderColor={borderColor}
              borderWidth="1px"
              shadow={shadowLight}
              borderRadius="md"
            >
              <Box
                bg={bgSecondary}
                borderBottomWidth="1px"
                borderColor={borderColor}
                p={3}
                borderTopRadius="md"
              >
                <Box>
                  <Heading as="h5" size="md" mb={1} color={textPrimary}>
                    /{state.selectedCommand.name}
                  </Heading>
                  <Text fontSize="sm" color={textSecondary}>
                    {state.selectedCommand.description}
                  </Text>
                </Box>
              </Box>
              <Box p={4}>
                {state.commandParameters.length > 0 ? (
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap={4}
                    alignItems="stretch"
                  >
                    <Heading as="h6" size="sm" color={textPrimary}>
                      Параметры команды:
                    </Heading>

                    {state.commandParameters.map(parameter => (
                      <Box key={parameter.name} mb={4}>
                        <Text fontWeight="medium" color={textPrimary} mb={2}>
                          {parameter.name}
                          {parameter.required && (
                            <Text as="span" color="red.500" ml={1}>
                              *
                            </Text>
                          )}
                          {parameter.defaultValue && (
                            <Text
                              as="span"
                              fontSize="sm"
                              color={textSecondary}
                              ml={2}
                            >
                              (по умолчанию: {parameter.defaultValue})
                            </Text>
                          )}
                        </Text>
                        {renderParameterInput(parameter)}
                        <Text fontSize="xs" color={textSecondary} mt={1}>
                          {parameter.description} (тип: {parameter.type})
                        </Text>
                      </Box>
                    ))}

                    <Flex gap={3} mb={3}>
                      <Button
                        colorScheme="blue"
                        onClick={executeCommand}
                        disabled={state.isExecuting}
                      >
                        {state.isExecuting && <Spinner size="sm" mr={2} />}
                        {state.isExecuting
                          ? "Выполняется..."
                          : "Выполнить команду"}
                      </Button>

                      <Button variant="outline" onClick={handleCancelCommand}>
                        Отменить
                      </Button>
                    </Flex>

                    {state.executionResult && (
                      <Box mt={3}>
                        <Heading as="h6" size="sm" mb={2} color={textPrimary}>
                          Результат:
                        </Heading>
                        <Box
                          bg={bgSecondary}
                          p={3}
                          borderRadius="md"
                          borderWidth="1px"
                          borderColor={borderColor}
                          maxH="300px"
                          overflowY="auto"
                          whiteSpace="pre-wrap"
                          wordBreak="break-word"
                          fontFamily="mono"
                        >
                          {state.executionResult}
                        </Box>
                      </Box>
                    )}
                  </Box>
                ) : (
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap={4}
                    textAlign="center"
                    py={4}
                    alignItems="center"
                  >
                    <Text color={textSecondary}>
                      У этой команды нет параметров
                    </Text>
                    <Button
                      colorScheme="blue"
                      onClick={executeCommand}
                      disabled={state.isExecuting}
                    >
                      {state.isExecuting && <Spinner size="sm" mr={2} />}
                      {state.isExecuting
                        ? "Выполняется..."
                        : "Выполнить команду"}
                    </Button>

                    {state.executionResult && (
                      <Box mt={3} w="100%">
                        <Heading as="h6" size="sm" mb={2} color={textPrimary}>
                          Результат:
                        </Heading>
                        <Box
                          bg={bgSecondary}
                          p={3}
                          borderRadius="md"
                          borderWidth="1px"
                          borderColor={borderColor}
                          maxH="300px"
                          overflowY="auto"
                          whiteSpace="pre-wrap"
                          wordBreak="break-word"
                          fontFamily="mono"
                        >
                          {state.executionResult}
                        </Box>
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
            </Box>
          ) : (
            <Box
              bg={bgCard}
              borderColor={borderColor}
              borderWidth="1px"
              shadow={shadowLight}
              borderRadius="md"
              textAlign="center"
              py={10}
            >
              <Text fontSize="6xl" mb={3} color={textSecondary}>
                ⌨️
              </Text>
              <Heading as="h5" size="md" mb={2} color={textPrimary}>
                Выберите команду для выполнения
              </Heading>
              <Text color={textSecondary}>
                Выберите команду из списка слева, чтобы настроить параметры и
                выполнить её
              </Text>
            </Box>
          )}
        </GridItem>
      </Grid>
    </Container>
  );
};

export default CommandsPage;
