import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const storedFeeds = sessionStorage.getItem('store.recentFeeds');

const recentFeeds = storedFeeds ? JSON.parse(storedFeeds) : {};

const store = new Vuex.Store({
  state: {
    loading: false,
    selectedAccount: '',
    recentFeeds,
  },
  getters: {
    sortedRecentFeeds(state) {
      // show newest posts first
      const selectedAccountFeed = state.recentFeeds[state.selectedAccount];
      if (!selectedAccountFeed) return [];
      return selectedAccountFeed
        .data.sort((a, b) => b.taken_at_timestamp - a.taken_at_timestamp);
    },
  },
  mutations: {
    setSelectedAccount(state, { account }) {
      state.selectedAccount = account;
    },
    setAccountFeed(state, { data }) {
      const lastFetched = new Date();
      state.recentFeeds = { ...state.recentFeeds, [state.selectedAccount]: { lastFetched, data } };
    },
    loading(state) {
      state.loading = true;
    },
    noLoading(state) {
      state.loading = false;
    },
  },
  actions: {
    async request({ commit }, { account }) {
      let result;
      commit('loading');
      try {
        const response = await fetch(`https://www.instagram.com/${account}/?__a=1`);
        result = await response.json();
      } catch (err) {
        // eslint-disable-next-line no-alert
        alert(err); // simplified error display
      }
      commit('noLoading');
      return result;
    },
    async fetchFeed({ commit, dispatch, state }, { account }) {
      commit('setSelectedAccount', { account });
      let hasCache = false;
      if (state.recentFeeds[account]) {
        let { lastFetched } = state.recentFeeds[account];
        // restore lastFetched date object from sting
        if (typeof (lastFetched) === 'string') lastFetched = new Date(lastFetched);
        const diff = (new Date() - lastFetched) / 1000 / 60;
        const ttl = 60; // cache in minutes
        if (diff < ttl) hasCache = true;
      }

      if (!account || hasCache) return;
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

store.subscribe((mutation, state) => {
  if (mutation.type === 'setAccountFeed') {
    sessionStorage.setItem('store.recentFeeds', JSON.stringify(state.recentFeeds));
  }
});

export default store;
