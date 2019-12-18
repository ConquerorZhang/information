<template>
	<view class="learnPart">
		<view class="topPart">
			<view class="titlePart">
				<image :src="data.image" mode="scaleToFill"></image>
				<view class="title">{{data.docName}}</view>
			</view>
			<image class="downLoadImage" src="../../static/docs/down.png" mode="scaleToFill"></image>
		</view>
		<view class="bottomPart">
			<text class="time">{{data.createTime}}</text>
			<text class="number">下载量{{data.downloadCount}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "downLoadCell",
		props: {
			data: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.topPart {
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
		border-bottom: 0.5px solid #edeeef;

		.titlePart {
			display: flex;

			image {
				width: 100rpx;
				height: 100rpx;
				margin-right: 20rpx;
				background: #C8C7CC;
			}

			.title {
				line-height: 100rpx;
			}
		}

		image {
			width: 40rpx;
			height: 50rpx;
			align-self: center;
			margin-right: 20rpx;
		}
	}

	.bottomPart {
		margin: 0 20rpx;
		color: #616263;
		font-size: 30rpx;
		display: flex;
		justify-content: space-between;
		height: 70rpx;
		line-height: 70rpx;

		.time {}

		.number {}
	}
</style>
