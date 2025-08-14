import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  ButtonGroup,
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
} from "@/shared/api/http-clients/data-contracts";
import {
  createErrorToast,
  createSuccessToast,
  useToastModal,
} from "@/shared/Utils/ToastModal";
import { useSiteColors } from "@/shared/Utils/useSiteColors";

import styles from "./CommandsPage.module.scss";

// Типы для состояния компонента
interface CommandsPageState {
  userCommands: CommandInfo[];
  adminCommands: CommandInfo[];
  selectedCommand: CommandInfo | null;
  commandParameters: CommandParameterInfo[];
  parameterValues: Record<string, string>;
  isExecuting: boolean;
  error: string;
  isLoading: boolean;
  activeTab: "user" | "admin";
  displayMode: "list" | "grid";
}

// Компонент для отображения команд в виде списка
const ListView: React.FC<{
  commands: CommandInfo[];
  selectedCommand: CommandInfo | null;
  onCommandSelect: (command: CommandInfo) => void;
  colors: ReturnType<typeof useSiteColors>;
  styles: Record<string, string>;
}> = ({ commands, selectedCommand, onCommandSelect, colors, styles }) => {
  const renderCommandCard = (command: CommandInfo) => (
    <Card
      key={command.name}
      className={`mb-2 ${selectedCommand?.name === command.name ? styles.selectedCommand : ""}`}
      style={{
        backgroundColor:
          selectedCommand?.name === command.name
            ? colors.background.accent
            : colors.background.card,
        borderColor: colors.border.primary,
        cursor: "pointer",
      }}
      onClick={() => onCommandSelect(command)}
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

  return <div>{commands.map(renderCommandCard)}</div>;
};

// Компонент для отображения команд в виде сетки
const GridView: React.FC<{
  commands: CommandInfo[];
  selectedCommand: CommandInfo | null;
  onCommandSelect: (command: CommandInfo) => void;
  colors: ReturnType<typeof useSiteColors>;
  styles: Record<string, string>;
}> = ({ commands, selectedCommand, onCommandSelect, colors, styles }) => {
  const renderCommandGridCard = (command: CommandInfo) => (
    <Card
      key={command.name}
      className={`h-100 ${styles.commandCard} ${selectedCommand?.name === command.name ? styles.selectedCommand : ""}`}
      style={{
        backgroundColor:
          selectedCommand?.name === command.name
            ? colors.background.accent
            : colors.background.card,
        borderColor: colors.border.primary,
        cursor: "pointer",
      }}
      onClick={() => onCommandSelect(command)}
    >
      <Card.Body className="p-3 d-flex flex-column">
        <div className="text-center mb-2">
          <h6 className="mb-2" style={colors.utils.getTextStyle("primary")}>
            /{command.name}
          </h6>
          {command.isAdminCommand && (
            <Badge bg="danger" className="mb-2">
              Админ
            </Badge>
          )}
        </div>
        <p
          className="small text-center flex-grow-1"
          style={colors.utils.getTextStyle("secondary")}
        >
          {command.description}
        </p>
        <div className="text-center">
          <small className="text-muted">
            {command.availablePlatforms.length} платформ
          </small>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <Row xs={1} sm={2} className="g-2">
      {commands.map(command => (
        <Col key={command.name}>{renderCommandGridCard(command)}</Col>
      ))}
    </Row>
  );
};

const CommandsPage: React.FC = () => {
  const colors = useSiteColors();
  const { showToast } = useToastModal();
  const [commandsService] = useState(() => new Commands());

  // Состояние компонента
  const [state, setState] = useState<CommandsPageState>({
    userCommands: [],
    adminCommands: [],
    selectedCommand: null,
    commandParameters: [],
    parameterValues: {},
    isExecuting: false,
    error: "",
    isLoading: true,
    activeTab: "user",
    displayMode: "list",
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
      const resultUser =
        await commandsService.commandsAdminPlatformInfoList("Api");
      const adminResult =
        await commandsService.commandsUserPlatformInfoList("Api");

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
      updateState({ isExecuting: true, error: "" });

      const input = buildCommandInput();
      const result = await commandsService.commandsExecuteCreate(
        state.selectedCommand.name,
        input
      );

      const resultData = result.data;

      // Показываем результат через toast
      showToast(
        createSuccessToast(
          `Команда /${state.selectedCommand.name} выполнена успешно`,
          resultData,
          "Результат выполнения команды"
        )
      );

      updateState({ isExecuting: false });
    } catch (err) {
      const errorMessage =
        "Ошибка при выполнении команды: " + (err as Error).message;

      // Показываем ошибку через toast
      showToast(
        createErrorToast(errorMessage, err, "Ошибка выполнения команды")
      );

      updateState({
        error: errorMessage,
        isExecuting: false,
      });
    }
  };

  // Отмена выбора команды
  const handleCancelCommand = () => {
    updateState({
      selectedCommand: null,
      parameterValues: {},
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

  // Получаем текущие команды в зависимости от активной вкладки
  const currentCommands =
    state.activeTab === "user" ? state.userCommands : state.adminCommands;

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 style={colors.utils.getTextStyle("primary")}>
              Выполнение команд
            </h1>

            {/* Переключатель режима отображения */}
            <ButtonGroup size="sm">
              <Button
                variant={
                  state.displayMode === "list" ? "primary" : "outline-primary"
                }
                onClick={() => updateState({ displayMode: "list" })}
              >
                <i className="bi bi-list-ul me-1"></i>
                Список
              </Button>
              <Button
                variant={
                  state.displayMode === "grid" ? "primary" : "outline-primary"
                }
                onClick={() => updateState({ displayMode: "grid" })}
              >
                <i className="bi bi-grid-3x3-gap me-1"></i>
                Сетка
              </Button>
            </ButtonGroup>
          </div>

          {state.error && (
            <Alert variant="danger" className="mb-4">
              {state.error}
            </Alert>
          )}

          <Row>
            {/* Список команд */}
            <Col lg={state.displayMode === "grid" ? 12 : 4}>
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
                    {currentCommands.length > 0 ? (
                      state.displayMode === "list" ? (
                        <ListView
                          commands={currentCommands}
                          selectedCommand={state.selectedCommand}
                          onCommandSelect={handleCommandSelect}
                          colors={colors}
                          styles={styles}
                        />
                      ) : (
                        <GridView
                          commands={currentCommands}
                          selectedCommand={state.selectedCommand}
                          onCommandSelect={handleCommandSelect}
                          colors={colors}
                          styles={styles}
                        />
                      )
                    ) : (
                      <p className="text-muted text-center">
                        Нет{" "}
                        {state.activeTab === "user"
                          ? "пользовательских"
                          : "админских"}{" "}
                        команд
                      </p>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Параметры и выполнение - показываем только в режиме списка */}
            {state.displayMode === "list" && (
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
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                ) : (
                  // Показываем div с "Выберите команду" только в режиме списка
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
            )}
          </Row>

          {/* Отдельное окно с параметрами команды в режиме сетки */}
          {state.displayMode === "grid" && state.selectedCommand && (
            <Row className="mt-4">
              <Col>
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
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CommandsPage;
