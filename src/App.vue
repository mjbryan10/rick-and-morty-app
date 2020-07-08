<template>
  <div id="app">
    <Navigation />
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
  </div>
</template>
<script>
import Vue from 'vue';
import Navigation from '@/components/Navigation.vue';

const App = Vue.extend({
  name: 'App',
  components: {
    Navigation,
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
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */
#app {
  font-family: 'letter-gothic-std', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #f5f5f5;
}
</style>
