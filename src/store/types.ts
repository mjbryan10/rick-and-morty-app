/** The global Vuex store state */
export interface StoreState {
  /** Numeric value to allow re-rendering of same route with shallow comparison */
  randomizerKey: number;
  /** Boolean value to indicate if the app is busy with loading content */
  isLoading: boolean;
  /** String value to indicate the current status of the connection with the API */
  serverStatus: 'OK' | 'warning' | 'offline';
}
