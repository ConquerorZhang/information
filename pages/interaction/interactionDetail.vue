<template>
	<view class="page">
		<view class="item">
			<view class="item-top">
				<image class="circleicon" mode="aspectFill" :src="detailData.avatarUrl"></image>
				<view class="info">
					<text class="item-text name">{{detailData.createName}}</text>
					<view class="info-bottom">
						<text class="item-text time">{{detailData.createTime}}</text>
						<text class="item-text number">{{detailData.visitCountShow}}</text>
					</view>
				</view>
				<view class="item-top-collect" :class="detailData.collect ? 'item-top-collect-color' : 'item-top-uncollect-color'"
				 @click="detailData.collect?Uncollect():collect()">
					<image class="collect-icon" mode="aspectFit" :src='detailData.collect ? "../../static/sc_sec.png" : "../../static/sc.png"'></image>
					<text class="collect-text">收藏</text>
				</view>
			</view>
			<text class="item-text title">{{detailData.title}}</text>
			<text class="item-text brief">{{detailData.contents}}</text>
			<view class="item-image">
				<block v-for="(itemImage,indexImage) in detailData.pics" :key="indexImage">
					<image class="item-image-image" mode="scaleToFill" :src="itemImage" @tap="previewImage(detailData.pics,indexImage)"></image>
				</block>
			</view>

			<!-- 底部 -->
			<view class="bottom">
				<view class="bottom-left" @click="detailData.favour?unniubi():niubi()">
					<image class="bottom-icon-left" mode="aspectFit" :src='detailData.favour ? "../../static/zan_sec.png" : "../../static/zan.png"'></image>
					<text class="bottom-text" :class="detailData.favour ? 'bottom-red-text' : 'bottom-gray-text'">{{detailData.favourCount}}</text>
				</view>
				<view class="bottom-right" @click="comment(-1)">
					<image class="bottom-icon-right" mode="aspectFit" src="../../static/message_black.png"></image>
					<text class="bottom-text">{{detailData.replyCount}}</text>
				</view>
			</view>
		</view>
		<!-- 评论 -->
		<view class="comment-model">
			<view class="commentTitle">用户评论</view>
			<view class="emptyView" v-if="commentList.length == 0">
				<image class="emptyImage" src="../../static/interaction/commentEmpty.png" mode="widthFix"></image>
				<view class="emptyText">还没有人评论哦～</view>
			</view>
			<view class="commentBlock" v-for="(item,index) in commentList" :key="index">
				<view class="headModel" :id="'commentList-'+index">
					<image class="headImage" :src="item.avatarUrl" mode="scaleToFill"></image>
					<view class="headPart">
						<view class="headPartName">{{item.createName}}</view>
						<view class="headPartTime">{{item.createTime}}</view>
					</view>
					<image class="replyImage" src="../../static/message_black.png" mode="scaleToFill" @tap="reply(index,item.id,item.title)"></image>
				</view>
				<view class="replyContent">{{item.contents}}</view>
				<view v-if="item.subComments.length > 0" class="subContent">
					<view v-for="(subItem,subIndex) in item.subComments" :key="subIndex">
						<text class="subContentName">{{subItem.createName}}</text>
						<text class="subContentContent">：{{subItem.contents}}</text>
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
	const API = require('../../common/api.js')

	import chatInput from '../../components/comment/chatinput.vue'; //input框
	// import uniPopup from '@/components/lib/uni-popup/uni-popup.vue';
	// import uniIcons from '@/components/lib/uni-icons/uni-icons.vue'
	export default {
		components: {
			chatInput,
			// uniPopup,
			// uniIcons
		},
		data() {
			return {
				item:'',
				id: '',
				detailData: {
					favour:false
				},
				showimage: false,
				type: '',
				content: '顶部弹 popup',
				input_placeholder: '编辑评论', //占位内容
				focus: false, //是否自动聚焦输入框
				is_reply: false, //回复还是评论
				showInput: true, //评论输入框
				index: '-1',
				// comment_index: '',
				commentList: [],
				parentId: '', //如果是评论帖子，则为空，如果是评论评论，那位被评论的id
			};
		},
		onLoad(option) {
			console.log("-----pages:"+getCurrentPages())
			console.log(option);
			// console.log(JSON.parse(option.item).id)
			this.item = JSON.parse(option.item);
			if(!this.isEmpty(option.idkey) && option.idkey == 'id'){
				this.id = this.item.id;
			}else if(!this.isEmpty(option.idkey) && option.idkey == 'bizkey'){
				this.id = this.item.bizkey;
			}else{
				this.id = this.item.id;
			}
			uni.getSystemInfo({ //获取设备信息
				success: (res) => {
					this.screenHeight = res.screenHeight;
					this.platform = res.platform;
				}
			});
			uni.startPullDownRefresh();

			// 请求数据
			API.interDetail({
				id: this.id
			}).then(res => {
				console.log(res);
				this.detailData = res.data.data;
			}).catch(err => {
				console.log(err);
			})

			// 评论列表
			this.commentData();
		},
		onBackPress(){
			uni.$emit('interation$detailback',{'item':this.item})
		},
		onShow() {
			this.callHandler('ObjC Echo',{
				'key': 'inner'
			});
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
			commentData() {
				// 评论列表
				API.interCommentList({
					issueid: this.id
				}).then(res => {
					console.log(res);
					this.commentList = res.data.data;
				
				}).catch(err => {
					console.log(err);
				})
			},
			previewImage(imageList, indexImage) { //预览图片
				uni.previewImage({
					urls: imageList,
					current: imageList[indexImage]
				});
			},
			collect() {
				console.log("收藏成功");
				// 收藏
				API.interactionCollect({
					bizKey: this.id,
					collectType:'issue'
				}).then(res => {
					console.log(res);
					if(res.data.code == '0'){
						console.log(this.detailData.collect);
						this.detailData.collect = !this.detailData.collect;
						console.log(this.detailData.collect);
						// this.togglePopup('center', 'image');
						setTimeout(()=>{
							 this.togglePopup('center', 'image');
						},500)
					}
					
					// this.commentData();
				}).catch(err => {
					console.log(err);
				})
			},
			Uncollect() {
				console.log("取消收藏");
				// this.togglePopup('center', 'image');
				
				// 取消收藏
				API.interactionUnCollect({
					bizkey: this.id,
					collecttype:'issue'
				}).then(res => {
					console.log(res);
					if(res.data.code == '0'){
						console.log(this.detailData.favour);
						this.detailData.collect = !this.detailData.collect;
					}
					
					// this.commentData();
				}).catch(err => {
					console.log(err);
				})
			},
			// 收藏成功后立即查看
			lookCollection(o) {
				this.showimage = false;
				uni.navigateTo({
					url:'../myInfo/myCollection?index=1'
				})
			},
			// 点赞
			niubi() {
				API.interactionFavour({
					id: this.id,
					type:'issue'
				}).then(res => {
					console.log(res);
					if(res.data.code == '0'){
						console.log(this.detailData.favour);
						this.detailData.favour = !this.detailData.favour;
						this.detailData.favourCount +=1;
						this.item.favour = this.detailData.favour;
						this.item.favourCount = this.detailData.favourCount;
					}
					
					// this.commentData();
				}).catch(err => {
					console.log(err);
				})
			},
			unniubi(){
				// 取消点赞
				API.interactionUnFavour({
					id: this.id,
					type:'issue'
				}).then(res => {
					console.log(res);
					if(res.data.code == '0'){
						console.log(this.detailData.favour);
						this.detailData.favour = !this.detailData.favour;
						this.detailData.favourCount -=1;
						this.item.favour = this.detailData.favour;
						this.item.favourCount = this.detailData.favourCount;
					}
					
					// this.commentData();
				}).catch(err => {
					console.log(err);
				})
			},
			togglePopup(type, open) {
				this.type = type
				this['show' + open] = true

				// this.detailData.collect = !this.detailData.collect;
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
			comment(index) {
				this.showInput = true; //调起input框
				this.is_reply = false; //
				this.showInput = true; //调起input框
				this.input_placeholder = '编辑评论';
				this.index = index; //回复索引
				this.focus = true;
			},
			reply(index, parentId, subReplyName) {
				this.is_reply = true; //回复中
				this.showInput = true; //调起input框
				this.input_placeholder = '回复' + subReplyName;
				this.index = index; //回复索引
				this.focus = true;
				this.parentId = parentId;
			},
			blur: function() {
				this.init_input();
			},
			send_comment: function(message) {
				console.log(message);
				if (this.is_reply) {
					// sub回复 (调接口成功后，更新页面)
					var replyDic = {
						createName: '我',
						contents: message.content,
					};

					API.interCommentReply({
						commentType: 'issue',
						contents: message.content,
						bizKey: this.id,
						parentId: this.parentId,
					}).then(res => {
						console.log(res);

						this.commentList[this.index].subComments.push(replyDic);
						console.log(this.commentList);
					}).catch(err => {
						console.log(err);
					})
				} else {
					// 总评论 （调接口）
					API.interCommentReply({
						commentType: 'issue',
						contents: message.content,
						bizKey: this.id,
						parentId: '',
					}).then(res => {
						console.log(res);
						
						this.commentData();
					}).catch(err => {
						console.log(err);
					})
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
	page {
		background: #FFFFFF;
	}

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

			.pop_btn {
				display: flex;
				height: 70upx;
				width: 50%;
				align-items: center;
				justify-content: center;
				color: #FFFFFF;
				font-size: $uni-font-size-article-brief;
				background-image: linear-gradient(left, #D74819, #C7161E);
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
						align-items: center;
						height: 30rpx;
						line-height: 30rpx;

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

					.collect-text {
						font-size: 25upx;
						margin-left: 5upx;
					}
				}

				.item-top-collect-color {
					border: 1px solid #D74819;
					color: #D74819;
				}

				.item-top-uncollect-color {
					border: 1px solid #909192;
					color: #909192;
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
					width: 30rpx;
					height: 35rpx;
					padding: $uni-spacing-row-base 5upx $uni-spacing-row-base 20upx;
				}

				.bottom-text {
					font-size: 30upx;
				}

				.bottom-red-text {
					color: #D74819;
				}

				.bottom-gray-text {
					color: #525252;
				}
			}
		}
	}

	.comment-model {
		padding-bottom: 90rpx;
		background: #FFFFFF;
		border-top: 6px solid #eeeff0;

		.commentTitle {
			padding: 30rpx 20rpx 20rpx;
			border-bottom: 1px solid #eeeff0;
		}

		.emptyView {
			margin: 80rpx 0 200rpx;
			text-align: center;

			.emptyImage {
				width: 600rpx;
			}

			.emptyText {
				color: #969798;
			}
		}

		.commentBlock {
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
