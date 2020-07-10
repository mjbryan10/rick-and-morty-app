<template>
  <div class="details">
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
