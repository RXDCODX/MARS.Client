// Клиент для контроллера Commands
import { HttpClient } from './types';
import { getApiBaseUrl } from './api-config';

// Экспортируем только методы для этого контроллера
export class CommandsService {
  private httpClient: HttpClient;

  constructor(baseURL?: string) {
    // Используем переданный baseURL или получаем из переменных окружения в рантайме
    const apiBaseUrl = baseURL || getApiBaseUrl();
    this.httpClient = new HttpClient({ baseUrl: apiBaseUrl });
  }

  // Методы будут добавлены вручную или через другой генератор
  // Пока что используем основной клиент
  getHttpClient() {
    return this.httpClient;
  }
}
