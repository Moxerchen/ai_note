<template>

  <n-form ref="form" :model="form" @submit="register">
    <n-form-item path="email" :rule="{ pattern: emailPattern, message: '请输入有效的邮箱地址', trigger: 'blur' }">
      <n-input
          v-model:value="form.email"
          placeholder="请输入邮箱"
          clearable
      >
        <template #prefix>
          <n-icon :component="Email" />
        </template>
      </n-input>
    </n-form-item>

    <n-form-item path="password" :rule="{ pattern: passwordPattern, message: '密码首位必须为字母且大于等于6位', trigger: 'blur' }">
      <n-input
          v-model:value="form.password"
          type="password"
          show-password-on="click"
          placeholder="请输入密码"
      >
        <template #prefix>
          <n-icon :component="Locked" />
        </template>
      </n-input>
    </n-form-item>

    <n-form-item path="passwordRepeat" :rule="{ validator: passwordMatch, trigger: 'blur' }">
      <n-input
          v-model:value="form.passwordRepeat"
          type="password"
          show-password-on="click"
          placeholder="请再次输入密码"
      >
        <template #prefix>
          <n-icon :component="Locked" />
        </template>
      </n-input>
    </n-form-item>

    <n-form-item>
      <n-button type="info" native-type="submit">注册</n-button>
    </n-form-item>
  </n-form>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NForm, NFormItem, NInput, NButton, NIcon } from 'naive-ui'
import { Email, Locked } from '@vicons/carbon';
import emailjs from 'emailjs-com'

export default defineComponent({
  components: {
    NForm,
    NFormItem,
    NInput,
    NButton,
    NIcon
  },
  setup() {
    const form = ref({
      email: '',
      password: ''
    })

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^[A-Za-z].{5,}$/;

    const register = () => {
      const serviceId = 'YOUR_SERVICE_ID'
      const templateId = 'YOUR_TEMPLATE_ID'
      const userId = 'YOUR_USER_ID'

      const params = {
        to_email: form.value.email,
        message: `验证码是 ${Math.floor(100000 + Math.random() * 900000)}.`
      }

      emailjs.send(serviceId, templateId, params, userId)
          .then(() => {
            console.log('Email sent successfully!')
            sessionStorage.setItem('verificationCode', params.message)
          })
          .catch(error => console.error('Error sending email:', error))
    }

    return {
      Email,
      Locked,
      form,
      register,
      emailPattern,
      passwordPattern
    }
  }
})
</script>
