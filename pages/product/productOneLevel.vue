<template>
	<view class="container">
		<scroll-view class="scroll-v" enableBackToTop="true" scroll-y @scroll="scrollY">
			<swiper :indicator-dots="true" :autoplay="true" :circular="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(item,indexSwiper) in data.productAffixList" :key="indexSwiper">
					<image :src="item.fullimage_url" mode="scaleToFill"></image>
				</swiper-item>
			</swiper>
			<view class="modelPart">
				<view class="productInfo" v-if='productinfo_url.length > 0'>
					<htmlPanel :url.sync="productinfo_url"></htmlPanel>
				</view>
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
						<view class="title">产品中心</view>
						<view class="subtitle">{{data.briefIntroduction}}</view>
						<view class="downCellPart" v-for="(item,index) in data.subProductList" :key="index">
							<productCell :data="item" fromH5='1'></productCell>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	const API = require('../../common/api.js')
	import htmlPanel from "@/components/zcc/my-html-panel/my-html-panel.vue"
	import productCell from "@/components/zcc/productCell/productCell.vue"
	import downLoadCell from "@/components/zcc/downLoadCell/downLoadCell.vue"

	export default {
		components: {
			htmlPanel,
			productCell,
			downLoadCell
		},
		data() {
			return {
				productId: '',
				data: {
					productAffixList: [],
					level: ''
				},
				productinfo_url: '',
			}
		},
		onLoad(option) {
			this.productId = option.productId; 

			this.getProductData();
		},
		methods: {
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
				}).catch(err => {
					console.log(err);
				})
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

		.tab-bar {
			background: #FFFFFF;
		}

		.scroll-v {
			flex: 1;
			width: 750upx;
			height: 100%;
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

			.productInfo {
				background: #FFFFFF;
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
	}
</style>
