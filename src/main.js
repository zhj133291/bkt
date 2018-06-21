// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import 'babel-polyfill'

// 引用API文件
import api from './api/index.js'
// 引用工具文件
import utils from './utils/index.js'
// 将API方法绑定到全局
Vue.prototype.$api = api

// 将工具方法绑定到全局
Vue.prototype.$utils = utils

Vue.config.productionTip = false

let bus = new Vue()
Vue.prototype.bus = bus

Vue.use(ElementUI)
Vue.prototype.goLogin = function (code) {
  let box =document.getElementsByClassName('el-message-box__wrapper');
  let flag = false;
  if (box && box.length>0){
    for (let j = 0;j<box.length;j++){
      if(box[j].style.display!='none'){
        flag = true;
        return false;
      }
    }
  }
  if(flag){
    return;
  }
  let me = this;
  let str = '会话失效,请重新登录';
  if(code == '10000007'){
    str = '您的权限已调整,请重新登录';
  }
  if(code == '10000011'){
    str = '您的账号已被禁用';
  }
  sessionStorage.removeItem('INFO');
  this.$alert(str, {
    confirmButtonText: '确定',
    center:true,
    callback: action => {
      setTimeout(()=>{
        me.$router.push("/");
      },1000)
    }
  });
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
