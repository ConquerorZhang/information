<template>
	<view class="container">
		<uni-nav-bar id="naviBar" left-icon="back" title="消息详情" @clickLeft="back"></uni-nav-bar>
		<scroll-view class="scroll-v" enableBackToTop="true" scroll-y>
			<view class="contentView" v-html="content"></view>
		</scroll-view>
	</view>
</template>

<script>
	const API = require('../../common/api.js')
	import uniNavBar from "@/components/lib/uni-nav-bar/uni-nav-bar.vue"

	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				id: '',
				content: '',
				fromH5: '',
			}
		},
		onLoad: function(option) {
			this.id = option.id
			this.fromH5 = option.fromH5;

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
				if (this.fromH5 == '1') {
					uni.navigateBack({
						delta: 1
					})
				} else {
					this.callHandler('ObjC Echo', {
						'key': 'back'
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F1F1F1;
		height: 100%;
	}

	.container {
		position: relative;
		height: 100%;

		.scroll-v {
			flex: 1;
			width: 750upx;
			height: calc(100% - 100rpx);
			flex-direction: column;
		
			.contentView {
				height: 100%;
			}
		}
	}
</style>
