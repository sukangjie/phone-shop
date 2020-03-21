<template>
    <div class="nav-bar" :class="{'is_fixed': isFixed}">
        <div class="container">
            <div class="pro-title">
                {{title}}
            </div>
            <div class="pro-param">
                <a href="javascript:;">概述</a><span>|</span>
                <a href="javascript:;">参数</a><span>|</span>
                <a href="javascript:;">用户评价</a>
                <!-- 定义插槽 -->
                <slot name="buy"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductParam',
    props: {
        title: String
    },
    data() {
        return {
            isFixed: false
        }
    },
    mounted() { 
        window.addEventListener('scroll', this.initHeight);
    },
    methods: {
        initHeight() {  //监听吸顶功能
            let scrollTop = window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop;
            this.isFixed = scrollTop > 160? true: false;
        }
    },
    destroyed() {
        window.removeEventListener('scroll', this.initHeight, false);
    }
}
</script>
<style lang="scss" scoped>
 @import './../assets/scss/mixin.scss';
 .nav-bar {
     height: 70px;
     line-height: 70px;
     border-top: 1px solid #e5e5e5;
     background-color: #ffffff;
     z-index: 10;
     &.is_fixed {
         width: 100%;
         position: fixed;
         top: 0;
         box-shadow: 0 3px 3px  #cccccc;
     }
     .container {
         @include flex();
         .pro-title {
             font-size: 18px;
             color:  #333333;
             font-weight: bold;
         }
         .pro-param {
             font-size: 14px;
             span {
                 margin: 0 10px;
             }
             a {
                 color: #666666;
             }
         }
     }
 }
</style>