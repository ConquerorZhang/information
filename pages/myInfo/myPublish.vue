<!-- 
我的发布  我的回答  回复我的
 -->

<template>
	<view class="page">
		<view class="top">
			<view class="statusBar"></view>
			<!-- 自定义导航 -->
			<view class="navBar">
				<view class="left-icon" @click="back">
					<uni-icons background-color="#FFFFFF" color="#333333" type="arrowleft" size="24" />
				</view>
				<view class="content">
					<radio-group @change="radioChange">
						<label v-for="(item,index) in labelList" :class="item.checked?'selectBox':'checkbox'" @click="labelBtn(item.value,index)"
						 :key="item.value">
							<radio :value="item.value" :checked="item.checked" v-show="false" />{{item.name}}
						</label>
					</radio-group>
				</view>
			</view>

			<!-- 过滤器 -->
			<view class="filter">
				<myPublishfilter :independence="true" :color="titleColor" :themeColor="themeColor" :menuList.sync="menuList"
				 @result="result"></myPublishfilter>
			</view>
		</view>
		<!-- 列表 -->
		<scroll-view scroll-y="true" class="list">
			<!-- 列表item  我的发布-->
			<view class="item-one" v-if="data.type=='1'">
				<view class="item" v-for="(item, index) in data.itemlist" :key="index">
					<view class="item-top" >
						<image class="icon_head circleicon" mode="aspectFill" src="../../static/logo.png" @click="navToDetailPage(item)"></image>
						<view class="info" @click="navToDetailPage(item)">
							<text class="item-text name">吕飞飞吕飞飞吕</text>
							<view class="info-bottom">
								<text class="item-text time">11-26</text>
								<text class="item-text number">350浏览</text>
							</view>
						</view>
						<view class="item-top-collect" @click="collect">
							<image class="collect-icon" mode="aspectFit" src="../../static/black_dot.png"></image>
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
						<view class="bottom-left" @click.stop="niubi('topicid')">
							<image class="bottom-icon-left" mode="aspectFit" src="../../static/zan_sec.png"></image>
							<text class="bottom-text">520</text>
						</view>
						<view class="bottom-right" @click.stop="topiccomment('topicid')">
							<image class="bottom-icon-right" mode="aspectFit" src="../../static/message_black.png"></image>
							<text class="bottom-text">520</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 列表item  我的回答-->
			<view class="item-two" v-else-if="data.type=='2'">
				<view class="item" v-for="(item, index) in data.itemlist" :key="index" >
					<view class="item-top">
						<view class="item-head-icon" @click="navToDetailPage(item)">
							<image class="circleicon" mode="aspectFill" src="../../static/logo.png"></image>
						</view>
						<view class="info" @click="navToDetailPage(item)">
							<text class="item-text name">吕飞飞吕飞飞吕</text>
							<view class="info-bottom">
								<text class="item-text content">这里是帖子内容，内容可能是很长的一段文字哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</text>
							</view>
						</view>
						<view class="item-top-collect" @click="collect">
							<image class="collect-icon" mode="aspectFit" src="../../static/black_dot.png"></image>
						</view>
					</view>

					<view class="comment">
						<view class="comment-title">
							<text class="item-text title">我：</text>
						</view>
						<text class="item-text brief">这里是我的评论呀评论很长很长哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈 </text>
					</view>

					<view class="item-date">
						<text class="item-date-text">2019-11-4</text>
					</view>

				</view>
			</view>
			<!-- 列表item  回复我的-->
			<view class="item-three" v-else-if="data.type=='3'">

				<view class="item" v-for="(item, index) in data.itemlist" :key="index" >
					<view class="item-top" >
						<view class="item-head-icon" @click="navToDetailPage(item)">
							<image class="circleicon" mode="aspectFill" src="../../static/logo.png"></image>
						</view>
						<view class="info" @click="navToDetailPage(item)">
							<text class="item-text name">吕飞飞吕飞飞吕</text>
							<view class="info-bottom">
								<text class="item-text time">11-26</text>
								<text class="item-text number" v-show="false">350浏览</text>
							</view>
						</view>
						<view class="item-top-collect" @click="collect">
							<image class="collect-icon" mode="aspectFit" src="../../static/black_dot.png"></image>
						</view>
					</view>

					<view class="item-replycontent">
						<text class="item-replycontent-text">这是回复我的内容</text>
						<view class="item-reply-good">
							<image class="bottom-icon-left" mode="aspectFit" src="../../static/respond_orange.png"></image>
							<text class="bottom-text">赞了我的帖子</text>
						</view>
					</view>

					<view class="comment">
						<view class="comment-title">
							<text class="item-text title">我的帖子：</text>
						</view>
						<text class="item-text brief">这里是我的评论呀评论很长很长哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈 </text>
					</view>

				</view>
			</view>
		</scroll-view>
		<uni-popup :show="showpopup" type="bottom" @change="change">
			<view class="bottom-pop">
				<text class="popup-content delete" @click="delete_" id="789">删除该回复</text>
				<text class="popup-content" @click="cancel">取消</text>
			</view>
			
			
		</uni-popup>
	</view>
</template>

<script>
	
	import myPublishfilter from '@/components/sl-filter/myPublish-filter.vue';
	// import uniPopup from '@/components/lib/uni-popup/uni-popup.vue';
	// import uniIcons from '@/components/lib/uni-icons/uni-icons.vue';

	export default {
		components: {
			
			myPublishfilter
			// uniIcons,
			// uniPopup
		},
		data() {
			return {
				showpopup:false,
				data: {
					type: '2',
					itemlist: [{}, {}, {}, {}, {}, {}]
				},
				labelName: '',
				labelDataList: 0,
				labelList: [{
						value: 'USA',
						name: '我的发布',
						checked: true
					},
					{
						value: 'CHN',
						name: '我的回答',
						checked: false
					},
					{
						value: 'BRA',
						name: '回复我的',
						checked: false
					}
				],
				themeColor: '#333',
				titleColor: '#333',
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
			}
		},
		methods: {
			radioChange: function(e) {
				this.labelDataList = e.detail.value
				console.log(e)
				console.log('radio发生change事件，携带value值为：' + e.detail.value)
				console.log(this.labelDataList, "labelDataList")
			},
			labelBtn(name, index) {
				console.log(name, index, "nameindex")
				this.labelName = name
				for (let i in this.labelList) {
					this.labelList[i].checked = false;
				}
				this.labelList[index].checked = true
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			//筛选菜单返回结果
			result(val) {
				console.log('filter_result:' + JSON.stringify(val));
				this.filterResult = JSON.stringify(val, null, 2)
			},
			//点击小黑点
			collect() {
				console.log("收藏成功");
				// this.togglePopup('center', 'image');
				this.showpopup = true;
			},
			//页面跳转到详情
			navToDetailPage(item) {

				uni.navigateTo({
					url: '/pages/interaction/interactionDetail'
				})
			},
			//删除评论的弹窗变化
			change(e) {
				console.log('是否打开:' + e.show)
				if (!e.show) {
					this.showpopup = false
				}
			},
			//删除回复
			 delete_:function (e) {
				console.log('删除成功');
				this.showpopup = false;
				console.log(e)
			},
			//去掉关闭弹窗
			cancel(e){
				console.log('取消');
				console.log(e);
				this.showpopup = false;
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F1F1F1;
	}

	.page {
		display: flex;
		flex-direction: column;

		.top {
			position: fixed;
			top: 0;
			width: 100%;
			z-index: 500;
			display: flex;
			flex-direction: column;

			.statusBar {
				height: 45upx;
				width: 100%;
				background-color: #FFFFFF;
			}

			.navBar {
				width: 100%;
				height: 90upx;
				display: flex;
				flex-direction: row;
				background-color: #FFFFFF;

				.left-icon {
					display: flex;
					height: 100%;
					width: 50upx;
					padding: 0 10px;
					align-items: center;
				}

				.content {
					width: 100%;
					height: 100%;
					// border: 1px solid #1AAD19;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;

					.selectBox {
						flex-grow: 1;
						padding: 0px 10px;
						// border: 1px solid #EB5248;
						font-weight: bold;
						color: #333;
					}

					.checkbox {
						flex-grow: 1;
						padding: 0px 10px;
						// border: 1px solid #EB5248;
						color: #333;
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

			.item-one .item {
				background: #FFFFFF;
				margin: 20rpx 3rpx;
				border-radius: 20rpx;

				.item-text {
					display: block;
				}

				.item-top {
					display: flex;
					flex-wrap: nowrap;
					align-items: center;

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
						flex-grow: 10;

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

					.item-top-collect {
						display: flex;
						border-radius: 30upx;
						width: 120upx;
						height: 40upx;
						align-items: center;
						justify-content: center;
						margin-right: 20upx;

						.collect-icon {
							width: 30upx;
							height: 30upx;
							margin-right: 5upx;
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
						font-size: 20upx;
						color: #525252;
					}

				}
			}

			// 我的回答布局样式
			.item-two .item {

				background: #FFFFFF;
				margin: 20rpx 3rpx;
				border-radius: 20rpx;
				display: flex;
				flex-direction: column;

				.item-text {
					display: block;
				}

				.item-top {
					display: flex;
					flex-wrap: nowrap;
					align-items: center;
					flex-direction: row;
					align-items: flex-start;

					.item-head-icon {
						width: 100rpx;
						height: 100rpx;

						.circleicon {
							border-radius: 42.5rpx;
							margin: 20rpx;
							width: 85rpx;
							height: 85rpx;
							flex-grow: 2;
						}
					}

					.info {
						display: flex;
						padding: 15rpx 10rpx;
						flex-direction: column;
						flex-grow: 10;

						.name {
							margin-left: 10rpx;
							color: #585858;
							font-size: $uni-font-size-name;
						}

						.info-bottom {
							display: flex;
							flex-direction: row;

							.content {
								color: #585858;
								font-size: $uni-font-size-name;
								margin-left: 10rpx;
								display: -webkit-box;
								/** 对象作为伸缩盒子模型显示 **/
								-webkit-line-clamp: 5;
								overflow: hidden;
								text-overflow: ellipsis;
								-webkit-box-orient: vertical;
							}
						}

					}

					.item-top-collect {
						display: flex;
						border-radius: 30upx;
						width: 120upx;
						height: 40upx;
						align-items: center;
						justify-content: center;
						margin: 15upx 20upx 0 0;

						.collect-icon {
							width: 30upx;
							height: 30upx;
							margin-right: 5upx;
						}
					}
				}

				.comment {
					display: flex;
					flex-direction: row;
					align-items: flex-start;
					margin: 0 20rpx 20rpx 20rpx;
					border-radius: 10rpx;
					background: #F1F1F1;
					padding: 15rpx;

					.comment-title {
						width: 200rpx;

						.title {
							color: #007AFF;
							line-height: 1.6em;
							font-size: $uni-font-size-article-brief;
						}
					}

					.brief {
						line-height: 1.6em;
						display: -webkit-box;
						/** 对象作为伸缩盒子模型显示 **/
						-webkit-line-clamp: 5;
						overflow: hidden;
						text-overflow: ellipsis;
						-webkit-box-orient: vertical;
					}



					.brief {
						color: #525252;
						font-size: $uni-font-size-article-brief;
					}

				}

				.item-date {
					margin: 0 20rpx 20rpx 35rpx;

					.item-date-text {
						color: #8D8D8D;
						font-size: $uni-font-size-time;
					}
				}
			}

			//回复我的布局样式
			.item-three .item {
				background: #FFFFFF;
				margin: 20rpx 3rpx;
				border-radius: 20rpx;
				display: flex;
				flex-direction: column;

				.item-text {
					display: block;
				}

				.item-top {
					display: flex;
					flex-wrap: nowrap;
					align-items: center;
					flex-direction: row;
					align-items: flex-start;

					.item-head-icon {
						width: 100rpx;
						height: 100rpx;

						.circleicon {
							border-radius: 42.5rpx;
							margin: 20rpx;
							width: 85rpx;
							height: 85rpx;
							flex-grow: 2;
						}
					}


					.info {
						display: flex;
						padding: 15rpx 10rpx;
						flex-direction: column;
						flex-grow: 10;

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

					.item-top-collect {
						display: flex;
						border-radius: 30upx;
						width: 120upx;
						height: 40upx;
						align-items: center;
						justify-content: center;
						margin: 15upx 20upx 0 0;

						.collect-icon {
							width: 30upx;
							height: 30upx;
							margin-right: 5upx;
						}
					}
				}

				.item-replycontent {
					margin: 0 20rpx 20rpx 25rpx;
					display: flex;
					flex-direction: column;


					.item-replycontent-text {
						color: #333333;
						font-size: $uni-font-size-name;
					}

					.item-reply-good {
						display: flex;
						flex-direction: row;
						margin-left: -10rpx;
						align-items: center;

						.bottom-icon-left {
							width: 40rpx;
							height: 40rpx;
							padding: $uni-spacing-row-base 5upx $uni-spacing-row-base 20upx;
						}

						.bottom-text {
							font-size: $uni-font-size-name;
							color: #525252;
						}
					}
				}

				.comment {
					display: flex;
					flex-direction: row;
					align-items: flex-start;
					margin: 0 20rpx 20rpx 20rpx;
					padding: 15rpx;
					border-radius: 10rpx;
					background: #F1F1F1;

					.comment-title {
						width: 280rpx;

						.title {
							color: #525252;
							line-height: 1.6em;
							font-size: $uni-font-size-article-brief;
						}
					}

					.brief {
						margin: 0 0 15rpx 0;
						line-height: 1.6em;
						display: -webkit-box;
						/** 对象作为伸缩盒子模型显示 **/
						-webkit-line-clamp: 5;
						overflow: hidden;
						text-overflow: ellipsis;
						-webkit-box-orient: vertical;
						font-size: $uni-font-size-article-brief;
						color: #007AFF;
					}

				}

			}
		}
		
		.bottom-pop{
			display: flex;
			flex-direction: column;
			background: #f1f1f1;
			
			.popup-content {
				/* #ifndef APP-NVUE */
				display: block;
				/* #endif */
				background-color: #fff;
				padding: 15px;
				font-size: $uni-font-size-name;
				text-align: center;
			}
			
			.delete{
				color: #C7161E;
				margin-bottom: 10rpx;
			}
			
		}
		
	}
</style>
