import {
  ArrowLeft,
  CheckCircle,
  Grid3x3,
  Info,
  List,
  Play,
  Search,
  Settings,
  Shield,
  Terminal,
  User,
  XCircle,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Spinner,
  Tab,
  Tabs,
} from "react-bootstrap";

import { Commands } from "@/shared/api";
import {
  CommandInfo,
  CommandParameterInfo,
  CommandsAdminPlatformInfoListParamsEnum,
  CommandsUserPlatformInfoListParamsEnum,
} from "@/shared/api";
import { useToastModal } from "@/shared/Utils/ToastModal";
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
  searchQuery: string;
  showParameters: boolean;
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
      className={`mb-3 ${styles.commandCard} ${selectedCommand?.name === command.name ? styles.selectedCommand : ""}`}
      style={{
        backgroundColor:
          selectedCommand?.name === command.name
            ? colors.background.accent
            : colors.background.card,
        borderColor: colors.border.primary,
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
      }}
      onClick={() => onCommandSelect(command)}
    >
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-start">
          <div className="flex-grow-1">
            <div className="d-flex align-items-center mb-2">
              <Terminal
                size={20}
                className="me-2"
                style={{ color: colors.text.primary }}
              />
              <h6
                className="mb-0 fw-bold"
                style={colors.utils.getTextStyle("primary")}
              >
                /{command.name}
              </h6>
            </div>
            <p
              className="mb-2 text-muted"
              style={colors.utils.getTextStyle("secondary")}
            >
              {command.description}
            </p>
            <div className="d-flex align-items-center gap-2">
              <Badge
                bg={command.isAdminCommand ? "danger" : "primary"}
                className="d-flex align-items-center gap-1"
              >
                {command.isAdminCommand ? (
                  <Shield size={14} />
                ) : (
                  <User size={14} />
                )}
                {command.isAdminCommand ? "Админ" : "Пользователь"}
              </Badge>
              <Badge bg="secondary" className="d-flex align-items-center gap-1">
                <Grid3x3 size={14} />
                {command.availablePlatforms.length} платформ
              </Badge>
            </div>
          </div>
          <div className="ms-3">
            <Button
              variant="outline-primary"
              size="sm"
              className="d-flex align-items-center gap-1"
            >
              <Play size={16} />
              Выполнить
            </Button>
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
        transition: "all 0.2s ease-in-out",
      }}
      onClick={() => onCommandSelect(command)}
    >
      <Card.Body className="p-4 d-flex flex-column text-center">
        <div className="mb-3">
          <div className="d-flex justify-content-center mb-2">
            <Terminal size={32} style={{ color: colors.text.primary }} />
          </div>
          <h6
            className="mb-2 fw-bold"
            style={colors.utils.getTextStyle("primary")}
          >
            /{command.name}
          </h6>
          {command.isAdminCommand && (
            <Badge
              bg="danger"
              className="mb-2 d-flex align-items-center justify-content-center gap-1 mx-auto"
            >
              <Shield size={14} />
              Админ
            </Badge>
          )}
        </div>
        <p
          className="small text-muted flex-grow-1 mb-3"
          style={colors.utils.getTextStyle("secondary")}
        >
          {command.description}
        </p>
        <div className="mt-auto">
          <Badge
            bg="secondary"
            className="d-flex align-items-center justify-content-center gap-1 mx-auto"
          >
            <Grid3x3 size={14} />
            {command.availablePlatforms.length} платформ
          </Badge>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <Row xs={1} sm={2} lg={3} className="g-3">
      {commands.map(command => (
        <Col key={command.name}>{renderCommandGridCard(command)}</Col>
      ))}
    </Row>
  );
};

// Компонент для отображения параметров команды
const CommandParameters: React.FC<{
  command: CommandInfo;
  parameters: CommandParameterInfo[];
  parameterValues: Record<string, string>;
  onParameterChange: (name: string, value: string) => void;
  onExecute: () => void;
  onCancel: () => void;
  isExecuting: boolean;
  colors: ReturnType<typeof useSiteColors>;
}> = ({
  command,
  parameters,
  parameterValues,
  onParameterChange,
  onExecute,
  onCancel,
  isExecuting,
  colors,
}) => {
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
            onChange={e =>
              onParameterChange(parameter.name, e.target.checked.toString())
            }
            className="mt-2"
          />
        );
      case "int":
      case "long":
        return (
          <Form.Control
            type="number"
            placeholder={parameter.description}
            value={value}
            onChange={e => onParameterChange(parameter.name, e.target.value)}
            required={parameter.required}
            className={styles.parameterInput}
          />
        );
      case "double":
        return (
          <Form.Control
            type="number"
            step="0.1"
            placeholder={parameter.description}
            value={value}
            onChange={e => onParameterChange(parameter.name, e.target.value)}
            required={parameter.required}
            className={styles.parameterInput}
          />
        );
      default:
        return (
          <Form.Control
            type="text"
            placeholder={parameter.description}
            value={value}
            onChange={e => onParameterChange(parameter.name, e.target.value)}
            required={parameter.required}
            className={styles.parameterInput}
          />
        );
    }
  };

  return (
    <Card
      style={{
        backgroundColor: colors.background.card,
        borderColor: colors.border.primary,
      }}
      className="h-100"
    >
      <Card.Header
        style={{
          backgroundColor: colors.background.secondary,
          borderColor: colors.border.primary,
        }}
        className="d-flex justify-content-between align-items-center"
      >
        <div>
          <h5
            className="mb-0 d-flex align-items-center gap-2"
            style={colors.utils.getTextStyle("primary")}
          >
            <Terminal size={20} />/{command.name}
          </h5>
          <small style={colors.utils.getTextStyle("secondary")}>
            {command.description}
          </small>
        </div>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={onCancel}
          className="d-flex align-items-center gap-1"
        >
          <ArrowLeft size={16} />
          Назад
        </Button>
      </Card.Header>
      <Card.Body className="p-4">
        {parameters.length > 0 ? (
          <Form>
            <div className="d-flex align-items-center gap-2 mb-4">
              <Settings size={20} style={{ color: colors.text.primary }} />
              <h6 className="mb-0" style={colors.utils.getTextStyle("primary")}>
                Параметры команды
              </h6>
            </div>

            {parameters.map(parameter => (
              <Form.Group key={parameter.name} className="mb-4">
                <Form.Label
                  className="fw-semibold d-flex align-items-center gap-2"
                  style={colors.utils.getTextStyle("primary")}
                >
                  {parameter.name}
                  {parameter.required && (
                    <Badge bg="danger" className="fs-6">
                      *
                    </Badge>
                  )}
                  {parameter.defaultValue && (
                    <small className="text-muted ms-2">
                      (по умолчанию: {parameter.defaultValue})
                    </small>
                  )}
                </Form.Label>
                {renderParameterInput(parameter)}
                <Form.Text className="text-muted d-flex align-items-center gap-1 mt-1">
                  <Info size={14} />
                  {parameter.description} (тип: {parameter.type})
                </Form.Text>
              </Form.Group>
            ))}

            <div className="d-flex gap-3 mt-4">
              <Button
                variant="primary"
                size="sm"
                onClick={onExecute}
                disabled={isExecuting}
                className={`${styles.executeButton} d-flex align-items-center gap-2`}
              >
                {isExecuting ? (
                  <>
                    <Spinner animation="border" size="sm" />
                    Выполняется...
                  </>
                ) : (
                  <>
                    <Play size={18} />
                    Выполнить команду
                  </>
                )}
              </Button>

              <Button
                variant="outline-secondary"
                size="lg"
                onClick={onCancel}
                className={styles.cancelButton}
              >
                Отменить
              </Button>
            </div>
          </Form>
        ) : (
          <div className="text-center py-5">
            <Settings size={48} className="text-muted mb-3" />
            <h6 style={colors.utils.getTextStyle("primary")}>
              У этой команды нет параметров
            </h6>
            <p className="text-muted mb-4">
              Команда готова к выполнению без дополнительных настроек
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={onExecute}
              disabled={isExecuting}
              className="d-flex align-items-center gap-2 mx-auto"
            >
              {isExecuting ? (
                <>
                  <Spinner animation="border" size="sm" />
                  Выполняется...
                </>
              ) : (
                <>
                  <Play size={18} />
                  Выполнить команду
                </>
              )}
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

// Компонент для поиска команд
const CommandSearch: React.FC<{
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClear: () => void;
  resultCount: number;
  colors: ReturnType<typeof useSiteColors>;
}> = ({ searchQuery, onSearchChange, onClear, resultCount, colors }) => (
  <Card
    className="mb-4"
    style={{
      backgroundColor: colors.background.card,
      borderColor: colors.border.primary,
    }}
  >
    <Card.Body className="p-4">
      <div className="d-flex align-items-center gap-3">
        <div className="flex-grow-1">
          <InputGroup>
            <InputGroup.Text
              style={{
                backgroundColor: colors.background.secondary,
                borderColor: colors.border.primary,
              }}
            >
              <Search size={20} style={{ color: colors.text.secondary }} />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="🔍 Поиск команд по названию или описанию..."
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              style={{
                backgroundColor: colors.background.card,
                borderColor: colors.border.primary,
                color: colors.text.primary,
              }}
              className={styles.parameterInput}
            />
          </InputGroup>
        </div>
        {searchQuery && (
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={onClear}
            title="Очистить поиск"
            className="d-flex align-items-center gap-1"
          >
            <XCircle size={16} />
            Очистить
          </Button>
        )}
      </div>
      {searchQuery && (
        <div className="mt-3">
          <small
            style={colors.utils.getTextStyle("secondary")}
            className="d-flex align-items-center gap-1"
          >
            <CheckCircle size={14} />
            Найдено: {resultCount} команд
          </small>
        </div>
      )}
    </Card.Body>
  </Card>
);

// Компонент для переключения режимов отображения
const DisplayModeToggle: React.FC<{
  displayMode: "list" | "grid";
  onModeChange: (mode: "list" | "grid") => void;
}> = ({ displayMode, onModeChange }) => (
  <ButtonGroup size="sm" className={styles.displayModeToggle}>
    <Button
      variant={displayMode === "list" ? "primary" : "outline-primary"}
      onClick={() => onModeChange("list")}
      className="d-flex align-items-center gap-2"
    >
      <List size={16} />
      Список
    </Button>
    <Button
      variant={displayMode === "grid" ? "primary" : "outline-primary"}
      onClick={() => onModeChange("grid")}
      className="d-flex align-items-center gap-2"
    >
      <Grid3x3 size={16} />
      Сетка
    </Button>
  </ButtonGroup>
);

const CommandsPage: React.FC = () => {
  const colors = useSiteColors();
  const { showToast } = useToastModal();
  const [commandsService] = useState(() => new Commands());
  const parametersPanelRef = useRef<HTMLDivElement>(null);

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
    activeTab: "admin",
    displayMode: "grid",
    searchQuery: "",
    showParameters: false,
  });

  // Обновление состояния
  const updateState = useCallback((updates: Partial<CommandsPageState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  // Загрузка команд
  const loadCommands = useCallback(async () => {
    try {
      updateState({ isLoading: true, error: "" });

      const resultUser = await commandsService.commandsUserPlatformInfoList(
        CommandsUserPlatformInfoListParamsEnum.Api
      );
      const adminResult = await commandsService.commandsAdminPlatformInfoList(
        CommandsAdminPlatformInfoListParamsEnum.Api
      );

      const userCommandsData = resultUser.data.data;
      const adminCommandsData = adminResult.data.data;

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

  // Фильтрация команд по поисковому запросу
  const filteredCommands = useMemo(() => {
    const allCommands =
      state.activeTab === "user" ? state.userCommands : state.adminCommands;

    if (!state.searchQuery) return allCommands;

    const query = state.searchQuery.toLowerCase();
    return allCommands.filter(
      command =>
        command.name.toLowerCase().includes(query) ||
        command.description.toLowerCase().includes(query)
    );
  }, [
    state.activeTab,
    state.userCommands,
    state.adminCommands,
    state.searchQuery,
  ]);

  // Выбор команды
  const handleCommandSelect = async (command: CommandInfo) => {
    try {
      updateState({
        selectedCommand: command,
        parameterValues: {},
        error: "",
        showParameters: true,
      });

      // Загружаем параметры команды
      const result = await commandsService.commandsParametersList(command.name);
      const parameters = result.data.data;
      updateState({ commandParameters: parameters });

      // Автоматическая прокрутка к панели параметров после загрузки
      setTimeout(() => {
        if (parametersPanelRef.current) {
          const panelElement = parametersPanelRef.current;
          const panelRect = panelElement.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          // Проверяем, помещается ли панель на экране
          if (panelRect.height > viewportHeight) {
            // Если панель не помещается, прокручиваем к началу панели
            panelElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest",
            });
          } else {
            // Если панель помещается, центрируем её на экране
            panelElement.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "nearest",
            });
          }
        }
      }, 100); // Небольшая задержка для завершения рендеринга
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

      // Показываем результат через toast
      showToast(result.data);

      updateState({ isExecuting: false });
    } catch (err) {
      const errorMessage =
        "Ошибка при выполнении команды: " + (err as Error).message;

      // Показываем ошибку через toast
      showToast({ success: false, message: errorMessage });

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
      showParameters: false,
    });
  };

  // Отображение загрузки
  if (state.isLoading) {
    return (
      <Container className="text-center py-5">
        <div className="d-flex flex-column align-items-center">
          <Spinner animation="border" role="status" className="mb-4">
            <span className="visually-hidden">Загрузка...</span>
          </Spinner>
          <h4 style={colors.utils.getTextStyle("primary")}>Загрузка команд</h4>
          <p style={colors.utils.getTextStyle("secondary")}>
            Получаем список доступных команд...
          </p>
        </div>
      </Container>
    );
  }

  // Получаем отфильтрованные команды
  const currentCommands = filteredCommands;

  return (
    <Container fluid className="py-4">
      <Row>
        <Col>
          {/* Заголовок страницы */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1
                className="d-flex align-items-center gap-3 mb-2"
                style={colors.utils.getTextStyle("primary")}
              >
                <Terminal size={32} />
                Выполнение команд
              </h1>
              <p className="text-muted mb-0">
                Управляйте системой MARS через командный интерфейс
              </p>
            </div>

            <DisplayModeToggle
              displayMode={state.displayMode}
              onModeChange={mode => updateState({ displayMode: mode })}
            />
          </div>

          {/* Ошибки */}
          {state.error && (
            <Alert
              variant="danger"
              className="mb-4 d-flex align-items-center gap-2"
            >
              <XCircle size={20} />
              {state.error}
            </Alert>
          )}

          <Row>
            {/* Основная область с командами */}
            <Col lg={state.showParameters ? 8 : 12}>
              {/* Поиск команд */}
              <CommandSearch
                searchQuery={state.searchQuery}
                onSearchChange={query => updateState({ searchQuery: query })}
                onClear={() => updateState({ searchQuery: "" })}
                resultCount={currentCommands.length}
                colors={colors}
              />

              {/* Список команд */}
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
                  className="d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center gap-2">
                    <span
                      style={colors.utils.getTextStyle("primary")}
                      className="fw-semibold"
                    >
                      Доступные команды
                    </span>
                    <Badge bg="secondary" className="fs-6">
                      {currentCommands.length}
                    </Badge>
                  </div>
                </Card.Header>
                <Card.Body className="p-4">
                  {/* Переключатель типов команд */}
                  <div className="mb-4">
                    <Tabs
                      activeKey={state.activeTab}
                      onSelect={k =>
                        updateState({ activeTab: k as "user" | "admin" })
                      }
                      className={styles.tabGroup}
                    >
                      <Tab
                        eventKey="user"
                        title={
                          <div className="d-flex align-items-center gap-2">
                            <User size={16} />
                            Пользовательские ({state.userCommands.length})
                          </div>
                        }
                      />
                      <Tab
                        eventKey="admin"
                        title={
                          <div className="d-flex align-items-center gap-2">
                            <Shield size={16} />
                            Админские ({state.adminCommands.length})
                          </div>
                        }
                      />
                    </Tabs>
                  </div>

                  {/* Отображение команд */}
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
                    <div className="text-center py-5">
                      <div className={styles.emptyState}>
                        <Terminal size={64} className="icon text-muted" />
                        <h5 style={colors.utils.getTextStyle("primary")}>
                          {state.searchQuery
                            ? "Команды не найдены"
                            : "Нет доступных команд"}
                        </h5>
                        <p style={colors.utils.getTextStyle("secondary")}>
                          {state.searchQuery ? (
                            <>
                              По запросу <strong>"{state.searchQuery}"</strong>{" "}
                              ничего не найдено.
                              <br />
                              Попробуйте изменить поисковый запрос.
                            </>
                          ) : (
                            `В данный момент нет ${state.activeTab === "user" ? "пользовательских" : "админских"} команд для выполнения.`
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>

            {/* Панель параметров */}
            {state.showParameters && state.selectedCommand && (
              <Col lg={4}>
                <div
                  ref={parametersPanelRef}
                  style={{
                    position: "sticky",
                    top: "87px",
                  }}
                >
                  <CommandParameters
                    command={state.selectedCommand}
                    parameters={state.commandParameters}
                    parameterValues={state.parameterValues}
                    onParameterChange={handleParameterChange}
                    onExecute={executeCommand}
                    onCancel={handleCancelCommand}
                    isExecuting={state.isExecuting}
                    colors={colors}
                  />
                </div>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CommandsPage;
