import { ChannelRewardRecord, UpdateCustomRewardDto } from "@/shared/api";

// Основные типы для страницы
export interface ChannelRewardsPageState {
  rewards: ChannelRewardRecord[] | null;
  localRewards: ChannelRewardRecord[] | null;
  selectedReward: ChannelRewardRecord | null;
  isLoading: boolean;
  isLoadingLocal: boolean;
  error: string;
  currentView: ChannelRewardsView;
  isCreating: boolean;
  isEditing: boolean;
  isDeleting: boolean;
  isSyncing: boolean;
}

// Типы представлений
export type ChannelRewardsView =
  | "list"
  | "local-list"
  | "details"
  | "create"
  | "edit"
  | "delete";

// Пропсы для компонента списка наград
export interface RewardsListProps {
  rewards: ChannelRewardRecord[] | null;
  isLoading: boolean;
  error: string;
  onViewDetails: (reward: ChannelRewardRecord) => void;
  onEdit: (reward: ChannelRewardRecord) => void;
  onDelete: (reward: ChannelRewardRecord) => void;
  onSync: () => void;
  isSyncing: boolean;
}

// Пропсы для компонента деталей награды
export interface RewardDetailsProps {
  reward: ChannelRewardRecord | null;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onRefresh: () => void;
}

// Пропсы для формы создания/редактирования награды
export interface RewardFormProps {
  reward?: ChannelRewardRecord | null;
  isSubmitting: boolean;
  mode: "create" | "edit";
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

// Пропсы для модального окна удаления
export interface DeleteConfirmationModalProps {
  isOpen: boolean;
  reward: ChannelRewardRecord | null;
  isDeleting: boolean;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

// Данные формы для создания награды
export interface CreateRewardFormData {
  title: string;
  cost: number;
  isEnabled: boolean;
  prompt?: string;
  backgroundColor?: string;
  isUserInputRequired: boolean;
  isMaxPerStreamEnabled: boolean;
  maxPerStream?: number;
  isMaxPerUserPerStreamEnabled: boolean;
  maxPerUserPerStream?: number;
  isGlobalCooldownEnabled: boolean;
  globalCooldownSeconds?: number;
  shouldRedemptionsSkipRequestQueue: boolean;
}

// Данные формы для редактирования награды
export interface EditRewardFormData {
  title?: string;
  cost?: number;
  isEnabled?: boolean;
  prompt?: string;
  backgroundColor?: string;
  isUserInputRequired?: boolean;
  isMaxPerStreamEnabled?: boolean;
  maxPerStream?: number;
  isMaxPerUserPerStreamEnabled?: boolean;
  maxPerUserPerStream?: number;
  isGlobalCooldownEnabled?: boolean;
  globalCooldownSeconds?: number;
  shouldRedemptionsSkipRequestQueue?: boolean;
}

// Фильтры для поиска наград
export interface RewardsFilters {
  searchTerm: string;
  isEnabled: boolean | null;
  costRange: {
    min: number;
    max: number;
  };
  hasUserInput: boolean | null;
}

// Статистика наград
export interface RewardsStatistics {
  totalRewards: number;
  enabledRewards: number;
  disabledRewards: number;
  totalCost: number;
  averageCost: number;
}

// Типы для действий с наградами
export type RewardAction = "view" | "edit" | "delete" | "sync" | "toggle";

// Интерфейс для контекста наград
export interface ChannelRewardsContextType {
  state: ChannelRewardsPageState;
  actions: {
    loadRewards: () => Promise<void>;
    loadLocalRewards: () => Promise<void>;
    createReward: (data: ChannelRewardRecord) => Promise<void>;
    updateReward: (id: string, data: UpdateCustomRewardDto) => Promise<void>;
    deleteReward: (id: string) => Promise<void>;
    syncRewards: () => Promise<void>;
    setCurrentView: (view: ChannelRewardsView) => void;
    setSelectedReward: (reward: ChannelRewardRecord | null) => void;
  };
}
