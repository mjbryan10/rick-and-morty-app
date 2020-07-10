<template>
  <div class="details">
    <h1>Randomizer</h1>
    <CharacterProfile v-if="randomId" :id="randomId" />
  </div>
</template>

<script lang="ts">
import VueWithFetchHelpers from '@/mixins/VueWithFetchHelpers.vue';
import CharacterProfile from '@/components/CharacterProfile.vue';

interface State {
  randomId: number | null;
  totalCount: number;
}
const Randomizer = VueWithFetchHelpers.extend({
  name: 'Randomizer',
  components: {
    CharacterProfile,
  },
  data(): State {
    return {
      randomId: null,
      totalCount: 0,
    };
  },
  created() {
    this.populateRandomId();
  },
  methods: {
    /**
     * Fetches the total amount of results from the API,
     * then choses a random number from the count.
     * Ids are incrementally related to results count.
     */
    populateRandomId(): void {
      this.fetchCharactersByPage()
        .then((result) => {
          const numOfCharacters = result.info.count;
          const randomNum = Math.floor(Math.random() * numOfCharacters);
          this.randomId = randomNum;
        })
        .catch((error) => {
          this.error = error.toString();
        });
    },
  },
});
export default Randomizer;
</script>
<style lang="scss">
h1 {
  font-family: 'get_schwifty';
}
</style>
