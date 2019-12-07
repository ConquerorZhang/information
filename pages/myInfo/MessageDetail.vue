<template>
	<view>
		<text>{{id}}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:''
			}
		},
		onLoad: function (option) {
			this.id = option.id
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
