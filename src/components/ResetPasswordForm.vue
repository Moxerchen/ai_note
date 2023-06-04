<template>

  <n-form ref="formRef" :model="model" :rules="rules">

    <n-form-item path="password" class="input-spacing">
      <n-input
          v-model:value="model.password"
          type="password"
          @input="handlePasswordInput"
          show-password-on="click"
          placeholder="请输入新的密码"
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
          placeholder="请再次输入新密码"
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
          :disabled="model.password === null || model.reenteredPassword === null"
          type="primary"
          @click="handleValidateButtonClick"
          round
          size="large"
      >
        重置
      </n-button>
    </n-form-item>
  </n-form>

</template>

<script lang="ts">
import '@/css/FormCss.css';
import {defineComponent, ref} from 'vue'
import {NForm, NFormItem, NInput, NButton, NIcon,
  FormInst, FormItemInst, FormItemRule, useMessage, FormRules} from 'naive-ui'
import { useRouter } from 'vue-router'
import { Locked } from '@vicons/carbon';
import {UserInfo, UserInfoArray} from "@/types/UserInfo";
import {ForgotInfo} from "@/types/ForgotInfo";

interface ModelType {
  password: string | null
  reenteredPassword: string | null
}

export default defineComponent({
  components: {
    NForm,
    NFormItem,
    NInput,
    NButton,
    NIcon
  },
  setup() {
    const router = useRouter();
    const formRef = ref<FormInst | null>(null)
    const rPasswordFormItemRef = ref<FormItemInst | null>(null)
    const message = useMessage()
    const modelRef = ref<ModelType>({
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

    return {
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
      // 验证表单
      handleValidateButtonClick (e: MouseEvent) {
        e.preventDefault()
        formRef.value?.validate((errors) => {
          if (!errors) {
            const forgotUser: string | null = sessionStorage.getItem('forgotUser');
            const forgotInfo : ForgotInfo | null = forgotUser ? JSON.parse(forgotUser) : null;
            const userInfo: string | null = localStorage.getItem('UserInfo');
            let userList: UserInfoArray | null = userInfo ? JSON.parse(userInfo) : null;

            if (userList == null) {
              userList = new Array<UserInfo>();
            }

            // 重置密码
            for (let i = 0; i < userList.length; i++) {
              if (userList[i].email === forgotInfo?.email) {
                userList[i].password = modelRef.value.password as string;
                break;
              }
            }

            localStorage.setItem('UserInfo', JSON.stringify(userList));
            sessionStorage.removeItem('forgotUser');
            message.success('重置密码成功');
            router.push('/');
          }
        }).catch(() => message.error('请检查密码是否符合要求'));
      },
      backLogin() {
        router.push('/retrieve');
      }
    }
  }
})
</script>