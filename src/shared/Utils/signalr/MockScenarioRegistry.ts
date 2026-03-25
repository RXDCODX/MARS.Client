/**
 * Реестр mock сценариев для различных хабов
 * Позволяет быстро генерировать типовые события для тестирования
 */

export interface IMockScenario<T = any> {
  /** Уникальный ID сценария */
  id: string;

  /** Рабочее название */
  name: string;

  /** Описание что происходит */
  description?: string;

  /** Данные для события */
  data: T;
}

type ScenarioMap = Record<string, Record<string, IMockScenario>>;

class MockScenarioRegistry {
  private scenarios: ScenarioMap = {};

  /**
   * Зарегистрировать коллекцию сценариев для события
   */
  registerScenarios(
    hubName: string,
    eventName: string,
    scenarios: IMockScenario[]
  ): void {
    if (!this.scenarios[hubName]) {
      this.scenarios[hubName] = {};
    }

    const key = this.getKey(eventName);
    scenarios.forEach(scenario => {
      if (!this.scenarios[hubName][key]) {
        this.scenarios[hubName][key] = {};
      }
      this.scenarios[hubName][key][scenario.id] = scenario;
    });
  }

  /**
   * Получить все сценарии для события
   */
  getScenarios(hubName: string, eventName: string): IMockScenario[] {
    const key = this.getKey(eventName);
    const eventScenarios = this.scenarios[hubName]?.[key] || {};
    return Object.values(eventScenarios);
  }

  /**
   * Получить конкретный сценарий
   */
  getScenario(hubName: string, eventName: string, scenarioId: string): IMockScenario | null {
    const key = this.getKey(eventName);
    return this.scenarios[hubName]?.[key]?.[scenarioId] ?? null;
  }

  /**
   * Получить все события для хаба
   */
  getHubEvents(hubName: string): string[] {
    return Object.keys(this.scenarios[hubName] || {}).map(key => key.split(':')[0]);
  }

  private getKey(eventName: string): string {
    return eventName;
  }
}

export const mockScenarioRegistry = new MockScenarioRegistry();
