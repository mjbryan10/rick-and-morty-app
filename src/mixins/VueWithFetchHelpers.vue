<script lang="ts">
import Vue from 'vue';
import { Character, CharactersAPIResponse } from '@/types/Interfaces';
import { FetchHelperState } from './types';

const VueWithFetchHelpers = Vue.extend({
  data(): FetchHelperState {
    return {
      error: '',
      loading: true,
      fetchResult: null,
    };
  },
  methods: {
    /**
     * Async function that returns the API result as a promise.
     * Returns type RnmApiResponse = CharactersAPIResponse | Episode | Location | Character;
     * @param url string value of the url from which you wish to fetch API data from.
     */
    async fetchDataByUrl<T>(url: string): Promise<T> {
      const response = await fetch(url);
      return response.json();
    },
    /**
     * Async function that returns the API result as a promise.
     * Returns an object containing Character properties and values.
     * @param id String or number value to retrieve character by id.
     */
    async fetchCharacterById(id: number | string): Promise<Character> {
      const uri = `https://rickandmortyapi.com/api/character/${id}`;
      const response = await fetch(uri);
      return response.json();
    },
    /**
     * Fetches a page of characters or the first page if no page number given.
     * @param pageNum Optional number parameter, that when given will define which page
     * to fetch.
     */
    async fetchCharactersByPage(pageNum?: number): Promise<CharactersAPIResponse> {
      let url = 'https://rickandmortyapi.com/api/character/';
      if (pageNum) url += `?page=${pageNum}`;
      const response = await fetch(url);
      return response.json();
    },
  },
});
export default VueWithFetchHelpers;
</script>
