<template>
	<view class="wrapper">
		<view class="head">
			<image src="http://cdn.letwind.com/zy/free/task.png" mode="" class="head-bg"></image>
		</view>
		<view class="task">
			<view class="task-item" v-for="(item, index) in task" :key="index">
				<view class="task-item-title">
					{{item.title}}
					<view v-if="item.tip" class="task-item-title-tip">
						{{item.tip}}
					</view>
				</view>
				<view class="task-item-list" v-for="(taskItem, i) in item.list" :key="i">
					<image :src="taskItem.icon" mode="" class="task-item-list-icon"></image>
					<view class="task-item-list-left">
						<view class="task-item-list-left-title">
							{{taskItem.name}}
						</view>
						<view class="task-item-list-left-desc">
							{{taskItem.description}}
						</view>
					</view>
					<button plain :class="['task-item-list-btn', taskItem.hasDo == true ?'hasSign': '']" open-type="share" v-if="taskItem.alias == 'invite'">
						{{taskItem.btn}}
					</button>
					<view :class="['task-item-list-btn', taskItem.hasDo == true ?'hasSign': '']" @click="doTask(index, i)" v-else>
						{{taskItem.btn}}
						<!-- <view class="task-item-list-btn-idot"></view> -->
					</view>
				</view>
			</view>
		</view>
		<tbAuth :modalShow="tbAuthShow" @close="closeTbAuthModal" :eleTask="eleTask"></tbAuth>
	</view>
</template>

<script>
	// 在页面中定义激励视频广告
	let videoAd = null

	export default {
		data() {
			return {
				task: [],
				tbAuthShow: false,
				eleTask: {},
				doTasking: false
			};
		},
		onShow(){
			this.getTask()
		},
		onShareAppMessage(res) {
			let shareConfig = getApp().shareConfig()
			return shareConfig
		},
		onShareTimeline(){
			return getApp().shareConfig('timeline')
		},
		methods: {
			getTask(){
				this.$api.taskList().then((res)=>{
					this.task = res.data.task
				}).catch((err)=>{
					uni.showToast({
						icon: 'none',
					    title: err.msg,
					    duration: 2000
					});
				})
			},
			createRewardedVideoAd(tashDetail) {
				const adId = tashDetail.package.adId
				videoAd = wx.createRewardedVideoAd({
					adUnitId: adId
				})
				videoAd.onLoad(() => {})
				videoAd.onError((err) => {
					console.log('onError',err)
				})
				videoAd.onClose((res) => {
					if (res && res.isEnded) {
						console.log("正常播放结束，可以下发游戏奖励");
						this.fetchTaskDo(tashDetail)
					} else {
						uni.showToast({
							title: "还没看完这个视频哦",
							icon: "none",
							duration: 2000,
						});
					}
				})
			},
			doVideo(tashDetail) {
				if (!wx.createRewardedVideoAd) return;
				if (!videoAd) {
					this.createRewardedVideoAd(tashDetail)
				}
				videoAd.show().catch(() => {
					// 失败重试
					videoAd.load()
					.then(() => videoAd.show())
					.catch(err => {
						console.log('激励视频 广告显示失败')
						uni.showToast({
							title: "激励视频 广告显示失败",
							icon: "none",
							duration: 2000,
						});
					})
				})
			},
			doTask(index, i){
				let tashDetail = this.task[index]['list'][i]

				const { do_type, hasDo } = tashDetail

				if (hasDo) {
					uni.showToast({
						title: "今天已完成，明天再来吧",
						icon: "none",
						duration: 2000,
					});
					return
				}

				if (do_type == "web") {
					uni.navigateTo({
						url: '/pages/webview/webview?url=' + tashDetail.package.url
					});
					this.fetchTaskDo(tashDetail)
					return
				}

				if (do_type == "img") {
					uni.previewImage({
						urls: [tashDetail.package.img]
					});
					this.fetchTaskDo(tashDetail)
					return
				}

				if (do_type == "minapp") {
					uni.navigateToMiniProgram({
						appId: tashDetail.package.minapp.appid,
						path: tashDetail.package.minapp.path,
						success: (res) => {
							// 打开成功
							this.fetchTaskDo(tashDetail)
						}
					})
					return
				}

				if (do_type == "advideo") {
					this.doVideo(tashDetail)
					return
				}

				if(tashDetail.package){
					if(tashDetail.package.minapp){
						wx.navigateToMiniProgram({
						  appId: tashDetail.package.minapp.appid,
						  path: tashDetail.package.minapp.path,
						  success(res) {
							// 打开成功
						  }
						})
					}else{
						this.eleTask = tashDetail
						this.tbAuthShow = true
					}
				}
				this.fetchTaskDo(tashDetail)
			},
			fetchTaskDo(tashDetail) {
				if (this.doTasking) return;
				this.doTasking = true
				this.$api.taskDo(tashDetail.alias, tashDetail.id).then((res)=>{
					if(res.msg){
						uni.showToast({
							icon: 'none',
						    title: res.msg,
						    duration: 2000
						});
					}
					this.doTasking = false
					this.getTask()
				}).catch((err)=>{
					uni.showToast({
						icon: 'none',
					    title: err.msg,
					    duration: 2000
					});
					this.doTasking = false
				})
			},
			closeTbAuthModal(){
				this.tbAuthShow = false
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f8f8f8;
	}
	.head{
		height: 400rpx;
		&-bg{
			display: block;
			width: 100%;
			height: 100%;
		}
	}
	.task{
		position: relative;
		padding-bottom: 30rpx;
		&-item{
			width: 710rpx;
			margin: auto;
			background-color: #FFFFFF;
			margin-top: 30rpx;
			border-radius: 8px;
			box-shadow: 0 0 20rpx #f4f4f4;
			&:first-child{
				margin-top: -100rpx;
			}
			&-title{
				height: 100rpx;
				display: flex;
				align-items: center;
				margin: 0 30rpx;
				font-size: 38rpx;
				font-weight: 500;
				color: #333333;
				&-tip{
					font-size: 24rpx;
					margin-left: 6rpx;
					color: #007AFF;
				}
			}
			&-list{
				margin: 0 30rpx 30rpx;
				padding-bottom: 30rpx;
				display: flex;
				align-items: center;
				border-bottom: 1px solid #F8F8F8;
				&:last-child{
					border-bottom: none;
				}
				&-icon{
					width: 90rpx;
					height: 90rpx;
					border-radius: 100%;
					flex-shrink: 0;
					margin-right: 10rpx;
				}
				&-left{
					&-title{
						font-size: 34rpx;
						color: #333333;
						font-weight: 500;
					}
					&-desc{
						font-size: 28rpx;
						color: #b4b4b4;
						margin-top: 6rpx;
					}
				}
				&-btn{
					border: none!important;
					padding: 0;
					margin-left: auto;
					margin-right: 0;
					display: flex;
					align-items: center;
					justify-content: center;
					height: 70rpx;
					width: 140rpx;
					border-radius: 70rpx;
					background: linear-gradient( 90deg, rgba(161, 167, 211, 1) 0%, rgba(78, 98, 251, 1) 100% );
					color: #FFFFFF!important;
					flex-shrink: 0;
					position: relative;
					box-shadow: 0 12rpx 24rpx #c5c5c5;
					font-size: 28rpx;
					&.hasSign{
						background: #9b9a9d;
						color: #FFFFFF;
					}
					&-idot{
						position: absolute;
						right: 0;
						top: 0;
						width: 20rpx;
						height: 20rpx;
						border-radius: 100%;
						background-color: #d72128;
					}
				}

			}
		}
	}
	
</style>
