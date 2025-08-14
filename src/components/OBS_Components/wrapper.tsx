import { TelegramusHubSignalRHubWrapper } from "@/shared/api";

// Компонент-обертка для OBS компонентов
export const OBSComponentWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <>
    <TelegramusHubSignalRHubWrapper>
      <div className="obs-component">{children}</div>
    </TelegramusHubSignalRHubWrapper>
  </>
);
