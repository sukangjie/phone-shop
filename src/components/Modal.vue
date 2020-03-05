<template>
    <transition name="slide">
        <div class="modal" v-show="showModal">
            <!-- mask为遮罩层 -->
            <div class="mask"></div>
            <div class="modal-dialog">
                <div class="modal-header">
                    <span>{{title}}</span>
                    <!-- 这里放着一个小叉关闭图标 -->
                    <a href="javascript:;" class="icon-close" @click="$emit('cancel')"></a>
                </div>
                <!-- 插槽 -->
                <div class="modal-body">
                    <!-- 插槽放主体内容 -->
                    <slot name="body"></slot>
                </div>
                <div class="modal-footer">
                    <a href="javascript:;" class="btn" v-if="btnType==1" @click="$emit('submit')">{{sureText}}</a>
                    <a href="javascript:;" class="btn" v-if="btnType==2" @click="$emit('cancel')">{{cancelText}}</a>
                    <div class="btn-group" v-if="btnType==3">
                        <a href="javascript:;" class="btn" @click="$emit('submit')">{{sureText}}</a>
                        <a href="javascript:;" class="btn btn-default" @click="$emit('cancel')">{{cancelText}}</a>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'Modal',
    props: {//接收父组件传来的参数
        // 弹框类型：小small、中middle、大large、表单form
        modalType:{
            type:String,
            default:'form'
        },
        // 弹框标题
        title: String,
        // 按钮类型: 1:确定按钮 2：取消按钮 3：确定取消
        btnType: String,
        sureText: {
            type: String,
            default: '确定'
        },
        cancelText:{
            type: String,
            default: '取消'
        },
      showModal: Boolean
    }
}
</script>
<style lang="scss" scoped>
@import './../assets/scss/mixin.scss';
@import './../assets/scss/modal.scss';
</style>