<template>
  <div v-if="!loading">
    <h2>{{ character.name }}</h2>
    <img :src="character.image" :alt="character.name" />
    <h4>
      {{ character.species }} <span v-if="character.type">({{ character.type }})</span>
    </h4>
    <h3>First Episode:</h3>
    <EpisodeInfo v-if="character.episode.length" :url="character.episode[0]" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Character, Episode } from '@/types/Interfaces';
import EpisodeInfo from './EpisodeInfo.vue';

interface State {
  loading: boolean;
  error: string;
  character: ApiResponse | null;
  firstEpisode: ApiResponse | null;
}
type ApiResponse = Character | Episode;
const CharacterProfile = Vue.extend({
  name: 'CharacterProfile',
  props: {
    id: Number,
  },
  components: {
    EpisodeInfo,
  },
  data(): State {
    return {
      loading: true,
      error: '',
      character: null,
      firstEpisode: null,
    };
  },
  created() {
    this.loading = true;
    const charUrl = `https://rickandmortyapi.com/api/character/${this.id}`;
    this.fetchDataByUrl(charUrl)
      .then((res) => {
        this.character = res;
        const firstEpisodeUrl = res.episode[0];
        this.fetchDataByUrl(firstEpisodeUrl).then((result) => {
          this.firstEpisode = result;
        });
        this.loading = false;
      })
      .catch((error) => {
        this.error = error.toString();
      });
  },
  methods: {
    /**
     * Async function that returns the API result as a promise.
     * Returns an object containing Character properties.
     */
    async fetchCharacterById(id: number): Promise<ApiResponse> {
      const uri = `https://rickandmortyapi.com/api/character/${id}`;
      const response = await fetch(uri);
      return response.json();
    },
    /**
     * Async function that returns the API result as a promise.
     * Returns an object containing Character properties.
     */
    async fetchDataByUrl(url: string): Promise<ApiResponse> {
      const response = await fetch(url);
      return response.json();
    },
  },
});
export default CharacterProfile;
</script>

<style scoped lang="scss"></style>
