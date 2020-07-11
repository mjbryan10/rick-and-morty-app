<template>
  <div class="card-container">

    <h3>Details</h3>
    <p>Species: {{character.species}} </p>
    <p v-if="character.type">Type: {{character.type}} </p>
    <p>Gender: {{character.gender}} </p>
    <p>Origin: {{character.origin.name}} </p>
    <p>Location: {{character.location.name}} </p>

  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { Character } from '@/types/Interfaces';

const CharacterInfo = Vue.extend({
  name: 'CharacterInfo',
  props: {
    character: Object as PropType<Character>,
  },
});
export default CharacterInfo;
</script>

<style scoped lang="scss">
.card-container {
  display: block;
  background-color: #f5f5f5;
  color: inherit;
  border-radius: 5px;
  border: 2px solid black;
  text-align: left;
  margin: 1rem;
  padding: 0.5rem;
  h3 {
    text-align: center;
  }
}
</style>
