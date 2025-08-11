// Автоматически сгенерированный индексный файл
// Импорты утилит конфигурации
export * from "./api-config";
export * from "./data-contracts";
export * from "./SignalR/types/signalr-types"; // Волосатые ножки

// Импорты клиентов контроллеров
export { Commands } from "./http/Commands";
export { Framedata } from "./http/Framedata";
export { FramedataChanges } from "./http/FramedataChanges";
export { ServiceManager } from "./http/ServiceManager";

// Импорты SignalR клиентов
export { ScoreboardHubSignalRContext } from "./SignalR/ScoreboardHub/SignalRContext";
export { SoundRequestHubSignalRContext } from "./SignalR/SoundRequestHub/SignalRContext";
export { TelegramusHubSignalRContext } from "./SignalR/TelegramusHub/SignalRContext";
export { TunaHubSignalRContext } from "./SignalR/TunaHub/SignalRContext";
export { default as ScoreboardHubSignalRHubWrapper } from "./SignalR/ScoreboardHub/SignalRHubWrapper";
export { default as SoundRequestHubSignalRHubWrapper } from "./SignalR/SoundRequestHub/SignalRHubWrapper";
export { default as TelegramusHubSignalRHubWrapper } from "./SignalR/TelegramusHub/SignalRHubWrapper";
export { default as TunaHubSignalRHubWrapper } from "./SignalR/TunaHub/SignalRHubWrapper";
