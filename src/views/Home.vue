<template>
  <div class="home">
    <LandingPage/>
  </div>
</template>

<script>
import LandingPage from '@/components/LandingPage.vue';

/**
 * Vue page view for the index landing page.
 */
export default {
  name: 'Home',
  components: {
    LandingPage,
  },
};
</script>
<style lang="scss">
</style>
