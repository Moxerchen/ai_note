<template>
  <div class="personalPage">
    <h2>Result</h2>
    <p>Your score: {{ score }}</p>
    <n-alert v-for="(question, index) in questions" :key="index" :type="getAlertType(question, selectedAnswers[index])" class="Alert" @click="handleAlertClick(question)">
      {{ question.text }}
    </n-alert>
  </div>
  <div class="bottom-bar" >
    <span @click="goBack">&lt;</span>
    <span class="gray-arrow">&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  </div>
  <!--  wellhu -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {NAlert} from "naive-ui";
import {useRouter} from "vue-router";

interface Question {
  text: string;
  options: string[];
  answerIndex: number;
}

export default defineComponent({
  components:{NAlert},
  props: {
    score: {
      type: Number,
      required: true,
    },
    questions: {
      type: Array as () => Question[],
      required: true,
    },
    selectedAnswers: {
      type: Array as () => number[],
      required: true,
    },
  },
  setup() {
    const router=useRouter();
    function goBack(){
      router.push('/SwitchBank')
    }

    const isAnswerCorrect = (question: Question, selectedAnswer: number): boolean => {
      return selectedAnswer === question.answerIndex;
    };

    function getAlertType(question: Question, selectedAnswer: number): "success" | "error" {
      return isAnswerCorrect(question, selectedAnswer) ? 'success' : 'error';
    }


    function handleAlertClick(question: Question) {
      router.push({
        name: 'QuestionDetail',
        params: { text: question.text },
      });
    }

    return {
      isAnswerCorrect,
      getAlertType,
      goBack,
      handleAlertClick,
    }
  },
});

</script>
<style scoped>
.personalPage{
  padding: 33px;
}
h2{
  text-align: center;
}
.Alert{
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  gap: 10px;
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