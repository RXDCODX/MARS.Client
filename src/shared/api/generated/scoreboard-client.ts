// Клиент для контроллера Scoreboard
import { HttpClient } from "./types";

// Экспортируем только методы для этого контроллера
export class ScoreboardService {
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
