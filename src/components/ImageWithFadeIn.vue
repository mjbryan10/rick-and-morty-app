<template>
  <transition name="fade">
    <img :src="imgSrc" :alt="imgAlt" @load="onLoaded" v-show="imgLoaded" />
  </transition>
</template>
<script>
import Vue from 'vue';

/**
 * Vue component for display images, with a smooth transition.
 *
 * Initially loads the image before fading it into view.
 *
 * @props imgSrc The url string from which to retrieve the image.
 * @props imgAlt The string value for the html img alt property.
 */
const ImageWithFadeIn = Vue.extend({
  name: 'ImageWithFadeIn',
  props: {
    imgSrc: String,
    imgAlt: String,
  },
  data() {
    return {
      imgLoaded: false,
    };
  },
  methods: {
    /**
     * Toggles the imgLoaded property to true.
     *
     * Thereby, making use of vue's `v-show`, to only show the image once it has loaded
     */
    onLoaded() {
      this.imgLoaded = true;
    },
  },
});
export default ImageWithFadeIn;
</script>

<style scoped lang="scss">
/* If there is no fade transition inherited,
you will need to create one here - example below */

/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
} */
</style>
