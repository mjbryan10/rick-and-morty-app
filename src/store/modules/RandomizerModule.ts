import {
  Module, ActionContext, ActionTree, MutationTree,
} from 'vuex';
import { RootState } from '../types';
import { fetchCharactersByPage } from '../helpers';

/**
 * Module State
 */
class ModuleState {
  /**
   * An incrementable numeric key to aid with page reloading
   * through shallow comparison.
   */
  randomizerKey = 0;

  /**
   * A random ID number for a character in the Rick and Morty API Database.
   */
  randomId: number | null = null;

  /**
   * A string value of error generated during API Request.
   */
  error = '';
}

/**
 * Module mutations
 */
const mutations: MutationTree<ModuleState> = {
  /**
   * Increments the randomizerKey value by amount given, or 1 if none given.
   *
   * Allows for shallow comparison for same route re-renders.
   * @param state The store state
   * @param payload Numeric value to increment by, defaults to 1.
   */
  incrementRandomizerKey(state: ModuleState, payload = 1) {
    state.randomizerKey += payload;
  },
  /**
   * Sets the randomId field to the provided numeric value.
   * @param state ModuleState
   * @param payload A randomly generated number.
   */
  setRandomId(state: ModuleState, payload: number) {
    state.randomId = payload;
  },
  /**
   * Sets the error value to the provided string.
   * @param state ModuleState
   * @param payload String value to set the error value to.
   */
  setErrorValue(state: ModuleState, payload: string) {
    state.error = payload;
  },
};

/**
 * Module Actions
 */
const actions = {
  /**
   * Fetches the total amount of results from the API,
   * then choses a random number from the count.
   *
   * Note: Ids are incrementally related to results count.
   */
  async populateRandomId({
    commit,
  }: ActionContext<ModuleState, RootState>): Promise<void> {
    // Reset current error values
    commit('setErrorValue', '');
    commit('setErrorValue', '', { root: true });
    fetchCharactersByPage()
      .then((result) => {
        const numOfCharacters = result.info.count;
        // Generates a random number from the length of entries.
        const randomNum = Math.floor(Math.random() * numOfCharacters);
        // Sets the state to the generated number
        commit('setRandomId', randomNum);
      })
      .catch((error: Error) => {
        // Set error values both on module and root.
        commit('setErrorValue', error.toString());
        commit('setErrorValue', error.toString(), { root: true });
      });
  },
} as ActionTree<ModuleState, RootState>;

/**
 * A Vuex Module for handling randomizer state logic.
 */
const RandomizerModule: Module<ModuleState, RootState> = {
  namespaced: true,
  state: new ModuleState(),
  mutations,
  actions,
};
export default RandomizerModule;
