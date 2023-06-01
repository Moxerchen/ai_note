<template>
  <n-form>
    <n-form-item class="input-spacing">
      <n-auto-complete
          v-model:value="email"
          :input-props="{
            autocomplete: 'disabled'
          }"
          :options="options"
          placeholder="请输入邮箱"
          clearable
      >
        <template #prefix>
          <n-icon :component="Email" />
        </template>
      </n-auto-complete>
    </n-form-item>

    <n-form-item class="input-spacing">
      <n-input
          v-model:value="password"
          type="password"
          show-password-on="click"
          placeholder="请输入密码"
      >
        <template #prefix>
          <n-icon :component="Locked" />
        </template>
      </n-input>
    </n-form-item>

    <n-form-item class="centered-item">
      <n-space>
        <n-button round size="large" class="btn-space" type="info" @click="handleLogin">登录</n-button>
        <n-button round size="large" @click="handleRegister">注册</n-button>
      </n-space>
    </n-form-item>
  </n-form>
</template>


<script lang="ts">
import '@/css/FormCss.css';
import {computed, defineComponent, ref} from 'vue';
import { NAutoComplete, NButton, NForm, NFormItem, NInput, NSpace, NIcon } from 'naive-ui';
import { Email, Locked } from '@vicons/carbon';

export default defineComponent({
  components: { NAutoComplete, NButton, NForm, NFormItem, NInput, NSpace, NIcon },
  setup(props, context) {
    const email = ref('');
    const password = ref('');
    const suffixes = ['@foxmail.com', '@qq.com', '@163.com', '@outlook.com', '@gmail.com'];

    function handleLogin() {
      context.emit('login', email.value, password.value);
    }

    function handleRegister() {
      context.emit('register');
    }

    return {
      Email,
      Locked,
      email,
      options: computed(() => {
        return suffixes.map((suffix) => {
          const prefix = email.value.split('@')[0]
          return {
            label: prefix + suffix,
            value: prefix + suffix
          }
        })
      }),
      password,
      handleLogin,
      handleRegister,
    };
  },
});

</script>