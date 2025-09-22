import { Button, Col, Form, Modal, Row } from "react-bootstrap";

import { CreateMediaItemRequest } from "@/shared/api";

interface CreateMediaItemModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (e: React.FormEvent) => void;
  formData: CreateMediaItemRequest;
  onInputChange: (
    field: keyof CreateMediaItemRequest,
    value: string | number
  ) => void;
}

const CreateMediaItemModal: React.FC<CreateMediaItemModalProps> = ({
  show,
  onHide,
  onSubmit,
  formData,
  onInputChange,
}) => {
  const resetForm = () => {
    onHide();
  };

  return (
    <Modal show={show} onHide={resetForm} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add New Media Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={formData.title || ""}
              onChange={e => onInputChange("title", e.target.value)}
              placeholder="Enter title"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.description || ""}
              onChange={e => onInputChange("description", e.target.value)}
              placeholder="Enter description"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Media URL *</Form.Label>
            <Form.Control
              type="url"
              value={formData.mediaUrl}
              onChange={e => onInputChange("mediaUrl", e.target.value)}
              placeholder="Enter media URL"
              required
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Priority</Form.Label>
                <Form.Select
                  value={formData.priority}
                  onChange={e =>
                    onInputChange("priority", parseInt(e.target.value))
                  }
                >
                  <option value={1}>1 - Low</option>
                  <option value={2}>2 - Normal</option>
                  <option value={3}>3 - Medium</option>
                  <option value={4}>4 - High</option>
                  <option value={5}>5 - Critical</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Scheduled For</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={formData.scheduledFor || ""}
                  onChange={e => onInputChange("scheduledFor", e.target.value)}
                  placeholder="Select date and time"
                />
                <Form.Text className="text-muted">
                  Выберите дату и время для показа медиа элемента (опционально)
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Added By</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.addedBy || ""}
                  onChange={e => onInputChange("addedBy", e.target.value)}
                  placeholder="Enter your name"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Twitch Username</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.twitchUsername || ""}
                  onChange={e =>
                    onInputChange("twitchUsername", e.target.value)
                  }
                  placeholder="Enter Twitch username"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={formData.notes || ""}
              onChange={e => onInputChange("notes", e.target.value)}
              placeholder="Additional notes"
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button type="submit" variant="primary">
              Create
            </Button>
            <Button variant="secondary" onClick={resetForm}>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateMediaItemModal;
