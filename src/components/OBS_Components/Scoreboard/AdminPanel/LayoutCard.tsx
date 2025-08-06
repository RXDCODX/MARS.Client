import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { FaArrowsAlt, FaCompress } from "react-icons/fa";

import { useLayout, useLayoutActions } from "./store/scoreboardStore";
import { defaultLayout } from "./types";

const LayoutCard: React.FC = () => {
  const layout = useLayout();
  const { setLayout } = useLayoutActions();

  const handleChange = (
    field: keyof typeof layout,
    value: number | boolean
  ) => {
    setLayout({
      ...layout,
      [field]: value,
    });
  };

  const resetToDefaults = () => {
    setLayout(defaultLayout);
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
                onChange={e =>
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
                onChange={e =>
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
                onChange={e =>
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
                onChange={e =>
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
                onChange={e =>
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
              <Form.Label>Ширина заголовка (px)</Form.Label>
              <Form.Range
                min="200"
                max="800"
                value={layout.headerWidth}
                onChange={e =>
                  handleChange("headerWidth", parseInt(e.target.value))
                }
              />
              <Form.Text className="text-muted">
                {layout.headerWidth}px
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Высота заголовка (px)</Form.Label>
              <Form.Range
                min="40"
                max="120"
                value={layout.headerHeight}
                onChange={e =>
                  handleChange("headerHeight", parseInt(e.target.value))
                }
              />
              <Form.Text className="text-muted">
                {layout.headerHeight}px
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ширина карточки игрока (px)</Form.Label>
              <Form.Range
                min="200"
                max="600"
                value={layout.playerBarWidth}
                onChange={e =>
                  handleChange("playerBarWidth", parseInt(e.target.value))
                }
              />
              <Form.Text className="text-muted">
                {layout.playerBarWidth}px
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Высота карточки игрока (px)</Form.Label>
              <Form.Range
                min="60"
                max="150"
                value={layout.playerBarHeight}
                onChange={e =>
                  handleChange("playerBarHeight", parseInt(e.target.value))
                }
              />
              <Form.Text className="text-muted">
                {layout.playerBarHeight}px
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Размер счета (px)</Form.Label>
              <Form.Range
                min="30"
                max="80"
                value={layout.scoreSize}
                onChange={e =>
                  handleChange("scoreSize", parseInt(e.target.value))
                }
              />
              <Form.Text className="text-muted">{layout.scoreSize}px</Form.Text>
            </Form.Group>
          </Col>
        </Row>

        {/* Дополнительные настройки */}
        <Row className="w-100 mt-3">
          <Col md={12}>
            <h6 className="mb-3">Дополнительные настройки</h6>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Отступы (px)</Form.Label>
                  <Form.Range
                    min="5"
                    max="30"
                    value={layout.padding}
                    onChange={e =>
                      handleChange("padding", parseInt(e.target.value))
                    }
                  />
                  <Form.Text className="text-muted">
                    {layout.padding}px
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Расстояние между элементами (px)</Form.Label>
                  <Form.Range
                    min="5"
                    max="50"
                    value={layout.spacing}
                    onChange={e =>
                      handleChange("spacing", parseInt(e.target.value))
                    }
                  />
                  <Form.Text className="text-muted">
                    {layout.spacing}px
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Показывать заголовок"
                    checked={layout.showHeader}
                    onChange={e => handleChange("showHeader", e.target.checked)}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Показывать флаги"
                    checked={layout.showFlags}
                    onChange={e => handleChange("showFlags", e.target.checked)}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Показывать теги"
                    checked={layout.showTags}
                    onChange={e => handleChange("showTags", e.target.checked)}
                  />
                </Form.Group>
              </Col>
            </Row>
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
