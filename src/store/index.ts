import Vue from 'vue';
import Vuex from 'vuex';
import { Character } from '@/types/Interfaces';
import { RootState } from './types';
import CharacterModule from './modules/CharacterModule';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    randomizerKey: 0,
    isLoading: false,
    serverStatus: 'warning',
    error: '',
    character: null,
    characters: [],
    episode: null,
    similarCharacters: [],
  },
  mutations: {
    /**
     * Increments the randomizerKey value by amount given, or 1 if none given.
     *
     * Allows for shallow comparison for same route re-renders.
     * @param state The store state
     * @param payload Numeric value to increment by, defaults to 1.
     */
    incrementRandomizerKey(state: RootState, payload = 1) {
      state.randomizerKey += payload;
    },
    /**
     * Sets the boolean isLoading state to true.
     * @param state The store state.
     */
    setIsLoading(state: RootState) {
      state.isLoading = true;
    },
    /**
     * Sets the boolean isLoading state to false.
     * @param state The store state.
     */
    setIsNotLoading(state: RootState) {
      state.isLoading = false;
    },
    /**
     * Updates the global store error state to the provided string.
     * @param state The store state.
     * @param payload A string representation of the current request error.
     */
    updateErrorString(state: RootState, payload: string) {
      state.error = payload;
    },
    updateCharacter(state: RootState, payload: Character | null = null) {
      state.character = payload;
    },
    /**
     * Sets the serverStatus to the presented status.
     * @param state state The store state
     * @param payload String value to set the serverStatus to. Must be `'OK'` ,
     * `'warning'` or `'offline'`
     */
    setServerStatus(state: RootState, payload: 'OK' | 'warning' | 'offline') {
      if (payload === 'OK' || payload === 'warning' || payload === 'offline') {
        state.serverStatus = payload;
      }
    },
  },
  actions: {},
  modules: {
    character: CharacterModule,
  },
});
