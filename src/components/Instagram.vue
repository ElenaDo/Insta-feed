<template>
  <div class="insta-feed">
    <Card v-for="post in sortedRecentFeeds" :key="post.id" :post="post"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Card from './Card.vue';

export default {
  name: 'Instagam',
  components: {
    Card,
  },
  computed: {
    ...mapGetters(['sortedRecentFeeds']),
  },
};
</script>

<style>
.insta-feed {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  height: 300px;
}
</style>
