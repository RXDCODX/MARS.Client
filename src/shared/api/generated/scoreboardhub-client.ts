// SignalR клиент для ScoreboardHub
import { HttpClient } from './types';

// Экспортируем только методы для этого хаба
export class ScoreboardHubService {
  private httpClient: HttpClient;

  constructor(baseURL?: string) {
    this.httpClient = new HttpClient({ baseUrl: baseURL });
  }

  // SignalR методы будут добавлены вручную или через другой генератор
  // Пока что используем основной клиент
  getHttpClient() {
    return this.httpClient;
  }
}
