<template>
	<view class="container">
		<uni-nav-bar id="naviBar" left-icon="back" :rightText="rightBtnText" title="我的下载" @clickLeft="back" @clickRight="clickRightBtn"></uni-nav-bar>
		<myfilter :themeColor="themeColor" :menuList="menuList" @result='result'></myfilter>
		<view class="empty" v-if="dataList.length < 1">
			<image class="emptyImage" src="../../static/interaction/commentEmpty.png" mode="widthFix"></image>
			<view class="emptyText">您还没有下载任何资料哦～</view>
		</view>
		<scroll-view class="scroll-v" :class="showCheckBox ? 'scroll-v-height1' : 'scroll-v-height2'" enableBackToTop="true"
		 scroll-y @scrolltolower="loadMore()">
			<checkbox-group @change="checkboxChange1">
				<view class="productPart" v-for="(item,index) in dataList" :key="index">
					<checkbox v-if="showCheckBox" color="#ee3847" :value="item.id" :checked="item.checked" />
					<view class="detailPart" v-on:click="navigateToProduct(item.id)">
						<image class="imagePart" :src="item.image" mode="scaleToFill"></image>
						<view class="textPart">
							<view class="title">{{item.title}}</view>
							<view class="time">{{item.time}}</view>
						</view>
					</view>
				</view>
			</checkbox-group>
			<view class="loading-more" v-if="currentList.length >= 4" v-on:click="loadMore()">
				<text class="loading-more-text">加载更多数据</text>
			</view>
			<view class="loading-more" v-else-if="dataList.length > 0">
				<text class="loading-more-text">没有更多数据了</text>
			</view>
		</scroll-view>

		<view class='bottomBar' v-show="showCheckBox">
			<checkbox-group @change="checkboxChange2">
				<checkbox :value="'all'" :checked="allChecked" color="#ee3847" />
				<view>全选</view>
			</checkbox-group>
			<view class='delete' :class="selectedIdArr.length > 0 ? 'redDelete' : 'gragDelete'" v-on:click="clickDelete">删除</view>
		</view>
	</view>
</template>

<script>
	const API = require('../../common/api.js')
	var util = require('../../common/bridge.js');

	import uniNavBar from "@/components/lib/uni-nav-bar/uni-nav-bar.vue"
	import myfilter from '@/components/sl-filter/myDownLoad-filter.vue';

	export default {
		components: {
			uniNavBar,
			myfilter
		},
		data() {
			return {
				rightBtnText: '管理',
				showCheckBox: false,
				allChecked: false,
				dataList: [],
				currentList: [],
				selectedIdArr: [],
				pageLimit: 10,
				pageIndex: 1,
				canLoad: true,

				themeColor: '#d7051f',
				menuList: [{
						'title': '默认排序',
						// 'detailTitle': '子标题1',
						'key': 'key_1',
						'isSort': true,
						'isMutiple': false,
						'detailList': [{
								'title': '默认排序',
								'value': 'val_1_1'
							},
							{
								'title': '最新',
								'value': 'val_1_2'
							},
							{
								'title': '最旧',
								'value': 'val_1_3'
							},
							{
								'title': '按文件大小',
								'value': 'val_1_4'
							}
						]
					},
					{
						'title': '筛选类别',
						// 'detailTitle': '子标题2',
						'isMutiple': true,
						'key': 'key_2',
						'detailList': [{
								'title': '交通信息化',
								'value': 'val_2_1'
							},
							{
								'title': '电子政务',
								'value': 'val_2_2'
							},
							{
								'title': '海洋信息化',
								'value': 'val_2_3'
							},
							{
								'title': '安防冲突',
								'value': 'val_2_4'
							},
							{
								'title': '智慧城市',
								'value': 'val_2_5'
							},
							{
								'title': '网络空间安全',
								'value': 'val_2_6'
							}
						]
					}

				],
				fromH5: '',
			}
		},
		onLoad(option) {
			this.fromH5 = option.fromH5;
			this.getList();
		},
		methods: {
			back() {
				if (this.fromH5 == '1') {
					uni.navigateBack({
						delta: 1
					})
				}
				else {
					// util.bridgeAndroidAndIOS({'key':'back'});
					this.callHandler('ObjC Echo',{'key':'back'});
				}
			},
			clickRightBtn(e) {
				this.showCheckBox = !this.showCheckBox;
				this.rightBtnText = this.showCheckBox ? '完成' : '管理';
			},
			//筛选菜单返回结果
			result(val) {
				console.log(val);
				//todzcc
				// this.getList(val.key_1,val.key_2);
			},
			// 获取本地文件夹信息
			getList() {
				// if (!this.canLoad) {
				// 	return;
				// }

				// 假数据
				this.currentList = [{
					image: '../../static/logo.png',
					title: '中国电科相关资料',
					time: '2011-2-22',
					id: '11'
				}, {
					image: '../../static/logo.png',
					title: '中国电科相关资料',
					time: '2013-3-22',
					id: '12'
				}, {
					image: '../../static/logo.png',
					title: '中国电科相关资料',
					time: '2013-4-22',
					id: '13'
				}, {
					image: '../../static/logo.png',
					title: '中国电科相关资料',
					time: '2013-5-22',
					id: '14'
				}, {
					image: '../../static/logo.png',
					title: '中国电科相关资料',
					time: '2013-6-22',
					id: '15'
				}];

				this.dataList = this.dataList.concat(this.currentList);
				// 更新全选按钮状态
				if (this.selectedIdArr.length == this.dataList.length) {
					this.allChecked = true;
				} else {
					this.allChecked = false;
				}
			},
			checkboxChange1: function(e) {
				this.selectedIdArr = e.detail.value; //无法刷新
				// 强制刷新删除按钮颜色
				this.$forceUpdate();
				// console.log(this.selectedIdArr);
				if (this.selectedIdArr.length == this.dataList.length) {
					this.allChecked = true;
				} else {
					this.allChecked = false;
				}
			},
			checkboxChange2: function(e) {
				this.allChecked = !this.allChecked;
				this.selectedIdArr = [];

				for (var i = 0; i < this.dataList.length; i++) {
					this.dataList[i].checked = this.allChecked;
					if (this.allChecked) {
						this.selectedIdArr.push(this.dataList[i].id)
					}
				}
			},
			clickDelete: function(e) {
				uni.showModal({
					content: '确认删除吗？',
					success: (res) => {
						if (res.confirm) {
							console.log(this.selectedIdArr);

							// 更新数据
							this.dataList = [];
							// 强制刷新删除按钮颜色
							this.$forceUpdate();
						}
					}
				})
			},
			loadMore(e) {
				setTimeout(() => {
					this.getList();
				}, 500)
			},
		}
	}
</script>

<style lang="scss">
	page {
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
			flex: 1;
			width: 750upx;
			/* #ifndef MP-ALIPAY */
			flex-direction: column;
			/* #endif */
		}

		.scroll-v-height1 {
			height: calc(100% - 290rpx);
		}

		.scroll-v-height2 {
			height: calc(100% - 190rpx);
		}

		.productPart {
			display: flex;
			margin-top: 15rpx;

			checkbox {
				margin-left: 15rpx;
				margin-right: 15rpx;
			}

			.detailPart {
				display: flex;
				background: #FFFFFF;
				border-radius: 30rpx;
				width: 750rpx;

				.imagePart {
					margin: 40rpx 20rpx;
					width: 80rpx;
					height: 80rpx;
				}

				.textPart {
					margin-top: 35rpx;
					width: 390rpx;

					.title {
						color: #3f4041;
						font-size: $uni-font-size-lg;
					}

					.time {
						padding-top: 5rpx;
						font-size: 30rpx;
						color: #8f9091;
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

			.loading-more-text {
				font-size: 28upx;
				color: #999;
			}
		}

		.bottomBar {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;

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
	}
</style>
