<template>
	<view class="container">
		<uni-nav-bar id="naviBar" left-icon="back" title="电科动态" @clickLeft="back"></uni-nav-bar>
		<view class="searchFilterContainer">
			<uni-search-bar class="searchBar" placeholder="关键字搜索" radius="80" @confirm="search" @input="input" @cancel="cancel"></uni-search-bar>
		</view>
		<scroll-view class="scroll-v" enableBackToTop="true" scroll-y @scrolltolower="loadMore()">
			<view class="empty" v-if="newsList.length < 1">
				<image class="emptyImage" src="../../static/interaction/commentEmpty.png" mode="widthFix"></image>
				<view class="emptyText">没有找到相关动态～</view>
			</view>
			<view class="newsPart" v-for="(item,index) in newsList" :key="index" v-on:click="goDetail(item)">
				<view class="textPart">
					<view class="title">
						<text>{{item.title}}</text>
					</view>
					<view class="timePart">
						<text class="time">{{item.createTime}}</text>
						<text class="address">{{item.location}}</text>
					</view>
				</view>
				<image :src="item.imgUrl" mode="scaleToFill"></image>
			</view>

			<view class="loading-more" v-if="currentNewsList.length >= this.pageLimit" v-on:click="loadMore()">
				<text class="loading-more-text">加载更多数据</text>
			</view>
			<view class="loading-more" v-else-if="newsList.length > 0">
				<text class="loading-more-text">没有更多数据了</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	const API = require('../../common/api.js')
	var util = require('../../common/bridge.js');
	import uniNavBar from "@/components/lib/uni-nav-bar/uni-nav-bar.vue"

	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				newsList: [],
				currentNewsList: [],
				refreshText: "",
				keyword: "",
				pageIndex: 1,
				pageLimit: 10,
				canLoad: true,
				fromOrigin: '',
			}
		},
		onLoad(option) {
			this.fromOrigin = option.fromOrigin;
			this.getList();
		},
		methods: {
			getList() {
				if (!this.canLoad) {
					return;
				}

				API.newsList({
					title: this.keyword,
					limit: this.pageLimit,
					page: this.pageIndex,
				}).then(res => {
					console.log(res);
					this.pageIndex++;
					this.currentNewsList = res.data.data;
					this.newsList = this.newsList.concat(this.currentNewsList);

					// scrollView上拉不加载标志
					this.canLoad = this.currentNewsList.length > 0 ? true : false;
				}).catch(err => {
					console.log(err);
				})
			},
			goDetail(item) {
				uni.navigateTo({
					url: 'newsDetail?id=' + item.id + '&keyword=' + this.keyword
				});
			},
			search(res) {
				this.pageIndex = 1;
				this.newsList = [];
				API.newsList({
					title: this.keyword,
					limit: this.pageLimit,
					page: this.pageIndex,
				}).then(res => {
					console.log(res);
					this.pageIndex++;
					this.currentNewsList = res.data.data;
					this.newsList = this.newsList.concat(this.currentNewsList);

					// scrollView上拉不加载标志
					this.canLoad = this.currentNewsList.length > 0 ? true : false;
				}).catch(err => {
					console.log(err);
				})
			},
			input(res) {
				this.keyword = res.value
			},
			cancel(res) {

			},
			loadMore(e) {
				setTimeout(() => {
					this.getList();
				}, 500)
			},
			back() {
				if (this.fromOrigin == '1') {
					util.bridgeAndroidAndIOS({'key':'back'});
				}
				else {
					uni.navigateBack({
						delta: 1
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
	}

	.container {
		display: flex;
		flex-direction: column;
		height: 100%;

		.searchFilterContainer {
			.searchBar {
				padding: 40rpx 20rpx 20rpx;
				background: #FFFFFF;
			}
		}

		.scroll-v {
			flex: 1;
			width: 750upx;
			height: 80%;
			/* #ifndef MP-ALIPAY */
			flex-direction: column;
			/* #endif */

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

			.newsPart {
				display: flex;
				justify-content: space-between;
				padding: 20rpx 10rpx;
				background: #FFFFFF;
				border-bottom: 0.5px solid #edeeef;

				.textPart {
					width: 400rpx;

					.title {
						height: 150rpx;

						text {
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
						}
					}

					.timePart {
						color: #6c6e6f;
						font-size: 30rpx;

						.time {
							margin-right: 40rpx;
						}

						.address {}
					}
				}

				image {
					width: 300rpx;
					height: 200rpx;
					background: #D3D3D3;
				}
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
</style>
