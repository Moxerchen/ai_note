<template>
  <div class="container">
    <van-tabs v-model="activeTab" type="line" class="tab-container" @change="handleSidebarChange"  animated >
      <van-tab v-for="tag in tags" :key="tag.key" :title="tag.title" :name="tag.key"  />
    </van-tabs>

    <div class="card-container">
      <van-card v-for="card in activeCardGroup.cards" :key="card.id" class="card" @click="handleCilck(card)">
        <template #title>
          <div class="card-title">{{ card.title }}</div>
        </template>
        <template #thumb>
          <img :src="card.thumb" class="card-image" />
        </template>
        <template #desc>
          <div class="card-desc">{{ card.desc }}</div>
        </template>
      </van-card>
    </div>
  </div>
  <div class="bottom-bar" >
    <span @click="goBack">&lt;</span>
    <span>&gt;</span>
  </div>
  <!--  wellhu -->
</template>

<script lang="ts">
import {defineComponent, Ref, ref} from 'vue';
import {computed} from "vue";
import {useRouter} from "vue-router";
import {Card, Tabs} from "vant";

export default defineComponent({
  components: {
    [Tabs.name]: Tabs,
    [Card.name]: Card,
  },
  setup() {
    const router = useRouter();
    const activeTab = ref('0');

    const tags = [
      { key: '0', title: '数学类' },
      { key: '1', title: '文学类' },
      { key: '2', title: '编程类' },
      { key: '3', title: '英语类' }
    ];

    const cards =[
      {
        key: '0',
        cards: [
          { id: 1, title: '微积分Ⅰ',desc:'The branch of mathematics that studies the differentiation and integration of functions.' ,thumb:'https://isbncoverdb.com/images/book-cover-book2381713.webp',path:'/QuestionBank'},
          { id: 2, title: '微积分Ⅱ',desc:'The branch of mathematics that studies the differentiation and integration of functions.' ,thumb:'https://isbncoverdb.com/images/book-cover-book2381693.webp',path:'/' },
        ],
      },
      {
        key: '1',
        cards: [
          { id: 3, title: '悲惨世界',desc:'The Personal Experience of the protagonist Toulon, the Crusader Jean Valjean' ,thumb:'https://isbncoverdb.com/images/book-cover-book3509030.webp' },
          { id: 4, title: '挪威的森林',desc:'The sadness and powerlessness of life' ,thumb:'https://cdnagesdb.com/images/fictionimages/2D03639C1C9C1903A26DC232AC5050A2.webp' },
        ],
      },
      {
        key: '2',
        cards: [
          { id: 5, title: '计算机网络',desc:'It\'s all about memorizing, it\'s hard to get dizzy' ,thumb:'https://isbncoverdb.com/images/book-cover-book5-3473161.webp' },
          { id: 6, title: 'Android开发',desc:'I basically didn\'t learn anything in class, relying entirely on GPT and CSDN' ,thumb:'https://isbncoverdb.com/images/book-cover-androd-smartphone.webp'},
          { id: 7, title: 'WEB设计',desc:'Why are you looking for so many pictures and text? Why' ,thumb:'https://cdnagesdb.com/images/booksimages/56350CD5C1C81ED8B16704B48240F2B1.webp' },
        ],
      },
      {
        key: '3',
        cards: [
          { id: 8, title: '雅思王语料库',desc:'Why are you looking for so many pictures and text? Why' ,thumb:'https://isbncoverdb.com/images/book-cover-book10-2783788.webp' },
          { id: 9, title: '剑18',desc:'There\'s nothing to say, it\'s simply expensive and difficult' ,thumb:'https://isbncoverdb.com/images/book-cover-book15-24007063.webp' },
          { id: 10, title: '大学英语Ⅰ',desc:'I haven\'t learned it before, maybe it will be difficult' ,thumb:'https://isbncoverdb.com/images/book-cover-book2-28122467.webp' },
        ],
      },
    ];


    const activeCardGroup = computed(() => {
      return cards.find(group => group.key === activeTab.value) || { cards: [{ id: 5, title: 'Card 3.1',desc:'cnmlgb2' ,thumb:'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg' },
          { id: 6, title: 'Card 3.2',desc:'cnmlgb2' ,thumb:'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg' },
          { id: 7, title: 'Card 3.3',desc:'cnmlgb2' ,thumb:'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg' },] };
    });

    const handleSidebarChange = (key: string) => {
      activeTab.value = key
    };

    const handleCilck = (card:any)=>{
      router.push({
        path:card.path
      })

    }

    function goBack(){
      router.push('/book')
    }

    return {
      activeCardGroup,
      activeTab,
      tags,
      cards,
      handleSidebarChange,
      goBack,
      handleCilck,
    };
  },
});
</script>

<style scoped>
.container {
  padding: 20px;
}

.tab-container {
  margin-bottom: 10px;
}

.card-container {
  margin-top: 10px;
}

card {
  margin-bottom: 10px;
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
  transition: transform 0.3s ease-in-out;
}
.card-image{
  width: 88px;
  height: 88px;
}
</style>
