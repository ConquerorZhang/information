function bridgeAndroidAndIOS() {

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
	function connectWebViewJavascriptBridge(callback) {
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
			title: 'responseData1' + logContent,
		})
	}

	switch (uni.getSystemInfoSync().platform) {
		case 'android':
			console.log('运行Android上')
			connectWebViewJavascriptBridge(function(bridge) {
				//注册回调函数，第一次连接时调用 初始化函数

				//js调原生
				// bridge.callHandler('ObjC Echo', data, function(responseData) {
				// 	console.log("JS received response:", responseData)
				// 	// uni.showToast({
				// 	// 	title: responseData,
				// 	// })
				// })

				bridge.init();
				// bridge.init(function(message, responseCallback) {
				// 	bridgeLog('s默认接收收到来自Java数据： ' + message);
				// 	var responseData = 'ss默认接收收到来自Java的数据，回传数据给你sss';
				// 	responseCallback(responseData);//回传数据给java
				// });

				//原生调用js
				// mregisterHandler("JS Echo");

				bridge.registerHandler("JS Echo", function(data, responseCallback) {
					bridgeLog('接收到来自Android数据： ' + JSON.parse(data).Authorization);
					JSON.parse(data).Authorization
					// 初始传入token和guid
					Vue.config.configDic = {
						Authorization: data.Authorization,
						// guid: "123456",
						// token: "abcdefg",
						// version: "0.0.1",
						// verCode: "191122",
						// appCode: "corpMall",
					};
				});

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
							Authorization: data.Authorization,
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
//注册函数,供原生调用
function mregisterHandler(callname, invoke) {
	window.WebViewJavascriptBridge.registerHandler(callname, invoke);
	//invoke 示例
	// function(data, responseCallback) {
	// 			// bridgeLog('收到Android数据： ' + data);
	// 			uni.showToast({
	// 				title: '收到Android数据： ' + data,

	// 			})
	// 		}
}

//调用原生函数
function mcallHandler(callname, data, callback) {
	window.WebViewJavascriptBridge.callHandler(callname, data, callback);
	//callback 示例
	// function(responseData) {
	// 	console.log("JS received response:", responseData)
	// 	// uni.showToast({
	// 	// 	title: responseData,
	// 	// })
	// }
}

module.exports = {
	bridgeAndroidAndIOS: bridgeAndroidAndIOS,
	mregisterHandler: mregisterHandler,
	mcallHandler: mcallHandler,
}
