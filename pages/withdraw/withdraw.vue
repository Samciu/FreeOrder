<template>
	<view class="wrapper">
		<view class="balance">
			<view class="balance-head">
				<view class="balance-head-title">
					余额(元)
				</view>
				<view class="balance-head-detail">
					余额明细
					<view class="iconfont iconiconfontjiantou2">
						
					</view>
				</view>
			</view>
			<view class="balance-money">
				{{balance}}
			</view>
		</view>
		<view class="list">
			<view class="list-head">
				<view class="list-head-title">
					选择提现金额
				</view>
				<view class="list-head-detail">
					提现记录
					<view class="iconfont iconiconfontjiantou2">
						
					</view>
				</view>
			</view>
			<view class="list-items">
				<view :class="['list-items-item', index == itemIndex ? 'active' : '']" v-for="(item, index) in list" :key="index" @click="choose(index)">
					{{item}}元
					<view class="list-items-item-border" v-show="index == itemIndex">
						<view class="list-items-item-border-bg"></view>
						<view class="list-items-item-border-img iconfont iconxuanze"></view>
					</view>
				</view>
			</view>
			<view class="list-head list-head2">
				<view class="list-head-title">
					提现方式
				</view>
			</view>
			<view class="list-type">
				<view class="list-type-wx">
					<image src="/static/images/wechat.png" mode="" class="list-type-wx-icon"></image>
					<view class="list-type-wx-name">微信零钱</view>
					<image src="/static/images/withdraw-choose.png" mode="" class="list-type-wx-choose"></image>
				</view>
			</view>
		</view>
		<view class="tips">
			<view class="tips-head">
				<view class="tips-head-title">
					提现说明
				</view>
			</view>
			<view class="tips-items">
				<view class="tips-items-item" v-for="(item, index) in tips" :key="index">
					{{index + 1}}. {{item}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	export default {
		data() {
			return {
				list: [0.3, 1, 5, 10, 30, 50, 100],
				itemIndex: 0,
				tips: [
					'提现到微信零钱，预计三个工作日内到账',
					'提现失败后，系统会在24小时内返还到原账户',
					'每个用户每天可提现一次',
				],
			};
		},
		computed: {
			...mapState(['userInfo', 'balance']),
		},
		methods: {
			choose(index){
				this.itemIndex = index
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f8f8f8;
	}
	.balance{
		background-color: #FFFFFF;
		padding: 30rpx;
		&-head{
			display: flex;
			font-size: 36rpx;
			margin-bottom: 20rpx;
			&-detail{
				color: #4e62fb;
				font-size: 32rpx;
				margin-left: auto;
				display: flex;
				align-items: center;
			}
		}
		&-money{
			font-size: 80rpx;
		}
	}
	.list{
		background-color: #FFFFFF;
		padding: 30rpx;
		margin-top: 30rpx;
		&-head{
			display: flex;
			font-size: 36rpx;
			margin-bottom: 20rpx;
			&-detail{
				color: #4e62fb;
				font-size: 32rpx;
				margin-left: auto;
				display: flex;
				align-items: center;
			}
		}
		&-items{
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			&-item{
				width: 216rpx;
				height: 100rpx;
				border: 1px solid #d5d5d7;
				color: #959597;
				box-sizing: border-box;
				border-radius: 10rpx;
				margin-top: 20rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-weight: 500;
				position: relative;
				overflow: hidden;
				&.active{
					border-color: #4e62fb;
					color: #4e62fb;
				}
				&-border{
					position: absolute;
					top: 0;
					left: 0;
					width: 50rpx;
					height: 50rpx;
					z-index: 9;
					&-bg{
						width: 0;
						height: 0;
						border-top: 50rpx solid #4e62fb;
						border-right: 50rpx solid transparent;
					}
					&-img{
						position: absolute;
						top: 0;
						left: 0;
						z-index: 99;
						color: #FFFFFF;
						font-size: 28rpx;
					}
				}
			}
		}
		&-head2{
			margin-top: 30rpx;
		}
		&-type{
			display: flex;
			&-wx{
				display: flex;
				align-items: center;
				background-color: #f8f8f8;
				height: 100rpx;
				border: 1px solid #d5d5d7;
				color: #959597;
				box-sizing: border-box;
				border-radius: 10rpx;
				padding: 0 30rpx;
				&-icon{
					width: 44rpx;
					height: 44rpx;
					display: block;
				}
				&-name{
					margin: 0 50rpx 0 5rpx;
				}
				&-choose{
					width: 30rpx;
					height: 30rpx;
					display: block;
				}
			}
		}
	}
	.tips{
		background-color: #FFFFFF;
		padding: 30rpx;
		margin-top: 30rpx;
		&-head{
			display: flex;
			font-size: 36rpx;
			margin-bottom: 20rpx;
		}
		&-items{
			color: #9e9e9e;
			&-item{
				
			}
		}
	}
</style>
