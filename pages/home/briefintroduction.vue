<template>
	<view class="content">
		<view class="top">
			<view class="statusBar"></view>
			<!-- 自定义导航 -->
			<view class="navBar">
				<view class="left-icon" @click="back">
					<uni-icons color="#ffffff" type="arrowleft" size="24" />
				</view>
				<view class="title">
					信息化平台简介
				</view>
			</view>
		</view>
		<view class="contentView" v-bind:style="{'margin-top':(systeminfo.statusBarHeight+135) +'rpx'}" v-html="content"></view>
	</view>
</template>

<script>
	const API = require('../../common/api.js')
	export default {
		data() {
			return {
				systeminfo:'',
				id: '',
				content: '',
				fromH5:''
			};
		},
		onLoad(option) {
			this.fromH5 = option.fromH5;
			console.log("----------------------onload");
			API.PlateformBriefIntroduction({
				id:'1'
			}).then(res => {
				console.log(res);
				this.content = res.data.data.contents;
			}).catch(err => {
				console.log(err);
			})
		},
		
		onShow() {
			// this.systeminfo = getApp().globalData.systemInfo;
			uni.getSystemInfo({
				success: (res) => {
					this.systeminfo = res
				}
			})
		},
		
		methods: {
			back() {
				if (this.fromH5 == '1') {
					uni.navigateBack({
						delta: 1
					})
				} else {
					this.callHandler('ObjC Echo', {
						'key': 'close'
					});
				}

			}
		}

	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background: linear-gradient(left, #D74819, #C7161E);
	}

	.content {

		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;

		.top {
			position: fixed;
			top: 0;
			width: 100%;
			z-index: 500;
			display: flex;
			flex-direction: column;

			.statusBar {
				height: $uni-status-height;
				width: 100%;
				background-image: linear-gradient(left, #D74819, #C7161E);
			}

			.navBar {
				width: 100%;
				height: 80upx;
				display: flex;
				flex-direction: row;
				background-image: linear-gradient(left, #D74819, #C7161E);

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
					// border: 1px solid #1AAD19;
					display: flex;
					flex-direction: row;
					margin-right: 50upx;
					justify-content: center;
					align-items: center;
					color: #FFFFFF;

				}
			}
		}

		.contentView {
			height: 100%;
			margin: 85rpx 15rpx 15rpx 15rpx;
		}
	}
</style>
