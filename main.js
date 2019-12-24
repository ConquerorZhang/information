import Vue from 'vue'
import App from './App'
var util = require('./common/bridge.js');

Vue.config.productionTip = false;
App.mpType = 'app';

Vue.config.configDic = {
};
// 初始化bridge
util.bridgeAndroidAndIOS();//{'key':'onshow'}
// setTimeout(function(){
	
// 	util.mregisterHandler('JS Echo', function(data, responseCallback) {
// 		uni.showToast({
// 			title: data.key,
// 		});
// 					// 初始传入token和guid
// 					Vue.config.configDic = {
// 						Authorization: data.Authorization,
// 						// guid: "123456",
// 						// token: "abcdefg",
// 						// version: "0.0.1",
// 						// verCode: "191122",
// 						// appCode: "corpMall",
// 					};
// 				});
// },500)

//判断字符是否为空的方法
Vue.prototype.isEmpty = function isEmpty(obj){
    if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
    }else{
        return false;
    }
}
//注册函数,供原生调用
Vue.prototype.registerHandler = function registerHandler(name,invoke){
	util.mregisterHandler(name,invoke);
};

//调用原生
Vue.prototype.callHandler = function callHandler(name,data){
	util.mcallHandler(name,data,function(responseData) {
				console.log("JS received response:", responseData)
				// uni.showToast({
				// 	title: responseData,
				// })
			});
};

//调用原生
Vue.prototype.callHandlerBack = function callHandler(name,data,callback){
	util.mcallHandler(name,data,callback);
};


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