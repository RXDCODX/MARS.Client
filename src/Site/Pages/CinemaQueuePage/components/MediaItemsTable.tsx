import { Edit as Pencil, PlayCircle, Trash2 as Trash } from "lucide-react";
import { Badge, Button, Card, Table } from "react-bootstrap";

import { CinemaMediaItemDto } from "@/shared/api";

import styles from "../CinemaQueuePage.module.scss";

interface MediaItemsTableProps {
  mediaItems: CinemaMediaItemDto[];
  loading: boolean;
  onMarkAsNext: (id: string) => void;
  onEdit: (item: CinemaMediaItemDto) => void;
  onDelete: (id: string) => void;
}

const MediaItemsTable: React.FC<MediaItemsTableProps> = ({
  mediaItems,
  loading,
  onMarkAsNext,
  onEdit,
  onDelete,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "primary";
      case "InProgress":
        return "warning";
      case "Completed":
        return "success";
      case "Cancelled":
        return "danger";
      case "Postponed":
        return "info";
      default:
        return "secondary";
    }
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 5) return "danger";
    if (priority >= 3) return "warning";
    return "success";
  };

  return (
    <Card className={styles.tableCard}>
      <Card.Header>
        <h5 className="mb-0">Queue Items</h5>
      </Card.Header>
      <Card.Body className="p-0">
        <Table responsive striped hover>
          <thead>
            <tr>
              <th style={{ width: "60px" }}>Next</th>
              <th>Title</th>
              <th style={{ width: "120px" }}>Status</th>
              <th style={{ width: "80px" }}>Priority</th>
              <th style={{ width: "120px" }}>Added By</th>
              <th style={{ width: "200px" }}>Scheduled For</th>
              <th style={{ width: "120px" }}>Created</th>
              <th style={{ width: "400px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mediaItems.map(item => (
              <tr key={item.id} className={item.isNext ? styles.nextRow : ""}>
                <td>
                  {item.isNext && (
                    <Badge bg="success">
                      <PlayCircle className="me-1" />
                      NEXT
                    </Badge>
                  )}
                </td>
                <td>
                  <div className={styles.titleCell}>
                    <div>
                      <div className={styles.titleText}>
                        {item.title || "No title"}
                      </div>
                      {item.description && (
                        <div className={styles.descriptionText}>
                          {item.description}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  <Badge bg={getStatusColor(item.status)}>{item.status}</Badge>
                </td>
                <td>
                  <Badge bg={getPriorityColor(item.priority)}>
                    {item.priority}
                  </Badge>
                </td>
                <td>
                  <div>
                    <div>{item.addedBy}</div>
                    {item.twitchUsername && (
                      <div className={styles.twitchUsername}>
                        @{item.twitchUsername}
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  {item.scheduledFor
                    ? new Date(item.scheduledFor).toLocaleString()
                    : "Not scheduled"}
                </td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="d-flex gap-1">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onMarkAsNext(item.id)}
                      disabled={item.isNext}
                    >
                      <PlayCircle className="me-1" />
                      Mark Next
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => onEdit(item)}
                    >
                      <Pencil className="me-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => onDelete(item.id)}
                    >
                      <Trash className="me-1" />
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {loading && (
          <div className="text-center p-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default MediaItemsTable;
