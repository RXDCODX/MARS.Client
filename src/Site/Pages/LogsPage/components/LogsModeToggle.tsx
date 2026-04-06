import { RadioTower } from "lucide-react";
import { Button } from "react-bootstrap";

const BootstrapButton = Button as any;

interface LogsModeToggleProps {
  isRealtime: boolean;
  onModeChange: (isRealtime: boolean) => void;
  disabled?: boolean;
}

const LogsModeToggle: React.FC<LogsModeToggleProps> = ({
  isRealtime,
  onModeChange,
  disabled = false,
}) => (
  <div className="d-flex align-items-center mb-3">
    {/* TODO: Починить режим реального времени - логгер логирует информацию о передаче данных по хабу */}
    <BootstrapButton
      className={`d-flex align-items-center gap-2 ${
        isRealtime ? "btn-success" : "btn-outline-success"
      }`}
      onClick={() => onModeChange(true)}
      disabled={true} // Временно отключено
      title="Реальное время (временно отключено)"
    >
      <RadioTower size={16} />
      Реальное время
    </BootstrapButton>
    <BootstrapButton
      className={`ms-2 d-flex align-items-center gap-2 ${
        !isRealtime ? "btn-primary" : "btn-outline-primary"
      }`}
      onClick={() => onModeChange(false)}
      disabled={disabled}
      title="Режим запросов"
    >
      Опрос (REST)
    </BootstrapButton>
  </div>
);

export default LogsModeToggle;
