<template>
	<view class="contents">
		<view class="top">
			<view class="statusBar" v-bind:style="{height:statusBarHeight+'rpx'}"></view>
			<!-- 自定义导航 -->
			<view class="navBar">
				<view class="left-icon" @click="back">
					<uni-icons color="#ffffff" type="arrowleft" size="24" />
				</view>
				<view class="title">用户资料</view>
			</view>
			<view class="headView">
				<image :src="headUrl" mode="scaleToFill"></image>
				<view class="name">{{name}}</view>
			</view>
		</view>
		<view class="rowBlock" v-for="(item,index) in list" :key="index">
			<text class="title">{{item.title}}</text>
			<text class="content">{{item.content}}</text>
		</view>
	</view>
</template>

<script>
	const API = require('../../common/api.js');
	import Vue from 'vue';
	export default {
		data() {
			return {
				statusBarHeight:0,
				headUrl: '',
				name: '',
				list:[{'title':'姓名','content':'张三'},{'title':'公司','content':'成都思乐科技有限公司'},{'title':'部门','content':'技术部'},{'title':'角色','content':'技术人员'},{'title':'电话','content':'12343233322'},{'title':'邮箱','content':'1888888888@qq.com'}],
				
			};
		},
		onLoad(option) {
			var userid = option.userid;
			
			API.personalInfo({
				userid:userid
			}).then(res => {
				console.log(res);
				
				var dic = res.data.data;
				this.headUrl = dic.avatarUrl;
				this.name = dic.name;
				this.list[0].content = dic.name;
				this.list[1].content = dic.companyshortname;
				this.list[2].content = dic.companyshortname;
				this.list[3].content = dic.roles.join(',');
				this.list[4].content = dic.phone;
				this.list[5].content = dic.email;
				
					console.log(dic);
			}).catch(err => {
				console.log(err);
			})
			
			// 用来判断iphone11
			if (!Vue.prototype.isEmpty(Vue.config.configDic.statusBarHeight)) {
				const height = Vue.config.configDic.statusBarHeight;
				this.statusBarHeight =  parseFloat(height) > 40 ? height : '';
			}
		},
		onShow() {
			this.statusBarHeight = Vue.config.configDic.statusBarHeight;
			this.callHandler('ObjC Echo', {
				'key': 'personInfo'
			});
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		}

	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.contents {
		height: 100%;
		width: 100%;

		.top {
			width: 100%;
			background: #e4331f;

			.statusBar {
				width: 100%;
			}
			.statusBarHeight {
				height: $uni-status-height;
			}
			.statusBarHeightIOS {
				height: 44px;
			}

			.navBar {
				width: 100%;
				display: flex;
				flex-direction: row;

				.left-icon {
					display: flex;
					height: 100%;
					width: 50upx;
					padding: 0 10px;
					align-items: center;
				}

				.title {
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: row;
					margin-right: 70upx;
					justify-content: center;
					align-items: center;
					color: #FFFFFF;

				}
			}
		}

		.headView {
			text-align: center;
			color: #FFFFFF;
			height: 250rpx;
			padding-top: 60rpx;
			
			image {
				width: 112rpx;
				height: 112rpx;
				border-radius: 56rpx;
			}
		}
		.rowBlock {
			display: flex;
			justify-content: space-between;
			padding: 20rpx;
			border-bottom: 0.5rpx solid #cfcfcf;
			
			.title {
				color: #333333;
			}
			.content {
				color: #6A6A6A;
			}
		}
	}
</style>
