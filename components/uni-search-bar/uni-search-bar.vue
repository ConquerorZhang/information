<template>
	<view class="uni-searchbar">
		<view :style="{borderRadius:radius+'px'}" class="uni-searchbar__box" @click="searchClick">
			<image src="../../static/search.png" mode="aspectFit" class="uni-searchbar__box-icon-search"></image>            
			<input v-if="show" :focus="showSync" :placeholder="placeholder" @confirm="confirm" class="uni-searchbar__box-search-input"
			 confirm-type="search" type="text" v-model="searchVal" />
			<text v-else class="uni-searchbar__text-placeholder">{{ placeholder }}</text>
			<view v-if="show && (clearButton==='always'||(clearButton==='auto'&&searchVal!==''))" class="uni-searchbar__box-icon-clear" @click.stop="clear">
				<uni-icons color="#999999" class="" size="24" type="clear" />
			</view>
		</view>
		<!-- <text @click="cancel" class="uni-searchbar__cancel" v-if="show">取消</text> -->
	</view>
</template>

<script>
	import uniIcons from "../uni-icons/uni-icons.vue";
	export default {
		name: "UniSearchBar",
		components: {
			uniIcons
		},
		props: {
			placeholder: {
				type: String,
				default: "请输入搜索内容"
			},
			radius: {
				type: [Number, String],
				default: 2
			},
			clearButton: {
				type: String,
				default: "auto"
			}
		},
		data() {
			return {
				show: true,
				showSync: false,
				searchVal: ""
			}
		},
		watch: {
			searchVal() {
				this.$emit("input", {
					value: this.searchVal
				})
			}
		},
		methods: {
			searchClick() {
				// this.searchVal = ""
				// this.show = true;
				console.log('searchClick');
				this.$nextTick(()=>{
					this.showSync = true;
				})
			},
			clear() {
				console.log('clear');
				this.searchVal = ""
				this.$emit("cleartext", {
					value: this.searchVal
				});
			},
			cancel() {
				this.$emit("cancel", {
					value: this.searchVal
				});
				this.searchVal = ""
				this.show = false
				this.showSync = false
				// #ifndef APP-PLUS
				uni.hideKeyboard()
				// #endif
				// #ifdef APP-PLUS
				plus.key.hideSoftKeybord()
				// #endif
			},
			confirm() {
				// #ifndef APP-PLUS
				uni.hideKeyboard();
				// #endif
				// #ifdef APP-PLUS
				plus.key.hideSoftKeybord()
				// #endif
				this.$emit("confirm", {
					value: this.searchVal
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	$uni-searchbar-height: 25px;

	.uni-searchbar {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		position: relative;
		padding: 8px 0;
	}

	.uni-searchbar__box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		overflow: hidden;
		position: relative;
		flex: 1;
		justify-content: center;
		flex-direction: row;
		align-items: center;
		height: $uni-searchbar-height;
		border-width: 1px;
		border-style: solid;
		border-color: $uni-border-color;
		border-radius: 5px;
		background: #efefef;
	}

	.uni-searchbar__box-icon-search {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		width: 32px;
		justify-content: center;
		align-items: center;
        height: 28rpx;
	}

	.uni-searchbar__box-search-input {
		flex: 1;
		font-size: $uni-font-size-base;
		color: $uni-text-color;
	}

	.uni-searchbar__box-icon-clear {
		align-items: center;
		line-height: 24px;
		padding: 0px 5px 0px 5px;
	}

	.uni-searchbar__text-placeholder {
		font-size: $uni-font-size-base;
		color: $uni-text-color-placeholder;
		margin-left: 5px;
	}

	.uni-searchbar__cancel {
		padding-left: 10px;
		line-height: $uni-searchbar-height;
		font-size: 14px;
		color: #ffffff;
	}
</style>
