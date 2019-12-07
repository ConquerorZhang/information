<template>
	<view class="content">
		<view :style="{ height: iStatusBarHeight + 'px'}"></view>
		<view @click="collect"> 状态栏下的文字 </view>
		<!-- 插屏弹窗 -->
		<uni-popup class="popopopopopop" :show="showimage" :type="type" :mask-click="true" @change="change">
			<view class="uni-image">
				<image class="image" src="/static/logo.png" mode="scaleToFill" />
				<view class="uni-image-close" @click="cancel('image')">
					<uni-icons type="clear" color="#fff" size="30" />
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/lib/uni-popup/uni-popup.vue';
	export default {
		components:{
			uniPopup
		},
		data() {
			return {
				iStatusBarHeight: 0,
				title: 'hello',
				showimage: false,
				type: '',
				content: '顶部弹 popup',
			}
		},
		onLoad() {
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
			console.log(this.iStatusBarHeight)
		},
		methods: {
			collect() {
				console.log("收藏成功");
				this.togglePopup('center', 'image');
			},
togglePopup(type, open) {
				console.log(type)
			// 	switch (type) {
			// 		case 'top':
			// 			this.content = '顶部弹出 popup'
			// 			break
			
			// 		case 'bottom':
			// 			this.content = '底部弹出 popup'
			// 			break
			// 		case 'center':
			// 			this.content = '居中弹出 popup'
			// 			break
			// 	}
				this.type = type
				this['show' + open] = true
			},
			cancel(type) {
				this['show' + type] = false
			},
			change(e) {
				console.log('是否打开:' + e.show)
				if (!e.show) {
					this.showpopup = false
					this.showtip = false
					this.showimage = false
					this.showshare = false
				}
			}
		}
	}
</script>

<style>
	
	/* 插屏广告 */
	.uni-image {
		position: relative;
		z-index: 9999;
	}
	
	.image {
		width: 200px;
		height: 200px;
		background: #007AFF;
	}
	
	.uni-image-close {
		margin-top: 20px;
		text-align: center;
	}
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
