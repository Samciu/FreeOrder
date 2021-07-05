<template>
	<view class="wrapper">
		<view class="head">
			<template v-if="isLogin">
				<view class="head-user">
					<image :src="userInfo.avatarUrl" mode="" class="head-user-avatar"></image>
					<view class="head-user-nickname">
						{{userInfo.nickName}}
					</view>
				</view>
			</template>
			<template v-else>
				<view class="head-login">
					<image src="/static/images/wx.png" mode="" class="head-login-wx"></image>
					授权登录
				</view>
			</template>
		</view>
		<view class="item first">
			
		</view>
	</view>
</template>

<script>
	import {mapState, mapGetters} from 'vuex'
	export default {
		data() {
			return {
				loginShow: false,
			}
		},
		computed: {
			...mapGetters(['isLogin']),
			...mapState(['userInfo', 'lotteryNum', 'balance']),
		},
		onLoad() {
			
		},
		onShow() {
			this.$store.dispatch('getUserInfo');
		},
		onShareAppMessage(res) {
			return getApp().shareConfig()
		},
		onShareTimeline(){
			return getApp().shareConfig('timeline')
		},
		methods: {
			login() {
				this.loginShow = true
			},
			loginClose() {
				this.loginShow = false
			},
			
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f8f8f8;
	}
	.head{
		height: 400rpx;
		background: linear-gradient( 180deg, #cf565a, #d72128 100% );
		display: flex;
		justify-content: center;
		&-login{
			padding: 0 30rpx;
			height: 80rpx;
			display: flex;
			align-items: center;
			background-color: #4CD964;
			border-radius: 80rpx;
			color: #FFFFFF;
			&-wx{
				width: 30rpx;
				height: 30rpx;
				margin-right: 20rpx;
			}
		}
		&-user{
			text-align: center;
			margin-top: 60rpx;
			&-avatar{
				width: 130rpx;
				height: 130rpx;
				border-radius: 100%;
				display: block;
			}
			&-nickname{
				font-size: 34rpx;
				color: #FFFFFF;
				margin-top: 10rpx;
			}
		}
	}
	.item{
		width: 690rpx;
		height: 200rpx;
		margin: auto;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		&.first{
			margin-top: -100rpx;
		}
	}
</style>
