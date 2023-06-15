<template>
  <div class="container" @click="handleContainerClick">
    <div class="header">
      <h1 class="title">西游记 第一章</h1>
      <h3>灵根育孕源流出 心性修持大道生</h3>
    </div>
    <div class="content">
      <p class="plot" v-for="(paragraph, index) in chapterContent" :key="index">{{ paragraph }}</p>
    </div>
    <van-popup
        v-model:show="showPopup"
        position="bottom"
        :style="{ height: '30%' }"
        closeable
        round
    >
      <div class="popup-content">
        <div class="text">
          <h3>背景介绍：</h3>
          <p>在吴承恩时代，道教成为一个恶势力，与朝廷统治者勾结，失去民间道教的进步意义。道士们在明代中叶已到了腐朽不堪的地步，为人民所鄙视。如嘉靖年间，道士陶仲文被封为少保、礼部尚书......</p>
        </div>
        <div class="button-container">
          <van-button class="popup-button"  plain hairline type="success" size="mini" @click="moreInfo">了解更多</van-button>
        </div>
      </div>
    </van-popup>
  </div>
  <van-sticky v-model="isSticky" :offset-bottom="0">
    <div class="bottom-bar" >
      <span @click="goBack" class="arrow-left">&lt;</span>
      <span class="gray-arrow">&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    </div>

  </van-sticky>
  <!--  wellhu -->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {useRouter} from "vue-router";

export default defineComponent({
  name: 'MobileNovelPage',
  components: {},
  setup() {
    const isSticky = ref(true);
    const router = useRouter()
    const chapterContent = [
      '  盖闻天地之数，有十二万九千六百岁为一元。将一元分为十二会，乃子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥之十二支也。','每会该一万八百岁。且就一日而论：子时得阳气，而丑则鸡鸣；寅不通光，而卯则日出；辰时食后，而巳则挨排；日午天中，而未则西蹉；申时晡而日落酉；戌黄昏而人定亥。譬于大数，若到戌会之终，则天地昏蒙而万物否矣。再去五千四百岁，交亥会之初，则当黑暗，而两间人物俱无矣，故曰混沌。又五千四百岁，亥会将终，贞下起元，近子之会，而复逐渐开明。邵康节曰：“冬至子之半，天心无改移。一阳初动处，万物未生时。”到此，天始有根。再五千四百岁，正当子会，轻清上腾，有日，有月，有星，有辰。日、月、星、辰，谓之四象。故曰，天开于子。又经五千四百岁，子会将终，近丑之会，而逐渐坚实。易曰：“大哉乾元！至哉坤元！万物资生，乃顺承天。”至此，地始凝结。再五千四百岁，正当丑会，重浊下凝，有水，有火，有山，有石，有土。水、火、山、石、土谓之五形。故曰，地辟于丑。又经五千四百岁，丑会终而寅会之初，发生万物。历曰：“天气下降，地气上升；天地交合，群物皆生。”至此，天清地爽，阴阳交合。再五千四百岁，正当寅会，生人，生兽，生禽，正谓天地人，三才定位。故曰，人生于寅。\n' +
      ' \n' +
      '感盘古开辟，三皇治世，五帝定伦，世界之间，遂分为四大部洲：曰东胜神洲，曰西牛贺洲，曰南赡部洲，曰北俱芦洲。这部书单表东胜神洲。海外有一国土，名曰傲来国。国近大海，海中有一座山，唤为花果山。此山乃十洲之祖脉，三岛之来龙，自开清浊而立，鸿蒙判后而成。真个好山！有词赋为证。赋曰：\n' +
      ' \n' +
      '势镇汪洋，威宁瑶海。势镇汪洋，潮涌银山鱼入穴；威宁瑶海，波翻雪浪蜃离渊。木火方隅高积上，东海之处耸崇巅。丹崖怪石，削壁奇峰。丹崖上，彩凤双鸣；削壁前，麒麟独卧。峰头时听锦鸡鸣，石窟每观龙出入。林中有寿鹿仙狐，树上有灵禽玄鹤。瑶草奇花不谢，青松翠柏长春。仙桃常结果，修竹每留云。一条涧壑藤萝密，四面原堤草色新。正是百川会处擎天柱，万劫无移大地根。那座山，正当顶上，有一块仙石。其石有三丈六尺五寸高，有二丈四尺围圆。三丈六尺五寸高，按周天三百六十五度；二丈四尺围圆，按政历二十四气。上有九窍八孔，按九宫八卦。四面更无树木遮阴，左右倒有芝兰相衬。盖自开辟以来，每受天真地秀，日精月华，感之既久，遂有灵通之意。内育仙胞，一日迸裂，产一石卵，似圆球样大。因见风，化作一个石猴，五官俱备，四肢皆全。便就学爬学走，拜了四方。目运两道金光，射冲斗府。惊动高天上圣大慈仁者玉皇大天尊玄穹高上帝，驾座金阙云宫灵霄宝殿，聚集仙卿，见有金光焰焰，即命千里眼、顺风耳开南天门观看。二将果奉旨出门外，看的真，听的明。须臾回报道：“臣奉旨观听金光之处，乃东胜神洲海东傲来小国之界，有一座花果山，山上有一仙石，石产一卵，见风化一石猴，在那里拜四方，眼运金光，射冲斗府。如今服饵水食，金光将潜息矣。”玉帝垂赐恩慈曰：“下方之物，乃天地精华所生，不足为异。”\n' +
      ' \n' +
      '那猴在山中，却会行走跳跃，食草木，饮涧泉，采山花，觅树果；与狼虫为伴，虎豹为群，獐鹿为友，猕猿为亲；夜宿石崖之下，朝游峰洞之中。真是“山中无甲子，寒尽不知年。”\n' +
      ' \n' +
      '一朝天气炎热，与群猴避暑，都在松阴之下顽耍。你看他一个个：\n' +
      ' \n' +
      '跳树攀枝，采花觅果；抛弹子，邷么儿\n' +
      '；跑沙窝，砌宝塔；赶蜻蜓，扑　　蜡；参老天，拜菩萨；扯葛藤，编草帓；捉虱子，咬又掐；理毛衣，剔指甲；挨的挨，擦的擦；推的推，压的压；扯的扯，拉的拉，青松林下任他顽，绿水涧边随洗濯。\n' +
      ' \n' +
      '一群猴子耍了一会，却去那山涧中洗澡。见那股涧水奔流，真个似滚瓜涌溅。古云：“禽有禽言，兽有兽语。”众猴都道：“这股水不知是那里的水。我们今日赶闲无事，顺涧边往上溜头寻看源流，耍子去耶！”喊一声，都拖男挈女，呼弟呼兄，一齐跑来，顺涧爬山，直至源流之处，乃是一股瀑布飞泉。但见那：\n' +
      ' \n' +
      '一派白虹起，千寻雪浪飞；海风吹不断，江月照还依。\n' +
      '冷气分青嶂，馀流润翠微；潺湲名瀑布，真似挂帘帷。\n' +
      ' \n' +
      '众猴拍手称扬道：“好水！好水！原来此处远通山脚之下，直接大海之波。”又道：“那一个有本事的，钻进去寻个源头出来，不伤身体者，我等即拜他为王。”连呼了三声，忽见丛杂中跳出一名石猴，应声高叫道：“我进去！我进去！”好猴！也是他：\n' +
      ' \n' +
      '今日芳名显，时来大运通；有缘居此地，王遣入仙宫。\n' +
      ' \n' +
      '你看他瞑目蹲身，将身一纵，径跳入瀑布泉中，忽睁睛抬头观看，那里边却无水无波，明明朗朗的一架桥梁。他住了身，定了神，仔细再看，原来是座铁板桥。桥下之水，冲贯于石窍之间，倒挂流出去，遮闭了桥门。却又欠身上桥头，再走再看，却似有人家住处一般，真个好所在。但见那：\n' +
      ' \n' +
      '翠藓堆蓝，白云浮玉，光摇片片烟霞。虚窗静室，滑凳板生花。乳窟龙珠倚挂，萦回满地奇葩。锅灶傍崖存火迹，樽罍\n' +
      '靠案见肴渣。石座石床真可爱，石盆石碗更堪夸。又见那一竿两竿修竹，三点五点梅花。几树青松常带雨，浑然像个人家。',
        '.....'
    ];
    const showPopup = ref(false);

    function handleContainerClick(event: MouseEvent) {
      const offsetY = event.clientY || (event as any).touches[0].clientY;
      if (offsetY <= 200) {
        showPopup.value = true;
      }
    }

    function goBack(){
      router.push('/BookDetail')
    }

    function moreInfo(){
      router.push('/Inter')
    }

    return {
      isSticky,
      chapterContent,
      showPopup,
      handleContainerClick,
      goBack,
      moreInfo,
    };
  },
});
</script>

<style scoped>
.container {
  padding: 20px;
}
.plot{
  font-size: 16px;
}
.header {
  text-align: center;
  margin-bottom: 20px;
}

.title {
  font-size: 24px !important;
  font-weight: bold !important;
}

.content {
  width: 100%;
  font-size: 16px !important;
  line-height: 1.5 !important;
  text-align: center !important;
}
.popup-content {
  display: flex;
  flex-direction: column;
  padding: 20px !important;
}

.text {
  padding-bottom: 20px !important;
}

.button-container {
  display: flex;
  justify-content: center !important;
}
.popup-button{
  display: flex;
  left: -15px;
  top: -10px;
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
  color: white;
  font-size: 20px;
}
.arrow-left{
  padding-left: 120px;
}
</style>
