import { Alert } from "react-bootstrap";

import { useEnvironmentVariablesStore } from "../store/useEnvironmentVariablesStore";

const EnvironmentVariablesErrorAlert: React.FC = () => {
  const error = useEnvironmentVariablesStore(state => state.error);

  if (!error) {
    return null;
  }

  return (
    <Alert variant="danger" className="mb-3">
      {error}
    </Alert>
  );
};

export default EnvironmentVariablesErrorAlert;
