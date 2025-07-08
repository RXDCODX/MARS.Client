import { ReactNode } from "react";

// Если нужны провайдеры, импортируйте их здесь
// import { SignalRContextProvider } from "../../app";
// import { Provider as StoreProvider } from "zustand";

interface HighliteMessageStorybookWrapperProps {
  children: ReactNode;
}

export default function HighliteMessageStorybookWrapper({
  children,
}: HighliteMessageStorybookWrapperProps) {
  return (
    // Добавьте провайдеры, если нужно
    // <SignalRContextProvider>
    //   <StoreProvider>
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
    //   </StoreProvider>
    // </SignalRContextProvider>
  );
}
