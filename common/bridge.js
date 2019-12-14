function bridgeAndroidAndIOS(data) {
	//ios
	function setupWebViewJavascriptBridge(callback) {
		if (window.WebViewJavascriptBridge) {
			return callback(WebViewJavascriptBridge);
		}
		if (window.WVJBCallbacks) {
			return window.WVJBCallbacks.push(callback);
		}
		window.WVJBCallbacks = [callback];
		var WVJBIframe = document.createElement('iframe');
		WVJBIframe.style.display = 'none';
		WVJBIframe.src = 'https://__bridge_loaded__';
		document.documentElement.appendChild(WVJBIframe);
		setTimeout(function() {
			document.documentElement.removeChild(WVJBIframe)
		}, 0)
	}

	//安卓
	function connectWebViewJavascriptBridge (callback) {
		if (window.WebViewJavascriptBridge) {
			callback(WebViewJavascriptBridge)
		} else {
			document.addEventListener(
				'WebViewJavascriptBridgeReady',
				function() {
					callback(WebViewJavascriptBridge)
				},
				false
			);
		}
	}
	
	 function bridgeLog(logContent) {
	          uni.showToast({
	          	title:'responseData1'+logContent,
	          })
	       }

	// 建立桥接示例
	switch (uni.getSystemInfoSync().platform) {
		case 'android':
			console.log('运行Android上')
			connectWebViewJavascriptBridge(function(bridge) {
					/* Initialize your app here */
					/* bridge.registerHandler('functionInJs', function(data, responseCallback) {
						console.log("JS Echo called with:", data)
						uni.showToast({
							title:'responseData1',
						})
						responseCallback(data)
					}) */

					//注册回调函数，第一次连接时调用 初始化函数
					// connectWebViewJavascriptBridge(function(bridge) {
					// bridge.init();
					
					
					bridge.init(function(message, responseCallback) {
						bridgeLog('s默认接收收到来自Java数据： ' + message);
						var responseData = 'ss默认接收收到来自Java的数据，回传数据给你sss';
						responseCallback(responseData);//回传数据给java
					});
					
					// bridge.init();
					//原生调用js
					bridge.registerHandler("functionInJs", function(data, responseCallback) {
						bridgeLog('z指定接收收到来自Java数据： ' + data);
						var responseData = 'zz指定接收收到来自Java的数据，回传数据给你functionInJs1';
						responseCallback(responseData);//回传数据给java
					});

//js调原生
					bridge.callHandler('submitFromWeb', data, function(responseData) {
						console.log("JS received response:", responseData)
						uni.showToast({
							title: responseData,
						})
					})
					
					
					
				
					// })


					
				})


			break;
			case 'ios':
			{
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
