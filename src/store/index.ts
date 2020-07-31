import Vue from 'vue';
import Vuex, { MutationTree } from 'vuex';
import { RootState, ServerStatusTypes } from './types';
import CharacterModule from './modules/CharacterModule';
import CharactersModule from './modules/CharactersModule';
import EpisodeModule from './modules/EpisodeModule';
import SimilarCharactersModule from './modules/SimilarCharacters';
import RandomizerModule from './modules/RandomizerModule';

Vue.use(Vuex);

class State implements RootState {
  isLoadingGlobal = false;

  serverStatus: ServerStatusTypes = 'warning';

  error = '';
}

const mutations = {
  /**
   * Sets the error value to the provided string.
   * @param state ModuleState
   * @param payload String value to set the error value to.
   */
  setErrorValue(state: RootState, payload: string) {
    state.error = payload;
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
    similarCharacters: SimilarCharactersModule,
    randomizer: RandomizerModule,
  },
});
