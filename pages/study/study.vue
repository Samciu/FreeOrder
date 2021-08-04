<template>
	<view>
		<video class="video" id="video" :autoplay="true" :src="url" />
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
			debugger
			this.url = e.url || "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e4dc55ba-699d-4d33-b9f3-6a977cb95226/748919a8-4375-4776-acdd-48e951e2e6e5.mp4"
		}
	}
</script>

<style>
	.video {
		width: 100%;
		height: 100vh;
	}
</style>
