<template>
  <div class="home">
    <EntriesPage msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import EntriesPage from '@/components/EntriesPage.vue';

export default {
  name: 'Home',
  components: {
    EntriesPage,
  },
};
</script>
