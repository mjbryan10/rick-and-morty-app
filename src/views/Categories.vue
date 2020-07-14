<template>
  <div>
    <h1>Categories</h1>
    <h2>Browse characters your way</h2>
    <CategorySelector />
  </div>
</template>
<script lang="ts">
import CategorySelector from '@/components/CategorySelector.vue';

export default {
  name: 'Categories',
  components: {
    CategorySelector,
  },
};
</script>
<style scoped lang="scss">
h1 {
  font-size: 4em;
}
h1,
h2 {
  text-align: center;
}
ul {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  min-height: 300px;
}
li {
  list-style: none;
  width: 300px;
}

</style>
