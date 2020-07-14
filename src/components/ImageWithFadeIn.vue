<template>
  <transition name="fade">
    <img :src="imgSrc" :alt="imgAlt" @load="onLoaded" v-show="imgLoaded" />
  </transition>
</template>
<script>
import Vue from 'vue';

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
