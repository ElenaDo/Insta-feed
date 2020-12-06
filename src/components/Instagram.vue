<template>
  <div>
    <Card />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Card from './Card.vue';

export default {
  name: 'Instagam',
  components: {
    Card,
  },
  computed: {
    ...mapState(['recentFeeds']),
  },
};
</script>
