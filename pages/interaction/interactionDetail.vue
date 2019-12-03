<template>
	<view class="page">
		<view class="item">
			<view class="item-top">
				<image class="icon_head circleicon" mode="aspectFill" src="../../static/logo.png"></image>
				<view class="info">
					<text class="item-text name">吕飞飞吕飞飞吕</text>
					<view class="info-bottom">
						<text class="item-text time">11-26</text>
						<text class="item-text number">350浏览</text>
					</view>
				</view>
				<view class="item-top-collect" @click="collect">
					<image class="collect-icon" mode="aspectFit" src="../../static/sc_sec.png"></image>
					<text class="collect-text">收藏</text>
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
				<view class="bottom-left" @click="niubi('topicid')">
					<image class="bottom-icon-left" mode="aspectFit" src="../../static/zan_sec.png"></image>
					<text class="bottom-text">520</text>
				</view>
				<view class="bottom-right" @click="topiccomment('topicid')">
					<image class="bottom-icon-right" mode="aspectFit" src="../../static/message_black.png"></image>
					<text class="bottom-text">520</text>
				</view>
			</view>
		</view>
		<!-- 评论 -->
		<view class="comment-model">
			<view class="commentTitle">用户评论</view>
			<view class="commentBlock" v-for="(item,index) in commentList" :key="index">
				<view class="headModel" :id="'commentList-'+index">
					<image class="headImage" :src="item.headImage" mode="scaleToFill"></image>
					<view class="headPart">
						<view class="headPartName">{{item.title}}</view>
						<view class="headPartTime">{{item.time}}</view>
					</view>
					<image class="replyImage" :src="item.commentImage" mode="scaleToFill" @tap="reply(index,item.title)"></image>
				</view>
				<view class="replyContent">{{item.content}}</view>
				<view v-if="item.subComment.length > 0" class="subContent">
					<view v-for="(subItem,subIndex) in item.subComment" :key="subIndex">
						<text class="subContentName">{{subItem.name}}</text>
						<text class="subContentContent">：{{subItem.content}}</text>
					</view>
				</view>
			</view>
		</view>
		
		
		<view class="foot" v-show="showInput">
			<chat-input @send-message="send_comment" @blur="blur" :focus="focus" :placeholder="input_placeholder"></chat-input>
		</view>

		<!-- 插屏弹窗 -->
		<uni-popup :show="showimage" :type="type" :mask-click="true" @change="change">
			<view class="uni-image">
				<view class="pop_view">
					<image class="image popcontent" src="/static/collection_success.png" mode="scaleToFill" />
					<text class="pop-view-success popcontent">收藏成功</text>
					<text class="pop-view-success-text popcontent">通过我的收藏里进行查看</text>
					<view class="pop_bt popcontent">
					<button class="pop_btn" @click="lookCollection">立即查看</button>
					</view>
				</view>
		
		
				<view class="uni-image-close" @click="cancel('image')">
					<uni-icons type="clear" color="#fff" size="30" />
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import chatInput from '../../components/comment/chatinput.vue'; //input框
	import uniPopup from '@/components/lib/uni-popup/uni-popup.vue';
	import uniIcons from '@/components/lib/uni-icons/uni-icons.vue'
	export default {
		components: {
			chatInput,
			uniPopup,
			uniIcons
		},
		data() {
			return {
				showimage: false,
				type: '',
				content: '顶部弹 popup',
				input_placeholder: '编辑评论', //占位内容
				focus: false, //是否自动聚焦输入框
				is_reply: false, //回复还是评论
				showInput: true, //评论输入框
				index: '-1',
				// comment_index: '',

				commentList: [{
						headImage: "../../static/logo.png",
						title: '我是书生',
						time: '11-14 15:26:25',
						commentImage: '../../static/message_black.png',
						content: '我觉得你图片发少了觉得你图片发少了觉得你图片发1234567890087654432245567787866了觉得你图片发少了觉得你图片发少了觉得你图片发少了',
						subComment: [],
					},
					{
						headImage: "../../static/logo.png",
						title: '解决了',
						time: '11-14 15:26:25',
						commentImage: '../../static/message_black.png',
						content: '我觉787866了觉得你图片发少了觉得你图片发少了觉得你图片发少了',
						subComment: [{
								name: '哈哈哈',
								content: '123京津冀哦哦哦哈哈哈哦哦哦哈哈哈哦哦哦哈哈哈'
							},
							{
								name: '啦啦啦',
								content: '哦哦哦哈哈哈'
							},
						],
					},
					{
						headImage: "../../static/logo.png",
						title: '你哈哈哈',
						time: '11-14 15:26:25',
						commentImage: '../../static/message_black.png',
						content: '我觉得你图片发少了觉得你图片发32245567787866了觉得你图片发少了觉得你图片发少了觉得你图片发少了',
						subComment: [{
							name: '哈哈哈',
							content: '123京津冀哦哦哦哈哈哈哦哦哦哈哈哈哦哦哦哈哈哈'
						}, ],
					},
					{
						headImage: "../../static/logo.png",
						title: '啊啊啊啊啊',
						time: '11-14 15:26:25',
						commentImage: '../../static/message_black.png',
						content: '我觉得你图片发少了觉得你图片发32245567787866了觉得你图片发少了觉得你图片发少了觉得你图片发少了',
						subComment: [{
							name: '哈哈哈',
							content: '123京津冀哦哦哦哈哈哈哦哦哦哈哈哈哦哦哦哈哈哈'
						}, ],
					},
					{
						headImage: "../../static/logo.png",
						title: '呃呃呃呃',
						time: '11-14 15:26:25',
						commentImage: '../../static/message_black.png',
						content: '我觉得你图片发少了觉得你图片发32245567787866了觉得你图片发少了觉得你图片发少了觉得你图片发少了',
						subComment: [{
							name: '哈哈哈',
							content: '123京津冀哦哦哦哈哈哈哦哦哦哈哈哈哦哦哦哈哈哈'
						}, ],
					}
				],
			};
		},
		onLoad() {
			uni.getSystemInfo({ //获取设备信息
				success: (res) => {
					this.screenHeight = res.screenHeight;
					this.platform = res.platform;
				}
			});
			uni.startPullDownRefresh();
		},
		onShow() {
			uni.onWindowResize((res) => { //监听窗口尺寸变化,窗口尺寸不包括底部导航栏
				if (this.platform === 'ios') {
					this.windowHeight = res.size.windowHeight;
					this.adjust();
				} else {
					if (this.screenHeight - res.size.windowHeight > 60 && this.windowHeight <= res.size.windowHeight) {
						this.windowHeight = res.size.windowHeight;
						this.adjust();
					}
				}
			});
		},
		methods: {
			collect() {
				console.log("收藏成功");
				this.togglePopup('center', 'image');
			},
			// 收藏成功后立即查看
			lookCollection(o){
				this.showimage = false;
				
			},
			// 评论
			topiccomment(topicid){
				console.log(topicid);
				
			},
			// 点赞
			niubi(topicid){
				console.log(topicid);
			},
			togglePopup(type, open) {
				this.type = type
				this['show' + open] = true
			},
			cancel(type) {
				this['show' + type] = false
			},
			change(e) {
				console.log('是否打开:' + e.show)
				if (!e.show) {
					this.showimage = false
				}
			},
			comment(index) {
				this.showInput = true; //调起input框
				this.is_reply = false; //
				this.showInput = true; //调起input框
				this.input_placeholder = '编辑评论';
				this.index = index; //回复索引
				this.focus = true;
			},
			adjust() { //当弹出软键盘发生评论动作时,调整页面位置pageScrollTo
				return;
				// 	uni.createSelectorQuery().selectViewport().scrollOffset(res => {
				// 		var scrollTop = res.scrollTop;
				// 		let view = uni.createSelectorQuery().select("#commentList-" + this.index);
				// 		view.boundingClientRect(data => {
				// 			console.log("data:" + JSON.stringify(data));
				// 			console.log("手机屏幕高度:" + this.screenHeight);
				// 			console.log("竖直滚动位置" + scrollTop);
				// 			console.log("节点离页面顶部的距离为" + data.top);
				// 			console.log("节点高度为" + data.height);
				// 			console.log("窗口高度为" + this.windowHeight);

				// 			uni.pageScrollTo({
				// 				// scrollTop: scrollTop - (this.windowHeight - (data.height + data.top + 45)), //一顿乱算
				// 				scrollTop: 50, 
				// 				duration: 300
				// 			});
				// 		}).exec();
				// 	}).exec();
			},
			reply(index, subReplyName) {
				this.is_reply = true; //回复中
				this.showInput = true; //调起input框
				this.input_placeholder = '回复' + subReplyName;
				this.index = index; //回复索引
				this.focus = true;
			},
			blur: function() {
				this.init_input();
			},
			send_comment: function(message) {
				if (this.is_reply) {
					// sub回复 (调接口成功后，更新页面)
					var replyDic = {
						name: '我',
						content: message.content,
					};

					console.log(this.commentList[this.index].subComment);
					this.commentList[this.index].subComment.push(replyDic);
					console.log(this.commentList[this.index].subComment);
				} else {
					// 总评论 （调接口）
					// var comment_content = message.content;
				}
				this.init_input();
			},
			init_input() {
				this.showInput = true;
				// this.focus = false;
				// this.input_placeholder = '编辑评论';
				// this.is_reply = false;
			},
		}
	}
</script>

<style lang="scss">
	/* 插屏广告 */
	.uni-image {
		position: relative;
		z-index: 9999;
	}
	
	.pop_view {
		display: flex;
		flex-direction: column;
	
		.popcontent {
			width: 70vw;
			background-color: #FFFFFF;
			border: 0;
		}
	
		.image {
			width: 70vw;
			height: 19vh;
			background: #FFFFFF;
		}
	
		.pop-view-success {
			display: flex;
			height: 80px;
			color: #C7161E;
			font: 28px;
			font-weight: bold;
			justify-content: center;
			align-items: center;
			border: 0;
	
		}
	
		.pop-view-success-text {
			display: flex;
			color: #666666;
			font: 19px;
			justify-content: center;
			align-items: center;
		}
	
		.pop_bt {
			display: flex;
			color: #666666;
			font: 19px;
			padding: 10px 0 15px 0;
			justify-content: center;
			align-items: center;
			border: 0;
			.pop_btn{
				display: flex;
				height: 70upx;
				width: 50%;
				align-items: center;
				justify-content: center;
				color: #FFFFFF;
				font-size: $uni-font-size-article-brief;
				background-image: linear-gradient(left,#D74819, #C7161E);
				border-radius: 40upx;
			}
		}
	}
	
	
	.uni-image-close {
		margin-top: 20px;
		text-align: center;
	}
	.page {
	
		.item {
			background: #FFFFFF;

			.item-text {
				display: block;
			}

			.item-top {
				display: flex;
				flex-wrap: nowrap;
				align-items: center;

				.circleicon {
					border-radius: 30px;
					padding: 15rpx;
					margin: 20rpx;
					width: 50rpx;
					height: 50rpx;
					background: url("../../static/logo.png") no-repeat center;
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
					border: 1px solid #D74819;
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

					.collect-text {
						font-size: 25upx;
						color: #D74819;
						margin-left: 5upx;
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
	}

	.comment-model {
		margin-bottom: 90rpx;
		background: #FFFFFF;

		.commentTitle {
			padding: 30rpx 20rpx 20rpx;
		}

		.commentBlock {
			border-top: 1px solid #EFEFEF;
			padding: 30rpx;

			.headModel {
				display: flex;
				align-items: center;

				.headImage {
					width: 85rpx;
					height: 85rpx;
					border-radius: 42.5rpx;
				}

				.headPart {
					padding-left: 20rpx;
					width: 530rpx;

					.headPartName {
						color: #585858;
					}

					.headPartTime {
						color: #8D8D8D;
					}
				}

				.replyImage {
					width: 32rpx;
					height: 26rpx;
				}
			}

			.replyContent {
				color: #282828;
				margin: 20rpx 20rpx 20rpx 105rpx;
				white-space: pre-wrap;
				word-break: break-all;
			}

			.subContent {
				margin: 20rpx 20rpx 30rpx 105rpx;
				background: #E7E7E7;
				padding: 10rpx 20rpx;
				border-radius: 15rpx;

				.subContentName {
					color: #C91E25;
				}

				.subContentContent {
					color: #272829;
				}
			}
		}
	}

	.foot {
		position: fixed;
		width: 100%;
		height: 90rpx;
		left: 0rpx;
		bottom: 0rpx;
		// overflow: hidden;
	}
</style>
