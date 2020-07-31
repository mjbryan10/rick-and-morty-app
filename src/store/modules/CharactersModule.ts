import {
  RootState,
  ModuleCharacterContext,
} from '../types';
import { Character, ApiInfo } from '@/types/Interfaces';
import { Module, ActionContext, Action, ActionTree, MutationTree } from 'vuex';

// https://stackoverflow.com/a/59041769/12873927
//Module State
class ModuleState {
    isLoading: boolean = false;
    error:string = '';
    info: ApiInfo | null = null;
    result: Character[] = [];
}
//Module Actions
const actions = <ActionTree<ModuleState, RootState>>{
  /**
   * Loads a character from the Rick and Morty API by ID.
   * Toggles loading status before and after the request.
   * 
   * @requires serverStatus The serverStatus string field from the global store.
   * @param ActionContext
   * @param id Number ID for the character in the database.
   */
  async loadCharacters(
    { commit }: ActionContext<ModuleState, RootState>,
    id: number,
  ): Promise<void> {
    commit('setIsLoading');
    const uri = `https://rickandmortyapi.com/api/character/${id}`;
    const response = await fetch(uri);
    await response
      .json()
      .then((result: Character) => {
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
      });
  },
};
//Module Mutations
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
    setTimeout(() => {
      state.isLoading = false;
      state.error = payload;
    }, 1000);
  },
  /**
   * Updates the state upon a successful API request.
   * Uses a time out to ease request demand and for smoother UX.
   * Sets state result with the result from the API request.
   * @param state The module state
   * @param payload The character result from the API request
   */
  requestSuccess(state, payload: Character[]) {
    setTimeout(() => {
      state.isLoading = false;
      state.result = payload;
    }, 1000);
  },
};
// Module compiled
const CharacterModule: Module<ModuleState, any> = {
  state: new ModuleState(),
  mutations,
  actions,
};
export default CharacterModule;
