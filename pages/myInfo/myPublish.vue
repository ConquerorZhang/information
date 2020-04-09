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
			<view class="filter" v-if="datalists.type == 1|| datalists.type == 2">
				<myPublishfilter :independence="true" :color="titleColor" :themeColor="themeColor" :menuList.sync="menuList"
				 @result="result" @sortresult="sortresult"></myPublishfilter>
			</view>
		</view>
		<!-- 列表 -->
		<scroll-view scroll-y="true" class="list" v-bind:style="{'margin-top':(datalists.type == 1 || datalists.type == 2)?'75px':'43px'}"
		 @scrolltolower="loadMore(datalists.type)">
			<!-- 列表item  我的发布-->
			<view class="item-one" v-if="datalists.type=='1'">
				<view class="empty" v-if="datalists.list1.datalist.length < 1">
					<image class="emptyImage" src="../../static/interaction/commentEmpty.png" mode="widthFix"></image>
					<view class="emptyText">没有找到相关信息～</view>
				</view>
				<view class="item" v-for="(item, index) in datalists.list1.datalist" :key="index">
					<view class="item-top">
						<image class="icon_head circleicon" mode="aspectFill" :src="item.avatarUrl" @click="navToDetailPage(item,index,'id')"></image>
						<view class="info" @click="navToDetailPage(item,index,'id')">
							<text class="item-text name">{{item.createName}}</text>
							<view class="info-bottom">
								<text class="item-text time">{{item.createTimeShow}}</text>
								<text class="item-text number">{{item.visitCountShow}}</text>
							</view>
						</view>
						<view class="item-top-collect" @click="collect(item.id,index)">
							<image class="collect-icon" mode="aspectFit" src="../../static/black_dot.png"></image>
						</view>
					</view>
					<text class="item-text title" @click="navToDetailPage(item,index,'id')">{{item.title}}</text>
					<text class="item-text brief" @click="navToDetailPage(item,index,'id')">{{item.contents}}</text>
					<view class="item-image" @click="navToDetailPage(item,index,'id')">
						<image class="item-image-image" mode="aspectFit" v-for="(pic,index) in item.pics" :key="index" :src="pic"></image>
						<!-- <image class="item-image-image" mode="aspectFit" src="../../static/logo.png"></image>
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
			</view>

			<!-- 列表item  我的回答-->
			<view class="item-two" v-else-if="datalists.type=='2'">
				<view class="empty" v-if="datalists.list2.datalist.length < 1">
					<image class="emptyImage" src="../../static/interaction/commentEmpty.png" mode="widthFix"></image>
					<view class="emptyText">没有找到相关信息～</view>
				</view>
				<view class="item" v-for="(item, index) in datalists.list2.datalist" :key="index">
					<view class="item-top">
						<view class="item-head-icon" @click="navToDetailPage(item,index,'bizKey')">
							<image class="circleicon" mode="aspectFill" :src="item.avatarUrl"></image>
						</view>
						<view class="info" @click="navToDetailPage(item,index,'bizKey')">
							<text class="item-text name">{{item.createName}}</text>
							<view class="info-bottom">
								<text class="item-text content">{{item.contents}}</text>
							</view>
						</view>
						<view class="item-top-collect" @click="collect(item.id,index)">
							<image class="collect-icon" mode="aspectFit" src="../../static/black_dot.png"></image>
						</view>
					</view>

					<view class="comment" @click="navToDetailPage(item,index,'bizKey')">
						<view class="comment-title">
							<text class="item-text title">我：</text>
						</view>
						<text class="item-text brief">{{item.fatherContents}} </text>
					</view>

					<view class="item-date">
						<text class="item-date-text">{{item.createTime}}</text>
					</view>

				</view>
			</view>
			<!-- 列表item  回复我的-->
			<view class="item-three" v-else-if="datalists.type=='3' || datalists.type =='4'">

				<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
					<view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @click="ontabtap">
						<text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
					</view>
				</scroll-view>
				<swiper :current="tabIndex" class="swiper-box" style="flex: 1;" :duration="300" @change="ontabchange">
					<swiper-item class="swiper-item" v-for="(tab,index1) in datalists.list3" :key="index1">
						<scroll-view class="scroll-v" enableBackToTop="true" scroll-y @scrolltolower="loadMore(tab.type)">
							<view class="empty" v-if="tab.datalist.length < 1">
								<image class="emptyImage" src="../../static/interaction/commentEmpty.png" mode="widthFix"></image>
								<view class="emptyText">没有找到相关信息～</view>
							</view>
							<view class="item" v-for="(item, index) in tab.datalist" :key="index">
								<view class="item-top">
									<view class="item-head-icon" @click="navToDetailPage(item,index,'bizKey')">
										<image class="circleicon" mode="aspectFill" :src="item.avatarUrl"></image>
									</view>
									<view class="info" @click="navToDetailPage(item,index,'bizKey')">
										<text class="item-text name">{{item.createName}}</text>
										<view class="info-bottom">
											<text class="item-text time">{{item.createTime}}</text>
											<text class="item-text number" v-show="false">0浏览</text>
										</view>
									</view>
									<view class="item-top-collect" @click="collect(item.id,index)">
										<image class="collect-icon" mode="aspectFit" src="../../static/black_dot.png"></image>
									</view>
								</view>

								<view class="item-replycontent">
									<text class="item-replycontent-text">{{item.contents}}</text>
									<view class="item-reply-good" v-if="item.isFavour
 == 1">
										<image class="bottom-icon-left" mode="aspectFit" src="../../static/respond_orange.png"></image>
										<text class="bottom-text">赞了我的帖子</text>
									</view>
								</view>

								<view class="comment" @click="navToDetailPage(item,index,'bizKey')">
									<view class="comment-title">
										<text class="item-text title">我的帖子：</text>
									</view>
									<text class="item-text brief">{{item.issueTitle}} </text>
								</view>
							</view>
							<view class="loading-more" v-if="tab.isLoading || tab.datalist.length > 4">
								<text class="loading-more-text">{{tab.loadingText}}</text>
							</view>



							<!-- 输入框 -->





						</scroll-view>
					</swiper-item>
				</swiper>

			</view>
			<view class="loading-more" v-if="(datalists.type == '1' && (datalists.list1.isLoading || datalists.list1.datalist.length>4))|| (datalists.type == '2' && (datalists.list2.isLoading || datalists.list2.datalist.length>4))">
				<text class="loading-more-text">{{datalists.type == '1'?datalists.list1.loadingText:datalists.list2.loadingText}}</text>
			</view>
		</scroll-view>
		<uni-popup class="bottom-pop-contener" :show="showpopup" type="bottom" @change="change">
			<view class="bottom-pop">
				<text class="popup-content delete" @click="delete_" id="deleteid">{{datalists.type=='1'?'删除该帖子':'删除该回复'}}</text>
				<text class="popup-content" @click="cancel">取消</text>
			</view>

		</uni-popup>
	</view>
</template>

<script>
	import myPublishfilter from '@/components/sl-filter/myPublish-filter.vue';
	// import uniPopup from '@/components/lib/uni-popup/uni-popup.vue';
	// import uniIcons from '@/components/lib/uni-icons/uni-icons.vue';
	const API = require('../../common/api.js');
	export default {
		components: {
			myPublishfilter
			// uniIcons,
			// uniPopup
		},
		data() {
			return {

				//内容数据
				deleteIndex: -1,
				deleteid: '-1',
				currrenIndex: -1, //记录跳转时点击的item索引
				currrentType: '1', //当前展示的类型 1 我发布的，2我的回答，3回复我的  赞，4回复我的-内容
				limit: '10',
				page: [1, 1, 1, 1],
				orderBy: '',
				isAsc: 'desc',
				filtertype: '',
				loaddata: {
					isLoading: false,
					refreshText: "",
					loadingText: '加载更多...',
				},
				datalists: {
					type: '1',
					list1: { //我的发布
						hasmore: true,
						isLoading: false,
						loadingText: '加载更多...',
						datalist: []
					},
					list2: { //我的回答
						hasmore: true,
						isLoading: false,
						loadingText: '加载更多...',
						datalist: []
					},
					list3: [{ //回复我的-赞我的
							type: '3',
							index: 0,
							hasmore: true,
							isLoading: false,
							loadingText: '加载更多...',
							datalist: []
						},
						{ //回复我的-回复我的
							type: '4',
							index: 1,
							hasmore: true,
							isLoading: false,
							loadingText: '加载更多...',
							datalist: []
						}
					]

				},

				//swiper数据
				newsList: [],
				tabIndex: 0,
				tabBars: [{
					name: '赞我的',
					id: 'quanbu'
				}, {
					name: '回复我的',
					id: 'chanpin'
				}],
				scrollInto: "",

				//是否展示删除弹窗
				showpopup: false,
				//列表显示数据
				// data: {
				// 	type: '3',
				// 	itemlist: [{}, {}, {}, {}, {}, {}]
				// },

				// title  Radio数据
				labelName: '',
				labelDataList: 0,
				labelList: [{
						value: '1',
						name: '我的发布',
						checked: true
					},
					{
						value: '2',
						name: '我的回答',
						checked: false
					},
					{
						value: '999',
						name: '回复我的',
						checked: false
					}
				],

				// 筛选菜单数据
				themeColor: '#333',
				titleColor: '#333',
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
						'value': 'replyCount',
						'isMutiple': false,
						'isSort': false,
						'reflexTitle': true,
						'detailList': [{
							'title': '全部',
							'value': '789'
						}]
					}
				],
			}
		},
		onLoad(option) {
			console.log("-----pages:" + getCurrentPages())
			console.log(option);
			let index = option.index;
			// this.systemInfo = getApp().globalData.systemInfo;
			// uni.getSystemInfo({
			// 	success: (res) => {
			// 		this.systemInfo = res
			// 	}
			// })
			this.labelList.forEach((item) => {
				switch (index) {
					case "0":
						if (item.value == '1') {
							item.checked = true;
							this.radioSetData(item.value);
						} else {
							item.checked = false;
						}

						break;
					case "1":
						if (item.value == '2') {
							item.checked = true;
							this.radioSetData(item.value);
						} else {
							item.checked = false;
						}
						break;
					case "2":
						if (item.value == '999') {
							item.checked = true;
							this.radioSetData(item.value);
						} else {
							item.checked = false;
						}
						break;

				}

			})
			//初始化数据
			// setTimeout(() => {
			// 	this.getNewData(this.datalists.type);
			// }, 500)

		},

		onShow() {
			this.callHandler('ObjC Echo', {
				'key': 'inner'
			});
		},
		methods: {
			radioChange: function(e) {
				this.labelDataList = e.detail.value
				console.log(e)
				console.log('radio发生change事件，携带value值为：' + e.detail.value)
				this.radioSetData(e.detail.value);
			},
			radioSetData: function(value) {
				if (value === '999') {
					let index = 0;
					// this.currrentType = (index == 0 ? '3' : '4');
					this.datalists.type = (index == 0 ? '3' : '4');
					this.switchTab(index);
				} else {
					// this.currrentType = value;
					this.datalists.type = value;
					// this.getlistdata2(this.page[1]);
					this.getNewData(this.datalists.type);
				}
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
				uni.showToast({
					title:'1111'
				})
				console.log('filter_result:' + JSON.stringify(val));
				// this.filterResult = JSON.stringify(val, null, 2)
				this.filtertype = val.part;
				console.log(this.filtertype)
				//重新执行搜索函数
				this.resetData(this.datalists.type);
				setTimeout(() => {
					this.getNewData(this.datalists.type);
				}, 500)

			},
			//排序菜单返回结果
			sortresult(val) {
				uni.showToast({
					title:'222'
				})
				console.log('sortresult-filter_result:' + JSON.stringify(val));
				this.orderBy = val.sort;
				this.isAsc = "desc" == this.isAsc ? "asc" : "desc";
				console.log(this.orderBy)
				this.resetData(this.datalists.type);
				setTimeout(() => {
					this.getNewData(this.datalists.type);
				}, 500)
				// this.getNewData(this.datalists.type);
			},
			//重新拉取数据
			getNewData(type) {
				// console.log("-------------触发getNewData")
				switch (type) {
					case '1':
						this.getlistdata1(this.page[0]);
						break;
					case '2':
						this.getlistdata2(this.page[1]);
						break;
					case '3':
						this.getlistdata3(this.page[2]);
						break;
					case '4':
						this.getlistdata4(this.page[3]);
						break;
					default:
						break;
				}
			},
			//点击小黑点
			collect(id, index) {
				console.log("收藏成功");
				// this.togglePopup('center', 'image');
				this.showpopup = true;
				this.deleteid = id;
				this.deleteIndex = index;

			},
			//页面跳转到详情
			navToDetailPage(item, index, idkey) {
				this.currrenIndex = index;

				uni.$once('interation$detailback', this.detailBack);
				// 区分平台跳转互动详情
				switch (uni.getSystemInfoSync().platform) {
					case 'android':
						uni.navigateTo({
							url: '/pages/interaction/interactionDetail?item=' + encodeURIComponent(JSON.stringify(item)) + '&idkey=' +
								idkey,
						})
						break;
					case 'ios':
						uni.navigateTo({
							url: '/pages/interaction/interactionDetailIOS?item=' + encodeURIComponent(JSON.stringify(item)) + '&idkey=' +
								idkey,
						})
						break;
					default:
						console.log('运行在开发者工具上')
						break;
				}
				uni.showToast({
					title: this.currrenIndex + '',
				})
			},
			//详情回调函数
			detailBack(data) {
				console.log("回传数据呀--------------------");
				console.log(data.item);
				// console.log(this.datalists.type);
				// console.log(this.currrenIndex);
				if (this.currrenIndex != -1) {
					switch (this.datalists.type) {
						case '1':
							this.datalists.list1.datalist[this.currrenIndex] = data.item;
							// console.log("---------favourCount:"+data.item.favourCount+"-----:"+data.item.favourCount)
							// uni.showToast({
							// 	title:data.item.favourCount,
							// })
							break;
						case '2':
							this.datalists.list2.datalist[this.currrenIndex] = data.item;
							break;
						case '3':
							this.datalists.list3[0].datalist[this.currrenIndex] = data.item;
							break;
						case '4':
							this.datalists.list3[1].datalist[this.currrenIndex] = data.item;
							break;
						default:
							break;
					}
					console.log(this.datalists.list1.datalist);
					this.$forceUpdate();
				}
				uni.$off('interation$detailback');
			},
			//删除评论的弹窗变化
			change(e) {
				console.log('是否打开:' + e.show)
				if (!e.show) {
					this.showpopup = false
				}
			},
			//删除回复
			delete_: function(e) {
				console.log('删除成功');
				this.showpopup = false;
				console.log(e)
				setTimeout(() => {
					switch (this.datalists.type) {
						case '1':
							this.delete_mypublish(this.deleteid, this.datalists.type, this.deleteIndex);
							break;
						case '2':
							this.delete_myanswer(this.deleteid, this.datalists.type, this.deleteIndex);
							break;
						case '3':
							this.delete_favourme(this.deleteid, this.datalists.type, this.deleteIndex)
							break;
						case '4':
							this.delete_replyme(this.deleteid, this.datalists.type, this.deleteIndex)
							break;
						default:
							break;
					}
				}, 500)

			},
			//删除我的发布
			delete_mypublish(deleteid, type, index) {
				API.myPublishDelete({
					id: deleteid,
				}).then(res => {
					console.log(res);
					if (res.data.code == '0') {
						this.removeItem(type, index);
					}
					// console.log(this.data.datalsit);
				}).catch(err => {
					console.log(err);
				})
			},
			//删除我的回答
			delete_myanswer(deleteid, type, index) {
				API.myIssueCommentDelete2({
					id: deleteid,
				}).then(res => {
					console.log(res);
					if (res.data.code == '0') {
						this.removeItem(type, index);
					}
					// console.log(this.data.datalsit);
				}).catch(err => {
					console.log(err);
				})
			},
			//删除点赞我的
			delete_favourme(deleteid, type, index) {
				API.myIssueCommentDelete2({
					id: deleteid,
					type: 'issue'
				}).then(res => {
					console.log(res);
					if (res.data.code == '0') {
						this.removeItem(type, index);
					}
					// console.log(this.data.datalsit);
				}).catch(err => {
					console.log(err);
				})
			},
			//删除回复我的
			delete_replyme(deleteid, type, index) {
				API.myIssueCommentDelete2({
					id: deleteid,
				}).then(res => {
					console.log(res);
					if (res.data.code == '0') {
						this.removeItem(type, index);
					}
					// console.log(this.data.datalsit);
				}).catch(err => {
					console.log(err);
				})
			},
			//前台移除数据
			removeItem(type, index) {
				console.log('----------------------removeItem:' + type + '---index:' + index);
				switch (type) {
					case '1':
						// console.log("datalists.list1.datalist: " + JSON.stringify(this.datalists.list1.datalist));
						this.datalists.list1.datalist.splice(index, 1);
						// this.$forceUpdate();
						break;
					case '2':
						this.datalists.list2.datalist.splice(index, 1);
						break;
					case '3':
						this.datalists.list3[0].datalist.splice(index, 1);
						break;
					case '4':
						this.datalists.list3[1].datalist.splice(index, 1);
						break;
					default:
						break;
				}
			},
			//取消关闭弹窗
			cancel(e) {
				console.log('取消');
				console.log(e);
				this.showpopup = false;
			},
			//回复我的 点击tab切换
			ontabtap(e) {
				console.log(e);
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.datalists.type = (index == 0 ? '3' : '4');
				this.tabIndex = index;
				this.scrollInto = this.tabBars[index].id;
				// console.log(this.datalsit.type);
				// this.switchTab(index);
				// this.getlistdata3(this.page[2]);
			},
			//回复我的 滑动内容切换
			ontabchange(e) {
				let index = e.target.current || e.detail.current;
				this.datalists.type = (index == 0 ? '3' : '4');
				this.switchTab(index);
			},
			switchTab(index) {
				console.log("------index: " + index);

				this.getlist3andlist4Data(index);
				if (this.tabIndex === index) {
					return;
				}
				this.tabIndex = index;
				this.scrollInto = this.tabBars[index].id;
			},
			getlist3andlist4Data(index) {
				if (this.datalists.list3[index].datalist.length === 0) {
					if (index == 0) {
						this.getlistdata3(this.page[2]);
					} else if (index == 1) {
						this.getlistdata4(this.page[3]);
					}
				}
			},
			loadMore(type) {
				console.log("----加载更多" + type)
				switch (type) {
					case '1': //我的发布
						console.log("----加载更多--我的发布:" + this.datalists.list1.hasmore)
						if (this.datalists.list1.hasmore) {
							console.log("加载更多")
							this.getlistdata1(this.page[0]);
						}
						break;
					case '2': //我的回答
						console.log("----加载更多--我的回答:" + this.datalists.list2.hasmore)
						if (this.datalists.list2.hasmore) {
							console.log("加载更多")
							this.getlistdata2(this.page[1]);
						}
						break;
					case '3': //赞我的
						console.log("----加载更多--赞我的:" + this.datalists.list3[0].hasmore)
						if (this.datalists.list3[0].hasmore) {
							console.log("加载更多")
							this.getlistdata3(this.page[2]);
						}
						break;
					case '4': //回复我的
						console.log("----加载更多--回复我的:" + this.datalists.list3[1].hasmore)
						if (this.datalists.list3[1].hasmore) {
							console.log("加载更多")
							this.getlistdata4(this.page[3]);
						}
						break;
					default:
						break;
				}

			},
			//重置初始化数据
			resetData(type) {
				switch (type) {
					case '1':
						this.datalists.list1 = {
							hasmore: true,
							isLoading: false,
							loadingText: '加载更多...',
							datalist: []
						}
						this.page[0] = 1;
						break;
					case '2':
						this.datalists.list2 = {
							hasmore: true,
							isLoading: false,
							loadingText: '加载更多...',
							datalist: []
						}
						this.page[1] = 1;
						break;
					case '3':
						this.datalists.list3[0] = {
							type: '3',
							index: 0,
							hasmore: true,
							isLoading: false,
							loadingText: '加载更多...',
							datalist: []
						}
						this.page[2] = 1;
						break;
					case '4':
						this.datalists.list3[1] = {
							type: '4',
							index: 1,
							hasmore: true,
							isLoading: false,
							loadingText: '加载更多...',
							datalist: []
						}
						this.page[3] = 1;
						break;
					default:
						break;
				}
			},
			//获取我的发布数据
			getlistdata1(page) {
				console.log(typeof page)
				console.log('getlistdata1---page----' + page);
				this.datalists.list1.hasmore = false;
				API.myPublish({
					limit: this.limit,
					page: page,
					type: this.filtertype,
					orderBy: this.orderBy,
					isAsc: this.isAsc,
				}).then(res => {
					if (res.data.data.length < this.limit) {
						this.datalists.list1.loadingText = "没有更多数据了"
						this.datalists.list1.hasmore = false;
					} else {
						this.page[0] = page + 1;
						this.datalists.list1.hasmore = true;
					}
					this.datalists.list1.datalist = this.datalists.list1.datalist.concat(res.data.data);
					// this.datalists.list1.datalist = [];
					// this.$forceUpdate();
					console.log(res);
					// console.log(this.data.datalsit);
				}).catch(err => {
					this.datalists.list1.hasmore = true;
					console.log(err);
					uni.showToast({
						title: err.errMsg,
						icon: 'none',
					})
				})
			},
			//获取我的回答数据
			getlistdata2(page) {
				console.log('getlistdata2---page----' + page);
				this.datalists.list2.hasmore = false;
				API.myIssueComment2({
					limit: this.limit,
					page: page,
					type: this.filtertype,
					orderBy: this.orderBy,
					isAsc: this.isAsc,
				}).then(res => {
					console.log(res);
					if (res.data.data.length < this.limit) {
						this.datalists.list2.loadingText = "没有更多数据了"
						this.datalists.list2.hasmore = false;
					} else {
						this.page[1] = page + 1;
						this.datalists.list2.hasmore = true;
					}
					this.datalists.list2.datalist = this.datalists.list2.datalist.concat(res.data.data);
					// this.$forceUpdate();


					// console.log(this.data.datalsit);
				}).catch(err => {
					this.datalists.list2.hasmore = true;
					console.log(err);
					uni.showToast({
						title: err.errMsg,
						icon: 'none',
					})
				})
			},

			//获取赞我的数据
			getlistdata3(page) {
				console.log('getlistdata3---page----' + page);
				this.datalists.list3[0].hasmore = false;
				API.favourMyIssue({
					limit: this.limit,
					page: page,
					// contents: this.contentText,
					// pics: this.submitImageIdList,
					// type: parseInt(this.selectedIndex) + 1,
				}).then(res => {
					if (res.data.data.length < this.limit) {
						this.datalists.list3[0].loadingText = "没有更多数据了"
						this.datalists.list3[0].hasmore = false;
					} else {
						this.page[2] = page + 1;
						this.datalists.list3[0].hasmore = true;
					}
					this.datalists.list3[0].datalist = this.datalists.list3[0].datalist.concat(res.data.data);
					// this.$forceUpdate();
					console.log(res);
					// console.log(this.data.datalsit);
				}).catch(err => {
					this.datalists.list3[0].hasmore = true;
					console.log(err);
					uni.showToast({
						title: err.errMsg,
						icon: 'none',
					})
				})
			},
			//获取回复我的数据
			getlistdata4(page) {
				console.log('getlistdata4---page----' + page);
				this.datalists.list3[1].hasmore = false;
				API.commentMyIssue({
					limit: this.limit,
					page: page,
				}).then(res => {
					if (res.data.data.length < this.limit) {
						this.datalists.list3[1].loadingText = "没有更多数据了"
						this.datalists.list3[1].hasmore = false;
					} else {
						this.page[3] = page + 1;
						this.datalists.list3[1].hasmore = true;
					}
					this.datalists.list3[1].datalist = this.datalists.list3[1].datalist.concat(res.data.data);
					// this.$forceUpdate();
					console.log(res);
					// console.log(this.data.datalsit);
				}).catch(err => {
					this.datalists.list3[1].hasmore = true;
					console.log(err);
					uni.showToast({
						title: err.errMsg,
						icon: 'none',
					})
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: #F1F1F1;
	}

	.page {
		height: 100%;
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
				// height: $uni-status-height;
				height: var(--status-bar-height);
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
				height: 95%;
			}
		}

		.list {
			margin-top: 150rpx;
			height: 100%;

			.item-one {

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
							width: 60%;
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
							font-size: 25upx;
							color: #525252;
						}

					}
				}
			}

			// 我的回答布局样式
			.item-two {

				display: flex;
				flex-direction: column;

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
							width: 60%;
							display: flex;
							padding: 15rpx 10rpx 10rpx 10rpx;
							flex-direction: column;
							flex-grow: 10;

							.name {
								margin-left: 10rpx;
								color: #585858;
								font-size: $uni-font-size-name;
								/** 对象作为伸缩盒子模型显示 **/
								-webkit-line-clamp: 1;
								overflow: hidden;
								text-overflow: ellipsis;
								-webkit-box-orient: vertical;
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
						margin: 10rpx 20rpx 20rpx 20rpx;
						border-radius: 10rpx;
						background: #F1F1F1;
						padding: 15rpx;

						.comment-title {
							width: 95rpx;

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
			}

			//回复我的布局样式
			.item-three {
				background: #FFFFFF;
				margin: 0rpx 3rpx;
				border-radius: 20rpx;
				display: flex;
				flex-direction: column;
				height: 100%;

				.tab-bar {
					background: #FFFFFF;
				}

				.scroll-h {
					width: 750upx;
					height: 80upx;
					background: #FFFFFF;
					flex-direction: row;
					white-space: nowrap;
					/* flex-wrap: nowrap; */
					/* border-color: #cccccc;
					border-bottom-style: solid;
					border-bottom-width: 1px; */

					.uni-tab-item {
						display: inline-block;
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
						white-space: nowrap;
					}

					.uni-tab-item-title-active {
						color: #dc2937;
						padding-bottom: 10rpx;
						border-bottom: 1px solid #dc2937;
					}

				}


				.swiper-box {
					display: flex;
					height: 100vh;

					.swiper-item {
						flex: 1;
						flex-direction: row;
						background: #F1F1F1;

						.scroll-v {
							flex: 1;
							width: 750upx;
							height: 95%;
							/* #ifndef MP-ALIPAY */
							flex-direction: column;
							/* #endif */

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

							.item-text {
								display: block;
							}

							.item {
								background: #FFFFFF;
								margin: 20rpx 3rpx;
								border-radius: 20rpx;
								display: flex;
								flex-direction: column;

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
										width: 60%;
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
								float: left;
								flex-direction: row;
								align-items: flex-start;
								margin: 0 20rpx 20rpx 20rpx;
								padding: 15rpx;
								border-radius: 10rpx;
								background: #F1F1F1;

								.comment-title {
									width: 25%;

									.title {
										color: #525252;
										line-height: 1.6em;
										font-size: $uni-font-size-article-brief;
										
									}
								}

								.brief {
									width: 75%;
									margin: 0 0 15rpx 0;
									line-height: 1.6em;
									align-items: flex-start;
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

					}
				}




				.dayPart {
					margin: 20rpx;

					.time {
						color: #8e8282;
						margin-bottom: 10rpx;
					}

					.detailPart {
						border-radius: 15rpx;
						background: #FFFFFF;

						.singleDetail {
							display: flex;
							align-items: flex-start;
							padding: 20rpx;
							border-bottom: 1px solid #f0f1f2;

							.detailRed {
								background: #da2a37;
								width: 16rpx;
								height: 16rpx;
								border-radius: 8rpx;
								margin-top: 20rpx;
								margin-left: 20rpx;
								margin-right: 20rpx;
							}

							.detailText {

								.title {
									color: #272829;
								}

								.subTitle {
									color: #909192;
								}
							}
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
		}

		.bottom-pop-contener {
			position: fixed;
			// bottom: 50rpx;
			z-index: 500;
			
			.bottom-pop {
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

				.delete {
					color: #C7161E;
					margin-bottom: 10rpx;
				}

			}
		}

	}
</style>
