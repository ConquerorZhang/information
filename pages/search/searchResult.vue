<template>
	<view class="container">
		<view class="searchFilterContainer">
			<uni-search-bar class="searchBar" placeholder="关键字搜索" radius="80" @cancel="cancel" @searchClick="searchClick"></uni-search-bar>
			<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
				<view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @click="ontabtap">
					<text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
				</view>
			</scroll-view>
		</view>
		<swiper :current="tabIndex" class="swiper-box" style="flex: 1;" :duration="300" @change="ontabchange">
			<swiper-item class="swiper-item" v-for="(tab,index1) in newsList" :key="index1">
				<scroll-view class="scroll-v" enableBackToTop="true" scroll-y @scrolltolower="loadMore(index1)">
					<block v-if="index1 == 0">
						<view class="empty" v-if="tab.data.length < 1">
							<image class="emptyImage" src="../../static/logo.png" mode="widthFix"></image>
						</view>
						<view class="newsPart" v-for="(item,index) in tab.data" :key="index">
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
					</block>
					<block v-else-if="index1 == 1">
						<view class="empty" v-if="tab.data.length < 1">
							<image class="emptyImage" src="../../static/logo.png" mode="widthFix"></image>
						</view>
						<view class="filePart" v-for="(item,index) in tab.data" :key="index">
							<view class="topPart">
								<view class="textPart">
									<view class="title">{{item.title}}</view>
									<view class="subTitle">{{item.subTitle}}</view>
									<view class="name">{{item.name}}</view>
									<view class="client">{{item.client}}</view>
								</view>
								<view class="rightPart">
									<view class="redType">{{item.redType}}</view>
									<view class="state">{{item.state}}</view>
								</view>
							</view>
							<view class="time">{{item.time}}</view>
						</view>
					</block>
					<block v-else-if="index1 == 2">
						<view class="empty" v-if="tab.data.length < 1">
							<image class="emptyImage" src="../../static/logo.png" mode="widthFix"></image>
						</view>
						<view class="productPart" v-for="(item,index) in tab.data" :key="index">
							<productCell :data="item"></productCell>
						</view>
					</block>
					<block v-else-if="index1 == 3">
						<view class="empty" v-if="tab.data.length < 1">
							<image class="emptyImage" src="../../static/logo.png" mode="widthFix"></image>
						</view>
						<view class="learnPart" v-for="(item,index) in tab.data" :key="index">
							<downLoadCell :data='item'></downLoadCell>
						</view>
					</block>
					<view class="loading-more" v-if="tab.isLoading || tab.data.length > 4" v-on:click="loadMore(index1)">
						<text class="loading-more-text">{{tab.loadingText}}</text>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import UniSearchBar from "../../components/lib/uni-search-bar/uni-search-bar.vue"
	import downLoadCell from "@/components/zcc/downLoadCell/downLoadCell.vue"
	import productCell from "@/components/zcc/productCell/productCell.vue"
	
	export default {
		components: {
			UniSearchBar,
			downLoadCell,
			productCell
		},
		data() {
			return {
				newsList: [],
				keyword: '',
				tabIndex: 0,
				tabBars: [{
					name: '电科动态',
					id: 'dongtai'
				}, {
					name: '项目档案',
					id: 'dangan'
				}, {
					name: '系统产品',
					id: 'chanpin'
				}, {
					name: '学习资料',
					id: 'ziliao'
				}],
				scrollInto: "",
				navigateFlag: false,
			}
		},
		onLoad(option) {
			console.log(option.keyword);
			
			setTimeout(() => {
				this.tabBars.forEach((tabBar) => {
					this.newsList.push({
						data: [],
						isLoading: false,
						refreshText: "",
						loadingText: '加载更多...'
					});
				});
				this.getList(0);
			}, 350)
		},
		methods: {
			getList(index) {
				console.log(index);
				let activeTab = this.newsList[index];
				let list = [];
				// 制造的假数据
				let tmpList = [
					[{
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
						}
					],
					[{
							title: '中国电科京津冀解决浏览浏览了解了解了了解了链接',
							subTitle: '成都了思考科技有限公司',
							name: '张三',
							client: '王武',
							time: '2011-2-22',
							redType: '高级会',
							state: '未完结',
							id: '111'
						},
						{
							title: '中国电科京津冀解决浏览浏览了解了解了了解了链接',
							subTitle: '成都了思考科技有限公司',
							name: '张三',
							client: '王武',
							time: '2011-2-22',
							redType: '高级会',
							state: '未完结',
							id: '112'
						},
						{
							title: '中国电科京津冀解决浏览浏览了解了解了了解了链接',
							subTitle: '成都了思考科技有限公司',
							name: '张三',
							client: '王武',
							time: '2011-2-22',
							redType: '高级会',
							state: '未完结',
							id: '113'
						},
						{
							title: '中国电科京津冀解决浏览浏览了解了解了了解了链接',
							subTitle: '成都了思考科技有限公司',
							name: '张三',
							client: '王武',
							time: '2011-2-22',
							redType: '高级会',
							state: '未完结',
							id: '113'
						}
					],
					[{
						image: '../../static/logo.png',
						title: '中国电科相关资料',
						subtitle: '产品的点点滴滴的点点滴滴的点点滴滴的点点滴滴的点点滴滴的点点滴滴的点点滴滴的点点滴滴的点点滴滴的点点滴滴的点点滴滴',
						time: '2011-2-22',
						id: '11'
					}, {
						image: '../../static/logo.png',
						title: '中国电科相关资料',
						subtitle: '的点点滴滴',
						time: '2013-2-22',
						id: '12'
					}, {
						image: '../../static/logo.png',
						title: '中国电科相关资料',
						subtitle: '的点点滴滴',
						time: '2013-2-22',
						id: '13'
					}, {
						image: '../../static/logo.png',
						title: '中国电科相关资料',
						subtitle: '的点点滴滴',
						time: '2013-2-22',
						id: '14'
					}, {
						image: '../../static/logo.png',
						title: '中国电科相关资料',
						subtitle: '的点点滴滴',
						time: '2013-2-22',
						id: '15'
					}],
					[{
							image: '../../static/logo.png',
							title: '浮台信息系统相关资料',
							downloadImage: '../../static/logo.png',
							time: '2019-11-11',
							downloadNum: '下载量: 9878'
						},
						{
							image: '../../static/logo.png',
							title: '哈哈哈信息系统相关资料',
							downloadImage: '../../static/logo.png',
							time: '2013-12-11',
							downloadNum: '下载量: 228'
						}
					]
				];

				list = tmpList[index];
				activeTab.data = activeTab.data.concat(list);
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
					this.getList(this.tabIndex);
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
				this.switchTab(index);
			},
			switchTab(index) {
				if (this.newsList[index].data.length === 0) {
					this.getList(index);
				}

				if (this.tabIndex === index) {
					return;
				}

				this.tabIndex = index;
				this.scrollInto = this.tabBars[index].id;
			},
			clearTabData(e) {
				this.newsList[e].data.length = 0;
				this.newsList[e].loadingText = "加载更多...";
			},
			navigateToProduct(e) {
				console.log(e);
			},
			cancel() {
				uni.navigateBack({
					delta:1
				})
			},
			searchClick() {
				uni.navigateBack({
					delta:1
				})
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

	.container {
		display: flex;
		flex-direction: column;
		
		.searchFilterContainer {
			
			.searchBar {
				padding: 80rpx 20rpx 20rpx;
				background: #FFFFFF;
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
			// height: calc(100% - 170rpx);
			height: 100%;
			/* #ifndef MP-ALIPAY */
			flex-direction: column;
			/* #endif */
		}

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

		.filePart {
			background: #FFFFFF;
			margin: 20rpx;
			border-radius: 15rpx;

			.topPart {
				display: flex;
				justify-content: space-between;
				border-bottom: 0.5px solid #edeeef;
				padding-bottom: 20rpx;

				.textPart {
					color: #999a9b;
					width: 500rpx;
					margin-left: 20rpx;
					margin-top: 20rpx;
					font-size: 30rpx;

					.title {
						color: #28292a;
						font-size: 35rpx;
					}

					.subTitle {}

					.name {}

					.client {}
				}

				.rightPart {
					width: 130rpx;
					margin-top: 30rpx;
					margin-right: 20rpx;
					text-align: center;

					.redType {
						color: #de4149;
						background: #f9dfe1;
						font-size: 25rpx;
						height: 40rpx;
						line-height: 40rpx;
						border-radius: 20rpx;
					}

					.state {
						color: #818283;
						font-size: 25rpx;
						margin-top: 15rpx;
					}
				}
			}

			.time {
				color: #999a9b;
				font-size: 30rpx;
				padding: 10rpx 20rpx;
			}
		}

		.productPart {
			display: flex;
			margin-top: 30rpx;
			margin-left: 20rpx;
		}

		.learnPart {
			margin-top: 10rpx;
			background: #FFFFFF;
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
