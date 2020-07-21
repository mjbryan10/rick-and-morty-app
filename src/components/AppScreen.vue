<template>
  <div class="app-screen" ref="appScreen">
    <main>
      <transition name="zoom">
        <Spinner v-if="this.$store.state.isLoading" />
      </transition>
      <router-view
        :key="$route.name + ($route.params.id || '')"
        style="{minHeight: 80vh}"
      />
    </main>
    <Footer v-if="!this.$store.state.isLoading" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Footer from '@/components/Footer.vue';
import Spinner from '@/components/Spinner.vue';

const AppScreen = Vue.extend({
  name: 'AppScreen',
  components: {
    Footer,
    Spinner,
  },
  computed: {
    /**
     * Returns the Vuex store isLoading property.
     */
    storeIsLoading() {
      return this.$store.state.isLoading;
    },
  },
  watch: {
    /**
     * Uses storeIsLoading computed property to watch for
     * changes on the Vuex isLoading property.
     *
     * If global state isLoading, then it resets the scrollTop of
     * the app-screen.
     * This helps improve UX, with smoother transitions between loads.
     */
    storeIsLoading() {
      if (this.$store.state.isLoading) {
        const appScreen = this.$refs.appScreen as HTMLDivElement;
        appScreen.scrollTop = 0;
      }
    },
  },
});
export default AppScreen;
</script>

<style lang="scss">
.app-screen {
  position: relative;
  background-color: rgba(#7d9f53, 0.86);
  height: 85vh;
  overflow-y: scroll;
  overflow-x: hidden;
  border-radius: 5px;
  border: solid black 2px;
  text-align: center;
  padding-bottom: 50px;
  z-index: 1;
  main {
    min-height: 85vh;
    margin-bottom: 25vh;
  }
}
@media screen and (max-height: 740px) {
  .app-screen {
    max-height: 80vh;
    main {
      min-height: 80vh;
    }
  }
}
</style>
