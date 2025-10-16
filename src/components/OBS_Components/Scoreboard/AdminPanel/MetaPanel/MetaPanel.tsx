import { useState } from "react";
import { Button, ButtonGroup, Card, Form } from "react-bootstrap";
import { Info as InfoCircle } from "lucide-react";

import { useSiteColors } from "../../../../../shared/Utils/useSiteColors";
import { useColor, useMeta, useMetaActions } from "../store/scoreboardStore";

const MetaPanel: React.FC = () => {
  const colors = useSiteColors();
  const meta = useMeta();
  const { setMeta } = useMetaActions();
  const scoreboardColors = useColor();
  const [customFightRule, setCustomFightRule] = useState(meta.fightRule || "");

  const fightRules = ["FT1", "FT2", "FT3", "FT4", "FT5"];

  const handleFightRuleChange = (rule: string) => {
    setMeta({ fightRule: rule });
    if (fightRules.includes(rule) || rule === "None") {
      setCustomFightRule(""); // сбрасываем customFightRule
    } else {
      setCustomFightRule(rule);
    }
  };

  const handleCustomFightRuleChange = (value: string) => {
    setCustomFightRule(value);
    setMeta({ fightRule: value });
  };

  return (
    <Card
      className="shadow-lg p-3 mb-4"
      style={{
        backgroundColor: colors.background.card,
        borderRadius: 18,
        border: `2px solid ${colors.border.accent}`,
        height: "100%", // Для выравнивания с VisibilityCard
      }}
    >
      <Card.Body className="d-flex flex-column h-100">
        <div className="d-flex flex-column align-items-center mb-3 gap-2 text-center">
          <InfoCircle color={colors.text.accent} size={20} />
          <span
            className="fw-bold text-uppercase"
            style={{
              color: colors.text.accent,
              letterSpacing: 1,
              fontSize: 14,
            }}
          >
            Meta Panel
          </span>
        </div>

        <div className="d-flex flex-column gap-3 flex-grow-1">
          <Form.Group>
            <Form.Label
              className="fw-bold"
              style={{ fontSize: 12, color: colors.text.primary }}
            >
              Название турнира
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите название турнира"
              value={meta.title}
              onChange={e => setMeta({ title: e.target.value })}
              className="border-primary border-2 fw-bold rounded-3"
              style={{
                fontSize: 14,
                backgroundColor: colors.background.card,
                color:
                  scoreboardColors?.tournamentTitleColor || colors.text.primary,
                borderColor:
                  scoreboardColors?.mainColor || colors.border.primary,
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label
              className="fw-bold"
              style={{ fontSize: 12, color: colors.text.primary }}
            >
              Режим драки
            </Form.Label>
            <div className="d-flex gap-1 flex-wrap mb-2">
              <ButtonGroup size="sm" className="w-100">
                {fightRules.map(rule => (
                  <Button
                    key={rule}
                    variant={
                      meta.fightRule === rule ? "primary" : "outline-primary"
                    }
                    onClick={() => handleFightRuleChange(rule)}
                    className="fw-bold"
                    style={{
                      minWidth: 50,
                      fontSize: 12,
                      background:
                        meta.fightRule === rule
                          ? colors.background.accent
                          : "transparent",
                      borderColor: colors.border.accent,
                      color:
                        meta.fightRule === rule
                          ? colors.text.light
                          : colors.text.accent,
                    }}
                  >
                    {rule}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
            <div className="d-flex gap-1 flex-wrap mb-2">
              <Button
                variant={
                  meta.fightRule === "None" ? "secondary" : "outline-secondary"
                }
                onClick={() => handleFightRuleChange("None")}
                className="fw-bold w-100"
                style={{
                  fontSize: 12,
                  background:
                    meta.fightRule === "None"
                      ? colors.background.warning
                      : "transparent",
                  borderColor: colors.border.warning,
                  color:
                    meta.fightRule === "None"
                      ? colors.text.light
                      : colors.text.warning,
                }}
              >
                None
              </Button>
            </div>
            <Form.Control
              type="text"
              placeholder="Или введите свой режим"
              value={customFightRule}
              onChange={e => handleCustomFightRuleChange(e.target.value)}
              className="border-secondary border-2 fw-bold rounded-3"
              style={{
                fontSize: 14,
                backgroundColor: colors.background.card,
                color: scoreboardColors?.fightModeColor || colors.text.primary,
                borderColor:
                  scoreboardColors?.mainColor || colors.border.secondary,
              }}
            />
          </Form.Group>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MetaPanel;
