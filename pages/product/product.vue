<template>
	<view class="container">
		<uni-nav-bar id="naviBar" left-icon="back" title="产品中心" @clickLeft="back"></uni-nav-bar>
		<view class="searchPart">
			<uni-search-bar class="searchBar" placeholder="关键字搜索" radius="80" :initShowClose=initShowClose @searchClick="searchClick"></uni-search-bar>
		</view>
		<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false">
			<view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @click="ontabtap(index)">
				<text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
			</view>
		</scroll-view>
		<scroll-view class="scroll-v" enableBackToTop="true" scroll-y :scroll-into-view="scrollViewId" @scroll="scrollY">
			<swiper :indicator-dots="true" :autoplay="true" :circular="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(item,indexSwiper) in data.productAffixList" :key="indexSwiper">
					<image :src="item.fullimage_url" mode="scaleToFill"></image>
				</swiper-item>
			</swiper>
			<view class="modelPart">
				<view class="productInfo" v-if='data.subProductList.length > 0'>
					<view class="topPart">
						<view class="title">{{data.productName}}</view>
						<view class="collectPart" @click="clickCollect">
							<image :src="data.collect ? '../../static/sc_sec.png' : '../../static/sc.png'" mode="scaleToFill"></image>
							<text :class="data.collect ? 'collectColor' : 'unCollectColor'">收藏</text>
						</view>
					</view>
					<htmlPanel :url.sync="productinfo_url"></htmlPanel>
				</view>
				<block v-for="(item,index) in tabBars" :key="index">
					<view class="model" id="jiagou_url" v-if='item.id == "jiagou_url"'>
						<view class="title">整体架构</view>
						<htmlPanel :url.sync="jiagou_url"></htmlPanel>
					</view>
					<view class="model" id="zucheng_url" v-else-if='item.id == "zucheng_url"'>
						<view class="title">模块组成</view>
						<htmlPanel :url.sync="zucheng_url"></htmlPanel>
					</view>
					<view class="model" id="youshi_url" v-else-if='item.id == "youshi_url"'>
						<view class="title">模块优势</view>
						<htmlPanel :url.sync="youshi_url"></htmlPanel>
					</view>
					<view class="model" id="gongneng_url" v-else-if='item.id == "gongneng_url"'>
						<view class="title">产品功能</view>
						<htmlPanel :url.sync="gongneng_url"></htmlPanel>
					</view>
					<view class="model" id="anli_url" v-else-if='item.id == "anli_url"'>
						<view class="title">经典案例</view>
						<htmlPanel :url.sync="anli_url"></htmlPanel>
					</view>
				</block>
				<view class="docPart" id="xiangguan" v-if='data.docsList.length > 0'>
					<view class="topPart">
						<view class="title">相关资料</view>
						<view class="subtitle">更多资料</view>
					</view>
					<view class="downCellPart" v-for="(item,index) in data.docsList" :key="index">
						<downLoadCell :data="item"></downLoadCell>
					</view>
				</view>
				<view class="productPart" v-if='data.subProductList.length > 0'>
					<view class="title">产品中心</view>
					<view class="subtitle">{{data.briefIntroduction}}</view>
					<view class="downCellPart" v-for="(item,index) in data.subProductList" :key="index">
						<productCell :data="item" fromH5='1'></productCell>
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

	export default {
		components: {
			htmlPanel,
			downLoadCell,
			productCell,
			uniNavBar
		},
		data() {
			return {
				initShowClose: false, //搜索框右侧的叉号
				showPhoneInfos: false,
				tabIndex: 0,
				tabBars: [],
				productId: '',
				data: {
					productAffixList: [],
					level: ''
				},
				scrollViewId: '',
				productinfo_url: '',
				jiagou_url: '',
				zucheng_url: '',
				youshi_url: '',
				gongneng_url: '',
				anli_url: '',
				fromH5: '',
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
			ontabtap(index) {
				this.tabIndex = index;
				this.scrollViewId = this.tabBars[index].id;
			},
			scrollY(event) {
				// console.log(event);
			},
			getProductData() {
				// 我的产品
				API.productData({
					productid: this.productId
				}).then(res => {
					console.log(res);
					this.data = res.data.data;

					this.productinfo_url = this.data.productinfo_url;
					if (!Vue.prototype.isEmpty(this.data.jiagou_url)) {
						this.tabBars.push({
							name: '架构',
							id: 'jiagou_url'
						})
						this.jiagou_url = this.data.jiagou_url;
					} 
					if (!Vue.prototype.isEmpty(this.data.zucheng_url)) {
						this.tabBars.push({
							name: '组成',
							id: 'zucheng_url'
						})
						this.zucheng_url = this.data.zucheng_url;
					} 
					if (!Vue.prototype.isEmpty(this.data.youshi_url)) {
						this.tabBars.push({
							name: '优势',
							id: 'youshi_url'
						})
						this.youshi_url = this.data.youshi_url;
					} 
					if (!Vue.prototype.isEmpty(this.data.gongneng_url)) {
						this.tabBars.push({
							name: '功能',
							id: 'gongneng_url'
						})
						this.gongneng_url = this.data.gongneng_url;
					}
					if (!Vue.prototype.isEmpty(this.data.anli_url)) {
						this.tabBars.push({
							name: '案例',
							id: 'anli_url'
						})
						this.anli_url = this.data.anli_url;
					}
					this.tabBars.push({
						name: '相关',
						id: 'xiangguan'
					})
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
					API.interactionCollect({
						bizKey: this.data.id,
						collectType: 'product'
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
				image {
					width: 750rpx;
					height: 300rpx;
				}
			}

			.modelPart {

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
					height: 90rpx;
					line-height: 90rpx;
					margin-bottom: -30rpx;

					.title {
						margin-left: 20rpx;
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
