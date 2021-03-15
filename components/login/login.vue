<template>
	<view class="container" @click="closeModal" @touchmove.stop="handle">
		<view class="content animate__animated animate__fadeInUp" @click.stop="handle">
			<view class="content-intro">
				<image src="http://cdn.letwind.com/zy/free/logo.png"></image>
				<view class="content-intro-tips">
					外卖免单宝
					<br />
					领券点外卖，抽免单开现金福袋
				</view>
			</view>
			<view class="content-bottom">
				<button type="primary" size="default" class="content-bottom-btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">
					<image src="/static/images/mine/wechat.png"></image>
					微信一键登录
				</button>
			</view>
			<view class="content-agree">授权登录即表示已阅读并同意《隐私协议》</view>
		</view>
	</view>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
	name:"login",
	data() {
		return {};
	},
	methods: {
		handle(){
			return
		},
		closeModal(){
			this.$emit('close')
		},
		async getUserInfo(e) {
			const { errMsg, userInfo } = e.detail;
			if (errMsg !== 'getUserInfo:ok') {
				return;
			} else {
				uni.login({
					success: res => {
						uni.getUserInfo({
							withCredentials: true,
							success: ress => {
								this.$api.login(res.code, ress.encryptedData, ress.iv, this.$store.state.fromUid).then((res)=>{
									this.$store.commit('SET_TOKEN', res.data.token)
									this.$store.commit('SET_USERINFO', res.data.user)
									this.$emit('close')
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
	.container{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(000, 000, 000, 0.5);
	}
	.content{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 30rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 16rpx 16rpx 0 0;
		--animate-duration: 0.5s;
		&-intro {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-evenly;
			font-size: 30rpx;
			color: #666666;
			image {
				margin-top: 30rpx;
				width: 140rpx;
				height: 140rpx;
			}

			&-tips {
				line-height: 72rpx;
				text-align: center;
			}
		}

		&-bottom {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 0 40rpx;
			margin: 60rpx 0;
			&-btn {
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

		}
		&-agree{
			font-size: 26rpx;
			text-align: center;
			color: #919293;
		}
	}

</style>
