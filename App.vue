<script>
	export default {
		globalData: {
			systemInfo:'',
		},
		onLaunch: function() {
			console.log('App Launch')
			this.getSystemInfo();
			// console.log = function() {}
		},
		onShow: function() {
			console.log('App Show')
			console.log = function() {}
		},
		onHide: function() {
			console.log('App Hide')
			// console.log = function() {}
		},
		onError: function(e) {
			console.log(e)
			// console.log = function() {}
		},
		methods:{
			getSystemInfo(){
				uni.getSystemInfo({
					success: (res) => {
						this.systemInfo = res
					}
				})
			}
		}
	}
</script>

<style>
	page {
		height: 100%;
		background: #F1F1F1;
	}
</style>
