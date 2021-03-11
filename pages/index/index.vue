<template>
	<view class="wrapper">
		<view class="notice">
			<wyb-noticeBar :text="tips" type="vert" :show-more="false" class="notice-box" bgColor="#cf0013" color="#ffffff" width="300" v-if="tips.length > 0"/>
		</view>
		<view class="hb">
			<!-- <image src="https://funimg.pddpic.com/spi_main/cover_head.png.slim.png" mode="" class="hb-head"></image> -->
			<view class="hb-hd">
				<view class="hb-hd-content">
					<view class="hb-hd-content-head">
						<view class="hb-hd-content-head-user">
							<image :src="isLogin ? userInfo.avatarUrl : '/static/images/default-logo.png'" mode="" class="hb-hd-content-head-user-logo" @click="goUser"></image>
							<view v-if="isLogin" class="hb-hd-content-head-user-name" @click="goUser">
								{{userInfo.nickName}}
							</view>
							<view v-else class="hb-hd-content-head-user-name" @click="login">
								请点击授权登录
							</view>
							<view class="hb-hd-content-head-user-center" @click="goUser">
								<view class="hb-hd-content-head-user-center-text">
									个人中心
								</view>
								<view class="iconfont iconiconfontjiantou2"></view>
							</view>
						</view>
						<view class="hb-hd-content-head-money">
							<template v-if="isLogin">
								<view class="hb-hd-content-head-money-balance" @click="withDraw">
									<view class="hb-hd-content-head-money-balance-do">￥</view>
										<dash-countTo :startVal="oldVal" :endVal="newVal" :decimals='2' :duration='1000'></dash-countTo>
									<view class="hb-hd-content-head-money-balance-wx">
										可提现
									</view>
								</view>
							</template>
							<template v-else @click="login">
								<view class="hb-hd-content-head-money-balance">
									****
									<view class="hb-hd-content-head-money-balance-wx">
										可提现
									</view>
								</view>
							</template>
							
						</view>
						<view class="hb-hd-content-head-btn" @click="doTask()">
							做任务领次数
						</view>
					</view>
				</view>
			</view>
			<view class="hb-bd">
				<view class="hb-bd-turn">
					<view class="hb-bd-turn-content" :animation="animationData">
						<view class="hb-bd-turn-content-block">
							<view :class="['hb-bd-turn-content-block-item', 'item'+index]" v-for="(item, index) in turnList" :key="index">
								<view class="hb-bd-turn-content-block-item-name">
									{{item.name}}
								</view>
								<image :src="item.img" mode="" class="hb-bd-turn-content-block-item-img"></image>
							</view>
						</view>
					</view>
					<view class="hb-bd-turn-btn">
						<view class="hb-bd-turn-btn-lottery" @click="turn()">
							抽奖
						</view>
						<view class="hb-bd-turn-btn-last" @click="turn()">
							还剩{{lotteryNum}}次
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="lotteryModal" @touchmove.stop="handle" @click="closeLotteryModal" v-if="lotteryModalShow">
			<view class="lotteryModal-content animate__animated animate__zoomIn" @click.stop="handle">
				<view class="lotteryModal-content-body">
					<view class="lotteryModal-content-body-title">
						恭喜您中奖了
					</view>
					<view class="lotteryModal-content-body-bd">
						<image src="https://images.pinduoduo.com/market-lottie/2021-01-31/d221aa8d-d8f3-4f27-84e0-90459919e422_suffix.png" mode="" class="lotteryModal-content-body-bd-bg1"></image>
						<image src="https://images.pinduoduo.com/market-lottie/2021-01-31/164a356b-b62a-46bd-99cc-440e562136b2_suffix.png" mode="" class="lotteryModal-content-body-bd-bg2"></image>
						<image src="https://images.pinduoduo.com/market-lottie/2021-01-31/973e52c3-442b-46a8-8ff4-98993373d543_suffix.png" mode="" class="lotteryModal-content-body-bd-bg3" @click="openHongbao"></image>
						<view class="lotteryModal-content-body-bd-title" v-show="!hongbaoMoneyShow">
							<view class="lotteryModal-content-body-bd-title-name">
								免单福利
							</view>
							<view class="lotteryModal-content-body-bd-title-desc">
								发了一个现金福袋
							</view>
						</view>
						<view class="lotteryModal-content-body-bd-money animate__animated animate__jackInTheBox" v-show="hongbaoMoneyShow">
							<view class="lotteryModal-content-body-bd-money-num">
								{{award.money}}
							</view>
							<view class="lotteryModal-content-body-bd-money-yuan">
								元
							</view>
						</view>
					</view>
					<button plain class="lotteryModal-content-body-question" open-type="contact">有疑问？</button>
				</view>
				<image src="/static/images/close.png" mode="" class="lotteryModal-content-cancel" @click.stop="closeLotteryModal"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	export default {
		data() {
			return {
				tips: [
					'小疯子刚刚抽到了免单',
					'长安菇凉刚刚抽到了现金大福袋',
				],
				turnList: [
					{
						'name': '免单霸王餐',
						'img': 'https://funimg-2.pddpic.com/spi_main/icon_redpack.png.slim.png?imageView2/2/w/1300/q/80',
					},
					{
						'name': '现金小福袋',
						'img': 'https://funimg-2.pddpic.com/spi_main/icon_redpack.png.slim.png?imageView2/2/w/1300/q/80',
					},
					{
						'name': '再来一次',
						'img': 'https://funimg-2.pddpic.com/spi_main/icon_redpack.png.slim.png?imageView2/2/w/1300/q/80',
					},
					{
						'name': '现金大福袋',
						'img': 'https://funimg-2.pddpic.com/spi_main/icon_redpack.png.slim.png?imageView2/2/w/1300/q/80',
					},
					{
						'name': '谢谢参与',
						'img': 'https://funimg-2.pddpic.com/spi_main/icon_redpack.png.slim.png?imageView2/2/w/1300/q/80',
					},
					{
						'name': '现金中福袋',
						'img': 'https://funimg-2.pddpic.com/spi_main/icon_redpack.png.slim.png?imageView2/2/w/1300/q/80',
					},
				],
				animationData: {},
				lotteryModalShow: false,
				hongbaoMoneyShow: false,
				oldVal: 0,
				newVal: 0,
				award: {},
			}
		},
		computed: {
			...mapState(['userInfo', 'lotteryNum', 'balance']),
			...mapGetters(['isLogin']),
		},
		watch: {
		    balance: function(newVal, oldVal) {
				this.oldVal = oldVal
				this.newVal = newVal
		    },
		},
		onLoad() {
			
		},
		onShow(){
		    this.$store.dispatch('getUserInfo');
		},
		onShareAppMessage(res) {
			return getApp().shareConfig()
		},
		methods: {
			...mapMutations(['SET_BALANCE']),
			handle(){
				return
			},
			login() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			slowTunr(){
				setInterval(() => {
					var animation = uni.createAnimation({
						duration: 2000,
					    timingFunction: 'linear',
					})
					this.animation = animation
					animation.rotate(this.turnRotate * 30).step()	
					this.animationData = animation.export()
					this.turnRotate ++
				}, 2000)
			},
			turn(){
				if(!this.isLogin) {
					this.login()
					return
				}
				this.lotteryDo()
			},
			doTask(){
				if(!this.isLogin) {
					this.login()
					return
				}
				uni.navigateTo({
					url: "/pages/task/task"
				})
			},
			lotteryDo(){
				this.$api.lotteryDo().then((res)=>{
					this.award = res.data.award
					var animation = uni.createAnimation({
						duration: 3000,
					    timingFunction: 'ease',
					})
					let lotteryNum = 1
					let lotteryRotateMin = -30 * lotteryNum - 5
					let lotteryRotateMax = -90 * lotteryNum + 5
					let rotate =  360 * 3 + Math.floor(Math.random()*(lotteryRotateMax - lotteryRotateMin + 1) + lotteryRotateMin);
					animation.rotate(rotate).step()
					this.animationData = animation.export()
					uni.vibrateShort({
					    
					});
					setTimeout(() => {
						const innerAudioContext = uni.createInnerAudioContext();
						innerAudioContext.autoplay = true;
						innerAudioContext.src = 'https://funimg.pddpic.com/spi_main/money.mp3';
						
						this.openLotteryModal()
						animation.rotate(0).step({duration: 0})
						this.animationData = animation.export()
					}, 3500)
				}).catch((err)=>{
					uni.showToast({
						icon: 'none',
					    title: err.msg,
					    duration: 2000
					});
				})
			},
			openHongbao(){
				this.hongbaoMoneyShow = true
			},
			openLotteryModal(){
				this.lotteryModalShow = true
			},
			closeLotteryModal(){
				this.lotteryModalShow = false
				this.hongbaoMoneyShow = false
				this.$store.dispatch('getUserInfo');
			},
			goUser(){
				uni.navigateTo({
					url: "/pages/user/user"
				})
			},
			withDraw(){
				uni.navigateTo({
					url: "/pages/withdraw/withdraw"
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #d72128;
	}
	.wrapper{
		
	}
	.notice{
		margin-top: 30rpx;
		margin-bottom: 30rpx;
	}
	.hb{
		display: flex;
		flex-wrap: wrap;
		margin: 0 66rpx;
		margin-top: 160rpx;
		position: relative;
		background: linear-gradient( 180deg ,#fce4a9,#fd9f6a 55%,#f5783e);
		border-radius: 50rpx;
		&-hd{
			width: 594rpx;
			margin: auto;
			margin-top: -120rpx;
			background-color: #fff9eb;
			border-radius: 40rpx 40rpx 0 0;
			position: relative;
			// margin-bottom: -60rpx;
			box-sizing: border-box;
			&-content{
				width: 574rpx;
				margin: 20rpx auto;
				background-color: #FFFFFF;
				border: 1px solid rgba(254,230,208,1);
				border-radius: 20rpx 20rpx 0 0;
				position: relative;
				box-sizing: border-box;
				height: 100%;
				&-head{
					width: 100%;
					height: 340rpx;
					&-user{
						display: flex;
						align-items: center;
						padding-top: 10rpx;
						&-logo{
							width: 80rpx;
							height: 80rpx;
							border-radius: 60rpx;
							margin-right: 10rpx;
							margin-left: 20rpx;
							flex-shrink: 0;
						}
						&-name{
							font-size: 30rpx;
							color: #b9562d;
						}
						&-center{
							flex-shrink: 0;
							margin-left: auto;
							background: #fda673;
							color: #fff;
							font-size: 26rpx;
							height: 50rpx;
							display: flex;
							align-items: center;
							border-radius: 50rpx 0 0 50rpx;
							padding-left: 20rpx;
							font-weight: 500;
							.iconiconfontjiantou2{
								font-size: 26rpx;
								padding: 0 4rpx;
							}
						}
					}
					&-money{
						text-align: center;
						font-size: 60rpx;
						line-height: 60rpx;
						color: #d72128;
						display: flex;
						align-items: flex-end;
						justify-content: center;
						margin-top: 40rpx;
						&-balance{
							display: flex;
							align-items: flex-end;
							justify-content: center;
							position: relative;
							&-do{
								font-size: 38rpx;
								line-height: 38rpx;
								margin-bottom: 4rpx;
							}
							&-wx{
								font-size: 24rpx;
								line-height: 1;
								position: absolute;
								right: 0;
								top: -20rpx;
								transform: translate(100%);
								background-color: #fcc68e;
								padding: 8rpx 10rpx;
								border-radius: 14rpx 14rpx 14rpx 0;
								color: #782a09;
							}
						}
					}
					&-btn{
						margin: auto;
						display: flex;
						align-items: center;
						justify-content: center;
						height: 80rpx;
						width: 300rpx;
						margin-top: 30rpx;
						border-radius: 80rpx;
						background-color: #f33d31;
						color: #FFFFFF;
						// background: linear-gradient(to right, #fef8de , #fbe792);
						box-shadow: 0 4rpx 12rpx #b62e25; //8rpx 8rpx 16rpx #c5c5c5
						text-align: center;
						// color: #e81e10;
						animation-timing-function:ease-in-out;
						animation-name:breathe;
						animation-duration:500ms;
						animation-iteration-count:infinite;
						animation-direction:alternate;
					}
				}
				&::after{
					position: absolute;
					content: '';
					width: 548rpx;
					height: 16rpx;
					top: -14rpx;
					left: 12rpx;
					background: rgba(255,255,255,1);
					border: 1px solid rgba(254,230,208,1);
					border-width: 1px 1px 0 1px;
					border-top-left-radius: 20rpx;
					border-top-right-radius: 20rpx;
					box-sizing: border-box;
				}
			}
		}
		&-bd{
			width: 100%;
			position: relative;
			background: url(https://funimg.pddpic.com/spi_main/cover_body.png.slim.png) no-repeat;
			background-size: 100% 100%;
			padding-top: 70rpx;
			padding-bottom: 40rpx;
			margin-top: -60rpx;
			box-sizing: border-box;
			&-turn{
				width: 566rpx;
				height: 566rpx;
				margin: auto;
				box-sizing: border-box;
				position: relative;
				&-content{
					width: 100%;
					height: 100%;
					padding: 40rpx;
					box-sizing: border-box;
					background: url(https://funimg.pddpic.com/spi_main/turntable_bg.png.slim.png);
					background-size: 100%;
					&.rotate{
						animation: turn 30s linear infinite;
						animation-fill-mode: forwards;
					}
					&-block{
						width: 100%;
						height: 100%;
						border-radius: 50%;
						overflow: hidden;
						position: relative;
						transform: rotate(1deg);
						&-item{
							position: absolute;
							left: 50%;
							transform-origin: bottom center;
							display: flex;
							align-items: center;
							justify-content: flex-start;
							flex-direction: column;
							width: 243rpx;
							height: 243rpx;
							&-name{
								font-size: 28rpx;
								line-height: 1;
								font-weight: bold;
								color: rgba(195, 83, 31, 1);
								margin-top: 20rpx;
								margin-bottom: 10rpx;
							}
							&-img{
								display: block;
								width: 84rpx;
								height: 84rpx;
							}
							&.item0{
								transform: translateX(-50%) rotate(0deg);
							}
							&.item1{
								transform: translateX(-50%) rotate(60deg);
							}
							&.item2{
								transform: translateX(-50%) rotate(120deg);
							}
							&.item3{
								transform: translateX(-50%) rotate(180deg);
							}
							&.item4{
								transform: translateX(-50%) rotate(240deg);
							}
							&.item5{
								transform: translateX(-50%) rotate(300deg);
							}
						}
					}
				}
				&-btn{
					width: 282rpx;
					height: 286rpx;
					background: url(https://funimg.pddpic.com/spi_main/turntable_cursor_v2.png.slim.png) no-repeat;
					background-size: 100%;
					position: absolute;
					top: 180rpx;
					left: 144rpx;
					padding-top: 80rpx;
					text-align: center;
					box-sizing: border-box;
					&-lottery{
						color: rgba(253,37,81,1);
						font-weight: 600;
						font-size: 46rpx;
						line-height: 46rpx;
						background: linear-gradient( 180deg, rgba(255,254,251,1) 0%, rgba(255,204,149,1) 100% );
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
						--animate-duration: 2s;
					}
					&-last{
						margin-top: 8rpx;
						color: rgba(253,37,81,1);
						font-weight: 600;
						font-size: 24rpx;
						line-height: 24rpx;
						background: linear-gradient( 180deg, rgba(255,254,251,1) 0%, rgba(255,204,149,1) 100% );
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
					}
				}
			}
		}
	}
	.lotteryModal{
		width: 100%;
		height: 100%;
		background-color: rgba(000, 000, 000, 0.9);
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		&-content{
			--animate-duration: 0.3s;
			&-body{
				width: 600rpx;
				padding: 40rpx 0;
				background-color: #DB5C4E;
				border-radius: 8px;
				&-title{
					font-size: 42rpx;
					color: #FBECCB;
					font-weight: 700;
					text-align: center;
					margin-bottom: 30rpx;
				}
				&-bd{
					position: relative;
					z-index: 9;
					width: 320rpx;
					height: 485rpx;
					margin: auto;
					&-bg1{
						position: absolute;
						z-index: -1;
						top: 0;
						left: 0;
						width: 100%;
						height: 485rpx;
					}
					&-bg2{
						position: absolute;
						z-index: -1;
						bottom: 0;
						left: 0;
						width: 100%;
						height: 166rpx;
					}
					&-bg3{
						position: absolute;
						z-index: -1;
						bottom: 60rpx;
						left: 50%;
						width: 140rpx;
						height: 140rpx;
						transform: translate(-50%);
					}
					&-title{
						padding-top: 120rpx;
						font-size: 30rpx;
						text-align: center;
						color: #FFFFFF;
						&-name{
							margin-bottom: 10rpx;
						}
					}
					&-money{
						padding-top: 130rpx;
						font-size: 26rpx;
						text-align: center;
						color: #FFFFFF;
						display: flex;
						justify-content: center;
						align-items: flex-end;
						--animate-duration: 2s;
						&-num{
							font-size: 60rpx;
							line-height: 1;
						}
						&-yuan{
							
						}
					}
				}
				&-question{
					margin: auto;
					display: block;
					border: none!important;
					font-size: 28rpx;
					color: #576b95!important;
					margin-top: 30rpx;
				}
			}
			&-cancel{
				width: 50rpx;
				height: 50rpx;
				margin: auto;
				display: block;
				margin-top: 60rpx;
			}
		}
		
	}
	@keyframes turn{
		0% { transform:rotate(0deg); }
		25% { transform:rotate(90deg); }
		50% { transform:rotate(180deg); }
		75% { transform:rotate(270deg); }
		100% { transform:rotate(360deg); }
	}
	@keyframes breathe {
		0% {
			opacity:1;
			transform: scale(.90) ;
		}
		100% {
			opacity:1;
			transform: scale(1);
		}
	}
</style>
