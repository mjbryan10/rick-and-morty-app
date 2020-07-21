import Vue from 'vue';
import Vuex from 'vuex';
import { StoreState } from './types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    randomizerKey: 0,
    isLoading: false,
    serverStatus: 'warning',
  },
  mutations: {
    /**
     * Increments the randomizerKey value by amount given, or 1 if none given.
     *
     * Allows for shallow comparison for same route re-renders.
     * @param state The store state
     * @param payload Numeric value to increment by, defaults to 1.
     */
    incrementRandomizerKey(state: StoreState, payload = 1) {
      state.randomizerKey += payload;
    },
    /**
     * Toggles the boolean isLoading state.
     * @param state The store state.
     */
    toggleIsLoading(state: StoreState) {
      state.isLoading = !state.isLoading;
    },
    /**
     * Sets the serverStatus to the presented status.
     * @param state state The store state
     * @param payload String value to set the serverStatus to. Must be `'OK'` ,
     * `'warning'` or `'offline'`
     */
    setServerStatus(state: StoreState, payload: 'OK' | 'warning' | 'offline') {
      if (payload === 'OK' || payload === 'warning' || payload === 'offline') {
        state.serverStatus = payload;
      }
    },
  },
  actions: {},
  modules: {},
});
