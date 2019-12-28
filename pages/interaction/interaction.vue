<!-- 互动专区首页 -->
<template>
	<view class="page">
		<head>
			<meta name="format-detection" content="telephone=no">
		</head>
		<view class="head">
			<!-- v-bind:style="{height:stateBarHeight +'px'}" -->
			<view class="statusBar" v-bind:style="{height:statusBarHeight+'rpx'}"></view><!--{{Vue.config.configDic.stateBarHeight}}-->
			<view class="top">
				<image class="icon_logo" mode="aspectFit" src="../../static/logo_cetc.png"></image>
				<!-- 自定义Placeholder 搜索框 -->
				<view class="v_search">
					<uni-search-bar placeholder="关键字" radius="20" clearButton="auto" @confirm="search" class="search" />
				</view>
				<view class="top-right" @click="message">
					<!--@click="window.android.click('77777777777')"-->
					<image class="top-right-icon" mode="aspectFit" src="../../static/message_white.png"></image>
					<!-- <text class="top-right-text" v-show='false' >消息</text> -->
				</view>
			</view>

			<view class="filter">
				<intertction-filter :independence="true" :color="titleColor" :themeColor="themeColor" :menuList.sync="menuList"
				 @result="result" @sortresult="sortresult"></intertction-filter>
			</view>
		</view>

		<!-- <view class="top-zhanwei"></view>     -->
		<scroll-view scroll-y="true" class="list" v-bind:style="{'margin-top':parseFloat(statusBarHeight)+140 +'rpx'}"
		 enableBackToTop="true" @scrolltolower="loadMore(page)">

			<view class="empty" v-if="data.datalsit.length < 1">
				<image class="emptyImage" src="../../static/interaction/commentEmpty.png" mode="widthFix"></image>
				<view class="emptyText">没有找到相关信息～</view>
			</view>
			<!-- 列表item -->
			<view class="item" v-for="(item, index) in data.datalsit" :key="index" @click="navToDetailPage(item,index)">
				<view class="item-top">
					<image class="circleicon" mode="aspectFit" :src="item.avatarUrl"></image>
					<view class="info">
						<text class="item-text name">{{item.createName}}</text>
						<view class="info-bottom">
							<text class="item-text time">{{item.createTimeShow}}</text>
							<text class="item-text number">{{item.visitCountShow}}</text>
						</view>
					</view>
				</view>
				<text class="item-text title">{{item.title}}</text>
				<text class="item-text brief">{{item.contents}}</text>
				<view class="item-image">
					<image v-for="(pic,index) in item.pics" :key="index" class="item-image-image" mode="aspectFit" :src="pic"></image>
					<!-- <image class="item-image-image" mode="aspectFit" src="../../static/logo.png"></image>
					<image class="item-image-image" mode="aspectFit" src="../../static/logo.png"></image>
					<image class="item-image-image" mode="aspectFit" src="../../static/logo.png"></image> -->

				</view>
				<!-- 底部 -->
				<view class="bottom">
					<view class="bottom-left" @click.stop="niubi('topicid')">
						<image class="bottom-icon-left" mode="aspectFit" :src="item.favour?'../../static/zan_sec.png': '../../static/zan.png'"></image>
						<text class="bottom-text">{{item.favourCount}}</text>
					</view>
					<view class="bottom-right" @click.stop="topiccomment('topicid')">
						<image class="bottom-icon-right" mode="aspectFit" src="../../static/message_black.png"></image>
						<text class="bottom-text">{{item.replyCount}}</text>
					</view>
				</view>
			</view>
			<view class="loading-more" v-if="data.isLoading || data.datalsit.length > 4">
				<text class="loading-more-text">{{data.loadingText}}</text>
			</view>


		</scroll-view>
		<cover-view class="cover-view" @click="navToPublish">
			<image class="cover-view-image" src="../../static/interaction/publish_go.png"></image>
			<text class="cover-view-text">我要发布</text>
		</cover-view>
	</view>
</template>

<script>
	import Vue from 'vue';
	const API = require('../../common/api.js');
	var util = require('../../common/bridge.js');
	import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue";
	import intertctionFilter from '@/components/sl-filter/intertction-filter.vue';
	export default {
		data() {
			return {
				statusBarHeight:0,
				pro: '10',
				systemInfo: '',
				currrenIndex: -1,
				type: '',
				searchKey: '',
				limit: '10',
				page: 1,
				orderBy: '',
				isAsc: 'desc',
				data: {
					isLoading: false,
					hasmore: true,
					refreshText: "",
					loadingText: '加载更多...',
					datalsit: [],
				},
				// itemlist: [{id:'123',name:'lmw',favour:false}, {id:'456',name:'lmw2',favour:true}, {id:'789',name:'lmw3'}, {}, {}, {}, {id:'369',name:'lmw',favour:false}, {}, {}],
				themeColor: '#C7161E',
				titleColor: '#ffffff',
				filterResult: '',
				menuList: [{
						'title': '全部',
						'key': 'part',
						'isSort': true,
						'reflexTitle': true,
						'detailList': [{
								'title': '全部',
								'value': ''
							},
							{
								'title': '业务资讯区',
								'value': '1'
							},
							{
								'title': '需求资讯区',
								'value': '2'
							},
							{
								'title': '经验分享区',
								'value': '3'
							}
						]
					}, {
						'title': '综合排序',
						'detailTitle': '请选择职位类型（可多选）',
						'isMutiple': false,
						'isSort': false,
						'key': 'sort',
						'value': 'multipleSort',
						'detailList': [{
							'title': '全部',
							'value': '123'
						}]

					},
					{
						'title': '按时间',
						'key': 'sort',
						'value': 'createTime ',
						'isMutiple': false,
						'isSort': false,
						'detailList': [{
							'title': '全部',
							'value': '456'
						}]

					},
					{
						'title': '按回复数',
						'key': 'sort',
						'value': 'reply_count',
						'isMutiple': false,
						'isSort': false,
						'reflexTitle': true,
						'detailList': [{
							'title': '全部',
							'value': '789'
						}]
					}
				]
			};
		},
		components: {
			uniSearchBar,
			intertctionFilter
		},
		methods: {

			// functionInJs : function(){
			// 	uni.showToast({
			// 		title:'h5 Toast',
			// 	})
			// },
			//消息
			message() {
				uni.navigateTo({
					url: "../myInfo/myPublish?index=0"
				})
				
				this.callHandler('ObjC Echo', {
					'key': 'inner'
				});
				// uni.showToast({
				// 	title: '111',
				// });

				// var that = this;
				// this.callHandlerBack("native_download", {
				// 	'downloadUrl': 'https://appbundle.holdsoft.cn/holdmall_19011802.apk',
				// 	'contentDisposition': '文件描述',
				// 	'mimeType': '.apk',
				// 	'fileId': ''
				// }, function(responseData) {
				// 	console.log("--------------download:", responseData)
				// 	that.topiccomment(responseData)
				// 	this.prow = responseData1; //这是一句有用的 废话
				// })
			},
			// 评论
			topiccomment(topicid) {
				uni.showToast({
					title: topicid,
				})
				console.log(topicid);
				this.pro = topicid;
			},
			// 点赞
			niubi(topicid) {
				console.log(topicid);
			},

			// trigger_sort(item) {
			// console.log("value的值为：" + item.value);
			/* this.content[e.index].active = !e.item.active;
			uni.showModal({
				title: '提示',
				content: `您${this.content[e.index].active?'选中了':'取消了'}${e.item.text}`,
				success: function(res) {
					if (res.confirm) {
						console.log('用户点击确定');
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			}); */
			// },
			//筛选菜单返回结果
			result(val) {
				// console.log('filter_result:' + JSON.stringify(val));
				// this.filterResult = JSON.stringify(val, null, 2);
				// console.log(Object.keys(JSON.stringify(val))[0].value);
				// this.type = this.filterResult.value;
				// console.log(val.part);
				this.type = val.part;
				//重新执行搜索函数
				this.resetData();
				this.getlistdata(1);
			},
			//排序菜单返回结果
			sortresult(val) {
				// console.log('filter_result:' + JSON.stringify(val));
				this.orderBy = val.sort;
				this.isAsc = "desc" == this.isAsc ? "asc" : "desc";
				this.resetData();
				this.getlistdata(1);
			},
			//页面跳转到详情
			navToDetailPage(item, index) {

				this.currrenIndex = index;
				uni.$once('interation$detailback', this.detailBack);
				uni.navigateTo({
					url: '/pages/interaction/interactionDetail?item=' + encodeURIComponent(JSON.stringify(item))
				})
				// util.bridgeAndroidAndIOS({
				// 	'key': 'inner'
				// });
			},
			//页面跳转到发布
			navToPublish(item) {
				uni.navigateTo({
					url: '/pages/interaction/publish'
				})
				// util.bridgeAndroidAndIOS({
				// 	'key': 'inner'
				// });
			},
			//键盘触发搜索
			search(key) {
				console.log(key);
				this.resetData();
				this.getlistdata(1);
			},
			getlistdata(page) {
				console.log('page----' + page);
				this.data.hasmore = false;
				API.interactionList({
					searchKey: this.searchKey,
					type: this.type,
					limit: this.limit,
					page: page,
					orderBy: this.orderBy,
					isAsc: this.isAsc,

					// contents: this.contentText,
					// pics: this.submitImageIdList,
					// type: parseInt(this.selectedIndex) + 1,
				}).then(res => {
					console.log(res);
					if (res.data.data.length < this.limit) {
						this.data.loadingText = "没有更多数据了"
						this.data.hasmore = false;
					} else {
						this.page = page + 1;
						this.data.hasmore = true;
					}
					this.data.datalsit = this.data.datalsit.concat(res.data.data);
					 uni.stopPullDownRefresh();
					// this.data.datalsit=[];
					// console.log(this.data.datalsit);
				}).catch(err => {
					 uni.stopPullDownRefresh();
					this.data.hasmore = true;
					console.log(err);
				})
			},
			loadMore(currentpage) {
				if (this.data.hasmore) {
					console.log("加载更多")
					this.getlistdata(this.page);
				}
			},
			resetData() {
				this.data = {
					isLoading: false,
					hasmore: true,
					refreshText: "",
					loadingText: '加载更多...',
					datalsit: [],
					currrenIndex: -1
				};
				this.page = 1;
			},
			//详情回调函数
			detailBack(data) {
				console.log("回传数据呀--------------------");
				// console.log(data.item);
				if (this.currrenIndex != -1) {
					// this.data.datalsit[this.currrenIndex].favour = data.item.favour;
					// this.data.datalsit[this.currrenIndex].favourCount = data.item.favourCount;
					this.data.datalsit[this.currrenIndex] = data.item;
					this.$forceUpdate();
				}
				uni.$off('interation$detailback');
			},
			back() {
				console.log(uni.onBackPress())
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			this.resetData();
		    setTimeout(this.getlistdata(1), 5000);
		},

		onLoad() {



			// this.registerHandler('JS Echo', function(data, responseCallback) {
			// 	// bridgeLog('收到Android数据： ' + data);
			// 	uni.showToast({
			// 		title: '1收到Android数据： ' + data,

			// 	})
			// });
		},
		onShow() {
			this.systemInfo = getApp().globalData.systemInfo;
			this.statusBarHeight = Vue.config.configDic.statusBarHeight;

			// uni.showToast({
			// 	title:Vue.config.configDic.statusBarHeight,
			// });

			this.callHandler('ObjC Echo', {
				'key': 'onShow'
			});
			setTimeout(this.getlistdata(1), 5000);
		},
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.page {
		display: flex;
		flex-direction: column;
		height: 100%;

		.head {
			position: fixed;
			top: 0rpx;
			width: 100%;
			z-index: 500;
			background-image: linear-gradient(#D74819, #C7161E);

			.statusBar {
				height: $uni-status-height; //这里是无效的，不知为何  var(--status-bar-height)
				width: 100%;
			}

			.top {
				display: flex;
				justify-content: space-between;

				.icon_logo {
					width: 100upx;
					height: 40upx;
					flex-grow: 2;
					padding: $uni-spacing-row-base $uni-spacing-row-base;
				}

				.v_search {
					display: flex;
					flex-grow: 40;
					justify-content: center;

					.search {
						width: 100%;
						height: 50rpx;
						margin: 0rpx 10rpx;

					}

				}

				.top-right {
					width: 100rpx;
					display: flex;
					flex-grow: 1;
					right: $uni-spacing-row-base;
					top: $uni-spacing-row-base;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.top-right-icon {
						width: 40rpx;
						height: 40rpx;
						display: flex;
						justify-content: center;

					}

					.top-right-text {
						display: flex;
						justify-content: center;
						font-size: $uni-font-size-20;
					}
				}
			}

			.filter {
				width: 100%;
				height: 60rpx;
			}
		}

		// .top-zhanwei {
		// 	height: 190rpx;
		// }

		.list {
			// margin-top: 190rpx;
			height: 100%;
			width: 100%;

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

			.item {
				background: #FFFFFF;
				margin: 20rpx 3rpx;
				border-radius: 20rpx;

				.item-text {
					display: block;
				}

				.item-top {
					display: flex;
					flex-wrap: nowrap;
					padding-top: 5rpx;
					align-items: center;

					// .icon_head {
					// 	width: 50rpx;
					// 	height: 50rpx;
					// 	margin-left: 15rpx;
					// 	padding: $uni-spacing-row-base $uni-spacing-row-base;
					// }

					.circleicon {
						border-radius: 42.5rpx;
						margin: 20rpx;
						width: 85rpx;
						height: 85rpx;
						// background: url("../../static/logo.png") no-repeat center;
						background-size: 50px;
					}

					.info {
						display: flex;
						padding: 15rpx 10rpx;
						flex-direction: column;

						.info-bottom {
							display: flex;
							flex-direction: row;

							.number {
								margin-left: 20rpx;
							}
						}

						.name {
							color: #585858;
							font-size: $uni-font-size-name;
						}

						.time,
						.number {
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
					flex-direction: row;

					.item-image-image {
						margin: 0 20rpx;
						width: 30%;
						height: 200rpx;
					}
				}

				.bottom {
					display: flex;
					justify-content: flex-end;


					.bottom-right {
						display: flex;
						flex-direction: row;
						align-items: center;
						margin: 0 20rpx 20rpx 0;
					}

					.bottom-left {
						display: flex;
						flex-direction: row;
						align-items: center;
						margin: 0 5rpx 20rpx 0;
					}

					.bottom-icon-left,
					.bottom-icon-right {
						width: 25rpx;
						height: 25rpx;
						padding: $uni-spacing-row-base 5upx $uni-spacing-row-base 20upx;
					}

					.bottom-text {
						font-size: 25upx;
						color: #525252;
						margin-top: 2upx;
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


		}

		.cover-view {
			position: fixed;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			bottom: 60rpx;
			width: 40%;
			height: 70rpx;
			left: 0;
			right: 0;
			text-align: center;
			margin: auto;
			z-index: 99999;
			border-radius: 10rpx;
			background-image: linear-gradient(left, #D74819, #C7161E);

			.cover-view-image {
				height: 40rpx;
				width: 40rpx;
				text-align: center;
				margin-right: 5rpx;
			}

			.cover-view-text {
				color: #FFFFFF;
				font-size: 24rpx;
				margin-left: 5rpx;
			}
		}
	}
</style>
