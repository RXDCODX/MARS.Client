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

import {
  CommandInfo,
  CommandParameterInfo,
} from "../../shared/api/generated/Api";
import { CommandsService } from "../../shared/api/generated/commands-client";
import { useSiteColors } from "../../shared/Utils/useSiteColors";
import styles from "./CommandsPage.module.scss";

const CommandsPage: React.FC = () => {
  const colors = useSiteColors();
  const [commandsService] = useState(() => new CommandsService());

  // Состояние для команд
  const [userCommands, setUserCommands] = useState<CommandInfo[]>([]);
  const [adminCommands, setAdminCommands] = useState<CommandInfo[]>([]);
  const [selectedCommand, setSelectedCommand] = useState<CommandInfo | null>(
    null,
  );
  const [commandParameters, setCommandParameters] = useState<
    CommandParameterInfo[]
  >([]);

  // Состояние для параметров
  const [parameterValues, setParameterValues] = useState<
    Record<string, string>
  >({});

  // Состояние для результатов
  const [executionResult, setExecutionResult] = useState<string>("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState<string>("");

  // Состояние для загрузки
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"user" | "admin">("user");

  const loadCommands = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      // Загружаем команды для API платформы
      const userCommandsData =
        await commandsService.getUserCommandsInfoForPlatform("Api");
      const adminCommandsData =
        await commandsService.getAdminCommandsInfoForPlatform("Api");

      setUserCommands(userCommandsData);
      setAdminCommands(adminCommandsData);
    } catch (err) {
      setError("Ошибка при загрузке команд: " + (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [commandsService]);

  // Загрузка команд при монтировании компонента
  useEffect(() => {
    loadCommands();
  }, [loadCommands]);

  const handleCommandSelect = async (command: CommandInfo) => {
    try {
      setSelectedCommand(command);
      setParameterValues({});
      setExecutionResult("");
      setError("");

      // Загружаем параметры команды
      const parameters = await commandsService.getCommandParameters(
        command.name,
      );
      setCommandParameters(parameters);
    } catch (err) {
      setError(
        "Ошибка при загрузке параметров команды: " + (err as Error).message,
      );
    }
  };

  const handleParameterChange = (parameterName: string, value: string) => {
    setParameterValues((prev) => ({
      ...prev,
      [parameterName]: value,
    }));
  };

  const buildCommandInput = (): string => {
    if (!selectedCommand || commandParameters.length === 0) {
      return "";
    }

    const inputParts: string[] = [];

    commandParameters.forEach((param) => {
      const value = parameterValues[param.name] || param.defaultValue || "";
      if (value) {
        inputParts.push(value);
      }
    });

    return inputParts.join(" ");
  };

  const executeCommand = async () => {
    if (!selectedCommand) return;

    try {
      setIsExecuting(true);
      setError("");
      setExecutionResult("");

      const input = buildCommandInput();
      const result = await commandsService.executeCommand(
        selectedCommand.name,
        input,
      );

      setExecutionResult(result);
    } catch (err) {
      setError("Ошибка при выполнении команды: " + (err as Error).message);
    } finally {
      setIsExecuting(false);
    }
  };

  const renderParameterInput = (parameter: CommandParameterInfo) => {
    const value =
      parameterValues[parameter.name] || parameter.defaultValue || "";

    switch (parameter.type.toLowerCase()) {
      case "bool":
        return (
          <Form.Check
            type="checkbox"
            id={`param-${parameter.name}`}
            label={parameter.description}
            checked={value === "true"}
            onChange={(e) =>
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
            onChange={(e) =>
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
            onChange={(e) =>
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
            onChange={(e) =>
              handleParameterChange(parameter.name, e.target.value)
            }
            required={parameter.required}
          />
        );
    }
  };

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

  if (isLoading) {
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

          {error && (
            <Alert variant="danger" className="mb-4">
              {error}
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
                      disabled={isLoading}
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
                        checked={activeTab === "user"}
                        onChange={() => setActiveTab("user")}
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor="userCommands"
                      >
                        Пользовательские ({userCommands.length})
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name="commandType"
                        id="adminCommands"
                        checked={activeTab === "admin"}
                        onChange={() => setActiveTab("admin")}
                      />
                      <label
                        className="btn btn-outline-danger"
                        htmlFor="adminCommands"
                      >
                        Админские ({adminCommands.length})
                      </label>
                    </div>
                  </div>

                  <div
                    className="px-3 pb-3"
                    style={{ maxHeight: "600px", overflowY: "auto" }}
                  >
                    {activeTab === "user" ? (
                      userCommands.length > 0 ? (
                        userCommands.map(renderCommandCard)
                      ) : (
                        <p className="text-muted text-center">
                          Нет пользовательских команд
                        </p>
                      )
                    ) : adminCommands.length > 0 ? (
                      adminCommands.map(renderCommandCard)
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
              {selectedCommand ? (
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
                      /{selectedCommand.name}
                    </h5>
                    <small style={colors.utils.getTextStyle("secondary")}>
                      {selectedCommand.description}
                    </small>
                  </Card.Header>
                  <Card.Body>
                    {commandParameters.length > 0 ? (
                      <Form>
                        <h6
                          className="mb-3"
                          style={colors.utils.getTextStyle("primary")}
                        >
                          Параметры команды:
                        </h6>

                        {commandParameters.map((parameter) => (
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
                            disabled={isExecuting}
                          >
                            {isExecuting ? (
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
                            onClick={() => {
                              setSelectedCommand(null);
                              setParameterValues({});
                              setExecutionResult("");
                            }}
                          >
                            Отменить
                          </Button>
                        </div>

                        {executionResult && (
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
                              {executionResult}
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
                          disabled={isExecuting}
                        >
                          {isExecuting ? (
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
