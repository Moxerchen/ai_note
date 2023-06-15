<script>
import {defineComponent,ref,onBeforeUnmount,onMounted} from 'vue'
import {NCarousel,NImageGroup,NSpace,NImage} from "naive-ui";
import {useRouter} from "vue-router";

export default defineComponent({
  components:{ NCarousel, NImageGroup,NSpace,NImage },

  setup(){
    const router = useRouter();


    const isHidden = ref(true); // 初始状态为隐藏

    const handleScroll = () => {
      const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      isHidden.value = scrollTop <= 0; // 当页面向上滚动时，显示区域
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
    });


    function MoreInfo(){
      //跳转
      router.push('/BookList')
    }

    function goHong(){
      router.push('/Honglou')
    }

    function goBookDetail(){
      router.push('/BookDetail')
    }

    const goBack = () => {
      router.push('/book')
    }
    return{
      MoreInfo,
      isHidden,
      goBack,
      goBookDetail,
      goHong
    }
  }
})
</script>

<template>

  <div class="personalPage">
  <n-carousel autoplay>
    <img
        class="carousel-img"
        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
    >
    <img
        class="carousel-img"
        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
    >
    <img
        class="carousel-img"
        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
    >
    <img
        class="carousel-img"
        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
    >
  </n-carousel>
  <div class="label1">
    <h3>文学名著</h3>
    <h5 @click="MoreInfo">查看更多></h5>
  </div>
  <div class="imgG">
    <n-image-group class="image1" >
      <n-space>
        <n-image  @click="goBookDetail"
            width="100" height="140"
            src="https://isbncoverdb.com/images/book-cover-book27322353.webp"
        />
        <n-image @click="goHong"
            width="100"
            height="140"
            src="https://isbncoverdb.com/images/book-cover-book22889066.webp"
        />
        <n-image
            width="100"
            height="140"
            src="https://isbncoverdb.com/images/book-cover-book27164383.webp"
        />
      </n-space>
    </n-image-group>
  </div>

  <div class="label1">
    <h3>成功励志</h3>
    <h5 @click="MoreInfo">查看更多></h5>
  </div>

  <div class="imgG">
    <n-image-group class="image1">
      <n-space>
        <n-image
            width="100" height="140"
            src="https://isbncoverdb.com/images/book-cover-book3509030.webp"
        />
        <n-image
            width="100" height="140"
            src="https://isbncoverdb.com/images/book-cover-book169851.webp"
        />
        <n-image
            width="100" height="140"
            src="https://isbncoverdb.com/images/book-cover-book24167617.webp"
        />
      </n-space>
    </n-image-group>
  </div>

  <div class="label1">
    <h3>学科知识</h3>
    <h5 @click="MoreInfo">查看更多></h5>
  </div>

  <div class="imgG">
    <n-image-group class="image1">
      <n-space>
        <n-image
            width="100" height="140"
            src="https://isbncoverdb.com/images/book-cover-book5-3473161.webp"
        />
        <n-image
            width="100" height="140"
            src="https://isbncoverdb.com/images/book-cover-androd-smartphone.webp"
        />
        <n-image
            width="100" height="140"
            src="https://cdnagesdb.com/images/booksimages/56350CD5C1C81ED8B16704B48240F2B1.webp"
        />
      </n-space>
    </n-image-group>
  </div>




  <div class="label1">
    <h3>疼痛青春</h3>
    <h5 @click="MoreInfo">查看更多></h5>
  </div>
  <div class="imgG">
    <n-image-group class="image1">
      <n-space>
        <n-image  @click="MoreInfo"
                  width="100" height="140"
                  src="https://isbncoverdb.com/images/book-cover-book2-28122467.webp"
        />
        <n-image
            width="100" height="140"
            src="https://isbncoverdb.com/images/book-cover-book15-24007063.webp"
        />
        <n-image
            width="100" height="140"
            src="https://isbncoverdb.com/images/book-cover-book10-2783788.webp"
        />
      </n-space>
    </n-image-group>
  </div>

  <div class="label1">
    <h3>仙侠幻想</h3>
    <h5 @click="MoreInfo">查看更多></h5>
  </div>

  <div class="imgG">
    <n-image-group class="image1">
      <n-space>
        <n-image
            width="100" height="140"
            src="https://cdnagesdb.com/images/fictionimages/77AF54ED78FC4FACAA761C12764B4B94.webp"
        />
        <n-image
            width="100" height="140"
            src="https://cdnagesdb.com/images/fictionimages/F359E89F32D5A214C65F041C5883973E.webp"
        />
        <n-image
            width="100" height="140"
            src="https://cdnagesdb.com/images/fictionimages/24535EC3E01C09162FC27A68A35BE05A.webp"
        />
      </n-space>
    </n-image-group>
  </div>

  <div class="label1">
    <h3>武林传说</h3>
    <h5 @click="MoreInfo">查看更多></h5>
  </div>

  <div class="imgG">
    <n-image-group class="image1">
      <n-space>
        <n-image
            width="100" height="140"
            src="https://isbncoverdb.com/images/book-cover-demi-gods-and-semi-devils-vol-2-licensed-for-international-sales-chinese-edition.webp"
        />
        <n-image
            width="100" height="140"
            src="https://isbncoverdb.com/images/book-cover-the-smiling-proud-wanderer-vol3-licensed-for-international-sales-chinese-edition.webp"
        />
        <n-image
            width="100" height="140"
            src="https://cdnagesdb.com/images/fictionimages/99AF97081E28F50A449C32CAB6FCAF1F.webp"
        />
      </n-space>
    </n-image-group>
  </div>
  <div class="label1">
    <h3> 通识知识</h3>
    <h5 @click="MoreInfo">查看更多></h5>
  </div>
  <div class="imgG">
    <n-image-group class="image1">
      <n-space>
        <n-image  @click="MoreInfo"
                  width="100" height="140"
                  src="https://isbncoverdb.com/images/book-cover-c221.webp"
        />
        <n-image
            width="100" height="140"
            src="https://isbncoverdb.com/images/book-cover-book1918473.webp"
        />
        <n-image
            width="100" height="140"
            src="https://isbncoverdb.com/images/book-cover-book26712989.webp"
        />
      </n-space>
    </n-image-group>
  </div>

  <div class="label1">
    <h3>小说传记</h3>
    <h5 @click="MoreInfo">查看更多></h5>
  </div>

  <div class="imgG">
    <n-image-group class="image1">
      <n-space>
        <n-image
            width="100" height="140"
            src="https://isbncoverdb.com/images/book-cover-book3510012.webp"
        />
        <n-image
            width="100" height="140"
            src="https://isbncoverdb.com/images/book-cover-book247983.webp"
        />
        <n-image
            width="100" height="140"
            src="https://isbncoverdb.com/images/book-cover-book201692.webp"
        />
      </n-space>
    </n-image-group>
  </div>

  <div class="label1">
    <h2>文学艺术</h2>
    <h5 @click="MoreInfo">查看更多></h5>
  </div>

  <div class="imgG">
    <n-image-group class="image1">
      <n-space>
        <n-image
            width="100"
            height="100"
            src="https://cdnagesdb.com/images/fictionimages/0B47B7418F15A9401B206863EA79744E.webp"
        />
        <n-image
            width="100" height="140"
            src="https://isbncoverdb.com/images/book-cover-book3039314.webp"
        />
        <n-image
            width="100" height="140"
            src="https://isbncoverdb.com/images/book-cover-book4072026.webp"
        />
      </n-space>
    </n-image-group>
  </div>

  <div class="bottom-bar" :class="{ 'hidden': isHidden }">
    <span @click="goBack">&lt;</span>
    <span @click="MoreInfo">&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    <!--  wellhu -->
  </div>

  </div>

</template>

  <style scoped>
  .personalPage{
    padding: 16px;
  }
    .carousel-img {
      width: 100%;
      height: 180px;
      object-fit: cover;
    }
    .label1{
      display: flex;
      margin-top: 15px;
      font-weight: normal;
    }
    .label1 h2{
      font-weight: normal;
    }
    .label1 h5{
      position: absolute;
      right: 15px;
      font-weight: normal;
    }
    .imgG{
      display: flex;
      margin-top: 15px;
    }
    .image1{
      display: flex;
      justify-content: space-between;
      margin-top: 100px;
    }
    .image1 n-image{
      margin: 10px;
      height: auto;
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

    .hidden {
      transform: translateY(100%);
    }

    
  </style>