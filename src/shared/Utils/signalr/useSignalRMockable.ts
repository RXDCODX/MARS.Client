/**
 * Хук для использования SignalRInterceptor в компонентах
 * Автоматически интегрируется с react-signalr Context и обрабатывает mock-режим
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { signalRInterceptorRegistry, ISignalRInterceptor } from './SignalRInterceptor';
import { mockScenarioRegistry } from './MockScenarioRegistry';

export interface UseSignalRMockableOptions {
  /** Автоматически включить mock режим если в Storybook */
  autoMockInStorybook?: boolean;
}

/**
 * Хук для работы с перехватчиком сообщений
 *
 * @example
 * const { interceptor, mockMode, setMockMode, emitScenario } = useSignalRMockable('ScoreboardHub');
 *
 * // Подписаться на событие
 * useEffect(() => {
 *   interceptor?.on('ReceiveState', (data) => {
 *     console.log('State received:', data);
 *   });
 * }, [interceptor]);
 *
 * // Эмулировать событие
 * const handleTest = () => {
 *   emitScenario('ReceiveState', 'scenario1');
 * };
 */
export function useSignalRMockable(
  hubName: string,
  options: UseSignalRMockableOptions = {}
) {
  const { autoMockInStorybook = true } = options;
  const [mockMode, setMockModeState] = useState(false);
  const interceptorRef = useRef<ISignalRInterceptor | null>(null);

  // Инициализировать перехватчик
  useEffect(() => {
    const interceptor = signalRInterceptorRegistry.register(hubName);
    interceptorRef.current = interceptor;

    // Автоматически включить mock режим в Storybook
    if (autoMockInStorybook && isInStorybook()) {
      interceptor.setMockMode(true);
      setMockModeState(true);
    }

    return () => {
      // При размонтировании отключить mock режим
      interceptor.setMockMode(false);
    };
  }, [hubName, autoMockInStorybook]);

  // Обновить состояние mock режима
  const setMockMode = useCallback((enabled: boolean) => {
    if (interceptorRef.current) {
      interceptorRef.current.setMockMode(enabled);
      setMockModeState(enabled);
    }
  }, []);

  // Эмулировать событие по сценарию
  const emitScenario = useCallback(
    async (eventName: string, scenarioId: string) => {
      if (!interceptorRef.current) return;

      const scenario = mockScenarioRegistry.getScenario(hubName, eventName, scenarioId);
      if (!scenario) {
        console.warn(`Scenario not found: ${hubName}.${eventName}.${scenarioId}`);
        return;
      }

      await interceptorRef.current.emit(eventName, scenario.data);
    },
    [hubName]
  );

  // Эмулировать событие с произвольными данными
  const emitEvent = useCallback(
    async <T = any>(eventName: string, data: T) => {
      if (!interceptorRef.current) return;
      await interceptorRef.current.emit(eventName, data);
    },
    []
  );

  // Получить все доступные события и их сценарии
  const getAvailableScenarios = useCallback(
    (eventName: string) => {
      return mockScenarioRegistry.getScenarios(hubName, eventName);
    },
    [hubName]
  );

  return {
    /** Экземпляр перехватчика */
    interceptor: interceptorRef.current,

    /** Включен ли режим мокирования */
    mockMode,

    /** Установить молуку режима */
    setMockMode,

    /** Эмулировать событие по зарегистрированному сценарию */
    emitScenario,

    /** Эмулировать событие с произвольными данными */
    emitEvent,

    /** Получить все сценарии для события */
    getAvailableScenarios,

    /** Получить список зарегистрированных событий */
    getRegisteredEvents: () => interceptorRef.current?.getRegisteredEvents() ?? [],
  };
}

/**
 * Проверить, находимся ли в Storybook
 */
export function isInStorybook(): boolean {
  return import.meta.env.STORYBOOK === true || 
         (typeof window !== 'undefined' && window?.__STORYBOOK_globals__?.RENDERER);
}
