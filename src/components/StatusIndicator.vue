<template>
  <div class="container">
    <span
      class="status-icon"
      v-bind:class="this.$store.state.serverStatus"
    ></span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

/** Local state for the component */
interface State {
  serverStatus: string;
}
/**
 * A dynamic server status indicator.
 *
 * The component tests the server response with an API request.
 *
 * The indicator changes color depending on the server status.
 *  - Red = 'offline', no longer receiving requests from the server.
 *  - Yellow = 'warning', server is giving responses but response threw an error.
 *  - Green = 'OK'. Server working and not giving errors.
 */
const StatusIndicator = Vue.extend({
  name: 'StatusIndicator',
  /** Upon component creation triggers the testDatabase function */
  created() {
    this.testDatabase();
  },
  methods: {
    /**
     * Asynchronous function that sends a request to the API and updates the serverStatus
     * property depending on the result.
     */
    async testDatabase() {
      const url = 'https://rickandmortyapi.com/api/character/1';
      const response = await fetch(url);
      if (response.status === 200) {
        this.$store.commit('setServerStatus', 'OK');
      } else {
        this.$store.commit('setServerStatus', 'offline');
      }
    },
  },
});
export default StatusIndicator;
</script>

<style scoped lang="scss">
.status-icon {
  display: block;
  height: 15px;
  width: 15px;
  border-radius: 15px;
  border: 1px solid black;
  margin-right: 2px;
  animation: infinite blinking 10s;
}
.offline {
  background: rgb(255, 255, 255);
  background: linear-gradient(
    133deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(121, 9, 9, 1) 35%,
    rgba(255, 0, 0, 1) 100%
  );
}
.OK {
  background: rgb(255, 255, 255);
  background: linear-gradient(
    133deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(9, 121, 24, 1) 35%,
    rgba(0, 255, 63, 1) 100%
  );
}
.warning {
  background: rgb(255, 255, 255);
  background: linear-gradient(
    133deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(157, 167, 22, 1) 35%,
    rgba(250, 255, 0, 1) 100%
  );
}

@keyframes blinking {
  0% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  95% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
