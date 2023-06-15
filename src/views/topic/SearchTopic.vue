<script lang="ts">

import {defineComponent,} from 'vue';
import { NButton, NCard, NSpace, NIcon} from 'naive-ui';
import { Fire } from '@vicons/carbon'
import {useRouter} from "vue-router";


export default defineComponent({
  components: {  NButton, NCard, NSpace, NIcon, Fire, },
  setup(){
    const router = useRouter();

    function SearchPage(){
      router.push('/SearchPage');
    }

    function QuesBank(){
      router.push('/QuestionBank');
    }

    function SearchBook(){
      router.push('/BookBankPage');
    }

    function Book(){
      router.push('/Book');
    }

    function BankList(){
      router.push('/BankList');
    }

    return{
      SearchBook,
      SearchPage,
      QuesBank,
      Book,
      BankList,
      Fire,
    }

  }
})


</script>

<template>
  <div class="personalPage">
  <h1 class="label1">hey,你好</h1>
  <h5 class="label2">临渊羡鱼，不如退而结网。</h5>
  <div class="SearchButton">
    <n-button tertiary type="primary"  size="large" @click="SearchPage" class="firstButton" style="font-size: 18px;">
      搜索题目</n-button>
    <n-button tertiary type="info" size="large" @click="SearchBook" class="secondButton" style="font-size: 18px;">查看书籍</n-button>
  </div>
  <van-divider class="FirstDivider" color="#909399"></van-divider>
  <div style="display: flex; align-items: center;" class="label3"  @click="BankList">
    <n-icon size="20" color="#f08080"><Fire /></n-icon>
    <div style="margin-left: 5px;">热门题库</div>
    <div style="margin-left: 185px;font-size: 10px">查看更多></div>
  </div>

  <n-space vertical>
    <n-card title="宠物小精灵" size="small"  @click="QuesBank">ポケットモンスター</n-card>
    <n-card title="微积分Ⅱ" size="small"  >Calculus II</n-card>
    <n-card title="计算机网络" size="small"  >computer network</n-card>
    <n-card title="安卓编程" size="small"  >Android programing</n-card>
  </n-space>
  </div>
  <!--  wellhu -->
</template>

<style scoped>
.personalPage{
  padding: 16px;
}
.SearchButton{
  display: flex;
  gap: 40px;
  margin-top: 15px;
}
.label1{
  display:flex;
  left: 30px;
  font-weight: normal;
}
.FirstDivider{
  height: 15px;
}
.label3{
  display: flex;
  margin-bottom: 10px;
}
.label2{
  display: flex;
  margin-top: 10px;
  font-weight: normal;
}
.firstButton{
  width: 120px;
  height: 50px;
}
.secondButton{
  width: 120px;
  height: 50px;
}
</style>