// Типы для фреймдаты Tekken

import { Move, TekkenCharacter } from "@/shared/api/data-contracts";

// Типы для состояния компонента
export interface FramedataPageState {
  characters: TekkenCharacter[];
  selectedCharacter: TekkenCharacter | null;
  selectedMove: Move | null;
  isLoading: boolean;
  error: string;
  showCharacterModal: boolean;
  showMoveModal: boolean;
  isEditing: boolean;
  searchTerm: string;
  activeTab: "characters" | "moves";
}

// Новые типы для многоуровневой навигации
export type PageView = "characters" | "character-details" | "moves" | "edit-character";

export interface NavigationState {
  currentView: PageView;
  selectedCharacter: TekkenCharacter | null;
  isLoadingCharacters: boolean;
  isLoadingMoves: boolean;
  error: string;
}

// Типы для форм
export interface CharacterFormData {
  name: string;
  linkToImage: string;
  pageUrl: string;
  description: string;
  strengths: string[];
  weaknesess: string[];
}

export interface MoveFormData {
  command: string;
  stanceCode: string;
  stanceName: string;
  heatEngage: boolean;
  heatSmash: boolean;
  powerCrush: boolean;
  throw: boolean;
  homing: boolean;
  tornado: boolean;
  heatBurst: boolean;
  requiresHeat: boolean;
  hitLevel: string;
  damage: string;
  startUpFrame: string;
  blockFrame: string;
  hitFrame: string;
  counterHitFrame: string;
  notes: string;
}

// Типы для фильтров поиска
export interface MoveSearchFilters {
  characterName?: string;
  stanceCode?: string;
  heatEngage?: boolean;
  powerCrush?: boolean;
  throw?: boolean;
  homing?: boolean;
}
