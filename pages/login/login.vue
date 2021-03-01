<template>
	<view class="container">
		<view class="intro">
			<image src="/static/logo.png"></image>
			<view class="tips">
				积分好物
				<br />
				玩赚积分，兑换好物
			</view>
		</view>
		<view class="bottom">
			<button type="primary" size="default" class="login-btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">
				<image src="/static/images/mine/wechat.png"></image>
				微信一键登录
			</button>
			<view class="d-flex" style="height: 30vh;">
				<view class="text-align">新用户登录即加入会员，享会员权益</view>
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
				<view class="text-align">会员权益说明</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
	data() {
		return {};
	},
	methods: {
		async getUserInfo(e) {
			const { errMsg, userInfo } = e.detail;
			if (errMsg !== 'getUserInfo:ok') {
				uni.showModal({
					title: '提示',
					content: '您取消了授权登录，请重新授权',
					showCancel: false
				});
				return;
			} else {
				uni.login({
					success: res => {
						uni.getUserInfo({
							withCredentials: true,
							success: ress => {
								this.$api.login(res.code, ress.encryptedData, ress.iv).then((res)=>{
									this.$store.commit('SET_TOKEN', res.data.token)
									this.$store.commit('SET_USERINFO', res.data.user)
									uni.navigateBack();
								}).catch((err)=>{
									uni.showToast({
										icon: 'none',
									    title: err.msg,
									    duration: 2000
									});
								})
							}
						});
					}
				});
				
			}
		}
	}
};
</script>

<style lang="scss">
page{
	background-color: #f8f8f8;
}
.intro {
	width: 100%;
	height: 60vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	font-size: 28rpx;
	color: #919293;

	image {
		width: 165rpx;
		height: 165rpx;
	}

	.tips {
		line-height: 72rpx;
		text-align: center;
	}
}

.bottom {
	height: 40vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 0 40rpx;

	.login-btn {
		width: 100%;
		border-radius: 50rem !important;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10rpx 0;

		image {
			width: 36rpx;
			height: 30rpx;
			margin-right: 10rpx;
		}
	}
	.d-flex{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column !important;
		justify-content: space-evenly !important;
		.row {
			display: flex;
			justify-content: space-around;
			align-items: center;
			width: 100%;
			.grid {
				width: 20%;
				text-align: center;
				image {
					width: 60rpx;
					height: 60rpx;
					margin-bottom: 10rpx;
				}
			}
		}
	}
	
	.text-align{
		text-align: center;
	}
}
</style>
