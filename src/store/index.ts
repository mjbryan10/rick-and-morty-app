import Vue from 'vue';
import Vuex from 'vuex';
import { StoreState } from './types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    randomizerKey: 0,
    isLoading: false,
  },
  mutations: {
    incrementRandomizerKey(state: StoreState, payload = 1) {
      state.randomizerKey += payload;
    },
    toggleIsLoading(state: StoreState) {
      state.isLoading = !state.isLoading;
    },
  },
  actions: {},
  modules: {},
});
