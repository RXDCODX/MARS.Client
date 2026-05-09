import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { useToastModal } from "@/shared/Utils/ToastModal";

import EnvironmentVariableDeleteModal from "./components/EnvironmentVariableDeleteModal";
import EnvironmentVariableForm from "./components/EnvironmentVariableForm";
import EnvironmentVariablesErrorAlert from "./components/EnvironmentVariablesErrorAlert";
import EnvironmentVariablesHeader from "./components/EnvironmentVariablesHeader";
import EnvironmentVariablesTable from "./components/EnvironmentVariablesTable";
import EnvironmentVariablesToolbar from "./components/EnvironmentVariablesToolbar";
import styles from "./EnvironmentVariablesPage.module.scss";
import { useEnvironmentVariablesStore } from "./store/useEnvironmentVariablesStore";

const EnvironmentVariablesPage: React.FC = () => {
  const { showToast } = useToastModal();
  const loadVariables = useEnvironmentVariablesStore(
    state => state.loadVariables
  );
  useEffect(() => {
    void loadVariables({ showToast: false }).then(result => {
      if (result && !result.success) {
        showToast(result);
      }
    });
  }, [loadVariables, showToast]);

  return (
    <Container fluid className={styles.pageWrapper}>
      <EnvironmentVariablesHeader />
      <EnvironmentVariablesToolbar />
      <EnvironmentVariablesErrorAlert />
      <Row className="g-4">
        <Col lg={12}>
          <EnvironmentVariablesTable />
        </Col>
      </Row>
      <EnvironmentVariableForm />
      <EnvironmentVariableDeleteModal />
    </Container>
  );
};

export default EnvironmentVariablesPage;
