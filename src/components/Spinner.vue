<template>
  <div class="loading-spinner">
    Loading ...
  </div>
</template>

<script lang="ts">

import Vue from 'vue';

const Spinner = Vue.extend({
  name: 'Spinner',
});
export default Spinner;
</script>

<style lang="scss">
.loading-spinner {
  position: absolute;

  $size: 150px;
  height: $size;
  width: $size;
  /* Sets el to center of the containing area */
  top:50%;
  left:50%;
  margin-top: ($size / 2px);
  margin-left: ($size / 2px);

}
</style>
