<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			};
		},
		onLoad(e){
			if(e.url){
				this.url = e.url
			}
		}
	}
</script>

<style lang="scss">

</style>
