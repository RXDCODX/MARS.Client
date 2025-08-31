import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Container } from "react-bootstrap";

import { RandomMeme } from "@/shared/api";
import {
  CreateMemeOrderDto,
  CreateMemeTypeDto,
  MemeOrderDto,
  MemeTypeDto,
  UpdateMemeOrderDto,
  UpdateMemeTypeDto,
} from "@/shared/api/http-clients/data-contracts";

import DeleteConfirmationModal from "./components/DeleteConfirmationModal";
import RandomMemeDetails from "./components/RandomMemeDetails";
import RandomMemeForm from "./components/RandomMemeForm";
import RandomMemeList from "./components/RandomMemeList";
import styles from "./RandomMemePage.module.scss";
import { NavigationState } from "./RandomMemePage.types";

const RandomMemePage: React.FC = () => {
  const api = useMemo(() => new RandomMeme(), []);
  const [navigationState, setNavigationState] = useState<NavigationState>({
    currentView: "list",
    selectedType: null,
    selectedOrder: null,
    isLoading: true,
    error: "",
  });

  const [memeTypes, setMemeTypes] = useState<MemeTypeDto[]>([]);
  const [memeOrders, setMemeOrders] = useState<MemeOrderDto[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"types" | "orders">("types");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemType, setDeleteItemType] = useState<"type" | "order">(
    "type"
  );
  const [deleteItemName, setDeleteItemName] = useState("");

  // Обновление состояния навигации
  const updateNavigationState = useCallback(
    (updates: Partial<NavigationState>) => {
      setNavigationState(prev => ({ ...prev, ...updates }));
    },
    []
  );

  // Загрузка типов мемов
  const loadMemeTypes = useCallback(async () => {
    try {
      updateNavigationState({ isLoading: true, error: "" });
      const response = await api.randomMemeTypesList();
      setMemeTypes(response.data ?? []);
      updateNavigationState({ isLoading: false });
    } catch (error) {
      console.error("Ошибка загрузки типов мемов:", error);
      updateNavigationState({
        isLoading: false,
        error: error instanceof Error ? error.message : "Неизвестная ошибка",
      });
    }
  }, [api, updateNavigationState]);

  // Загрузка заказов мемов
  const loadMemeOrders = useCallback(async () => {
    try {
      updateNavigationState({ isLoading: true, error: "" });
      const response = await api.randomMemeOrdersList();
      setMemeOrders(response.data ?? []);
      updateNavigationState({ isLoading: false });
    } catch (error) {
      console.error("Ошибка загрузки заказов мемов:", error);
      updateNavigationState({
        isLoading: false,
        error: error instanceof Error ? error.message : "Неизвестная ошибка",
      });
    }
  }, [api, updateNavigationState]);

  // Загрузка всех данных
  const loadAllData = useCallback(async () => {
    await Promise.all([loadMemeTypes(), loadMemeOrders()]);
  }, [loadMemeTypes, loadMemeOrders]);

  // Обработчики навигации
  const handleTypeSelect = useCallback(
    (type: MemeTypeDto) => {
      updateNavigationState({
        currentView: "type-details",
        selectedType: type,
      });
    },
    [updateNavigationState]
  );

  const handleOrderSelect = useCallback(
    (order: MemeOrderDto) => {
      updateNavigationState({
        currentView: "order-details",
        selectedOrder: order,
      });
    },
    [updateNavigationState]
  );

  const handleCreateClick = useCallback(() => {
    updateNavigationState({
      currentView: activeTab === "types" ? "create-type" : "create-order",
    });
  }, [activeTab, updateNavigationState]);

  const handleEditClick = useCallback(() => {
    updateNavigationState({
      currentView: navigationState.selectedType ? "edit-type" : "edit-order",
    });
  }, [navigationState.selectedType, updateNavigationState]);

  const handleDeleteClick = useCallback(() => {
    const isType = !!navigationState.selectedType;
    setDeleteItemType(isType ? "type" : "order");
    setDeleteItemName(
      isType
        ? navigationState.selectedType!.name
        : navigationState.selectedOrder!.filePath
    );
    setShowDeleteModal(true);
  }, [navigationState.selectedType, navigationState.selectedOrder]);

  const handleBackToList = useCallback(() => {
    updateNavigationState({
      currentView: "list",
      selectedType: null,
      selectedOrder: null,
    });
  }, [updateNavigationState]);

  const handleCancelForm = useCallback(() => {
    updateNavigationState({
      currentView: "list",
    });
  }, [updateNavigationState]);

  // Обработчики CRUD операций
  const handleCreateType = useCallback(
    async (data: Record<string, unknown>) => {
      try {
        setIsSubmitting(true);
        await api.randomMemeTypesCreate(data as unknown as CreateMemeTypeDto);
        await loadMemeTypes();
        updateNavigationState({ currentView: "list" });
      } catch (error) {
        console.error("Ошибка создания типа мема:", error);
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    [api, loadMemeTypes, updateNavigationState]
  );

  const handleCreateOrder = useCallback(
    async (data: Record<string, unknown>) => {
      try {
        setIsSubmitting(true);
        await api.randomMemeOrdersCreate(data as unknown as CreateMemeOrderDto);
        await loadMemeOrders();
        updateNavigationState({ currentView: "list" });
      } catch (error) {
        console.error("Ошибка создания заказа мема:", error);
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    [api, loadMemeOrders, updateNavigationState]
  );

  const handleUpdateType = useCallback(
    async (data: Record<string, unknown>) => {
      if (!navigationState.selectedType) return;

      try {
        setIsSubmitting(true);
        await api.randomMemeTypesUpdate(
          navigationState.selectedType.id,
          data as unknown as UpdateMemeTypeDto
        );
        await loadMemeTypes();
        updateNavigationState({ currentView: "type-details" });
      } catch (error) {
        console.error("Ошибка обновления типа мема:", error);
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    [api, navigationState.selectedType, loadMemeTypes, updateNavigationState]
  );

  const handleUpdateOrder = useCallback(
    async (data: Record<string, unknown>) => {
      if (!navigationState.selectedOrder) return;

      try {
        setIsSubmitting(true);
        await api.randomMemeOrdersUpdate(
          navigationState.selectedOrder.id,
          data as unknown as UpdateMemeOrderDto
        );
        await loadMemeOrders();
        updateNavigationState({ currentView: "order-details" });
      } catch (error) {
        console.error("Ошибка обновления заказа мема:", error);
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    [api, navigationState.selectedOrder, loadMemeOrders, updateNavigationState]
  );

  const handleDeleteConfirm = useCallback(async () => {
    try {
      setIsSubmitting(true);

      if (deleteItemType === "type" && navigationState.selectedType) {
        await api.randomMemeTypesDelete(navigationState.selectedType.id);
        await loadMemeTypes();
      } else if (deleteItemType === "order" && navigationState.selectedOrder) {
        await api.randomMemeOrdersDelete(navigationState.selectedOrder.id);
        await loadMemeOrders();
      }

      setShowDeleteModal(false);
      updateNavigationState({
        currentView: "list",
        selectedType: null,
        selectedOrder: null,
      });
    } catch (error) {
      console.error("Ошибка удаления:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [
    deleteItemType,
    navigationState.selectedType,
    navigationState.selectedOrder,
    api,
    loadMemeTypes,
    loadMemeOrders,
    updateNavigationState,
  ]);

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // Обработка ошибок
  if (navigationState.error && navigationState.currentView === "list") {
    return (
      <Container className={styles.randomMemePage}>
        <Alert variant="danger">
          <Alert.Heading>Ошибка загрузки данных</Alert.Heading>
          <p>{navigationState.error}</p>
          <button
            className="btn btn-outline-danger"
            onClick={loadAllData}
            disabled={navigationState.isLoading}
          >
            {navigationState.isLoading ? "Загрузка..." : "Попробовать снова"}
          </button>
        </Alert>
      </Container>
    );
  }

  // Рендер компонента в зависимости от текущего представления
  const renderCurrentView = () => {
    switch (navigationState.currentView) {
      case "list":
        return (
          <RandomMemeList
            memeTypes={memeTypes}
            memeOrders={memeOrders}
            isLoading={navigationState.isLoading}
            error={navigationState.error}
            searchQuery={searchQuery}
            activeTab={activeTab}
            onSearchChange={setSearchQuery}
            onTabChange={setActiveTab}
            onTypeSelect={handleTypeSelect}
            onOrderSelect={handleOrderSelect}
            onCreateClick={handleCreateClick}
            onRefresh={loadAllData}
          />
        );

      case "type-details":
      case "order-details":
        return (
          <RandomMemeDetails
            memeType={navigationState.selectedType || undefined}
            memeOrder={navigationState.selectedOrder || undefined}
            isLoading={navigationState.isLoading}
            onBack={handleBackToList}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            onRefresh={
              navigationState.selectedType ? loadMemeTypes : loadMemeOrders
            }
          />
        );

      case "create-type":
      case "create-order":
      case "edit-type":
      case "edit-order":
        return (
          <RandomMemeForm
            memeType={navigationState.selectedType || undefined}
            memeOrder={navigationState.selectedOrder || undefined}
            memeTypes={memeTypes}
            isSubmitting={isSubmitting}
            mode={
              navigationState.currentView.startsWith("create")
                ? "create"
                : "edit"
            }
            onSubmit={
              navigationState.currentView === "create-type"
                ? handleCreateType
                : navigationState.currentView === "create-order"
                  ? handleCreateOrder
                  : navigationState.currentView === "edit-type"
                    ? handleUpdateType
                    : handleUpdateOrder
            }
            onCancel={handleCancelForm}
          />
        );

      default:
        return (
          <Alert variant="warning">
            <Alert.Heading>Неизвестное представление</Alert.Heading>
            <p>Произошла ошибка навигации.</p>
          </Alert>
        );
    }
  };

  return (
    <Container className={styles.randomMemePage}>
      {renderCurrentView()}

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        itemType={deleteItemType}
        itemName={deleteItemName}
        isDeleting={isSubmitting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteModal(false)}
      />
    </Container>
  );
};

export default RandomMemePage;
