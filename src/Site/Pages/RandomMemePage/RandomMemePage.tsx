import { useCallback, useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";

import { RandomMeme } from "@/shared/api";
import { MemeOrderDto } from "@/shared/api/http-clients/data-contracts";

import RandomMemeList from "./components/RandomMemeList";
import styles from "./RandomMemePage.module.scss";

const RandomMemePage: React.FC = () => {
  const api = useMemo(() => new RandomMeme(), []);
  const [memeOrders, setMemeOrders] = useState<MemeOrderDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const loadOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await api.randomMemeOrdersList();
      setMemeOrders(response.data ?? []);
    } catch (e) {
      console.error("Ошибка загрузки очереди:", e);
      setError(e instanceof Error ? e.message : "Неизвестная ошибка");
    } finally {
      setIsLoading(false);
    }
  }, [api]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return (
    <Container className={styles.randomMemePage}>
      <RandomMemeList
        memeOrders={memeOrders}
        isLoading={isLoading}
        error={error}
        onRefresh={loadOrders}
      />
    </Container>
  );
};

export default RandomMemePage;
