import { useEffect, useMemo, useState } from "react";
import { Alert, Badge, Card, Col, Container, Row, Spinner } from "react-bootstrap";

import { defaultApiConfig, FramedataChange, FramedataChanges } from "@/shared/api";

import styles from "./FramedataPage.module.scss";

const api = new FramedataChanges({ baseURL: defaultApiConfig.baseURL });

const statusVariantMap: Record<string, string> = {
  Pending: "warning",
  Applied: "success",
  Rejected: "danger",
  Obsolete: "secondary",
};

const changeTypeVariantMap: Record<string, string> = {
  NewCharacter: "primary",
  NewMove: "info",
  MoveUpdate: "secondary",
  MoveRemoval: "dark",
  CharacterUpdate: "secondary",
};

const PendingChangesPage: React.FC = () => {
  const [changes, setChanges] = useState<FramedataChange[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError("");
    api
      .framedataChangesPendingList()
      .then(res => {
        if (!isMounted) return;
        setChanges(res.data ?? []);
        setIsLoading(false);
      })
      .catch(err => {
        if (!isMounted) return;
        setError(err?.message || "Ошибка загрузки ожидающих изменений");
        setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const sortedChanges = useMemo(() => {
    return [...changes].sort((a, b) => {
      const ad = new Date(a.detectedAt).getTime();
      const bd = new Date(b.detectedAt).getTime();
      return bd - ad;
    });
  }, [changes]);

  return (
    <Container className={styles.framedataPage}>
      <h2 className="mb-4">Ожидающие изменения</h2>

      {isLoading && (
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </Spinner>
        </div>
      )}

      {!!error && !isLoading && (
        <Alert variant="danger">
          <Alert.Heading>Не удалось загрузить список</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}

      {!isLoading && !error && sortedChanges.length === 0 && (
        <Alert variant="info">
          <Alert.Heading>Нет ожидающих изменений</Alert.Heading>
          <p>Все изменения уже обработаны.</p>
        </Alert>
      )}

      {!isLoading && !error && sortedChanges.length > 0 && (
        <Row xs={1} md={2} lg={3} className="g-4">
          {sortedChanges.map(change => (
            <Col key={change.id}>
              <Card className="h-100">
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title className="mb-0">{change.characterName}</Card.Title>
                    <Badge bg={statusVariantMap[change.status] || "secondary"}>
                      {change.status}
                    </Badge>
                  </div>
                  <div className="mb-2">
                    <Badge bg={changeTypeVariantMap[change.changeType] || "secondary"}>
                      {change.changeType}
                    </Badge>
                  </div>
                  {change.description && (
                    <Card.Text className="text-muted small">{change.description}</Card.Text>
                  )}
                  <div className="mt-auto text-muted small">
                    Обнаружено: {new Date(change.detectedAt).toLocaleString("ru-RU")}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default PendingChangesPage;


