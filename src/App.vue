<template>
  <div id="app">
    <n-message-provider>
      <router-view />
      <div class="bottom-nav-bar-placeholder"></div>
      <BottomNavBar v-if="$route.meta.showFooter"/>
    </n-message-provider>
  </div>
</template>

<script>
import { NMessageProvider } from 'naive-ui'
import BottomNavBar from "@/components/BottomNavBar.vue";

export default {
  name: 'App',

  components: {
    BottomNavBar,
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

.bottom-nav-bar-placeholder {
  height: 50px;
  visibility: hidden;
}
</style>
