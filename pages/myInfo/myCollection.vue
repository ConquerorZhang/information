<template>
	<view class="tabs">
		<uni-nav-bar id="collectionBar" left-icon="back" :rightText="rightBtnText" title="我的收藏" @clickLeft="back" @clickRight="clickRightBtn"></uni-nav-bar>
		<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
			<view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @click="ontabtap">
				<text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
			</view>
		</scroll-view>
		<swiper :current="tabIndex" class="swiper-box" style="flex: 1;" :duration="300" @change="ontabchange">
			<swiper-item class="swiper-item" v-for="(tab,index1) in newsList" :key="index1">
				<scroll-view class="scroll-v" :class="showCheckBox ? 'scroll-v-height1' : 'scroll-v-height2'" enableBackToTop="true"
				 scroll-y @scrolltolower="loadMore(index1)">
					<block v-if="index1 == 0">
						<checkbox-group @change="checkboxChange0">
							<view class="empty" v-if="tab.data.length < 1">
								<image class="emptyImage" src="../../static/interaction/commentEmpty.png" mode="widthFix"></image>
								<view class="emptyText">您还没有收藏任何产品哦～</view>
							</view>
							<view class="productPart" v-for="(item,index) in tab.data" :key="index" @click="interDetail(index1,item.id)">
								<checkbox v-if="showCheckBox" color="#ee3847" :value="item.id" :checked="item.checked" />
								<productCell :data="item" fromH5='1'></productCell>
							</view>
						</checkbox-group>
					</block>
					<block v-else>
						<checkbox-group @change="checkboxChange1">
							<view class="empty" v-if="tab.data.length < 1">
								<image class="emptyImage" src="../../static/interaction/commentEmpty.png" mode="widthFix"></image>
								<view class="emptyText">您还没有收藏任何帖子哦～</view>
							</view>
							<view class="cardPart" v-for="(item,index) in tab.data" :key="index">
								<checkbox v-if="showCheckBox" color="#ee3847" :value="item.bizKey" :checked="item.checked" />
								<view class="detailPart" @click="interDetail(index1,item.bizKey)">
									<view class="item-top">
										<image class="circleicon" mode="scaleToFill" :src="item.userImgUrl"></image>
										<view class="info">
											<view class="name">{{item.userName}}</view>
											<view class="time">{{item.createTime}}</view>
										</view>
									</view>
									<text class="title">{{item.title}}</text>
									<text class="brief">{{item.contents}}</text>
									<view class="item-image">
										<block v-for="(itemImage,indexImage) in item.imgs" :key="indexImage">
											<image class="item-image-image" mode="scaleToFill" :src="itemImage.url" @tap="previewImage(item.imgs,indexImage)"></image>
										</block>
									</view>
								</view>
							</view>
						</checkbox-group>
					</block>
					<view class="loading-more" v-if="currentList[index1].length >= 10" v-on:click="loadMore(index1)">
						<text class="loading-more-text">加载更多数据</text>
					</view>
					<view class="loading-more" v-else-if="newsList[index1].data.length > 0">
						<text class="loading-more-text">没有更多数据了</text>
					</view>
				</scroll-view>

				<view class='bottomBar' v-show="showCheckBox">
					<checkbox-group @change="checkboxChange2">
						<checkbox :value="'all'" :checked="allChecked[tabIndex]" color="#ee3847" />
						<view>全选</view>
					</checkbox-group>
					<view class='delete' :class="selectedIdArr[tabIndex].length > 0 ? 'redDelete' : 'gragDelete'" v-on:click="clickDelete">删除</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	const API = require('../../common/api.js')

	import uniNavBar from "@/components/lib/uni-nav-bar/uni-nav-bar.vue"
	import productCell from "@/components/zcc/productCell/productCell.vue"

	export default {
		components: {
			uniNavBar,
			productCell
		},
		data() {
			return {
				allChecked: {
					'0': false,
					'1': false
				},
				showCheckBox: false,
				rightBtnText: '管理',
				newsList: [],
				tabIndex: 0,
				tabBars: [{
					name: '产品',
					id: 'chanpin'
				}, {
					name: '帖子',
					id: 'tiezi'
				}],
				selectedIdArr: [
					[],
					[]
				],
				scrollInto: "",
				showTips: false,
				navigateFlag: false,
				pageLimit: 10,
				pageIndex: [1, 1],
				currentList: [
					[],
					[]
				],
				canLoad: [true, true]
			}
		},
		onLoad(option) {
			setTimeout(() => {
				this.tabBars.forEach((tabBar) => {
					this.newsList.push({
						data: [],
					});
				});
				if (option.index == '1') {
					this.tabIndex = 1;
					this.scrollInto = this.tabBars[this.tabIndex].id;
					this.switchTab(1);
				}
				else {
					this.getList(0);
				}
			}, 350)
		},
		onShow() {
			this.callHandler('ObjC Echo', {
				'key': 'inner'
			});
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			clickRightBtn(e) {
				this.showCheckBox = !this.showCheckBox;
				this.rightBtnText = this.showCheckBox ? '完成' : '管理';

			},
			resetData(index) {
				console.log('-----'+index);
				this.allChecked.index = false;
				this.showCheckBox = false;
				this.rightBtnText = '管理';
				this.newsList[index].data = [];
				this.selectedIdArr[index] = [];
				this.showTips = false;
				this.pageIndex[index] = 1;;
				this.currentList[index] = [];
				this.canLoad[index] = true;
			},
			getList(index) {
				if (!this.canLoad[index]) {
					return;
				}
				
				console.log(index);
				let activeTab = this.newsList[index];

				// 产品的接口
				if (index == 0) {
					API.myProductCollect({
						limit: this.pageLimit,
						page: this.pageIndex[index],
					}).then(res => {
						console.log(res);
						this.pageIndex[index]++;
						this.currentList[index] = res.data.data != null ? res.data.data : [];
					
						// scrollView上拉不加载标志
						this.canLoad[index] = this.currentList[index].length > 0 ? true : false;
						
						activeTab.data = activeTab.data.concat(this.currentList[index]);
						// 更新全选按钮状态
						if (this.selectedIdArr[this.tabIndex].length == this.newsList[this.tabIndex].data.length) {
							this.allChecked[this.tabIndex] = true;
						} else {
							this.allChecked[this.tabIndex] = false;
						}
						uni.stopPullDownRefresh();
					}).catch(err => {
						console.log(err);
						uni.stopPullDownRefresh();
					})
					
				} else if (index == 1) {
					// 我收藏的帖子列表接口
					API.myCollect({
						limit: this.pageLimit,
						page: this.pageIndex[index],
					}).then(res => {
						console.log(res);
						this.pageIndex[index]++;
						this.currentList[index] = res.data.data != null ? res.data.data : [];

						// scrollView上拉不加载标志
						this.canLoad[index] = this.currentList[index].length > 0 ? true : false;
						
						activeTab.data = activeTab.data.concat(this.currentList[index]);
						// 更新全选按钮状态
						if (this.selectedIdArr[this.tabIndex].length == this.newsList[this.tabIndex].data.length) {
							this.allChecked[this.tabIndex] = true;
						} else {
							this.allChecked[this.tabIndex] = false;
						}
					}).catch(err => {
						console.log(err);
					})
				}
			
			},
			interDetail(index1,id) {
				console.log(id);
				if (index1 == 0) {
					// uni.navigateTo({
					// 	url: '../product/product?productId='+id + '&fromH5=1'
					// });
				}
				else {
					// 区分平台跳转互动详情
					switch (uni.getSystemInfoSync().platform) {
						case 'android':
							uni.navigateTo({
								url: '/pages/interaction/interactionDetail?item=' + encodeURIComponent(JSON.stringify({'id':id}))
							})
							break;
						case 'ios':
							uni.navigateTo({
								url: '/pages/interaction/interactionDetailIOS?item=' + encodeURIComponent(JSON.stringify({'id':id}))
							})
							break;
						default:
							console.log('运行在开发者工具上')
							break;
					}
				}
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
				console.log(index);
				console.log(this.tabBars);
				let tmp = this.tabBars[parseInt(index)].id;
				console.log('tmp:   '+tmp);
				this.scrollInto = tmp;
				
				
				
			},
			ontabchange(e) {
				let index = e.target.current || e.detail.current;
				this.tabIndex = index;
				this.switchTab(index);
			},
			switchTab(index) {
				if (this.newsList[index].data.length === 0) {
					this.getList(index);
				}

				if (this.tabIndex === index) {
					return;
				}

				this.scrollInto = this.tabBars[index].id;
			},
			clearTabData(e) {
				this.newsList[e].data.length = 0;
			},
			checkboxChange0: function(e) {
				this.selectedIdArr[this.tabIndex] = e.detail.value; //无法刷新
				// 强制刷新删除按钮颜色
				this.$forceUpdate();
				// console.log(this.selectedIdArr);
				if (this.selectedIdArr[this.tabIndex].length == this.newsList[this.tabIndex].data.length) {
					this.allChecked[this.tabIndex] = true;
				} else {
					this.allChecked[this.tabIndex] = false;
				}
			},
			checkboxChange1: function(e) {
				this.selectedIdArr[this.tabIndex] = e.detail.value;
				// 强制刷新删除按钮颜色
				this.$forceUpdate();
				console.log(this.selectedIdArr);
				if (this.selectedIdArr[this.tabIndex].length == this.newsList[this.tabIndex].data.length) {
					this.allChecked[this.tabIndex] = true;
				} else {
					this.allChecked[this.tabIndex] = false;
				}
			},
			checkboxChange2: function(e) {
				this.allChecked[this.tabIndex] = !this.allChecked[this.tabIndex];
				this.selectedIdArr[this.tabIndex] = [];

				for (var i = 0; i < this.newsList[this.tabIndex].data.length; i++) {
					this.newsList[this.tabIndex].data[i].checked = this.allChecked[this.tabIndex];
					if (this.allChecked[this.tabIndex]) {
						this.selectedIdArr[this.tabIndex].push(this.newsList[this.tabIndex].data[i].id)
					}
				}
			},
			clickDelete: function(e) {
				uni.showModal({
					content: '确认删除吗？',
					success: (res) => {
						if (res.confirm) {
							
							// console.log(this.selectedIdArr[this.tabIndex]);
							// 提交删除接口
							API.myCollectCancel({
								collecttype: this.tabIndex == 0 ? 'product' : 'issue',
								keys: this.selectedIdArr[this.tabIndex],
							}).then(res => {
								console.log(res);
								
								// 更新数据
								this.resetData(this.tabIndex)
								
								// 拉数据 
								this.getList(this.tabIndex)
							}).catch(err => {
								console.log(err);
							})
						}
					}
				})
			},
			navigateToProduct(e) {
				console.log(e);
			},
			previewImage(imageList, indexImage) { //预览图片
				uni.previewImage({
					urls: imageList,
					current: imageList[indexImage]
				});
			},
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
		// height: calc(100% - 180rpx);
		// height: calc(100% - 60rpx);
		/* #ifndef MP-ALIPAY */
		flex-direction: column;
		/* #endif */
	}

	.scroll-v-height1 {
		height: calc(100% - 270rpx);
	}

	.scroll-v-height2 {
		height: calc(100% - 170rpx);
	}

	.productPart {
		display: flex;
		margin-top: 30rpx;
		margin-left: 20rpx;

		checkbox {
			margin-right: 15rpx;
		}
		
		/deep/ uni-checkbox .uni-checkbox-input{
		    border-radius: 50%;
		}
		/deep/ uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked{
		    border: 1px solid rgb(199, 22, 30);
		    background-color: rgb(199, 22, 30);
		    color: #FFF !important;
		}
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

	.cardPart {
		display: flex;
		margin-top: 30rpx;
		margin-left: 20rpx;

		checkbox {
			margin-right: 15rpx;
		}
		
		/deep/ uni-checkbox .uni-checkbox-input{
		    border-radius: 50%;
		}
		/deep/ uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked{
		    border: 1px solid rgb(199, 22, 30);
		    background-color: rgb(199, 22, 30);
		    color: #FFF !important;
		}

		.detailPart {
			background: #FFFFFF;
			border-radius: 30rpx;
			width: 710rpx;
			padding-bottom: 10rpx;

			.item-top {
				display: flex;
				flex-wrap: nowrap;
				align-items: center;

				.circleicon {
					border-radius: 50%;
					margin: 20rpx;
					width: 80rpx;
					height: 80rpx;
				}

				.info {
					padding: 15rpx 0;

					.name {
						color: #585858;
						font-size: $uni-font-size-name;
					}

					.time {
						color: #8D8D8D;
						font-size: $uni-font-size-time;
					}
				}
			}

			.title,
			.brief {
				margin: 0 20rpx;
				line-height: 1.6em;
				display: -webkit-box;
				/** 对象作为伸缩盒子模型显示 **/
				-webkit-line-clamp: 5;
				overflow: hidden;
				text-overflow: ellipsis;
				-webkit-box-orient: vertical;
			}

			.title {
				color: #282828;
				font-size: $uni-font-size-article-title;
			}

			.brief {
				color: #525252;
				font-size: $uni-font-size-article-brief;
			}

			.item-image {
				display: flex;
				flex-wrap: wrap;
				margin: 10rpx 20rpx;

				.item-image-image {
					padding: 10rpx 11rpx;
					width: 200rpx;
					height: 200rpx;
				}
			}
		}
	}

	.bottomBar {
		display: flex;
		justify-content: space-between;
		background: #FFFFFF;
		height: 100rpx;
		align-items: center;

		checkbox-group {
			display: flex;
		}

		checkbox {
			margin-left: 20rpx;
		}
		
		/deep/ uni-checkbox .uni-checkbox-input{
		    border-radius: 50%;
		}
		/deep/ uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked{
		    border: 1px solid rgb(199, 22, 30);
		    background-color: rgb(199, 22, 30);
		    color: #FFF !important;
		}

		.delete {
			color: #FFFFFF;
			background: #b7b8b9;
			text-align: center;
			height: 100rpx;
			line-height: 100rpx;
			width: 250rpx;
		}

		.redDelete {
			background: #d7061f;
		}

		.grayDelete {
			background: #b7b8b9;
		}
	}

	.loading-more {
		align-items: center;
		justify-content: center;
		padding-top: 10px;
		padding-bottom: 10px;
		text-align: center;
		
		.loading-more-text {
			font-size: 28upx;
			color: #999;
		}
	}

</style>
