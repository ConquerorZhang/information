<template>
	<view class="content">
		<view :style="{ height: iStatusBarHeight + 'px'}"></view>
		<view> 状态栏下的文字 </view>
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<uni-list>
			<uni-list-item title="" note=""></uni-list-item>
			<uni-list-item title="" note=""></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				iStatusBarHeight: 0,
				title: 'hello'
			}
		},
		onLoad() {
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
			this.iStatusBarHeight = 25;
			console.log(this.iStatusBarHeight)
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
