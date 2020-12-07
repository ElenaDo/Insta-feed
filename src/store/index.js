import Vue from 'vue';
import Vuex from 'vuex';
import demoData from './inst.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recentFeeds: [
      ...demoData.graphql.user.edge_owner_to_timeline_media.edges,
      ...demoData.graphql.user.edge_felix_video_timeline.edges,
    ],
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
