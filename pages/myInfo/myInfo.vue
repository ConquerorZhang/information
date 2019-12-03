<template>
	<view class="totalContent">
		<view class="settingTopBgView" :style="{background: 'url('+data.settingBGImage +')'}">
			<view class="headBGView">
				<image class="head" :src='data.head'></image>
				<view class="nameInfo">
					<view class="name">{{data.name}}</view>
					<view class="mail">{{data.mail}}</view>
					<view class="phone">{{data.phone}}</view>
				</view>
				<image class="settingBtn" :src=data.settingImage></image>
			</view>
		</view>
		<view class="myFunctionModel">
			<view class="content" v-for="(item,index) in data.myFunctionArr" :key="index">
				<image class="myFunctionImage" :src="item.image" mode="scaleToFill" v-on:click="navigateToFunc(index)"></image>
				<view class="myFunctionImageLabel">{{item.text}}</view>
			</view>
		</view>
		<view class="interactionModel">
			<view class="interTitle">我的互动</view>
			<view class="lineView"></view>
			<view class="interactionPart">
				<view class="content" v-for="(item,index) in data.interactionArr" :key="index" v-on:click="navigateToInter(index)">
					<image class="interactionImage" :src="item.image" mode="scaleToFill"></image>
					<view class="interactionText">{{item.text}}</view>
					<view class="interactionDot">{{item.dot}}</view>
				</view>
			</view>
		</view>
		<view class="hotTitle">热门收藏</view>
		<view class="hotListModel">
			<view class="hotList" v-for="item in data.hotList" :key="item.id">
				<image class="hotListImage" :src="item.image" mode="scaleToFill"></image>
				<view class="hotListText">
					<view class="title">{{item.title}}</view>
					<view class="subTitle">{{item.subTitle}}</view>
					<view class="time">{{item.time}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	const API = require('../../common/api.js')

	export default {
		data() {
			return {
				data: {
					settingBGImage: "",
					settingImage: "../../static/logo.png",
					head: "../../static/logo.png",
					name: "哈哈",
					mail: "1844@qq.com",
					mailImage: "../../static/logo.png",
					phone: "166",
					phoneImage: "../../static/logo.png",
					myFunctionArr: [{
							"image": "../../static/logo.png",
							"text": "我的收藏"
						},
						{
							"image": "../../static/logo.png",
							"text": "我的下载"
						},
						{
							"image": "../../static/logo.png",
							"text": "历史记录"
						},
						{
							"image": "../../static/logo.png",
							"text": "消息中心"
						}
					],
					interactionArr: [{
							"image": "../../static/logo.png",
							"text": "我的发布",
							"dot": "10"
						},
						{
							"image": "../../static/logo.png",
							"text": "我的回答",
							"dot": "2"
						},
						{
							"image": "../../static/logo.png",
							"text": "回复我的",
							"dot": "99"
						},
					],
					hotImage: "../../static/logo.png",
					hotList: [{
							"image": "../../static/logo.png",
							"title": "你是我的眼带我领略浩瀚的书海你是我的眼",
							"subTitle": "1234567890987654321234567890啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦将垃圾垃圾垃圾垃圾1234567890",
							"time": "2019-11-22",
						},
						{
							"image": "../../static/logo.png",
							"title": "你是我的眼带我领略浩瀚的书海你是我的眼",
							"subTitle": "1234567890987654321234567890啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦将垃圾垃圾垃圾垃圾1234567890",
							"time": "2019-11-22",
						}
					],
				}
			}
		},
		onLoad() {
			API.loginInfo({
				userName: 'name',
				password: '123456'
			}).then(res => {
				console.log(res);
			}).catch(err => {
				console.log('测试网络请求');
			})
		},
		methods: {
			navigateToFunc(index) {
				switch (index) {
					case 0:
						{
							uni.navigateTo({
								url: "myCollection"
							})
							break;
						}
					case 1:
						{

							break;
						}
					case 2:
						{
							uni.navigateTo({
								url: "browseHistory"
							})
							break;
						}
					case 3:
						{
							uni.navigateTo({
								url: "myMessage"
							})
							break;
						}
					default:
						break;
				}
			},
			navigateToInter(index) {
				switch (index) {
					case 0:
						{
							uni.navigateTo({
								url: "myPublish?index=0"
							})
							break;
						}
					case 1:
						{
							uni.navigateTo({
								url: "myPublish?index=1"
							})
							break;
						}
					case 2:
						{
							uni.navigateTo({
								url: "myPublish?index=2"
							})
							break;
						}
					default:
						break;
				}
			}
		}
	}
</script>

<style lang="scss">
	.totalContent {
		background: #feffff;
	}

	.settingTopBgView {
		background: #999999;
		padding-top: 80rpx;
		padding-bottom: 100rpx;

		.headBGView {
			display: flex;
			.head {
				margin: 0 20rpx;
				width: 140rpx;
				height: 140rpx;
				border-radius: 70rpx;
			}

			.nameInfo {
				width: 500rpx;
			}

			.settingBtn {
				width: 50rpx;
				height: 50rpx;
			}
		}

		.mail {
			display: flex;
		}

		.mail::before {
			content: '';
			display: inline-block;
			width: 20px;
			height: 20px;
			background-image: url('~@/static/logo.png');
			background-size: cover;
			margin-right: 10rpx;
		}

		.phone {
			display: flex;
		}

		.phone::before {
			content: '';
			display: inline-block;
			width: 20px;
			height: 20px;
			background-image: url('~@/static/logo.png');
			background-size: cover;
			margin-right: 10rpx;
		}
	}

	.myFunctionModel {
		display: flex;
		justify-content: space-between;
		margin: -60rpx 20rpx 0;
		border-radius: 40rpx;
		height: 220rpx;
		padding: 20rpx 20rpx;
		background: #FFFFFF;
		border: 2px solid #f0f1f2;

		.content {
			position: relative;
			margin-top: 30rpx;
			text-align: center;

			.myFunctionImage {
				width: 120rpx;
				height: 120rpx;
			}

			.myFunctionImageLabel {
				font-size: 30rpx;
			}
		}
	}

	.interactionModel {
		background: #FFFFFF;
		height: 250rpx;
		border-radius: 40rpx;
		margin: 20rpx;
		border: 2px solid #f0f1f2;

		.interTitle {
			padding: 20rpx 0 20rpx 20rpx;
		}

		.lineView {
			background: #DDDDDD;
			height: 0.5px;
		}

		.interactionPart {
			display: flex;
			text-align: center;
			justify-content: space-between;
			height: 220rpx;
			padding: 20rpx 20rpx;
			color: $uni-text-color-placeholder;

			.content {
				position: relative;

				.interactionImage {
					width: 50rpx;
					height: 50rpx;
				}

				.interactionDot {
					color: white;
					background: red;
					width: 34rpx;
					height: 34rpx;
					line-height: 34rpx;
					border-radius: 17rpx;
					font-size: 25rpx;
					font-weight: 900;
					position: absolute;
					right: 15rpx;
					top: -10rpx;
				}
			}
		}
	}

	.hotTitle {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 40rpx;
	}

	.hotTitle::before {
		content: '';
		display: inline-block;
		width: 50rpx;
		height: 50rpx;
		background-image: url('~@/static/logo.png');
		background-size: cover;
		margin-right: 10rpx;
	}

	.hotListModel {
		.hotList {
			display: flex;
			background: #FFFFFF;
			border-radius: 40rpx;
			margin: 20rpx;
			border: 2px solid #f0f1f2;

			.hotListImage {
				padding: 20rpx;
				width: 200rpx;
				height: 200rpx;
			}

			.hotListText {
				width: 450rpx;
				margin-right: 20rpx;

				.title {
					font-size: $uni-font-size-lg;
					margin-top: 15rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.subTitle {
					height: 115rpx;
					color: #999999;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
					font-size: $uni-font-size-base;
				}

				.time {
					margin-top: 10rpx;
					color: #999999;
					font-size: $uni-font-size-base;
				}
			}
		}
	}
</style>
