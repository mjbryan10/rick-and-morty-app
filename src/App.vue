<template>
  <div id="app">
    <div class="app-shell">
      <HeaderBar :clickHandler="toggleInfoMode" />
      <div class="app-screen">
        <Spinner v-if="this.$store.state.isLoading" />
        <Footer v-if="infoToggled" />
        <router-view v-bind:class="{hidden: infoToggled}" />
      </div>
      <Navigation />
    </div>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
  </div>
</template>
<script>
import Vue from 'vue';
import Navigation from '@/components/Navigation.vue';
import HeaderBar from '@/components/HeaderBar.vue';
import Footer from '@/components/Footer.vue';
import Spinner from '@/components/Spinner.vue';
import store from '@/store/index';

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
  src: url('./assets/fonts/get_schwifty-webfont.woff2') format('woff2'),
    url('./assets/fonts/get_schwifty-webfont.woff') format('woff');
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
  /* text-align: center; */
  background-color: #f5f5f5;
  padding: 0;
  margin: 0;
}
.app-shell {
  background-color: #c3bdba;
  width: 100vw;
  min-height: 100vh;
  max-width: 600px;
  /* overflow-y: scroll;
  overflow-x:hidden; */
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
</style>
