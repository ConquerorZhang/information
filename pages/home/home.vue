<template>
    <view>
        <view class="xtnav"></view>
        <uni-nav-bar class="nav" background-color="#EE3847" fixed="true">
            <view class="nav-input"><input type="text" value="" v-model="searchKey" placeholder="请输入关键字" /></view>
            <view slot="left" class="nav-logo">
                <image src="../../static/logo.png" mode="scaleToFill"></image>
            </view>
            <view slot="right" class="nav-msg">
                <image src="../../static/message_white.png" mode="aspectFit"></image>
            </view>
        </uni-nav-bar>
        <scroll-view class="scroll" scroll-x="true">
            <text class="x">全部</text>
            <text @click="kg=!kg">点这里试试</text>
            <text @click="sdfdf">交通信息化</text>
            <text>交通信息化</text>
            <text>交通信息化</text>
            <text>交通信息化</text>
            <text>交通信息化</text>
            <text>交通信息化</text>
            <text>交通信息化</text>
            <text>交通信息化</text>
            <text>交通信息化</text>
            <text>交通信息化</text>
        </scroll-view>
        <sl-filter :independence="true" :menuList.sync="menuList" @sortresult="sortresult"></sl-filter>
        <view v-if="kg">
            <view class="means-item" @click="gomeans">
                <view class="means">
                    <view class="con">
                        <image src="../../static/logo.png" mode="aspectFit"></image>
                        <view class="title">
                            只有这一个可以点击 进入 进入 进入
                        </view>
                    </view>
                    <image src="../../static/logo.png" mode="aspectFit"></image>
                </view>
                <view class="time">
                    <view>2019-11-20</view>
                    <view class="tip">
                        下载量:222
                    </view>
                </view>
            </view>
            <view class="means-item">
                <view class="means">
                    <view class="con">
                        <image src="../../static/logo.png" mode="aspectFit"></image>
                        <view class="title">
                            名称 名称 名称 名称 名称 名称 名称 名称 名称
                        </view>
                    </view>
                    <image src="../../static/logo.png" mode="aspectFit"></image>
                </view>
                <view class="time">
                    <view>2019-11-20</view>
                    <view class="tip">
                        下载量:222
                    </view>
                </view>
            </view>
            <view class="means-item">
                <view class="means">
                    <view class="con">
                        <image src="../../static/logo.png" mode="aspectFit"></image>
                        <view class="title">
                            名称 名称 名称 名称 名称 名称 名称 名称 名称
                        </view>
                    </view>
                    <image src="../../static/logo.png" mode="aspectFit"></image>
                </view>
                <view class="time">
                    <view>2019-11-20</view>
                    <view class="tip">
                        下载量:222
                    </view>
                </view>
            </view>
            <view class="means-item">
                <view class="means">
                    <view class="con">
                        <image src="../../static/logo.png" mode="aspectFit"></image>
                        <view class="title">
                            名称 名称 名称 名称 名称 名称 名称 名称 名称
                        </view>
                    </view>
                    <image src="../../static/logo.png" mode="aspectFit"></image>
                </view>
                <view class="time">
                    <view>2019-11-20</view>
                    <view class="tip">
                        下载量:222
                    </view>
                </view>
            </view>
            <view class="means-item">
               <view class="means">
                   <view class="con">
                       <image src="../../static/logo.png" mode="aspectFit"></image>
                       <view class="title">
                           名称 名称 名称 名称 名称 名称 名称 名称 名称
                       </view>
                   </view>
                   <image src="../../static/logo.png" mode="aspectFit"></image>
               </view>
               <view class="time">
                   <view>2019-11-20</view>
                   <view class="tip">
                       下载量:222
                   </view>
               </view>
           </view>
            <view class="means-item">
               <view class="means">
                   <view class="con">
                       <image src="../../static/logo.png" mode="aspectFit"></image>
                       <view class="title">
                           名称 名称 名称 名称 名称 名称 名称 名称 名称
                       </view>
                   </view>
                   <image src="../../static/logo.png" mode="aspectFit"></image>
               </view>
               <view class="time">
                   <view>2019-11-20</view>
                   <view class="tip">
                       下载量:222
                   </view>
               </view>
           </view>
            <view class="means-item">
               <view class="means">
                   <view class="con">
                       <image src="../../static/logo.png" mode="aspectFit"></image>
                       <view class="title">
                           名称 名称 名称 名称 名称 名称 名称 名称 名称
                       </view>
                   </view>
                   <image src="../../static/logo.png" mode="aspectFit"></image>
               </view>
               <view class="time">
                   <view>2019-11-20</view>
                   <view class="tip">
                       下载量:222
                   </view>
               </view>
           </view>
            <view class="means-item">
               <view class="means">
                   <view class="con">
                       <image src="../../static/logo.png" mode="aspectFit"></image>
                       <view class="title">
                           名称 名称 名称 名称 名称 名称 名称 名称 名称
                       </view>
                   </view>
                   <image src="../../static/logo.png" mode="aspectFit"></image>
               </view>
               <view class="time">
                   <view>2019-11-20</view>
                   <view class="tip">
                       下载量:222
                   </view>
               </view>
           </view>
           {{version}} ---- {{innerVersion}}
        </view>
        <view v-else>
            <image src="../../static/interaction/commentEmpty.png" mode="aspectFit" class="empty"></image>
        </view>
        <uni-load-more :status="more"></uni-load-more>
    </view>
</template>

<script>
    import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue';
    import slFilter from '@/components/sl-filter/myPublish-filter.vue';
    import uniLoadMore from '@/components/lib/uni-load-more/uni-load-more.vue';

    export default {
        components: {
            uniNavBar,
            slFilter,
            uniLoadMore
        },
        data() {
            return {
                more: "more",
                version: '',
                innerVersion: '',
                kg: false,
                menuList: [{
                        'title': '全部',
                        'key': 'key_3',
                        'isSort': true,
                        'isMutiple': false,
                        'detailList': [{
                                'title': '组件好像还有问题',
                                'value': 'val_3_1'
                            },
                            {
                                'title': '组件好像还有问题',
                                'value': 'val_3_2'
                            },
                            {
                                'title': '组件好像还有问题',
                                'value': 'val_3_3'
                            }
                        ]
                    }, {
                        'title': '最新上传',
                        'isMutiple': false,
                        'isSort': false,
                        'key': 'jobType',
                        'value': '1',
                        'detailList': [{
                            'title': '全部',
                            'value': '123'
                        }]
                    }, {
                        'title': '最新上传',
                        'isMutiple': false,
                        'isSort': false,
                        'key': 'jobType',
                        'value': '2',
                        'detailList': [{
                            'title': '全部',
                            'value': '123'
                        }]
                    }

                ],
                searchKey: "", //搜索关键词
                fileTypeId: [], //类型列表
                productId: "", // 交通信息化/电子政务等的id 
                limit: "12",
                page: 0, //当前第几页
                orderBy: "", //latest  downloadCount   最新 下载量
                isAsc: "", //asc desc
                sortresult_value: 0, //区分不同排序的点击 
                sortresult_count: 0,
            };
        },
        onLoad() {

        },
        //加载更多
        onReachBottom() {
            alert();
           
        },
        //下拉刷新
        onPullDownRefresh() {
           uni.stopPullDownRefresh();
        },
        methods: {
            gomeans() {
                uni.navigateTo({
                    url: '/pages/means/means'
                })
            },
            sdfdf() {
                uni.showToast({
                    title: plus
                })
                this.version = plus.runtime.version;
                this.innerVersion = plus.runtime.innerVersion;
            },
            sortresult(param) { //最新
                let value = param["jobType"]
                if (this.sortresult_value != value) { //两次点击不一样是 参数复原 如:点击次数
                    this.sortresult_count = 0
                    this.sortresult_value = value
                }
                this.sortresult_count++;
                if (value == 1) {
                    this.orderBy = "downloadCount";
                } else if (value == 2) {
                    this.orderBy = "latest";
                }
                if (this.sortresult_count % 2 != 0) {
                    this.isAsc = "asc"
                } else {
                    this.isAsc = "desc"
                }
                console.log("orderBy:" + this.orderBy + " ,isAsc:" + this.isAsc)
            },
            //获取文件列表
            fileList() {
                let json = {
                    limit : this.limit,
                    page : this.page,
                };
                if(this.isAsc != ""){
                    json.isAsc = this.isAsc
                }
                if(this.orderBy != ""){
                    json.orderBy = this.orderBy
                }
               //isAsc  orderBy searchKey fileTypeId 文件类型  if 
               
              

                API.HomeresourceList({
                    id: this.id,
                    
                }).then(res => {
                    console.log(res);
                    this.content = res.data.data.contents;
                }).catch(err => {
                    console.log(err);
                })

            }
        },


    }
</script>

<style lang="scss">
    page {
        background: rgb(239, 239, 239);
    }

    .xtnav {
        height: 25px;
        background: #EE3847;
    }

    .nav {
        /deep/ .uni-navbar__header {
            line-height: 1;
        }

        /deep/ .uni-navbar__header-btns {
            width: auto;
        }

        /deep/ .uni-navbar--shadow {
            box-shadow: none;
            border: none;
        }

        .nav-logo {
            image {
                width: 130rpx;
                height: 50rpx;
            }
        }

        .nav-input {
            background: #fff;
            border-radius: 30rpx;
            width: 100%;

            input {
                line-height: 60rpx;
                height: 60rpx;
                padding: 0 20rpx;
                font-size: 30rpx;
            }
        }

        .nav-msg {
            image {
                width: 70rpx;
                height: 50rpx;
            }
        }
    }

    .scroll {
        background: #ee3847;
        font-size: 32rpx;
        padding: 10rpx 0;
        color: #fff;
        white-space: nowrap;
        width: 100%;

        text {
            display: inline-block;
            margin: 0 30rpx;
            padding: 6rpx 0;

            &.x {
                font-weight: 600;
                position: relative;

                &:after {
                    content: '';
                    display: block;
                    height: 2px;
                    width: 50%;
                    margin-left: -25%;
                    left: 50%;
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
                width: 80rpx;
                height: 80rpx;
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
            border-top: 1rpx solid #F2f2f2;
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
        width: 600rpx;
        height: 300rpx;
        display: block;
        margin: 300rpx auto 0 auto;
    }
</style>
