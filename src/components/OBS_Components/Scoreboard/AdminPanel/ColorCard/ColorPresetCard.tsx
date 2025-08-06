import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Palette } from "react-bootstrap-icons";

import { useSiteColors } from "../../../../../shared/Utils/useSiteColors";
import { useColor, useColorActions } from "../store/scoreboardStore";
import { ColorPreset, defaultPreset } from "../types";
import ColorPickerWithTransparency from "./ColorPickerWithTransparency";

const ColorPresetCard: React.FC = () => {
  const colors = useSiteColors();
  const scoreboardColors = useColor();
  const { handleColorChange } = useColorActions();
  const [customColors, setCustomColors] = useState(
    scoreboardColors || defaultPreset
  );

  // Синхронизируем локальное состояние с внешними цветами
  useEffect(() => {
    if (scoreboardColors) {
      setCustomColors(scoreboardColors);
    }
  }, [scoreboardColors]);

  const colorPresets = [
    defaultPreset,
    {
      name: "Classic Blue",
      mainColor: "#0dcaf0",
      playerNamesColor: "#ffffff",
      tournamentTitleColor: "#0dcaf0",
      fightModeColor: "#0dcaf0",
      scoreColor: "#0dcaf0",
      backgroundColor: "#1a1d23",
      borderColor: "#0dcaf0",
    },
    {
      name: "Fire Red",
      mainColor: "#dc3545",
      playerNamesColor: "#ffffff",
      tournamentTitleColor: "#dc3545",
      fightModeColor: "#dc3545",
      scoreColor: "#dc3545",
      backgroundColor: "#1a1d23",
      borderColor: "#dc3545",
    },
    {
      name: "Forest Green",
      mainColor: "#198754",
      playerNamesColor: "#ffffff",
      tournamentTitleColor: "#198754",
      fightModeColor: "#198754",
      scoreColor: "#198754",
      backgroundColor: "#1a1d23",
      borderColor: "#198754",
    },
    {
      name: "Purple Night",
      mainColor: "#6f42c1",
      playerNamesColor: "#ffffff",
      tournamentTitleColor: "#6f42c1",
      fightModeColor: "#6f42c1",
      scoreColor: "#6f42c1",
      backgroundColor: "#1a1d23",
      borderColor: "#6f42c1",
    },
    {
      name: "Golden",
      mainColor: "#ffc107",
      playerNamesColor: "#ffffff",
      tournamentTitleColor: "#ffc107",
      fightModeColor: "#ffc107",
      scoreColor: "#ffffff",
      backgroundColor: "#23272f",
      borderColor: "#ffc107",
    },
    {
      name: "Neon",
      mainColor: "#00ff88",
      playerNamesColor: "#ffffff",
      tournamentTitleColor: "#0088ff",
      fightModeColor: "#00ff88",
      scoreColor: "#00ff88",
      backgroundColor: "#000000",
      borderColor: "#00ff88",
    },
    {
      name: "Neon Blue",
      mainColor: "#0088ff",
      playerNamesColor: "#ffffff",
      tournamentTitleColor: "#0088ff",
      fightModeColor: "#0088ff",
      scoreColor: "#ffffff",
      backgroundColor: "#000000",
      borderColor: "#0088ff",
    },
  ];

  const applyPreset = (preset: ColorPreset) => {
    setCustomColors(preset);
    handleColorChange(preset);
  };

  const handleCustomColorChange = (
    field: keyof typeof customColors,
    value: string
  ) => {
    const updatedColors = { ...customColors, [field]: value };
    setCustomColors(updatedColors);
    handleColorChange(updatedColors);
  };

  return (
    <Card
      className="shadow-lg p-4 mb-4"
      style={{
        backgroundColor: colors.background.card,
        borderRadius: 18,
        border: `2px solid ${colors.border.accent}`,
      }}
    >
      <Card.Body>
        <div className="d-flex flex-column align-items-center mb-4 gap-2">
          <Palette color={colors.text.accent} size={24} />
          <span
            className="fw-bold text-uppercase"
            style={{
              color: colors.text.accent,
              letterSpacing: 1,
              fontSize: 16,
            }}
          >
            Color Presets
          </span>
        </div>

        {/* Пресеты цветов */}
        <div className="mb-4">
          <h6
            className="fw-bold mb-3"
            style={{ color: colors.text.primary, fontSize: 14 }}
          >
            Быстрые пресеты
          </h6>
          <Row className="g-2">
            {colorPresets.map((preset, index) => (
              <Col key={index} xs={6} sm={4} md={3}>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="w-100 fw-bold"
                  onClick={() => applyPreset(preset)}
                  style={{
                    fontSize: 11,
                    borderColor: preset.mainColor,
                    color: preset.mainColor,
                    minHeight: 40,
                  }}
                >
                  {preset.name || "Default"}
                </Button>
              </Col>
            ))}
          </Row>
        </div>

        {/* Кастомные цвета */}
        <div>
          <h6
            className="fw-bold mb-3"
            style={{ color: colors.text.primary, fontSize: 14 }}
          >
            Кастомные цвета
          </h6>
          <Row className="g-3">
            <Col xs={12} sm={6}>
              <div>
                <label className="fw-bold small mb-2 d-block">
                  Основной цвет
                </label>
                <ColorPickerWithTransparency
                  value={customColors.mainColor || "#3F00FF"}
                  onChange={color =>
                    handleCustomColorChange("mainColor", color)
                  }
                />
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div>
                <label className="fw-bold small mb-2 d-block">
                  Цвет имен игроков
                </label>
                <ColorPickerWithTransparency
                  value={customColors.playerNamesColor || "#FFFFFF"}
                  onChange={color =>
                    handleCustomColorChange("playerNamesColor", color)
                  }
                />
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div>
                <label className="fw-bold small mb-2 d-block">
                  Цвет заголовка турнира
                </label>
                <ColorPickerWithTransparency
                  value={customColors.tournamentTitleColor || "#FFFFFF"}
                  onChange={color =>
                    handleCustomColorChange("tournamentTitleColor", color)
                  }
                />
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div>
                <label className="fw-bold small mb-2 d-block">
                  Цвет режима боя
                </label>
                <ColorPickerWithTransparency
                  value={customColors.fightModeColor || "#FFFFFF"}
                  onChange={color =>
                    handleCustomColorChange("fightModeColor", color)
                  }
                />
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div>
                <label className="fw-bold small mb-2 d-block">Цвет счета</label>
                <ColorPickerWithTransparency
                  value={customColors.scoreColor || "#FFFFFF"}
                  onChange={color =>
                    handleCustomColorChange("scoreColor", color)
                  }
                />
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div>
                <label className="fw-bold small mb-2 d-block">Цвет фона</label>
                <ColorPickerWithTransparency
                  value={customColors.backgroundColor || "rgba(0, 0, 0, 0.8)"}
                  onChange={color =>
                    handleCustomColorChange("backgroundColor", color)
                  }
                />
              </div>
            </Col>
            <Col xs={12}>
              <div>
                <label className="fw-bold small mb-2 d-block">
                  Цвет границ
                </label>
                <ColorPickerWithTransparency
                  value={customColors.borderColor || "#3F00FF"}
                  onChange={color =>
                    handleCustomColorChange("borderColor", color)
                  }
                />
              </div>
            </Col>
          </Row>
        </div>

        {/* Кнопка сброса */}
        <div className="d-flex justify-content-center mt-4">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => applyPreset(defaultPreset)}
            className="fw-bold"
            style={{
              borderColor: colors.border.secondary,
              color: colors.text.secondary,
            }}
          >
            Сбросить к умолчанию
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ColorPresetCard;
