<template>
  <div class="container">
    <StatusIndicator />
  </div>
</template>
<script>
import Vue from 'vue';

import StatusIndicator from '@/components/StatusIndicator.vue';

/**
 * Vue component that renders the header bar for the applicationbundleRenderer.renderToStream
 *
 * Contains a status indicator, for server status.
 */
const HeaderBar = Vue.extend({
  name: 'HeaderBar',
  components: {
    StatusIndicator,
  },
});
export default HeaderBar;
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 3px;
}
.info-btn {
  font-family: inherit;
}
</style>
