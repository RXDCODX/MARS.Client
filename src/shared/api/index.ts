// Автоматически сгенерированный индексный файл
// Импорты утилит конфигурации
export * from "./api-config";
export * from "./data-contracts";
export * from "./signalr/types/signalr-types"; // Волосатые ножки

// Импорты клиентов контроллеров
export { Commands } from "./http/Commands";
export { Framedata } from "./http/Framedata";
export { FramedataChanges } from "./http/FramedataChanges";
export { ServiceManager } from "./http/ServiceManager";

// Импорты SignalR клиентов
export { ScoreboardHubSignalRContext } from "./signalr/ScoreboardHub/SignalRContext";
export { SoundRequestHubSignalRContext } from "./signalr/SoundRequestHub/SignalRContext";
export { TelegramusHubSignalRContext } from "./signalr/TelegramusHub/SignalRContext";
export { TunaHubSignalRContext } from "./signalr/TunaHub/SignalRContext";
export { default as ScoreboardHubSignalRHubWrapper } from "./signalr/ScoreboardHub/SignalRHubWrapper";
export { default as SoundRequestHubSignalRHubWrapper } from "./signalr/SoundRequestHub/SignalRHubWrapper";
export { default as TelegramusHubSignalRHubWrapper } from "./signalr/TelegramusHub/SignalRHubWrapper";
export { default as TunaHubSignalRHubWrapper } from "./signalr/TunaHub/SignalRHubWrapper";
