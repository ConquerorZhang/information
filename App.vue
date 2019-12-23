<script>
	export default {
		globalData: {
			systemInfo:'',
		},
		onLaunch: function() {
			console.log('App Launch')
			this.getSystemInfo();
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onError: function(e) {
			console.log(e)
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
