<template>
  <div class="home">
    <h1>Rick and Morty Characterdex</h1>
    <h2>Your database of Rick and Morty characters</h2>
    <CharactersLandingList/>
  </div>
</template>

<script>
// @ is an alias to /src
import CharactersLandingList from '@/components/CharactersLandingList.vue';

export default {
  name: 'Home',
  components: {
    CharactersLandingList,
  },
};
</script>
