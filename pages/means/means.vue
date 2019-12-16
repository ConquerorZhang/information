<template>
    <view class="conter">
        <view class="xtnav"></view>
        <uni-nav-bar class="collectionBar" left-icon="back" :rightText="delstar == false ? '管理' : '完成'" title="资料下载" @clickLeft="back" @clickRight="clickRightBtn"></uni-nav-bar>
        <view class="bt">最近下载</view>
        <view class="means-item" @click="godetile">
            <image src="../../static/logo.png" mode="aspectFit"></image>
            <view class="con">
                <view class="title">富态信息系统相关资料</view>
                <view class="time">2019-11-20</view>
            </view>
            <view class="tip" v-if="delstar == false">80%</view>
            <view class="del" v-else><checkbox value="cb" /></view>
        </view>
        <view class="means-item" @click="godetile">
            <image src="../../static/logo.png" mode="aspectFit"></image>
            <view class="con">
                <view class="title">富态信息系统相关资料</view>
                <view class="time">2019-11-20</view>
            </view>
            <view class="tip" v-if="delstar == false">80%</view>
            <view class="del" v-else><checkbox value="cb" /></view>
        </view>
        <view class="footers">
            <view v-if="delstar == false" class="empty">
                <image src="../../static/sc.png" mode="aspectFit"></image>
                清空
            </view>
            <view v-else class="btns">
                <view>
                    <label>
                        <checkbox value="cb" />
                        全选
                    </label>
                </view>
                <view class="btn">删除</view>
            </view>
        </view>
    </view>
</template>

<script>
import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue';
export default {
    components: {
        uniNavBar
    },
    data() {
        return {
            delstar: false
        };
    },
    methods: {
        godetile() {
            if (this.delstar) {
            } else {
                uni.navigateTo({
                    url: '/pages/means/means-detile'
                });
            }
        },
        back(){
            uni.navigateBack()
        },
        clickRightBtn(e) {
            this.delstar = !this.delstar;
        },
    }
};
</script>

<style lang="scss">
page {
    background: rgb(239, 239, 239);
    padding-bottom: 100rpx;
}
.xtnav{
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
