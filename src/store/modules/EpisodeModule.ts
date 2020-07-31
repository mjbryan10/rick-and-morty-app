import {
  Module, ActionContext, ActionTree, MutationTree,
} from 'vuex';
import { Episode } from '@/types/Interfaces';
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
   * The result of a successful API request, an Episode from the Rick and Morty API.
   */
  result: Episode | null = null;
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
    state.result = null;
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
  requestSuccess(state, payload: Episode | null) {
    state.isLoading = false;
    state.result = payload;
  },
};

/**
 * Module Actions
 */
const actions = {
  /**
   * Loads an Episode from the Rick and Morty API by url.
   *
   * Toggles module loading before and after the request.
   *
   * Updates root serverStatus depending on result.
   * @param ActionContext
   * @param url The url for which to retrieve the Episode from the database.
   */
  async loadEpisode(
    { commit }: ActionContext<ModuleState, RootState>,
    url: string,
  ): Promise<void> {
    commit('setIsLoading');
    fetchDataByUrl<Episode>(url)
      .then((result) => {
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
      });
  },
} as ActionTree<ModuleState, RootState>;

/**
 * A Vuex Module for a single Episode from the Rick and Morty API.
 */
const EpisodeModule: Module<ModuleState, RootState> = {
  namespaced: true,
  state: new ModuleState(),
  mutations,
  actions,
};
export default EpisodeModule;
