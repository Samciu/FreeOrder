<template>
	<view class="container">
		<view class="position-relative">
			<image src="http://cdn.letwind.com/zy/free/user-bg.png" class="bg"></image>
			<button type="default" size="mini" class="hym-btn" @click="memberCode">
				<image src="/static/images/mine/hym.png"></image>
				<text>会员码</text>
			</button>
		</view>
		
		<view style="padding: 0 30rpx;">
			<!-- user box begin -->
			<view class="d-flex flex-column bg-white user-box">
				
				<view class="d-flex align-items-center">
					<view class="avatar">
						<image :src="isLogin ? userInfo.avatarUrl : '/static/images/mine/default.png'"></image>
						<view class="badge" v-if="isLogin">
							<image src="/static/images/mine/level.png"></image>
							<view>{{ userInfo.id }}</view>
						</view>
					</view>
					<view class="d-flex flex-column flex-fill overflow-hidden" style="margin-top: 20rpx;">
						<view v-if="isLogin" class="font-size-lg font-weight-bold d-flex justify-content-start align-items-center"
							@click="userinfo">
							<view class="text-truncate">{{ userInfo.nickName }}</view>
							<view class="iconfont iconarrow-right line-height-100"></view>
						</view>
						<view v-else class="font-size-lg font-weight-bold" @click="login">请点击授权登录</view>
						<!-- <view class="font-size-sm text-color-assist">
							当前成长值{{ isLogin ? userInfo.id : 0 }}/{{ isLogin ? userInfo.id + userInfo.id : 0 }}
						</view>
						<view class="w-100">
							 <progress percent="0" activeColor="#EA584B" height="8rpx" :percent="growthValue" border-radius="8rpx"/>
						</view> -->
					</view>
				</view>
				<!-- user grid begin -->
				<view class="w-100 d-flex align-items-center just-content-around">
					<view class="user-grid" @click="integrals">
						<view class="value font-size-extra-lg font-weight-bold text-color-base">
							{{  isLogin ? balance : '***' }}
						</view>
						<view class="font-size-sm text-color-assist">余额</view>
					</view>
					<view class="user-grid" @click="giftCards">
						<view class="value font-size-extra-lg font-weight-bold text-color-base">
							{{  isLogin ? lotteryNum : '***' }}
						</view>
						<view class="font-size-sm text-color-assist">剩余抽奖次数</view>
					</view>
				</view>
				<!-- user grid end -->
			</view>
			<!-- user box end -->
			<!-- level benefit box begin -->
			<view class="level-benefit-box" v-if="!isLogin">
				<view class="d-flex align-items-center justify-content-between font-size-base">
					<view class="text-color-base">新用户加入会员，享会员权益</view>
					<view class="text-color-primary" @click="login">立即加入</view>
				</view>
				<view class="row">
					<view class="grid">
						<image src="/static/images/mine/rhyl.png"></image>
						<view>入会有礼</view>
					</view>
					<view class="grid">
						<image src="/static/images/mine/jfdh.png"></image>
						<view>积分兑换</view>
					</view>
					<view class="grid">
						<image src="/static/images/mine/sjtq.png"></image>
						<view>升级特权</view>
					</view>
					<view class="grid">
						<image src="/static/images/mine/srtq.png"></image>
						<view>生日特权</view>
					</view>
				</view>
			</view>
			<!-- level benefit box end -->
			<!-- banner begin -->
			<!-- <image src="/static/images/mine/banner.png" class="banner" mode="widthFix"></image> -->
			<!-- bennaer end -->
		</view>
		<!-- service box begin -->
		<view class="service-box">
			<view class="font-size-lg text-color-base font-weight-bold" style="margin-bottom: 20rpx;">我的服务</view>
			<view class="row">
				<!-- <view class="grid" @click="attendance">
					<view class="image">
						<image src="/static/images/mine/jfqd.png"></image>
					</view>
					<view>积分签到</view>
				</view>
				<view class="grid">
					<view class="image">
						<image src="/static/images/mine/nxsc.png"></image>
					</view>
					<view>积分商城</view>
				</view> -->
				<button open-type="contact" class="grid button" plain>
					<view class="image">
						<image src="/static/images/mine/lxkf.png"></image>
					</view>
					<view>联系客服</view>
				</button>
				<!-- <view class="grid" @click="orders">
					<view class="image">
						<image src="/static/images/mine/wddd.png"></image>
					</view>
					<view>兑换记录</view>
				</view>
				<view class="grid" @click="services">
					<view class="image">
						<image src="/static/images/mine/gdfw.png"></image>
					</view>
					<view>更多服务</view>
				</view> -->
			</view>
		</view>
		<!-- service box end -->
		<!-- tips begin -->
		<view class="d-flex just-content-center align-items-center text-color-assist" style="padding: 30rpx 0; font-size: 22rpx;">
			领券点外卖，抽免单开现金福袋
		</view>
		<!-- tisps end -->
		<login v-if="!isLogin && loginShow" @close="loginClose"></login>
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
	height: 100%;
}

.container {
	width: 100%;
	height: 100%;
}

uni-toast {
	z-index: 10002;
}

.uni-mask {
	z-index: 10000;
}

uni-modal, uni-modal .uni-modal {
	z-index: 10001;
}

.uni-picker-container .uni-picker {
	z-index: 10002;
}

.bg-white {
	background-color: #ffffff;
}

.bg-transparent {
  background-color: transparent !important;
}


.d-flex {
	display: flex;
}

.d-none {
	display: none !important;
}

.invisible {
  visibility: hidden !important;
}

.d-inline {
	display: inline !important;
}

.d-inline-block {
	display: inline-block !important;
}

.d-block {
	display: block !important;
}

.flex-column {
	-ms-flex-direction: column !important;
	flex-direction: column !important;
}

.justify-content-start {
	justify-content: flex-start;
}

.justify-content-end {
	justify-content: flex-end;
}

.justify-content-between {
	justify-content: space-between;
}

.just-content-center {
	justify-content: center;
}

.justify-content-evenly {
	justify-content: space-evenly !important;
}

.just-content-around {
	justify-content: space-around;
}

.align-items-start {
	align-items: flex-start;
}

.align-items-end {
	align-items: flex-end;
}

.align-items-center {
	align-items: center;
}

.align-items-between {
	align-items: space-between;
}

.align-items-around {
	align-items: space-around;
}

.align-items-stretch {
	align-items: stretch;
}

.align-items-baseline {
	-ms-flex-align: baseline !important;
	align-items: baseline !important;
}

.flex-fill {
	-ms-flex: 1 1 auto !important;
	flex: 1 1 auto !important;
}

.flex-wrap {
	-ms-flex-wrap: wrap !important;
	flex-wrap: wrap !important;
}

.flex-nowrap {
	-ms-flex-wrap: nowrap !important;
	flex-wrap: nowrap !important;
}

.flex-shrink-0 {
	-ms-flex-negative: 0 !important;
	flex-shrink: 0 !important;
}

.font-size-base {
	font-size: 28rpx;
}

.font-size-sm {
	font-size: 24rpx;
}

.font-size-medium {
	font-size: 26rpx;
}

.font-size-lg {
	font-size: 32rpx;
}

.font-size-extra-lg {
	font-size: 40rpx;
}


.text-truncate {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.font-weight-bold {
	font-weight: 700 !important;
}

.font-weight-light {
	font-weight: 300 !important;
}

.font-weight-lighter {
	font-weight: lighter !important;
}

.font-weight-normal {
	font-weight: 400 !important;
}

.overflow-auto {
	overflow: auto !important;
}

.overflow-hidden {
	overflow: hidden !important;
}

.position-relative {
	position: relative !important;
}

.position-absolute {
	position: absolute !important;
}

.position-fixed {
	position: fixed !important;
}

.fixed-top {
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	z-index: 1030;
}

.fixed-bottom {
	position: fixed;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 1030;
}

.line-height-100 {
	line-height: 100%;
}

.line-height-2 {
	line-height: 2rem !important;
}

.line-height-50 {
	line-height: 50rem !important;
}

.w-25 {
	width: 25% !important;
}

.w-50 {
	width: 50% !important;
}

.w-75 {
	width: 75% !important;
}

.w-80 {
	width: 80% !important;
}

.w-90 {
	width: 90% !important;
}

.w-100 {
	width: 100% !important;
}

.h-100 {
	height: 100% !important;
}

.h-auto {
	height: auto !important;
}

.text-left {
	text-align: left !important;
}

.text-right {
	text-align: right !important;
}

.text-center {
	text-align: center !important;
}

.border-box {
	box-sizing: border-box;
}

.rounded-circle {
	border-radius: 50% !important;
}

.rounded-pill {
	border-radius: 50rem !important;
}


.pre-line {
	white-space: pre-line;
}

.align-top {
	vertical-align: top !important;
}

.align-middle {
	vertical-align: middle !important;
}

.align-bottom {
	vertical-align: bottom !important;
}

.align-text-bottom {
	vertical-align: text-bottom !important;
}

.align-text-top {
	vertical-align: text-top !important;
}

.w-60 {
	width: 60%;
}

.w-40 {
	width: 40%;
}

.mb-10 {
	margin-bottom: 10rpx;
}

.mb-20 {
	margin-bottom: 20rpx;
}

.mb-30 {
	margin-bottom: 30rpx;
}

.mb-40 {
	margin-bottom: 40rpx;
}

.mb-50 {
	margin-bottom: 50rpx;
}

.mt-30 {
	margin-top: 30rpx;
}

.mt-40 {
	margin-top: 40rpx;
}

.ml-10 {
	margin-left: 10rpx;
}

.ml-20 {
	margin-left: 20rpx;
}

.ml-30 {
	margin-left: 30rpx;
}

.mr-10 {
	margin-right: 10rpx;
}

.mr-20 {
	margin-right: 20rpx;
}

.mr-30 {
	margin-right: 30rpx;
}

.mr-40 {
	margin-right: 40rpx;
}

.pl-20 {
	padding-left: 20rpx;
}

.pl-30 {
	padding-left: 30rpx;
}

.pr-20 {
	padding-right: 20rpx;
}

.p-30 {
	padding: 30rpx;
}

.p-10 {
	padding: 10rpx;
}
.bg {
	width: 100%;
	height: calc(410 / 594 * 750rpx);
}
.d-flex{
	display: flex;
}
.hym-btn {
	position: absolute;
	top: 40rpx;
	right: 40rpx;
	color: #ADB838;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50rem;
	font-size: 24rpx;
	box-shadow: 0 0 20rpx rgba(66,66,66,0.1);
	&::after {
		border: 0;
	}
	
	image {
		width: 30rpx;
		height: 30rpx;
		margin-right: 10rpx;
	}
}

.user-box {
	position: relative;
	border-radius: 8rpx; 
	margin-bottom: 30rpx;
	margin-top: -115rpx;
	box-shadow: 0 20rpx 20rpx -20rpx rgba($color: #333, $alpha: 0.1);;
}

.avatar {
	position: relative;
	margin-top: -35rpx;
	margin-left: 35rpx;
	margin-right: 35rpx;
	width: 160rpx;
	height: 160rpx;
	border-radius: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #FFFFFF;
	box-shadow: 0 0 20rpx rgba($color: #000000, $alpha: 0.2);
	
	image {
		width: 140rpx;
		height: 140rpx;
		border-radius: 100%;
	}
	
	.badge {
		position: absolute;
		right: -10rpx;
		bottom: -10rpx;
		background-color: #FFFFFF;
		border-radius: 50rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FAB714;
		font-size: 24rpx;
		padding: 8rpx 16rpx;
		box-shadow: 0 0 20rpx rgba($color: #000000, $alpha: 0.2);
		
		image {
			width: 30rpx;
			height: 30rpx;
		}
	}
}

.level-benefit {
	margin-left: 35rpx;
	padding: 10rpx 0 10rpx 30rpx;
	border-radius: 50rem 0 0 50rem;
}

.user-grid {
	width: 25%;
	padding: 30rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	
	.value {
		margin-bottom: 20rpx;
	}
}

.level-benefit-box {
	border-radius: 8rpx; 
	margin-bottom: 30rpx;
	box-shadow: 0 10rpx 8rpx rgba($color: #878889, $alpha: 0.1);
	width: 100%;
	display: flex;
	padding: 30rpx;
	flex-direction: column;
	background-color: #FFFFFF;
	
	.row {
		display: flex;
		padding: 30rpx 0 20rpx;
		justify-content: space-around;
		align-items: center;
		
		.grid {
			width: 20%;
			display: flex;
			flex-direction: column;
			font-size: 24rpx;
			color: #919293;
			align-items: center;
			image {
				width: 80rpx;
				height: 80rpx;
				margin-bottom: 10rpx;
			}
		}
	}
}

.banner {
	width: 100%;
	border-radius: 8rpx;
	margin-bottom: 30rpx;
}

.service-box {
	margin: 30rpx;
	background-color: #FFFFFF;
	padding: 32rpx 30rpx 10rpx;
	box-shadow: 0 20rpx 20rpx -20rpx rgba($color: #333, $alpha: 0.1);
	
	.row {
		display: flex;
		flex-wrap: wrap;
		color: #919293;
		font-size: 24rpx;
		padding-bottom: -40rpx;
		
		.grid {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-bottom: 40rpx;
			width: 25%;
			position: relative;
			&.button{
				line-height: normal;
				padding: 0;
				font-size: 24rpx;
				color: #919293;
				border: none;
			}
			.image {
				image {
					width: 80rpx;
					height: 80rpx;
					margin-bottom: 20rpx;
				}
			}
			
			.new-badage {
				width: 40rpx;
				height: 40rpx;
				position: absolute;
				top: 0;
				right: 30rpx;
			}
		}
	}
}
</style>
