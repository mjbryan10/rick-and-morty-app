<template>
  <h1 class="rnm">
    <span class="first-letter-rnm">Rick </span>
    <span class="smaller-rnm">and</span>
    <span> Morty</span> Characterdex
  </h1>
</template>

<script>
import Vue from 'vue';

const RickAndMortyHeader = Vue.extend({
  name: 'RickAndMortyHeader',
});
export default RickAndMortyHeader;
</script>
<style scoped lang="scss">
h1 {
  font-family: 'get_schwifty';
  font-size: 4rem;
  span:nth-of-type(1) {
    &::first-letter {
      font-size: 5rem;
    }
  }
}
.first-letter-rnm::first-letter {
  font-size: 200%;
}
span.smaller-rnm {
  font-size: 2rem;
}
</style>
