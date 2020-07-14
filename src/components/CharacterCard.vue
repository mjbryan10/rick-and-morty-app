<template>
  <router-link :style="linkStyles" class="card-container" :to="`/character/${character.id}`" exact>
    <ImageWithFadeIn :style="imgStyles" :imgSrc="character.image" :imgAlt="character.name" />
    <h4>{{ character.name }}</h4>
  </router-link>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { Character } from '@/types/Interfaces';
import ImageWithFadeIn from './ImageWithFadeIn.vue';

const CharacterCard = Vue.extend({
  name: 'CharacterCard',
  props: {
    character: { type: Object as PropType<Character>, required: true },
    imgSize: {
      type: Number,
      default: () => 300,
    },
  },
  components: {
    ImageWithFadeIn,
  },
  computed: {
    imgStyles() {
      const pxString = `${this.imgSize}px`;
      return {
        width: pxString,
        height: pxString,
      };
    },
    linkStyles() {
      const pxString = `${this.imgSize}px`;
      return {
        maxWidth: pxString,
      };
    },
  },
});
export default CharacterCard;
</script>

<style scoped lang="scss">
.card-container {
  /* Layout */
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  /* Color */
  background-color: #f5f5f5;
  /* Text */
  color: inherit;
  text-decoration: none;
  text-align: center;
  font-weight: bold; // TODO: check bold styles.
  /*Border styles */
  border-radius: 0.5rem;
  border: 2px solid black;
  cursor: pointer;
  img {
    transition: opacity 1s;
    object-fit: contain;
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
