<template>
  <div class="profile-container" v-if="!loading">
    <CharacterCard class="profile-card" :character="character" />
    <CharacterInfo class="profile-card" :character="character" />
    <h2>{{ character.name }}</h2>
    <div class="profile-card">
      <h3>First Episode:</h3>
      <EpisodeInfo
        v-if="character.episode.length"
        :url="character.episode[0]"
        :characterId="character.id"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Character, Episode } from '@/types/Interfaces';
import CharacterCard from './CharacterCard.vue';
import EpisodeInfo from './EpisodeInfo.vue';
import CharacterInfo from './CharacterInfo.vue';

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
    CharacterCard,
    CharacterInfo,
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

<style scoped lang="scss">
  .profile-container {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }
  .profile-card {
    width: 300px;
  }
</style>
