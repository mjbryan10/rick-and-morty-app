<template>
  <div class="container">
    <span class="status-icon" v-bind:class="serverStatus"></span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface State {
  serverStatus: string;
}
const StatusIndicator = Vue.extend({
  name: 'StatusIndicator',
  data(): State {
    return {
      serverStatus: 'warning',
    };
  },
  created() {
    this.testDatabase();
  },
  methods: {
    async testDatabase() {
      const url = 'https://rickandmortyapi.com/api/character/1';
      const response = await fetch(url);
      if (response.status === 200) {
        this.serverStatus = 'good';
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
.good {
  background: rgb(255, 255, 255);
  background: linear-gradient(
    133deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(9, 121, 24, 1) 35%,
    rgba(0, 255, 63, 1) 100%
  );
  /* background: rgb(255, 255, 255);
  background: linear-gradient(
    137deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(28, 167, 22, 1) 35%,
    rgba(5, 255, 0, 1) 100%
  ); */
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
