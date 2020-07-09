<template>
  <div v-bind:class="{intro: appIntro}" ref="landing-container">
    <div v-if="appIntro">
      <RickAndMortyHeader />
      <h2>Your database of Rick and Morty characters</h2>
      <button @click="initiateApp" class="start-btn">
        Click here to start!
      </button>
    </div>
    <div v-else>
      <CharacterDisplayCase />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import RickAndMortyHeader from './RickAndMortyHeader.vue';
import CharacterDisplayCase from './CharacterDisplayCase.vue';

interface State {
  appIntro: boolean;
}

const LandingPage = Vue.extend({
  name: 'LandingPage',

  components: {
    RickAndMortyHeader,
    CharacterDisplayCase,
  },
  data(): State {
    return {
      appIntro: true,
    };
  },
  methods: {
    /**
     * Iniates the app, removing the titling and loads characters component
     */
    initiateApp(): void {
      this.appIntro = false;
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
.start-btn {
  border-radius: 10px;
}
</style>
