<template>
  <div class="details">
    <h1>Rick and Morty Characterdex</h1>
    <h2>Your database of Rick and Morty characters</h2>
    <CharacterProfile :id="id" />
  </div>
</template>

<script>
import CharacterProfile from '@/components/CharacterProfile.vue';

export default {
  name: 'Details',
  components: {
    CharacterProfile,
  },
  props: {
    id: Number,
  },
};
</script>
