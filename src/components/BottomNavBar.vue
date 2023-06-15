<template>
  <div class="bottom-nav-bar">
    <n-button text style="font-size: 24px" @click="navigateTo('/home')" :class="{active: activePage === '/home'}">
      <n-icon :component="Home" />
    </n-button>

    <n-button text style="font-size: 24px" @click="navigateTo('/book')" :class="{active: activePage === '/book'}">
      <n-icon :component="Book" />
    </n-button>

    <n-button text style="font-size: 24px" @click="navigateTo('/person')" :class="{active: activePage === '/person'}">
      <n-icon :component="Person" />
    </n-button>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import { NButton, NIcon } from "naive-ui";
import { Home, Book, Person } from '@vicons/ionicons5';
import router from "@/router";

export default defineComponent({
  components: {
    NButton,
    NIcon,
  },

  setup() {
    const activePage = ref<string>('');

    const navigateTo = (page: string) => {
      activePage.value = page;
      router.push(`${page}`);
    };

    // 在组件挂载完成后，设置activePage的值
    onMounted(() => {
      activePage.value = router.currentRoute.value.path as string;
    });

    return {
      Home,
      Book,
      Person,
      activePage,
      navigateTo,
    };
  },
});
</script>

<style scoped>
.bottom-nav-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  padding-top: 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #f8f9fa;
}

.active {
  color: #56bce3;
}
</style>
