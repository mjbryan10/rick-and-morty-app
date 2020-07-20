<template>
  <div id="app">
    <div class="app-shell">
      <HeaderBar />
      <AppScreen />
      <Navigation />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Navigation from '@/components/Navigation.vue';
import HeaderBar from '@/components/HeaderBar.vue';
import AppScreen from '@/components/AppScreen.vue';
import store from '@/store';

const App = Vue.extend({
  name: 'App',
  store,
  components: {
    Navigation,
    HeaderBar,
    AppScreen,
  },
});
export default App;
</script>

<style lang="scss">
@font-face {
  font-family: 'get_schwifty';
  /* Fonts moved to public folder to allow preload */
  src: url('/assets/fonts/get_schwifty-webfont.woff2') format('woff2'),
    url('/assets/fonts/get_schwifty-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
html,
body {
  box-sizing: border-box;
  margin: 0;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}
.hidden {
  display: none;
}
#app {
  font-family: 'letter-gothic-std', 'Helvetica Neue', Helvetica, Arial,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  h1 {
    font-family: 'get_schwifty', 'letter-gothic-std', 'Helvetica Neue',
      Helvetica, Arial, sans-serif;
  }
  background-color: #f5f5f5;
  padding: 0;
  margin: 0;
}
.app-shell {
  background-color: #c3bdba;
  width: 100vw;
  min-height: 100vh;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
  border-radius: 5px;
}
/*
* Generic button style for global use
 */
.app-btn {
  display: block;
  padding: 1em;
  border-radius: 5rem;
  border: 2px black solid;
  text-decoration: none;
  color: inherit;
  background-color: rgba(#c3bdba, 0.1);
  transition: 0.2s ease-out;
  cursor: pointer;
  &:hover,
  &:active {
    background-color: rgba(#242222, 0.7);
    color: white;
  }
  &:disabled {
    // TODO
    cursor: auto;
    /* background-color: grey; */
    color: rgba(#c3bdba, 0.7);
    border: rgba(#c3bdba, 0.7) 2px solid;
    &:hover {
      color: rgba(#c3bdba, 1);
      background-color: rgba(#c3bdba, 0.1);
    }
  }
}
/*
* Transitions
*@See https://vuejs.org/v2/guide/transitions.html
*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.zoom-enter-active {
  /* Easing calculations @See https://easings.net/#easeOutBack */
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.zoom-leave-active {
  transition: all 0.3s ease-out;
}
.zoom-enter,
.zoom-leave-to {
  transform: scale(0.5);
  opacity: 0;
}
</style>
