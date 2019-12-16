<template>
    <view class="conter">
        <view class="gdjk"></view>
        <view class="detaile">
            <view class="title">孵化信息系统资料DOC</view>
            <view class="time">2019-11-21 15:21</view>
            <view class="tips">
                <image src="../../static/tab-my.png" mode="aspectFit"></image>
                <text>负责人:徐鹏</text>
                <image src="../../static/attention.png" mode="aspectFit"></image>
                <text>浏览: 8484次</text>
                <image src="../../static/arrow_down_black.png" mode="aspectFit"></image>
                <text>下载: 2132次</text>
            </view>
        </view>
        <view class="main">内容 需要插件 目前需求不明确</view>
        <view class="footers">
            <view class="pople" @click="openpopup">
                <image src="../../static/tab-my.png" mode="aspectFit"></image>
                <text>负责人</text>
            </view>
            <view class="btn">
                <image src="../../static/tab-my.png" mode="aspectFit"></image>
                <text>下载资料</text>
            </view>
        </view>
        <uni-popup ref="replyPopup" type="center">
            <view class="popupcon">
                <image src="../../static/sc_sec.png" mode="aspectFit" class="close" @click="close"></image>
                <view class="item">
                    <view class="tip">负责人</view>
                    <view class="title">张三</view>
                </view>
                <view class="item">
                    <view class="tip">负责人</view>
                    <view class="title">张三</view>
                </view>
                <view class="item x">
                    <view class="tip">负责人</view>
                    <view class="title">张三</view>
                </view>
            </view>
        </uni-popup>
    </view>
</template>

<script>
import uniPopup from '@/components/lib/uni-popup/uni-popup.vue';
export default {
    components: {
        uniPopup
    },
    data() {
        return {};
    },
    methods: {
        openpopup(){
            this.$refs.replyPopup.open()
        },
        close(){
            this.$refs.replyPopup.close()
        }
    }
};
</script>

<style lang="scss">
page {
    background: rgb(239, 239, 239);
    padding-bottom: 100rpx;
}
.gdjk{
    height: var(--status-bar-height);
    width: 100%;
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
            width: 36rpx;
            height: 36rpx;
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
    margin-top: 10rpx;
    min-height: 400rpx;
    background: #fff;
    text-align: center;
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
        width: 50rpx;
        height: 50rpx;
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
.popupcon{
    background: #FFF;
    border-radius: 30rpx;
    padding: 10rpx 30rpx;
    position: relative;
    width: 460rpx;
    .close{
        width: 60rpx;
        height: 60rpx;
        position: absolute;
        top: -60rpx;
        right: -60rpx;
    }
    .item{
        .tip{
            font-size: 24rpx;
            color: rgb(142, 142, 142);
            margin-bottom: 6rpx;
        }
        .title{
            font-size: 32rpx;
            line-height: 1.4;
        }
        padding: 15rpx;
        border-bottom: 1rpx solid #f2f2f2;
        &.x{
            border: none;
        }
    }
}
</style>
