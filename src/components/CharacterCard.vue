<template>
  <a>
    <img :src="character.image" />
    <h4>{{ character.name }}</h4>
  </a>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { Character } from '@/types/Interfaces';

const CharacterCard = Vue.extend({
  name: 'CharacterCard',
  props: {
    character: Object as PropType<Character>,
  },
});
export default CharacterCard;
</script>

<style scoped lang="scss">
a {
  display:block;
  cursor: pointer;
  &:hover {
    opacity: 0.3;
  }
}
</style>
