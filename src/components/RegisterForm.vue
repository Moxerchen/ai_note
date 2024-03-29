<template>

  <n-form ref="formRef" :model="model" :rules="rules">
    <n-form-item path="email" class="input-spacing">
      <n-auto-complete
          v-model:value="model.email"
          :input-props="{
            autocomplete: 'disabled'
          }"
          :options="options"
          placeholder="请输入邮箱"
          clearable
          @keydown.enter.prevent
      >
        <template #prefix>
          <n-icon :component="Email" />
        </template>
      </n-auto-complete>
    </n-form-item>

    <n-form-item path="password" class="input-spacing">
      <n-input
          v-model:value="model.password"
          type="password"
          @input="handlePasswordInput"
          show-password-on="click"
          placeholder="请输入密码"
          @keydown.enter.prevent
      >
        <template #prefix>
          <n-icon :component="Locked" />
        </template>
      </n-input>
    </n-form-item>

    <n-form-item
        ref="rPasswordFormItemRef"
        first
        path="reenteredPassword"
        class="input-spacing"
    >
      <n-input
          v-model:value="model.reenteredPassword"
          type="password"
          show-password-on="click"
          placeholder="请再次输入密码"
          @keydown.enter.prevent
      >
        <template #prefix>
          <n-icon :component="Locked" />
        </template>
      </n-input>
    </n-form-item>

    <n-form-item class="centered-item">
      <n-button round size="large" class="btn-space" @click="backLogin">取消</n-button>
      <n-button
          :disabled="model.email === null || model.password === null || model.reenteredPassword === null"
          type="primary"
          @click="handleValidateButtonClick"
          round
          size="large"
      >
        注册
      </n-button>
    </n-form-item>
  </n-form>

</template>

<script lang="ts">
import '@/css/FormCss.css';
import {computed, defineComponent, ref} from 'vue'
import {NForm, NFormItem, NInput, NButton, NIcon, NAutoComplete,
  FormInst, FormItemInst, FormItemRule, useMessage, FormRules} from 'naive-ui'
import { useRouter } from 'vue-router'
import { Email, Locked } from '@vicons/carbon';
import emailjs from 'emailjs-com'
import {UserInfoArray} from "@/types/UserInfo";

interface ModelType {
  email: string | null
  password: string | null
  reenteredPassword: string | null
}

export default defineComponent({
  components: {
    NAutoComplete,
    NForm,
    NFormItem,
    NInput,
    NButton,
    NIcon
  },
  setup() {
    const router = useRouter();
    const suffixes = ['@foxmail.com', '@qq.com', '@163.com', '@outlook.com', '@gmail.com'];
    const formRef = ref<FormInst | null>(null)
    const rPasswordFormItemRef = ref<FormItemInst | null>(null)
    const message = useMessage()
    const modelRef = ref<ModelType>({
      email: null,
      password: null,
      reenteredPassword: null
    })

    // 确认密码验证规则
    function validatePasswordSame (rule: FormItemRule, value: string): boolean {
      if (value !== modelRef.value.password) {
        rule.message = '两次输入的密码不一致'
        return false
      }
      return true
    }

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
                  return !emailPattern.test(value);
              }
            }
            return true;
          },
          message: '邮箱已注册或格式不正确',
          trigger: ['blur']
        }
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: ['blur']
        },
        {
          validator (rule: FormItemRule, value: string) {
            if (value == null || value == '') return true
            const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[^]{6,16}$/;
            return passwordPattern.test(value);
          },
          message: '必须包含字母和数字，且长度为6-16位',
          trigger: ['blur']
        }
      ],
      reenteredPassword: [
        {
          required: true,
          message: '请再次输入密码',
          trigger: ['blur']
        },
        {
          validator: validatePasswordSame,
          message: '两次密码输入不一致',
          trigger: ['blur', 'password-input', 'input']
        }
      ]
    }

    // 邮箱验证码
    const register = () => {
      const serviceId = 'service_2s513li'
      const templateId = 'template_bqdwy0d'
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
              password: modelRef.value.password,
              verificationCode: params.message
            };
            sessionStorage.setItem('registeredUser', JSON.stringify(data));
          })
          .catch(error => console.error('Error sending email:', error))
    }

    return {
      Email,
      Locked,
      formRef,
      rPasswordFormItemRef,
      model: modelRef,
      rules,
      // 自定义触发器
      handlePasswordInput () {
        if (modelRef.value.reenteredPassword) {
          rPasswordFormItemRef.value?.validate({ trigger: 'password-input' })
              .catch((error) => console.log(error));
        }
      },
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
            router.push('/verification');
          }
        }).catch(() => message.error('请正确输入信息'));
      },
      backLogin() {
        router.push('/');
      }
    }
  }
})
</script>