<template>
    <div class="login">
        <!-- <div class="container">
            <a href="/#/index"></a>
        </div> -->
        <div class="wrapper">
            <div class="container">
                <div class="login-form">
                    <h3>
                        <span class="checked">帐号登录</span><span class="sep-line">|</span><span>扫码登录</span>
                    </h3>
                    <div class="input">
                        <input type="text" placeholder="请输入帐号" v-model="username">
                    </div>
                    <div class="input">
                        <input type="password" placeholder="请输入密码" v-model="password">
                    </div>
                    <div class="btn-box">
                        <a href="javascript:;" class="btn" @click="login">登录</a>
                    </div>
                    <div class="tips">
                        <div class="sms" @click="register">手机短信登录/注册</div>
                        <div class="reg">立即注册<span>|</span>忘记密码？</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: '',
            userId: '' 
        }
    },
    methods: {
        login() {
            // 解构
            let { username,password } = this;
            //post请求
            this.axios.post('/user/login', {
                username,
                password
            }).then((res) => {
                //设置cookie保存登录信息
                this.$cookie.set('userId', res.id, {expires:'Session'});
                //派发调用action
                this.$store.dispatch('saveUserName',res.username);
                this.saveUserName(res.username);
                this.$router.push({
                    name: 'Index',
                    params: {
                        from: 'Login'
                    }
                });
            })
        },
        ...mapActions(['saveUserName']),
        register() {//注册
            this.$axios.post('/user/register', {
                username: 'admin1',
                password: 'admin1',
                email: 'admin1@163.com'
            }).then(() => {
                this.$message.success('注册成功');
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.login {
    .wrapper {
        background: url('/imgs/login-bg.jpg') no-repeat center;
        .container {
            height: 576px;
            .login-form {
                box-sizing: border-box;
                padding-left: 30px;
                padding-right: 30px;
                width: 410px;
                height: 510px;
                background-color: #ffffff;
                position: absolute;
                right: 0;
                bottom: 30px;
                h3 {
                    font-size: 24px;
                    line-height: 23px;
                    text-align: center;
                    margin: 40px auto 49px;
                    .checked {
                        color: #FF6600;
                    }
                    .sep-line {
                        margin: 0 32px;
                    }
                }
                .input {
                    display: inline-block;
                    width: 348px;
                    height: 50px;
                    border: solid 1px #E5E5E5;
                    margin-bottom: 20px;
                    input {
                        width: 100%;
                        height: 100%;
                        border: none;
                        padding: 18px;
                    }
                }
                .btn {
                    width:100%;
                    line-height:50px;
                    margin-top:10px;
                    font-size:16px;
                }
                .tips {
                    margin-top: 14px;
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                    cursor: pointer;
                    .sms {
                        color: #FF6600;
                    }
                    .reg {
                        color: #999999;
                        span {
                            margin: 0 7px;
                        }
                    }
                }
            }
        }
    }
}
</style>