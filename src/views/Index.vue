<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">

        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡</a>
              <!-- hover之后展示出来 -->
              <div class="children">
                <!-- 双层循环 -->
                <ul v-for="(item, index) in menuList" :key="index">
                  <li v-for="(sub, j) in item" :key="j">
                    <a :href="sub ? '/#/product/'+sub.id: ''">
                      <img :src="sub? sub.img: '/imgs/item-box-1.png'">
                      {{sub? sub.name: '小米9'}}
                    </a>
                  </li>
                </ul>
              </div>

            </li>
            <li class="menu-item">
              <a href="javascript:;">电视 盒子</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">笔记本 平板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">家电 插线板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">出行 穿戴</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">智能 路由器</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电源 配件</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">生活 箱包</a>
            </li>
          </ul>
        </div>

        <!-- 轮播图 -->
        <div class="swiper-container">
          <swiper v-bind:options="swiperOption">
            <!-- 有多少副图就有多少个slide -->
            <swiper-slide v-for="(item,index) in slideList" :key="index">
              <a :href="'/#/product/'+item.id"><img :src="item.img"></a>
            </swiper-slide>
            <!-- Optional controls -->
            <!-- 分页小圆点 -->
            <div class="swiper-pagination"  slot="pagination"></div>
            <!-- 左右翻页箭头 -->
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>

      </div>
      <!-- 广告 -->
      <div class="ads-box">
        <a :href="'/#/product/'+item.id" v-for="(item, index) in adsList" :key="index">
          <img v-lazy="item.img">
        </a>
      </div>
      <!-- banner图片 -->
      <div class="banner">
        <a href="/#/product/30">
          <img v-lazy="'/imgs/banner-1.png'" alt="">
        </a>
      </div>
    </div>
    <!-- 产品盒子 -->
    <div class="product-box">
      <div class="container">
        <h2>手机</h2>
        <div class="wrapper">
          <div class="banner-left">
            <a href="/#/product/35"><img v-lazy="'/imgs/mix-alpha.jpg'"></a>
          </div>

          <div class="list-box">
            <div class="list" v-for="(arr, i) in phoneList" :key="i">
              <div class="item" v-for="(item,j) in arr" :key="j">
                <span :class="{'new-pro': j % 2 == 0}">新品</span>
                <div class="item-img">
                  <img v-lazy="item.mainImage" alt="">
                </div>
                <div class="item-info">
                  <h3>{{item.name}}</h3>
                  <p>{{item.subtitle}}</p>
                  <!-- 加入购物车 -->
                  <p class="price" @click="addCart(item.id)">{{item.price}}元</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 组件 -->
    <service-bar></service-bar>
    <!-- 通过数据绑定的形式,实现父子组件传参 -->
    <!-- modal是点击加入购物车之后滑动进来的组件 -->
    <modal 
      title="提示" 
      sureText="查看购物车" 
      btnType="1" 
      modalType="middle" 
      :showModal="showModal"
      @submit="goToCart"
      @cancel="showModal=false"
      >
      <!-- 插槽 -->
      <template v-slot:body>
        <p>商品添加成功！</p>
      </template>
    </modal>
  </div>  
</template>

<script>
import ServiceBar from './../components/ServiceBar'
import Modal from './../components/Modal'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'Index',
  components: {
    swiper,
    swiperSlide,
    ServiceBar,
    Modal
  },
  data() {
    return {
      swiperOption: {
        autoplay: true, //自动播放
        loop: true,  //循环播放
        effect: 'cube',   //切换效果
        cubeEffect: {
          shadowOffset: 100,
          shadowScale: 0.6
        },
        pagination: { //分页器
          el: '.swiper-pagination',
          clickable:true  //可被点击
        },
        navigation: {//前进后退按钮
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
      },
      slideList:[
          {
            id:'42',
            img:'/imgs/slider/slide-1.jpg'
          },
          {
            id:'45',
            img:'/imgs/slider/slide-2.jpg'
          },
          {
            id:'46',
            img:'/imgs/slider/slide-3.jpg'
          },
          {
            id:'',
            img:'/imgs/slider/slide-4.jpg'
          },
          {
            id:'',
            img:'/imgs/slider/slide-1.jpg'
          }
        ],
        menuList:[
          [
            {
              id:30,
              img:'/imgs/item-box-1.png',
              name:'小米CC9',
            },{
              id:31,
              img:'/imgs/item-box-2.png',
              name:'小米8青春版',
            },{
              id:32,
              img:'/imgs/item-box-3.jpg',
              name:'Redmi K20 Pro',
            },{
              id:33,
              img:'/imgs/item-box-4.jpg',
              name:'移动4G专区',
            }
          ],
          [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]//占位
        ],
        adsList:[
          {
            id:33,
            img:'/imgs/ads/ads-1.png'
          },{
            id:48,
            img:'/imgs/ads/ads-2.jpg'
          },{
            id:45,
            img:'/imgs/ads/ads-3.png'
          },{
            id:47,
            img:'/imgs/ads/ads-4.jpg'
          }
        ],

        phoneList: [],
        showModal: false
    }
  },
  mounted() {
    this.init() //初始化
  },
  methods: {
    init() {
      this.axios.get('/products', {
        params: { //传参
          categoryId: 100012,
          pageSize: 14
        }
      }).then((res) => {
          //查出来的数据前六条给重新赋值，前面的轮播图用的
          console.log(res);
          res.list = res.list.slice(6,14);
          //让res里面的数组变成一个二维数组
          this.phoneList = [res.list.slice(0,4),res.list.slice(4,8)];
      })
    },
    addCart(id) {//加入购物车
      this.axios.get('/carts', {
        params: {   //get 方法传参
          productId: id,
          selected: true
        }
      }).then((res) => {
         // 展示出弹框
         this.showModal = true;
         //调用actions中的方法，保存购物车的总数量
         this.$store.dispatch('saveCartCount',res.cartTotalQuantity);
      }).catch(() => {
        // 展示出弹窗
          this.showModal = true;
      });
    },
    goToCart() { //modal组件按钮的方法
      // 跳转到购物车页面
      this.$router.push('/cart');
    }

  }
}
</script>

<style lang="scss">
@import './../assets/scss/mixin.scss';
 .index {
    .swiper-box {
      .nav-menu {
        position: absolute;
        width: 264px;
        height: 451px;
        z-index: 9;
        padding: 26px 0;
        background-color: #55585a7a;
        box-sizing: border-box;
        .menu-wrap{
          .menu-item{
            height: 50px;
            line-height: 50px;
            a{
              position: relative;
              display : block;
              font-size: 16px;
              color: #ffffff;
              padding-left: 30px;
              &::after{ //箭头
                content: ' '; //占位
                position: absolute;
                right: 30px;
                top: 17.5px;
                @include bgImg(10px,15px,'/imgs/icon-arrow.png');
              }
            }
            &:hover{
              background-color: #ff6600;
              .children{//展示出来
                display: block; 
              }
            }
            .children{
              display: none;  //隐藏
              width: 962px;
              height: 451px;
              background-color: #ffffff;
              position:absolute;
              top: 0;
              left: 264px;  //左边菜单栏的宽度要空出来
              border: 1px solid #e5e5e5;
              ul{
                display: flex;
                justify-content: space-between;
                height: 75px;
                li{
                  height: 75px;
                  line-height: 75px;
                  flex: 1;
                  padding-left: 23px;
                }
                a{
                  color: #333333;
                  font-size: 14px;
                  
                }
                img{
                  width: 42px;
                  height: 35px;
                  vertical-align: middle;
                  margin-right: 15px;
                }
              }
            }
          }
        }
      }
      .swiper-container {
        height: 451px;
        .swiper-button-prev{
          left: 274px;
        }
        .swiper-button-next { 
          right: 10px;
        }
        img{
          width: 100%;
          height: 100%;
        }
      }  
    }
    .ads-box{
      @include flex();
      margin: 14px 8px;

      a{
        display: block;
        width: 322px;
        height: 167px;
        img{
          width: 100%;
          height: 100%;
        }
        
      }
    }
    .banner{
      a {
        display: block;
        img {
          width: 100%;
          height: 150px;

        }
      } 
    }
    .product-box {
      background-color:#F5F5F5;
      padding: 30px 0 50px;
      h2 {
        padding-left: 5px;
        font-size: 22px;
        height: 21px;
        line-height: 21px;
        color: #333333;
        margin-bottom: 20px;
      }
      .wrapper{
        display: flex;
        .banner-left{
          margin-right: 16px;
          img{
            width: 224px;
            height: 619px;
          }
        }
        .list-box{
          .list{
            @include flex();
            width: 986px;
            margin-bottom: 14px;
            &:last-child{
              margin-bottom: 0;
            }
            .item{
              width: 236px;
              height: 302px;
              background-color: #ffffff;
              text-align: center;
              span{
                display: inline-block;
                width: 67px;
                height: 24px;
                font-size: 14px;
                line-height: 24px;
                color: #ffffff;
                &.new-pro{
                  background-color:#7ECF68;
                }
                &.kill-pro{
                  background-color:#E82626;
                }
              }
              .item-img{
                img{
                  width: 100%;
                  height: 195px;
                }
              }
              .item-info {
                h3 {
                  font-size: #F5F5F5;
                  color: #333333;
                  line-height: #F5F5F5;
                  font-weight: bold;
                }
                p {
                  color: #999999;
                  line-height: 13px;
                  margin: 6px auto 13px;
                }
                .price{
                  color: #F20A0A;
                  font-size: 14px;
                  font-weight: bold;
                  &::after{
                    @include bgImg(22px,22px,'/imgs/icon-cart-hover.png');
                    content: ' ';
                    margin-left: 5px;
                    vertical-align: middle;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>