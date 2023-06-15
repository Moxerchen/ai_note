<template>
  <div class="personal-page">
    <n-card>
      <template #header-extra>
        <n-button
            @click="LogOut"
            circle
            quaternary
            style="position: fixed; margin-bottom: 60px; right: 40px"
        >
          <n-icon :component="Logout" size="20"/>
        </n-button>
      </template>

      <template #header>
        <div class="card-header">
          <n-avatar
              round
              :size="48"
              src="https://picdl.sunbangyan.cn/2023/06/15/fm2res.png" />
          <div class="user-info">
            <div class="user-name">{{ name }}</div>
            <div class="user-email">{{ email }}</div>
          </div>
        </div>
        你可以成为你想成为的任何人🌈
      </template>

      <n-statistic label="笔记数量" :value="noteCount">
        <template #prefix>
          <n-icon :component="AlignBoxTopLeft" style="margin-right: 10px"/>
        </template>
        <template #suffix>
          / ♾️
        </template>
      </n-statistic>
      <template #action>
        <p class="sentence">
          少年自当扶摇上<br/>
          揽星衔月逐日光
        </p><br/>
        少侠，学无止境！💯
      </template>
    </n-card>

    <n-card title="联系我们" style="margin-top: 30px;">
      <div style="display: flex; align-items: center; margin-bottom: 10px;">
        <n-icon :component="Email" size="22"/>
        <span>：ainote2023@gmail.com</span>
      </div>
      <div style="display: flex; align-items: center;">
        <n-icon :component="LogoGithub" size="22"/>
        <span>：github.com/Moxerchen/ai_note.git</span>
      </div>
    </n-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { NCard, NAvatar, NStatistic, NIcon, NButton } from 'naive-ui';
import { AlignBoxTopLeft, Logout, Email, LogoGithub } from '@vicons/carbon';
import router from "@/router";

export default defineComponent({
  components: {
    NCard,
    NAvatar,
    NStatistic,
    NIcon,
    NButton
  },
  setup() {
    const currentUser = localStorage.getItem('currentUser');

    const name = ref<string | null>(currentUser ? JSON.parse(currentUser).name : '出错啦！😣');
    const email = ref<string | null>(currentUser ? JSON.parse(currentUser).email : '刷新试试看吧~🤕');
    const noteCount = ref<number>(currentUser ? JSON.parse(currentUser).notes.length : 0);

    const LogOut = () => {
      // 将currentUser中的数据更新到UserInfo中，替换原来的数据
      const currentUser = localStorage.getItem('currentUser');
      const UserInfo = localStorage.getItem('UserInfo');
      // 找到UserInfo中和currentUser中相同email的数据，替换
      const currentUserData = currentUser ? JSON.parse(currentUser) : "";
      const UserInfoData = UserInfo ? JSON.parse(UserInfo) : "";
      const index = UserInfoData.findIndex((item: any) => item.email === currentUserData.email);
      UserInfoData.splice(index, 1, currentUserData);

      localStorage.setItem('UserInfo', JSON.stringify(UserInfoData));
      localStorage.removeItem('currentUser');

      localStorage.setItem('isLogged', String(false));

      router.push('/');
    };

    return {
      AlignBoxTopLeft,
      Logout,
      Email,
      LogoGithub,
      name,
      email,
      noteCount,
      LogOut
    };
  }
});
</script>

<style scoped>
.personal-page {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.user-info {
  margin-left: 10px;
}

.user-name {
  font-weight: bold;
}

.user-email {
  color: #888;
}

.sentence {
  font-size: 16px;
  font-style: italic;
  color: #888;
  margin-bottom: -5px;
}
</style>
