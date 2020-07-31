<template>
  <div v-if="this.$store.state.isLoadingGlobal" class="loading-spinner">
      <div
        class="portal"
        :style="{ backgroundImage: 'url(' + require('@/assets/images/portal.png') + ')' }"
      >
        <div
          class="portal-inner"
          :style="{ backgroundImage: 'url(' + require('@/assets/images/portal-inner.png') + ')' }"
        ></div>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

/**
 * Vue component for a spinner/loading icon.
 *
 * Styled to be inkeeping with the Rick and Morty theme.
 */
const Spinner = Vue.extend({
  name: 'Spinner',
});
export default Spinner;
</script>

<style lang="scss">
.loading-spinner {
  z-index: 999;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  $size: 200px;
  height: $size + 10px;
  width: $size;
  /* Sets el to center of the containing area */
  top: 50%;
  left: 50%;
  margin-top: -($size/2);
  margin-left: -($size/2);
  .portal,
  .portal-inner {
    /* animation: portal-enter 0.2s; */
    width: 100%;
    height: 100%;
    background-size: cover;
  }
  .portal-inner {
    animation: spin infinite 10s;
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  /*
  * Entry animation for the portal
  * @see https://www.youtube.com/watch?v=il28HkQwImU for inspiration.
  */
  @keyframes portal-enter {
    0% {
      width: 10%;
      height: 10%;
    }
    100% {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
