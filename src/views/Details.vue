<template>
  <div class="details">
    <h1>Characterdex</h1>
    <CharacterProfile :id="id" />
  </div>
</template>

<script>
import CharacterProfile from '@/components/CharacterProfile.vue';

/**
 * Vue page view for the details of character.
 *
 * Uses the /character/:id slugged route to determine which character to render.
 */
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
