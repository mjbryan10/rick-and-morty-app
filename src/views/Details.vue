<template>
  <div class="details">
    <h1>Characterdex</h1>
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
    id: String,
  },
};
</script>
