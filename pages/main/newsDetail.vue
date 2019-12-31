<template>
	<view class="container">
		<uni-nav-bar id="naviBar" left-icon="back" title="动态详情" @clickLeft="back"></uni-nav-bar>

		<scroll-view class="scroll-v" enableBackToTop="true" scroll-y>
			<view class="titleView">
				<view class="title">{{data.title}}</view>
				<view class="timePart">
					<image src="../../static/dynamic/time.png" mode="scaleToFill"></image>
					<text>{{data.createTime}}</text>
				</view>
				<view class="addressPart">
					<image src="../../static/dynamic/location.png" mode="scaleToFill"></image>
					<text>{{data.location}}</text>
				</view>
			</view>
			<view class="contentView" v-html="content">{{content}}</view>
		</scroll-view>
		<view class="bottomView">
			<view class="preViewEmpty" v-if="data.preTitle == null || data.preTitle == ''"></view>
			<view class="preView" v-show="data.preTitle != null && data.preTitle != ''" @click="navigateToNews(data.preId)">
				<text class="label">上一篇:</text>
				<text class="content">{{data.preTitle}}</text>
			</view>
			<view class="nextView" v-show="data.nextTitle != null && data.nextTitle != ''" @click="navigateToNews(data.nextId)">
				<text class="label">下一篇:</text>
				<text class="content">{{data.nextTitle}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	const API = require('../../common/api.js')
	import Vue from 'vue'
	import uniNavBar from "@/components/lib/uni-nav-bar/uni-nav-bar.vue"

	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				id: '',
				keyword: '',
				content: '',
				data: {},
				fromH5: '',
			}
		},
		onLoad(option) {
			this.fromH5 = option.fromH5;
			this.id = option.id;
			this.keyword = Vue.prototype.isEmpty(option.keyword) ? '' : option.keyword;

			API.newsDetail({
				id: this.id,
				title: this.keyword
			}).then(res => {
				console.log(res);
				// console.log(res.data.data);
				this.content = res.data.data.contents;
				this.data = res.data.data;
			}).catch(err => {
				console.log(err);
			})
		},
		methods: {
			navigateToNews(id) {
				this.id = id;
				API.newsDetail({
					id: this.id,
					title: this.keyword
				}).then(res => {
					this.content = res.data.data.contents;
					this.data = res.data.data;
				}).catch(err => {
					console.log(err);
				})
			},
			back() {
				console.log(this.fromH5);
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
		height: 100%;
		background: #FFFFFF;
	}

	.container {
		width: 100%;
		height: 100%;

		.scroll-v {
			flex: 1;
			width: 750upx;
			height: calc(100% - 190rpx);
			flex-direction: column;
			
			.titleView {
				padding: 20rpx;
				margin-bottom: 20rpx;
				border-bottom: 1px solid #f1f2f3;
				
				.title {
					font-size: 40rpx;
					font-weight: 500;
				}
				.timePart {
					align-items: center;
					display: flex;
					margin-top: 10rpx;
					
					color: #9b9c9d;
					font-size: 30rpx;
					image {
						width: 30rpx;
						height: 30rpx;
						margin-right: 5rpx;
					}
				}
				.addressPart {
					align-items: center;
					display: flex;
					margin-top: 10rpx;
					
					color: #9b9c9d;
					font-size: 30rpx;
					image {
						width: 28rpx;
						height: 32rpx;
						margin-right: 5rpx;
					}
				}
			}

			// .contentView {
			// 	height: calc(100% - 200rpx);
			// }
		}

		.bottomView {
			display: flex;
			position: fixed;
			bottom: 0;
			height: 100rpx;
			width: 750rpx;
			line-height: 100rpx;
			border-top: 1px solid #CCCCCC;
			background: #FFFFFF;

			.preViewEmpty {
				width: 330rpx;
			}

			.preView {
				margin-left: 10rpx;
				width: 320rpx;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;

				.label {
					color: #757677;
				}
			}

			.nextView {
				margin-right: 10rpx;
				margin-left: 90rpx;
				width: 320rpx;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;

				.label {
					color: #757677;
				}
			}
		}
	}
</style>
