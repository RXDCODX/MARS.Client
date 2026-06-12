import { TelegramusHubSignalRHubWrapper } from "@/shared/api";

// Компонент-обертка для OBS компонентов
export const OBSComponentWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <>
    <TelegramusHubSignalRHubWrapper>
      <div className="obs-component" data-testid="obs-component-wrapper">
        {children}
      </div>
    </TelegramusHubSignalRHubWrapper>
  </>
);
