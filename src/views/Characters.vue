<template>
  <div>
    <h1 v-if="Object.keys(this.$route.query).length === 1">
      Characters with the {{ Object.keys(this.$route.query)[0] }} of
      {{ Object.values(this.$route.query)[0] }}
    </h1>
    <h1 v-else-if="Object.keys(this.$route.query).length > 1">
      Search Results
    </h1>
    <h1 v-else>
      All Characters
    </h1>
    <CharactersByQueryParam />
  </div>
</template>
<script lang="ts">
import CharactersByQueryParam from '@/components/CharactersByQueryParam.vue';

/**
 * Vue page view for the characters route.
 * Renders content depending on the query parameters.
 */
export default {
  name: 'Characters',
  components: {
    CharactersByQueryParam,
  },
};
</script>
<style scoped lang="scss"></style>
