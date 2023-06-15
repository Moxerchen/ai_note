<template>
  <div class="forget-page">
    <img src="../../assets/logo.png" alt="Logo" class="logo">
    <ForgetForm />
    <div id="footer">
      <PrivacyModal />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PrivacyModal from "@/components/PrivacyModal.vue";
import ForgetForm from "@/components/ForgetForm.vue";
import {useAuth} from "@/untils/useAuth";

export default defineComponent({
  components: {
    ForgetForm,
    PrivacyModal,
  },

  setup() {
    // 检测登录状态
    useAuth();
  }
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.forget-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 85vh;
}

.logo {
  width: 100px;
  height: 100px;
  margin-bottom: 80px;
}

#footer {
  position: absolute;
  bottom: 20px;
}
</style>