import { ArrowLeft } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Button, Container, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import { RandomMeme } from "@/shared/api";
import { MemeOrderDto } from "@/shared/api";
import { useToastModal } from "@/shared/Utils/ToastModal";

import { RandomMemeDetails } from "./components";
import styles from "./RandomMemePage.module.scss";

const RandomMemeDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const api = useMemo(() => new RandomMeme(), []);
  const { showToast } = useToastModal();

  const [memeOrder, setMemeOrder] = useState<MemeOrderDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Загрузка деталей мема по ID
  const loadMemeDetails = useCallback(async () => {
    if (!id) {
      setError("ID мема не указан");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const response = await api.randomMemeOrdersDetail(id);
      setMemeOrder(response.data.data ?? null);

      if (!response.data.data) {
        setError("Мем с указанным ID не найден");
      }
    } catch (e) {
      console.error("Ошибка загрузки деталей мема:", e);
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
    loadMemeDetails();
  }, [loadMemeDetails]);

  // Обработчики
  const handleBack = useCallback(() => {
    navigate("/random-meme");
  }, [navigate]);

  const handleEdit = useCallback(() => {
    if (memeOrder) {
      navigate(`/random-meme/edit/${memeOrder.id}`);
    }
  }, [navigate, memeOrder]);

  const handleDelete = useCallback(async () => {
    if (!memeOrder) return;

    try {
      const result = await api.randomMemeOrdersDelete(memeOrder.id);
      showToast(result.data);
      navigate("/random-meme");
    } catch (e) {
      console.error("Ошибка удаления заказа:", e);
      showToast({
        success: false,
        message: "Ошибка удаления заказа мема",
      });
    }
  }, [memeOrder, api, showToast, navigate]);

  const handleRefresh = useCallback(() => {
    loadMemeDetails();
  }, [loadMemeDetails]);

  // Отображение загрузки
  if (isLoading) {
    return (
      <Container className={styles.randomMemePage}>
        <div className="text-center py-5">
          <Spinner animation="border" role="status" className="mb-3">
            <span className="visually-hidden">Загрузка...</span>
          </Spinner>
          <h4>Загрузка деталей мема...</h4>
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
              Вернуться к списку
            </Button>
            <Button variant="outline-secondary" onClick={handleRefresh}>
              Попробовать снова
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  // Отображение деталей мема
  return (
    <Container className={styles.randomMemePage}>
      <RandomMemeDetails
        memeOrder={memeOrder}
        isLoading={isLoading}
        onBack={handleBack}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRefresh={handleRefresh}
      />
    </Container>
  );
};

export default RandomMemeDetailsPage;
