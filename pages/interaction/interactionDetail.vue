<template>
	<view>
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
	</view>
</template>

<script>
	import chatInput from '../../components/comment/chatinput.vue'; //input框

	export default {
		components: {
			chatInput
		},
		data() {
			return {
				input_placeholder: '编辑评论', //占位内容
				focus: false, //是否自动聚焦输入框
				is_reply: false, //回复还是评论
				showInput: true, //评论输入框
				index: '-1',
				// comment_index: '',
				
				commentList:[{
					headImage:"../../static/logo.png",
					title:'我是书生',
					time:'11-14 15:26:25',
					commentImage:'../../static/message_black.png',
					content:'我觉得你图片发少了觉得你图片发少了觉得你图片发1234567890087654432245567787866了觉得你图片发少了觉得你图片发少了觉得你图片发少了',
					subComment:[],
				},
				{
					headImage:"../../static/logo.png",
					title:'解决了',
					time:'11-14 15:26:25',
					commentImage:'../../static/message_black.png',
					content:'我觉787866了觉得你图片发少了觉得你图片发少了觉得你图片发少了',
					subComment:[
						{name:'哈哈哈',
						content:'123京津冀哦哦哦哈哈哈哦哦哦哈哈哈哦哦哦哈哈哈'},
						{name:'啦啦啦',
						content:'哦哦哦哈哈哈'},
					],
				},
				{
					headImage:"../../static/logo.png",
					title:'你哈哈哈',
					time:'11-14 15:26:25',
					commentImage:'../../static/message_black.png',
					content:'我觉得你图片发少了觉得你图片发32245567787866了觉得你图片发少了觉得你图片发少了觉得你图片发少了',
					subComment:[
						{name:'哈哈哈',
						content:'123京津冀哦哦哦哈哈哈哦哦哦哈哈哈哦哦哦哈哈哈'},
					],
				},
				{
					headImage:"../../static/logo.png",
					title:'啊啊啊啊啊',
					time:'11-14 15:26:25',
					commentImage:'../../static/message_black.png',
					content:'我觉得你图片发少了觉得你图片发32245567787866了觉得你图片发少了觉得你图片发少了觉得你图片发少了',
					subComment:[
						{name:'哈哈哈',
						content:'123京津冀哦哦哦哈哈哈哦哦哦哈哈哈哦哦哦哈哈哈'},
					],
				},
				{
					headImage:"../../static/logo.png",
					title:'呃呃呃呃',
					time:'11-14 15:26:25',
					commentImage:'../../static/message_black.png',
					content:'我觉得你图片发少了觉得你图片发32245567787866了觉得你图片发少了觉得你图片发少了觉得你图片发少了',
					subComment:[
						{name:'哈哈哈',
						content:'123京津冀哦哦哦哈哈哈哦哦哦哈哈哈哦哦哦哈哈哈'},
					],
				}],
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
				if(this.platform === 'ios'){
					this.windowHeight = res.size.windowHeight;
					this.adjust();
				}else{
					if (this.screenHeight - res.size.windowHeight > 60 && this.windowHeight <= res.size.windowHeight) {
						this.windowHeight = res.size.windowHeight;
						this.adjust();
					}
				}
			});
		},
		methods: {
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
						name:'我',
						content:message.content,
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
	.comment-model {
		margin-bottom: 90rpx;
		.commentTitle {
			padding: 30rpx 20rpx 20rpx;
		}
		.commentBlock {
			border-top: 1px solid #EFEFEF;
			padding: 30rpx ;
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
				word-break:break-all;
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
