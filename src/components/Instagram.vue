<template>
  <div>
    <div class="filter">
      <span>Show</span>
      <select v-model="selected">
        <option
          v-for="option in options" :value="option.value" :key="option.value">
          {{option.text}}
        </option>
      </select>
    </div>
    <div class="insta-feed">
      <Card v-for="post in limited" :key="post.id" :post="post"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Card from './Card.vue';

export default {
  name: 'Instagam',
  props: { numberOfFeeds: Number, account: String },
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
    limited() {
      return this.filtered.slice(0, this.numberOfFeeds);
    },
  },
  watch: {
    account(val) {
      this.$store.dispatch('fetchFeed', { account: val });
    },
  },
};
</script>

<style>
.filter {
  display: flex;
  justify-content: flex-end;
}
.filter span {
  margin: .5em 0;
  padding: .5em 0;
}
.insta-feed {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}
</style>
