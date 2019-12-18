<template>
	<view>
		<view class="contentView" v-html="content"></view>
	</view>
</template>

<script>
	const API = require('../../common/api.js')
	
	export default {
		data() {
			return {
				id:'',
				content: '',
			}
		},
		onLoad: function (option) {
			this.id = option.id
			
			API.myMessageDetail({
				id: this.id,
			}).then(res => {
				console.log(res);
				this.content = res.data.data.contents;
			}).catch(err => {
				console.log(err);
			})
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	page {
		background: #F1F1F1;
	}

</style>
