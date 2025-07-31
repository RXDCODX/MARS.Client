// Клиент для контроллера SoundBar
import { HttpClient } from './types';

// Экспортируем только методы для этого контроллера
export class SoundBarService {
  private httpClient: HttpClient;

  constructor(baseURL?: string) {
    this.httpClient = new HttpClient({ baseUrl: baseURL });
  }

  // Методы будут добавлены вручную или через другой генератор
  // Пока что используем основной клиент
  getHttpClient() {
    return this.httpClient;
  }
}
