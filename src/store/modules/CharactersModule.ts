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
   * Information regarding the API request, including pagination and result details.
   */
  info: ApiInfo | null = null;

  /**
   * An array of Rick and Morty characters retrieved from a successful API request.
   */
  results: Character[] = [];
}

/**
 * Module Mutations
 */
const mutations: MutationTree<ModuleState> = {
  /**
   * Sets the boolean isLoading state to true.
   *
   * Resets the other state values.
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

/**
 * Module Actions
 */
const actions = {
  /**
   * Loads a page of characters from the Rick and Morty API.
   * Uses an optional page paramater, which will load first page if not provided.
   *
   * Toggles both root and module loading statuses before and after the request.
   *
   * Updates the root serverStatus depending on request result.
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
      .catch((error: Error) => {
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
  /**
   * Loads an array of characters by the given url string.
   *
   * Toggles both root and module loading statuses before and after request.
   *
   * Updates root serverStatus depending on the type of result.
   * @param ActionContext Destructured properties from the action context.
   * @param url Required string url to load characters from the API.
   */
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
  /**
   * Retrieves characters from the Rick and Morty API database which match the query
   * terms.
   *
   * Toggles both root and module loading statuses before and after the request.
   *
   * Updates root serverStatus depending on the type of result.
   * @param ActionContext Destructured properties from the action context.
   * @param query Required string query for which to retrieve specified data from the
   * Rick and Morty API
   */
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

/**
 * A Vuex Module for a multiple Characters from the Rick and Morty API.
 */
const CharactersModule: Module<ModuleState, any> = {
  namespaced: true,
  state: new ModuleState(),
  mutations,
  actions,
};
export default CharactersModule;
