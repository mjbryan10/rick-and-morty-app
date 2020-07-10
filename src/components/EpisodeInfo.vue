<template>
  <div v-if="episode">
    <h3>{{ episode.episode }}: {{ episode.name }}</h3>
    <p>Aired: {{ episode.air_date }}</p>
  </div>
</template>

<script lang="ts">
import VueWithFetchHelpers from '@/mixins/VueWithFetchHelpers.vue';
import { RnmApiResponse } from '@/types/Interfaces';

const CharacterProfile = VueWithFetchHelpers.extend({
  name: 'CharacterProfile',
  props: {
    url: String,
  },
  computed: {
    /**
     * Getter that returns the Episode data from the fetchResult
     * or null if there is none.
     */
    episode(): RnmApiResponse | null {
      return this.fetchResult;
    },
  },
  created() {
    this.loading = true;
    this.fetchDataByUrl(this.url)
      .then((result) => {
        this.fetchResult = result;
        this.loading = false;
      })
      .catch((error) => {
        this.error = error.toString();
      });
  },
});
export default CharacterProfile;
</script>

<style scoped lang="scss"></style>
