<template>
<div class="btn-ai">
  <n-button
      type="info"
      round
      size="large"
      style="font-family: 'Comic Sans MS',serif"
      @click="handleAI"
      >
    AI
  </n-button>
</div>


</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {NButton} from 'naive-ui'

export default defineComponent({
  components: {
    NButton,
  },
  emits: ['analysis'],
  setup(props, { emit }) {

    const handleAI = async () => {
      emit('analysis')
    }

    return {
      handleAI,
    }
  }
})
</script>

<style scoped>

.btn-ai {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 30px;
  padding: 20px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

</style>
