<template>
  <div>
    <select  v-model="selected">
      <option
        v-for="option in options" :value="option.value" :key="option.value">
        {{option.text}}
      </option>
    </select>
    <div class="insta-feed">
      <Card v-for="post in filtered" :key="post.id" :post="post"/>
    </div>
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
  data: () => ({
    selected: 'all',
    options: [
      { text: 'all', value: 'all' },
      { text: 'photo', value: 'photo' },
      { text: 'video', value: 'video' },
    ],
  }),
  computed: {
    ...mapGetters(['sortedRecentFeeds']),
    filtered() {
      const { selected } = this;
      if (selected === 'all') {
        return this.sortedRecentFeeds;
      }
      return [...this.sortedRecentFeeds]
        .filter((item) => (selected === 'video' ? item.node.is_video : !item.node.is_video));
    },
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
