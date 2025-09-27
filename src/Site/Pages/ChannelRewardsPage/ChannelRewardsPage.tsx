import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Nav, Tab } from "react-bootstrap";
import { ArrowClockwise, Plus } from "react-bootstrap-icons";

import {
  ChannelRewardRecord,
  ChannelRewardsManager,
  UpdateCustomRewardDto,
} from "@/shared/api";
import {
  createErrorToast,
  createSuccessToast,
  useToastModal,
} from "@/shared/Utils/ToastModal";

import styles from "./ChannelRewardsPage.module.scss";
import { ChannelRewardsPageState } from "./ChannelRewardsPage.types";
import {
  DeleteConfirmationModal,
  RewardDetails,
  RewardForm,
  RewardsList,
} from "./components";

const ChannelRewardsPage: React.FC = () => {
  const [state, setState] = useState<ChannelRewardsPageState>({
    rewards: null,
    localRewards: null,
    selectedReward: null,
    isLoading: false,
    isLoadingLocal: false,
    error: "",
    currentView: "list",
    isCreating: false,
    isEditing: false,
    isDeleting: false,
    isSyncing: false,
  });

  const { showToast } = useToastModal();
  const channelRewardsApi = useMemo(() => new ChannelRewardsManager(), []);

  // Загрузка наград с Twitch
  const loadRewards = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: "" }));
      const response = await channelRewardsApi.channelRewardsManagerList();

      if (response.status === 200) {
        setState(prev => ({
          ...prev,
          rewards: response.data,
          isLoading: false,
        }));
      } else {
        setState(prev => ({
          ...prev,
          error: "Не удалось загрузить награды",
          isLoading: false,
        }));
        showToast(
          createErrorToast("Ошибка загрузки наград", new Error("API Error"))
        );
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: "Ошибка при загрузке наград",
        isLoading: false,
      }));
      showToast(createErrorToast("Ошибка при загрузке наград", error));
      console.error("Error loading rewards:", error);
    }
  }, [channelRewardsApi, showToast]);

  // Загрузка локальных наград
  const loadLocalRewards = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoadingLocal: true, error: "" }));
      const response = await channelRewardsApi.channelRewardsManagerLocalList();

      if (response.status === 200) {
        setState(prev => ({
          ...prev,
          localRewards: response.data,
          isLoadingLocal: false,
        }));
      } else {
        setState(prev => ({
          ...prev,
          error: "Не удалось загрузить локальные награды",
          isLoadingLocal: false,
        }));
        showToast(
          createErrorToast(
            "Ошибка загрузки локальных наград",
            new Error("API Error")
          )
        );
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: "Ошибка при загрузке локальных наград",
        isLoadingLocal: false,
      }));
      showToast(
        createErrorToast("Ошибка при загрузке локальных наград", error)
      );
      console.error("Error loading local rewards:", error);
    }
  }, [channelRewardsApi, showToast]);

  // Создание новой награды
  const createReward = useCallback(
    async (data: ChannelRewardRecord) => {
      try {
        setState(prev => ({ ...prev, isCreating: true }));
        const response =
          await channelRewardsApi.channelRewardsManagerLocalCreate(data);

        if (response.status === 200) {
          showToast(
            createSuccessToast("Награда успешно создана", response.data)
          );
          setState(prev => ({
            ...prev,
            currentView: "list",
            isCreating: false,
          }));
          await loadLocalRewards();
        } else {
          setState(prev => ({ ...prev, isCreating: false }));
          showToast(
            createErrorToast(
              "Не удалось создать награду",
              new Error("API Error")
            )
          );
        }
      } catch (error) {
        setState(prev => ({ ...prev, isCreating: false }));
        showToast(createErrorToast("Ошибка при создании награды", error));
      }
    },
    [channelRewardsApi, showToast, loadLocalRewards]
  );

  // Обновление награды
  const updateReward = useCallback(
    async (id: string, data: UpdateCustomRewardDto) => {
      try {
        setState(prev => ({ ...prev, isEditing: true }));
        const response =
          await channelRewardsApi.channelRewardsManagerLocalUpdate(id, data);

        if (response.status === 200) {
          showToast(createSuccessToast("Награда успешно обновлена"));
          setState(prev => ({
            ...prev,
            currentView: "list",
            isEditing: false,
          }));
          await loadLocalRewards();
        } else {
          setState(prev => ({ ...prev, isEditing: false }));
          showToast(
            createErrorToast(
              "Не удалось обновить награду",
              new Error("API Error")
            )
          );
        }
      } catch (error) {
        setState(prev => ({ ...prev, isEditing: false }));
        showToast(createErrorToast("Ошибка при обновлении награды", error));
      }
    },
    [channelRewardsApi, showToast, loadLocalRewards]
  );

  // Удаление награды
  const deleteReward = useCallback(
    async (id: string) => {
      try {
        setState(prev => ({ ...prev, isDeleting: true }));
        const response =
          await channelRewardsApi.channelRewardsManagerLocalDelete(id);

        if (response.status === 200) {
          showToast(createSuccessToast("Награда успешно удалена"));
          setState(prev => ({
            ...prev,
            currentView: "list",
            isDeleting: false,
            selectedReward: null,
          }));
          await loadLocalRewards();
        } else {
          setState(prev => ({ ...prev, isDeleting: false }));
          showToast(
            createErrorToast(
              "Не удалось удалить награду",
              new Error("API Error")
            )
          );
        }
      } catch (error) {
        setState(prev => ({ ...prev, isDeleting: false }));
        showToast(createErrorToast("Ошибка при удалении награды", error));
      }
    },
    [channelRewardsApi, showToast, loadLocalRewards]
  );

  // Синхронизация с Twitch
  const syncRewards = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isSyncing: true }));
      const response =
        await channelRewardsApi.channelRewardsManagerSyncCreate();

      if (response.status === 200) {
        showToast(createSuccessToast("Синхронизация завершена", response.data));
        await loadRewards();
      } else {
        showToast(
          createErrorToast(
            "Не удалось синхронизировать награды",
            new Error("API Error")
          )
        );
      }
    } catch (error) {
      showToast(createErrorToast("Ошибка при синхронизации наград", error));
    } finally {
      setState(prev => ({ ...prev, isSyncing: false }));
    }
  }, [channelRewardsApi, showToast, loadRewards]);

  // Обработчики навигации
  const handleViewDetails = useCallback((reward: ChannelRewardRecord) => {
    setState(prev => ({
      ...prev,
      selectedReward: reward,
      currentView: "details",
    }));
  }, []);

  const handleEdit = useCallback((reward: ChannelRewardRecord) => {
    setState(prev => ({
      ...prev,
      selectedReward: reward,
      currentView: "edit",
    }));
  }, []);

  const handleDelete = useCallback((reward: ChannelRewardRecord) => {
    setState(prev => ({
      ...prev,
      selectedReward: reward,
      currentView: "delete",
    }));
  }, []);

  const handleCreate = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedReward: null,
      currentView: "create",
    }));
  }, []);

  const handleBack = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentView: "list",
      selectedReward: null,
    }));
  }, []);

  const handleCancel = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentView: "list",
      selectedReward: null,
    }));
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (state.selectedReward) {
      await deleteReward(state.selectedReward.id);
    }
  }, [state.selectedReward, deleteReward]);

  const handleCancelDelete = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentView: "list",
      selectedReward: null,
    }));
  }, []);

  // Загрузка данных при монтировании
  useEffect(() => {
    loadRewards();
    loadLocalRewards();
  }, [loadRewards, loadLocalRewards]);

  // Рендер текущего представления
  const renderCurrentView = () => {
    switch (state.currentView) {
      case "details":
        return (
          <RewardDetails
            reward={state.selectedReward}
            onBack={handleBack}
            onEdit={() =>
              state.selectedReward && handleEdit(state.selectedReward)
            }
            onDelete={() =>
              state.selectedReward && handleDelete(state.selectedReward)
            }
            onRefresh={loadRewards}
          />
        );

      case "create":
        return (
          <RewardForm
            reward={null}
            isSubmitting={state.isCreating}
            mode="create"
            onSubmit={createReward}
            onCancel={handleCancel}
          />
        );

      case "edit":
        return state.selectedReward ? (
          <RewardForm
            reward={state.selectedReward}
            isSubmitting={state.isEditing}
            mode="edit"
            onSubmit={data =>
              updateReward(
                state.selectedReward!.id,
                data as UpdateCustomRewardDto
              )
            }
            onCancel={handleCancel}
          />
        ) : (
          <div className={styles.errorState}>
            <div className={styles.errorIcon}>⚠️</div>
            <p className={styles.errorText}>Награда не выбрана</p>
            <Button variant="primary" onClick={handleBack}>
              Назад
            </Button>
          </div>
        );

      default:
        return (
          <Tab.Container defaultActiveKey="twitch">
            <Nav variant="tabs" className={styles.navTabs}>
              <Nav.Item>
                <Nav.Link eventKey="twitch">Награды Twitch</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="local">Локальные награды</Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content>
              <Tab.Pane eventKey="twitch">
                <RewardsList
                  rewards={state.rewards}
                  isLoading={state.isLoading}
                  error={state.error}
                  onViewDetails={handleViewDetails}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onSync={syncRewards}
                  isSyncing={state.isSyncing}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="local">
                <RewardsList
                  rewards={state.localRewards}
                  isLoading={state.isLoadingLocal}
                  error={state.error}
                  onViewDetails={handleViewDetails}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onSync={syncRewards}
                  isSyncing={state.isSyncing}
                />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        );
    }
  };

  return (
    <div className={styles.channelRewardsPage}>
      <div className={styles.header}>
        <h1>Управление наградами канала</h1>
        <div className={styles.actionButtons}>
          {state.currentView === "list" && (
            <Button variant="primary" onClick={handleCreate}>
              <Plus className="me-1" />
              Создать награду
            </Button>
          )}
          <Button
            variant="outline-primary"
            onClick={syncRewards}
            disabled={state.isSyncing}
          >
            <ArrowClockwise
              className={`me-1 ${state.isSyncing ? "spinning" : ""}`}
            />
            {state.isSyncing ? "Синхронизация..." : "Синхронизировать"}
          </Button>
        </div>
      </div>

      {renderCurrentView()}

      <DeleteConfirmationModal
        isOpen={state.currentView === "delete"}
        reward={state.selectedReward}
        isDeleting={state.isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default ChannelRewardsPage;
