<template>
    <view class="conter">
        <view class="detaile">
            <view class="title">{{detailData.docName}}</view>
            <view class="time">{{detailData.createTime}}</view>
            <view class="tips">
                <image src="../../static/my.png" mode="aspectFit"></image>
                <text>负责人:{{detailData.charger == '' ? '暂无' : detailData.charger}}</text>
                <image src="../../static/attention.png" mode="aspectFit"></image>
                <text>浏览: {{detailData.visitCount}}次</text>
                <image src="../../static/down-detile.png" mode="aspectFit"></image>
                <text>下载: {{detailData.downloadCount}}次</text>
            </view>
        </view>
        <view class="main" v-if="detailData.docDesc != '' && detailData.docDesc != null ">
            {{detailData.docDesc}}
        </view>
        <view  v-else class="main">
        	暂无说明
        </view>
        <view class="footers">
            <view class="pople" @click="openpopup">
                <image src="../../static/mys.png" mode="aspectFit"></image>
                <text>负责人</text>
            </view>
            <view class="btn">
                <image src="../../static/downb.png" mode="aspectFit"></image>
                <text @click="todownloadList(detailData.fullDocUrl,detailData.docType,detailData.docName,detailData.id,detailData.doctypeImageUrl)">下载资料</text>
            </view>
        </view>
        <uni-popup ref="replyPopup" type="center">
            <view class="popupcon">
                <image src="../../static/sc_sec.png" mode="aspectFit" class="close" @click="close"></image>
                <view class="item">
                    <view class="tip">负责人</view>
                    <view v-if="detailData.charger != '' && detailData.charger != null" class="title">
                    	{{detailData.charger}}
                    </view>
                    <view class="title" v-else>
                    	暂无
                    </view>
                </view>
                <view class="item">
                    <view class="tip">联系方式</view>
                    <view v-if="detailData.tel != '' && detailData.tel != null" class="title">
                    	{{detailData.tel.slice(0,4) + "****" +  detailData.tel.slice(8,11)}}
                    </view>
                    <view class="title" v-else>
                    	暂无
                    </view>
                </view>
                <view class="item x">
                    <view class="tip">文档说明</view>
                     <view v-if="detailData.docDesc != '' && detailData.docDesc != null" class="title">
                    	{{detailData.docDesc}}
                    </view>
                    <view class="title" v-else>
                    	暂无
                    </view>
                </view>
            </view>
        </uni-popup>
    </view>
</template>

<script>
    const API = require('../../common/api.js')
    import uniPopup from '@/components/lib/uni-popup/uni-popup.vue';
    var wv; //计划创建的webview
    export default {
         components: {
            uniPopup
        },
        data() {
            return {
                detailData: {
                    /* "id": "1206529024577241089",
                    "docName": "1_1116508171.doc",
                    "uploadId": "1206529023591215106",
                    "docUrl": "/aaaa.doc",
                    "fullDocUrl": "http://10.10.5.33:82/aaaa.doc",
                    "visitCount": 0,
                    "downloadCount": 0,
                    "createBy": 1,
                    "createTime": "2019-12-16 18:58:30",
                    "charger": "张三",
                    "tel": "",
                    "docDesc": "文档说明。。。。。。。。。。。。。。。。。。。。。。。。。。。。。",
                    "doctypeImageUrl": null,
                    "docType": "doc",
                    "searchKeys": "关键词1 关键词2  关键词3",
                    "createName": null */
                }
            };
        },
        onLoad(param) {
            this.onloadFun(param.fileId)
        },
        onShow() {
            
        	this.callHandler('ObjC Echo', {
        		'key': 'inner'
        	});
        }, 

        methods: {
            onloadFun(id) {
                API.getfileDetail({
                    id: id
                }).then(res => {
                    let resdata = res.data.data;
                    this.detailData = resdata
                }).catch(err => {
                    console.log(err);
                })

            },
            todownloadList(fullDocUrl,docType,docName,id,doctypeImageUrl) {
                uni.navigateTo({
                    url: "/pages/means/means?type=download&fullDocUrl=" + fullDocUrl + "&docType=." + docType  + "&fileName=" + docName + "&id=" + id + "&doctypeImageUrl=" + doctypeImageUrl
                })
            },

            openpopup() {
                this.$refs.replyPopup.open()
            },
            close() {
                this.$refs.replyPopup.close()
            },
            back() {
                uni.navigateBack({
                    delta: 1
                })
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
        background: #FFFFFF;
        position: fixed;
        left: 0;
        right: 0;
    }

    .detaile {
        border-top: 1px solid #f2f2f2;
        background: #fff;
        padding: 30rpx 20rpx;

        .title {
            font-size: 32rpx;
        }

        .time {
            font-size: 24rpx;
            color: rgb(142, 142, 142);
        }

        .tips {
            font-size: 24rpx;
            color: rgb(142, 142, 142);
            margin-top: 10rpx;

            image {
                width: 30rpx;
                height: 30rpx;
                display: inline-block;
                vertical-align: middle;
                margin-right: 6rpx;
            }

            text {
                vertical-align: middle;
                margin-right: 24rpx;
            }
        }
    }

    .main {
        padding: 30rpx 20rpx;
        margin-top: 10rpx;
        background: #fff;
        font-size: 28rpx;
        color: #666666;
        word-wrap:break-word;
    }

    .footers {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        text-align: center;
        background: #fff;
        line-height: 80rpx;
        font-size: 30rpx;

        image {
            width: 40rpx;
            height: 40rpx;
            display: inline-block;
            vertical-align: middle;
            margin-right: 8rpx;
        }

        .pople {
            flex-grow: 1;
            color: #ee3847;
            border: 1rpx solid #ee3847;
        }

        .btn {
            flex-grow: 1;
            background: #ee3847;
            color: #fff;
            border: 1rpx solid #ee3847;
        }
    }

    .popupcon {
        background: #FFF;
        border-radius: 30rpx;
        padding: 10rpx 30rpx;
        position: relative;
        width: 460rpx;

        .close {
            width: 60rpx;
            height: 60rpx;
            position: absolute;
            top: -60rpx;
            right: -60rpx;
        }

        .item {
            .tip {
                font-size: 24rpx;
                color: rgb(142, 142, 142);
                margin-bottom: 6rpx;
            }

            .title {
                font-size: 32rpx;
                line-height: 1.4;
                word-wrap:break-word;
            }

            padding: 15rpx;
            border-bottom: 1rpx solid #f2f2f2;

            &.x {
                border: none;
            }
        }
    }
</style>
