<template>
  <div class="quiz-container">
      <div class="title">
        <div class="back-button" @click="goBack"><n-icon size="20"><ArrowBackSharp/></n-icon></div>
        <h4 class="label">题目答题</h4>
        <div class="switch-button" @click="goSwitch"><n-icon size="20"><ColorSwitch/></n-icon> </div>
      </div>
    <div class="question">
      <h2>{{ currentQuestion.title }}</h2>
      <ul>
        <li v-for="(option, index) in currentQuestion.options" :key="index">
          <n-radio
              :checked="selectedOption === option"
              :label="option"
              :disabled="answered"
              @click="handleRadioClick(option)"
          >{{ option }}</n-radio>
        </li>
      </ul>
      <p v-if="promptMessage">{{ promptMessage }}</p>
    </div>
    <div class="pagination-container">
      <n-pagination
          :current="currentPage"
          :page-count="totalPages"
          @change="currentPage = $event"
      ></n-pagination>
    </div>
  </div>
  <!--  wellhu -->
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { NRadio, NPagination,NIcon } from 'naive-ui'
import {ArrowBackSharp} from "@vicons/ionicons5";
import {ColorSwitch} from "@vicons/carbon";
import {useRouter} from "vue-router";


const questions = [
  {
    title: '小智什么时候欺骗并遗弃比比鸟',
    options: ['1999-1-28', '1999-1-18', '2000-1-28', '2000-1-18'],
  },
  {
    title: '小智在哪次道馆战中命令皮卡丘开挂一穿三?',
    options: ['紫堇', '芳缘', '华蓝', '深灰'],
  },
  {
    title: '请翻译“给他棒棒”',
    options: ['givehebangbang', '收服一切', '打败所有', 'bigBang'],
  },
  {
    title: '飞云冰淇淋的最终来源',
    options: ['当然是飞云市', '来自真新镇', '是邪恶的火箭队', '是良善的火箭队'],
  },
]

const currentPage = ref(1)
const selectedOption = ref('')
const answered = ref(false)
const promptMessage = ref('')
const router = useRouter();

function goSwitch(){
  router.push('/SwitchBank');
}

const handlePageChange = () => {
  selectedOption.value = '' // Reset selected option when switching questions
  answered.value = false // Reset answer status when switching questions
  promptMessage.value = ''
}

const getQuestionsPerPage = () => {
  const startIndex = (currentPage.value - 1)  // Display 1 question per page
  return questions.slice(startIndex, startIndex + 1)
}

const currentQuestion = computed(() => getQuestionsPerPage()[0])
const totalPages = Math.ceil(questions.length) // Display 1 question per page

const handleRadioClick = (option) => {
  if (selectedOption.value === option) {
    selectedOption.value = '' // Deselect the option if already selected
    promptMessage.value = '' // Clear the prompt message
  } else {
    selectedOption.value = option
    promptMessage.value = generatePromptMessage(option) // Set the prompt message for the selected option
  }
}

const goBack = () => {
  router.push('/book')
}

const generatePromptMessage = (option) => {
  switch (currentQuestion.value.title) {
    case '小智什么时候欺骗并遗弃比比鸟':
      switch (option) {
        case '1999-1-28':
          return '回答正确';
        case '1999-1-18':
          return '回答错误，是99年1月18日';
        case '2000-1-28':
          return '回答错误，是99年1月18日';
        case '2000-1-18':
          return '回答错误，是99年1月18日';
      }
      break;
    case '小智在哪次道馆战中命令皮卡丘开挂一穿三?':
      switch (option) {
        case '紫堇':
          return '回答正确，真是卑鄙吖，小智';
        case '芳缘':
          return '回答错误，是紫堇电系道馆';
        case '华蓝':
          return '回答错误，是紫堇电系道馆';
        case '深灰':
          return '回答错误，是紫堇电系道馆';
      }
      break;
    case '请翻译“给他棒棒”':
      switch (option) {
        case 'givehebangbang':
          return '回答错误，应为Getta Ban Ban';
        case '收服一切':
          return '太棒了，答对了';
        case '打败所有':
          return '回答错误，应为Getta Ban Ban';
        case 'bigBang':
          return '太可惜了，就差一点点';
      }
      break;
    case '飞云冰淇淋的最终来源':
      switch (option) {
        case '当然是飞云市':
          return '不然呢';
        case '来自真新镇':
          return '错误，真新镇只有小智';
        case '是邪恶的火箭队':
          return '错误，火箭队只有喵喵';
        case '是良善的火箭队':
          return '错误，火箭队不良善也没有冰淇淋';
      }
      break;
  }
}

watch(currentPage, () => {
  handlePageChange()
})



</script>

<style scoped>
.quiz-container {
  padding: 20px;
}

.question {
  position: relative;
  top:-35px;
  left: 20px;
  margin-bottom: 20px;
}

h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 10px;
}

.pagination-container {
  position: fixed;
  bottom: 530px;
  left: 75px;
}

.back-button {
  position: absolute;
  top: 18px;
  left: 16px;
}
.label{
  position: relative;
  top: -17px;
  font-size: 18px;
  left: 120px;
}
.switch-button{
  position: relative;
  top: -70px;
  left: 295px;
}

</style>
