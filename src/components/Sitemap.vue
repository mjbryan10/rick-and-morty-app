<template>
  <transition name="fade">
    <nav
      v-if="sitemapEntries.length"
      class="sitemap-container"
      aria-label="Characterdex sitemap"
      role="navigation"
    >
      <h3>Sitemap</h3>
      <ul>
        <li v-for="(entry, index) in sitemapEntries" :key="entry.title + index">
          <a class="app-btn" :href="entry.url">{{ capatalize(entry.title) }}</a>
        </li>
      </ul>
    </nav>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';

/** Local state for the component */
interface State {
  sitemapEntries: SitemapEntry[];
}
/** Sitemap entry information */
interface SitemapEntry {
  /** Name of the entry */
  title: string;
  /** Link to route */
  url: string;
}
const Routes = ['/', '/random', '/characters', '/categories']; // TODO

/**
 * Vue component that renders a sitemap, list of possibile routes, for the application
 */
const Sitemap = Vue.extend({
  name: 'Sitemap',
  // TODO FINISH THIS
  data(): State {
    return {
      sitemapEntries: [],
    };
  },
  /** Upon creation updates sitemapEntries data field. */
  created() {
    this.sitemapEntries = this.createUrlArray(Routes);
  },
  methods: {
    /**
     * Takes an array of string paths and returns an array of objects containing
     * the url link and the appropiate name.
     * @param paths An array of string paths to be processed.
     * @param baseUrl An optional string to be added to the front of any path.
     */
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
    /**
     * Takes a string and returns it capatalized.
     * @param string The string to be capatilized.
     */
    capatalize(string: string): string {
      return string[0].toUpperCase() + string.slice(1);
    },
  },
});
export default Sitemap;
</script>

<style scoped lang="scss">
.sitemap-container {
  ul {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    padding: 0;
    li {
      min-width: 140px;
      width: 45%;
      max-width: 400px;
      margin: 2px;
      list-style-type: none;
    }
  }
}
</style>
