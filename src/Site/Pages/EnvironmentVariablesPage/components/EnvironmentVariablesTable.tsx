import { FileText, KeyRound } from "lucide-react";
import { Badge, Card, Spinner, Table as BootstrapTable } from "react-bootstrap";

import { useSiteColors } from "@/shared/Utils/useSiteColors";

import styles from "../EnvironmentVariablesPage.module.scss";
import {
  selectFilteredVariables,
  useEnvironmentVariablesStore,
} from "../store/useEnvironmentVariablesStore";
import { formatDateTime } from "../utils/formatDateTime";

const EnvironmentVariablesTable: React.FC = () => {
  const colors = useSiteColors();
  const filteredVariables = useEnvironmentVariablesStore(
    selectFilteredVariables
  );
  const isLoading = useEnvironmentVariablesStore(state => state.isLoading);
  const searchQuery = useEnvironmentVariablesStore(state => state.searchQuery);
  const selectedKey = useEnvironmentVariablesStore(state => state.selectedKey);
  const selectVariable = useEnvironmentVariablesStore(
    state => state.selectVariable
  );

  return (
    <Card
      className={styles.tableCard}
      style={{
        backgroundColor: colors.background.card,
        borderColor: colors.border.primary,
      }}
    >
      <div
        className={styles.tableHeader}
        style={{
          backgroundColor: colors.background.secondary,
          borderColor: colors.border.primary,
        }}
      >
        <h2>Список переменных</h2>
        <Badge bg="primary">{filteredVariables.length}</Badge>
      </div>
      <div className={styles.tableWrapper}>
        {isLoading ? (
          <div className="d-flex justify-content-center py-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Загрузка переменных...</span>
            </Spinner>
          </div>
        ) : filteredVariables.length === 0 ? (
          <div className={styles.emptyState}>
            <FileText size={48} />
            <h4>Переменные не найдены</h4>
            <p>
              {searchQuery
                ? `По запросу "${searchQuery}" ничего не найдено. Попробуйте изменить критерии поиска.`
                : "Создайте первую переменную окружения, чтобы она появилась в списке."}
            </p>
          </div>
        ) : (
          <BootstrapTable hover responsive className={styles.table}>
            <thead>
              <tr>
                <th>Ключ</th>
                <th>Описание</th>
                <th>Значение</th>
                <th>Обновлено</th>
                <th>Создано</th>
              </tr>
            </thead>
            <tbody>
              {filteredVariables.map(variable => (
                <tr
                  key={variable.key}
                  className={
                    selectedKey === variable.key
                      ? styles.selectedRow
                      : undefined
                  }
                  onClick={() => selectVariable(variable.key)}
                >
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <KeyRound size={16} />
                      <span>{variable.key}</span>
                    </div>
                  </td>
                  <td>{variable.description || "—"}</td>
                  <td>
                    <span className={styles.valuePreview}>
                      {variable.value || "—"}
                    </span>
                  </td>
                  <td>
                    <span className={styles.timestamp}>
                      {formatDateTime(variable.updatedAt)}
                    </span>
                  </td>
                  <td>
                    <span className={styles.timestamp}>
                      {formatDateTime(variable.createdAt)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </BootstrapTable>
        )}
      </div>
    </Card>
  );
};

export default EnvironmentVariablesTable;
