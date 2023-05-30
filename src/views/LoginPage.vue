<template>
  <div class="login-page">
    <img src="../assets/logo.png" alt="Logo" class="logo">
    <LoginForm @login="handleLogin" @register="handleRegister" />
  </div>
  <div id="footer">
    <PrivacyModal />
    <n-button color="#6495ED" text @click="handleForgetPassword">忘记密码?</n-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import LoginForm from '../components/LoginForm.vue';
import PrivacyModal from "@/components/PrivacyModal.vue";
import { useRouter } from 'vue-router';
import { useMessage, NButton } from 'naive-ui';
import { UserInfoArray } from '@/types/UserInfo';


export default defineComponent({
  components: {
    NButton,
    PrivacyModal,
    LoginForm,
  },
  setup() {
    const message = useMessage()
    const router = useRouter()

    const handleLogin = (email: string, password: string) => {
      const user: string | null = localStorage.getItem('UserInfo');
      const userList: UserInfoArray | null = user ? JSON.parse(user) : null;

      if (userList) {
        for (let i = 0; i < userList.length; i++) {
          if (userList[i].email === email && userList[i].password === password) {
             const isLogged = true;

            message.success('登录成功');
            localStorage.setItem('isLogged', JSON.stringify(isLogged));
            router.push('/home');
            return;
          } else if (i === userList.length - 1) {
            message.error('邮箱或密码错误');
          }
        }
      }

    }

    const handleRegister = () => {
      router.push('/register');
    };

    const handleForgetPassword = () => {
      router.push('/forget-password');
    };

    return {
      formValue: ref({
          email: '',
          password: ''
      }),
      handleLogin,
      handleRegister,
      handleForgetPassword,
    };

}
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-page {
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

#footer {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  height: 12vh;
}
</style>
