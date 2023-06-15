<template>
  <div class="top-nav-bar-placeholder"></div>
  <div class="top-nav-bar">
    <n-space align="center">
      <n-button
          quaternary
          style="font-size: 24px"
          @click="handlePin"
      >
        <n-icon :component="Bookmarks" />
      </n-button>

      <n-auto-complete
          v-model:value="searchInput"
          :options="options"
          placeholder="搜索"
          @update:value="handleUpdate"
          class="search-bar"
          clearable
      >
        <template #prefix>
          <n-icon :component="Search" />
        </template>
      </n-auto-complete>
      <n-button
          quaternary
          style="font-size: 24px"
          circle
          @click="handleAdd"
      >
        <n-icon :component="AddCircleOutline" />
      </n-button>
    </n-space>
  </div>
</template>

<script>
import { ref } from 'vue'
import { NAutoComplete, NSpace, NButton, NIcon } from 'naive-ui'
import { Search, AddCircleOutline, Bookmarks  } from '@vicons/ionicons5'

export default {
  components: {
    NAutoComplete,
    NSpace,
    NButton,
    NIcon,
  },
  emits: ['onSearch', 'onAdd', 'onPin'],
  setup(props, { emit }) {
    const searchInput = ref('')
    const options = ref([])
    const selectedValue = ref(null)

    const handleUpdate = (value) => {
      searchInput.value = value
      value = value.toUpperCase()

      const currentUser = localStorage.getItem('currentUser')
      const data = JSON.parse(currentUser)

      // 更新 options
      options.value = data.notes.filter(item =>
          item.title.toUpperCase().includes(value) ||
          (item.tags && Array.isArray(item.tags) && item.tags.some(tag => tag.toUpperCase().includes(value))) ||
          item.content.toUpperCase().includes(value)
      ).map(item => ({
        label: item.title,
        value: item.title,
      }))

      emit('onSearch', value)
    }

    const handleAdd = () => {
      emit('onAdd')
    }

    const handlePin = () => {
      emit('onPin')
    }

    return {
      Search,
      AddCircleOutline,
      Bookmarks,
      searchInput,
      options,
      handleUpdate,
      handleAdd,
      handlePin,
      selectedValue
    }
  }
}
</script>

<style scoped>
.top-nav-bar-placeholder {
  height: 50px;
}

.top-nav-bar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  background-color: lightblue;
  padding: 12px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-bar {
  margin: 0 5px 0 -15px;
  padding: 0 10px;
}

</style>
