<template>
	<view class="tabs">
		<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
			<view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @click="ontabtap">
				<text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
			</view>
		</scroll-view>
		<swiper :current="tabIndex" class="swiper-box" style="flex: 1;" :duration="300" @change="ontabchange">
			<swiper-item class="swiper-item" v-for="(tab,index1) in newsList" :key="index1">
				<scroll-view class="scroll-v" enableBackToTop="true" scroll-y @scrolltolower="loadMore()">
					<view class="empty" v-if="tab.length < 1">
						<image class="emptyImage" src="../../static/interaction/commentEmpty.png" mode="widthFix"></image>
						<view class="emptyText">暂无信息～</view>
					</view>
					<view class="dayPart" v-for="(item,index) in tab" :key="index" @click="toDetail(item.bizType,item.bizId)">
						<view class="time">{{item.visitTime}}</view>
						<view class="detailPart">
							<!-- <block v-for="(detail,detailIndex) in item.list" :key="detailIndex"> -->
							<view class="singleDetail">
								<view class="detailRed"></view>
								<view class="detailText">
									<view class="title">{{item.contents}}</view>
									<view class="subTitle">{{item.bizType == 'product' ? '产品' : '动态'}}</view>
								</view>
							</view>
							<!-- </block> -->
						</view>
					</view>
					<view class="loading-more" v-if="currentList[index1].length >= 10" v-on:click="loadMore()">
						<text class="loading-more-text">加载更多数据</text>
					</view>
					<view class="loading-more" v-else-if="newsList[index1].length > 0">
						<text class="loading-more-text">没有更多数据了</text>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	const API = require('../../common/api.js')

	export default {
		data() {
			return {
				newsList: [
					[],
					[],
					[]
				],
				tabIndex: 0,
				tabBars: [{
					name: '全部',
					id: 'quanbu'
				}, {
					name: '产品',
					id: 'chanpin'
				}, {
					name: '动态',
					id: 'dongtai'
				}],
				scrollInto: "",
				showTips: false,
				navigateFlag: false,
				pulling: false,
				refreshIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAB5QTFRFcHBw3Nzct7e39vb2ycnJioqK7e3tpqam29vb////D8oK7wAAAAp0Uk5T////////////ALLMLM8AAABxSURBVHja7JVBDoAgDASrjqj//7CJBi90iyYeOHTPMwmFZrHjYyyFYYUy1bwUZqtJIYVxhf1a6u0R7iUvWsCcrEtwJHp8MwMdvh2amHduiZD3rpWId9+BgPd7Cc2LIkPyqvlQvKxKBJ//Qwq/CacAAwDUv0a0YuKhzgAAAABJRU5ErkJggg==",

				pageLimit: 10,
				pageIndex: [1, 1, 1],
				biztypeArr: ['', 'product', 'dynamic'],
				currentList: [
					[],
					[],
					[]
				],
				canLoad: [true, true, true]
			}
		},
		onLoad() {
			this.getList();
		},
		methods: {
			onNavigationBarButtonTap(e) {
				uni.showModal({
					content: '是否清空浏览历史？',
					success: (res) => {
						if (res.confirm) {
							// 提交删除接口
							API.myBrowseClear({
								biztype: this.biztypeArr[this.tabIndex],
							}).then(res => {
								this.newsList[this.tabIndex] = [];
								this.$forceUpdate();
							}).catch(err => {
								console.log(err);
							})
						}
					}
				})
			},
			getList() {
				if (!this.canLoad[this.tabIndex]) {
					return;
				}

				API.myBrowseHistory({
					biztype: this.biztypeArr[this.tabIndex],
					limit: this.pageLimit,
					page: this.pageIndex[this.tabIndex],
				}).then(res => {
					console.log(res);
					this.pageIndex[this.tabIndex]++;
					this.currentList[this.tabIndex] = res.data.data == undefined ? [] : res.data.data;
					this.newsList[this.tabIndex] = this.newsList[this.tabIndex].concat(this.currentList[this.tabIndex]);

					this.$forceUpdate();

					// scrollView上拉不加载标志
					this.canLoad[this.tabIndex] = this.currentList[this.tabIndex].length > 0 ? true : false;
				}).catch(err => {
					console.log(err);
				})
			},
			goDetail(e) {
				if (this.navigateFlag) {
					return;
				}
				this.navigateFlag = true;
				uni.navigateTo({
					url: './detail/detail?title=' + e.title
				});
				setTimeout(() => {
					this.navigateFlag = false;
				}, 200)
			},
			loadMore(e) {
				setTimeout(() => {
					this.getList();
				}, 500)
			},
			ontabtap(e) {
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				// this.switchTab(index);
				this.tabIndex = index;
				this.scrollInto = this.tabBars[index].id;
			},
			ontabchange(e) {
				let index = e.target.current || e.detail.current;
				this.tabIndex = index;
				this.switchTab(index);
			},
			switchTab(index) {
				if (this.newsList[index].length === 0) {
					this.getList();
				}

				if (this.tabIndex === index) {
					return;
				}

				this.scrollInto = this.tabBars[index].id;
			},
			clearTabData(e) {
				this.newsList[e].length = 0;
			},
			toDetail(type,bizId) {
				if (type == 'product') {
					uni.navigateTo({
						url:'../product/product?productId='+bizId + '&fromH5=1'
					})
				}
				else {
					uni.navigateTo({
						url: '../main/newsDetail?id=' + bizId + '&fromH5=1'
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	/* #ifndef APP-PLUS */
	page {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	.tabs {
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		background-color: #eeeff0;
	}

	.tab-bar {
		background: #FFFFFF;
	}

	.scroll-h {
		width: 750upx;
		height: 80upx;
		background: #FFFFFF;
		flex-direction: row;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
		/* flex-wrap: nowrap; */
		/* border-color: #cccccc;
		border-bottom-style: solid;
		border-bottom-width: 1px; */
	}

	.uni-tab-item {
		/* #ifndef APP-PLUS */
		display: inline-block;
		/* #endif */
		flex-wrap: nowrap;
		padding-left: 34upx;
		padding-right: 34upx;
	}

	.uni-tab-item-title {
		color: #555;
		font-size: 30upx;
		height: 80upx;
		line-height: 80upx;
		flex-wrap: nowrap;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
	}

	.uni-tab-item-title-active {
		color: #dc2937;
		padding-bottom: 10rpx;
		border-bottom: 1px solid #dc2937;
	}

	.swiper-box {
		flex: 1;
		height: 100%;
	}

	.swiper-item {
		flex: 1;
		flex-direction: row;
	}

	.scroll-v {
		flex: 1;
		width: 750upx;
		height: 95%;
		/* #ifndef MP-ALIPAY */
		flex-direction: column;
		/* #endif */
	}

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

	.dayPart {
		margin: 20rpx;

		.time {
			color: #8e8282;
			margin-bottom: 10rpx;
		}

		.detailPart {
			border-radius: 15rpx;
			background: #FFFFFF;

			.singleDetail {
				display: flex;
				align-items: flex-start;
				padding: 20rpx;
				border-bottom: 1px solid #f0f1f2;

				.detailRed {
					background: #da2a37;
					width: 16rpx;
					height: 16rpx;
					border-radius: 8rpx;
					margin-top: 20rpx;
					margin-left: 20rpx;
					margin-right: 20rpx;
				}

				.detailText {

					.title {
						color: #272829;
					}

					.subTitle {
						color: #909192;
					}
				}
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
</style>
