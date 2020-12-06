import Vue from 'vue';
import Vuex from 'vuex';
import demoData from './inst.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recentFeeds: demoData.graphql.user.edge_owner_to_timeline_media.edges,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
