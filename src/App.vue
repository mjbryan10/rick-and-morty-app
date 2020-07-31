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

/**
 * Primary vue render for the application.
 */
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
/*
* Global Styles
*/
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
/* Generic button style */
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
  &:disabled,
  &:disabled:hover {
    // fades button out and resets cursor, to show is non-reactive.
    cursor: auto;
    background-color: rgba(#c3bdba, 0.1);
    color: rgba(#242222, 0.3);
    border: rgba(#242222, 0.3) 2px solid;
  }
}
/*
* Scroll Bars Styles
* Microsoft Edge currently not supported
*/
/* Chrome/Safari */
// Only applies on non-mobile sizes, otherwise interferes with page display.
@media screen and (min-width: 568px) {
  $size: 5px;
  // Width
  *::-webkit-scrollbar {
    width: $size;
  }
  // Track
  *::-webkit-scrollbar-track {
    width: $size;
  }
  // Handle
  *::-webkit-scrollbar-thumb {
    background: #827b7f;
    width: 4px;
    border-radius: 4px;
    /* Gives spacing
  * @see https://stackoverflow.com/a/21684424/12873927
  */
    border: 1px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
  }
  // Handle on hover
  *::-webkit-scrollbar-thumb:hover,
  *::-webkit-scrollbar-thumb:active {
    background: #827b7f;
  }
  // Button
  *::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }
  // Corner
  *::-webkit-scrollbar-corner {
    background-color: transparent;
  }
}
/* Firefox */
* {
  scrollbar-width: thin; /* "auto" or "thin"  */
  scrollbar-color: #827b7f rgba(0, 0, 0, 0); /* scroll thumb & track */
}

/*
* Component Styles
*/
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
  min-width: 250px;
  margin: 0 auto;
  padding: 1rem;
  border-radius: 5px;
}

/*
* Transitions
* @See https://vuejs.org/v2/guide/transitions.html
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
