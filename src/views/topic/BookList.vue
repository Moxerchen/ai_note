<template>
  <div class="page">
    <van-sidebar v-model="activeKey" @change="handleSidebarChange" class="sidebar">
      <van-sidebar-item v-for="item in sidebarItems" :title="item.title" :name="item.key" :key="item.key"  class="sidebarItem"/>
    </van-sidebar>

    <div class="content">
      <div v-for="card in activeCardGroup.cards" :key="card.id" class="card" @click="handleCilck(card)">
        <van-card >
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
        <div class="divider1"></div>
      </div>
    </div>

    <div class="bottom-bar" >
      <span @click="goBack">&lt;</span>
      <span >&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    </div>

  </div>
  <!--  wellhu -->
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import { Sidebar, SidebarItem, Card } from 'vant';
import {useRouter} from "vue-router";

export default {
  components: {
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem,
    [Card.name]: Card,
  },
  setup() {
    const router = useRouter();
    const activeKey = ref('0');

    const goBack = () => {
      router.push('/BookBankPage')
    }

    function goBookDetail(){
      router.push('/BookDetail')
    }

    const sidebarItems = [
      { key: '0', title: '经典阅读' },
      { key: '1', title: '外国名著' },
      { key: '2', title: '编程学习' },
      { key: '3', title: '英语学习' },
    ];

    const cardGroups = [
      {
        key: '0',
        cards: [
          { id: 1, title: '西游记',desc:'The first Romantic chapter length novel about gods ' ,thumb:'https://isbncoverdb.com/images/book-cover-book27322353.webp',path:'/BookDetail'},
          { id: 2, title: '红楼梦',desc:'an ancient Chinese long novel in the form of a chapter' ,thumb:'https://isbncoverdb.com/images/book-cover-book2394563.webp',path:'/HongLou' },
        ],
      },
      {
        key: '1',
        cards: [
          { id: 3, title: '悲惨世界',desc:'The Personal Experience of the protagonist Toulon, the Crusader Jean Valjean' ,thumb:'https://isbncoverdb.com/images/book-cover-book3509030.webp' },
          { id: 4, title: '挪威的森林',desc:'The sadness and powerlessness of life' ,thumb:'https://isbncoverdb.com/images/book-cover-book24167617.webp' },
        ],
      },
      {
        key: '2',
        cards: [
          { id: 5, title: '计算机网络',desc:'It\'s all about memorizing, it\'s hard to get dizzy' ,thumb:'https://isbncoverdb.com/images/book-cover-book5-3473161.webp' },
          { id: 6, title: 'Android开发',desc:'I basically didn\'t learn anything in class, relying entirely on GPT and CSDN' ,thumb:' https://isbncoverdb.com/images/book-cover-androd-smartphone.webp' },
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
      return cardGroups.find(group => group.key == activeKey.value) || { cards: [{ id: 5, title: 'Card 3.1',desc:'错误2' ,thumb:'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg' },
          { id: 6, title: 'Card 3.2',desc:'错误2' ,thumb:'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg' },
          { id: 7, title: 'Card 3.3',desc:'错误2' ,thumb:'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg' },] };
    });

    const handleSidebarChange = (key: string) => {
      activeKey.value = key;
    };

    const handleCilck = (card:any)=> {
      router.push({
        path: card.path
      })
    }

    return {
      activeKey,
      sidebarItems,
      cardGroups,
      activeCardGroup,
      handleSidebarChange,
      goBack,
      goBookDetail,
      handleCilck,
    };
  },
};
</script>

<style scoped>
.page {
  display: flex;
  padding: 16px;
}

.sidebar {
  width: 100px;
}

.content {
  flex-grow: 1;
  padding: 0;
  width: 240px;
}
.card-image{
  width: 88px;
  height: 88px;
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
.divider1{
  border: 1px solid white;
}

</style>
