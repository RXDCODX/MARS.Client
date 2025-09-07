import { useCallback, useEffect, useMemo, useState } from "react";
import { Container, Nav, Tab } from "react-bootstrap";

import { RandomMeme } from "@/shared/api";
import {
  MemeOrderDto,
  MemeTypeDto,
} from "@/shared/api/http-clients/data-contracts";
import { useToastModal } from "@/shared/Utils/ToastModal";

import {
  DeleteConfirmationModal,
  RandomMemeDetails,
  RandomMemeForm,
  RandomMemeList,
  RandomMemeTypesList,
} from "./components";
import styles from "./RandomMemePage.module.scss";
import {
  MemeOrderFormData,
  MemeTypeFormData,
  NavigationState,
  RandomMemeView,
} from "./RandomMemePage.types";

const RandomMemePage: React.FC = () => {
  const api = useMemo(() => new RandomMeme(), []);
  const { showToast } = useToastModal();

  // Состояние навигации
  const [navigation, setNavigation] = useState<NavigationState>({
    currentView: "list",
    selectedType: null,
    selectedOrder: null,
    isLoading: false,
    error: "",
  });

  // Данные
  const [memeTypes, setMemeTypes] = useState<MemeTypeDto[]>([]);
  const [memeOrders, setMemeOrders] = useState<MemeOrderDto[]>([]);
  const [activeTab, setActiveTab] = useState<"types" | "orders">("orders");

  // Состояние модального окна удаления
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    itemType: "type" | "order";
    itemName: string;
    onConfirm: () => Promise<void>;
  }>({
    isOpen: false,
    itemType: "order",
    itemName: "",
    onConfirm: async () => {},
  });

  // Состояние формы
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Загрузка типов мемов
  const loadTypes = useCallback(async () => {
    try {
      setNavigation(prev => ({ ...prev, isLoading: true, error: "" }));
      const response = await api.randomMemeTypesList();
      setMemeTypes(response.data ?? []);
    } catch (e) {
      console.error("Ошибка загрузки типов:", e);
      const errorMessage =
        e instanceof Error ? e.message : "Неизвестная ошибка";
      setNavigation(prev => ({ ...prev, error: errorMessage }));
      showToast({
        type: "error",
        title: "Ошибка загрузки типов",
        message: errorMessage,
      });
    } finally {
      setNavigation(prev => ({ ...prev, isLoading: false }));
    }
  }, [api]);

  // Загрузка заказов мемов
  const loadOrders = useCallback(async () => {
    try {
      setNavigation(prev => ({ ...prev, isLoading: true, error: "" }));
      const response = await api.randomMemeOrdersList();
      setMemeOrders(response.data ?? []);
    } catch (e) {
      console.error("Ошибка загрузки заказов:", e);
      const errorMessage =
        e instanceof Error ? e.message : "Неизвестная ошибка";
      setNavigation(prev => ({ ...prev, error: errorMessage }));
      showToast({
        type: "error",
        title: "Ошибка загрузки заказов",
        message: errorMessage,
      });
    } finally {
      setNavigation(prev => ({ ...prev, isLoading: false }));
    }
  }, [api]);

  // Загрузка данных при монтировании
  useEffect(() => {
    loadTypes();
    loadOrders();
  }, [loadTypes, loadOrders]);

  // Навигация
  const navigateTo = useCallback(
    (
      view: RandomMemeView,
      selectedType?: MemeTypeDto,
      selectedOrder?: MemeOrderDto
    ) => {
      setNavigation(prev => ({
        ...prev,
        currentView: view,
        selectedType: selectedType || null,
        selectedOrder: selectedOrder || null,
        error: "",
      }));
    },
    []
  );

  const navigateBack = useCallback(() => {
    setNavigation(prev => ({
      ...prev,
      currentView: "list",
      selectedType: null,
      selectedOrder: null,
      error: "",
    }));
  }, []);

  // Обработчики для типов мемов
  const handleTypeViewDetails = useCallback(
    (memeType: MemeTypeDto) => {
      navigateTo("type-details", memeType);
    },
    [navigateTo]
  );

  const handleTypeEdit = useCallback(
    (memeType: MemeTypeDto) => {
      navigateTo("edit-type", memeType);
    },
    [navigateTo]
  );

  const handleTypeDelete = useCallback(
    (memeType: MemeTypeDto) => {
      setDeleteModal({
        isOpen: true,
        itemType: "type",
        itemName: memeType.name,
        onConfirm: async () => {
          try {
            await api.randomMemeTypesDelete(memeType.id);
            showToast({
              type: "success",
              title: "Успешно",
              message: "Тип мема успешно удален",
            });
            await loadTypes();
            setDeleteModal(prev => ({ ...prev, isOpen: false }));
          } catch (e) {
            console.error("Ошибка удаления типа:", e);
            showToast({
              type: "error",
              title: "Ошибка",
              message: "Ошибка удаления типа мема",
            });
          }
        },
      });
    },
    [api, loadTypes]
  );

  const handleTypeCreate = useCallback(() => {
    navigateTo("create-type");
  }, [navigateTo]);

  // Обработчики для заказов мемов
  const handleOrderViewDetails = useCallback(
    (memeOrder: MemeOrderDto) => {
      navigateTo("order-details", undefined, memeOrder);
    },
    [navigateTo]
  );

  const handleOrderEdit = useCallback(
    (memeOrder: MemeOrderDto) => {
      navigateTo("edit-order", undefined, memeOrder);
    },
    [navigateTo]
  );

  const handleOrderDelete = useCallback(
    (memeOrder: MemeOrderDto) => {
      setDeleteModal({
        isOpen: true,
        itemType: "order",
        itemName: `Заказ #${memeOrder.order}`,
        onConfirm: async () => {
          try {
            await api.randomMemeOrdersDelete(memeOrder.id);
            showToast({
              type: "success",
              title: "Успешно",
              message: "Заказ мема успешно удален",
            });
            await loadOrders();
            setDeleteModal(prev => ({ ...prev, isOpen: false }));
          } catch (e) {
            console.error("Ошибка удаления заказа:", e);
            showToast({
              type: "error",
              title: "Ошибка",
              message: "Ошибка удаления заказа мема",
            });
          }
        },
      });
    },
    [api, loadOrders]
  );

  const handleOrderCreate = useCallback(() => {
    navigateTo("create-order");
  }, [navigateTo]);

  // Обработчик отправки формы
  const handleFormSubmit = useCallback(
    async (data: Record<string, unknown>) => {
      try {
        setIsSubmitting(true);

        if (navigation.currentView.includes("type")) {
          const typeData = data as MemeTypeFormData;
          if (navigation.currentView === "create-type") {
            await api.randomMemeTypesCreate(typeData);
            showToast({
              type: "success",
              title: "Успешно",
              message: "Тип мема успешно создан",
            });
          } else {
            await api.randomMemeTypesUpdate(
              navigation.selectedType!.id,
              typeData
            );
            showToast({
              type: "success",
              title: "Успешно",
              message: "Тип мема успешно обновлен",
            });
          }
          await loadTypes();
        } else {
          const orderData = data as MemeOrderFormData;
          if (navigation.currentView === "create-order") {
            await api.randomMemeOrdersCreate(orderData);
            showToast({
              type: "success",
              title: "Успешно",
              message: "Заказ мема успешно создан",
            });
          } else {
            await api.randomMemeOrdersUpdate(
              navigation.selectedOrder!.id,
              orderData
            );
            showToast({
              type: "success",
              title: "Успешно",
              message: "Заказ мема успешно обновлен",
            });
          }
          await loadOrders();
        }

        navigateBack();
      } catch (e) {
        console.error("Ошибка сохранения:", e);
        showToast({
          type: "error",
          title: "Ошибка",
          message: "Ошибка сохранения данных",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [navigation, api, loadTypes, loadOrders, navigateBack]
  );

  // Рендер текущего представления
  const renderCurrentView = () => {
    switch (navigation.currentView) {
      case "list":
        return (
          <Tab.Container
            activeKey={activeTab}
            onSelect={k => setActiveTab(k as "types" | "orders")}
          >
            <Nav variant="tabs" className="mb-4">
              <Nav.Item>
                <Nav.Link eventKey="orders">
                  Заказы мемов ({memeOrders.length})
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="types">
                  Типы мемов ({memeTypes.length})
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="orders">
                <RandomMemeList
                  memeOrders={memeOrders}
                  memeTypes={memeTypes}
                  isLoading={navigation.isLoading}
                  error={navigation.error}
                  onRefresh={loadOrders}
                  onViewDetails={handleOrderViewDetails}
                  onEdit={handleOrderEdit}
                  onDelete={handleOrderDelete}
                  onCreate={handleOrderCreate}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="types">
                <RandomMemeTypesList
                  memeTypes={memeTypes}
                  isLoading={navigation.isLoading}
                  error={navigation.error}
                  onRefresh={loadTypes}
                  onViewDetails={handleTypeViewDetails}
                  onEdit={handleTypeEdit}
                  onDelete={handleTypeDelete}
                  onCreate={handleTypeCreate}
                />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        );

      case "type-details":
        return navigation.selectedType ? (
          <RandomMemeDetails
            memeType={navigation.selectedType}
            isLoading={navigation.isLoading}
            onBack={navigateBack}
            onEdit={() => navigateTo("edit-type", navigation.selectedType!)}
            onDelete={() => handleTypeDelete(navigation.selectedType!)}
            onRefresh={loadTypes}
          />
        ) : null;

      case "order-details":
        return navigation.selectedOrder ? (
          <RandomMemeDetails
            memeOrder={navigation.selectedOrder}
            isLoading={navigation.isLoading}
            onBack={navigateBack}
            onEdit={() =>
              navigateTo("edit-order", undefined, navigation.selectedOrder!)
            }
            onDelete={() => handleOrderDelete(navigation.selectedOrder!)}
            onRefresh={loadOrders}
          />
        ) : null;

      case "create-type":
      case "edit-type":
        return (
          <RandomMemeForm
            memeType={navigation.selectedType}
            memeTypes={memeTypes}
            isSubmitting={isSubmitting}
            mode={navigation.currentView === "create-type" ? "create" : "edit"}
            onSubmit={handleFormSubmit}
            onCancel={navigateBack}
          />
        );

      case "create-order":
      case "edit-order":
        return (
          <RandomMemeForm
            memeOrder={navigation.selectedOrder}
            memeTypes={memeTypes}
            isSubmitting={isSubmitting}
            mode={navigation.currentView === "create-order" ? "create" : "edit"}
            onSubmit={handleFormSubmit}
            onCancel={navigateBack}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Container className={styles.randomMemePage}>
      {renderCurrentView()}

      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        itemType={deleteModal.itemType}
        itemName={deleteModal.itemName}
        isDeleting={isSubmitting}
        onConfirm={deleteModal.onConfirm}
        onCancel={() => setDeleteModal(prev => ({ ...prev, isOpen: false }))}
      />
    </Container>
  );
};

export default RandomMemePage;
