<template>
	<view class="container">
		<view class="message" v-for="(item,index) in dataList" :key="index">
			<view class="titleRow">
				<text class="title">{{item.title}}</text>
				<text :class="item.state == 1 ? 'read' : 'unread'">{{item.state == 1 ? "已读" : "未读"}}</text>
			</view>
			<image v-if="item.image.length > 0" :src="item.image" mode="widthFix"></image>
			<view class="subTitle">{{item.subtitle}}</view>
			<view class="time">{{item.time}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [{
					title: "叫姐姐斤斤计较斤斤计较",
					subtitle: "哈哈哈后hi哦吼吼交流交流了解了哈哈哈后hi哦吼吼交流交流了解了哈哈哈后hi哦吼吼交流交流了解了哈哈哈后hi哦吼吼交流交流了解了哈哈哈后hi哦吼吼交流交流了解了哈哈哈后hi哦吼吼交流交流了解了",
					state: '1',
					image: '',
					time: '2019-11-22'
				}, {
					title: "叫姐姐斤斤计较斤斤计较",
					subtitle: "哈哈哈后hi哦吼吼交流交流了解了",
					state: '0',
					image: '',
					time: '2019-11-22'
				}]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.container {
		height: 100%;
		background: #F1F1F1;
		padding-top: 20rpx;

		.message {
			margin: 0 20rpx 20rpx;
			padding: 20rpx 30rpx;
			border-radius: 40rpx;
			background: #FFFFFF;

			.titleRow {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.title {
					font-size: 40rpx;
				}

				.read {
					font-size: 30rpx;
					color: #999999;
				}

				.unread {
					font-size: 30rpx;
					color: #ee3847;
				}
			}

			.subTitle {
				font-size: 30rpx;
				color: #999999;
				padding: 20rpx 0;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				max-height: 70rpx;
			}

			.time {
				font-size: 30rpx;
				color: #999999;
			}
		}
	}
</style>
