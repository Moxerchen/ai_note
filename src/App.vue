<template>
  <div id="app">
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </div>
</template>

<script>
import { NMessageProvider } from 'naive-ui'

export default {
  name: 'App',

  components: {
    NMessageProvider,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
