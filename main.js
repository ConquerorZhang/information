import Vue from 'vue'
import App from './App'
var util = require('./common/bridge.js');

Vue.config.productionTip = false
App.mpType = 'app'

Vue.config.configDic = {};
// 从原生获取token
util.bridgeAndroidAndIOS();

//判断字符是否为空的方法
Vue.prototype.isEmpty = function isEmpty(obj){
    if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
    }else{
        return false;
    }
}

const app = new Vue({
    ...App
})
app.$mount()

/* 
 全局注册组件
 */
import uniPopup from '@/components/lib/uni-popup/uni-popup.vue';//弹窗
import uniIcons from '@/components/lib/uni-icons/uni-icons.vue';//图标
import unisearchbar from "@../../components/lib/uni-search-bar/uni-search-bar.vue"//搜索框
Vue.component('uni-popup',uniPopup);
Vue.component('uni-icons',uniIcons);
Vue.component('uni-search-bar',unisearchbar);