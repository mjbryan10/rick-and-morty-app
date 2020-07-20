<template>
  <footer>
    <Sitemap />
    <h3>Website</h3>
    <p>Created by Matthew Bryan</p>
    <h3>API</h3>
    <p>
      The Rick and Morty API is a RESTful and GraphQL API based on the
      television show Rick and Morty, created by Axel Fuhrmann.
    </p>
    <h3>Copyright</h3>
    <p>
      Rick and Morty is created by Justin Roiland and Dan Harmon for Adult Swim.
      The data and images are used without claim of ownership and belong to
      their respective owners.
    </p>
  </footer>
</template>

<script>
import Sitemap from '@/components/Sitemap.vue';

export default {
  name: 'Footer',
  components: { Sitemap },
};
</script>
<style scoped lang="scss">
footer {
  padding: 1rem;
  border-top: dashed rgba(0,0,0, 0.5) 2px;
}
</style>
