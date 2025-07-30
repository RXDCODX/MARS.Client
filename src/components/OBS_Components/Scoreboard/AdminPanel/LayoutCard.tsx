import React from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { FaArrowsAlt, FaCompress } from "react-icons/fa";
import { LayoutSettings, defaultLayout } from "./types";

interface LayoutCardProps {
  layout: LayoutSettings;
  onLayoutChange: (layout: LayoutSettings) => void;
  onReset?: () => void;
}

const LayoutCard: React.FC<LayoutCardProps> = ({ layout, onLayoutChange, onReset }) => {
  const handleChange = (field: keyof LayoutSettings, value: number | boolean) => {
    onLayoutChange({
      ...layout,
      [field]: value,
    });
  };

  const resetToDefaults = () => {
    if (onReset) {
      onReset();
    } else {
      onLayoutChange(defaultLayout);
    }
  };

  return (
    <Card className="mb-4">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <FaArrowsAlt className="me-2" />
          Настройка макета
        </h5>
        <Button variant="outline-secondary" size="sm" onClick={resetToDefaults}>
          <FaCompress className="me-1" />
          Сброс
        </Button>
      </Card.Header>
      <Card.Body>
        <Row>
          {/* Позиционирование */}
          <Col md={6}>
            <h6 className="mb-3">Позиционирование</h6>
            
            <Form.Group className="mb-3">
              <Form.Label>Заголовок - отступ сверху (px)</Form.Label>
              <Form.Range
                min="0"
                max="200"
                value={layout.headerTop}
                onChange={(e) => handleChange("headerTop", parseInt(e.target.value))}
              />
              <Form.Text className="text-muted">{layout.headerTop}px</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Заголовок - позиция по горизонтали (%)</Form.Label>
              <Form.Range
                min="0"
                max="100"
                value={layout.headerLeft}
                onChange={(e) => handleChange("headerLeft", parseInt(e.target.value))}
              />
              <Form.Text className="text-muted">{layout.headerLeft}%</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Игроки - отступ сверху (px)</Form.Label>
              <Form.Range
                min="0"
                max="200"
                value={layout.playersTop}
                onChange={(e) => handleChange("playersTop", parseInt(e.target.value))}
              />
              <Form.Text className="text-muted">{layout.playersTop}px</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Игроки - отступ слева (px)</Form.Label>
              <Form.Range
                min="0"
                max="200"
                value={layout.playersLeft}
                onChange={(e) => handleChange("playersLeft", parseInt(e.target.value))}
              />
              <Form.Text className="text-muted">{layout.playersLeft}px</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Игроки - отступ справа (px)</Form.Label>
              <Form.Range
                min="0"
                max="200"
                value={layout.playersRight}
                onChange={(e) => handleChange("playersRight", parseInt(e.target.value))}
              />
              <Form.Text className="text-muted">{layout.playersRight}px</Form.Text>
            </Form.Group>
          </Col>

          {/* Размеры */}
          <Col md={6}>
            <h6 className="mb-3">Размеры</h6>
            
            <Form.Group className="mb-3">
              <Form.Label>Высота заголовка (px)</Form.Label>
              <Form.Range
                min="40"
                max="120"
                value={layout.headerHeight}
                onChange={(e) => handleChange("headerHeight", parseInt(e.target.value))}
              />
              <Form.Text className="text-muted">{layout.headerHeight}px</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ширина заголовка (px)</Form.Label>
              <Form.Range
                min="200"
                max="800"
                value={layout.headerWidth}
                onChange={(e) => handleChange("headerWidth", parseInt(e.target.value))}
              />
              <Form.Text className="text-muted">{layout.headerWidth}px</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Высота панели игрока (px)</Form.Label>
              <Form.Range
                min="60"
                max="120"
                value={layout.playerBarHeight}
                onChange={(e) => handleChange("playerBarHeight", parseInt(e.target.value))}
              />
              <Form.Text className="text-muted">{layout.playerBarHeight}px</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ширина панели игрока (px)</Form.Label>
              <Form.Range
                min="300"
                max="800"
                value={layout.playerBarWidth}
                onChange={(e) => handleChange("playerBarWidth", parseInt(e.target.value))}
              />
              <Form.Text className="text-muted">{layout.playerBarWidth}px</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Размер счета (px)</Form.Label>
              <Form.Range
                min="40"
                max="100"
                value={layout.scoreSize}
                onChange={(e) => handleChange("scoreSize", parseInt(e.target.value))}
              />
              <Form.Text className="text-muted">{layout.scoreSize}px</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Размер флага (px)</Form.Label>
              <Form.Range
                min="16"
                max="48"
                value={layout.flagSize}
                onChange={(e) => handleChange("flagSize", parseInt(e.target.value))}
              />
              <Form.Text className="text-muted">{layout.flagSize}px</Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          {/* Отступы */}
          <Col md={6}>
            <h6 className="mb-3">Отступы</h6>
            
            <Form.Group className="mb-3">
              <Form.Label>Общий отступ (px)</Form.Label>
              <Form.Range
                min="8"
                max="32"
                value={layout.spacing}
                onChange={(e) => handleChange("spacing", parseInt(e.target.value))}
              />
              <Form.Text className="text-muted">{layout.spacing}px</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Внутренний отступ (px)</Form.Label>
              <Form.Range
                min="8"
                max="32"
                value={layout.padding}
                onChange={(e) => handleChange("padding", parseInt(e.target.value))}
              />
              <Form.Text className="text-muted">{layout.padding}px</Form.Text>
            </Form.Group>
          </Col>

          {/* Видимость */}
          <Col md={6}>
            <h6 className="mb-3">Видимость элементов</h6>
            
            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                id="showHeader"
                label="Показывать заголовок"
                checked={layout.showHeader}
                onChange={(e) => handleChange("showHeader", e.target.checked)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                id="showFlags"
                label="Показывать флаги"
                checked={layout.showFlags}
                onChange={(e) => handleChange("showFlags", e.target.checked)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                id="showSponsors"
                label="Показывать спонсоров"
                checked={layout.showSponsors}
                onChange={(e) => handleChange("showSponsors", e.target.checked)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                id="showTags"
                label="Показывать теги"
                checked={layout.showTags}
                onChange={(e) => handleChange("showTags", e.target.checked)}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Предварительный просмотр */}
        <Row className="mt-4">
          <Col>
            <h6 className="mb-3">Предварительный просмотр</h6>
            <div 
              className="border rounded p-3"
              style={{
                height: "200px",
                position: "relative",
                backgroundColor: "#f8f9fa",
                overflow: "hidden"
              }}
            >
              {/* Заголовок */}
              {layout.showHeader && (
                <div
                  style={{
                    position: "absolute",
                    top: `${layout.headerTop}px`,
                    left: `${layout.headerLeft}%`,
                    transform: "translateX(-50%)",
                    width: `${layout.headerWidth}px`,
                    height: `${layout.headerHeight}px`,
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    border: "2px solid #3F00FF",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    color: "white"
                  }}
                >
                  Заголовок
                </div>
              )}

              {/* Игроки */}
              <div
                style={{
                  position: "absolute",
                  top: `${layout.playersTop}px`,
                  left: `${layout.playersLeft}px`,
                  right: `${layout.playersRight}px`,
                  display: "flex",
                  justifyContent: "space-between",
                  gap: `${layout.spacing}px`
                }}
              >
                {/* Левый игрок */}
                <div
                  style={{
                    width: `${layout.playerBarWidth}px`,
                    height: `${layout.playerBarHeight}px`,
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    border: "2px solid #3F00FF",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    padding: `${layout.padding}px`,
                    fontSize: "10px",
                    color: "white"
                  }}
                >
                  {layout.showFlags && (
                    <div
                      style={{
                        width: `${layout.flagSize}px`,
                        height: `${layout.flagSize * 0.6}px`,
                        backgroundColor: "#666",
                        borderRadius: "4px",
                        marginRight: `${layout.spacing}px`
                      }}
                    />
                  )}
                  <div style={{ flex: 1, textAlign: "right" }}>
                    <div>Игрок 1</div>
                    {layout.showTags && <div style={{ fontSize: "8px" }}>Тег</div>}
                    {layout.showSponsors && <div style={{ fontSize: "8px" }}>Спонсор</div>}
                  </div>
                  <div
                    style={{
                      width: `${layout.scoreSize}px`,
                      height: `${layout.scoreSize}px`,
                      backgroundColor: "#3F00FF",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: `${layout.spacing}px`
                    }}
                  >
                    0
                  </div>
                </div>

                {/* Правый игрок */}
                <div
                  style={{
                    width: `${layout.playerBarWidth}px`,
                    height: `${layout.playerBarHeight}px`,
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    border: "2px solid #3F00FF",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    padding: `${layout.padding}px`,
                    fontSize: "10px",
                    color: "white"
                  }}
                >
                  <div
                    style={{
                      width: `${layout.scoreSize}px`,
                      height: `${layout.scoreSize}px`,
                      backgroundColor: "#3F00FF",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: `${layout.spacing}px`
                    }}
                  >
                    0
                  </div>
                  <div style={{ flex: 1, textAlign: "left" }}>
                    <div>Игрок 2</div>
                    {layout.showTags && <div style={{ fontSize: "8px" }}>Тег</div>}
                    {layout.showSponsors && <div style={{ fontSize: "8px" }}>Спонсор</div>}
                  </div>
                  {layout.showFlags && (
                    <div
                      style={{
                        width: `${layout.flagSize}px`,
                        height: `${layout.flagSize * 0.6}px`,
                        backgroundColor: "#666",
                        borderRadius: "4px",
                        marginLeft: `${layout.spacing}px`
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default LayoutCard; 