<template>
	<view class="modal" @click="closeModal" v-if="modalShow">
		<view class="modal-content animate__animated animate__zoomIn" @click.stop="handle">
			<view class="modal-content-body">
				<view class="modal-content-body-title">提示</view>
				<view class="modal-content-body-bd">
					<view class="modal-content-body-bd-tip">
						饿了么首次领券需授权，复制下方链接，打开淘宝粘贴到搜索框，搜索后同意授权
					</view>
					<view class="modal-content-body-bd-url">
						<text user-select>
							{{eleTask.package.auth.url}}
						</text>
					</view>
					<view class="modal-content-body-bd-copy" @click="copyAuthUrl">
						复制链接
					</view>
				</view>
				<button plain class="modal-content-body-question" @click="goStudy">操作教程</button>
			</view>
			<image src="/static/images/close.png" mode="" class="modal-content-cancel" @click.stop="closeModal"></image>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		};
	},
	props: {
		modalShow: {
			type: Boolean,
			required: false,
			default: true
		},
		eleTask: {
			type: Object,
			required: false,
			default: {}
		}
	},
	methods:{
		closeModal(){
			this.$emit('close')
		},
		copyAuthUrl(){
			uni.setClipboardData({
			    data: this.eleTask.package.auth.url,
			    success: function () {
			        console.log('success');
			    }
			});
		},
		goStudy(){
			let url = eleTask.package.auth.study
			uni.navigateTo({
				url: '/pages/webview/webview?url=' + url
			});
		}
	}
};
</script>

<style lang="scss">
.modal {
	width: 100%;
	height: 100%;
	background-color: rgba(000, 000, 000, 0.9);
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	&-content {
		--animate-duration: 0.3s;
		&-body {
			width: 600rpx;
			padding: 40rpx 0;
			background-color: #FFFFFF;
			border-radius: 8px;
			&-title {
				font-size: 42rpx;
				color: #333333;
				font-weight: 700;
				text-align: center;
				margin-bottom: 30rpx;
			}
			&-bd {
				margin: 0 30rpx;
				
				&-tip{
					color:#06ae56;
				}
				&-url{
					background-color: #f8f8f8;
					padding: 10rpx;
					margin: 10rpx 0;
					color: #333;
					word-break: break-all;
					font-size: 28rpx;
				}
				&-copy{
					margin: auto;
					margin-top: 30rpx;
					width: 200rpx;
					height: 70rpx;
					line-height: 70rpx;
					border-radius: 70rpx;
					background-color: #4e62fb;
					color: #FFFFFF;
					text-align: center;
				}
			}
			&-question {
				margin: auto;
				display: block;
				border: none !important;
				font-size: 28rpx;
				color: #576b95 !important;
				margin-top: 10rpx;
			}
		}
		&-cancel {
			width: 50rpx;
			height: 50rpx;
			margin: auto;
			display: block;
			margin-top: 60rpx;
		}
	}
}
</style>
