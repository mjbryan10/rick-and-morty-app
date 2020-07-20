<template>
  <router-link
    :style="linkStyles"
    class="card-container"
    :to="`/character/${character.id}`"
    exact
  >
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
        maxWidth: pxString,
        maxHeight: pxString,
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
  /* margin: 0 auto; */
  width: 100%; //Responsive test.
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
  /* Interaction*/
  transition: cubic-bezier(0.075, 0.82, 0.165, 1) 0.2s;
  &:hover {
    img {
      opacity: 0.7;
    }
  }
  &:active {
    transform: scale(0.9);
  }
}
/* Remove link styles if route matches link ref. */
.router-link-active {
  cursor: auto;
  &:hover {
    img {
      opacity: 1;
    }
  }
  &:active {
    transform: scale(1);
  }
}
</style>
