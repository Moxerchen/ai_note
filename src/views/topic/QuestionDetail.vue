<template>
  <div class="personalPage">
    <h2>Question Detail</h2>

  <n-alert :title="getQuestionText(questionText)" type="info">
    {{ questionDetails }}
  </n-alert>
  <div class="bottom-bar" >
    <span @click="$router.push({name:'SwitchBank'})">&lt;</span>
    <span class="gray-arrow"> &gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
  </div>
  </div>
  <!--  wellhu -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {NAlert} from 'naive-ui';

export default defineComponent({
  components:{
    NAlert,
  },
  data() {
    return {
      questionText: '',
      questionDetails: '',
    };
  },
  mounted() {
    this.questionText = Array.isArray(this.$route.params.text)
        ? this.$route.params.text[0]
        : this.$route.params.text;
    this.questionDetails = this.getQuestionDetails(this.questionText);
  },
  methods: {
    getQuestionDetails(text: string): string {
      // 根据text的不同值返回不同的详细内容
      if (text == '1:小智什么时候欺骗并遗弃比比鸟') {
        return '在无印篇动画的第八十二集《真新镇，新的开始》中，本集在《宝可梦，就决定是你了》中企图收服的烈雀进化为了大嘴雀，并且成为了烈雀族群的首领，而他的比比鸟也在这集进化成为了大比鸟，为了守护波波群，小智将大比鸟留在了森林里，并跟大比鸟承诺会回来接它，但是到目前为止，再也没有出现过小智的大比鸟的相关剧情，彻底被小智遗忘';
      } else if (text == '2:小智在哪次道馆战中命令皮卡丘开挂一穿三') {
        return '丰原地区的紫堇道馆(是紫堇市的官方道馆，专长为电系神奇宝贝，道馆训练家为铁旋,获胜之后可以获得电力徽章。)皮卡丘在与雷公机器人战斗的过程中，吸收了过多的电力，所以挑战时出招的威力很大，都用十万伏特秒杀铁旋小磁怪、雷电球、三合一磁怪。';
      } else if (text == '3:请翻译“给他棒棒”') {
        return 'すべてを受け入れて';
      } else if (text == '4:飞云冰淇淋的最终来源'){
        return '飞云冰淇淋原型为 哈根达斯 ，飞云市原型为 布鲁克林 ，布鲁克林为著名冰淇淋品牌哈根达斯的发源地。';
      }
      else {
        return 'No details available';
      }
    },
    getQuestionText(text: string): string{
      if (text == '1:小智什么时候欺骗并遗弃比比鸟') {
        return '小智什么时候欺骗并遗弃比比鸟';
      } else if (text == '2:小智在哪次道馆战中命令皮卡丘开挂一穿三') {
        return '小智在哪次道馆战中命令皮卡丘开挂一穿三';
      } else if (text == '3:请翻译“给他棒棒”') {
        return '请翻译“给他棒棒”';
      } else if (text == '4:飞云冰淇淋的最终来源'){
        return '飞云冰淇淋的最终来源';
      }
      else {
        return 'No details available';
      }
    },
  },
});
</script>
<style scoped>
.personalPage{
  padding: 28px;
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
h2{
  text-align: center;
  margin-bottom: 30px;
}
</style>
