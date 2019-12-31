<template>
	<view class="totalContent">
		<head>
			<meta name="format-detection" content="telephone=no">
		</head>
		<view class="settingTopBgView">
			<!-- :style="{background: 'url('+data.settingBGImage +')'}"> -->
			<view class="headBGView">
				<image class="head" :src='data.head'></image>
				<view class="nameInfo">
					<view class="name">{{data.name}}</view>
					<view class="mailPart">
						<image src="../../static/mine/main/mail.png" mode="scaleToFill"></image>
						<view class="mail">{{data.mail}}</view>
					</view>
					<view class="phonePart">
						<image src="../../static/mine/main/phone.png" mode="scaleToFill"></image>
						<view class="phone">{{data.phone}}</view>
					</view>
				</view>
				<image class="settingBtn" :src=data.settingImage @click="clickSetting()"></image>
			</view>
		</view>
		<view class="myFunctionModel">
			<view class="content" v-for="(item,index) in data.myFunctionArr" :key="index" v-on:click="navigateToFunc(index)">
				<image :class="index == 1 ? 'downImage' : 'myFunctionImage'" :src="item.image" mode="scaleToFill" v-on:click="navigateToFunc(index)"></image>
				<view class="myFunctionImageLabel">{{item.text}}</view>
			</view>
		</view>
		<view class="interactionModel">
			<view class="interTitle">我的互动</view>
			<view class="lineView"></view>
			<view class="interactionPart">
				<view class="content" v-for="(item,index) in data.interactionArr" :key="index" v-on:click="navigateToInter(index)">
					<image class="interactionImage" :src="item.image" mode="widthFix"></image>
					<view class="interactionText">{{item.text}}</view>
					<view v-if="item.dot > 0" class="interactionDot">{{item.dot}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	var util = require('../../common/bridge.js');
	const API = require('../../common/api.js')

	export default {
		data() {
			return {
				data: {
					// settingBGImage: "../../static/mine/main/setting.png",
					settingImage: "../../static/mine/main/setting.png",
					head: "",
					name: "",
					mail: "",
					mailImage: "../../static/mine/main/mail.png",
					phone: "",
					phoneImage: "../../static/mine/main/phone.png",
					myFunctionArr: [{
							"image": "../../static/mine/main/collection.png",
							"text": "我的收藏"
						},
						{
							"image": "../../static/mine/main/download.png",
							"text": "我的下载"
						},
						{
							"image": "../../static/mine/main/history.png",
							"text": "历史记录"
						},
						{
							"image": "../../static/mine/main/message.png",
							"text": "消息中心"
						}
					],
					interactionArr: [{
							"image": "../../static/mine/main/myPublish.png",
							"text": "我的发布",
							"dot": "0"
						},
						{
							"image": "../../static/mine/main/myAnswer.png",
							"text": "我的回答",
							"dot": "0"
						},
						{
							"image": "../../static/mine/main/answerMe.png",
							"text": "回复我的",
							"dot": "0"
						},
					],
				}
			}
		},
		onLoad() {
			API.myInfo({}).then(res => {
				// console.log(res);
				const resData = res.data.data;
				
				this.data.head = resData.avatarUrl;
				this.data.name = resData.name;
				this.data.mail = resData.email;
				this.data.phone = resData.phone;
			}).catch(err => {
				console.log(err);
			})
		},
		onShow() {
			// util.bridgeAndroidAndIOS({'key':'onShow'});
			this.callHandler('ObjC Echo',{'key':'onShow'});
			
			//我的互动的消息红点
			API.myInfoRedDots({}).then(res => {
				// console.log(res);
				const resData = res.data.data;
				this.data.interactionArr[1].dot = resData.myAnswer;
				this.data.interactionArr[2].dot = resData.answerMe;
			}).catch(err => {
				console.log(err);
			})
		},
		methods: {
			clickSetting() {
				// util.bridgeAndroidAndIOS({'key':'setting'});
				this.callHandler('ObjC Echo',{'key':'setting'})
			},
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
							// uni.navigateTo({
							// 	url: "myDownLoad"
							// })
							this.callHandler('ObjC Echo',{'key':'download'})
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
								url: "myMessage?fromH5=1"
							})
							break;
						}
					default:
						break;
				}
				// util.bridgeAndroidAndIOS({'key':'inner'});
				this.callHandler('ObjC Echo',{'key':'inner'});
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
				// util.bridgeAndroidAndIOS({'key':'inner'});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
	}

	.totalContent {
		background: #feffff;
	}

	.settingTopBgView {
		background: #e13221;
		padding-top: 80rpx;
		padding-bottom: 100rpx;

		.headBGView {
			display: flex;

			.head {
				margin: 0 20rpx;
				width: 140rpx;
				height: 140rpx;
				border-radius: 70rpx;
				background: #D3D3D3;
			}

			.nameInfo {
				color: #FFFFFF;
				width: 500rpx;

				.mailPart {
					display: flex;
					align-items: center;

					image {
						width: 27rpx;
						height: 22rpx;
						margin-right: 15rpx;
					}
				}

				.phonePart {
					display: flex;
					align-items: center;

					image {
						width: 20rpx;
						height: 29rpx;
						margin-right: 15.5rpx;
						margin-left: 4.5rpx;
					}
				}
			}

			.settingBtn {
				width: 50rpx;
				height: 50rpx;
			}
		}

		.mail {
			display: flex;
		}

		.phone {
			display: flex;
		}
	}

	.myFunctionModel {
		display: flex;
		justify-content: space-between;
		margin: -60rpx 20rpx 0;
		border-radius: 40rpx;
		height: 160rpx;
		padding: 20rpx 20rpx;
		background: #FFFFFF;
		border: 2px solid #f0f1f2;

		.content {
			position: relative;
			margin-top: 30rpx;
			text-align: center;
			
			.myFunctionImage {
				width: 60rpx;
				height: 58rpx;
			}
			
			.downImage {
				width: 71.4rpx;
				height: 58rpx;
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
			padding: 30rpx 20rpx;
			margin: 0 30rpx;

			.content {
				position: relative;

				.interactionImage {
					width: 50rpx;
				}

				.interactionText {
					color: #333333;
					font-size: 30rpx;
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
					right: -5rpx;
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
