<template>
  <div class="container">
    <header class="header">
      <img class="logo" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
      <h1 class="title">西游记</h1>
    </header>
    <div class="content">
      <div class="section">
        <h2 class="section-title">简介</h2>
        <p>{{ plotSummary }}</p>
      </div>
      <div class="section">
        <h2 class="section-title">故事来源</h2>
        <p>{{ storySource }}</p>
      </div>
      <div class="section">
        <h2 class="section-title">时代背景</h2>
        <p>{{ eraBackground }}</p>
      </div>
      <div class="section">
        <h2 class="section-title">创作动机</h2>
        <p>{{ creationMotivation }}</p>
      </div>
    </div>
  </div>
  <van-sticky  :offset-bottom="0">
    <div class="bottom-bar" >
      <span @click="goBack">&lt;</span>
      <span class="gray-arrow">&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    </div>
  </van-sticky>
  <!--  wellhu -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {useRouter} from "vue-router";

export default defineComponent({
  name: 'MobileBaiduBaikePage',
  setup() {
    const plotSummary = '《西游记》是中国古代第一部浪漫主义章回体长篇神魔小说。 今见最早的《西游记》版本是明代万历二十年金陵世德堂《新刻出像官板大字西游记》，未署作者姓名。 [63] 鲁迅、董作宾等人根据《淮安府志》“吴承恩《西游记》”的记载予以最终论定“吴承恩原著”。 [63]\n' +
        '该小说主要讲述了孙悟空出世，跟随菩提祖师学艺及大闹天宫后，遇见了唐僧、猪八戒、沙僧和白龙马，西行取经，一路上历经艰险，降妖除魔，经历了九九八十一难，终于到达西天见到如来佛祖，最终五圣成真的故事。该小说以“玄奘取经”这一历史事件为蓝本，经作者的艺术加工，深刻地描绘出明代百姓的社会生活状况。\n' +
        '《西游记》是中国神魔小说的经典之作，达到了古代长篇浪漫主义小说的巅峰，与《三国演义》《水浒传》《红楼梦》并称为中国古典四大名著。《西游记》自问世以来在民间广为流传，各式各样的版本层出不穷。明代刊本有六种，清代刊本、抄本也有七种，典籍所记已佚版本十三种。鸦片战争以后，大量中国古典文学作品被译为西文，《西游记》渐渐传入欧美，被译为英、法、德、意、西、手语、世（世界语）、斯（斯瓦希里语）、俄、捷、罗、波、日、朝、越等语言。';

    const storySource = `玄奘（602—664年）取经原是唐代的一个真实的历史事件。贞观三年（629年），他为追求佛家真义，从长安出发后，途经百余国，历尽艰难险阻，最后到达了印度。他在那里学习了两年多，并在一次大型佛教经学辩论会任主讲，受到了赞誉。贞观十九年（645年）玄奘回到了长安，带回佛经六百五十七部，这一非凡的壮举，本身就为人们的想象提供了广阔的天地。后来玄奘口述了西行见闻，由他的弟子辩机编辑成《大唐西域记》共十二卷。但这部书主要讲述了玄奘在路上所见各国的历史、地理及交通，没有什么故事。后来他的弟子慧立、彦琮又撰写了《大唐大慈恩寺三藏法师传》，在赞颂师父，弘扬佛法的过程中，也不时地用夸张神化的笔调去穿插一些离奇的故事，为玄奘的经历增添了许多神话色彩。于是，取经的故事在社会上越传越神，唐代末年的一些笔记如《独异志》《大唐新语》等，就记录了玄奘取经的神奇故事，从此，唐僧取经的故事便开始在中国民间流传。`;

    const eraBackground = `在吴承恩时代，道教成为一个恶势力，与朝廷统治者勾结，失去民间道教的进步意义。道士们在明代中叶已到了腐朽不堪的地步，为人民所鄙视。如嘉靖年间，道士陶仲文被封为少保、礼部尚书，以治病、除妖、炼丹、祈祷取得皇帝宠幸，和宦官崔文、奸臣严嵩勾结弄权。嘉靖年间，曾明令兴道灭佛，下诏没收能仁寺资财，撵出宫殿中的释迦像，后又取消官内佛殿。嘉靖年间，还大兴土木，建造三清宫，大搞斋醮活动。人民受劳役之苦，国库空虚。吴承恩借《西游记》特为讽刺。`;

    const creationMotivation = `在吴承恩创作《西游记》之前，唐僧西天取经的故事就早已流传民间，但吴承恩的《西游记》并非民间流传故事的简单拼凑。吴承恩在创作中对民间流传的故事进行了大量的改造。《大唐三藏取经诗话》是较为完备和最早记录《西游记》中故事的作品，吴承恩将《大唐三藏取经诗话》中猴行者的白衣秀才形象进行了重新改造，塑造了满腔热血和充满热情的孙悟空形象。猴行者是为了修成正果而主动帮助和尚西天取经的虔诚的佛教形象，而孙悟空则是崇尚自由、傲骨嶙峋的形象。`;

    const router = useRouter();

    function goBack(){
      router.push('/BookPage')
    }

    return {
      plotSummary,
      storySource,
      eraBackground,
      creationMotivation,
      goBack,
    };
  },
});

</script>

<style scoped>
.container {
  padding: 20px;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.logo {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.content {
  font-size: 16px;
  width: 100%;
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.section {
  margin-bottom: 20px;
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
