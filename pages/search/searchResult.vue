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
						<view class="empty" v-if="tab.length < 1">
							<image class="emptyImage" src="../../static/interaction/commentEmpty.png" mode="widthFix"></image>
							<view class="emptyText">没有找到相关信息～</view>
						</view>
						<view class="newsPart" v-for="(item,index) in tab" :key="index" @click="goDetail(index1,item.id)">
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
					</block>
					<block v-else-if="index1 == 1">
						<view class="empty" v-if="tab.length < 1">
							<image class="emptyImage" src="../../static/interaction/commentEmpty.png" mode="widthFix"></image>
							<view class="emptyText">没有找到相关信息～</view>
						</view>
						<view class="filePart" v-for="(item,index) in tab" :key="index" @click="goDetail(index1,item.id)">
							<view class="topPart">
								<view class="textPart">
									<view class="title">{{item.projectName}}</view>
									<view class="subTitle">{{item.companyName}}</view>
									<view class="name">{{item.charger}}</view>
									<view class="client">{{item.customer}}</view>
								</view>
								<view class="rightPart">
									<view class="redType">{{item.probabilityStatusStr}}</view>
									<view class="state">{{item.procedureStatusStr}}</view>
								</view>
							</view>
							<view class="time">{{item.createTime}}</view>
						</view>
					</block>
					<block v-else-if="index1 == 2">
						<view class="empty" v-if="tab.length < 1">
							<image class="emptyImage" src="../../static/interaction/commentEmpty.png" mode="widthFix"></image>
							<view class="emptyText">没有找到相关信息～</view>
						</view>
						<view class="productPart" v-for="(item,index) in tab" :key="index" @click="goDetail(index1,item.id)">
							<productCell :data="item" fromH5='1'></productCell>
						</view>
					</block>
					<block v-else-if="index1 == 3">
						<view class="empty" v-if="tab.length < 1">
							<image class="emptyImage" src="../../static/interaction/commentEmpty.png" mode="widthFix"></image>
							<view class="emptyText">没有找到相关信息～</view>
						</view>
						<view class="learnPart" v-for="(item,index) in tab" :key="index">
							<downLoadCell :data='item'></downLoadCell>
						</view>
					</block>
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
	const API = require('../../common/api.js');
	var util = require('../../common/bridge.js');
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
				newsList: [[],[],[],[]],
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
				
				pageLimit: 10,
				pageIndex: [1, 1, 1, 1],
				currentList: [
					[],
					[],
					[],
					[]
				],
				canLoad: [true, true, true, true],
			}
		},
		onLoad(option) {
			console.log(option.keyword);
			this.keyword = option.keyword;
			
			this.getList();
		},
		onShow() {
			this.callHandler('ObjC Echo', {'key':'onShow'});
		},
		methods: {
			getList() {
				if (!this.canLoad[this.tabIndex]) {
					return;
				}
				
				if (this.tabIndex == 0) {
					API.searchResultNews({
						searchkey: this.keyword,
						limit: this.pageLimit,
						page: this.pageIndex[this.tabIndex],
					}).then(res => {
						console.log(res);
						this.pageIndex[this.tabIndex]++;
						this.currentList[this.tabIndex] = (res.data.data == undefined && res.data.data == null) ? [] : res.data.data;
						this.newsList[this.tabIndex] = this.newsList[this.tabIndex].concat(this.currentList[this.tabIndex]);
					
						this.$forceUpdate();
					
						// scrollView上拉不加载标志
						this.canLoad[this.tabIndex] = this.currentList[this.tabIndex].length > 0 ? true : false;
					}).catch(err => {
						console.log(err);
					})
				}
				else if (this.tabIndex == 1) {
					API.searchResultFile({
						searchkey: this.keyword,
						limit: this.pageLimit,
						page: this.pageIndex[this.tabIndex],
					}).then(res => {
						console.log(res);
						this.pageIndex[this.tabIndex]++;
						this.currentList[this.tabIndex] = (res.data.data == undefined && res.data.data == null) ? [] : res.data.data;
						this.newsList[this.tabIndex] = this.newsList[this.tabIndex].concat(this.currentList[this.tabIndex]);
					
						this.$forceUpdate();
					
						// scrollView上拉不加载标志
						this.canLoad[this.tabIndex] = this.currentList[this.tabIndex].length > 0 ? true : false;
					}).catch(err => {
						console.log(err);
					})
				}
				else if (this.tabIndex == 2) {
					API.searchResultProduct({
						searchkey: this.keyword,
						limit: this.pageLimit,
						page: this.pageIndex[this.tabIndex],
					}).then(res => {
						console.log(res);
						this.pageIndex[this.tabIndex]++;
						this.currentList[this.tabIndex] = (res.data.data == undefined && res.data.data == null) ? [] : res.data.data;
						this.newsList[this.tabIndex] = this.newsList[this.tabIndex].concat(this.currentList[this.tabIndex]);
					
						this.$forceUpdate();
					
						// scrollView上拉不加载标志
						this.canLoad[this.tabIndex] = this.currentList[this.tabIndex].length > 0 ? true : false;
					}).catch(err => {
						console.log(err);
					})
				}
				else if (this.tabIndex == 3) {
					API.searchResultLearn({
						searchkey: this.keyword,
						limit: this.pageLimit,
						page: this.pageIndex[this.tabIndex],
					}).then(res => {
						console.log(res);
						this.pageIndex[this.tabIndex]++;
						this.currentList[this.tabIndex] = (res.data.data == undefined && res.data.data == null) ? [] : res.data.data;
						this.newsList[this.tabIndex] = this.newsList[this.tabIndex].concat(this.currentList[this.tabIndex]);
					
						this.$forceUpdate();
					
						// scrollView上拉不加载标志
						this.canLoad[this.tabIndex] = this.currentList[this.tabIndex].length > 0 ? true : false;
					}).catch(err => {
						console.log(err);
					})
				}
			},
			goDetail(index,id) {
				if (index == 0) {
					uni.navigateTo({
						url:'../main/newsDetail?id='+id+'&keyword='+this.keyword + '&fromH5=' + '1'
					})
				}
				else if (index == 1) {
					// util.bridgeAndroidAndIOS({'key':'dangan','id':id});
					this.callHandler('ObjC Echo', {'key':'dangan','id':id});
				}
				else if (index == 2) {
					
				}
				else if (index == 3) {
					
				}
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
				this.switchTab(index);
			},
			switchTab(index) {
				if (this.newsList[index].length === 0) {
					this.getList();
				}

				if (this.tabIndex === index) {
					return;
				}

				this.tabIndex = index;
				this.scrollInto = this.tabBars[index].id;
			},
			clearTabData(e) {
				this.newsList[e].length = 0;
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
				background: #CCCCCC;
				margin-right: 10rpx;
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
