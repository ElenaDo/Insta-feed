<template>
  <div class="insta-feed">
    <Card v-for="post in recentFeeds" :key="post.id" :post="post"/>
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

<style>
.insta-feed {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  height: 300px;
}
</style>
