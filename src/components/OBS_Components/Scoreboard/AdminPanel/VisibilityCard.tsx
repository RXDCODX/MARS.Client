import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Clock, Eye, EyeSlash, PlayCircle } from "react-bootstrap-icons";
import { useSiteColors } from "../../../../shared/Utils/useSiteColors";

type VisibilityCardProps = {
  isVisible: boolean;
  onVisibilityChange: (isVisible: boolean) => void;
  animationDuration?: number; // Время анимации в миллисекундах
  onAnimationDurationChange?: (duration: number) => void; // Новый callback для изменения времени анимации
};

const VisibilityCard: React.FC<VisibilityCardProps> = ({
  isVisible,
  onVisibilityChange,
  animationDuration = 500, // По умолчанию 500мс
  onAnimationDurationChange,
}) => {
  const colors = useSiteColors();
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
      onVisibilityChange(newVisibility);
      setTimeout(() => {
        setIsTransitioning(false);
        setIsShowing(false); // Сбрасываем флаг показа
      }, animationDuration);
    } else {
      // Скрываем панель - также блокируем кнопку на короткое время для предотвращения множественных кликов
      setIsTransitioning(true);
      setIsShowing(false); // Устанавливаем флаг скрытия
      onVisibilityChange(newVisibility);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100); // Короткая блокировка для скрытия
    }
  };

  const handleAnimationDurationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = parseInt(e.target.value);
    if (
      !isNaN(value) &&
      value >= 100 &&
      value <= 99999 &&
      onAnimationDurationChange
    ) {
      onAnimationDurationChange(value);
    }
  };

  const handleDurationIncrease = () => {
    if (onAnimationDurationChange) {
      const newValue = Math.min(animationDuration + 500, 10000);
      onAnimationDurationChange(newValue);
    }
  };

  const handleDurationDecrease = () => {
    if (onAnimationDurationChange) {
      const newValue = Math.max(animationDuration - 500, 100);
      onAnimationDurationChange(newValue);
    }
  };

  // Функция для форматирования времени
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  // Функция для форматирования времени открытия страницы
  const formatPageOpenTime = () => {
    const diff = currentTime - pageOpenTime; // Use currentTime
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}ч ${minutes % 60}м ${seconds % 60}с`;
    } else if (minutes > 0) {
      return `${minutes}м ${seconds % 60}с`;
    } else {
      return `${seconds}с`;
    }
  };

  // Определяем, должна ли кнопка быть заблокирована
  const shouldDisableButton = isTransitioning; // Блокируем кнопку на время любой анимации

  return (
    <Card
      className="shadow-lg p-3 mb-4"
      style={{
        backgroundColor: colors.background.card,
        borderRadius: 18,
        border: `2px solid ${colors.border.danger}`,
        height: "100%",
      }}
    >
      <Card.Body className="d-flex flex-column justify-content-center h-100">
        <div>
          <div className="d-flex flex-column align-items-center mb-3 gap-2 text-center">
            {isVisible ? (
              <Eye color={colors.text.danger} size={20} />
            ) : (
              <EyeSlash color={colors.text.danger} size={20} />
            )}
            <span
              className="fw-bold text-uppercase"
              style={{ color: colors.text.danger, letterSpacing: 1, fontSize: 14 }}
            >
              Видимость
            </span>
          </div>

          {/* Кнопка и input для времени анимации в одном ряду */}
          <div className="d-flex align-items-center gap-3 mb-4 justify-content-center">
            <Button
              variant={isVisible ? "danger" : "success"}
              className="fw-bold py-2 px-3"
              style={{
                fontSize: 14,
                backgroundColor: isVisible ? colors.background.danger : colors.background.success,
                color: colors.text.light,
                border: "none",
                boxShadow: isVisible
                  ? `0 2px 8px ${colors.background.danger}55`
                  : `0 2px 8px ${colors.background.success}55`,
                position: "relative",
                minWidth: 120,
                opacity: shouldDisableButton ? 0.5 : 1,
                transition: `all ${animationDuration}ms ease`, // Используем переданное время
                pointerEvents: shouldDisableButton ? "none" : "auto",
              }}
              onClick={handleVisibilityToggle}
              disabled={shouldDisableButton}
            >
              {shouldDisableButton ? (
                <div className="d-flex align-items-center gap-1">
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span className="visually-hidden">Загрузка...</span>
                  </div>
                  <span style={{ fontSize: 12 }}>
                    {isShowing ? "Показываем..." : "Скрываем..."}
                  </span>
                </div>
              ) : (
                <div className="d-flex align-items-center gap-1">
                  {isVisible ? <EyeSlash size={14} /> : <Eye size={14} />}
                  <span style={{ fontSize: 12 }}>
                    {isVisible ? "Скрыть" : "Показать"}
                  </span>
                </div>
              )}
            </Button>

            {/* Input для времени анимации с кнопками */}
            <div className="d-flex flex-column align-items-center gap-1">
              <Form.Label
                className="fw-bold mb-1"
                style={{ 
                  fontSize: 11, 
                  margin: 0,
                  color: colors.text.primary 
                }}
              >
                Анимация (мс)
              </Form.Label>
              <div className="d-flex align-items-center gap-1">
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleDurationDecrease}
                  disabled={animationDuration <= 100}
                  className="fw-bold"
                  style={{
                    fontSize: 10,
                    width: 28,
                    height: 32,
                    padding: 0,
                  }}
                >
                  -
                </Button>
                                 <Form.Control
                   type="number"
                   value={animationDuration}
                   onChange={handleAnimationDurationChange}
                   min={100}
                   max={10000}
                   step={100}
                   size="sm"
                   className="border-danger border-2 fw-bold rounded-3 text-center"
                   style={{
                     fontSize: 12,
                     width: 80,
                     height: 32,
                     backgroundColor: colors.background.card,
                     color: colors.text.primary,
                     borderColor: colors.border.danger,
                   }}
                   placeholder="800"
                 />
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleDurationIncrease}
                  disabled={animationDuration >= 10000}
                  className="fw-bold"
                  style={{
                    fontSize: 10,
                    width: 28,
                    height: 32,
                    padding: 0,
                  }}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Информация о времени - по центру */}
        <div className="d-flex flex-column align-items-center gap-2">
          {" "}
          {/* Removed mt-auto, added align-items-center */}
          {/* Время последнего обновления */}
                     <div
             className="d-flex align-items-center gap-2 text-center"
             style={{ fontSize: 13, color: colors.text.primary }}
           >
             <Clock size={14} color={colors.text.danger} />
             <span className="fw-bold">
               Обновлено: {formatTime(lastUpdateTime)}
             </span>
           </div>
           {/* Время открытия страницы */}
           <div
             className="d-flex align-items-center gap-2 text-center"
             style={{ fontSize: 13, color: colors.text.primary }}
           >
             <PlayCircle size={14} color={colors.text.danger} />
             <span className="fw-bold">
               Открыто: {formatPageOpenTime()}
             </span>
           </div>
          {/* Статус панели */}
          <div className="text-center mt-2">
            {" "}
            {/* Added mt-2 */}
                         <small
               className="fw-bold"
               style={{
                 fontSize: 12,
                 color: isVisible ? colors.text.success : colors.text.danger,
                 textTransform: "uppercase",
                 letterSpacing: 0.5,
               }}
             >
               {isVisible ? "Панель видна" : "Панель скрыта"}
             </small>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default VisibilityCard;
