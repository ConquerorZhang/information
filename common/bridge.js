import Vue from 'vue'

function bridgeAndroidAndIOS(data) {
	function setupWebViewJavascriptBridge(callback) {
		if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
		if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
		window.WVJBCallbacks = [callback];
		var WVJBIframe = document.createElement('iframe');
		WVJBIframe.style.display = 'none';
		WVJBIframe.src = 'https://__bridge_loaded__';
		document.documentElement.appendChild(WVJBIframe);
		setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
	}
	
	// 建立桥接示例
	switch(uni.getSystemInfoSync().platform){
	    case 'android':
	       console.log('运行Android上')
	       break;
	    case 'ios':{
			console.log('运行iOS上')
			
			setupWebViewJavascriptBridge(function(bridge) {
				/* Initialize your app here */
				bridge.registerHandler('JS Echo', function(data, responseCallback) {
					console.log("JS Echo called with:", data)
					// responseCallback(data)
					
					// 初始传入token和guid
					Vue.config.configDic = {
						Authorization: data.Authorization ,
						// guid: "123456",
						// token: "abcdefg",
						// version: "0.0.1",
						// verCode: "191122",
						// appCode: "corpMall",
					};
				})
				bridge.callHandler('ObjC Echo', data, function responseCallback(responseData) {
					console.log("JS received response:", responseData)
				})
			})
			
	       break;
		}
	    default:
	       console.log('运行在开发者工具上')
	       break;
	}
}

module.exports = {
	bridgeAndroidAndIOS: bridgeAndroidAndIOS
}
