<template>

  <n-form ref="formRef" :model="model" :rules="rules">
    <n-form-item path="email" class="input-spacing">
      <n-auto-complete
          v-model:value="model.email"
          :input-props="{
            autocomplete: 'disabled'
          }"
          :options="options"
          placeholder="请输入注册邮箱以找回密码"
          clearable
          size="large"
      >
        <template #prefix>
          <n-icon :component="Email" />
        </template>
      </n-auto-complete>
    </n-form-item>

    <n-form-item class="centered-item">
      <n-button round size="large" class="btn-space" @click="backLogin">取消</n-button>
      <n-button
          :disabled="model.email === null"
          type="primary"
          @click="handleValidateButtonClick"
          round
          size="large"
      >
        确认
      </n-button>
    </n-form-item>
  </n-form>

</template>

<script lang="ts">
import '@/css/FormCss.css';
import {computed, defineComponent, ref} from 'vue'
import {NForm, NFormItem, NButton, NIcon, NAutoComplete,
  FormInst, FormItemRule, useMessage, FormRules} from 'naive-ui'
import { useRouter } from 'vue-router'
import { Email } from '@vicons/carbon';
import emailjs from 'emailjs-com'
import {UserInfoArray} from "@/types/UserInfo";

interface ModelType {
  email: string | null
}

export default defineComponent({
  components: {
    NAutoComplete,
    NForm,
    NFormItem,
    NButton,
    NIcon
  },
  setup() {
    const router = useRouter();
    const suffixes = ['@foxmail.com', '@qq.com', '@163.com', '@outlook.com', '@gmail.com'];
    const formRef = ref<FormInst | null>(null)
    const message = useMessage()
    const modelRef = ref<ModelType>({
      email: null,
    })

    // 验证规则
    const rules: FormRules = {
      email: [
        {
          required: true,
          message: '请输入邮箱',
          trigger: ['blur']
        },
        {
          validator (rule: FormItemRule, value: string) {
            if (value == null || value == '') return true
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            const userInfo: string | null = localStorage.getItem('UserInfo');
            let userList: UserInfoArray | null = userInfo ? JSON.parse(userInfo) : null;

            if (userList) {
              for (let i = 0; i < userList.length; i++) {
                if (userList[i].email === value)
                  return emailPattern.test(value);
              }
            }
            return false;
          },
          message: '邮箱不存在或格式不正确',
          trigger: ['blur']
        }
      ],
    }

    // 邮箱验证码
    const register = () => {
      const serviceId = 'service_2s513li'
      const templateId = 'template_fkr4wxt'
      const userId = 'LuQdxvUmDwumcnIm4'

      const params = {
        to_email: modelRef.value.email,
        message: `${Math.floor(100000 + Math.random() * 900000)}`
      }

      emailjs.send(serviceId, templateId, params, userId)
          .then(() => {
            console.log('Email sent successfully!')
            const data = {
              email: modelRef.value.email,
              verificationCode: params.message
            };
            sessionStorage.setItem('forgotUser', JSON.stringify(data));
          })
          .catch(error => console.error('Error sending email:', error))
    }

    return {
      Email,
      formRef,
      model: modelRef,
      rules,
      options: computed(() => {
        return suffixes.map((suffix) => {
          let prefix = modelRef.value.email
          prefix = prefix ? prefix.split('@')[0] : ''
          return {
            label: prefix + suffix,
            value: prefix + suffix
          }
        })
      }),
      // 验证表单
      handleValidateButtonClick (e: MouseEvent) {
        e.preventDefault()
        formRef.value?.validate((errors) => {
          if (!errors) {
            register();
            message.success('验证码发送成功')
            router.push('/retrieve');
          }
        }).catch(() => message.error('请输入您的注册邮箱'));
      },
      backLogin() {
        router.push('/');
      }
    }
  }
})
</script>