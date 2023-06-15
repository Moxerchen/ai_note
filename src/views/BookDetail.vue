<template>
 <div class="personalPage">
  <div class="container">
    <div class="image-section">
      <van-card class="custom-card">
        <template #title>
          <div class="custom-title">西游记</div>
        </template>
        <template #desc>
          <div class="custom-desc">中国古代第一部浪漫主义章回体长篇神魔小说</div>
        </template >
        <template #thumb>
          <img src="../assets/xiyouji.png"  class="cardImg"/>
        </template>
      </van-card>

    </div>

    <div class="content-section">
      <p class="jianjie">内容简介</p>
      <p class="neirong">孙悟空出世，跟随菩提祖师学艺及大闹天宫后，遇见了唐僧、猪八戒、沙僧和白龙马，西行取经，一路上历经艰险，降妖除魔，经历了九九八十一难，终于到达西天见到如来佛祖，最终五圣成真的故事。该小说以“玄奘取经”这一历史事件为蓝本，经作者的艺术加工，深刻地描绘出明代百姓的社会生活状况。</p>
    </div>

    <div class="red-section">
      <p class="gass">猜你喜欢</p>
      <van-grid :border="false" :column-num="3">
        <van-grid-item text="???">
          <van-image
              src="https://isbncoverdb.com/images/book-cover-book5-3473161.webp"
          />
        </van-grid-item>
        <van-grid-item>
          <van-image
              src="https://isbncoverdb.com/images/book-cover-book22889066.webp"
          />
        </van-grid-item>
        <van-grid-item>
          <van-image
              src="https://isbncoverdb.com/images/book-cover-book27164383.webp"
          />
        </van-grid-item>
      </van-grid>

    </div>

    <van-sticky v-model="isSticky" :offset-bottom="0">
      <div class="bottom-bar1">
        <van-button round  class="bottom-button" type="primary"  size="mini" @click="toBook">开始阅读</van-button>
      </div>
      <div class="bottom-bar" >
        <span @click="goBack">&lt;</span>
        <span @click="MoreInfo">&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </div>
    </van-sticky>
  </div>
 </div>
  <!--  wellhu -->
</template>

<script lang="ts">
import { ref } from 'vue';
import { Card, Button, Sticky,} from 'vant';
import {useRouter} from "vue-router";

export default {
  components: {
    [Card.name]: Card,
    [Button.name]: Button,
    [Sticky.name]: Sticky,
  },
  setup() {
    const isSticky = ref(true);
    const offsetTop = ref(0);
    const router = useRouter();

    function MoreInfo(){
      router.go(-1)
    }

    function goBack(){
      router.push('BookList')
    }

    function toBook(){
      router.push('/BookPage')
    }

    return {
      isSticky,
      offsetTop,
      MoreInfo,
      toBook,
      goBack,
    };
  },
};
</script>

<style scoped>
.jianjie{
  font-size: 24px;
}
.neirong{
  font-size: 16px;
}
.gass{
  font-size: 18.72px;
}
.personalPage{
  padding: 16px;
}
.custom-card{
  height: 100%;
}
.cardImg{
  height: 100px;
  width: 100px;
  margin-top: 20px;
}
.custom-title {
  margin-top: 20px;
  margin-left: 15px;
  font-size: 24px;
}

.custom-desc {
  font-size: 16px !important;
  margin-left: 15px;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.image-section {
  height: 150px;
  position: relative;
}

.content-section {
  margin-top: 10px;
  height: 300px;
  overflow: auto;
}

.red-section {
  height: 200px;
}

.bottom-bar1 {
  position: fixed;
  bottom: 40px;
  left: 0;
  width: 100%;
  height: 35px;
  background-color: ghostwhite;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0px;
  color: #2b2b2b;
  box-shadow: 0 0 5px ghostwhite;
}

.bottom-button {
  width: 95%;
  left: 10px;
  height: 25px;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 120px;
  color: white;
  font-size: 20px;
}

</style>
