<template>
  <transition name="fade">
    <div v-if="sitemapEntries.length" class="sitemap-container">
      <h3>Sitemap</h3>
      <ul>
        <li v-for="(entry, index) in sitemapEntries" :key="entry.title + index">
          <a class="app-btn" :href="entry.url">{{ capatalize(entry.title) }}</a>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';

interface State {
  sitemapEntries: SitemapEntry[];
}
interface SitemapEntry {
  title: string;
  url: string;
}
const Routes = ['/', '/random', '/characters', '/categories'];

const Sitemap = Vue.extend({
  name: 'Sitemap',
  // TODO FINISH THIS
  data(): State {
    return {
      sitemapEntries: [],
    };
  },
  created() {
    this.sitemapEntries = this.createUrlArray(Routes);
  },
  methods: {
    createUrlArray(paths: string[], baseUrl = ''): SitemapEntry[] {
      if (!paths.length) return [];
      const newArray: SitemapEntry[] = [];
      paths.forEach((slug) => {
        newArray.push({
          title: slug.split('/')[1] || 'Home',
          url: baseUrl + slug,
        });
      });
      return newArray;
    },
    capatalize(string: string): string {
      return string[0].toUpperCase() + string.slice(1);
    },
  },
});
export default Sitemap;
</script>

<style scoped lang="scss">
.sitemap-container {
  /* text-align: left; */
  ul {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    padding: 0;
    li {
      min-width: 45%;
      max-width: 45%;
      margin: 2px;
      list-style-type: none;
    }
  }
}
</style>
