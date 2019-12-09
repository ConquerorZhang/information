<template>
	<view class="container">
		<view class="contentView" v-html="content">{{content}}</view>
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
	
	export default {
		data() {
			return {
				id: '',
				keyword: '',
				content: '',
				data:{}
			}
		},
		onLoad(option) {
			console.log(option);
			this.id = option.id;
			this.keyword = option.keyword;
			
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
		
		.contentView {
			height: calc(100% - 100rpx);
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
