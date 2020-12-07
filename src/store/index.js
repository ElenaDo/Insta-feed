import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedAccount: '',
    recentFeeds: {},
  },
  getters: {
    sortedRecentFeeds(state) {
      // show newest posts first
      const selectedAccountFeed = state.recentFeeds[state.selectedAccount];
      if (!selectedAccountFeed) return [];
      return selectedAccountFeed
        .sort((a, b) => b.taken_at_timestamp - a.taken_at_timestamp);
    },
  },
  mutations: {
    setSelectedAccount(state, { account }) {
      state.selectedAccount = account;
    },
    setAccountFeed(state, { data }) {
      state.recentFeeds = { ...state.recentFeeds, [state.selectedAccount]: data };
    },
  },
  actions: {
    async request(context, { account }) {
      let result;
      try {
        const response = await fetch(`https://www.instagram.com/${account}/?__a=1`);
        result = await response.json();
      } catch (err) {
        console.log(err);
      }
      return result;
    },
    async fetchFeed({ commit, dispatch, state }, { account }) {
      commit('setSelectedAccount', { account });
      if (!account || state.recentFeeds[account]) return;
      const result = await dispatch('request', { account });
      if (!result) return;
      const data = [
        ...result.graphql.user.edge_owner_to_timeline_media.edges,
        ...result.graphql.user.edge_felix_video_timeline.edges,
      ].map((item) => item.node);
      commit('setAccountFeed', { data });
    },
  },
  modules: {
  },
});
