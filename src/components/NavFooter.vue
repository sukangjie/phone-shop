<template>
    <div class="footer">
        <div class="footer-logo">
            <!-- <img src="/imgs/logo-footer.png" alt=""> -->
            <p>手机商城</p>
        </div>             
        <div class="footer-link">
            <a href="javascript:;" target="_blank">网站主题</a><span>|</span>
            <a href="javascript:;" target="_blank">手机商城</a><span>|</span>
            <a href="javascript:;" target="_blank">售后联系</a><span>|</span>
            <a href="javascript:;" target="_blank">版权所有</a>
        </div>
        <div class="copyright">Copyright ©2020 <span class="domain">phone.futurefe.com</span> All Rights Reserved.</div>
  </div>
</template>

<script>
export default {
    name: 'NavFooter'
}
</script>
<style lang="scss" scoped>
.footer {
    height: 234px;
    border-top: 4px solid #ff6600;
    background-color: #333333;
    color: #999999;
    font-size: 16px;
    text-align: center;//里面的所有文字水平居中显示
    .footer-logo {
        margin-top: 46px;
        margin-bottom: 30px;
        img {
            width: 54px;
            height: 36px;
            margin-bottom: 13px;
        } 
    }
    .footer-link {
        a {
            color: #999999;
            display: inline-block;

        }
        span {
            margin: 0 10px;
        }
        margin-bottom: 13px;
    }
    .copyright {
        .domain {
            color: #ff6600;
        }
    }
}
</style>
