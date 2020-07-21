<template>
  <div v-bind:class="{ intro: appIntro }" ref="landing-container">
    <div v-if="appIntro">
      <RickAndMortyHeader />
      <h2>Your database of Rick and Morty characters</h2>
      <button v-if="!isInitialising" @click="initiateApp" class="app-btn">
        Click here to start!
      </button>
      <span v-else>Initialising . . .</span>
    </div>
    <div v-else>
      <RickAndMortyHeader />
      <HomePageCharacters />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import RickAndMortyHeader from './RickAndMortyHeader.vue';
import HomePageCharacters from './HomePageCharacters.vue';

/** Local state for the component */
interface State {
  appIntro: boolean;
  isInitialising: boolean;
}

/**
 * Vue component for the initial page a user defaults to via index.
 */
const LandingPage = Vue.extend({
  name: 'LandingPage',

  components: {
    RickAndMortyHeader,
    HomePageCharacters,
  },
  data(): State {
    return {
      appIntro: true,
      isInitialising: false,
    };
  },
  methods: {
    /**
     * Iniates the app, removing the titling and loads characters component.
     * Also ensures the spinner images are downloaded for smoother UX.
     */
    initiateApp(): void {
      this.isInitialising = true;
      const preLoader = this.preLoadImages(
        '@/assets/images/portal.png',
        '@/assets/images/portal-inner.png',
      );
      preLoader.then(() => {
        this.appIntro = false;
        this.isInitialising = false;
      });
    },
    /**
     * Loads an image from the given url
     * @param {string} url The link for the image.
     */
    preLoadImg(url: string): void {
      const img = new Image();
      img.src = url;
    },
    /**
     * Asynchronous loader for multiple images.
     *
     * Takes and uknown amount of url strings as argument and loads them.
     * @param {array<string>} args Array of image urls.
     */
    async preLoadImages(...args: string[]): Promise<void> {
      if (!args.length) return;
      args.forEach((url) => this.preLoadImg(url));
    },
  },
});
export default LandingPage;
</script>

<style scoped lang="scss">
.intro {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}
.app-btn {
  margin: 0 auto;
}
</style>
