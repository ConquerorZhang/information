<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onError:function(e){
			console.log(e)
		}
	}
</script>

<style>
	.page{
		width: 100%;
		height: 100%;
		position: relative;
		background-color: #C8C7CC;
	}
</style>
