<template>
	<view class="content">
		<radio-group class="radio-group" @change="radioChange" :name="name">
			<label :class="item.checked ?  'checkbox selectBox' : 'checkbox '" @click="labelBtn(item.value,index)" v-for="(item,index) in labelList"
			 :key="item.value">
				<radio class="radio" :value="item.value" :checked="item.checked" v-show="false" />{{item.name}}
				
				<image class="icon_sort" src="../../static/logo.png" v-if="showsorticon"></image>
			</label>
		</radio-group>
	</view>
</template>

<script>
	export default {
		props: {
			labelList: {
				type: [Object, Array],
				default: [{
					name: '单选项',
					value: '0',
					checked: false
				}],
			},
			name: {
				type: String,
				default: 'name'
			},
			showsorticon:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				labelName: '',
				labelDataList: 0,
			};
		},
		methods: {
			labelBtn(name, index) {
				// console.log(name, index, "nameindex")
				this.labelName = name
				for (let i in this.labelList) {
					this.labelList[i].checked = false;
				}
				this.labelList[index].checked = true
			},
			radioChange: function(e) {
				this.labelDataList = e.detail.value
				// console.log(e)
				// console.log('radio发生change事件，携带value值为：' + e.detail.value)
				// console.log(this.labelDataList, "labelDataList")
				var value = e.detail.value;
				this.$emit('trigger_sort', {
					value
				});
			},
		}
	}
</script>

<style>
	.selectBox {
		background: #2a92f9 !important;
		color: #fff !important;
	}

	.checkbox {
		width: 18%;
		height: auto;
		display: flex;
		justify-content: center;
		flex-wrap: nowrap;
		padding: 5px 5px;
		border: 0px solid #2a92f9;
		margin: 0px 5px;
		border-radius: 7upx;
		color: #000;
	}

	.icon_sort {
		position: relative;
		justify-content: flex-end;
		align-self: center;
		margin-left: 20%;
		right: 10rpx;
		width: 20rpx;
		height: 20rpx;
	}

	.content {
		padding: 0 10px;
	}

	.radio-group {
		width: 100%;
		font-size: 20upx;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;

	}
</style>
