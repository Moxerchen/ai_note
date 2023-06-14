<template>
  <div class="bottom-nav-bar">
    <n-button text style="font-size: 24px" @click="navigateTo('Home')" :class="{active: activePage === 'Home'}">
      <n-icon :component="Home" />
    </n-button>

    <n-button text style="font-size: 24px" @click="navigateTo('Book')" :class="{active: activePage === 'Book'}">
      <n-icon :component="Book" />
    </n-button>

    <n-button text style="font-size: 24px" @click="navigateTo('Person')" :class="{active: activePage === 'Person'}">
      <n-icon :component="Person" />
    </n-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { NButton, NIcon } from "naive-ui";
import { Home, Book, Person } from '@vicons/ionicons5';
import router from "@/router";

export default defineComponent({
  components: {
    NButton,
    NIcon,
  },

  setup() {
    const activePage = ref('Home');

    const navigateTo = (page: string) => {
      activePage.value = page;
      router.push(`/${page.toLowerCase()}`);
    };

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
