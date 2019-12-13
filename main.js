import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

// 初始传入token和guid
Vue.config.configDic = {
	guid: "123456",
	token: "abcdefg",
	version: "0.0.1",
	verCode: "191122",
	appCode: "corpMall",
};

// uni.getSystemInfo({
// 	success:function(res){
// 		console.log(res);
// 	}
// })

// 正式库
// var http = request.http;
// 测试库
// var http = request.test;

// 配置header
// http.setConfig((config) => { /* config 为默认全局配置*/
//     config.baseUrl = 'http://www.bbb.cn'; /* 根域名 */
//     config.header = {
//         a: 1,
//         b: 2
//     }
//     return config
// })
// Vue.prototype.$http = http;

// 建立桥接示例
// switch(uni.getSystemInfoSync().platform){
//     case 'android':
//        console.log('运行Android上')
//        break;
//     case 'ios':{
// 		console.log('运行iOS上')
		
// 	    var util = require('./common/bridge.js');
// 		util.setupWebViewJavascriptBridge(function(bridge) {
// 			/* Initialize your app here */
// 			bridge.registerHandler('JS Echo', function(data, responseCallback) {
// 				console.log("JS Echo called with:", data)
// 				responseCallback(data)
// 			})
// 			bridge.callHandler('ObjC Echo', {'key':'张聪聪'}, function responseCallback(responseData) {
// 				console.log("JS received response:", responseData)
// 			})
// 		})
		
//        break;
// 	}
//     default:
//        console.log('运行在开发者工具上')
//        break;
// }

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