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
	let _url = api_BASE_URL + (needSubDomain ? '/' + CONFIG.subDomain : '') + '/' + url;
	//todozcc临时的token
	let Authorization = Vue.prototype.isEmpty(Vue.config.configDic.Authorization) ? "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjEsImV4cCI6MTU3OTMzNjU3NCwidXNlcm5hbWUiOiLogpblvawifQ.RT9sW3EAIxoCG9u2JMiFOPZngROM72uthVxs16Odzrk" : Vue.config.configDic.Authorization;
	// let token = Vue.config.configDic.token;
	// let guid = Vue.config.configDic.guid;
	// let nonce = Math.floor(Math.random() * 800000000 + 100000000);
	// let ttl = Date.parse(new Date()) / 1000;
	// let sign = SIGN.sign(url, guid, nonce, ttl, token, data);

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
			// token: token,
			// version: Vue.config.configDic.version,
			// verCode: Vue.config.configDic.verCode,
			// appCode: Vue.config.configDic.appCode,
			Authorization: Authorization,
			'content-type':'application/x-www-form-urlencoded',
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
		return MyAPI('users/userinfo', false, 'GET', data)
	},
	// 我的互动里的红点
	myInfoRedDots: (data) => {
		return MyAPI('interact/myunreaditems', false, 'GET', data)
	},
	// 我的消息列表
	myMessageList: (data) => {
		return MyAPI('infos/notice/list', false, 'GET', data)
	},
	// 我的消息详情
	myMessageDetail: (data) => {
		return MyAPI('infos/notice/detail', false, 'GET', data)
	},
	// 我的帖子收藏 interact/mycollect
	myCollect: (data) => {
		return MyAPI('interact/myissuecollect', false, 'GET', data)
	},
	// 我的产品收藏 
	myProductCollect: (data) => {
		return MyAPI('interact/myproductcollect', false, 'GET', data)
	},
	// 我的收藏批量删除
	myCollectCancel: (data) => {
		return MyAPI('interact/cancelcollects', false, 'GET', data)
	},
	// 我的浏览记录
	myBrowseHistory: (data) => {
		return MyAPI('visithistory/mylist', false, 'GET', data)
	},
	// 我的浏览记录删除
	myBrowseClear: (data) => {
		return MyAPI('visithistory/emptymylist', false, 'GET', data)
	},
  	// 互动区点赞
	interactionFavour: (data) => {
		return MyAPI('interact/favour/favour', false, 'GET', data)
	},
	// 互动区取消点赞
	interactionUnFavour: (data) => {
		return MyAPI('interact/favour/unfavour', false, 'GET', data)
	},
	// 互动区详情收藏
	interactionCollect: (data) => {
		return MyAPI('interact/addcollect', false, 'GET', data)
	},
	// 互动区详情取消收藏
	interactionUnCollect: (data) => {
		return MyAPI('interact/cancelcollect', false, 'GET', data)
	},
	// 我的发布-点赞我的
	favourMyIssue: (data) => {
		return MyAPI('interact/favour/favourMyIssue', false, 'GET', data)
	},
	// 我的发布-评论我的
	commentMyIssue: (data) => {
		return MyAPI('interact/commentMyIssue', false, 'GET', data)
	},
	// 我的发布-我的回答
	myIssueComment: (data) => {
		return MyAPI('interact/issue/myIssueComment', false, 'GET', data)
	},
	// 我的发布-我的回答,改
	myIssueComment2: (data) => {
		return MyAPI('interact/commentonmycomment', false, 'GET', data)
	},
	// 我的发布-我的发布
	myPublish: (data) => {
		return MyAPI('interact/issue/myPublish', false, 'GET', data)
	},
	// 我的发布-删除我的发布
	myPublishDelete: (data) => {
		return MyAPI('interact/issue/delmyissue', false, 'GET', data)
	},
	// 我的发布-删除我的回答
	myIssueCommentDelete: (data) => {
		return MyAPI('interact/delmycomment', false, 'GET', data)
	},
	// 我的发布-删除我的回答,改
	myIssueCommentDelete2: (data) => {
		return MyAPI('interact/delcommentonmycomment', false, 'GET', data)
	},
	// 我的发布-删除赞我的
	replymeDeletefavour: (data) => {
		return MyAPI('interact/favour/delfavourme', false, 'GET', data)
	},
	// 我的发布-删除回复我的
	replymeDeleteContent: (data) => {
		return MyAPI('interact/delcommentmyissue', false, 'GET', data)
	},
	// 产品
	productData: (data) => {
		return MyAPI('product/productinfo', false, 'GET', data)
	},
    //首页热搜
	HomeHotSearch: (data) => {
		return MyAPI('search/hotsearchkeyslist', false, 'GET', data)
	},
	//搜索结果-动态
	searchResultNews: (data) => {
		return MyAPI('infos/dynamic/searchlist', false, 'GET', data)
	},
	//搜索结果-项目档案
	searchResultFile: (data) => {
		return MyAPI('project/searchlist', false, 'GET', data)
	},
	//搜索结果-产品
	searchResultProduct: (data) => {
		return MyAPI('product/searchlist', false, 'GET', data)
	},
	//搜索结果-学习资料
	searchResultLearn: (data) => {
		return MyAPI('learnmaterial/searchlist', false, 'GET', data)
	},
      //获取资源列表
    HomeresourceList: (data) => {
    	return MyAPI('learnmaterial/list', false, 'GET', data)
    },
    //获取资源查询时 分类列表
    getlv1list: (data) => {
        return MyAPI('product/getlv1list', false, 'GET', data)
    },
    //获取文件类型 / doc xls ppt
    getFileType:(data) => {
        return MyAPI('learnmaterial/alltype', false, 'GET', data)
    },
    getfileDetail: (data) => {
         return MyAPI('learnmaterial/detail', false, 'GET', data)
    },
    getHistoryList:(data) => {
         return MyAPI('learnmaterial/downloadhistory', false, 'GET', data)
    },
    deleteHistory : (data) => {
         return MyAPI('learnmaterial/deletehistory', false, 'GET', data)
    }

}
