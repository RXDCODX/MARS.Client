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
    // Высококонтрастные карты
    {
      name: "Classic Blue",
      mainColor: "#0DCAF0",
      playerNamesColor: "#FFFFFF",
      tournamentTitleColor: "#0DCAF0",
      fightModeColor: "#0DCAF0",
      scoreColor: "#FFFFFF",
      backgroundColor: "#0F1218",
      borderColor: "#0DCAF0",
    },
    {
      name: "Fire Red",
      mainColor: "#DC3545",
      playerNamesColor: "#FFFFFF",
      tournamentTitleColor: "#FFC2C7",
      fightModeColor: "#FF6B74",
      scoreColor: "#FFFFFF",
      backgroundColor: "#15161A",
      borderColor: "#DC3545",
    },
    {
      name: "Forest Green",
      mainColor: "#198754",
      playerNamesColor: "#FFFFFF",
      tournamentTitleColor: "#A8E6C5",
      fightModeColor: "#20C997",
      scoreColor: "#FFFFFF",
      backgroundColor: "#121517",
      borderColor: "#198754",
    },
    {
      name: "Purple Night",
      mainColor: "#6F42C1",
      playerNamesColor: "#FFFFFF",
      tournamentTitleColor: "#BDA5F5",
      fightModeColor: "#9A6CFF",
      scoreColor: "#FFFFFF",
      backgroundColor: "#121021",
      borderColor: "#6F42C1",
    },
    {
      name: "Golden",
      mainColor: "#FFC107",
      playerNamesColor: "#1B1E24",
      tournamentTitleColor: "#FFD966",
      fightModeColor: "#FFB000",
      scoreColor: "#1B1E24",
      backgroundColor: "#23272F",
      borderColor: "#FFC107",
    },
    {
      name: "Neon Mint",
      mainColor: "#00FF88",
      playerNamesColor: "#FFFFFF",
      tournamentTitleColor: "#66FFD1",
      fightModeColor: "#00E676",
      scoreColor: "#FFFFFF",
      backgroundColor: "#000000",
      borderColor: "#00FF88",
    },
    {
      name: "Neon Blue",
      mainColor: "#08F",
      playerNamesColor: "#FFFFFF",
      tournamentTitleColor: "#66B3FF",
      fightModeColor: "#00A3FF",
      scoreColor: "#FFFFFF",
      backgroundColor: "#000000",
      borderColor: "#08F",
    },
    // Темные палитры
    {
      name: "Dracula",
      mainColor: "#BD93F9",
      playerNamesColor: "#F8F8F2",
      tournamentTitleColor: "#50FA7B",
      fightModeColor: "#FF79C6",
      scoreColor: "#F8F8F2",
      backgroundColor: "#282A36",
      borderColor: "#6272A4",
    },
    {
      name: "Nord",
      mainColor: "#88C0D0",
      playerNamesColor: "#ECEFF4",
      tournamentTitleColor: "#A3BE8C",
      fightModeColor: "#81A1C1",
      scoreColor: "#ECEFF4",
      backgroundColor: "#2E3440",
      borderColor: "#5E81AC",
    },
    {
      name: "Gruvbox",
      mainColor: "#FABD2F",
      playerNamesColor: "#FBF1C7",
      tournamentTitleColor: "#B8BB26",
      fightModeColor: "#83A598",
      scoreColor: "#FBF1C7",
      backgroundColor: "#282828",
      borderColor: "#D79921",
    },
    {
      name: "Solarized Dark",
      mainColor: "#268BD2",
      playerNamesColor: "#EEE8D5",
      tournamentTitleColor: "#2AA198",
      fightModeColor: "#B58900",
      scoreColor: "#EEE8D5",
      backgroundColor: "#002B36",
      borderColor: "#93A1A1",
    },
    // Яркие контрастные
    {
      name: "Cyberpunk",
      mainColor: "#FF007A",
      playerNamesColor: "#FFFFFF",
      tournamentTitleColor: "#00E5FF",
      fightModeColor: "#FFE600",
      scoreColor: "#FFFFFF",
      backgroundColor: "#0A0B0F",
      borderColor: "#FF007A",
    },
    {
      name: "Oceanic",
      mainColor: "#00B3B3",
      playerNamesColor: "#FFFFFF",
      tournamentTitleColor: "#4DD0E1",
      fightModeColor: "#26C6DA",
      scoreColor: "#FFFFFF",
      backgroundColor: "#0D1B1E",
      borderColor: "#00B3B3",
    },
    {
      name: "Sunset",
      mainColor: "#FF7A59",
      playerNamesColor: "#FFFFFF",
      tournamentTitleColor: "#FFD166",
      fightModeColor: "#EF476F",
      scoreColor: "#FFFFFF",
      backgroundColor: "#1C0F13",
      borderColor: "#FF7A59",
    },
    {
      name: "Lime on Slate",
      mainColor: "#C3E88D",
      playerNamesColor: "#FFFFFF",
      tournamentTitleColor: "#89DDFF",
      fightModeColor: "#82AAFF",
      scoreColor: "#FFFFFF",
      backgroundColor: "#101317",
      borderColor: "#C3E88D",
    },
    // Максимальный контраст
    {
      name: "High Contrast",
      mainColor: "#FFFFFF",
      playerNamesColor: "#FFFFFF",
      tournamentTitleColor: "#FFD400",
      fightModeColor: "#00D1FF",
      scoreColor: "#FFFFFF",
      backgroundColor: "#000000",
      borderColor: "#FFFFFF",
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
                    fontSize: 30,
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
