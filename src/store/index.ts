import Vue from 'vue';
import Vuex, { MutationTree } from 'vuex';
import { RootState, ServerStatusTypes } from './types';
import CharacterModule from './modules/CharacterModule';
import CharactersModule from './modules/CharactersModule';
import EpisodeModule from './modules/EpisodeModule';

Vue.use(Vuex);

class State implements RootState {
  randomizerKey = 0;

  isLoadingGlobal = false;

  serverStatus: ServerStatusTypes = 'warning';

  error = '';
}

const mutations = {
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
   * Sets the boolean isLoadingGlobal state to true.
   * @param state The store state.
   */
  setIsLoadingGlobal(state: RootState) {
    state.isLoadingGlobal = true;
  },
  /**
   * Sets the boolean isLoadingGlobal state to false.
   * @param state The store state.
   */
  setIsNotLoadingGlobal(state: RootState) {
    setTimeout(() => {
      state.isLoadingGlobal = false;
    }, 1000);
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
} as MutationTree<State>;

export default new Vuex.Store({
  state: new State(),
  mutations,
  modules: {
    character: CharacterModule,
    characters: CharactersModule,
    episode: EpisodeModule,
  },
});
