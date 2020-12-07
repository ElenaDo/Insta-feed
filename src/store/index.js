import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recentFeeds: [],
  },
  getters: {
    sortedRecentFeeds(state) {
      // show newest posts first
      return state.recentFeeds
        .sort((a, b) => b.node.taken_at_timestamp - a.node.taken_at_timestamp);
    },
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
