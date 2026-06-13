import { useLayoutEffect } from "react";

import { TelegramusHubSignalRHubWrapper } from "@/shared/api";

// Компонент-обертка для OBS компонентов
export const OBSComponentWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useLayoutEffect(() => {
    const prevBg = document.body.style.getPropertyValue("background-color");
    const prevImportant = document.body.style.getPropertyPriority("background-color");
    document.body.style.setProperty("background-color", "transparent", "important");

    return () => {
      document.body.style.setProperty("background-color", prevBg, prevImportant || undefined);
    };
  }, []);

  return (
    <TelegramusHubSignalRHubWrapper>
      <div className="obs-component" data-testid="obs-component-wrapper">
        {children}
      </div>
    </TelegramusHubSignalRHubWrapper>
  );
};
