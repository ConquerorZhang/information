<template>
	<view class="container">
		<image class="successImage" src="../../static/interaction/publishSucceed.png" mode="widthFix"></image>
		<view class="title">发布成功</view>
		<view class="subTitle">您的问题大家都能看到</view>
		<view class="checkBtn" @click="checkMyPublish">查看我发布的</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:''
			}
		},
		onLoad(option) {
			this.id = option.id;
		},
		onShow() {
			this.callHandler('ObjC Echo', {
				'key': 'inner'
			});
		},
		onBackPress(){
			uni.$emit('interation$publishback',{'result':'success'})
		},
		methods: {
			checkMyPublish() {
				uni.navigateTo({
					url: "interactionDetail?item="+encodeURIComponent(JSON.stringify({'id':this.id}))
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		text-align: center;

		.successImage {
			padding: 200rpx 50rpx 25rpx;
			width: 260rpx;
		}
		.title {
			font-size: 56rpx;
			color: #666666;
		}
		.subTitle {
			color: #B3B3B3;
			font: 36rpx;
			margin: 30rpx 50rpx 75rpx;
		}
		.checkBtn {
			color: #FFFFFF;
			background: linear-gradient(to right,#D74819,#C7161E);
			font-size: 36rpx;
			border-radius: 40rpx;
			margin: 0 220rpx;
			padding: 15rpx 32rpx;
		}
	}
</style>
