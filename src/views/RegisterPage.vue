<template>
  <div class="register-page">
    <img src="../assets/logo.png" alt="Logo" class="logo">
    <RegisterForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RegisterForm from '@/components/RegisterForm.vue'

export default defineComponent({
  components: {
    RegisterForm
  },
})
</script>

<style>
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
  margin-bottom: 70px;
}
</style>