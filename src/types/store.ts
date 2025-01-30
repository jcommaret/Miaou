export interface ConfigurationState {
  isConfigured: boolean;
  setIsConfigured: (value: boolean) => void;
  checkConfiguration: () => Promise<void>;
}
