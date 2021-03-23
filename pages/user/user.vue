<template>
	<view class="wrapper">
		<view class="head">
			
		</view>
	</view>
</template>

<script>
	import {mapState, mapGetters} from 'vuex'
	export default {
		data() {
			return {
				newIcon: 'https://img-shop.qmimg.cn/s16/images/2020/05/12/ffb0613dded704b6.png',
				loginShow: false,
			}
		},
		computed: {
			...mapGetters(['isLogin']),
			...mapState(['userInfo', 'lotteryNum', 'balance']),
			growthValue() {
				if(!this.isLogin) return 0
				return 12
			}
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
			packages() {
				if(!this.isLogin) {
					this.login()
					return
				}
				uni.navigateTo({
					url: '/pages/packages/index'
				})
			},
			addresses() {
				if(!this.isLogin) {
					this.login()
					return
				}
				uni.navigateTo({
					url: '/pages/address/address'
				})
			},
			integrals() {
				if(!this.isLogin) {
					this.login()
					return
				}
				uni.navigateTo({
					url: '/pages/integrals/integrals'
				})
			},
			attendance() {
				if(!this.isLogin) {
					this.login()
					return
				}
				uni.navigateTo({
					url: '/pages/attendance/attendance'
				})
			},
			orders() {
				// if(!this.isLogin) {
				// 	this.login()
				// 	return
				// }
				uni.navigateTo({
					url: '/pages/order/order'
				})
			},
			memberCode() {
				this.no()
			},
			coupons() {
				if(!this.isLogin) {
					this.login()
					return
				}
				uni.navigateTo({
					url: '/pages/coupons/coupons'
				})
			},
			userinfo() {
				if(!this.isLogin) {
					this.login()
					return
				}
				uni.navigateTo({
					url: '/pages/mine/userinfo'
				})
			},
			services() {
				let url = 'https://baidu.com'
				uni.navigateTo({
					url: '/pages/webview/webview?url=' + url
				});
			},
			giftCards() {
				if(!this.isLogin) {
					this.login()
					return
				}
				uni.navigateTo({
					url: '/pages/giftcard/giftcard'
				})
			},
			no(){
				uni.showToast({
					icon: 'none',
				    title: '暂未开放',
				    duration: 2000
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f8f8f8;
	}
	.head{
		height: 500rpx;
		background: linear-gradient( 180deg, #cf565a, #d72128 100% );;
	}
</style>
