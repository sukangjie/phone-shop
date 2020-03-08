<template>
    <div class="header">
        <div class="nav-topbar">
            <div class="container">
                <div class="topbar-menu">
                    <a href="javascript:;" class="logo">手机商城</a>
                    <a href="javascript:;">MUI</a>
                    <a href="javascript:;">云服务</a>
                    <a href="javascript:;">协议规则</a>
                </div>
                <div class="topbar-user">
                    <a href="javascript:;" v-if="username">{{username}}</a>
                    <a href="javascript:;" v-if="!username" @click="login">登录</a>
                    <a href="javascript:;" v-if="username" @click="logout">退出</a>
                    <a href="/#/order/list" v-if="username">我的订单</a>
                    <a href="javascript:;" class="my-cart" @click="goToCart"><span class="icon-cart"></span>购物车({{cartCount}})</a>
                </div>
            </div>
        </div>
        <div class="nav-header">
            <div class="container">
                <div class="header-logo">
                    <a href="/#/index"></a>
                </div>
                <div class="header-menu">
                    <div class="item-menu">
                        <span>手机类型1</span>
                        <div class="children">
                            <!-- 隐藏部分 -->
                            <ul>
                                <li class="product" v-for="(item, index) in phoneList" :key="index">
                                    <a :href="'/#/product/'+item.id" target="_blank">
                                        <div class="pro-img">
                                            <img v-lazy="item.mainImage" :alt="item.subtitle">
                                        </div>
                                        <div class="pro-name">{{item.name}}</div>
                                        <div class="pro-price">{{item.price | currency}}</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="item-menu">
                        <span>手机类型2</span>
                    </div>
                    <div class="item-menu">
                        <span>电视</span>
                        <div class="children">
                            <ul>
                                <li class="product">
                                    <a href="">
                                        <div class="pro-img">
                                            <img v-lazy="'/imgs/nav-img/nav-3-1.jpg'" alt="">
                                        </div>
                                        <div class="pro-name">电视 65英寸</div>
                                        <div class="pro-price">6999元</div>
                                    </a>
                                </li>

                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img v-lazy="'/imgs/nav-img/nav-3-2.jpg'" alt="">
                                        </div>
                                        <div class="pro-name">全面屏电视E55A</div>
                                        <div class="pro-price">1999元</div>
                                    </a>
                                </li>

                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img v-lazy="'/imgs/nav-img/nav-3-3.png'" alt="">
                                        </div>
                                        <div class="pro-name">电视4A 32英寸</div>
                                        <div class="pro-price">699元</div>
                                    </a>
                                </li>

                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img v-lazy="'/imgs/nav-img/nav-3-4.jpg'" alt="">
                                        </div>
                                        <div class="pro-name">电视4A 55英寸</div>
                                        <div class="pro-price">1799元</div>
                                    </a>
                                </li>

                                 <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img v-lazy="'/imgs/nav-img/nav-3-5.jpg'" alt="">
                                        </div>
                                        <div class="pro-name">电视4A 65英寸</div>
                                        <div class="pro-price">2699元</div>
                                    </a>
                                </li>

                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img v-lazy="'/imgs/nav-img/nav-3-6.png'" alt="">
                                        </div>
                                        <div class="pro-name">查看全部</div>
                                        <div class="pro-price">查看全部</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="header-search">
                    <div class="wrapper">
                        <input type="text" name="keyword">
                        <a href="javascript:;"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'NavHeader',
    data() {
        return {
            phoneList: []
        }
    },
    computed: {//计算属性获取store中的用户名和购物车数量
        /*username(){
        return this.$store.state.username;
      },
      cartCount(){
        return this.$store.state.cartCount;
      }*/
      ...mapState(['username','cartCount'])
    },
    filters: {//日期格式化或者金额格式化
        currency(val) {
            if(!val) return '0.00';
            return '￥' + val.toFixed(2) + '元';
        }
    },
    mounted() {
        this.getProductList();
        // 传参
        let params = this.$route.params;
        if(params && params.from == 'login'){
            this.getCartCount();
        }
    },
    methods: {
        login(){//跳转到登录页面
            this.$router.push('/login');
        },
        getProductList() {//获取产品数量
            this.axios.get('/products', {
                params: {  //传参
                    categoryId: '100012',
                    pageSize: 6   //一页查六条
                }
            }).then(res => {  //获取后的值放在phoneList 中
                    this.phoneList = res.list;
                    // console.log(this.phoneList)
            })
        },
        getCartCount() {
            this.axios.get('/carts/products/sum').then((res=0)=>{
                this.$store.dispatch('saveCartCount',res);
            })
        },
        logout() {//退出登录
            this.axios.post('/user/logout').then(()=>{
                this.$message.success('退出成功');
                //清除cookie的缓存
                this.$cookie.set('userId','',{expires:'-1'});
                //修改用户名和购物车数量
                this.$store.dispatch('saveUserName','');
                this.$store.dispatch('saveCartCount','0');
            })
        },
        goToCart() {//跳转到购物车页面
        this.$router.push('/cart');
        }
    }
}
</script>
<style lang="scss" scoped>
@import './../assets/scss/base.scss';
@import './../assets/scss/mixin.scss';
.header {
    .nav-topbar {
        height: 39px;
        line-height: 39px;
        background-color: #333333;
        color: #B0B0B0;
        .container {
            @include flex();
            a {
                display: inline-block;
                color: #B0B0B0;
                margin-right: 17px;
                &.logo {
                    font-weight: bold;
                    color: #ff6600;
                }
            }
            .my-cart {
                width: 110px;
                background-color: #FF6600;
                text-align: center;
                color: #ffffff;
                margin-right: 0;
                .icon-cart {
                    @include bgImg(16px,12px,'/imgs/icon-cart-checked.png');
                    margin-right: 4px;
                }
            }
        }
    }
    .nav-header {
        .container {
            position: relative;
            height: 112px;
            @include flex();
            .header-menu {
                display: inline-block;
                width: 643px;
                padding-left: 209px;
                .item-menu {
                    display: inline-block;
                    color: #333333;
                    font-weight: bold;
                    font-size: 16px;
                    line-height: 112px;
                    margin-right: 20px;
                    span {
                        cursor:pointer;
                    }
                    &:hover {
                        color: #ff6600;
                        .children {
                                height:220px;
                                opacity:1;  //hover状态下可以出现
                        }
                    }
                    .children {
                        position: absolute;
                        top: 112px;
                        left: 0;
                        width: 1226px;
                        height: 0;//高度为零,超出部分之后隐藏
                        opacity: 0;  //开始的时候是完全透明的
                        overflow: hidden;
                        border-top: 1px solid #E5E5E5;
                        box-shadow:0px 7px 6px 0px rgba(0, 0, 0, 0.11);
                        z-index: 10; //能够放在最上层
                        transition: all .5s; //动画效果
                        background-color: #ffffff;
                        .product {
                            position: relative;
                            float: left;
                            width: 16.6%;
                            height: 220px;
                            font-size: 12px;
                            line-height: 12px;
                            text-align: center;
                            a {
                                display: inline-block;
                            }
                            img {
                                width: auto;
                                height: 111px;
                                margin-top: 26px;
                            }
                            .pro-img{
                                height: 137px;
                            }
                            .pro-name {
                                font-weight: bold;
                                margin-top: 19px;
                                margin-bottom: 8px;
                                color: #333333;
                            }
                            .pro-price {
                                color: #ff6600;
                            }
                            &::before { //用伪元素来画分割线
                                content: ' ';
                                position: absolute;
                                top: 28px;
                                right: 0;
                                border-left: 1px solid #d7d7d7;
                                height: 100px;
                                width: 1px;
                            }
                        &:last-child::before { //最后一个item没有分割线
                            display: none;
                        }
                    }
                }
            }
        }
        .header-search {
            width: 319px;
            .wrapper {
                height: 50px;
                border: 1px solid #E0E0E0;
                display: flex;
                align-items: center;
                input {
                    border: none;
                    box-sizing: border-box;
                    border-right: 1px solid #E0E0E0;
                    width: 264px;
                    height: 50px;
                    padding-left: 14px;
                }
                a {
                    @include bgImg(18px,18px,'/imgs/icon-search.png');
                    margin-left: 17px;
                }
            }
        }
        }
    }
}
</style>