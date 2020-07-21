<template>
  <div class="card-container">

    <h3>Details</h3>
    <p><span>Species: </span>{{character.species}} </p>
    <p v-if="character.type">Type: {{character.type}} </p>
    <p><span>Gender: </span>{{character.gender}} </p>
    <p><span>Origin: </span>{{character.origin.name}} </p>
    <p><span>Location: </span>{{character.location.name}} </p>

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
  padding: 0.5rem;
  background-color: #f5f5f5;
  color: inherit;
  text-align: left;
  border-radius: 5px;
  border: 2px solid black;
  h3 {
    text-align: center;
  }
  p span {
    font-weight: bold;
  }
}
</style>
