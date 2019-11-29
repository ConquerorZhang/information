<template>
	<view class="page">
		<view class="item">
			<view class="item-top">
				<image class="icon_head circleicon" mode="aspectFill" src="../../static/logo.png"></image>
				<view class="info">
					<text class="item-text name">吕飞飞吕飞飞吕</text>
					<view class="info-bottom">
						<text class="item-text time">11-26</text>
						<text class="item-text number">350浏览</text>
					</view>
				</view>
				<view class="item-top-collect" @click="collect">
					<image class="collect-icon" mode="aspectFit" src="../../static/sc_sec.png"></image>
					<text class="collect-text">收藏</text>
				</view>
			</view>
			<text class="item-text title">文章标题</text>
			<text class="item-text brief">文章简介简短的简介哦放假奥</text>
			<view class="item-image">
				<image class="item-image-image" mode="aspectFit" src="../../static/logo.png"></image>
				<image class="item-image-image" mode="aspectFit" src="../../static/logo.png"></image>
				<image class="item-image-image" mode="aspectFit" src="../../static/logo.png"></image>
			</view>
			<!-- 底部 -->
			<view class="bottom">
				<view class="bottom-left">
					<image class="bottom-icon-left" mode="aspectFit" src="../../static/zan_sec.png"></image>
					<text class="bottom-text">520</text>
				</view>
				<view class="bottom-right">
					<image class="bottom-icon-right" mode="aspectFit" src="../../static/message_black.png"></image>
					<text class="bottom-text">520</text>
				</view>
			</view>
		</view>

		<!-- 插屏弹窗 -->
		<uni-popup :show="showimage" :type="type" :mask-click="true" @change="change">
			<view class="uni-image">
				<view class="pop_view">
					<image class="image popcontent" src="/static/collection_success.png" mode="scaleToFill" />
					<text class="pop-view-success popcontent">收藏成功</text>
					<text class="pop-view-success-text popcontent">通过我的收藏里进行查看</text>
					<text class="pop_bt popcontent">立即查看</text>
				</view>


				<view class="uni-image-close" @click="cancel('image')">
					<uni-icons type="clear" color="#fff" size="30" />
				</view>
			</view>
		</uni-popup>
	</view>



</template>

<script>
	import uniPopup from '@/components/lib/uni-popup/uni-popup.vue';
	import uniIcons from '@/components/lib/uni-icons/uni-icons.vue'
	export default {
		components: {
			uniPopup,
			uniIcons
		},
		data() {
			return {
				statusBarH: this.statusBar,
				customBarH: this.customBar,
				showimage: false,
				type: '',
				content: '顶部弹 popup',
			}
		},
		props: {

		},
		computed: {

		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			collect() {
				console.log("收藏成功");
				this.togglePopup('center', 'image');
			},
			togglePopup(type, open) {
				this.type = type
				this['show' + open] = true
			},
			cancel(type) {
				this['show' + type] = false
			},
			change(e) {
				console.log('是否打开:' + e.show)
				if (!e.show) {
					this.showimage = false
				}
			}
		}
	}
</script>

<style lang="scss">
	/* 插屏广告 */
	.uni-image {
		position: relative;
		z-index: 9999;
	}

	.pop_view {
		display: flex;
		flex-direction: column;

		.popcontent {
			width: 280px;
			background-color: #FFFFFF;
		}

		.image {
			width: 280px;
			height: 125px;
			background: #007AFF;
		}

		.pop-view-success {
			display: flex;
			height: 80px;
			color: #C7161E;
			font: 28px;
			font-weight: bold;
			justify-content: center;
			align-items: center;

		}

		.pop-view-success-text {
			display: flex;
			color: #666666;
			font: 19px;
			justify-content: center;
			align-items: center;
		}

		.pop_bt {
			display: flex;
			color: #666666;
			font: 19px;
			padding: 10px 0 15px 0;
			justify-content: center;
			align-items: center;
		}
	}


	.uni-image-close {
		margin-top: 20px;
		text-align: center;
	}

	.page {


		.item {
			background: #FFFFFF;

			.item-text {
				display: block;
			}

			.item-top {
				display: flex;
				flex-wrap: nowrap;
				align-items: center;

				.icon_head {
					width: 50rpx;
					height: 50rpx;
					margin-left: 15rpx;
					padding: $uni-spacing-row-base $uni-spacing-row-base;
				}

				.circleicon {
					border-radius: 30px;
					padding: 15rpx;
					width: 50rpx;
					height: 50rpx;
					background: url("../../static/logo.png") no-repeat center;
					background-size: 50px;
				}

				.info {
					display: flex;
					padding: 15rpx 10rpx;
					flex-direction: column;
					flex-grow: 10;
					.info-bottom {
						display: flex;
						flex-direction: row;
						.number {
							margin-left: 20rpx;
						}
					}
					.name {
						color: #585858;
						font-size: 20upx;
					}

					.time,
					.number {
						color: #8D8D8D;
						font-size: 15upx;
					}
				}

				.item-top-collect {
					display: flex;
					border: 1px solid #D74819;
					border-radius: 30upx;
					width: 120upx;
					height: 40upx;
					align-items: center;
					justify-content: center;
					margin-right: 20upx;

					.collect-icon {
						width: 30upx;
						height: 30upx;
						margin-right: 5upx;
					}

					.collect-text {
						font-size: 25upx;
						color: #D74819;
						margin-left: 5upx;
					}
				}
			}

			.title,
			.brief {
				margin: 0 20rpx;
				line-height: 1.6em;
				display: -webkit-box;
				/** 对象作为伸缩盒子模型显示 **/
				-webkit-line-clamp: 5;
				overflow: hidden;
				text-overflow: ellipsis;
				-webkit-box-orient: vertical;
			}

			.title {
				color: #282828;
				font-size: 27upx;
			}

			.brief {
				color: #525252;
				font-size: 20upx;
			}

			.item-image {

				display: flex;
				flex-direction: row;

				.item-image-image {
					margin: 0 20rpx;
					width: 30%;
					height: 200rpx;
				}
			}

			.bottom {
				display: flex;
				justify-content: flex-end;


				.bottom-right {
					display: flex;
					flex-direction: row;
					align-items: center;
					margin: 0 20rpx 20rpx 0;
				}

				.bottom-left {
					display: flex;
					flex-direction: row;
					align-items: center;
					margin: 0 5rpx 20rpx 0;
				}

				.bottom-icon-left,
				.bottom-icon-right {
					width: 25rpx;
					height: 25rpx;
					padding: $uni-spacing-row-base $uni-spacing-row-base;
				}

				.bottom-text {
					font-size: 20upx;
					color: #525252;
				}

			}
		}
	}
</style>
