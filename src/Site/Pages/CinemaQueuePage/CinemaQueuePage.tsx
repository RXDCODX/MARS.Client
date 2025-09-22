import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";

import {
  CinemaMediaItemDto,
  CinemaQueue,
  CinemaQueueStatistics,
  CreateMediaItemRequest,
  UpdateMediaItemRequest,
  UpdateMediaItemRequestStatusEnum,
} from "@/shared/api";
import {
  createErrorToast,
  createSuccessToast,
  useToastModal,
} from "@/shared/Utils/ToastModal";
import { useSiteColors } from "@/shared/Utils/useSiteColors";

import styles from "./CinemaQueuePage.module.scss";
import CreateMediaItemModal from "./components/CreateMediaItemModal";
import EditMediaItemModal from "./components/EditMediaItemModal";
import MediaItemsTable from "./components/MediaItemsTable";
import StatisticsCards from "./components/StatisticsCards";

const CinemaQueuePage: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<CinemaMediaItemDto[]>([]);
  const [statistics, setStatistics] = useState<CinemaQueueStatistics | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<CinemaMediaItemDto | null>(
    null
  );
  const [formData, setFormData] = useState<CreateMediaItemRequest>({
    title: "",
    description: "",
    mediaUrl: "",
    priority: 1,
    scheduledFor: new Date(Date.now() + 60 * 60 * 1000)
      .toISOString()
      .slice(0, 16), // Default to 1 hour from now
    addedBy: "",
    twitchUsername: "",
    notes: "",
  });
  const [editFormData, setEditFormData] = useState<
    Partial<UpdateMediaItemRequest>
  >({});

  const { showToast } = useToastModal();
  const colors = useSiteColors();
  const cinemaQueueApi = useMemo(() => new CinemaQueue(), []);

  // Динамические стили на основе темы
  const pageStyles = useMemo(
    () => ({
      backgroundColor: colors.background.primary,
      color: colors.text.primary,
    }),
    [colors]
  );

  const headerStyles = useMemo(
    () => ({
      backgroundColor: colors.background.card,
      borderColor: colors.border.primary,
      boxShadow: colors.shadow.light,
    }),
    [colors]
  );

  const fetchMediaItems = useCallback(async () => {
    try {
      setLoading(true);
      const response = await cinemaQueueApi.cinemaQueueList();
      if (response.status === 200) {
        setMediaItems(response.data);
      } else {
        showToast(
          createErrorToast(
            "Не удалось загрузить медиа элементы",
            new Error("API Error")
          )
        );
      }
    } catch (error) {
      showToast(createErrorToast("Ошибка при загрузке медиа элементов", error));
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }, [cinemaQueueApi, showToast]);

  const fetchStatistics = useCallback(async () => {
    try {
      const response = await cinemaQueueApi.cinemaQueueStatisticsList();
      if (response.status === 200) {
        setStatistics(response.data);
      }
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  }, [cinemaQueueApi]);

  const resetCreateForm = useCallback(() => {
    setFormData({
      title: "",
      description: "",
      mediaUrl: "",
      priority: 1,
      scheduledFor: new Date(Date.now() + 60 * 60 * 1000)
        .toISOString()
        .slice(0, 16),
      addedBy: "",
      twitchUsername: "",
      notes: "",
    });
  }, []);

  useEffect(() => {
    fetchMediaItems();
    fetchStatistics();
  }, [fetchMediaItems, fetchStatistics]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const apiFormData = {
        ...formData,
        scheduledFor: formData.scheduledFor
          ? new Date(formData.scheduledFor).toISOString()
          : undefined,
      };

      const response = await cinemaQueueApi.cinemaQueueCreate(apiFormData);
      if (response.status === 200) {
        showToast(
          createSuccessToast("Медиа элемент успешно создан", response.data)
        );
        setModalVisible(false);
        resetCreateForm();
        fetchMediaItems();
        fetchStatistics();
      } else {
        showToast(
          createErrorToast(
            "Не удалось создать медиа элемент",
            new Error("API Error")
          )
        );
      }
    } catch (error) {
      showToast(createErrorToast("Ошибка при создании медиа элемента", error));
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      const apiUpdateData: UpdateMediaItemRequest = {
        ...editFormData,
        status: editFormData.status || UpdateMediaItemRequestStatusEnum.Pending,
        scheduledFor: editFormData.scheduledFor
          ? new Date(editFormData.scheduledFor).toISOString()
          : undefined,
      };

      const response = await cinemaQueueApi.cinemaQueueUpdate(
        editingItem.id,
        apiUpdateData
      );
      if (response.status === 200) {
        showToast(
          createSuccessToast("Медиа элемент успешно обновлен", response.data)
        );
        setEditingItem(null);
        setEditFormData({});
        fetchMediaItems();
        fetchStatistics();
      } else {
        showToast(
          createErrorToast(
            "Не удалось обновить медиа элемент",
            new Error("API Error")
          )
        );
      }
    } catch (error) {
      showToast(
        createErrorToast("Ошибка при обновлении медиа элемента", error)
      );
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await cinemaQueueApi.cinemaQueueDelete(id);
      if (response.status === 200) {
        showToast(createSuccessToast("Медиа элемент успешно удален"));
        fetchMediaItems();
        fetchStatistics();
      } else {
        showToast(
          createErrorToast(
            "Не удалось удалить медиа элемент",
            new Error("API Error")
          )
        );
      }
    } catch (error) {
      showToast(createErrorToast("Ошибка при удалении медиа элемента", error));
    }
  };

  const handleMarkAsNext = async (id: string) => {
    try {
      const response = await cinemaQueueApi.cinemaQueueMarkAsNextCreate(id);
      if (response.status === 200) {
        showToast(createSuccessToast("Медиа элемент отмечен как следующий"));
        fetchMediaItems();
      } else {
        showToast(
          createErrorToast(
            "Не удалось отметить медиа элемент как следующий",
            new Error("API Error")
          )
        );
      }
    } catch (error) {
      showToast(
        createErrorToast(
          "Ошибка при отметке медиа элемента как следующего",
          error
        )
      );
    }
  };

  const handleInputChange = (
    field: keyof CreateMediaItemRequest,
    value: string | number
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEditInputChange = (
    field: keyof UpdateMediaItemRequest,
    value: string | number | boolean
  ) => {
    setEditFormData(prev => ({ ...prev, [field]: value }));
  };

  const openEditModal = (item: CinemaMediaItemDto) => {
    setEditingItem(item);
    setEditFormData({
      title: item.title,
      description: item.description,
      mediaUrl: item.mediaUrl,
      status: item.status as unknown as UpdateMediaItemRequestStatusEnum,
      priority: item.priority,
      scheduledFor: item.scheduledFor,
      isNext: item.isNext,
      notes: item.notes,
    });
  };

  return (
    <div className={styles.cinemaQueuePage} style={pageStyles}>
      <div className={styles.header} style={headerStyles}>
        <h1 style={{ color: "var(--site-text-accent)" }}>
          Cinema Queue Management
        </h1>
        <div className="d-flex gap-2">
          <Button
            variant="primary"
            onClick={() => setModalVisible(true)}
            size="lg"
          >
            <Plus className="me-2" />
            Add New Item
          </Button>
        </div>
      </div>

      {statistics && <StatisticsCards statistics={statistics} />}

      <MediaItemsTable
        mediaItems={mediaItems}
        loading={loading}
        onMarkAsNext={handleMarkAsNext}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      <CreateMediaItemModal
        show={modalVisible}
        onHide={() => {
          setModalVisible(false);
          resetCreateForm();
        }}
        onSubmit={handleCreate}
        formData={formData}
        onInputChange={handleInputChange}
      />

      <EditMediaItemModal
        show={!!editingItem}
        onHide={() => {
          setEditingItem(null);
          setEditFormData({});
        }}
        onSubmit={handleUpdate}
        editFormData={editFormData}
        onInputChange={handleEditInputChange}
      />
    </div>
  );
};

export default CinemaQueuePage;
