<template>
	<view class="container">
		<uni-nav-bar id="naviBar" left-icon="back" title="产品中心" @clickLeft="back"></uni-nav-bar>
		<view class="searchPart">
			<UniSearchBar class="searchBar" placeholder="关键字搜索" radius="80" :initShowClose=initShowClose v-model="keyWord"  @searchClick="searchClick"></UniSearchBar>
		</view>
		<scroll-view id="tab-bar" class="scroll-h scrollMark" :scroll-x="true" :show-scrollbar="false">
			<view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @click="ontabtap(tab.id)">
				<text class="uni-tab-item-title" :class="tabIndexId==tab.id ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
			</view>
		</scroll-view>
		<scroll-view class="scroll-v" enableBackToTop="true" scroll-y :scroll-into-view="scrollViewId" @scroll="scrollY">
			<swiper :indicator-dots="true" :autoplay="true" :circular="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(item,indexSwiper) in data.productAffixList" :key="indexSwiper">
					<image :src="item.fullimage_url" mode="scaleToFill"></image>
				</swiper-item>
			</swiper>
			<view class="modelPart">
				<view class="productInfo" v-if='data.productName.length > 0'>
					<view class="topPart">
						<view class="title">{{data.productName}}</view>
						<view class="collectPart" @click="clickCollect">
							<image :src="data.collect ? '../../static/interaction/collected.png' : '../../static/interaction/unCollected.png'"
							 mode="scaleToFill"></image>
							<text :class="data.collect ? 'collectColor' : 'unCollectColor'">收藏</text>
						</view>
					</view>
					<htmlPanel :url.sync="productinfo_url"></htmlPanel>
				</view>
				<block v-for="(item,index) in tabBars" :key="index">
					<view class="model scrollMark" id="jiagou_url" v-if='item.id == "jiagou_url"'>
						<view class="title">整体架构</view>
						<htmlPanel :url.sync="jiagou_url"></htmlPanel>
					</view>
					<view class="model scrollMark" id="zucheng_url" v-else-if='item.id == "zucheng_url"'>
						<view class="title">模块组成</view>
						<htmlPanel :url.sync="zucheng_url"></htmlPanel>
					</view>
					<view class="model scrollMark" id="yongtu_url" v-else-if='item.id == "yongtu_url"'>
						<view class="title">主要用途</view>
						<htmlPanel :url.sync="yongtu_url"></htmlPanel>
					</view>
					<view class="model scrollMark" id="youshi_url" v-else-if='item.id == "youshi_url"'>
						<view class="title">核心优势</view>
						<htmlPanel :url.sync="youshi_url"></htmlPanel>
					</view>
					<view class="model scrollMark" id="gongneng_url" v-else-if='item.id == "gongneng_url"'>
						<view class="title">产品功能</view>
						<htmlPanel :url.sync="gongneng_url"></htmlPanel>
					</view>
					<view class="model scrollMark" id="tedian_url" v-else-if='item.id == "tedian_url"'>
						<view class="title">产品特点</view>
						<htmlPanel :url.sync="tedian_url"></htmlPanel>
					</view>
					<view class="model scrollMark" id="shiyong_url" v-else-if='item.id == "shiyong_url"'>
						<view class="title">产品使用</view>
						<htmlPanel :url.sync="shiyong_url"></htmlPanel>
					</view>
					<view class="model scrollMark" id="canshu_url" v-else-if='item.id == "canshu_url"'>
						<view class="title">产品参数</view>
						<htmlPanel :url.sync="canshu_url"></htmlPanel>
					</view>
					<view class="model scrollMark" id="anli_url" v-else-if='item.id == "anli_url"'>
						<view class="title">{{level == 5 ? '产品案例' : '典型案例'}}</view>
						<htmlPanel :url.sync="anli_url"></htmlPanel>
					</view>
				</block>
				<view class="xiangGuanPart scrollMark" id="xiangguan">
					<view class="docPart" v-if='data.docsList.length > 0'>
						<view class="topPart">
							<view class="title">相关资料</view>
							<!-- <view class="subtitle">更多资料</view> -->
						</view>
						<view class="downCellPart" v-for="(item,index) in data.docsList" :key="index">
							<downLoadCell :data="item"></downLoadCell>
						</view>
					</view>
					<view class="productPart" v-if='data.subProductList.length > 0'>
						<view class="title">相关产品</view>
						<view class="subtitle">{{data.briefIntroduction}}</view>
						<view class="downCellPart" v-for="(item,index) in data.subProductList" :key="index">
							<productCell :data="item" fromH5='1'></productCell>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<image class="fudongquan" src="../../static/product/fudongquan.png" @click="clickFuDongQuan"></image>
		<view class="showPhoneInfos" v-show="showPhoneInfos" @touchmove.stop.prevent="">
			<view class='popup-mask' @click='closePhoneInfos'></view>
			<view class='phoneInfos'>
				<view class="namePart">
					<view class="title">负责人</view>
					<view class="name">{{data.charger}}</view>
				</view>
				<view class="phonePart">
					<view class="textPart">
						<view class="title">联系方式</view>
						<view class="phone">{{data.tel}}</view>
					</view>
					<image src="../../static/product/phone.png" mode="scaleToFill" @click="makePhoneCall"></image>
				</view>
				<view class="docPart">
					<view class="title">文档说明</view>
					<view class="docDesc">{{data.docDesc}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	const API = require('../../common/api.js')
	import htmlPanel from "@/components/zcc/my-html-panel/my-html-panel.vue"
	import downLoadCell from "@/components/zcc/downLoadCell/downLoadCell.vue"
	import productCell from "@/components/zcc/productCell/productCell.vue"
	import uniNavBar from "@/components/lib/uni-nav-bar/uni-nav-bar.vue"
	import UniSearchBar from "@/components/lib/uni-search-bar/uni-search-bar.vue"

	export default {
		components: {
			htmlPanel,
			downLoadCell,
			productCell,
			uniNavBar,
			UniSearchBar
		},
		data() {
			return {
				initShowClose: false, //搜索框右侧的叉号
				showPhoneInfos: false,
				tabIndexId: '',
				tabBars: [],
				clickTabFlag: false,
				productId: '',
				data: {
					productAffixList: [],
				},
				scrollViewId: '',
				productinfo_url: '',
				jiagou_url: '',
				zucheng_url: '',
				youshi_url: '',
				gongneng_url: '',
				anli_url: '',
				fromH5: '',
				keyWord: '',
				level: '',
				
				yongtu_url: '',
				tedian_url: '',
				shiyong_url: '',
				canshu_url: '',
			}
		},
		onLoad(option) {
			this.productId = Vue.prototype.isEmpty(option.productId) ? Vue.config.configDic.productID : option.productId;
			this.fromH5 = option.fromH5;
			this.getProductData();
		},
		methods: {
			searchClick() {
				uni.navigateTo({
					url: '../search/homeSearch?fromH5=' + '1'
				})
			},
			ontabtap(tabID) {
				this.clickTabFlag = true;
				this.tabIndexId = tabID;
				this.scrollViewId = tabID;
			},
			scrollY(event) {
				// 点击的话，直接返回
				if (this.clickTabFlag) {
					this.clickTabFlag = false;
					return;
				}
				// 随着滚动，类型跟随选中
				uni.createSelectorQuery().in(this).selectAll('.scrollMark').boundingClientRect(rects => {	
					let baseHeight = rects[0].top + 45;
						// console.log(baseHeight);
					for (let i = rects.length -1; i > 0;i--) {
						// console.log('++++++++++++++');
						// console.log(rects[i].top);
						if (rects[i].top <= baseHeight) {
							this.tabIndexId = rects[i].id;
							break;
						}
					}
				}).exec();
			},
			getProductData() {
				// 我的产品
				API.productData({
					productid: this.productId
				}).then(res => {
					console.log(res);
					this.data = res.data.data;
					
					this.level = this.data.level || ''
					this.productinfo_url = this.data.productinfo_url;
					if (!Vue.prototype.isEmpty(this.data.jiagou_url)) {
						this.tabBars.push({
							name: '架构',
							id: 'jiagou_url'
						})
						this.jiagou_url = this.data.jiagou_url;
						if (this.tabIndexId == '') {
							this.tabIndexId = 'jiagou_url';
						}
					}
					if (!Vue.prototype.isEmpty(this.data.zucheng_url)) {
						this.tabBars.push({
							name: '组成',
							id: 'zucheng_url'
						})
						this.zucheng_url = this.data.zucheng_url;
						if (this.tabIndexId == '') {
							this.tabIndexId = 'zucheng_url';
						}
					}
					if (!Vue.prototype.isEmpty(this.data.yongtu_url)) {
						this.tabBars.push({
							name: '用途',
							id: 'yongtu_url'
						})
						this.yongtu_url = this.data.yongtu_url;
						if (this.tabIndexId == '') {
							this.tabIndexId = 'yongtu_url';
						}
					}
					if (!Vue.prototype.isEmpty(this.data.youshi_url)) {
						this.tabBars.push({
							name: '优势',
							id: 'youshi_url'
						})
						this.youshi_url = this.data.youshi_url;
						if (this.tabIndexId == '') {
							this.tabIndexId = 'youshi_url';
						}
					}
					if (!Vue.prototype.isEmpty(this.data.gongneng_url)) {
						this.tabBars.push({
							name: '功能',
							id: 'gongneng_url'
						})
						this.gongneng_url = this.data.gongneng_url;
						if (this.tabIndexId == '') {
							this.tabIndexId = 'gongneng_url';
						}
					}
					if (!Vue.prototype.isEmpty(this.data.tedian_url)) {
						this.tabBars.push({
							name: '特点',
							id: 'tedian_url'
						})
						this.tedian_url = this.data.tedian_url;
						if (this.tabIndexId == '') {
							this.tabIndexId = 'tedian_url';
						}
					}
					if (!Vue.prototype.isEmpty(this.data.shiyong_url)) {
						this.tabBars.push({
							name: '使用',
							id: 'shiyong_url'
						})
						this.shiyong_url = this.data.shiyong_url;
						if (this.tabIndexId == '') {
							this.tabIndexId = 'shiyong_url';
						}
					}
					if (!Vue.prototype.isEmpty(this.data.canshu_url)) {
						this.tabBars.push({
							name: '参数',
							id: 'canshu_url'
						})
						this.canshu_url = this.data.canshu_url;
						if (this.tabIndexId == '') {
							this.tabIndexId = 'canshu_url';
						}
					}
					if (!Vue.prototype.isEmpty(this.data.anli_url)) {
						this.tabBars.push({
							name: '案例',
							id: 'anli_url'
						})
						this.anli_url = this.data.anli_url;
						if (this.tabIndexId == '') {
							this.tabIndexId = 'anli_url';
						}
					}
					if (this.data.docsList.length > 0 || this.data.subProductList.length > 0) {
						this.tabBars.push({
							name: '相关',
							id: 'xiangguan'
						})
						if (this.tabIndexId == '') {
							this.tabIndexId = 'xiangguan';
						}
					}
				}).catch(err => {
					console.log(err);
				})
			},
			clickFuDongQuan() {
				this.showPhoneInfos = true;
			},
			closePhoneInfos() {
				this.showPhoneInfos = false;
			},
			clickCollect() {
				if (!this.data.collect) {
					API.interactionCollect({
						bizKey: this.data.id,
						collectType: 'product'
					}).then(res => {
						console.log(res);
						this.data.collect = true;
						uni.showToast({
							title: '收藏成功'
						})
					}).catch(err => {
						console.log(err);
					})
				} else {
					API.interactionUnCollect({
						bizkey: this.data.id,
						collecttype: 'product'
					}).then(res => {
						console.log(res);
						this.data.collect = false;
						uni.showToast({
							title: '取消收藏',
						})
					}).catch(err => {
						console.log(err);
					})
				}
			},
			makePhoneCall() {
				uni.makePhoneCall({
					phoneNumber: this.data.tel,
					success: () => {
						console.log("成功拨打电话")
					}
				})
			},
			back() {
				if (this.fromH5 == '1') {
					uni.navigateBack({
						delta: 1
					})
				} else {
					this.callHandler('ObjC Echo', {
						'key': 'back'
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.container {
		height: 100%;

		.searchPart {
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

		.scroll-v {
			flex: 1;
			width: 750upx;
			height: calc(100% - 270rpx);
			/* #ifndef MP-ALIPAY */
			flex-direction: column;

			/* #endif */
			swiper {
				height: 300rpx;

				swiper-item {
					height: 300rpx;
					line-height: 300rpx;
				}

				image {
					width: 750rpx;
					height: 300rpx;
				}
			}

			.modelPart {

				z-index: 10;

				.model {
					margin-top: 20rpx;
					background: #FFFFFF;

					.title {
						color: #28292a;
						height: 90rpx;
						line-height: 90rpx;
						border-bottom: 0.5px solid #dbdcdd;
						margin-left: 20rpx;
					}
				}
			}

			.productInfo {
				background: #FFFFFF;

				.topPart {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: -30rpx;

					.title {
						margin-left: 20rpx;
						width: 570rpx;
						padding: 20rpx 0;
					}

					.collectPart {
						display: flex;
						align-items: center;
						margin-right: 20rpx;

						image {
							width: 40rpx;
							height: 40rpx;
						}

						.collectColor {
							color: #ee3847;
						}

						.unCollectColor {
							color: #919191;
						}
					}
				}
			}

			.xiangGuanPart {
				.docPart {
					margin-top: 20rpx;
				
					.topPart {
						display: flex;
						justify-content: space-between;
						background: #FFFFFF;
						border-bottom: 0.5px solid #dbdcdd;
						height: 90rpx;
						line-height: 90rpx;
				
						.title {
							margin-left: 20rpx;
						}
				
						.subtitle {
							color: #7c7d7e;
							font-size: 30rpx;
							margin-right: 20rpx;
						}
					}
				
					.downCellPart {
						background: #FFFFFF;
						margin-bottom: 20rpx;
					}
				}
				
				.productPart {
					background: #FFFFFF;
					margin-top: 20rpx;
				
					.title {
						border-bottom: 0.5px solid #dbdcdd;
						height: 90rpx;
						line-height: 90rpx;
						margin: 0 20rpx;
					}
				
					.subtitle {
						font-size: 32rpx;
						margin: 20rpx 20rpx 0;
					}
				
					.downCellPart {}
				}
			}
		}

		.fudongquan {
			position: fixed;
			bottom: 200rpx;
			right: 20rpx;
			width: 80rpx;
			height: 80rpx;
		}

		.showPhoneInfos {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 10;

			.popup-mask {
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, 0.5);
				z-index: 11;
			}

			.phoneInfos {
				position: fixed;
				left: 0;
				bottom: 0;
				width: 100%;
				background: white;
				z-index: 12;
				border-top-left-radius: 25rpx;
				border-top-right-radius: 25rpx;

				.namePart {
					margin-top: 40rpx;
					padding-left: 60rpx;
					padding-bottom: 20rpx;
					border-bottom: 1px solid #eff0f1;

					.name {}
				}

				.title {
					font-size: 30rpx;
					color: #6b6c6d;
				}

				.phonePart {
					margin: 20rpx 0;
					padding-left: 60rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.textPart {

						.phone {}
					}

					image {
						width: 60rpx;
						height: 60rpx;
						margin-right: 20rpx;
					}
				}

				.docPart {
					padding-left: 60rpx;
					margin-bottom: 60rpx;
				}
			}
		}
	}
</style>
