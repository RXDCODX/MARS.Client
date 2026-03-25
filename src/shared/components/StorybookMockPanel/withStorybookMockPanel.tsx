/**
 * HOC для автоматического добавления StorybookMockPanel к компоненту
 * Упрощает использование mock-панели в stories
 */

import React from "react";

import { useSignalRMockable } from "@/shared/utils/signalr";

import { StorybookMockPanel } from "../StorybookMockPanel";

export interface WithMockPanelOptions {
  /** Название хаба SignalR */
  hubName: string;

  /** Доп. класс для панели */
  panelClassName?: string;

  /** Автоматически включить mock режим */
  autoMock?: boolean;
}

/**
 * HOC который оборачивает компонент и добавляет mock-панель внизу
 *
 * @example
 * export default withStorybookMockPanel(MyComponent, {
 *   hubName: 'ScoreboardHub',
 *   autoMock: true,
 * });
 */
export function withStorybookMockPanel<P extends object>(
  Component: React.ComponentType<P>,
  options: WithMockPanelOptions
) {
  return function WithMockPanelWrapper(props: P) {
    const { hubName, panelClassName, autoMock = true } = options;
    const { emitScenario, mockMode, setMockMode } = useSignalRMockable(
      hubName,
      {
        autoMockInStorybook: autoMock,
      }
    );

    return (
      <>
        <Component {...props} />
        <StorybookMockPanel
          hubName={hubName}
          mockMode={mockMode}
          onEmitScenario={emitScenario}
          className={panelClassName}
        />
      </>
    );
  };
}
