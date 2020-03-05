import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

// import env from './env'
// mock开关
const mock = false;
if (mock) {
  require('./mock/api');
}
// 根据前端的跨域方式做调整 /a/b : /api/a/b => /a/b
// axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5dc7afee2b69d9223b633cbb/mimall';
 axios.defaults.baseURL = '/api';
// axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.timeout = 5000;

// 根据环境变量获取不同的请求地址
// axios.defaults.baseURL = env.baseURL;
// 接口错误拦截
axios.interceptors.response.use(function(response) {
  let res = response.data;
  let path = location.hash;
  if (res.status === 0) {//成功之后返回数据
    return res.data;
  }else if (res.status === 10) {//跳转到登录页面
    if (path !== '#/index') {
      window.location.href = '/#/login';
    }
    return Promise.reject(res);
  }else {//警告提示
    Message.warning(res.msg);
    return Promise.reject(res);
  }
}, (error) => {//错误提示
  let res = error.response;
  Message.error(res.data.message);
  return Promise.reject(error);
});

Vue.use(VueAxios,axios);
Vue.use(VueCookie);
Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-bars.svg'
})
Vue.prototype.$message = Message;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
