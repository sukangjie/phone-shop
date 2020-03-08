<template>
  <div class="product">
    <product-param :title="product.name">
      <template v-slot:buy>
        <button class="btn" @click="buy">立即购买</button>
      </template>
    </product-param>
      <div class="content">
        <div class="item-bg">
          <h2>{{product.name}}</h2>
          <h3>{{product.subtitle}}</h3>
          <p>
            <a href="" id="">全球首款双频 GP</a>
            <span>|</span>
            <a href="" id="">骁龙845</a>
            <span>|</span>
            <a href="" id="">AI 变焦双摄</a>
            <span>|</span>
            <a href="" id="">红外人脸识别</a>
          </p>
          <div class="price">
            <span>￥<em>{{product.price}}</em></span>
          </div>
        </div>
        <div class="item-bg-2"></div>
        <div class="item-bg-3"></div>
        <div class="item-swiper">
          <swiper :options="swiperOption">
            <swiper-slide><img src="/imgs/product/gallery-2.png" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/product/gallery-3.png" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/product/gallery-4.png" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/product/gallery-5.jpg" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/product/gallery-6.jpg" alt=""></swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
          </swiper>
          <p class="desc">小米8 AI变焦双摄拍摄</p>
        </div>
        <div class="item-video">
          <h2>60帧超慢动作摄影<br/>慢慢回味每一瞬间的精彩</h2>
          <p>后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！<br/>更能AI 精准分析视频内容，15个场景智能匹配背景音效。</p>
          <div class="video-bg" @click="showSlide='slideDown'"></div>
          <div class="video-box" v-show="showSlide">
            <div class="overlay"></div>
            <div class="video" :class="showSlide">
              <span class="icon-close" @click="closeVideo"></span>
              <video src="/imgs/product/video.mp4" muted autoplay controls="controls"></video>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import ProductParam from './../components/ProductParam'
export default {
  name: 'Product',
  components: {
    swiper,
    swiperSlide,
    ProductParam
  },
  data() {
    return {
      showSlide: '', //控制动画效果
      product: {}, //商品信息
      swiperOption: {
        autoplay: true,
        slidePreView: 3,
        spaceBetweent: 30,
        freeMode: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  mounted() {
    this.getProductInfo();
  },
  methods: {
    getProductInfo() {
      let id = this.$route.params.id;
      this.axios.get(`/products/${id}`).then((res) =>{
        this.product = res;
      })
    },
    buy() {
      let id = this.$route.params.id;
      this.$router.push(`detail/${id}`);
    },
    closeVideo() {
      this.showSlide = 'slideUp';
      setTimeout(() => {
        this.showSlide = '';
      }, 600)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>