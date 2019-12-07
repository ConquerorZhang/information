<template>
	<view class="container">
		<view class="searchFilterContainer">
			<uni-search-bar class="searchBar" placeholder="关键字搜索" radius="80"></uni-search-bar>
		</view>
		<scroll-view class="scroll-v" enableBackToTop="true" scroll-y @scrolltolower="loadMore(index1)">
			<view class="empty" v-if="newsList.data.length < 1">
				<image class="emptyImage" src="../../static/logo.png" mode="widthFix"></image>
			</view>
			<view class="newsPart" v-for="(item,index) in newsList.data" :key="index">
				<view class="textPart">
					<view class="title">
						<text>{{item.title}}</text>
					</view>
					<view class="timePart">
						<text class="time">{{item.time}}</text>
						<text class="address">{{item.address}}</text>
					</view>
				</view>
				<image :src="item.image" mode="scaleToFill"></image>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newsList: [],
			}
		},
		onLoad() {
			setTimeout(() => {
				this.newsList.push({
					data: [],
					isLoading: false,
					refreshText: "",
					loadingText: '加载更多...'
				});
				this.getList;
			}, 350)
		},
		methods: {
			getList(e) {
				// 制造的假数据
				let list = [{
						image: '../../static/logo.png',
						title: '中国电科相关资料',
						time: '2011-2-22',
						address: '北京',
						id: '01'
					},
					{
						image: '../../static/logo.png',
						title: '中国电科京津冀解决浏览浏览了解了解了了解了链接',
						time: '2011-2-22',
						address: '北京',
						id: '02'
					},
					{
						image: '../../static/logo.png',
						title: '中国电科相放松放松放松放松放松饭舒服舒服关资料',
						time: '2011-2-22',
						address: '北京',
						id: '03'
					},
					{
						image: '../../static/logo.png',
						title: '中国电科相放松放松放松放松放松饭舒服舒服关资料',
						time: '2011-2-22',
						address: '北京',
						id: '04'
					}
				];

				this.newsList.data = this.newsList.data.concat(list);
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
					this.getList;
				}, 500)
			},
		}
	}
</script>

<style lang="scss">
	
	.container {
		display: flex;
		flex-direction: column;
		
		.searchFilterContainer {
		
			.searchBar {
				padding: 40rpx 20rpx 20rpx;
				background: #FFFFFF;
			}
		}
		
		.scroll-v {
			// flex: 1;
			width: 750upx;
			height: 100%;
			/* #ifndef MP-ALIPAY */
			flex-direction: column;
			/* #endif */
			background: #007AFF;
			
			.empty {
				text-align: center;
					
				.emptyImage {
					margin-top: 400rpx;
					width: 300rpx;
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
				}
			}
		}
	}
</style>
