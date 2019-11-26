const MD5 = require('./md5.js')

function sign(url, guid, nonce, ttl, token, data) {
	if (data == undefined || data.length == 0) {
		let str = '/' + url + '?token=' + token + '&guid=' + guid + '&nonce=' + nonce + '&ttl=' + ttl
		console.log(str)
		return MD5.md5(str)
	}

	//先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
	var newkey = Object.keys(data).sort();
	var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
	for (var i = 0; i < newkey.length; i++) {
		//遍历newkey数组
		newObj[newkey[i]] = data[newkey[i]];
	}
	// 整理成排序的key-value数组
	let sortedParams = [];
	for (var key in newObj) {
		var item = newObj[key];
		sortedParams.push(key + '=' + item)
	}
	// 连接
	const paramerStr = sortedParams.join('&')

	let str = '/' + url + '?token=' + token + '&guid=' + guid + '&nonce=' + nonce + '&ttl=' + ttl + '&' + paramerStr;
	return MD5.md5(str)
}

module.exports = {
	sign: sign,
}
