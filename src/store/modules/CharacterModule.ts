import {
  Module, ActionContext, ActionTree, MutationTree,
} from 'vuex';
import { Character } from '@/types/Interfaces';
import { RootState } from '../types';
import { fetchCharacterById } from '../helpers';

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
   * The result of a successful API request. A Character from the Rick and Morty API.
   */
  result: Character | null = null;
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
  requestSuccess(state, payload: Character | null) {
    state.isLoading = false;
    state.result = payload;
  },
};

/**
 * Module Actions
 */
const actions = {
  /**
   * Loads a character from the Rick and Morty API by ID and populates the state.
   *
   * Toggles both root and module loading statuses before and after the request.
   *
   * Updates root serverStatus depending on the type of result.
   * @param ActionContext Destructured properties from the action context.
   * @param id Number ID for the character in the database.
   */
  async loadCharacterById(
    { commit }: ActionContext<ModuleState, RootState>,
    id: number,
  ): Promise<void> {
    commit('setIsLoading');
    commit('setIsLoadingGlobal', null, { root: true });
    fetchCharacterById(id)
      .then((result: Character) => {
        if (result.error) throw new Error('invalid request');
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
      })
      .finally(() => {
        commit('setIsNotLoadingGlobal', null, { root: true });
      });
  },
} as ActionTree<ModuleState, RootState>;

/**
 * A Vuex Module for a single Character from the Rick and Morty API.
 */
const CharacterModule: Module<ModuleState, RootState> = {
  namespaced: true,
  state: new ModuleState(),
  mutations,
  actions,
};
export default CharacterModule;
