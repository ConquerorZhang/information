import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

// 建立桥接示例
// switch(uni.getSystemInfoSync().platform){
//     case 'android':
//        console.log('运行Android上')
//        break;
//     case 'ios':{
// 		console.log('运行iOS上')
		
// 	    var util = require('./common/util.js');
// 		util.setupWebViewJavascriptBridge(function(bridg
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

const app = new Vue({
    ...App
})
app.$mount()
