import { Button, Col, Form, Modal, Row } from "react-bootstrap";

import { UpdateMediaItemRequest } from "@/shared/api";

interface EditMediaItemModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (e: React.FormEvent) => void;
  editFormData: Partial<UpdateMediaItemRequest>;
  onInputChange: (
    field: keyof UpdateMediaItemRequest,
    value: string | number | boolean
  ) => void;
}

const EditMediaItemModal: React.FC<EditMediaItemModalProps> = ({
  show,
  onHide,
  onSubmit,
  editFormData,
  onInputChange,
}) => (
  <Modal show={show} onHide={onHide} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>Edit Media Item</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={editFormData.title || ""}
            onChange={e => onInputChange("title", e.target.value)}
            placeholder="Enter title"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={editFormData.description || ""}
            onChange={e => onInputChange("description", e.target.value)}
            placeholder="Enter description"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Media URL</Form.Label>
          <Form.Control
            type="url"
            value={editFormData.mediaUrl || ""}
            onChange={e => onInputChange("mediaUrl", e.target.value)}
            placeholder="Enter media URL"
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={editFormData.status || ""}
                onChange={e => onInputChange("status", e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Postponed">Postponed</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <Form.Select
                value={editFormData.priority || ""}
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
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Scheduled For</Form.Label>
              <Form.Control
                type="datetime-local"
                value={editFormData.scheduledFor || ""}
                onChange={e => onInputChange("scheduledFor", e.target.value)}
                placeholder="Select date and time"
              />
              <Form.Text className="text-muted">
                Выберите дату и время для показа медиа элемента
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Mark as Next</Form.Label>
              <Form.Select
                value={editFormData.isNext?.toString() || ""}
                onChange={e =>
                  onInputChange("isNext", e.target.value === "true")
                }
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={editFormData.notes || ""}
            onChange={e => onInputChange("notes", e.target.value)}
            placeholder="Additional notes"
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button type="submit" variant="primary">
            Update
          </Button>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
        </div>
      </Form>
    </Modal.Body>
  </Modal>
);

export default EditMediaItemModal;
