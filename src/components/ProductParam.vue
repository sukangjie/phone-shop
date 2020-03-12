<template>
    <div class="nav-bar" :class="{'is_fixed':isFixed}">
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
        initHeight() {
            let scrollTop = window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop;
            this.isFixed = scrollTop > 152? true: false;
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
     &.is_Fixed {
         width: 100%;
         position: fixed;
         top: 0;
         box-shadow: 0 5px 5px  #cccccc;
     }
     .container {
         @include flex();
         .pro-title {
             font-size: 18px;
             color:  #333333;
             font-weight: bold;
         }
         .pro-param {
             font-size:  #F5F5F5;
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