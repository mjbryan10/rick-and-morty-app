<template>
  <nav id="nav">
    <router-link to="/" class="gb-btn">Home</router-link>
    <router-link
      @click.native="incrementRandomizerKey"
      to="/random"
      class="randomizer-btn"
      >Randomizer</router-link
    >
    <router-link to="/categories" class="gb-btn">Categories</router-link>
  </nav>
</template>
<script lang="ts">
import Vue from 'vue';

const Navigation = Vue.extend({
  name: 'Navigation',
  methods: {
    incrementRandomizerKey(): void {
      this.$store.commit('incrementRandomizerKey');
    },
  },
});
export default Navigation;
</script>
<style lang="scss">
@mixin inset-shadow {
  -webkit-box-shadow: inset 0px 0px 3px 1px rgba(0, 0, 0, 0.67);
  -moz-box-shadow: inset 0px 0px 3px 1px rgba(0, 0, 0, 0.67);
  box-shadow: inset 0px 0px 3px 1px rgba(0, 0, 0, 0.67);
}
@mixin box-shadow {
  -webkit-box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.67);
  -moz-box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.67);
  box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.67);
}

#nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  text-align: center;
  a {
    font-weight: bold;
    color: #827b7f;
    text-decoration: none;
    &.gb-btn {
      &::before {
        content: '';
        display: block;
        background-color: #827b7f;
        width: 60px;
        height: 15px;
        border-radius: 7.5px;
        margin: 0 auto;
        transition: ease-out 0.2s;
        @include box-shadow();
      }
    }
    &.router-link-exact-active,
    &:hover {
      /* color: #42b983; */
      &::before {
        @include inset-shadow();
      }
    }
    &.randomizer-btn {
      /*Font */
      font-family: 'get_schwifty';
      color: white;
      font-weight: 200;
      /*Layout*/
      height: 100px;
      width: 100px;
      margin-top: -50px;
      z-index: 1000;
      border-radius: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: rotate(-45deg);
      /* Display */
      background-color: #9b2222;
      border: 2px solid black;
      @include box-shadow();

      &:hover {
        @include inset-shadow();
      }
    }
  }
}
</style>
