/**
 * Wrapper для SignalRContext с поддержкой перехватчика и мокирования
 * Позволяет подменять реальные события на мокированные в режиме mock
 */

import React, { useEffect } from "react";

import { signalRInterceptorRegistry } from "@/shared/utils/signalr/SignalRInterceptor";
import { isInStorybook } from "@/shared/utils/signalr/useSignalRMockable";

export interface SignalRMockWrapperProps {
  /** Название хаба */
  hubName: string;

  /** Контекст SignalR (из react-signalr) */
  context: any;

  /** Дочерние элементы */
  children: React.ReactNode;

  /** Список событий, которые нужно перехватить */
  eventsToIntercept: string[];

  /** Автоматически включить mock если в Storybook */
  autoMockInStorybook?: boolean;
}

/**
 * Обертка для перехвата SignalR событий
 *
 * Использование:
 * ```tsx
 * <SignalRMockWrapper
 *   hubName="ScoreboardHub"
 *   context={ScoreboardHubSignalRContext}
 *   eventsToIntercept={['ReceiveState', 'StateChanged']}
 * >
 *   {children}
 * </SignalRMockWrapper>
 * ```
 */
export function SignalRMockWrapper({
  hubName,
  context,
  children,
  eventsToIntercept,
  autoMockInStorybook = true,
}: SignalRMockWrapperProps) {
  // Инициализировать перехватчик
  useEffect(() => {
    const interceptor = signalRInterceptorRegistry.register(hubName);

    // Автоматически включить mock режим в Storybook
    if (autoMockInStorybook && isInStorybook()) {
      interceptor.setMockMode(true);
    }

    // Перехватить события через context.on()
    const originalOn = context.on;
    const wrappedOn = (eventName: string, callback: Function) => {
      // Зарегистрировать событие в перехватчике
      interceptor.on(eventName, async data => {
        if (interceptor.isMockMode()) {
          // В mock режиме вызывать мокированные данные
          await callback(data);
        }
      });

      // Вызвать оригинальный on() чтобы получать реальные события
      return originalOn?.call(context, eventName, callback);
    };

    context.on = wrappedOn;

    return () => {
      // Восстановить оригинальный метод
      context.on = originalOn;
      interceptor.setMockMode(false);
    };
  }, [hubName, context, autoMockInStorybook]);

  return <>{children}</>;
}
