<template>
  <div class="top-nav-bar-placeholder"></div>
  <div class="top-nav-bar">
    <n-button
        quaternary
        style="font-size: 24px"
        circle
        @click="handleBack">
      <n-icon :component="ChevronBack" />
    </n-button>

    <div class="opera-bar">
      <n-space align="center">
        <n-button
            quaternary
            style="font-size: 20px"
            circle
            @click="handlePin"
            :type= "isPinned ? 'warning' : 'default'"
        >
          <n-icon :component="isPinned ? Star : StarOutline" />
        </n-button>
        <n-button
            quaternary
            style="font-size: 20px"
            circle
            @click="handleDone">
          <n-icon :component="SaveOutline" />
        </n-button>
      </n-space>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NButton, NSpace, NIcon } from 'naive-ui'
import { ChevronBack, Star, StarOutline, SaveOutline } from '@vicons/ionicons5'

export default defineComponent({
  components: {
    NButton,
    NSpace,
    NIcon
  },
  props: {
    isPinned: {
      type: Boolean,
      default: false
    }
  },
  emits: ['done', 'pin', 'back'],
  setup(props, { emit }) {
    const handleBack = () => {
      emit('back')
    }

    const handlePin = () => {
      emit('pin')
    }

    const handleDone = () => {
      emit('done')
    }

    return {
      ChevronBack,
      Star,
      StarOutline,
      SaveOutline,
      handleBack,
      handlePin,
      handleDone,
    }
  }
})
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
  padding: 10px;

  display: flex;
  justify-content: space-between;
}

.opera-bar {
  margin-right: 20px;
}

.active {
  color: #e3cc56;
}
</style>