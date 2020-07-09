<template>
  <div class="details">
    <CharacterProfile :id="parseInt(id, 10)" />
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
