<template>
    <view class="tabs">
        <scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
            <view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @click="ontabtap">
                <text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
            </view>
        </scroll-view>
        <swiper :current="tabIndex" class="swiper-box" style="flex: 1;" :duration="300" @change="ontabchange">
            <swiper-item class="swiper-item" v-for="(tab,index1) in newsList" :key="index1">
				<scroll-view class="scroll-v" enableBackToTop="true" scroll-y @scrolltolower="loadMore(index1)">
					<view class="dayPart" v-for="(item,index) in tab.data" :key="index">
						<view class="time">{{item.time}}</view>
						<view class="detailPart">
							<block v-for="(detail,detailIndex) in item.list" :key="detailIndex">
								<view class="singleDetail">
									<view class="detailRed"></view>
									<view class="detailText">
										<view class="title">{{detail.title}}</view>
										<view class="subTitle">{{detail.subtitle}}</view>
									</view>
								</view>
							</block>
						</view>
					</view>
					<view class="loading-more" v-if="tab.isLoading || tab.data.length > 4">
						<text class="loading-more-text">{{tab.loadingText}}</text>
					</view>
				</scroll-view>
            </swiper-item>
        </swiper>
    </view>
</template>
<script>
	// 缓存每页最多
	// const MAX_CACHE_DATA = 100;
	// 缓存页签数量
	// const MAX_CACHE_PAGE = 3;

    export default {
        data() {
            return {
                newsList: [],
                tabIndex: 0,
                tabBars: [{
                    name: '全部',
                    id: 'quanbu'
                }, {
                    name: '产品',
                    id: 'chanpin'
                }, {
                    name: '动态',
                    id: 'dongtai'
                }],
                scrollInto: "",
                showTips: false,
                navigateFlag: false,
                pulling: false,
                refreshIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAB5QTFRFcHBw3Nzct7e39vb2ycnJioqK7e3tpqam29vb////D8oK7wAAAAp0Uk5T////////////ALLMLM8AAABxSURBVHja7JVBDoAgDASrjqj//7CJBi90iyYeOHTPMwmFZrHjYyyFYYUy1bwUZqtJIYVxhf1a6u0R7iUvWsCcrEtwJHp8MwMdvh2amHduiZD3rpWId9+BgPd7Cc2LIkPyqvlQvKxKBJ//Qwq/CacAAwDUv0a0YuKhzgAAAABJRU5ErkJggg=="
            }
        },
        onLoad() {
            setTimeout(()=>{
              this.tabBars.forEach((tabBar) => {
                  this.newsList.push({
                      data: [],
                      isLoading: false,
                      refreshText: "",
                      loadingText: '加载更多...'
                  });
              });
              this.getList(0);
            },350)
        },
        methods: {
			onNavigationBarButtonTap(e) {
			    uni.showModal({
			        content: '是否清空浏览历史？',
			        success: (res) => {
			            if (res.confirm) {
							console.log(this.tabIndex);
			                this.newsList[this.tabIndex].data = [];
							// todozcc 提交删除接口
							
			            }
			        }
			    })
			},
            getList(index) {
				console.log(index);
                let activeTab = this.newsList[index];
                let list = [];
				// 制造的假数据
				let tmpList = [[{'time':'今天','list':[{title:'中国电科相关资料',subtitle:'产品'},{title:'中国电科相关资料',subtitle:'动态'}]},
								{'time':'2011-2-2','list':[{title:'哈哈哈哈哈',subtitle:'产品'},{title:'中国电科相关资料',subtitle:'动态'}]},
								{'time':'2020-2-2','list':[{title:'中国电科相关资料',subtitle:'动态'}]},
								{'time':'2030-2-2','list':[{title:'哈哈哈哈哈',subtitle:'产品'},{title:'中国电科相关资料',subtitle:'动态'}]},
								{'time':'2040-2-2','list':[{title:'哈哈哈哈哈',subtitle:'产品'},{title:'中国电科相关资料',subtitle:'动态'}]}],
				[{'time':'2011-2-2','list':[{title:'中国电科产品测试资料',subtitle:'产品'}]}],
				[{'time':'2011-2-2','list':[{title:'中国电科动态测试资料',subtitle:'动态'}]}]];
				list = tmpList[index];
                activeTab.data = activeTab.data.concat(list);
            },
            goDetail(e) {
                if (this.navigateFlag) {
                    return;
                }
                this.navigateFlag = true;
                uni.navigateTo({
                    url: './detail/detail?title=' + e.title
                });
                setTimeout(() => {
                    this.navigateFlag = false;
                }, 200)
            },
            loadMore(e) {
                setTimeout(() => {
                    this.getList(this.tabIndex);
                }, 500)
            },
            ontabtap(e) {
                let index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.switchTab(index);
            },
            ontabchange(e) {
                let index = e.target.current || e.detail.current;
                this.switchTab(index);
            },
            switchTab(index) {
                if (this.newsList[index].data.length === 0) {
                    this.getList(index);
                }

                if (this.tabIndex === index) {
                    return;
                }

                // 缓存 tabId
                // if (this.newsList[this.tabIndex].data.length > MAX_CACHE_DATA) {
                //     let isExist = this.cacheTab.indexOf(this.tabIndex);
                //     if (isExist < 0) {
                //         this.cacheTab.push(this.tabIndex);
                //         //console.log("cache index:: " + this.tabIndex);
                //     }
                // }

                // 释放 tabId
                // if (this.cacheTab.length > MAX_CACHE_PAGE) {
                //     let cacheIndex = this.cacheTab[0];
                //     this.clearTabData(cacheIndex);
                //     this.cacheTab.splice(0, 1);
                //     //console.log("remove cache index:: " + cacheIndex);
                // }
				
				this.tabIndex = index;
				this.scrollInto = this.tabBars[index].id;
            },
            clearTabData(e) {
                this.newsList[e].data.length = 0;
                this.newsList[e].loadingText = "加载更多...";
            },
        }
    }
</script>

<style lang="scss">
    /* #ifndef APP-PLUS */
    page {
        width: 100%;
        min-height: 100%;
        display: flex;
    }
    /* #endif */

    .tabs {
        flex: 1;
        flex-direction: column;
        overflow: hidden;
        background-color: #eeeff0;
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
        /* flex-wrap: nowrap; */
        /* border-color: #cccccc;
		border-bottom-style: solid;
		border-bottom-width: 1px; */
    }

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

    .swiper-box {
        flex: 1;
		height: 100%;
    }

    .swiper-item {
        flex: 1;
        flex-direction: row;
    }

    .scroll-v {
        flex: 1;
        width: 750upx;
		height: 95%;
        /* #ifndef MP-ALIPAY */
        flex-direction: column;
        /* #endif */
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

    .loading-more {
        align-items: center;
        justify-content: center;
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: center;
    }

    .loading-more-text {
        font-size: 28upx;
        color: #999;
    }
</style>
