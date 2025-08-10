import {
  CommandInfo,
  CommandInfoAvailablePlatformsEnum,
  CommandParameterInfo,
} from "@/shared/api";

export interface CommandExecutionState {
  isExecuting: boolean;
  result: string;
  error: string;
}

export interface ParameterState {
  [parameterName: string]: string;
}

export interface CommandsState {
  userCommands: CommandInfo[];
  adminCommands: CommandInfo[];
  selectedCommand: CommandInfo | null;
  commandParameters: CommandParameterInfo[];
  isLoading: boolean;
  activeTab: "user" | "admin";
}

export type PlatformType = CommandInfoAvailablePlatformsEnum;
