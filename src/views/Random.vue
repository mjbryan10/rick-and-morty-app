<template>
  <div>
    <Randomizer :key="this.$store.state.randomizer.randomizerKey" />
  </div>
</template>

<script>
import Randomizer from '@/components/Randomizer.vue';

/**
 * Vue page view for the random route.
 * Renders a random character from the Rick and Morty API.
 */
export default {
  name: 'Random',
  components: {
    Randomizer,
  },
};
</script>
<style lang="scss"></style>
