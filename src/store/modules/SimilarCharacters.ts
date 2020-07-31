import {
  Module, ActionContext, ActionTree, MutationTree,
} from 'vuex';
import { Character } from '@/types/Interfaces';
import { RootState } from '../types';
import { fetchDataByUrl } from '../helpers';

/**
 * Module State
 */
class ModuleState {
  /**
   * Boolean field to inform if the data is in the process of possible change.
   */
  isLoading = false;

  /**
   * String field that provides further information regarding a failed API request.
   */
  error = '';

  /**
   * An array of Rick and Morty Characters.
   */
  results: Character[] = [];
}

/**
 * Module mutations
 */
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

/**
 * Module Actions
 */
const actions = {
  /**
   * Loads an Episode from the Rick and Morty API by url.
   *
   * Toggles module loading  before and after the request.
   *
   * Updates root serverStatus depending on the type of result.
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
      .catch((error: Error) => {
        commit('requestFailure', error.toString());
        if (error.message === 'invalid request') {
          commit('setServerStatus', 'warning', { root: true });
        } else {
          commit('setServerStatus', 'offline', { root: true });
        }
      });
  },
} as ActionTree<ModuleState, RootState>;

/**
 * A Vuex Module for a an array of similar characters from the Rick and Morty API.
 *
 * Characters share episode information.
 */
const SimilarCharactersModule: Module<ModuleState, RootState> = {
  namespaced: true,
  state: new ModuleState(),
  mutations,
  actions,
};
export default SimilarCharactersModule;
