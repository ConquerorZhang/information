<template>
	<view class="detailPart" v-on:click="navigateToProduct(data.id)">
		<image class="imagePart" :src="data.fullImgUrl" mode="scaleToFill"></image>
		<view class="textPart">
			<view class="title">{{data.productName}}</view>
			<view class="subTitle">{{data.shortDesc}}</view>
			<view class="time">{{data.createTime}}</view>
		</view>
		<view class="look">查看</view>
	</view>
</template>

<script>
	export default {
		name: "productCell",
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
			navigateToProduct(e) {
				console.log(e);
				uni.navigateTo({
					url:'../../pages/product/product?productId='+e
				})
			},
		}
	}
</script>

<style lang="scss">
.detailPart {
			display: flex;
			background: #FFFFFF;
			border-radius: 30rpx;
			width: 710rpx;

			.imagePart {
				margin: 30rpx 20rpx;
				width: 200rpx;
				height: 170rpx;
				background: #C8C7CC;
			}

			.textPart {
				margin-top: 25rpx;
				width: 390rpx;

				.title {
					color: #3f4041;
					font-size: $uni-font-size-lg;
				}

				.subTitle {
					font-size: $uni-font-size-base;
					color: #6b6c6d;
					height: 80rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}

				.time {
					color: #8f9091;
				}
			}

			.look {
				align-self: flex-end;
				margin-bottom: 35rpx;
				color: #9fa0a1;
				font-size: 30rpx;
				white-space: nowrap;
			}
		}
</style>
