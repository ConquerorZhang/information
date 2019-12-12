<template>
    <view>
        <uni-nav-bar class="nav" background-color="#EE3847" fixed="true">
            <view class="nav-input"><input type="text" value="" placeholder="请输入关键字" /></view>
            <view slot="left" class="nav-logo"><image src="../../static/logo.png" mode="scaleToFill"></image></view>
            <view slot="right" class="nav-msg"><image src="../../static/message_white.png" mode="aspectFit"></image></view>
        </uni-nav-bar>
        <scroll-view class="scroll" scroll-x="true">
            <text class="x">全部</text>
            <text @click="kg=!kg">点这里试试</text>
            <text>交通信息化</text>
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
        <sl-filter :independence="true" :menuList.sync="menuList"></sl-filter>
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
        </view>
        <view v-else>
            <image src="../../static/interaction/commentEmpty.png" mode="aspectFit" class="empty"></image>
        </view>
    </view>
</template>

<script>
import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue';
import slFilter from '@/components/sl-filter/myPublish-filter.vue';

export default {
    components: {
        uniNavBar,
        slFilter
    },
    data() {
        return {
            kg:false,
            menuList: [
                {
                    'title': '全部',
                    'key': 'key_3',
                    'isSort': true,
                    'isMutiple': false,
                    'detailList': [
                        {
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
                },{
                    'title': '最新上传',
                    'isMutiple': false,
                    'isSort': false,
                    'key': 'jobType',
                    'value': '123',
                    'detailList': [{
                        'title': '全部',
                        'value': '123'
                    }]
                },{
                    'title': '最新上传',
                    'isMutiple': false,
                    'isSort': false,
                    'key': 'jobType',
                    'value': '123',
                    'detailList': [{
                        'title': '全部',
                        'value': '123'
                    }]
                }
                
            ]
        };
    },
    methods: {
        gomeans(){
            uni.navigateTo({
                url:'/pages/means/means'
            })
        }
    }
};
</script>

<style lang="scss">
page {
    background: rgb(239, 239, 239);
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
.means-item{
    .means{
        margin-top: 10rpx;
        display: flex;
        align-items: center;
        background: #fff;
        padding: 20rpx;
        image{
            width: 80rpx;
            height: 80rpx;
        }
        .con{
            flex-grow: 1;
            display: flex;
            align-items: center;
            .title{
                flex-grow: 1;
                padding-left: 30rpx;
                font-size: 30rpx;
            }
        }
    }
    .time{
        border-top: 1rpx solid #F2f2f2;
        background: #fff;
        padding: 20rpx;
        font-size: 24rpx;
        display: flex;
        justify-content: space-between;
        color: rgb(140,140,140);
        .tip{
            color: #333333;
        }
    }
}
.empty{
    width: 600rpx;
    height: 300rpx;
    display: block;
    margin: 300rpx auto 0 auto;
}
</style>
