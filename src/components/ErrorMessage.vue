<template>
  <div>
    <p>
      We're sorry, it appears something went wrong.
    </p>
    <p>Please try again later.</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

/**
 * A component to display error message text.
 */
const ErrorMessage = Vue.extend({
  name: 'ErrorMessage',
});
export default ErrorMessage;
</script>

<style lang="scss">
</style>
