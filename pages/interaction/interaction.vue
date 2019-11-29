<!-- 互动专区 -->
<template>
	<view class="page">
		<view class="head">
			<view class="statusBar"></view>
			<view class="top">
				<image class="icon_logo" mode="aspectFit" src="../../static/logo_cetc.png"></image>
				<!-- 自定义Placeholder 搜索框 -->
				<view class="v_search">
					<uni-search-bar placeholder="关键字" radius="8" clearButton="auto" @confirm="search" class="search" />
				</view>
				<view class="top-right">
					<image class="top-right-icon" mode="aspectFit" src="../../static/message_white.png"></image>
					<!-- <text class="top-right-text" v-show='false' >消息</text> -->
				</view>
			</view>

			<view class="filter">
				<intertction-filter :independence="true" :color="titleColor" :themeColor="themeColor" :menuList.sync="menuList"
				 @result="result"></intertction-filter>
			</view>
		</view>
		<scroll-view scroll-y="true" class="list">
			<!-- 列表item -->
			<view class="item" v-for="(item, index) in itemlist" :key="index" @click="navToDetailPage(item)">
				<view class="item-top">
					<image class="icon_head circleicon" mode="aspectFill" src="../../static/logo.png"></image>
					<view class="info">
						<text class="item-text name">吕飞飞吕飞飞吕</text>
						<view class="info-bottom">
							<text class="item-text time">11-26</text>
							<text class="item-text number">350浏览</text>
						</view>
					</view>
				</view>
				<text class="item-text title">文章标题</text>
				<text class="item-text brief">文章简介简短的简介哦放假奥</text>
				<view class="item-image">
					<image class="item-image-image" mode="aspectFit" src="../../static/logo.png"></image>
					<image class="item-image-image" mode="aspectFit" src="../../static/logo.png"></image>
					<image class="item-image-image" mode="aspectFit" src="../../static/logo.png"></image>
				</view>
				<!-- 底部 -->
				<view class="bottom">
					<view class="bottom-left">
						<image class="bottom-icon-left" mode="aspectFit" src="../../static/zan_sec.png"></image>
						<text class="bottom-text">520</text>
					</view>
					<view class="bottom-right">
						<image class="bottom-icon-right" mode="aspectFit" src="../../static/message_black.png"></image>
						<text class="bottom-text">520</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue";
	import intertctionFilter from '@/components/sl-filter/intertction-filter.vue';
	export default {
		data() {
			return {
				itemlist: [{}, {}, {}, {}, {}, {}],
				themeColor: '#C7161E',
				titleColor: '#ffffff',
				filterResult: '',
				menuList: [{
						'title': '全部',
						'key': 'sort',
						'isSort': true,
						'reflexTitle': true,
						'detailList': [{
								'title': '全部',
								'value': ''
							},
							{
								'title': '业务资讯区',
								'value': 'add_time'
							},
							{
								'title': '需求资讯区',
								'value': 'wages_up'
							},
							{
								'title': '经验分享区',
								'value': 'location'
							}
						]
					}, {
						'title': '综合排序',
						'detailTitle': '请选择职位类型（可多选）',
						'isMutiple': false,
						'isSort': false,
						'key': 'jobType',
						'value': '123',
						'detailList': [{
							'title': '全部',
							'value': '123'
						}]

					},
					{
						'title': '按时间',
						'key': 'salary',
						'value': '456',
						'isMutiple': false,
						'isSort': false,
						'detailList': [{
							'title': '全部',
							'value': '456'
						}]

					},
					{
						'title': '按回复数',
						'key': 'single',
						'value': '789',
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
			trigger_sort(item) {
				console.log("value的值为：" + item.value);
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
			},
			result(val) {
				console.log('filter_result:' + JSON.stringify(val));
				this.filterResult = JSON.stringify(val, null, 2)
			}
		}
	}
</script>

<style lang="scss">
	.page {
		display: flex;
		flex-direction: column;

		.head {
			position: fixed;
<<<<<<< HEAD
			top: 0rpx;
=======
			z-index: 500;
>>>>>>> 3427972a4e76bb10ff367c973712ed6b92010588
			width: 100%;
			z-index: 500;
			background-image: linear-gradient(#D74819, #C7161E);

			.statusBar {
				height: 40upx;
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

		.list {
			margin-top: 190rpx;
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

					.icon_head {
						width: 50rpx;
						height: 50rpx;
						margin-left: 15rpx;
						padding: $uni-spacing-row-base $uni-spacing-row-base;
					}

					.circleicon {
						border-radius: 30px;
						padding: 15rpx;
						width: 50rpx;
						height: 50rpx;
						background: url("../../static/logo.png") no-repeat center;
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
							font-size: 20upx;
						}

						.time,
						.number {
							color: #8D8D8D;
							font-size: 15upx;
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
					font-size: 27upx;
				}

				.brief {
					color: #525252;
					font-size: 20upx;
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
						padding: $uni-spacing-row-base $uni-spacing-row-base;
					}

					.bottom-text {
						font-size: 20upx;
						color: #525252;
					}

				}
			}
		}
	}
</style>
