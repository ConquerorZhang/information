<template>
	<view class="container">
		<uni-nav-bar id="naviBar" left-icon="back" title="我的消息" @clickLeft="back"></uni-nav-bar>
		<view class="empty" v-if="dataList.length < 1">
			<image class="emptyImage" src="../../static/interaction/commentEmpty.png" mode="widthFix"></image>
			<view class="emptyText">暂无消息</view>
		</view>
		<scroll-view v-else class="scroll-v" enableBackToTop="true" scroll-y @scrolltolower="loadMore()">
			<view class="message" v-for="(item,index) in dataList" :key="index" v-on:click="navigateToDetail(item.id,index)">
				<view class="titleRow">
					<text class="title">{{item.title}}</text>
					<text :class="item.isRead == 1 ? 'read' : 'unread'">{{item.isRead == 1 ? "已读" : "未读"}}</text>
				</view>
				<image class="pic" v-if="item.imgUrl != null && item.imgUrl != ''" :src="item.imgUrl" mode="widthFix"></image>
				<view class="subTitle">{{item.remark}}</view>
				<view class="time">{{item.createTime}}</view>
			</view>

			<view class="loading-more" v-if="currentList.length >= this.pageLimit" v-on:click="loadMore()">
				<text class="loading-more-text">加载更多数据</text>
			</view>
			<view class="loading-more" v-else>
				<text class="loading-more-text">没有更多数据了</text>
			</view>
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
				dataList: [],
				currentList: [],
				pageIndex: 1,
				pageLimit: 10,
				canLoad: true,
				fromH5: '',
			}
		},
		onLoad(option) {
			this.fromH5 = option.fromH5;
			this.getList();
		},
		methods: {
			navigateToDetail(e, index) {
				uni.navigateTo({
					url: "MessageDetail?id=" + e + '&fromH5=1'
				})

				// 将已读置成未读
				console.log(index);
				this.dataList[index].isRead = 1;
			},

			getList() {
				if (!this.canLoad) {
					return;
				}

				API.myMessageList({
					limit: this.pageLimit,
					page: this.pageIndex,
				}).then(res => {
					console.log(res);
					this.pageIndex++;
					this.currentList = res.data.data;
					this.dataList = this.dataList.concat(this.currentList);

					// scrollView上拉不加载标志
					this.canLoad = this.currentList.length > 0 ? true : false;
				}).catch(err => {
					console.log(err);
				})
			},
			loadMore(e) {
				setTimeout(() => {
					this.getList();
				}, 500)
			},
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

		.empty {
			text-align: center;

			.emptyImage {
				margin-top: 300rpx;
				width: 500rpx;
			}

			.emptyText {
				color: #969798;
			}
		}

		.scroll-v {
			height: calc(100% - 100rpx);

			.message {
				margin: 20rpx 20rpx 20rpx;
				padding: 20rpx 30rpx;
				border-radius: 40rpx;
				background: #FFFFFF;

				.titleRow {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.title {
						width: 90%;
						font-size: 40rpx;
					}

					.read {
						width: 10%;
						font-size: 30rpx;
						color: #999999;
					}

					.unread {
						width: 10%;
						font-size: 30rpx;
						color: #ee3847;
					}
				}

				.pic {
					border-radius: 10rpx;
					margin-top: 10rpx;
				}

				.subTitle {
					font-size: 30rpx;
					color: #999999;
					margin: 10rpx 0;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}

				.time {
					font-size: 30rpx;
					color: #999999;
				}
			}

			.loading-more {
				align-items: center;
				justify-content: center;
				padding-top: 10px;
				padding-bottom: 10px;
				text-align: center;
			}

			.loading-more-text {
				font-size: 28upx;
				color: #999;
			}
		}
	}
</style>
