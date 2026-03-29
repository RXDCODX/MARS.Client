import { EnvironmentVariable as EnvironmentVariableClient } from "../http-clients/EnvironmentVariable";
import { RootState as RootStateClient } from "../http-clients/RootState";
import type {
  EnvironmentVariable,
  OperationResult,
  RootState,
  SetEnvironmentVariableRequest,
  UpdateValueRequest,
} from "../types/data-contracts";

class AppConfigurationService {
  private readonly rootStateClient = new RootStateClient();
  private readonly environmentVariableClient = new EnvironmentVariableClient();

  async getRootStates(): Promise<OperationResult<RootState[]>> {
    const response = await this.rootStateClient.rootStateList();
    return response.data as OperationResult<RootState[]>;
  }

  async getRootState(name: string): Promise<OperationResult<RootState>> {
    const response = await this.rootStateClient.rootStateDetail(name);
    return response.data as OperationResult<RootState>;
  }

  async upsertRootState(data: RootState): Promise<OperationResult<RootState>> {
    const response = await this.rootStateClient.rootStateCreate(data);
    return response.data as OperationResult<RootState>;
  }

  async updateRootStateValue(
    name: string,
    data: UpdateValueRequest
  ): Promise<OperationResult<RootState>> {
    const response = await this.rootStateClient.rootStateValuePartialUpdate(
      name,
      data
    );
    return response.data as OperationResult<RootState>;
  }

  async deleteRootState(name: string): Promise<OperationResult> {
    const response = await this.rootStateClient.rootStateDelete(name);
    return response.data as OperationResult;
  }

  async getEnvironmentVariables(): Promise<
    OperationResult<EnvironmentVariable[]>
  > {
    const response =
      await this.environmentVariableClient.environmentVariableList();
    return response.data as OperationResult<EnvironmentVariable[]>;
  }

  async upsertEnvironmentVariable(
    data: SetEnvironmentVariableRequest
  ): Promise<OperationResult> {
    const response =
      await this.environmentVariableClient.environmentVariableCreate(data);
    return response.data as OperationResult;
  }

  async deleteEnvironmentVariable(key: string): Promise<OperationResult> {
    const response =
      await this.environmentVariableClient.environmentVariableDelete(key);
    return response.data as OperationResult;
  }

  async reloadEnvironmentVariables(): Promise<OperationResult> {
    const response =
      await this.environmentVariableClient.environmentVariableReloadCreate();
    return response.data as OperationResult;
  }
}

export const appConfigurationService = new AppConfigurationService();
