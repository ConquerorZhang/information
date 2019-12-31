<template>
    <view class="contents" v-bind:style="{ paddingTop: parseFloat(statusBarHeight) + blg + 'rpx' }">
        <view class="page">
            <view class="head">
                <!-- v-bind:style="{height:stateBarHeight +'px'}" -->
                <view class="statusBar" v-bind:style="{ height: parseFloat(statusBarHeight) + 'rpx' }"></view>
                <!--{{Vue.config.configDic.stateBarHeight}}-->
                <view class="top">
                    <image class="icon_logo" mode="aspectFit" src="../../static/logo_cetc.png"></image>
                    <!-- 自定义Placeholder 搜索框 -->
                    <view class="v_search"><uni-search-bar placeholder="关键字搜索" radius="20" clearButton="auto" @input="onKeyInput" v-model="searchKey" class="search" /></view>
                    <view class="top-right" @click="message">
                        <!--@click="window.android.click('77777777777')"-->
                        <image class="top-right-icon" mode="aspectFit" src="../../static/message_white.png"></image>
                        <!-- <text class="top-right-text" v-show='false' >消息</text> -->
                    </view>
                </view>

                <view class="filter">
                    <scroll-view class="scroll" scroll-x="true" :scroll-left="scrollLeft">
                        <text v-for="(item, index) in lv1list" @click="product_cli(item.id, index)" :class="item.id == productId ? 'x item' : 'item'">{{ item.productName }}</text>
                    </scroll-view>
                    <!-- 筛选组件 -->
                    <sl-filter :independence="true" :menuList.sync="menuList" @sortresult="sortresult" @result="result"></sl-filter>
                </view>
            </view>
        </view>
        <swiper class="swiper" style="height:100%"  @change="changeType" :current="current">
            <swiper-item v-for="(item_lv1list, index_lv1list) in lv1list">
                <scroll-view style="height:100%" scroll-y="true" class="scroll-Y" @scrolltolower="onMoreLoad">
                    <view v-if="fileList.length > 0">
                        <view v-for="(item, index) in fileList" class="means-item" @click="fileDetail(item.id)">
                            <view class="means">
                                <view class="con">
                                    <image :src="item.doctypeImageUrl" mode="aspectFit"></image>
                                    <view class="title">
                                        {{item.docName.split(".")[0]}}
                                    </view>
                                </view>
                                <image src="../../static/docs/down.png" mode="aspectFit"></image>
                            </view>
                            <view class="time">
                                <view>{{ item.createTime }}</view>
                                <view class="tip">下载量:{{ item.downloadCount }}</view>
                            </view>
                        </view>
                    </view>
                    <view v-else class="empty">
                        <view v-if="commentEmpty_show">
                        	<image class="emptyImage"  src="../../static/interaction/commentEmpty.png" mode="widthFix"></image>
                        	<view class="emptyText">没有找到相关信息～</view>
                        </view>
                    </view>
                    <uni-load-more :status="more" v-if="more== 'more'"></uni-load-more>
                </scroll-view>
            </swiper-item>	
		</swiper>
        <view class="drift"><image src="../../static/down.png" mode="aspectFit" @click="mydown"></image></view>
    </view>
</template>

<script>
import Vue from 'vue';
const API = require('../../common/api.js');
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
import slFilter from '@/components/sl-filter/myPublish-filter.vue';
import uniLoadMore from '@/components/lib/uni-load-more/uni-load-more.vue';

export default {
    components: {
        uniSearchBar,
        slFilter,
        uniLoadMore
    },
    data() {
        return {
            commentEmpty_show: false, //暂无图片的显示隐藏 默认隐藏 加载完无数据时显示
            current: 0, //滑块所处位置
            statusBarHeight: 0,
            scrollLeft: 0,
            blg: 216,
            systemInfo: '',
            more: 'more',
            version: '',
            innerVersion: '',
            kg: false,
            gdleft: [],
            menuList: [
                {
                    title: '全部',
                    key: 'key_type',
                    isSort: true,
                    isMutiple: false,
                    detailList: [
                        {
                            title: '全部',
                            value: ''
                        },
                        {
                            title: 'doc',
                            value: 'doc'
                        },
                        {
                            title: 'xls',
                            value: 'xls'
                        },
                        {
                            title: 'ppt',
                            value: 'ppt'
                        },
                        {
                            title: 'zip',
                            value: 'zip'
                        }
                    ]
                },
                {
                    title: '最新上传',
                    isMutiple: false,
                    isSort: false,
                    key: 'jobType',
                    value: '2',
                    detailList: []
                },
                {
                    title: '下载量',
                    isMutiple: false,
                    isSort: false,
                    key: 'jobType',
                    value: '1',
                    detailList: []
                }
            ],
            searchKey: '', //搜索关键词
            productId: 0, // 交通信息化/电子政务等的id
            limit: '7',
            page: 1, //当前第几页
            orderBy: '', //latest  downloadCount   最新 下载量
            isAsc: '', //asc desc
            sortresult_value: 0, //区分不同排序的点击
            sortresult_count: 0, //区分正序倒叙
            lv1list: [],
            fileTypeId: '', //文件类型 doc  ppt
            fileList: []
        };
    },
    onLoad() {
        this.getlv1list(); //获取分类列表
        this.getFileList('Refresh');
        this.getFileType();
    },
    updated() {
        if (this.gdleft.length == 0) {
            const query = uni.createSelectorQuery().in(this);
            query.selectAll('.scroll .item').boundingClientRect(data => {
                this.gdleft = data;
            }).exec();
        }
    },
    onShow() {
        this.systemInfo = getApp().globalData.systemInfo;
        this.statusBarHeight = Vue.config.configDic.statusBarHeight;
        this.callHandler('ObjC Echo', {
            key: 'onShow'
        });
    },
    //下拉刷新
    onPullDownRefresh() {
        this.getFileList('Refresh');
    },
    methods: {
        product_cli(id, index) {
            this.productId = id;
            //列表方法
            this.current = index;
        },
        gomeans() {
            uni.navigateTo({
                url: '/pages/means/means'
            });
        },
        onKeyInput: function(event) {
            this.searchKey = event.value;
            this.getFileList('Refresh');
        },
        sdfdf() {
            uni.showToast({
                title: plus
            });
            this.version = plus.runtime.version;
            this.innerVersion = plus.runtime.innerVersion;
        },
        sortresult(param) {
            //最新
            let value = param['jobType'];
            if (this.sortresult_value != value) {
                //两次点击不一样是 参数复原 如:点击次数
                this.sortresult_count = 0;
                this.sortresult_value = value;
            }
            this.sortresult_count++;
            if (value == 1) {
                this.orderBy = 'downloadCount';
            } else if (value == 2) {
                this.orderBy = 'createTime';
            }
            if (this.sortresult_count % 2 != 0) {
                this.isAsc = 'asc';
            } else {
                this.isAsc = 'desc';
            }
            this.getFileList('Refresh');
        },
        result(param) {
            //选择后 展示 title
            let title = param['key_type'] != '' ? param['key_type'] : '全部';
            this.$set(this.menuList[0], 'title', title);
            this.fileTypeId = param['key_type'];
            this.getFileList('Refresh');
        },
        //获取文件列表
        getFileList(type) {
            //页数重置
            if (type == 'Refresh') {
                //页数重置
                this.page = 1;
                this.fileList = [];
                this.more = 'more';
                this.commentEmpty_show = false;
                uni.stopPullDownRefresh();
            }

            let json = {
                limit: this.limit,
                page: this.page
            };
            if (this.fileTypeId != '') {
                json.fileType = this.fileTypeId;
            }
            if (this.isAsc != '') {
                json.isAsc = this.isAsc;
            }
            if (this.orderBy != '') {
                json.orderBy = this.orderBy;
            }
            if (this.searchKey != '') {
                json.searchKey = this.searchKey;
            }
            if (this.productId != 0) {
                json.productId = this.productId;
            }

            //TODO 下拉框的还没写
            //isAsc  orderBy searchKey fileTypeId 文件类型  if
            API.HomeresourceList(json)
                .then(res => {
                    let resdata = res.data.data;
                    if (resdata.length < this.limit) {
                        this.more = 'noMore';
                    } else {
                        this.page += 1;
                    }
                    if(resdata.length == 0){
                       this.commentEmpty_show = true; 
                    }
                    this.fileList = this.fileList.concat(resdata);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getlv1list() {
            this.lv1list.push({
                id: 0,
                productName: '全部'
            });
            API.getlv1list({})
                .then(res => {
                    this.lv1list = this.lv1list.concat(res.data.data);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getFileType() {
            API.getFileType({})
                .then(res => {
                    let resList = res.data.data;
                    let arrya_1 = [
                        {
                            title: '全部',
                            value: ''
                        }
                    ];
                    for (let key in resList) {
                        let json = {
                            title: resList[key].id + '类型',
                            value: resList[key].id
                        };
                        arrya_1.push(json);
                    }
                    this.menuList[0]['detailList'] = arrya_1;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        fileDetail(fileId) {
            uni.navigateTo({
                url: '/pages/means/means-detile?fileId=' + fileId
            });
        },
        //消息
        message() {
            uni.navigateTo({
                url: '../myInfo/myMessage?' + '&fromH5=1'
            });

            // uni.showToast({
            // 	title: '111',
            // });
            this.callHandler('ObjC Echo', {
                key: 'inner'
            });
        },
        mydown() {
            uni.navigateTo({
                url: '/pages/means/means'
            });
        },
        changeType(e) {
            //返回 type的下标
            this.productId = this.lv1list[e.target.current].id;
            this.scrollLeft = this.gdleft[e.target.current].left - 187.5 + this.gdleft[e.target.current].width / 2;
            //把滑动到该 type选中
            this.getFileList('Refresh');
        },
        //加载更多
        onMoreLoad() {
            if (this.more == 'noMore') {
                return;
            }
            this.getFileList('more');
        }
    }
};
</script>

<style lang="scss">
page {
    background: rgb(239, 239, 239);
}
.drift {
    position: fixed;
    bottom: 100rpx;
    right: 100rpx;
    image {
        width: 100rpx;
        height: 100rpx;
    }
}
/deep/ .uni-searchbar__box {
    border: none;
    height: 58rpx;
    background: #fff;
}
/deep/ .uni-input-placeholder{
    color: #b1b1b1;
    font-size: 24rpx;
}
.contents {
    height: 100%;
    box-sizing: border-box;
}
.page {
    display: flex;
    flex-direction: column;
    .head {
        position: fixed;
        top: 0rpx;
        width: 100%;
        z-index: 500;
        background-image: linear-gradient(#c7161e, #d74819);

        .statusBar {
            width: 100%;
        }

        .top {
            display: flex;
            justify-content: space-between;

            .icon_logo {
                width: 121upx;
                height: 60upx;
                padding: 0 20rpx;
                margin-top: -8rpx;
            }

            .v_search {
                display: flex;
                justify-content: center;
                flex-grow: 1;
                margin-top: -6rpx;
                .search {
                    width: 100%;
                    padding: 0;
                }
                input {
                    border: none;
                }
            }

            .top-right {
                padding: 0 20rpx;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-right: 4rpx;
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
        }
    }
}
.scroll {
    font-size: 28rpx;
    padding: 2rpx 0;
    color: #fff;
    white-space: nowrap;
    width: 100%;

    text {
        display: inline-block;
        margin: 0 30rpx;
        padding: 26rpx 0;

        &.x {
            font-weight: bold;
            position: relative;

            &:after {
                content: '';
                display: block;
                height: 4rpx;
                width: 110%;
                left: -5%;
                bottom: 0;
                position: absolute;
                background: #fff;
            }
        }
    }
}

.means-item {
    .means {
        margin-top: 10rpx;
        display: flex;
        align-items: center;
        background: #fff;
        padding: 20rpx;

        image {
            width: 50rpx;
            height: 50rpx;
            margin-right: 20rpx;
        }

        .con {
            flex-grow: 1;
            display: flex;
            align-items: center;

            .title {
                flex-grow: 1;
                padding-left: 30rpx;
                font-size: 30rpx;
            }
        }
    }

    .time {
        border-top: 1rpx solid #f2f2f2;
        background: #fff;
        padding: 20rpx;
        font-size: 24rpx;
        display: flex;
        justify-content: space-between;
        color: rgb(140, 140, 140);

        .tip {
            color: #333333;
        }
    }
}

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
</style>
