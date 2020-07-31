<template>
  <div class="details">
    <h1>Randomizer</h1>
    <CharacterProfile v-if="randomId" :id="randomId" />
  </div>
</template>

<script lang="ts">
import VueWithFetchHelpers from '@/mixins/VueWithFetchHelpers.vue';
import CharacterProfile from '@/components/CharacterProfile.vue';

/**
 * Vue component for displaying a random character from the Rick and Morty API.
 */
const Randomizer = VueWithFetchHelpers.extend({
  name: 'Randomizer',
  components: {
    CharacterProfile,
  },
  /**
   * On component creation generates a random ID for passing to the CharacterProfile.
   */
  created() {
    this.$store.dispatch('randomizer/populateRandomId');
  },
  computed: {
    /**
     * A randomId for passing to the CharacterProfile.
     */
    randomId(): number | null {
      return this.$store.state.randomizer.randomId;
    },
  },
});
export default Randomizer;
</script>
<style lang="scss">
h1 {
  font-family: 'get_schwifty';
}
</style>
