<template>
  <div id="app">
    <div class="app-shell">
      <HeaderBar :clickHandler="toggleInfoMode" />
      <div class="app-screen">
        <transition name="zoom">
          <Spinner v-if="this.$store.state.isLoading" />
        </transition>
        <router-view v-bind:class="{ hidden: infoToggled }" />
        <Footer v-if="infoToggled" />
      </div>
      <Navigation />
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import Navigation from '@/components/Navigation.vue';
import HeaderBar from '@/components/HeaderBar.vue';
import Footer from '@/components/Footer.vue';
import Spinner from '@/components/Spinner.vue';
import store from '@/store';

const App = Vue.extend({
  name: 'App',
  store,
  components: {
    Navigation,
    HeaderBar,
    Footer,
    Spinner,
  },
  data() {
    return {
      infoToggled: false,
    };
  },
  methods: {
    toggleInfoMode() {
      this.infoToggled = !this.infoToggled;
    },
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
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */
.hidden {
  display: none;
}
#app {
  font-family: 'letter-gothic-std', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
.app-screen {
  position: relative;
  background-color: rgba(#7d9f53, 0.86);
  height: 85vh;
  max-width: 600px;
  overflow-y: scroll;
  overflow-x: hidden;
  border-radius: 5px;
  border: solid black 2px;
  text-align: center;
  padding-bottom: 50px;
}
@media screen and (max-height: 740px) {
  .app-screen {
    height: 80vh;
  }
}
.info-btn {
  font-family: inherit;
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
