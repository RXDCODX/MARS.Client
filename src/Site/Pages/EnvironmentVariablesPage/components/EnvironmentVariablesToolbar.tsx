import { Plus, RefreshCcw, Search } from "lucide-react";
import { useCallback } from "react";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";

import { useToastModal } from "@/shared/Utils/ToastModal";

import styles from "../EnvironmentVariablesPage.module.scss";
import { useEnvironmentVariablesStore } from "../store/useEnvironmentVariablesStore";

const EnvironmentVariablesToolbar: React.FC = () => {
  const { showToast } = useToastModal();
  const searchQuery = useEnvironmentVariablesStore(state => state.searchQuery);
  const sortDirection = useEnvironmentVariablesStore(
    state => state.sortDirection
  );
  const isLoading = useEnvironmentVariablesStore(state => state.isLoading);
  const isReloading = useEnvironmentVariablesStore(state => state.isReloading);
  const selectedKey = useEnvironmentVariablesStore(state => state.selectedKey);

  const setSearchQuery = useEnvironmentVariablesStore(
    state => state.setSearchQuery
  );
  const clearSearch = useEnvironmentVariablesStore(state => state.clearSearch);
  const toggleSortDirection = useEnvironmentVariablesStore(
    state => state.toggleSortDirection
  );
  const loadVariables = useEnvironmentVariablesStore(
    state => state.loadVariables
  );
  const reloadVariables = useEnvironmentVariablesStore(
    state => state.reloadVariables
  );
  const startCreate = useEnvironmentVariablesStore(state => state.startCreate);

  const handleRefresh = useCallback(async () => {
    const result = await loadVariables({
      showToast: true,
      focusKey: selectedKey,
    });
    if (result) {
      showToast(result);
    }
  }, [loadVariables, selectedKey, showToast]);

  const handleReload = useCallback(async () => {
    const result = await reloadVariables();
    if (result) {
      showToast(result);
    }
  }, [reloadVariables, showToast]);

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarLeft}>
        <InputGroup className={styles.searchControl}>
          <InputGroup.Text>
            <Search size={16} />
          </InputGroup.Text>
          <Form.Control
            placeholder="Поиск по ключу, описанию или значению..."
            value={searchQuery}
            onChange={event => setSearchQuery(event.target.value)}
          />
        </InputGroup>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={clearSearch}
          disabled={!searchQuery.trim()}
        >
          Очистить
        </Button>
      </div>
      <div className={styles.toolbarRight}>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={toggleSortDirection}
        >
          Сортировка: {sortDirection === "asc" ? "A → Я" : "Я → A"}
        </Button>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={handleRefresh}
          disabled={isLoading}
        >
          <RefreshCcw size={16} className="me-2" />
          Обновить список
        </Button>
        <Button
          variant="outline-warning"
          size="sm"
          onClick={handleReload}
          disabled={isReloading}
        >
          {isReloading ? (
            <Spinner animation="border" size="sm" className="me-2" />
          ) : (
            <RefreshCcw size={16} className="me-2" />
          )}
          Перезагрузить с сервера
        </Button>
        <Button variant="primary" size="sm" onClick={startCreate}>
          <Plus size={16} className="me-2" />
          Новая переменная
        </Button>
      </div>
    </div>
  );
};

export default EnvironmentVariablesToolbar;
