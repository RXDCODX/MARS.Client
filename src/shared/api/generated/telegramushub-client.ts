// SignalR клиент для TelegramusHub
import { HttpClient } from './types';
import { getApiBaseUrl } from './api-config';

// Экспортируем только методы для этого хаба
export class TelegramusHubService {
  private httpClient: HttpClient;

  constructor(baseURL?: string) {
    // Используем переданный baseURL или получаем из переменных окружения в рантайме
    const apiBaseUrl = baseURL || getApiBaseUrl();
    this.httpClient = new HttpClient({ baseUrl: apiBaseUrl });
  }

  // SignalR методы будут добавлены вручную или через другой генератор
  // Пока что используем основной клиент
  getHttpClient() {
    return this.httpClient;
  }
}
