/**
 * Панель управления мокированием для Storybook
 * Автоматически появляется внизу когда компонент используется в mock-режиме
 */

import React, { useEffect, useState } from "react";

import { mockScenarioRegistry } from "../signalr/MockScenarioRegistry";
import { signalRInterceptorRegistry } from "../signalr/SignalRInterceptor";
import styles from "./StorybookMockPanel.module.scss";

export interface StorybookMockPanelProps {
  /** Название хаба для эмуляции */
  hubName: string;

  /** Состояние mock режима */
  mockMode?: boolean;

  /** Слушатель для эмуляции события */
  onEmitScenario?: (eventName: string, scenarioId: string) => Promise<void>;

  /** CSS класс для кастомизации */
  className?: string;
}

/**
 * Компонент панели mock-управления
 */
export const StorybookMockPanel = React.memo(
  ({
    hubName,
    mockMode = false,
    onEmitScenario,
    className,
  }: StorybookMockPanelProps) => {
    const [events, setEvents] = useState<string[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<string>("");
    const [scenarios, setScenarios] = useState<
      Array<{ id: string; name: string }>
    >([]);
    const [selectedScenario, setSelectedScenario] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    // Загрузить список событий
    useEffect(() => {
      const interceptor = signalRInterceptorRegistry.get(hubName);
      if (!interceptor) return;

      const registeredEvents = interceptor.getRegisteredEvents();
      setEvents(registeredEvents);
      if (registeredEvents.length > 0) {
        setSelectedEvent(registeredEvents[0]);
      }
    }, [hubName, mockMode]);

    // Загрузить сценарии для выбранного события
    useEffect(() => {
      if (!selectedEvent) {
        setScenarios([]);
        return;
      }

      const eventScenarios = mockScenarioRegistry.getScenarios(
        hubName,
        selectedEvent
      );
      setScenarios(
        eventScenarios.map(s => ({
          id: s.id,
          name: s.name,
        }))
      );

      if (eventScenarios.length > 0 && !selectedScenario) {
        setSelectedScenario(eventScenarios[0].id);
      }
    }, [selectedEvent, hubName, selectedScenario]);

    // Обработка нажатия кнопки эмуляции
    const handleEmit = async () => {
      if (!selectedEvent || !selectedScenario) return;

      setIsLoading(true);
      try {
        if (onEmitScenario) {
          await onEmitScenario(selectedEvent, selectedScenario);
        } else {
          const interceptor = signalRInterceptorRegistry.get(hubName);
          if (interceptor) {
            const scenario = mockScenarioRegistry.getScenario(
              hubName,
              selectedEvent,
              selectedScenario
            );
            if (scenario) {
              await interceptor.emit(selectedEvent, scenario.data);
            }
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Не показывать если нет событий
    if (events.length === 0) {
      return (
        <div
          className={`${styles.mockPanel} ${styles.empty} ${className || ""}`}
        >
          <span className={styles.label}>Нет событий для мокирования</span>
        </div>
      );
    }

    return (
      <div className={`${styles.mockPanel} ${className || ""}`}>
        <div className={styles.content}>
          <div className={styles.label}>Mock: {hubName}</div>

          <select
            value={selectedEvent}
            onChange={e => setSelectedEvent(e.target.value)}
            className={styles.select}
            disabled={isLoading}
          >
            <option value="" disabled>
              Выберите событие...
            </option>
            {events.map(event => (
              <option key={event} value={event}>
                {event}
              </option>
            ))}
          </select>

          {scenarios.length > 0 && (
            <select
              value={selectedScenario}
              onChange={e => setSelectedScenario(e.target.value)}
              className={styles.select}
              disabled={isLoading}
            >
              <option value="" disabled>
                Выберите сценарий...
              </option>
              {scenarios.map(scenario => (
                <option key={scenario.id} value={scenario.id}>
                  {scenario.name}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={handleEmit}
            disabled={!selectedEvent || !selectedScenario || isLoading}
            className={styles.emitButton}
          >
            {isLoading ? "Отправка..." : "Отправить"}
          </button>
        </div>
      </div>
    );
  }
);

StorybookMockPanel.displayName = "StorybookMockPanel";
