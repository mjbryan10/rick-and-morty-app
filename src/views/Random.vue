<template>
  <div>
    <Randomizer :key="this.$store.state.randomizerKey" />
  </div>
</template>

<script>
import Randomizer from '@/components/Randomizer.vue';

export default {
  name: 'Random',
  components: {
    Randomizer,
  },
};
</script>
<style lang="scss"></style>
