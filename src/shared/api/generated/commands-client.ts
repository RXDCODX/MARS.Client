// Клиент для контроллера Commands
import {
  CommandInfo,
  CommandParameterInfo,
  ContentType,
  HttpClient,
} from "./types";

// Экспортируем только методы для этого контроллера
export class CommandsService {
  private httpClient: HttpClient;

  constructor(baseURL?: string) {
    this.httpClient = new HttpClient({ baseUrl: baseURL });
  }

  // Получить пользовательские команды
  async getUserCommands(): Promise<string> {
    const response = await this.httpClient.request({
      path: `/api/commands/user`,
      method: "GET",
    });
    return response.data;
  }

  // Получить админские команды
  async getAdminCommands(): Promise<string> {
    const response = await this.httpClient.request({
      path: `/api/commands/admin`,
      method: "GET",
    });
    return response.data;
  }

  // Получить пользовательские команды для платформы
  async getUserCommandsForPlatform(platform: string): Promise<string[]> {
    const response = await this.httpClient.request({
      path: `/api/commands/user/platform/${platform}`,
      method: "GET",
    });
    return response.data;
  }

  // Получить админские команды для платформы
  async getAdminCommandsForPlatform(platform: string): Promise<string[]> {
    const response = await this.httpClient.request({
      path: `/api/commands/admin/platform/${platform}`,
      method: "GET",
    });
    return response.data;
  }

  // Получить детальную информацию о пользовательских командах для платформы
  async getUserCommandsInfoForPlatform(
    platform: string,
  ): Promise<CommandInfo[]> {
    const response = await this.httpClient.request({
      path: `/api/commands/user/platform/${platform}/info`,
      method: "GET",
    });
    return response.data;
  }

  // Получить детальную информацию об админских командах для платформы
  async getAdminCommandsInfoForPlatform(
    platform: string,
  ): Promise<CommandInfo[]> {
    const response = await this.httpClient.request({
      path: `/api/commands/admin/platform/${platform}/info`,
      method: "GET",
    });
    return response.data;
  }

  // Получить параметры команды
  async getCommandParameters(
    commandName: string,
  ): Promise<CommandParameterInfo[]> {
    const response = await this.httpClient.request({
      path: `/api/commands/${commandName}/parameters`,
      method: "GET",
    });
    return response.data;
  }

  // Выполнить команду
  async executeCommand(commandName: string, input: string): Promise<string> {
    const response = await this.httpClient.request({
      path: `/api/commands/${commandName}/execute`,
      method: "POST",
      body: input,
      type: ContentType.Text,
    });
    return response.data;
  }

  // Методы будут добавлены вручную или через другой генератор
  // Пока что используем основной клиент
  getHttpClient() {
    return this.httpClient;
  }
}
