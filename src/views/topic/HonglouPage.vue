<template>
  <div class="personalPage">
  <div class="container">
    <div class="image-section">
      <van-card class="custom-card">
        <template #title>
          <div class="custom-title">红楼梦</div>
        </template>
        <template #desc>
          <div class="custom-desc">原名《石头记》，是中国古代章回体长篇小说，中国古典四大名著之首</div>
        </template >
        <template #thumb>
          <img src="https://isbncoverdb.com/images/book-cover-book2394563.webp"  class="cardImg"/>
        </template>
      </van-card>

    </div>

    <div class="content-section">
      <h2>内容简介</h2>
      <h4 style="font-weight: normal">小说以贾、史、王、薛四大家族的兴衰为背景，以富贵公子贾宝玉为视角，以贾宝玉与林黛玉、薛宝钗的爱情婚姻悲剧为主线，描绘了一些闺阁佳人的人生百态，展现了真正的人性美和悲剧美，是一部从各个角度展现女性美以及中国古代社会百态的史诗性著作。</h4>
    </div>

    <div class="red-section">
      <h3>猜你喜欢</h3>
      <van-grid :border="false" :column-num="3">
        <van-grid-item text="???">
          <van-image
              src="https://isbncoverdb.com/images/book-cover-book27164383.webp"
          />
        </van-grid-item>
        <van-grid-item>
          <van-image
              src="https://isbncoverdb.com/images/book-cover-book169851.webp"
          />
        </van-grid-item>
        <van-grid-item>
          <van-image
              src="https://isbncoverdb.com/images/book-cover-book5-3473161.webp"
          />
        </van-grid-item>
      </van-grid>

    </div>
  </div>

    <van-sticky v-model="isSticky" :offset-bottom="0">
      <div class="bottom-bar1">
        <van-button round  class="bottom-button" type="primary"  size="mini" @click="toBook">开始阅读</van-button>
      </div>
      <div class="bottom-bar" >
        <span @click="goBack">&lt;</span>
        <span>&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </div>
    </van-sticky>
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
      router.push('/Book')
    }

    function goBack(){
      router.go(-1)
    }

    function toBook(){
      router.push('/Book')
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
  font-size: 16px;
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
  padding: 0 10px;
  color: #2b2b2b;
  box-shadow: 0 0 5px ghostwhite;
}

.bottom-button {
  width: 95%;
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