<template>
    <view class="conter">
        <view class="xtnav"></view>
        <uni-nav-bar class="collectionBar" left-icon="back" :rightText="delstar == false ? '管理' : '完成'" title="资料下载"
            @clickLeft="back" @clickRight="clickRightBtn"></uni-nav-bar>
        <view class="bt">最近下载</view>
        <checkbox-group @change="checkboxChange">
            <view class="means-item" @click="godetile" v-for="(item,index) in historyList">
                <image src="../../static/logo.png" mode="aspectFit"></image>
                <view class="con">
                    <view class="title">{{item.docName}}</view>
                    <view class="time">{{item.createTime}}</view>
                </view>
                <view class="tip" v-if="delstar == false">80%</view>
                <view class="del" v-else>
                    <checkbox :value="index+ ''" :checked="checkList[index]" />
                </view>
            </view>
        </checkbox-group>
        <view class="footers">
            <view v-if="delstar == false" class="empty">
                <image src="../../static/sc.png" mode="aspectFit"></image>
                清空
            </view>
            <view v-else class="btns">
                <view>
                    <label>
                        <checkbox value="cb" :checked="allchecked" @click="checkAll_cli()" />
                        全选
                    </label>
                </view>
                <view class="btn" @click="deleteHistory">删除</view>
            </view>
        </view>
        <uni-load-more :status="more"></uni-load-more>
    </view>
</template>

<script>
    const API = require('../../common/api.js')
    import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue';
    import uniLoadMore from '@/components/lib/uni-load-more/uni-load-more.vue';
    export default {
        components: {
            uniNavBar,
            uniLoadMore
        },
        data() {
            return {
                more: "more",
                delstar: false,
                historyList: [{
                        docName: "aa",
                        createTime: "2019-12",
                        id: "11"
                    },
                    {
                        docName: "bb",
                        createTime: "2019-12",
                        id: "22"
                    },
                    {
                        docName: "cc",
                        createTime: "2019-12",
                        id: "33"
                    },
                     {
                        docName: "cc",
                        createTime: "2019-12",
                        id: "33"
                    },
                     {
                        docName: "cc",
                        createTime: "2019-12",
                        id: "33"
                    },
                     {
                        docName: "cc",
                        createTime: "2019-12",
                        id: "33"
                    },
                     {
                        docName: "cc",
                        createTime: "2019-12",
                        id: "33"
                    },
                     {
                        docName: "cc",
                        createTime: "2019-12",
                        id: "33"
                    },
                     {
                        docName: "cc",
                        createTime: "2019-12",
                        id: "33"
                    },
                     {
                        docName: "cc",
                        createTime: "2019-12",
                        id: "33"
                    }

                ],
                page: 1,
                limit: 7,
                allchecked: false,  //true 全选  false 取消全选
                checkList: [], //直接在historyList 添加check true false 属性存在问题  所以用 单独的变量来存取选中状态
                paramIds: [], //向后台传递的参数
                checkValues: [] // 选中的下标数组用于移除
            };
        },
        onLoad() {
            this.getHistoryList();
        },
        //加载更多
        onReachBottom() {
            if (this.more == "noMore") {
                return;
            }
            this.getHistoryList("more")
        },
        //下拉刷新
        onPullDownRefresh() {
            this.getHistoryList("Refresh");
        },
        methods: {
            checkAll_cli() {
                this.allchecked = !this.allchecked
                this.checkAll()
            },
            checkAll() {
                this.paramIds = [];
                //true 全选  false 取消全选
                if (this.allchecked) {
                    for (var i = 0; i < this.historyList.length; i++) {
                        //this.historyList[i].
                        this.checkList[i] = true;
                        this.paramIds.push(this.historyList[i].id)
                        this.checkValues.push(i)
                    }
                } else {
                    for (var i = 0; i < this.historyList.length; i++) {
                        this.checkList[i] = false;
                    }
                }
                console.log(this.paramIds)
                console.log(this.checkList)
            },
            getHistoryList(type) {
                if (type == "Refresh") {
                    //刷新 数据 , 页数重置
                    this.page = 1;
                    this.historyList = [];
                    uni.stopPullDownRefresh();
                }
                let json = {
                    page: this.page,
                    limit: this.limit
                };
                API.getHistoryList(json).then(res => {
                    let resdata = res.data.data;
                    if (resdata.length < this.limit) {
                        this.more = "noMore"
                    } else {
                        this.page += 1;
                    }
                    //全选状态下 需要勾选上拉取出来的数据
                    let check_moreType = false;
                    if(this.allchecked == true){
                        check_moreType = true;
                    }
                    for (let i = 0; i < resdata.length; i++) {
                        this.$set(this.checkList,i,false)
                    }
                    this.historyList = this.historyList.concat(resdata)
                }).catch(err => {
                    console.log(err);
                })
            },
            deleteHistory() {
                if (this.paramIds.length == 0) {
                    return;
                }
                this.checkValues.sort(function(a, b) {
                    return b - a;
                })
                if (true) {
                    for (var i = 0; i < this.checkValues.length; i++) {
                        this.historyList.splice(this.checkValues[i], 1);
                        this.checkList.splice(this.checkValues[i], 1);
                    }
                    this.checkValues = [];
                    this.paramIds = [];
                }
                //this.getHistoryList("Refresh");
                this.$forceUpdate();
                console.log(this.checkValues)
                console.log(this.checkList)
                //console.log(this.historyList)
                
               // this.$api.prePage().Refresh();
                /*   API.deleteHistory({
                       historyIds: this.paramIds
                   }).then(res => {
                       if (res.data.code == 0) {
                           for (var i = 0; i < this.checkValues.length; i++) {
                               this.historyList.splice(this.checkValues[i], 1);
                               this.checkList.splice(this.checkValues[i], 1);
                           }
                           this.checkList = [];
                           this.paramIds = [];
                       }
                   }).catch(err => {
                       console.log(err);
                   }) */

            },
            godetile() {
                if (this.delstar) {} else {
                    uni.navigateTo({
                        url: '/pages/means/means-detile'
                    });
                }
            },
            back() {
                uni.navigateBack()
            },
            clickRightBtn(e) {
                this.delstar = !this.delstar;
            },
            checkboxChange: function(e) {
                var values = e.detail.value;  
                this.paramIds = [];
                this.checkValues = [];//向后台传递的id
                let item = this.checkList;
                for (let i = 0; i < this.historyList.length; i++) {
                    if (values.indexOf(i + "") == -1) {
                        //this.checkList[i] = false;
                        this.$set(item,i,false)
                    } else {
                        
                        //this.checkList[i] = true;
                        this.$set(item,i,true)
                        this.paramIds.push(this.historyList[i].id)
                        this.checkValues.push(i)
                    }
                }
                console.log(this.checkValues)
                console.log(this.checkList)
//                 console.log(this.paramIds)
//                 console.log(this.checkValues)
            },
        }
    };
</script>

<style lang="scss">
    page {
        background: rgb(239, 239, 239);
        padding-bottom: 100rpx;
    }

    .xtnav {
        height: 25px;
    }

    .conter {
        overflow: hidden;
    }

    .bt {
        margin-top: 10rpx;
        padding: 16rpx;
        color: rgb(142, 142, 142);
        font-size: 32rpx;
        background: #fff;
    }

    .means-item {
        padding: 30rpx 16rpx;
        display: flex;
        align-items: center;
        background: #fff;
        border-bottom: 1rpx solid #f2f2f2;

        image {
            width: 66rpx;
            height: 66rpx;
        }

        .con {
            flex-grow: 1;
            padding: 0 26rpx;

            .title {
                font-size: 32rpx;
                color: rgb(40, 40, 40);
                line-height: 1.4;
            }

            .time {
                font-size: 26rpx;
                color: rgb(142, 142, 142);
            }
        }

        .tip {
            min-width: 100rpx;
            text-align: right;
        }
    }

    .footers {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;

        .empty {
            text-align: center;
            padding: 20rpx 0;
            font-size: 32rpx;

            image {
                width: 40rpx;
                height: 40rpx;
                display: inline-block;
                margin-right: 30rpx;
                vertical-align: bottom;
            }
        }

        .btns {
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-left: 30rpx;
            font-size: 28rpx;

            .btn {
                background: #EE3847;
                color: #fff;
                min-width: 240rpx;
                text-align: center;
                line-height: 3;
            }
        }
    }
</style>
