import Vue from 'vue'
import App from './App'
import { $http } from '@escook/request-miniprogram'
import uniIcons from "@/components/uni-icons/uni-icons.vue"
import store from '@/store/store.js'
Vue.component('uniIcons',uniIcons)



uni.$http = $http
// 配置请求根路径
$http.baseUrl = 'https://uinav.com'

// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}

// 请求完成之后做一些事情
$http.afterRequest = function () {
  uni.hideLoading()
}
//
// 封装的展示消息提示的方法
uni.$showMsg = function (title = '数据加载失败！', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none',
  })
}


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
 store,
    ...App
})
app.$mount()
