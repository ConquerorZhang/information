<template>
    <view class="conter">
        <uni-nav-bar class="collectionBar" left-icon="back" :rightText="delstar == false ? '管理' : '完成'" title="资料下载"
            @clickLeft="back" @clickRight="clickRightBtn" :shadow="shade" :border="shade" :fixed="statusBar" :statusBar="statusBar"></uni-nav-bar>
        <view class="bt">最近下载</view>
        <checkbox-group @change="checkboxChange">
            <!-- 正在下载 -->
            <view class="means-item" v-for="(item,index) in downloadList">
                <image src="../../static/logo.png" mode="aspectFit"></image>
                <view class="con">
                    <view class="title">{{item.docName.split(".")[0]}}</view>
                    <view class="time">{{item.createTime}}</view>
                </view>
                <view class="tip" v-if="delstar == false">{{item.percentage}}</view>
            </view>
            <!-- 下载完成的传那个name -->
            <view class="means-item" v-for="(item,index) in historyList" @click="openFile(item.docName)">
                <image src="../../static/logo.png" mode="aspectFit"></image>
                <view class="con">
                    <view class="title">{{item.docName.split(".")[0]}}</view>
                    <view class="time">{{item.createTime}}</view>
                </view>
                <view class="tip" v-if="delstar == false"></view>
                <view class="del" v-else>
                    <checkbox :value="index+ ''" :checked="checkList[index]" />
                </view>
            </view>
        </checkbox-group>
        <view class="footers">
            <view v-if="delstar == false" class="empty" @click="delAll()">
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
        <uni-load-more :status="more" style="margin-bottom: 60rpx;"></uni-load-more>
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
                shade:false,
                statusBar:true,
                statusBarHeight:0,
                more: "more",
                delstar: false,
                downloadList: [],
                param:{},
                historyList: [/* {
                        docName: "aa",
                        createTime: "2019-12",
                        id: "11",
                        fullDocUrl: "http://10.10.5.33:82/aaaa.doc"
                    }, */
                ],
                page: 1,
                limit: 7,
                allchecked: false, //true 全选  false 取消全选
                checkList: [], //直接在historyList 添加check true false 属性存在问题  所以用 单独的变量来存取选中状态
                paramIds: [], //向后台传递的参数
                checkValues: [], // 选中的下标数组用于移除
                responseData: 0.0
            };
        },
        onLoad(param) {
            //需新建下载任务的
            this.param = param;
            if (param.type == "download") {
                var now = new Date();
                var year = now.getFullYear(); //得到年份
                var month = now.getMonth();//得到月份
                var date = now.getDate();//得到日期
                this.downloadList = [{
                    docName: param.fileName,
                    createTime: year + "-" + (month+1) +"-"+date,
                    percentage: 0
                }]
                this.download_fun(param.fullDocUrl, param.docType,param.fileName,param.id);
            }
            this.getHistoryList("Refresh");
        },
        onShow() {
        	this.callHandler('ObjC Echo', {
        		'key': 'inner'
        	});
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
            download_fun(fullDocUrl, docType,fileName,id) {
                let this_ = this
                this.callHandlerBack("native_download", {
                    'downloadUrl': fullDocUrl, //param.fullDocUrl
                    'contentDisposition': '文件描述',
                    'mimeType': docType,
                    'filename': fileName  //param.docType
                }, function(responseData) {
                    //注意第一次回调问题
                    console.log("--------------download:", responseData)
                    if (responseData == 1.0 || responseData == "100%") {
                        responseData = "已完成"
                        //刷新该页面
                        this.getHistoryList("Refresh");
                        //下载量加一
                        API.downloadedAdd({id:id}).then(res => {}).catch(err => {
                            console.log(err);
                        })
                    }
                    this_.$set(this_.downloadList[0], "percentage", responseData)
                    this.prow1 = responseData112;
                })
            },
            openFile(fileName){
                this.callHandlerBack("native_fileOpen",  {filename:fileName}, function(responseData) {
                    //注意第一次回调问题
                    if(responseData == 0 || responseData == "0"){
                        uni.showToast({
                            icon:"none",
                            title:"文件不存在!"
                        })
                        return;  
                    }
                })
            },
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
                    this.more = "more"
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
                    if (this.allchecked == true) {
                        check_moreType = true;
                    }
                    for (let i = 0; i < resdata.length; i++) {
                        this.$set(this.checkList, i, false)
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
                API.deleteHistory({
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
                })
            },
            delAll() {
                uni.showModal({
                    title: '提示',
                    confirmColor: '#fa436a',
                    content: '是否确定清空',
                    success: function(res) {
                        API.deletealthistory({
                        }).then(res => {
                            if (res.data.code == 0) {
                                this.historyList = [];
                            }
                        }).catch(err => {
                            console.log(err);
                        })
                    }
                });

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
                this.checkValues = []; //向后台传递的id
                let item = this.checkList;
                for (let i = 0; i < this.historyList.length; i++) {
                    if (values.indexOf(i + "") == -1) {
                        //this.checkList[i] = false;
                        this.$set(item, i, false)
                    } else {

                        //this.checkList[i] = true;
                        this.$set(item, i, true)
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
    /deep/ uni-checkbox .uni-checkbox-input{
        border-radius: 50%;
    }
    /deep/ uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked{
        border: 1px solid rgb(199, 22, 30);
        background-color: rgb(199, 22, 30);
        color: #FFF !important;
    }
    .xtnav {
        background: #FFFFFF;
        position: fixed;
        left: 0;
        right: 0;
        z-index: 999;
        top: 0;
    }
    .collectionBar{

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
            background: rgb(239, 239, 239);
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
