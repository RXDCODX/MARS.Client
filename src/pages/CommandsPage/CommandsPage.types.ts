export interface CommandsPageProps {
  // Пока что пустой, но может понадобиться в будущем
}

export interface CommandExecutionState {
  isExecuting: boolean;
  result: string;
  error: string;
}

export interface ParameterState {
  [parameterName: string]: string;
}

export interface CommandsState {
  userCommands: any[];
  adminCommands: any[];
  selectedCommand: any | null;
  commandParameters: any[];
  isLoading: boolean;
  activeTab: "user" | "admin";
}
