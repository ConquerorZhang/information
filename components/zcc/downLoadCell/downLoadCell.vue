<template>
	<view class="learnPart" @click="openFile(data.docName)">
		<view class="topPart">
			<view class="titlePart">
				<image :src="data.doctypeImageUrl" mode="scaleToFill"></image>
				<view class="title">{{data.docName}}</view>
			</view>
			<image v-if="progress == ''" class="downLoadImage" src="../../static/docs/down.png" mode="scaleToFill" @click.stop="downLoad(data.fullDocUrl)"></image>
			<view v-else class="progressView">{{progress.length > 3 ? '完成' : progress}}</view>
		</view>
		<view class="bottomPart">
			<text class="time">{{data.createTime}}</text>
			<text class="number">下载量{{data.downloadCount}}</text>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'

	export default {
		name: "downLoadCell",
		props: {
			data: {
				type: Object,
				default: {}
			},
		},
		data() {
			return {
				progress:''
			}
		},
		methods: {
			downLoad(url) {
				var that = this;
				this.callHandlerBack("native_download", {
				     'downloadUrl': this.data.fullDocUrl,'contentDisposition':'文件描述','mimeType':'','fileId':this.data.id,'filename':this.data.docName
				    },function(responseData) {
						that.reFreshProgress(responseData)//更新值用
						this.progress = responseData;//有一句话就行，不知原因
				   })
			},
			openFile(fileName) {
				this.callHandlerBack("native_fileOpen",  {filename:fileName}, function(responseData) {
				    //注意第一次回调问题
				    if(responseData == 0 || responseData == "0"){
				        // uni.showToast({
				        //     icon:"none",
				        //     title:"文件不存在!"
				        // })
				        return;  
				    }
				})
			},
			reFreshProgress (progress) {
				this.progress = progress;
			}
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
				// background: #C8C7CC;
			}

			.title {
				// line-height: 100rpx;
				width: 500rpx;
			}
		}
		
		.progressView {
			color: #737576;
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
