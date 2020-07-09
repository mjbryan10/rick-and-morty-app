<template>
  <div class="home">
    <RickAndMortyHeader />
    <h2>Your database of Rick and Morty characters</h2>
    <CharacterDisplayCase />
  </div>
</template>

<script>
// @ is an alias to /src
import CharacterDisplayCase from '@/components/CharacterDisplayCase.vue';
import RickAndMortyHeader from '@/components/RickAndMortyHeader.vue';

export default {
  name: 'Home',
  components: {
    CharacterDisplayCase,
    RickAndMortyHeader,
  },
};
</script>
<style lang="scss">
.home {
  /* color: #2c3e50; */
}
</style>
