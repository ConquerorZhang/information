<template>
    <view>
        <view class="xtnav"></view>
        <uni-nav-bar class="nav" background-color="#EE3847" fixed="true">
            <view class="nav-input"><input type="text" value="" v-model="searchKey" @input="onKeyInput" placeholder="请输入关键字" /></view>
            <view slot="left" class="nav-logo">
                <image src="../../static/logo.png" mode="scaleToFill"></image>
            </view>
            <view slot="right" class="nav-msg">
                <image src="../../static/message_white.png" mode="aspectFit"></image>
            </view>
        </uni-nav-bar>
        <scroll-view class="scroll" scroll-x="true">
            <text :class="0 == productId ? 'x' : ''" @click="product_all">全部</text>
            <text v-for="(item,index) in lv1list" @click="product_cli(item.id)" :class="item.id == productId ? 'x' : ''">
                {{item.productName}}
            </text>

        </scroll-view>
        <!-- 筛选组件 -->
        <sl-filter :independence="true" :menuList.sync="menuList" @sortresult="sortresult" @result="result"></sl-filter>
        <view v-if="fileList.length > 0">
            <view v-for="(item, index) in fileList" class="means-item" @click="fileDetail(item.id)">
                <view class="means">
                    <view class="con">
                        <image :src="item.doctypeImageUrl" mode="aspectFit"></image>
                        <view class="title">
                            {{item.docName}}
                        </view>
                    </view>
                    <image src="../../static/logo.png" mode="aspectFit"></image>
                </view>
                <view class="time">
                    <view>{{item.createTime}}</view>
                    <view class="tip">
                        下载量:{{item.downloadCount}}
                    </view>
                </view>
            </view>
            <!-- {{version}} ---- {{innerVersion}} -->
        </view>
        <!-- <view>
            <image src="../../static/interaction/commentEmpty.png" mode="aspectFit" class="empty"></image>
        </view> -->
        <uni-load-more :status="more"></uni-load-more>
    </view>
</template>

<script>
    const API = require('../../common/api.js')
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
                        'key': 'key_type',
                        'isSort': true,
                        'isMutiple': false,
                        'detailList': [{
                                'title': '全部',
                                'value': ''
                            },
                            {
                                'title': 'doc',
                                'value': 'doc'
                            },
                            {
                                'title': 'xls',
                                'value': 'xls'
                            },
                            {
                                'title': 'ppt',
                                'value': 'ppt'
                            }, {
                                'title': 'zip',
                                'value': 'zip'
                            }
                        ]
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
                    }, {
                        'title': '下载量',
                        'isMutiple': false,
                        'isSort': false,
                        'key': 'jobType',
                        'value': '1',
                        'detailList': [{
                            'title': '全部',
                            'value': '123'
                        }]
                    }

                ],
                searchKey: "", //搜索关键词
                fileTypeId: [], //类型列表
                productId: 0, // 交通信息化/电子政务等的id 
                limit: "7",
                page: 1, //当前第几页
                orderBy: "", //latest  downloadCount   最新 下载量
                isAsc: "", //asc desc
                sortresult_value: 0, //区分不同排序的点击 
                sortresult_count: 0, //区分正序倒叙
                lv1list: [],
                fileTypeId: "", //文件类型 doc  ppt 
                fileList: [{
                    "id": "1206497536238469122",
                    "docName": "travel.html",
                    "uploadId": "1206497521398616065",
                    "docUrl": null,
                    "fullDocUrl": null,
                    "visitCount": 0,
                    "downloadCount": 0,
                    "createBy": 1,
                    "createTime": "2019-12-16 16:53:23",
                    "charger": "",
                    "tel": "",
                    "docDesc": "",
                    "doctypeImageUrl": "http://10.10.5.32:81/pics/filetype/doc.png",
                    "docType": "html",
                    "searchKeys": "",
                    "createName": null
                }, ],
            };
        },
        onLoad() {
            this.getlv1list(); //获取分类列表
            this.getFileList();
            this.getFileType();
        },
        //加载更多
        onReachBottom() {
            if (this.more == "noMore") {
                return;
            }
            this.getFileList("more")
        },
        //下拉刷新
        onPullDownRefresh() {
            this.getFileList("Refresh")
        },
        methods: {
            product_cli(id) {
                this.productId = id
                console.log("productId:" + this.productId)
                //列表方法
                this.getFileList("Refresh");
            },
            product_all() {
                this.productId = 0
                this.getFileList("Refresh");
            },
            gomeans() {
                uni.navigateTo({
                    url: '/pages/means/means'
                })
            },
            onKeyInput: function(event) {
                this.searchKey = event.target.value
                this.getFileList("Refresh");
            },
            sdfdf() {
                uni.showToast({
                    title: plus
                })
                this.version = plus.runtime.version;
                this.innerVersion = plus.runtime.innerVersion;
            },
            sortresult(param) { //最新
                console.log("-----");
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
                this.getFileList("Refresh");
            },
            result(param) {
                this.$set(this.menuList[0],"title",param["key_type"])
                this.fileTypeId = param["key_type"];
                console.log(this.fileTypeId)
                this.getFileList("Refresh");
            },
            //获取文件列表
            getFileList(type) {
                //页数重置
                if (type == "Refresh") {
                    //页数重置
                    this.page = 1;
                    this.fileList = [];
                    uni.stopPullDownRefresh();
                }

                let json = {
                    limit: this.limit,
                    page: this.page,
                };
                if (this.fileTypeId != "") {
                    json.fileTypeId = this.fileTypeId
                }
                if (this.isAsc != "") {
                    json.isAsc = this.isAsc
                }
                if (this.orderBy != "") {
                    json.orderBy = this.orderBy
                }
                if (this.searchKey != "") {
                    json.searchKey = this.searchKey
                }
                if (this.productId != 0) {
                    json.productId = this.productId
                }

                console.log(json)
                //TODO 下拉框的还没写 
                //isAsc  orderBy searchKey fileTypeId 文件类型  if 
                API.HomeresourceList(json).then(res => {
                    let resdata = res.data.data;
                    console.log(resdata);
                    if (resdata.length < this.limit) {
                        this.more = "noMore"
                    } else {
                        this.page += 1;
                    }
                    this.fileList = this.fileList.concat(resdata)
                }).catch(err => {
                    console.log(err);
                })

            },
            getlv1list() {
                console.log("getlv1list")
                API.getlv1list({}).then(res => {
                    this.lv1list = res.data.data
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })

            },
            getFileType() {
                API.getFileType({}).then(res => {
                    let resList = res.data.data;
                    let arrya_1 = [{
                        'title': '全部',
                        'value': ''
                    }];
                    for (let key in resList) {
                        let json = {
                            title: resList[key].id + "类型",
                            value: resList[key].id
                        }
                        arrya_1.push(json)
                    }
                    this.menuList[0]["detailList"] = arrya_1;

                }).catch(err => {
                    console.log(err);
                })
            },
            fileDetail(fileId) {
                console.log(fileId);
                uni.navigateTo({
                    url: "/pages/means/means-detile?fileId=" + fileId
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
