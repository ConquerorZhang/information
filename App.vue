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
	page{
		height: 100%;
		background: #F1F1F1;
	}
</style>
