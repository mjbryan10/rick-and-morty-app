import {
  Character,
  ApiInfo,
  CharactersAPIResponse,
  ApiQuery,
} from '@/types/Interfaces';
import {
  Module, ActionContext, ActionTree, MutationTree,
} from 'vuex';
import { RootState } from '../types';
import {
  fetchCharactersByPage,
  fetchCharactersByQuery,
  fetchDataByUrl,
} from '../helpers';

// Module State
class ModuleState {
  isLoading = false;

  error = '';

  info: ApiInfo | null = null;

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
    state.info = null;
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
  requestSuccess(state, payload: CharactersAPIResponse) {
    state.isLoading = false;
    state.results = payload.results;
    state.info = payload.info;
  },
};

// Module Actions
const actions = {
  /**
   * Loads a page of characters from the Rick and Morty API.
   * Uses an optional page paramater, will load first page if not provided.
   *
   * Toggles loading status before and after the request.
   * @requires serverStatus The serverStatus string field from the global store.
   * @param ActionContext
   * @param id Number ID for the character in the database.
   */
  async loadCharactersByPage(
    { commit }: ActionContext<ModuleState, RootState>,
    page?: number,
  ): Promise<void> {
    commit('setIsLoadingGlobal', null, { root: true });
    commit('setIsLoading');
    fetchCharactersByPage(page)
      .then((result: CharactersAPIResponse) => {
        if (result.error) throw new Error('invalid request');
        commit('requestSuccess', result);
        commit('setServerStatus', 'OK');
      })
      .catch((error: any) => {
        commit('requestFailure', error.toString());
        if (error.message === 'invalid request') {
          commit('setServerStatus', 'warning');
        } else {
          commit('setServerStatus', 'offline');
        }
      })
      .finally(() => {
        commit('setIsNotLoadingGlobal', null, { root: true });
      });
  },

  async loadCharactersByUrl(
    { commit }: ActionContext<ModuleState, RootState>,
    url: string,
  ): Promise<void> {
    commit('setIsLoadingGlobal', null, { root: true });
    commit('setIsLoading');
    fetchDataByUrl<CharactersAPIResponse>(url)
      .then((result) => {
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

  async loadCharactersByQuery(
    { commit }: ActionContext<ModuleState, RootState>,
    query: ApiQuery,
  ): Promise<void> {
    commit('setIsLoadingGlobal', null, { root: true });
    commit('setIsLoading');
    fetchCharactersByQuery(query)
      .then((result: CharactersAPIResponse) => {
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
const CharactersModule: Module<ModuleState, any> = {
  namespaced: true,
  state: new ModuleState(),
  mutations,
  actions,
};
export default CharactersModule;
