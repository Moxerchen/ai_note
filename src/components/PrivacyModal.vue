<template>
  <n-row>
    Copyright © 2023 AI Note •&nbsp;
    <n-button color="#1E90FF" text @click="showModal = true">隐私政策</n-button>
  </n-row>
  <n-modal
      :show="showModal"
      @update:show="showModal = $event"
      preset="dialog"
      title="隐私政策"
      content="&emsp;我们承诺尊重您的隐私，保护您的个人信息，并努力使您在这里感到安全。"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NModal, NButton, NRow } from 'naive-ui'

export default defineComponent({
  components: { NModal, NButton, NRow },
  setup() {

    return {
      showModal: ref(false),
    }
  },
})
</script>