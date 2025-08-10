import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";

import { Commands } from "@/shared/api";
import {
  CommandInfo,
  CommandParameterInfo,
  CommandsAdminPlatformInfoListParamsEnum,
} from "@/shared/api/data-contracts";
import { useSiteColors } from "@/shared/Utils/useSiteColors";

import { CommandsUserPlatformInfoListParamsEnum } from "../../shared/api/data-contracts";
import styles from "./CommandsPage.module.scss";

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
  const colors = useSiteColors();
  const [commandsService] = useState(() => new Commands());

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
        parameterValues: {},
        executionResult: "",
        error: "",
      });

      // Загружаем параметры команды
      const result = await commandsService.commandsParametersList(command.name);

      const parameters = result.data;

      updateState({ commandParameters: parameters });
    } catch (err) {
      updateState({
        error:
          "Ошибка при загрузке параметров команды: " + (err as Error).message,
      });
    }
  };

  // Изменение параметра
  const handleParameterChange = (parameterName: string, value: string) => {
    updateState({
      parameterValues: {
        ...state.parameterValues,
        [parameterName]: value,
      },
    });
  };

  // Построение входной строки команды
  const buildCommandInput = (): string => {
    if (!state.selectedCommand || state.commandParameters.length === 0) {
      return "";
    }

    const inputParts: string[] = [];

    state.commandParameters.forEach(param => {
      const value =
        state.parameterValues[param.name] || param.defaultValue || "";
      if (value) {
        inputParts.push(value);
      }
    });

    return inputParts.join(" ");
  };

  // Выполнение команды
  const executeCommand = async () => {
    if (!state.selectedCommand) return;

    try {
      updateState({ isExecuting: true, error: "", executionResult: "" });

      const input = buildCommandInput();
      const result = await commandsService.commandsExecuteCreate(
        state.selectedCommand.name,
        input
      );

      const resultData = result.data;

      updateState({ executionResult: resultData, isExecuting: false });
    } catch (err) {
      updateState({
        error: "Ошибка при выполнении команды: " + (err as Error).message,
        isExecuting: false,
      });
    }
  };

  // Отмена выбора команды
  const handleCancelCommand = () => {
    updateState({
      selectedCommand: null,
      parameterValues: {},
      executionResult: "",
      commandParameters: [],
    });
  };

  // Рендер поля ввода параметра
  const renderParameterInput = (parameter: CommandParameterInfo) => {
    const value =
      state.parameterValues[parameter.name] || parameter.defaultValue || "";

    switch (parameter.type.toLowerCase()) {
      case "bool":
        return (
          <Form.Check
            type="checkbox"
            id={`param-${parameter.name}`}
            label={parameter.description}
            checked={value === "true"}
            onChange={e =>
              handleParameterChange(parameter.name, e.target.checked.toString())
            }
          />
        );
      case "int":
      case "long":
        return (
          <Form.Control
            type="number"
            placeholder={parameter.description}
            value={value}
            onChange={e =>
              handleParameterChange(parameter.name, e.target.value)
            }
            required={parameter.required}
          />
        );
      case "double":
        return (
          <Form.Control
            type="number"
            step="0.1"
            placeholder={parameter.description}
            value={value}
            onChange={e =>
              handleParameterChange(parameter.name, e.target.value)
            }
            required={parameter.required}
          />
        );
      default:
        return (
          <Form.Control
            type="text"
            placeholder={parameter.description}
            value={value}
            onChange={e =>
              handleParameterChange(parameter.name, e.target.value)
            }
            required={parameter.required}
          />
        );
    }
  };

  // Рендер карточки команды
  const renderCommandCard = (command: CommandInfo) => (
    <Card
      key={command.name}
      className={`mb-2 ${state.selectedCommand?.name === command.name ? styles.selectedCommand : ""}`}
      style={{
        backgroundColor:
          state.selectedCommand?.name === command.name
            ? colors.background.accent
            : colors.background.card,
        borderColor: colors.border.primary,
        cursor: "pointer",
      }}
      onClick={() => handleCommandSelect(command)}
    >
      <Card.Body className="p-3">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h6 className="mb-1" style={colors.utils.getTextStyle("primary")}>
              /{command.name}
            </h6>
            <p
              className="mb-1 small"
              style={colors.utils.getTextStyle("secondary")}
            >
              {command.description}
            </p>
          </div>
          <div className="text-end">
            {command.isAdminCommand && (
              <Badge bg="danger" className="mb-1">
                Админ
              </Badge>
            )}
            <div className="small text-muted">
              {command.availablePlatforms.length} платформ
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  // Отображение загрузки
  if (state.isLoading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </Spinner>
        <p className="mt-3" style={colors.utils.getTextStyle("secondary")}>
          Загрузка команд...
        </p>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h1 className="mb-4" style={colors.utils.getTextStyle("primary")}>
            Выполнение команд
          </h1>

          {state.error && (
            <Alert variant="danger" className="mb-4">
              {state.error}
            </Alert>
          )}

          <Row>
            {/* Список команд */}
            <Col lg={4}>
              <Card
                style={{
                  backgroundColor: colors.background.card,
                  borderColor: colors.border.primary,
                }}
              >
                <Card.Header
                  style={{
                    backgroundColor: colors.background.secondary,
                    borderColor: colors.border.primary,
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <span style={colors.utils.getTextStyle("primary")}>
                      Команды
                    </span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={loadCommands}
                      disabled={state.isLoading}
                    >
                      <i className="bi bi-arrow-clockwise"></i>
                    </Button>
                  </div>
                </Card.Header>
                <Card.Body className="p-0">
                  <div className="p-3">
                    <div className="btn-group w-100 mb-3" role="group">
                      <input
                        type="radio"
                        className="btn-check"
                        name="commandType"
                        id="userCommands"
                        checked={state.activeTab === "user"}
                        onChange={() => updateState({ activeTab: "user" })}
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor="userCommands"
                      >
                        Пользовательские ({state.userCommands.length})
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name="commandType"
                        id="adminCommands"
                        checked={state.activeTab === "admin"}
                        onChange={() => updateState({ activeTab: "admin" })}
                      />
                      <label
                        className="btn btn-outline-danger"
                        htmlFor="adminCommands"
                      >
                        Админские ({state.adminCommands.length})
                      </label>
                    </div>
                  </div>

                  <div
                    className="px-3 pb-3"
                    style={{ maxHeight: "600px", overflowY: "auto" }}
                  >
                    {state.activeTab === "user" ? (
                      state.userCommands.length > 0 ? (
                        state.userCommands.map(renderCommandCard)
                      ) : (
                        <p className="text-muted text-center">
                          Нет пользовательских команд
                        </p>
                      )
                    ) : state.adminCommands.length > 0 ? (
                      state.adminCommands.map(renderCommandCard)
                    ) : (
                      <p className="text-muted text-center">
                        Нет админских команд
                      </p>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Параметры и выполнение */}
            <Col lg={8}>
              {state.selectedCommand ? (
                <Card
                  style={{
                    backgroundColor: colors.background.card,
                    borderColor: colors.border.primary,
                  }}
                >
                  <Card.Header
                    style={{
                      backgroundColor: colors.background.secondary,
                      borderColor: colors.border.primary,
                    }}
                  >
                    <h5
                      className="mb-0"
                      style={colors.utils.getTextStyle("primary")}
                    >
                      /{state.selectedCommand.name}
                    </h5>
                    <small style={colors.utils.getTextStyle("secondary")}>
                      {state.selectedCommand.description}
                    </small>
                  </Card.Header>
                  <Card.Body>
                    {state.commandParameters.length > 0 ? (
                      <Form>
                        <h6
                          className="mb-3"
                          style={colors.utils.getTextStyle("primary")}
                        >
                          Параметры команды:
                        </h6>

                        {state.commandParameters.map(parameter => (
                          <Form.Group key={parameter.name} className="mb-3">
                            <Form.Label
                              style={colors.utils.getTextStyle("primary")}
                            >
                              {parameter.name}
                              {parameter.required && (
                                <span className="text-danger"> *</span>
                              )}
                              {parameter.defaultValue && (
                                <small className="text-muted ms-2">
                                  (по умолчанию: {parameter.defaultValue})
                                </small>
                              )}
                            </Form.Label>
                            {renderParameterInput(parameter)}
                            <Form.Text className="text-muted">
                              {parameter.description} (тип: {parameter.type})
                            </Form.Text>
                          </Form.Group>
                        ))}

                        <div className="d-flex gap-2 mb-3">
                          <Button
                            variant="primary"
                            onClick={executeCommand}
                            disabled={state.isExecuting}
                          >
                            {state.isExecuting ? (
                              <>
                                <Spinner
                                  animation="border"
                                  size="sm"
                                  className="me-2"
                                />
                                Выполняется...
                              </>
                            ) : (
                              "Выполнить команду"
                            )}
                          </Button>

                          <Button
                            variant="outline-secondary"
                            onClick={handleCancelCommand}
                          >
                            Отменить
                          </Button>
                        </div>

                        {state.executionResult && (
                          <div className="mt-3">
                            <h6 style={colors.utils.getTextStyle("primary")}>
                              Результат:
                            </h6>
                            <pre
                              className="bg-light p-3 rounded"
                              style={{
                                backgroundColor: colors.background.secondary,
                                border: `1px solid ${colors.border.primary}`,
                                maxHeight: "300px",
                                overflowY: "auto",
                                whiteSpace: "pre-wrap",
                                wordBreak: "break-word",
                              }}
                            >
                              {state.executionResult}
                            </pre>
                          </div>
                        )}
                      </Form>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-muted">
                          У этой команды нет параметров
                        </p>
                        <Button
                          variant="primary"
                          onClick={executeCommand}
                          disabled={state.isExecuting}
                        >
                          {state.isExecuting ? (
                            <>
                              <Spinner
                                animation="border"
                                size="sm"
                                className="me-2"
                              />
                              Выполняется...
                            </>
                          ) : (
                            "Выполнить команду"
                          )}
                        </Button>

                        {state.executionResult && (
                          <div className="mt-3">
                            <h6 style={colors.utils.getTextStyle("primary")}>
                              Результат:
                            </h6>
                            <pre
                              className="bg-light p-3 rounded"
                              style={{
                                backgroundColor: colors.background.secondary,
                                border: `1px solid ${colors.border.primary}`,
                                maxHeight: "300px",
                                overflowY: "auto",
                                whiteSpace: "pre-wrap",
                                wordBreak: "break-word",
                              }}
                            >
                              {state.executionResult}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </Card.Body>
                </Card>
              ) : (
                <Card
                  style={{
                    backgroundColor: colors.background.card,
                    borderColor: colors.border.primary,
                  }}
                >
                  <Card.Body className="text-center py-5">
                    <i className="bi bi-terminal display-1 text-muted mb-3"></i>
                    <h5 style={colors.utils.getTextStyle("primary")}>
                      Выберите команду для выполнения
                    </h5>
                    <p style={colors.utils.getTextStyle("secondary")}>
                      Выберите команду из списка слева, чтобы настроить
                      параметры и выполнить её
                    </p>
                  </Card.Body>
                </Card>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CommandsPage;
