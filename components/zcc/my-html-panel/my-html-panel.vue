<template>
	<view>
		<view class="innerHtml" v-html="html"></view>
	</view>
</template>

<script>
	export default {
		name: "htmlPanel",
		// 使用时请使用 :url.sync=""传值
		props: {
			url: {
				required: true
			}
		},
		data() {
			return {
				loading: false,
				html: ''
			}
		},
		watch: {
			url(value) {
				this.load(value)
			}
		},
		mounted() {
			this.load(this.url)
		},
		methods: {
			load(url) {
				if (url && url.length > 0) {
					// 加载中
					this.loading = true
					let param = {
						accept: 'text/html, text/plain'
					}

					uni.request({
						url: url,
						data: param,
						dataType: 'jsonp',
						header: {

						},
						success: (res) => {
							this.loading = false
							// 处理HTML显示
							this.html = res.data
						}
					});
				}
			}
		}
	}
</script>


<style lang="scss">
	.innerHtml {
		padding: 20rpx;
	}
</style>
