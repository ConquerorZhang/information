<template>
	<view class="container">
		<view class="top">
			<view class="statusBar" v-bind:style="{height:parseFloat(statusBarHeight)+'rpx'}"></view>
			<!-- 自定义导航 -->
			<view class="navBar">
				<view class="left-icon" @click="back">
					<uni-icons background-color="#FFFFFF" color="#333333" type="arrowleft" size="24" />
				</view>
				<view class="content">
					<view class="navBar-title">发布问题</view>
				</view>
				<view class="rightcontent" @click="onNavigationBarButton">
					<view class="rightText">发布</view>
				</view>
			</view>
		</view>
		<input class="title" type="text" v-model="titleText" placeholder="添加标题会有更多人看呦～" maxlength="50" v-bind:style="{'margin-top':(parseFloat(statusBarHeight)+60) +'rpx'}"/>
		<view class="lineView"></view>
		<view class="contentView">
			<textarea class="content" type="text" v-model="contentText" placeholder="说点什么好呢,用心分享会得到更多互动哦" />
			</view>
		<view class="uni-uploader__files">
			<block v-for="(image,index) in imageList" :key="index">
				<view class="uni-uploader__file" style="position: relative;">
					<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
                    <view class="close-view" @click="close(index)">x</view>
				</view>
			</block>
			<view class="uni-uploader__input-box" v-if="imageList.length < 6" @tap="chooseImage">
				<view class="uni-uploader__text">添加图片</view>
			</view>
		</view>
		<view class="typeModel">
			<view v-for="(item,index) in typeList" :key="index">
				<view :class="selectedIndex == index ? 'selectBtn' : 'unSelectBtn'" @click="chooseBtn(index)">{{item}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	const API = require('../../common/api.js')
	const CONFIG = require('../../common/config.js')
	import Vue from 'vue';
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	export default {
		data() {
			return {
				statusBarHeight: 0,
				titleText:"",
				contentText:"",
				imageList:[],
				submitImageIdList:[],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 5,
				count: [1, 2, 3, 4, 5, 6],
				typeList:["业务咨询区","需求咨询区","经验分享区"],
				selectedIndex:'-1',
			}
		},
		onLoad() {
			switch (uni.getSystemInfoSync().platform) {
				case 'android':
					this.statusBarHeight = Vue.config.configDic.statusBarHeight-20;
					break;
				case 'ios':
					this.statusBarHeight = Vue.config.configDic.statusBarHeight-40;
					break;
				default:
					console.log('运行在开发者工具上')
					break;
			}
		},
		onShow() {
			this.callHandler('ObjC Echo',{
				'key': 'innerSelf'
			});
			setTimeout(()=>{
				this.callHandler('ObjC Echo',{
					'key': 'innerSelf'
				});
			},1000)
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			onNavigationBarButton() {
				console.log(this.submitImageIdList);
				
				uni.showModal({
					content: '确认发布吗？',
					success: (res) => {
						if (res.confirm) {
							API.interPublish({
								title: this.titleText,
								contents: this.contentText,
								pics: this.submitImageIdList,
								type: parseInt(this.selectedIndex) + 1,
							}).then(res => {
								console.log(res);
								uni.redirectTo({
									url:"publishSucceed?id=" + res.data.data.id
								})
							}).catch(err => {
								console.log(err);
							})
						}
					}
				})
			},
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			close(e){
			    this.imageList.splice(e,1);
				this.submitImageIdList.splice(e,1);
			},
			chooseImage: async function() {
				// #ifdef APP-PLUS
				// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
				if (this.sourceTypeIndex !== 2) {
					let status = await this.checkPermission();
					if (status !== 1) {
						return;
					}
				}
				// #endif
			
				if (this.imageList.length === 6) {
					let isContinue = await this.isFullImg();
					console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				// 图片服务器地址
				let imageURL;
				if (process.env.NODE_ENV === 'development') {
					// console.log(' 开发环境')
					imageURL = CONFIG.offlineImageURL;
				} else {
					// console.log('生产环境')
					imageURL = CONFIG.onlineImageURL;
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageList.length + this.count[this.countIndex] > 6 ? 6 - this.imageList.length : this.count[this.countIndex],
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;
						// console.log(res);
						// 上传图片操作
						for (var i = 0; i < tempFilePaths.length; i++) {
							// console.log(tempFilePaths);
							uni.showLoading({
								title:'正在上传图片'
							})
							var num = 0;
							uni.uploadFile({
							            url: imageURL, 
							            filePath: tempFilePaths[i],
							            name: 'file',
							            formData: {
							                'image': 'publishImage'
							            },
							            success: (uploadFileRes) => {
											uni.hideLoading();
											// 展示图片的数组
											this.imageList.push(tempFilePaths[num++]);
											
											// 图片id数组
											var obj = JSON.parse(uploadFileRes.data);
											this.submitImageIdList.push(obj.data.fileid);
											
											if (this.imageList.length > 6) {
												this.imageList = this.imageList.splice(0,6);
												this.submitImageIdList = this.submitImageIdList.splice(0,6);
											}
							            },
										fail:() => {
											uni.hideLoading();
											uni.showToast({
												title:"上传图片失败",
												icon:'none'
											})
										}
							        });
						}
					},
					fail: (err) => {
						// #ifdef APP-PLUS
						if (err['code'] && err.code !== 0 && this.sourceTypeIndex === 2) {
							this.checkPermission(err.code);
						}
						// #endif
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = false;
								switch (this.sourceTypeIndex) {
									case 0:
										authStatus = res.authSetting['scope.camera'];
										break;
									case 1:
										authStatus = res.authSetting['scope.album'];
										break;
									case 2:
										authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
										break;
									default:
										break;
								}
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要从您的相机或相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
			},
			isFullImg: function() {
				return new Promise((res) => {
					uni.showModal({
						content: "已经有6张图片了,是否清空现有图片？",
						success: (e) => {
							if (e.confirm) {
								this.imageList = [];
								res(true);
							} else {
								res(false)
							}
						},
						fail: () => {
							res(false)
						}
					})
				})
			},
			async checkPermission(code) {
				let type = code ? code - 1 : this.sourceTypeIndex;
				let status = permision.isIOS ? await permision.requestIOS(sourceType[type][0]) :
					await permision.requestAndroid(type === 0 ? 'android.permission.CAMERA' :
						'android.permission.READ_EXTERNAL_STORAGE');
			
				if (status === null || status === 1) {
					status = 1;
				} else {
					uni.showModal({
						content: "没有开启权限",
						confirmText: "设置",
						success: function(res) {
							if (res.confirm) {
								permision.gotoAppSetting();
							}
						}
					})
				}
			
				return status;
			},
			chooseBtn(index) {
				this.selectedIndex = index;
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
	}
	.container {
		padding: 20rpx 10rpx 0;
		
		.top {
			position: fixed;
			top: 0rpx;
			width: 100%;
			z-index: 500;
			
			.statusBar {
				// height: $uni-status-height; //这里是无效的，不知为何  var(--status-bar-height)
				background: #FFFFFF;
				width: 100%;
			}
		
			.navBar {
				width: 100%;
				height: 60rpx;
				display: flex;
				flex-direction: row;
				background-color: #FFFFFF;
		
				.left-icon {
					display: flex;
					height: 100%;
					width: 60rpx;
					padding: 0 10px;
					align-items: center;
				}
		
				.content {
					width: 100%;
					height: 100%;
					// border: 1px solid #1AAD19;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
		
					.navBar-title {
						font-size: 33upx;
						font-weight: bold;
		
					}
				}
				
				.rightcontent{
					width: 20%;
					height: 100%;
					display: flex;
					
					.rightText{
				
						color: #EB5248;
						font-size: 30rpx;
						padding: 10rpx 10rpx;
						
					}
				}
				
			}
		}
		
		
		
		.title {
			font-size: 40rpx;
			font-weight: 600;
		}
		.lineView {
			margin: 20rpx 0;
			border-bottom: 0.5rpx solid #C0C0C0;
		}
		.contentView {
			width:100%;
			
			textarea {
				width: 100%;
				font-size:35rpx;
				height:300upx;
				margin-bottom: 20rpx;
			}
		}
		
		.uni-uploader__files {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			.uni-uploader__file {
				margin: 10upx;
				width: 210upx;
				height: 210upx;
				.uni-uploader__img {
					display: block;
					width: 210upx;
					height: 210upx;
					padding-bottom: 20rpx;
					padding-right: 20rpx;
				}
				.close-view{
					text-align: center;
					line-height:14px;
					height: 16px;
					width: 16px;
					border-radius: 50%;
					background: #FF5053;
					color: #FFFFFF;
					position: absolute;
					top: -6px;
					right: -4px;
					font-size: 12px;
				}
			} 
		}
		.uni-uploader__input-box {
			display: inline-block;
			position: relative;
			margin:10upx;
			width: 208upx;
			height: 208upx;
			border: 2upx solid #D9D9D9;
		}
		.uni-uploader__input-box:before,
		.uni-uploader__input-box:after {
			content: " ";
			position: absolute;
			top: 40%;
			left: 50%;
			-webkit-transform: translate(-50%, -50%);
			transform: translate(-50%, -50%);
			background-color: #D9D9D9;
		}
		.uni-uploader__input-box:before {
			width: 4upx;
			height: 79upx;
		}
		.uni-uploader__input-box:after {
			width: 79upx;
			height: 4upx;
		}
		.uni-uploader__input-box:active {
			border-color: #999999;
		}
		.uni-uploader__input-box:active:before,
		.uni-uploader__input-box:active:after {
			background-color: #999999;
		}
		.uni-uploader__text {
			position: absolute;
			text-align: center;
			color: #999999;
			z-index: 1;
			top: 70%;
			left: 0;
			width: 100%;
		}
		
		.typeModel {
			display: flex;
			justify-content: space-between;
			margin: 50rpx 20rpx;
			font-size: 32rpx;
			.unSelectBtn {
				color: #808080;
				border-radius: 40rpx;
				background: #F1F1F1;
				padding: 10rpx 30rpx;
			}
			.selectBtn {
				color: #FFFFFF;
				border-radius: 40rpx;
				background: linear-gradient(to right,#D74819,#C7161E);
				padding: 10rpx 30rpx;
			}
		}
	}
</style>
