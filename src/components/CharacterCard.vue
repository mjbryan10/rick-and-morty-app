<template>
  <router-link class="card-container" :to="`character/${character.id}`">
    <!-- <span class="link-span">Find out more..</span> -->
    <img :src="character.image" />
    <h4>{{ character.name }}</h4>
  </router-link>
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
.card-container {
  /* Layout */
  display: block;
  overflow: hidden;
  position: relative;
  /* Color */
  background-color: #f5f5f5;
  /* Text */
  color: inherit;
  text-decoration: none;
  font-weight: bold; // TODO: check bold styles.
  /*Border styles */
  border-radius: 0.5rem;
  border: 2px solid black;
  cursor: pointer;
  img {
    transition: opacity 1s;
    min-width: 300px;
    min-height: 300px;
  }
  &:hover {
    img {
      opacity: 0.7;
    }
    .link-span {
      top: 50%;
      margin-top: -12.5px;
    }
  }
  .link-span {
    display: block;
    position: absolute;
    height: 25px;
    top: -25px;
    bottom: 0;
    left: 0;
    right: 0;
    background: #000;
    transition: cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
    z-index: 10;
  }
}
</style>
