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
            circle>
          <n-icon :component="ArrowUndoOutline" />
        </n-button>
        <n-button
            quaternary
            style="font-size: 20px"
            circle>
          <n-icon :component="ArrowRedoOutline" />
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
import { ChevronBack, ArrowUndoOutline, ArrowRedoOutline, SaveOutline } from '@vicons/ionicons5'

export default defineComponent({
  components: {
    NButton,
    NSpace,
    NIcon
  },
  emits: ['done', 'back'],
  setup(props, { emit }) {
    const handleBack = () => {
      emit('back')
    }

    const handleDone = () => {
      emit('done')
    }

    return {
      ChevronBack,
      ArrowUndoOutline,
      ArrowRedoOutline,
      SaveOutline,
      handleBack,
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

</style>