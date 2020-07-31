/** The global Vuex store state */
export interface RootState {
  /** Boolean value to indicate if the app is busy with loading content */
  isLoadingGlobal: boolean;
  /** String value to indicate the current status of the connection with the API */
  serverStatus: ServerStatusTypes;
  /** String value to inform of any current errors */
  error: string;
}
/**
 * These are the possible string options for the serverStatus
 */
export type ServerStatusTypes = 'OK' | 'warning' | 'offline';
