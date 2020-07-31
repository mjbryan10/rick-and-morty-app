import {
  Module, ActionContext, ActionTree, MutationTree,
} from 'vuex';
import { Character } from '@/types/Interfaces';
import { RootState } from '../types';

// https://stackoverflow.com/a/59041769/12873927
// Module State
class ModuleState {
  isLoading = false;

  error = '';

  result: Character | null = null;
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
  },
  /**
   * Updates the state in case of request error.
   * Uses a time out to ease request demand and for smoother UX.
   * Sets the boolean isLoading state to false.
   * Sets error to the provided string.
   * @param state The store state.
   * @param payload The error string related to the request failure.
   */
  requestFailure(state, payload: string) {
    state.isLoading = false;
    state.error = payload;
  },
  /**
   * Updates the state upon a successful API request.
   * Uses a time out to ease request demand and for smoother UX.
   * Sets state result with the result from the API request.
   * @param state The module state
   * @param payload The character result from the API request
   */
  requestSuccess(state, payload: Character | null) {
    state.isLoading = false;
    state.result = payload;
  },
};

// Module Actions
const actions = {
  /**
   * Loads a character from the Rick and Morty API by ID.
   * Toggles loading status before and after the request.
   *
   * @requires serverStatus The serverStatus string field from the global store.
   * @param ActionContext
   * @param id Number ID for the character in the database.
   */
  async loadCharacter(
    { commit }: ActionContext<ModuleState, RootState>,
    id: number,
  ): Promise<void> {
    commit('setIsLoading');
    commit('setIsLoadingGlobal', null, { root: true });
    const uri = `https://rickandmortyapi.com/api/character/${id}`;
    const response = await fetch(uri);
    await response
      .json()
      .then((result: Character) => {
        if (result.error) throw new Error('invalid request');
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
      })
      .finally(() => {
        commit('setIsNotLoadingGlobal', null, { root: true });
      });
  },
} as ActionTree<ModuleState, RootState>;

// Module compiled
const CharacterModule: Module<ModuleState, RootState> = {
  namespaced: true,
  state: new ModuleState(),
  mutations,
  actions,
};
export default CharacterModule;
