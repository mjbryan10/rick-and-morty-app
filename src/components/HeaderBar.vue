<template>
  <div class="container">
    <StatusIndicator />
    <button @click="handleClick" class="info-btn">info</button>
  </div>
</template>
<script>
import Vue from 'vue';

import StatusIndicator from '@/components/StatusIndicator.vue';

const HeaderBar = Vue.extend({
  name: 'HeaderBar',
  props: {
    clickHandler: Function,
  },
  components: {
    StatusIndicator,
  },
  methods: {
    handleClick() {
      this.clickHandler();
    },
  },
});
export default HeaderBar;
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: space-between;
}
.info-btn {
  font-family: inherit;
}
</style>
