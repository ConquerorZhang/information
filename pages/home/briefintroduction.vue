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
		<view class="contentView" v-bind:style="{'margin-top':(systeminfo.statusBarHeight+85) +'rpx'}" v-html="content"></view>
	</view>
</template>

<script>
	const API = require('../../common/api.js')
	export default {
		data() {
			return {
				systeminfo:'',
				id: '',
				content: '信息化云平台简介按合法is饭卡上季啊看手机发卡机是咖啡机按时间放假啊看手机付款了基拉是积分开奖奥斯卡发接口基拉是积分开奖奥斯卡了发接口季啊及时反馈静安寺咖啡机卡j发的富士达发顺丰发是的发顺丰三',
			};
		},
		onLoad() {
			this.id = option.id
			this.systeminfo = getApp().globalData.systemInfo;
			API.myMessageDetail({
				id: this.id,
			}).then(res => {
				console.log(res);
				this.content = res.data.data.contents;
			}).catch(err => {
				console.log(err);
			})
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1,
				})

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
				height: var(--status-bar-height);
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
