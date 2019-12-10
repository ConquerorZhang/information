import Vue from 'vue'

var request = require('../plugins/request/index');
const CONFIG = require('./config.js')
const SIGN = require('./sign.js')

var api_BASE_URL;
var http;
if (process.env.NODE_ENV === 'development') {
	console.log(' 开发环境')
	api_BASE_URL = CONFIG.testURL;
	http = request.http;
} else {
	console.log('生产环境')
	api_BASE_URL = CONFIG.httpURL;
	http = request.test;
}

const MyAPI = (url, needSubDomain, method, data) => {
	let _url = api_BASE_URL + (needSubDomain ? '/' + CONFIG.subDomain : '') + '/' + url

	let token = Vue.config.configDic.token;
	let guid = Vue.config.configDic.guid;
	let nonce = Math.floor(Math.random() * 800000000 + 100000000);
	let ttl = Date.parse(new Date()) / 1000;
	let sign = SIGN.sign(url, guid, nonce, ttl, token, data);

	// data['guid'] = guid;
	// data['nonce'] = nonce;
	// data['sign'] = sign;
	// data['ttl'] = ttl;

	http.setConfig((config) => { /* config 为默认全局配置*/
		config.baseUrl = api_BASE_URL; /* 根域名 */
		config.header = {
			// guid: guid,
			// nonce: nonce,
			// ttl: ttl,
			// sign: sign,
			token: token,
			version: Vue.config.configDic.version,
			verCode: Vue.config.configDic.verCode,
			appCode: Vue.config.configDic.appCode,
			'content-type':'application/x-www-form-urlencoded',
			// 'content-type':method == "GET" ? 'application/x-www-form-urlencoded' : 'application/json;charset=UTF-8',
		}
		return config
	})
	
	if (method == "GET") {
		// url拼接参数
		_url = _url + '?'
		for (var key in data) {
			var item = data[key];
			_url = _url + key + '=' + item + '&'
		}
		return new Promise((resolve, reject) => {
			http.get(_url)
				.then(res => {
					resolve(res)
				}).catch(err => {
					reject(err)
					// uni.showModal({
					// 	title: '提示',
					// 	content: err.errMsg,
					// 	showCancel: false
					// })
				});
		});
	} else if (method == "POST") {
		return new Promise((resolve, reject) => {
			http.post(_url, data)
				.then(res => {
					resolve(res)
				}).catch(err => {
					reject(err)
					// uni.showModal({
					// 	title: '提示',
					// 	content: err.errMsg,
					// 	showCancel: false
					// })
				});
		});
	}
}

module.exports = {
	MyAPI,
	// 互动区发表
	interPublish: (data) => {
		return MyAPI('interact/issue/publish', false, 'POST', data)
	},
	// 互动区首页列表
	interactionList: (data) => {
		return MyAPI('interact/issue/list', false, 'GET', data)
	},
	// 互动区问题详情
	interDetail: (data) => {
		return MyAPI('interact/issue/detail', false, 'GET', data)
	},
	// 互动区问题详情的回复列表
	interCommentList: (data) => {
		return MyAPI('interact/commentlist', false, 'GET', data)
	},
	// 互动区问题回复
	interCommentReply: (data) => {
		return MyAPI('interact/addcomment', false, 'POST', data)
	},
	
	// 电科动态列表
	newsList: (data) => {
		return MyAPI('infos/dynamic/list', false, 'GET', data)
	},
	// 电科动态详情
	newsDetail: (data) => {
		return MyAPI('infos/dynamic/detail', false, 'GET', data)
	},
	
	// 我的
	myInfo: (data) => {
		return MyAPI('', false, 'GET', data)
	},
	// 我的消息列表
	myMessageList: (data) => {
		return MyAPI('infos/notice/list', false, 'GET', data)
	},
	// 我的消息详情
	myMessageDetail: (data) => {
		return MyAPI('infos/notice/detail', false, 'GET', data)
	},
}
