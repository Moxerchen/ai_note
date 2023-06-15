<template>
  <div class="verification-page">
    <img src="../../assets/logo.png" alt="Logo" class="logo">

    <n-form :model="model">
      <n-form-item class="input-spacing" path="verificationCode">
        <n-input
            v-model:value="model.verificationCode"
            placeholder="请输入验证码"
            :maxlength="6"
            :allow-input="onlyAllowNumber"
            round
            size="large"
            @input="verifyCode"
        />
      </n-form-item>

      <n-form-item class="centered-item">
        <n-button round size="large" class="large-button" @click="backLogin">取消</n-button>
      </n-form-item>
    </n-form>

    <div id="footer">
      <PrivacyModal />
    </div>
  </div>
</template>

<script lang="ts">
import "@/css/FormCss.css";
import PrivacyModal from "@/components/PrivacyModal.vue";
import { defineComponent, ref } from 'vue'
import { NButton, NForm, NInput, useMessage } from "naive-ui";
import { useRouter } from "vue-router";
import {ForgotInfo} from "@/types/ForgotInfo";
import {useAuth} from "@/untils/useAuth";

export default defineComponent ({
  components: { NButton, NForm, NInput, PrivacyModal },

  setup() {
    // 检测登录状态
    useAuth();

    const message = useMessage()
    const router = useRouter();
    const model = ref({ verificationCode: '' });

    const verifyCode = () => {
      const value = model.value.verificationCode;
      if (value.length === 6) {
        const forgotUser: string | null = sessionStorage.getItem('forgotUser');
        const forgotInfo : ForgotInfo | null = forgotUser ? JSON.parse(forgotUser) : null;

        if (forgotInfo && forgotInfo.verificationCode === value) {
          message.success('验证成功');
          router.push('/reset-password');
        } else {
          message.error('验证码不正确');
        }
      }
    }

    return {
      model,
      verifyCode,
      onlyAllowNumber: (value: string) => {
        return !value || /^\d+$/.test(value) && !value.startsWith(' ') && !value.endsWith(' ')
      },
      backLogin() {
        router.push('/forget-password');
      }
    };
  }
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-align: center;
}

.verification-page {
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

.large-button {
  width: 80px;
  margin-top: 75px;
}
</style>