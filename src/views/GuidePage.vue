<template>
  <div class="guide-page">
    <n-h1 style="
      font-size: 42px;
      font-family: 'Comic Sans MS', serif;
      font-weight: bold;
      margin-top: 20px">
      Welcome
    </n-h1>

    <n-layout-content content-style="padding: 20px 40px;">
      <n-steps vertical :current="currentStep" size="medium" status="process">
        <n-step
            title="Step 1: 创建笔记📖"
            description="您可以将任何东西记录在笔记中，也可以收藏自己喜欢的笔记~💞" />
        <n-step
            title="Step 2: 智能分析💡"
            description="当你苦恼于不知如何继续你的笔记时，试试求助我们的AI吧！🤖" />
        <n-step
            title="Step 3: 资料查询📚"
            description="有想看的书？有不会做的题？不用再费尽心思搜索资源啦，书库为您一键搞定！🏢" />
        <n-step
            title="Step 4: 个性化设置🪄"
            description="青春不应该被定义！快设置你独一无二的的个性签名吧~🥳" />
      </n-steps>
    </n-layout-content>

    <n-button @click="handleNext" round size="large" type="primary" style="font-family: '微软雅黑 Light',serif;">
      下一步
    </n-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { NSteps, NStep, NButton, NLayoutContent, NH1 } from "naive-ui";
import router from "@/router";
import {useNewUser} from "@/untils/useNewUser";

export default defineComponent({
  components: {
    NSteps,
    NStep,
    NButton,
    NLayoutContent,
    NH1,
  },
  setup() {
    useNewUser();

    const currentStep = ref<number>(1);

    const handleNext = () => {
      if (currentStep.value > 3) {
        const currentUser: string | null = localStorage.getItem('currentUser');
        if (currentUser) {
          const user = JSON.parse(currentUser);
          user.isFirstLogin = false;
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        router.push('/new-user');
      } else
        currentStep.value++;
    };

    return {
      currentStep,
      handleNext
    };
  },
});
</script>

<style scoped>
.guide-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
}
</style>