import {
  Module, ActionContext, ActionTree, MutationTree,
} from 'vuex';
import { Character } from '@/types/Interfaces';
import { RootState } from '../types';
import { fetchDataByUrl } from '../helpers';

// https://stackoverflow.com/a/59041769/12873927
// Module State
class ModuleState {
  isLoading = false;

  error = '';

  results: Character[] = [];
}

// Module Mutations
const mutations: MutationTree<ModuleState> = {
  /**
   * Sets the boolean isLoading state to true.
   * @param state The store state.
   */
  setIsLoading(state) {
    state.isLoading = true;
    state.error = '';
    state.results = [];
  },
  /**
   * Updates the state in case of request error.
   * @param state The store state.
   * @param payload The error string related to the request failure.
   */
  requestFailure(state, payload: string) {
    state.isLoading = false;
    state.error = payload;
  },
  /**
   * Updates the state upon a successful API request.
   * @param state The module state
   * @param payload The character result from the API request
   */
  requestSuccess(state, payload: Character[]) {
    state.isLoading = false;
    state.results = payload;
  },
};

// Module Actions
const actions = {
  /**
   * Loads an Episode from the Rick and Morty API by url.
   * Toggles loading and server status before and after the request.
   *
   * Note: This does not affect the global loading field.
   * @param ActionContext
   * @param url The url for which to retrieve the Episode from the database.
   */
  async loadCharactersByIds(
    { commit }: ActionContext<ModuleState, RootState>,
    ids: number[],
  ): Promise<void> {
    commit('setIsLoading');
    const url = `https://rickandmortyapi.com/api/character/${ids.toString()}`;
    fetchDataByUrl<Character[]>(url)
      .then((result) => {
        if (!Array.isArray(result)) throw new Error('invalid request');
        commit('requestSuccess', result);
        commit('setServerStatus', 'OK', { root: true });
      })
      .catch((error: any) => {
        commit('requestFailure', error.toString());
        if (error.message === 'invalid request') {
          commit('setServerStatus', 'warning', { root: true });
        } else {
          commit('setServerStatus', 'offline', { root: true });
        }
      });
  },
} as ActionTree<ModuleState, RootState>;

// Module compiled
const SimilarCharactersModule: Module<ModuleState, RootState> = {
  namespaced: true,
  state: new ModuleState(),
  mutations,
  actions,
};
export default SimilarCharactersModule;
