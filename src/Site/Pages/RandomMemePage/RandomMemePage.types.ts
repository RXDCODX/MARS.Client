import {
  CreateMemeOrderDto,
  CreateMemeTypeDto,
  MemeOrderDto,
  MemeTypeDto,
} from "@/shared/api/http-clients/data-contracts";

// Типы для состояния страницы
export interface RandomMemePageState {
  // Состояние для типов мемов
  memeTypes: MemeTypeDto[];
  selectedMemeType: MemeTypeDto | null;
  memeTypeForm: Partial<CreateMemeTypeDto>;

  // Состояние для заказов мемов
  memeOrders: MemeOrderDto[];
  selectedMemeOrder: MemeOrderDto | null;
  memeOrderForm: Partial<CreateMemeOrderDto>;

  // Общее состояние
  activeTab: "types" | "orders";
  isLoading: boolean;
  isSubmitting: boolean;
  error: string;
  searchQuery: string;
  showCreateModal: boolean;
  showEditModal: boolean;
  showDeleteModal: boolean;
}

// Типы для навигации
export type RandomMemeView =
  | "list"
  | "type-details"
  | "order-details"
  | "create-type"
  | "create-order"
  | "edit-type"
  | "edit-order";

export interface NavigationState {
  currentView: RandomMemeView;
  selectedType: MemeTypeDto | null;
  selectedOrder: MemeOrderDto | null;
  isLoading: boolean;
  error: string;
}

// Типы для фильтров и поиска
export interface MemeTypeFilters {
  searchQuery?: string;
  sortBy?: "name" | "id" | "folderPath";
  sortOrder?: "asc" | "desc";
}

export interface MemeOrderFilters {
  searchQuery?: string;
  typeId?: number;
  sortBy?: "order" | "filePath" | "id";
  sortOrder?: "asc" | "desc";
}

// Типы для статистики
export interface RandomMemeStats {
  totalTypes: number;
  totalOrders: number;
  totalFiles: number;
  typesByFolder: { [folderPath: string]: number };
}

// Типы для пропсов компонентов
export interface RandomMemeListProps {
  memeTypes: MemeTypeDto[];
  memeOrders: MemeOrderDto[];
  isLoading: boolean;
  error: string;
  searchQuery: string;
  activeTab: "types" | "orders";
  onSearchChange: (query: string) => void;
  onTabChange: (tab: "types" | "orders") => void;
  onTypeSelect: (type: MemeTypeDto) => void;
  onOrderSelect: (order: MemeOrderDto) => void;
  onCreateClick: () => void;
  onRefresh: () => void;
}

export interface RandomMemeDetailsProps {
  memeType?: MemeTypeDto;
  memeOrder?: MemeOrderDto;
  isLoading: boolean;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onRefresh: () => void;
}

export interface RandomMemeFormProps {
  memeType?: MemeTypeDto;
  memeOrder?: MemeOrderDto;
  memeTypes?: MemeTypeDto[]; // Для выбора типа при создании/редактировании заказа
  isSubmitting: boolean;
  mode: "create" | "edit";
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  onCancel: () => void;
}

// Типы для модальных окон
export interface DeleteConfirmationModalProps {
  isOpen: boolean;
  itemType: "type" | "order";
  itemName: string;
  isDeleting: boolean;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

// Типы для форм
export interface MemeTypeFormData {
  name: string;
  folderPath: string;
}

export interface MemeOrderFormData {
  filePath: string;
  memeTypeId: number;
  order: number;
}

// Union тип для всех форм
export type MemeFormData = MemeTypeFormData | MemeOrderFormData;

// Типы для API ответов
export interface RandomMemeApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Типы для ошибок
export interface RandomMemeError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// Типы для событий
export type MemeTypeSelectHandler = (type: MemeTypeDto) => void;
export type MemeOrderSelectHandler = (order: MemeOrderDto) => void;
export type SearchChangeHandler = (query: string) => void;
export type TabChangeHandler = (tab: "types" | "orders") => void;
export type FormSubmitHandler<T> = (data: T) => Promise<void>;
