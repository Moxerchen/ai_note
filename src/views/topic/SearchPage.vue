<script lang="ts">
import { ref , defineComponent ,} from 'vue';
import { NInput, NButton,NAlert} from 'naive-ui';
import { ArrowBackSharp } from '@vicons/ionicons5'
import { Fire } from '@vicons/carbon'
import {useRouter} from "vue-router";

interface DataItem{
  id:string;
  answer: string;
  questionBank: string;
}

export default defineComponent({
  components: {  NButton,NInput, },
   setup(){
    const searchKeyword = ref('');
    const router = useRouter();
    const data = ref<DataItem[]>([
      { id: '小智什么时候欺骗并遗弃比比鸟', answer: "1999年1月28日", questionBank: "宠物小精灵" },
      { id: '小智为什么每天都很开心', answer: "不用写大作业", questionBank: "宠物小精灵" },
      { id: 'TFTP使用什么协议', answer: "UDP", questionBank: "计算机网络" },
      { id: '为了对付重放攻击可以使用', answer: "不重数", questionBank: "计算机网络" },
      // 更多的数据...
    ]);
    const searchResults = ref<DataItem[]>([])
    const searchPerformed = ref(false);

    const clearSearch = () => {
      searchKeyword.value = '';
      searchResults.value = [];
      searchPerformed.value = false;
    };

    const performSearch = () => {
      let keyword = searchKeyword.value;
      searchResults.value = data.value.filter(item =>
          item.id.toString().includes(keyword) ||
          item.answer.includes(keyword) ||
          item.questionBank.includes(keyword)
      );
      searchPerformed.value = true;
    };

    const goBack = () => {
      router.push('/book')
    }

     const copyAndClear = async () => {
       clearSearch();
       const text = await navigator.clipboard.readText();
       searchKeyword.value = text;
     };


     return{
      searchKeyword,
      searchResults,
      searchPerformed,
      clearSearch,
      performSearch,
      goBack,
      copyAndClear,
      ArrowBackSharp,
      Fire,
      NAlert,
    }

  }
})


</script>

<template>
  <div class="search-page">
    <div class="title">
    <h4 class="label">题目搜索</h4>
  </div>
    <div class="input-wrapper">
      <div class="Input_area">
    <n-input
        v-model:value="searchKeyword"
        type="textarea"
        size="large"
        placeholder="请输入关键词进行搜索"
        style="margin-bottom: 16px;"
        class="custom-input"
    >
    </n-input>
    </div>
    <div class="button-group">
      <n-button @click="clearSearch" size="tiny" tertiary class="clearButton1">清除</n-button>
      <n-button @click="copyAndClear" size="tiny" tertiary class="clearButton2">清除并粘贴</n-button>
      <n-button
          color="#ff5e00"
          type="error"
          @click="performSearch"
          :disabled="!searchKeyword"
          class="search-button" >搜索</n-button>
    </div>
    </div>
    <div class="search-results" v-if="searchPerformed">
      <div v-for="result in searchResults" :key="result.id">
        <h3>题目: {{result.id}}</h3>
        <n-alert :show-icon="false">
          正确答案: {{result.answer}}<br>
          所属题库: {{result.questionBank}}
        </n-alert>
      </div>
      <div v-if="searchResults.length === 0" >
        <n-alert title="出错辣！" type="error" closable>
          未检索到相关信息，请联系管理员
        </n-alert>
      </div>
    </div>
  </div>

  <div class="bottom-bar" >
    <span @click="goBack">&lt;</span>
    <span class="gray-arrow">&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  </div>

  <!--  wellhu -->
</template>

<style scoped>
.input-wrapper {
  position: relative;
}

.search-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
}
.label{
  position: relative;
  top: -17px;
  font-size: 18px;
}
.button-group {
  position: absolute;
  bottom: 20px;
}
.clearButton1{
  position: relative;
  left:10px;
}
.clearButton2{
  position: relative;
  left: 15px;
}
.search-button{
  position: relative;
  left: 145px;
  width: 50px;
  height: 22px;
  padding: 10px;
  overflow: visible;
  text-align:center;
}
p{
  white-space: pre-line;
}
.search-results{
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  gap: 10px;
  text-align: center;
  width: 350px;
}
.search-results div {
  margin-bottom: 10px;
  font-size: 16px;
}
.search-button:disabled {
  color: gainsboro;
  cursor: not-allowed;
}
.custom-input {
  width: 310px;
  height: 140px;
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
.gray-arrow{
  color: gray;
}

</style>