<template>
  <div class="reset-password-page">
    <img src="../assets/logo.png" alt="Logo" class="logo">
    <ResetPasswordForm/>
    <div id="footer">
      <PrivacyModal />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PrivacyModal from "@/components/PrivacyModal.vue";
import ResetPasswordForm from "@/components/ResetPasswordForm.vue";
import {useAuth} from "@/untils/useAuth";

export default defineComponent({
  components: {
    ResetPasswordForm,
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

.reset-password-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 85vh;
}

.logo {
  width: 100px;
  height: 100px;
  margin: 30px 0 70px 0;
}

#footer {
  position: absolute;
  bottom: 20px;
}
</style>