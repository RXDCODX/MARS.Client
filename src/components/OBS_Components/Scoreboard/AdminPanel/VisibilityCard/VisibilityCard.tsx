import { Clock, Eye, EyeOff as EyeSlash } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

import { useSiteColors } from "../../../../../shared/Utils/useSiteColors";
import {
  useAnimationDuration,
  useVisibility,
  useVisibilityActions,
} from "../store/scoreboardStore";

const VisibilityCard: React.FC = () => {
  const colors = useSiteColors();
  const isVisible = useVisibility();
  const animationDuration = useAnimationDuration();
  const { setVisibility, setAnimationDuration } = useVisibilityActions();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isShowing, setIsShowing] = useState(false); // Новое состояние для отслеживания действия показа
  const [pageOpenTime] = useState<number>(Date.now());
  const [lastUpdateTime, setLastUpdateTime] = useState<number>(Date.now());
  const [currentTime, setCurrentTime] = useState<number>(Date.now()); // New state for current time

  // Обновляем текущее время каждую секунду для корректного расчета времени открытия страницы
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Обновляем время последнего обновления при изменении видимости
  useEffect(() => {
    setLastUpdateTime(Date.now());
  }, [isVisible]);

  const handleVisibilityToggle = () => {
    const newVisibility = !isVisible;

    // Блокируем кнопку на время любой анимации
    if (isTransitioning) return;

    if (newVisibility) {
      // Показываем панель - блокируем кнопку на время анимации
      setIsTransitioning(true);
      setIsShowing(true); // Устанавливаем флаг показа
      setVisibility(newVisibility);
      setTimeout(() => {
        setIsTransitioning(false);
        setIsShowing(false); // Сбрасываем флаг показа
      }, animationDuration);
    } else {
      // Скрываем панель - также блокируем кнопку на короткое время для предотвращения множественных кликов
      setIsTransitioning(true);
      setIsShowing(false); // Устанавливаем флаг скрытия
      setVisibility(newVisibility);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100); // Короткая блокировка для скрытия
    }
  };

  const handleAnimationDurationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 100 && value <= 99999) {
      setAnimationDuration(value);
    }
  };

  const handleDurationIncrease = () => {
    const newValue = Math.min(animationDuration + 500, 10000);
    setAnimationDuration(newValue);
  };

  const handleDurationDecrease = () => {
    const newValue = Math.max(animationDuration - 500, 100);
    setAnimationDuration(newValue);
  };

  const formatPageOpenTime = () => {
    const elapsed = Math.floor((currentTime - pageOpenTime) / 1000);
    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    const seconds = elapsed % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatLastUpdateTime = () => {
    const elapsed = Math.floor((currentTime - lastUpdateTime) / 1000);
    if (elapsed < 60) {
      return `${elapsed}с назад`;
    } else if (elapsed < 3600) {
      const minutes = Math.floor(elapsed / 60);
      return `${minutes}м ${elapsed % 60}с назад`;
    } else {
      const hours = Math.floor(elapsed / 3600);
      const minutes = Math.floor((elapsed % 3600) / 60);
      return `${hours}ч ${minutes}м назад`;
    }
  };

  return (
    <Card
      className="shadow-lg p-3 mb-4"
      style={{
        backgroundColor: colors.background.card,
        borderRadius: 18,
        border: `2px solid ${colors.border.accent}`,
        height: "100%", // Для выравнивания с MetaPanel
      }}
    >
      <Card.Body className="d-flex flex-column h-100">
        <div className="d-flex flex-column align-items-center mb-3 gap-2 text-center">
          {isVisible ? (
            <Eye color={colors.text.accent} size={20} />
          ) : (
            <EyeSlash color={colors.text.accent} size={20} />
          )}
          <span
            className="fw-bold text-uppercase"
            style={{
              color: colors.text.accent,
              letterSpacing: 1,
              fontSize: 14,
            }}
          >
            Visibility Panel
          </span>
        </div>

        <div className="d-flex flex-column gap-3 flex-grow-1">
          {/* Кнопка переключения видимости */}
          <Button
            variant={isVisible ? "success" : "danger"}
            size="lg"
            className="fw-bold py-3"
            onClick={handleVisibilityToggle}
            disabled={isTransitioning}
            style={{
              backgroundColor: isVisible
                ? colors.background.success
                : colors.background.danger,
              borderColor: isVisible
                ? colors.border.success
                : colors.border.danger,
              color: colors.text.light,
              fontSize: 16,
              letterSpacing: 1,
            }}
          >
            {isTransitioning ? (
              <div className="d-flex align-items-center gap-2">
                <div
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></div>
                {isShowing ? "Показываем..." : "Скрываем..."}
              </div>
            ) : isVisible ? (
              <div className="d-flex align-items-center gap-2">
                <Eye />
                СКРЫТЬ
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <EyeSlash />
                ПОКАЗАТЬ
              </div>
            )}
          </Button>

          {/* Настройка времени анимации */}
          <div className="d-flex flex-column gap-2">
            <div className="d-flex align-items-center gap-2">
              <Clock color={colors.text.secondary} size={16} />
              <span
                className="fw-bold"
                style={{
                  fontSize: 12,
                  color: colors.text.secondary,
                }}
              >
                Время анимации: {animationDuration}мс
              </span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={handleDurationDecrease}
                style={{
                  backgroundColor: colors.background.card,
                  borderColor: colors.border.secondary,
                  color: colors.text.secondary,
                }}
              >
                -
              </Button>
              <Form.Range
                min="100"
                max="10000"
                step="100"
                value={animationDuration}
                onChange={handleAnimationDurationChange}
                className="flex-grow-1"
                style={{
                  accentColor: colors.text.accent,
                }}
              />
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={handleDurationIncrease}
                style={{
                  backgroundColor: colors.background.card,
                  borderColor: colors.border.secondary,
                  color: colors.text.secondary,
                }}
              >
                +
              </Button>
            </div>
          </div>

          {/* Информация о времени */}
          <div className="d-flex flex-column gap-1 mt-auto">
            <div className="d-flex align-items-center justify-content-between">
              <span
                className="fw-bold"
                style={{
                  fontSize: 11,
                  color: colors.text.secondary,
                }}
              >
                Страница открыта:
              </span>
              <span
                className="fw-bold"
                style={{
                  fontSize: 11,
                  color: colors.text.accent,
                }}
              >
                {formatPageOpenTime()}
              </span>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <span
                className="fw-bold"
                style={{
                  fontSize: 11,
                  color: colors.text.secondary,
                }}
              >
                Последнее обновление:
              </span>
              <span
                className="fw-bold"
                style={{
                  fontSize: 11,
                  color: colors.text.accent,
                }}
              >
                {formatLastUpdateTime()}
              </span>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default VisibilityCard;
