export type Player = {
  name: string;
  sponsor: string;
  score: number;
  tag: string;
  flag: string;
  final: string; // "winner", "loser", "none"
};

export type MetaInfo = {
  title: string;
  fightRule: string;
};

export type ScoreboardState = {
  player1: Player;
  player2: Player;
  meta: MetaInfo;
  colors: ColorPreset;
  isVisible: boolean; // Новое поле для управления видимостью
  animationDuration?: number; // Время анимации в миллисекундах
  layout?: LayoutSettings; // Настройки макета
};

// Типы с timestamp для отслеживания времени изменений
export type PlayerWithTimestamp = Player & {
  _lastEdit?: number;
  _receivedAt?: number;
};

export type MetaInfoWithTimestamp = MetaInfo & {
  _lastEdit?: number;
  _receivedAt?: number;
};

export type ColorInfoWIthTimestamp = ColorPreset & {
  _lastEdit?: number;
  _receivedAt?: number;
};

export type ScoreboardStateWithTimestamp = {
  player1: PlayerWithTimestamp;
  player2: PlayerWithTimestamp;
  meta: MetaInfoWithTimestamp;
  _receivedAt?: number;
};

export type ColorPreset = {
  name: string;
  mainColor: string; // Основной цвет для тегов и неонового свечения
  playerNamesColor: string; // Цвет имен игроков
  tournamentTitleColor: string; // Цвет названия турнира
  fightModeColor: string; // Цвет режима драки
  scoreColor: string; // Цвет счета
  backgroundColor: string; // Цвет фона всех дивов
  borderColor: string; // Цвет обводки всех дивов
};

export const defaultPreset: ColorPreset = {
  name: "Default",
  mainColor: "#3F00FF",
  playerNamesColor: "#ffffff",
  tournamentTitleColor: "#3F00FF",
  fightModeColor: "#3F00FF",
  scoreColor: "#ffffff",
  backgroundColor: "#23272f",
  borderColor: "#3F00FF",
};

// Типы для настроек макета
export type LayoutSettings = {
  // Позиционирование
  headerTop: number;
  headerLeft: number;
  playersTop: number;
  playersLeft: number;
  playersRight: number;

  // Размеры
  headerHeight: number;
  headerWidth: number;
  playerBarHeight: number;
  playerBarWidth: number;
  scoreSize: number;
  flagSize: number;

  // Отступы
  spacing: number;
  padding: number;

  // Видимость элементов
  showHeader: boolean;
  showFlags: boolean;
  showSponsors: boolean;
  showTags: boolean;
};

export const defaultLayout: LayoutSettings = {
  // Позиционирование
  headerTop: 0,
  headerLeft: 50,
  playersTop: 0,
  playersLeft: 0,
  playersRight: 0,

  // Размеры
  headerHeight: 20,
  headerWidth: 400,
  playerBarHeight: 80,
  playerBarWidth: 500,
  scoreSize: 60,
  flagSize: 24,

  // Отступы
  spacing: 16,
  padding: 16,

  // Видимость
  showHeader: true,
  showFlags: true,
  showSponsors: true,
  showTags: true,
};
