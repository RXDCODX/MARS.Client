import { MemeOrderDto } from "@/shared/api/http-clients/data-contracts";

// Пропсы для простого списка очереди заказов (Orders Queue)
export interface RandomMemeListProps {
  memeOrders: MemeOrderDto[];
  isLoading: boolean;
  error: string;
  onRefresh: () => void;
}

// Вспомогательные типы (оставлены на будущее расширение)
export type RandomMemeView = "list";

export interface NavigationState {
  currentView: RandomMemeView;
  selectedOrder: MemeOrderDto | null;
  isLoading: boolean;
  error: string;
}
