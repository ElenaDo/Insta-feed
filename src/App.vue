<template>
  <div id="app">
    <Instagram />
  </div>
</template>

<script>
import Instagram from './components/Instagram.vue';

export default {
  name: 'App',
  components: {
    Instagram,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
