import { ArrowLeft } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Button, Container, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import { RandomMeme } from "@/shared/api";
import { MemeOrderDto, MemeTypeDto } from "@/shared/api";
import { useToastModal } from "@/shared/Utils/ToastModal";

import { RandomMemeForm } from "./components";
import styles from "./RandomMemePage.module.scss";

const RandomMemeEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const api = useMemo(() => new RandomMeme(), []);
  const { showToast } = useToastModal();

  const [memeOrder, setMemeOrder] = useState<MemeOrderDto | null>(null);
  const [memeTypes, setMemeTypes] = useState<MemeTypeDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Загрузка данных
  const loadData = useCallback(async () => {
    if (!id) {
      setError("ID мема не указан");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      // Загружаем заказ мема и типы параллельно
      const [orderResponse, typesResponse] = await Promise.all([
        api.randomMemeOrdersDetail(id),
        api.randomMemeTypesList(),
      ]);

      setMemeOrder(orderResponse.data.data ?? null);
      setMemeTypes(typesResponse.data.data ?? []);

      if (!orderResponse.data.data) {
        setError("Мем с указанным ID не найден");
      }
    } catch (e) {
      console.error("Ошибка загрузки данных:", e);
      const errorMessage =
        e instanceof Error ? e.message : "Неизвестная ошибка";
      setError(errorMessage);
      showToast({
        success: false,
        message: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }, [id, api, showToast]);

  // Загрузка при монтировании
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Обработчики
  const handleBack = useCallback(() => {
    if (memeOrder) {
      navigate(`/random-meme/${memeOrder.id}`);
    } else {
      navigate("/random-meme");
    }
  }, [navigate, memeOrder]);

  const handleSubmit = useCallback(
    async (data: Record<string, unknown>) => {
      if (!memeOrder) return;

      try {
        setIsSubmitting(true);

        const orderData = data as unknown as {
          filePath: string;
          memeTypeId: number;
          order: number;
        };

        const result = await api.randomMemeOrdersUpdate(
          memeOrder.id,
          orderData
        );

        showToast(result.data);

        navigate(`/random-meme/${memeOrder.id}`);
      } catch (e) {
        console.error("Ошибка сохранения:", e);
        showToast({
          success: false,
          message: "Ошибка сохранения данных",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [memeOrder, api, showToast, navigate]
  );

  // Отображение загрузки
  if (isLoading) {
    return (
      <Container className={styles.randomMemePage}>
        <div className="text-center py-5">
          <Spinner animation="border" role="status" className="mb-3">
            <span className="visually-hidden">Загрузка...</span>
          </Spinner>
          <h4>Загрузка данных для редактирования...</h4>
          <p className="text-muted">Получаем информацию о меме</p>
        </div>
      </Container>
    );
  }

  // Отображение ошибки
  if (error || !memeOrder) {
    return (
      <Container className={styles.randomMemePage}>
        <Alert variant="danger">
          <Alert.Heading>Ошибка загрузки</Alert.Heading>
          <p className="mb-3">{error || "Мем не найден"}</p>
          <div className="d-flex gap-2">
            <Button variant="outline-primary" onClick={handleBack}>
              <ArrowLeft size={16} className="me-2" />
              Вернуться
            </Button>
            <Button variant="outline-secondary" onClick={loadData}>
              Попробовать снова
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  // Отображение формы редактирования
  return (
    <Container className={styles.randomMemePage}>
      <RandomMemeForm
        memeOrder={memeOrder}
        memeTypes={memeTypes}
        isSubmitting={isSubmitting}
        mode="edit"
        onSubmit={handleSubmit}
        onCancel={handleBack}
      />
    </Container>
  );
};

export default RandomMemeEditPage;
