<template>
  <div class="app-screen" ref="appScreen">
    <main>
      <transition name="zoom">
        <Spinner v-if="this.$store.state.isLoadingGlobal" />
      </transition>
      <router-view
        :key="$route.name + ($route.params.id || '')"
        style="{minHeight: 80vh}"
      />
    </main>
    <Footer v-if="!this.$store.state.isLoadingGlobal" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Footer from '@/components/Footer.vue';
import Spinner from '@/components/Spinner.vue';

/**
 * The main compnent for displaying the application renders.
 *
 * Displays the spinner, when the global isLoading is true.
 * Otherwise displays the current router-view and footer underneath.
 */
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
    storeIsLoading(): boolean {
      return this.$store.state.isLoadingGlobal;
    },
  },
  watch: {
    /**
     * Uses storeIsLoading computed property to watch for
     * changes on the Vuex isLoadingGlobal property.
     *
     * If global state isLoadingGlobal, then it resets the scrollTop of
     * the app-screen.
     * This helps improve UX, with smoother transitions between loads.
     */
    storeIsLoading() {
      if (this.$store.state.isLoadingGlobal) {
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
  padding-left: 8px; //Added padding to balance page from custom scroller
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
