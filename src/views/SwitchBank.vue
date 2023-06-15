<template>
  <div class="personalPage">
    <h2>宝可梦知识大比拼</h2>
    <div v-if="!finished">
      <div v-for="(question, index) in questions" :key="index">
        <n-alert :show-icon="false" :title="question.text"  class="Alert" >
          <label v-for="(option, optionIndex) in question.options" :key="optionIndex" class="label" >
           <input type="radio" :name="'question-' + index" :value="optionIndex" v-model="selectedAnswers[index]" style="margin-bottom: 12px;">
            {{ option }}<br>
          </label>
        </n-alert>
      </div>
      <n-button  strong secondary type="success" @click="submitAnswers" :disabled="!allOptionsSelected" class="submit">Submit</n-button>
    </div>
    <div class="empty"></div>
  </div>
  <div class="bottom-bar" >
    <span @click="goBack">&lt;</span>
    <span class="gray-arrow">&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  </div>
  <!--  wellhu -->
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import {NButton, NAlert} from "naive-ui";
import {useRouter} from "vue-router";

interface Question {
  text: string;
  options: string[];
  answerIndex: number;
}

export default defineComponent({
  components: {NButton, NAlert},
  setup() {
    const questions: Question[] = [
      {
        text: '1:小智什么时候欺骗并遗弃比比鸟',
        options: ['1999-1-28', '1999-1-18', '2000-1-28', '2000-1-18'],
        answerIndex: 0
      },
      {
        text: '2:小智在哪次道馆战中命令皮卡丘开挂一穿三',
        options: ['紫堇', '芳缘', '华蓝', '深灰'],
        answerIndex: 0
      },
      {
        text: '3:请翻译“给他棒棒”',
        options: ['givehebangbang', '收服一切', '打败所有', 'bigBang'],
        answerIndex: 1
      },
      {
        text: '4:飞云冰淇淋的最终来源',
        options: ['当然是飞云市', '来自真新镇', '是邪恶的火箭队', '是良善的火箭队'],
        answerIndex: 0
      },
    ];

    const selectedAnswers = ref<number[]>([]);
    const finished = ref(false);
    const score = ref(0);
    const router = useRouter();

    function goBack(){
      router.push('/QuestionBank')
    }

    const submitAnswers = () => {
      let calculatedScore = 0;
      for (let i = 0; i < questions.length; i++) {
        if (selectedAnswers.value[i] === questions[i].answerIndex) {
          calculatedScore++;
        }
      }
      score.value = calculatedScore;
      finished.value = true;

      router.push({
        name:'Result',
        query:{
          score: score.value.toString(),
          questions: JSON.stringify(questions),
          selectedAnswers: JSON.stringify(selectedAnswers.value),
        }
      })

      console.log('应该跳转成功了吧')
    };

    const allOptionsSelected = computed(() => {
      return selectedAnswers.value.length === questions.length && selectedAnswers.value.every(answer => answer !== undefined);
    });


    return {
      questions,
      selectedAnswers,
      finished,
      score,
      submitAnswers,
      goBack,
      allOptionsSelected,
    };
  }
});
</script>
<style scoped>
.personalPage{
  padding: 18px;
}
.submit{
  display: flex;
  margin-top: 40px;
  margin-left: 120px;
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
.gray-arrow{
  color: gray;
  display: flex;
  left: 200px;
}
h2{
  text-align: center;
}
.empty{
  height: 50px;
}
.Alert{
  display: flex;
  margin-top: 10px;
  flex-direction: column;
}
</style>
