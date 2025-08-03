import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { FaArrowsAlt, FaCompress } from "react-icons/fa";

import { defaultLayout, LayoutSettings } from "./types";

interface LayoutCardProps {
  layout: LayoutSettings;
  onLayoutChange: (layout: LayoutSettings) => void;
  onReset?: () => void;
}

const LayoutCard: React.FC<LayoutCardProps> = ({
  layout,
  onLayoutChange,
  onReset,
}) => {
  const handleChange = (
    field: keyof LayoutSettings,
    value: number | boolean,
  ) => {
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
      <Card.Body className="d-flex flex-column align-items-center">
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
                onChange={(e) =>
                  handleChange("headerTop", parseInt(e.target.value))
                }
              />
              <Form.Text className="text-muted">{layout.headerTop}px</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Заголовок - позиция по горизонтали (%)</Form.Label>
              <Form.Range
                min="0"
                max="100"
                value={layout.headerLeft}
                onChange={(e) =>
                  handleChange("headerLeft", parseInt(e.target.value))
                }
              />
              <Form.Text className="text-muted">{layout.headerLeft}%</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Игроки - отступ сверху (px)</Form.Label>
              <Form.Range
                min="0"
                max="200"
                value={layout.playersTop}
                onChange={(e) =>
                  handleChange("playersTop", parseInt(e.target.value))
                }
              />
              <Form.Text className="text-muted">
                {layout.playersTop}px
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Игроки - отступ слева (px)</Form.Label>
              <Form.Range
                min="0"
                max="200"
                value={layout.playersLeft}
                onChange={(e) =>
                  handleChange("playersLeft", parseInt(e.target.value))
                }
              />
              <Form.Text className="text-muted">
                {layout.playersLeft}px
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Игроки - отступ справа (px)</Form.Label>
              <Form.Range
                min="0"
                max="200"
                value={layout.playersRight}
                onChange={(e) =>
                  handleChange("playersRight", parseInt(e.target.value))
                }
              />
              <Form.Text className="text-muted">
                {layout.playersRight}px
              </Form.Text>
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
                onChange={(e) =>
                  handleChange("headerHeight", parseInt(e.target.value))
                }
              />
              <Form.Text className="text-muted">
                {layout.headerHeight}px
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ширина заголовка (px)</Form.Label>
              <Form.Range
                min="200"
                max="800"
                value={layout.headerWidth}
                onChange={(e) =>
                  handleChange("headerWidth", parseInt(e.target.value))
                }
              />
              <Form.Text className="text-muted">
                {layout.headerWidth}px
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Высота панели игрока (px)</Form.Label>
              <Form.Range
                min="60"
                max="120"
                value={layout.playerBarHeight}
                onChange={(e) =>
                  handleChange("playerBarHeight", parseInt(e.target.value))
                }
              />
              <Form.Text className="text-muted">
                {layout.playerBarHeight}px
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ширина панели игрока (px)</Form.Label>
              <Form.Range
                min="300"
                max="800"
                value={layout.playerBarWidth}
                onChange={(e) =>
                  handleChange("playerBarWidth", parseInt(e.target.value))
                }
              />
              <Form.Text className="text-muted">
                {layout.playerBarWidth}px
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Размер счета (px)</Form.Label>
              <Form.Range
                min="40"
                max="100"
                value={layout.scoreSize}
                onChange={(e) =>
                  handleChange("scoreSize", parseInt(e.target.value))
                }
              />
              <Form.Text className="text-muted">{layout.scoreSize}px</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Размер флага (px)</Form.Label>
              <Form.Range
                min="16"
                max="48"
                value={layout.flagSize}
                onChange={(e) =>
                  handleChange("flagSize", parseInt(e.target.value))
                }
              />
              <Form.Text className="text-muted">{layout.flagSize}px</Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row
          className="mt-3 justify-content-center w-75"
          style={{
            background: "var(--site-bg-tertiary)",
            border: "2px solid var(--site-border-accent)",
            borderRadius: "20px",
          }}
        >
          {/* Видимость */}
          <Col md={6}>
            <h6 className="mb-3">Видимость элементов</h6>

            <Form.Group className="mb-3 justify-content-lg-center">
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
        <iframe
          width={"1920"}
          className="w-100"
          src="/scoreboard"
          style={{
            background: "var(--site-bg-primary)",
            border: "3px solid var(--site-border-accent)",
            borderRadius: "20px",
            display: "block",
            margin: "5vh 5px",

            boxShadow: "0 2px 8px var(--bs-box-shadow-lg)",
          }}
        ></iframe>
      </Card.Body>
    </Card>
  );
};

export default LayoutCard;
