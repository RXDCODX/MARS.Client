import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

import { ChannelRewardRecord, UpdateCustomRewardDto } from "@/shared/api";

import styles from "../ChannelRewardsPage.module.scss";
import { RewardFormProps } from "../ChannelRewardsPage.types";

const RewardForm: React.FC<RewardFormProps> = ({
  reward,
  isSubmitting,
  mode,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Partial<ChannelRewardRecord>>({
    title: reward?.title || "",
    cost: reward?.cost || 100,
    isEnabled: reward?.isEnabled ?? true,
    prompt: reward?.prompt || "",
    backgroundColor: reward?.backgroundColor || "#9146FF",
    isUserInputRequired: reward?.isUserInputRequired ?? false,
    isMaxPerStreamEnabled: reward?.isMaxPerStreamEnabled ?? false,
    maxPerStream: reward?.maxPerStream || 1,
    isMaxPerUserPerStreamEnabled: reward?.isMaxPerUserPerStreamEnabled ?? false,
    maxPerUserPerStream: reward?.maxPerUserPerStream || 1,
    isGlobalCooldownEnabled: reward?.isGlobalCooldownEnabled ?? false,
    globalCooldownSeconds: reward?.globalCooldownSeconds || 0,
    shouldRedemptionsSkipRequestQueue:
      reward?.shouldRedemptionsSkipRequestQueue ?? false,
  });

  const handleInputChange = (field: keyof ChannelRewardRecord, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "create") {
      await onSubmit(formData as ChannelRewardRecord);
    } else {
      await onSubmit(formData as UpdateCustomRewardDto);
    }
  };

  const handleCheckboxChange = (
    field: keyof ChannelRewardRecord,
    checked: boolean
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked,
    }));
  };

  return (
    <div className={styles.rewardForm}>
      <div className={styles.formHeader}>
        <h3>
          {mode === "create"
            ? "Создание новой награды"
            : "Редактирование награды"}
        </h3>
      </div>

      <Form onSubmit={handleSubmit}>
        <div className={styles.formSection}>
          <h4 className={styles.sectionTitle}>Основная информация</h4>

          <Row className={styles.formRow}>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Название награды *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.title || ""}
                  onChange={e => handleInputChange("title", e.target.value)}
                  placeholder="Введите название награды"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Стоимость (очки) *</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  value={formData.cost || 100}
                  onChange={e =>
                    handleInputChange("cost", parseInt(e.target.value))
                  }
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className={styles.formRow}>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Описание</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.prompt || ""}
                  onChange={e => handleInputChange("prompt", e.target.value)}
                  placeholder="Описание награды (необязательно)"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Цвет фона</Form.Label>
                <Form.Control
                  type="color"
                  value={formData.backgroundColor || "#9146FF"}
                  onChange={e =>
                    handleInputChange("backgroundColor", e.target.value)
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Награда активна"
              checked={formData.isEnabled || false}
              onChange={e =>
                handleCheckboxChange("isEnabled", e.target.checked)
              }
            />
          </Form.Group>
        </div>

        <div className={styles.formSection}>
          <h4 className={styles.sectionTitle}>Настройки ввода</h4>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Требует ввод пользователя"
              checked={formData.isUserInputRequired || false}
              onChange={e =>
                handleCheckboxChange("isUserInputRequired", e.target.checked)
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Пропускать очередь запросов"
              checked={formData.shouldRedemptionsSkipRequestQueue || false}
              onChange={e =>
                handleCheckboxChange(
                  "shouldRedemptionsSkipRequestQueue",
                  e.target.checked
                )
              }
            />
          </Form.Group>
        </div>

        <div className={styles.formSection}>
          <h4 className={styles.sectionTitle}>Лимиты</h4>

          <Row className={styles.formRow}>
            <Col>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Ограничить количество на стрим"
                  checked={formData.isMaxPerStreamEnabled || false}
                  onChange={e =>
                    handleCheckboxChange(
                      "isMaxPerStreamEnabled",
                      e.target.checked
                    )
                  }
                />
                {formData.isMaxPerStreamEnabled && (
                  <Form.Control
                    type="number"
                    min="1"
                    value={formData.maxPerStream || 1}
                    onChange={e =>
                      handleInputChange(
                        "maxPerStream",
                        parseInt(e.target.value)
                      )
                    }
                    className="mt-2"
                  />
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Ограничить количество на пользователя за стрим"
                  checked={formData.isMaxPerUserPerStreamEnabled || false}
                  onChange={e =>
                    handleCheckboxChange(
                      "isMaxPerUserPerStreamEnabled",
                      e.target.checked
                    )
                  }
                />
                {formData.isMaxPerUserPerStreamEnabled && (
                  <Form.Control
                    type="number"
                    min="1"
                    value={formData.maxPerUserPerStream || 1}
                    onChange={e =>
                      handleInputChange(
                        "maxPerUserPerStream",
                        parseInt(e.target.value)
                      )
                    }
                    className="mt-2"
                  />
                )}
              </Form.Group>
            </Col>
          </Row>

          <Row className={styles.formRow}>
            <Col>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Глобальная задержка"
                  checked={formData.isGlobalCooldownEnabled || false}
                  onChange={e =>
                    handleCheckboxChange(
                      "isGlobalCooldownEnabled",
                      e.target.checked
                    )
                  }
                />
                {formData.isGlobalCooldownEnabled && (
                  <Form.Control
                    type="number"
                    min="0"
                    value={formData.globalCooldownSeconds || 0}
                    onChange={e =>
                      handleInputChange(
                        "globalCooldownSeconds",
                        parseInt(e.target.value)
                      )
                    }
                    className="mt-2"
                    placeholder="Задержка в секундах"
                  />
                )}
              </Form.Group>
            </Col>
          </Row>
        </div>

        <div className="d-flex gap-2 justify-content-end">
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting
              ? "Сохранение..."
              : mode === "create"
                ? "Создать"
                : "Сохранить"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Отмена
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default RewardForm;
