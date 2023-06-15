<template>
  <div class="new-user-page">
    <img src="../assets/name.png" alt="name" class="name-logo">
    <n-h1 style="
      font-size: 24px;
      font-family: 'Comic Sans MS + YouYuan', serif;
      font-weight: bold;
      margin: 50px 0">
      开启智慧笔记的第一步~✨
    </n-h1>

    <n-form ref="formRef" :model="model">
      <n-form-item class="input-spacing" path="userName" :rule="rules.userName">
        <n-input
            v-model:value="model.userName"
            placeholder="请输入你的昵称"
            round
            size="large"
            style="text-align: center"
        />
      </n-form-item>
    </n-form>

    <n-button
        @click="setName"
        round
        size="large"
        type="primary"
        class="btn-user-name"
    >
      出发！
    </n-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {FormInst, FormItemRule, NButton, NForm, NFormItem, NInput, useMessage} from 'naive-ui';
import router from "@/router";

export default defineComponent({
  components: {
    NButton,
    NForm,
    NFormItem,
    NInput,
  },
  setup() {
    const message = useMessage();

    const model = ref({
      userName: '',
    });
    const formRef = ref<FormInst | null>(null)
    const rules = {
      userName: [
        {
          required: true,
          message: '行走江湖，怎么甘心做一个无名之辈🧙‍♂️',
          trigger: ['blur']
        },
        {
          validator(rule: FormItemRule, value: string) {
            if (value == null || value == '')
              return true;

            const forbiddenChars = /[\\./"[\]:|<>+=;,?*@ ]/g;
            if (forbiddenChars.test(value) || value.length > 6) {
              message.error('昵称不可以超过6位，且不能含有句号和/或空格，或以下字符:\n' +
                  ' \\ / " [ ] : | < > + = ; , ? * @');
              return false;
            }
            return true;
          },
          message: '还是低调一点吧！😣',
          trigger: ['input'],
        }
      ],
    };

    const setName = () => {
      formRef.value?.validate((errors) => {
        if (!errors) {
          const currentUser: string | null = localStorage.getItem('currentUser');
          if (currentUser) {
            const user = JSON.parse(currentUser);
            user.name = model.value.userName;
            user.isFirstLogin = false;
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          message.success('恭喜您加入AI Note的大家庭！')
          router.push('/home');
        }
      }).catch(() => message.error('云想衣裳花想容~大侠怎能没有相称的名号？'));
    };

    return {
      model,
      formRef,
      setName,
      rules,
    };
  }
});
</script>

<style scoped>
.new-user-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
}

.name-logo {
  position: absolute;
  top: 10%;
  width: 150px;
  height: 150px;
}

.btn-user-name {
  position: absolute;
  bottom: 15%;
  font-family: '微软雅黑 Light',serif;
}
</style>
