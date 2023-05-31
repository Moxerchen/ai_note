<template>
  <div class="register-page">
    <img src="../assets/logo.png" alt="Logo" class="logo">
    <RegisterForm />
    <div id="footer">
      <PrivacyModal />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RegisterForm from '@/components/RegisterForm.vue'
import PrivacyModal from "@/components/PrivacyModal.vue";

export default defineComponent({
  components: {
    PrivacyModal,
    RegisterForm
  },
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.register-page {
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