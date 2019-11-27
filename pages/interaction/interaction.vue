<!-- 互动专区 -->

<template>
	<view>
		<view class="top">
			<image class="icon_logo" src="../../static/logo.png"></image>
			<view class="top-right">
				<image class="top-right-icon" src="../../static/logo.png"></image>
				<text class="top-right-text">消息</text>
			</view>
		</view>
		<!-- 自定义Placeholder 搜索框 -->
		<uni-search-bar placeholder="关键字" radius="8" clearButton="auto" @confirm="search" class="search" />

		<!-- <uni-fab :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical" :direction="direction"
		 @trigger="trigger"></uni-fab> -->
		<wlradio :labelList="labelList" :name="name" class="sort-radio" :showsorticon="showsorticon_sort" @trigger_sort="trigger_sort"></wlradio>
		<wlradio :labelList="orderList" :name="name" class="order-radio" :showsorticon="showsorticon_order" @trigger_sort="trigger_sort"></wlradio>
	</view>
</template>

<script>
	import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue";
	import wlradio from "@/components/wl-group/wl-radio.vue";

	export default {
		data() {
			return {
				name:"",
				showsorticon_sort:false,
				labelList: [{
					name: '全部',
					value: '0',
					checked: true
				}, {
					name: '业务咨询区',
					value: '2',
					checked: false
				}, {
					name: '需求咨询区',
					value: '3',
					checked: false
				}, {
					name: '经验分享区',
					value: '4',
					checked: false
				}],
				showsorticon_order:true,
				orderList: [{
					name: '时间',
					value: '0',
					checked: true
				}, {
					name: '回复数',
					value: '2',
					checked: false
				}],
				horizontal: 'left',
				vertical: 'bottom',
				direction: 'horizontal',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: "#007AFF"
				},
				content: [{
						iconPath: '/static/component.png',
						selectedIconPath: '/static/componentHL.png',
						text: '组件',
						active: false
					},
					{
						iconPath: '/static/api.png',
						selectedIconPath: '/static/apiHL.png',
						text: 'API',
						active: false
					},
					{
						iconPath: '/static/template.png',
						selectedIconPath: '/static/templateHL.png',
						text: '模版',
						active: false
					}
				]
			};
		},
		components: {
			uniSearchBar,
			wlradio

		},
		methods: {
			trigger_sort(item) {
				console.log("value的值为："+item.value);
				/* this.content[e.index].active = !e.item.active;
				uni.showModal({
					title: '提示',
					content: `您${this.content[e.index].active?'选中了':'取消了'}${e.item.text}`,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				}); */
			}
		}
	}
</script>

<style lang="scss">
	.top {
		display: flex;
		justify-content: space-between;

		.icon_logo {
			width: 50rpx;
			height: 50rpx;
			padding: $uni-spacing-row-base $uni-spacing-row-base;
		}

		.top-right {
			width: 100rpx;
			display: flex;
			position: fixed;
			right: $uni-spacing-row-base;
			top: $uni-spacing-row-base;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.top-right-icon {
				width: 30rpx;
				height: 30rpx;
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

	.search {
		padding: 20rpx 20rpx;
	}

	.sort-radio {
		padding: 20rpx 20rpx;
	}
</style>
