// SignalR типы
// Этот файл содержит типы для SignalR соединений

export interface SignalRConnection {
  connectionId: string;
  isConnected: boolean;
}

export interface SignalRMessage {
  type: string;
  data: any;
}

export interface SignalRHub {
  name: string;
  methods: string[];
}

// Базовые типы для SignalR хабов
export interface ScoreboardHub {
  updateScoreboard: (data: any) => void;
  getScoreboard: () => Promise<any>;
}

export interface SoundRequestHub {
  requestSound: (data: any) => void;
  getQueue: () => Promise<any>;
}

export interface TelegramusHub {
  sendMessage: (data: any) => void;
  getMessages: () => Promise<any>;
}

export interface TunaHub {
  updateMusic: (data: any) => void;
  getCurrentTrack: () => Promise<any>;
} 