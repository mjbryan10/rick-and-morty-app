<template>
  <div v-if="!loading">
    <h3>{{ episode.episode }}: {{ episode.name }}</h3>
    <p>Aired: {{ episode.air_date }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Episode } from '@/types/Interfaces';

interface State {
  loading: boolean;
  error: string;
  episode: Episode | null;
}
const CharacterProfile = Vue.extend({
  name: 'CharacterProfile',
  props: {
    url: String,
  },
  data(): State {
    return {
      loading: true,
      error: '',
      episode: null,
    };
  },
  created() {
    this.loading = true;
    this.fetchEpisodeByUrl(this.url)
      .then((result) => {
        this.episode = result;
        this.loading = false;
      })
      .catch((error) => {
        this.error = error.toString();
      });
  },
  methods: {
    /**
     * Async function that returns the API result as a promise.
     * Returns an object containing Episode properties and values.
     */
    async fetchEpisodeByUrl(url: string): Promise<Episode> {
      const response = await fetch(url);
      return response.json();
    },
  },
});
export default CharacterProfile;
</script>

<style scoped lang="scss"></style>
