<script>
	import store from '@/store'
	export default {
		onLaunch: function(e) {
			console.log('App Launch')
			store.dispatch('getStore');
			if(e.query.fromUid){
				store.commit('SET_FROMUID', e.query.fromUid);
			}
		},
		onShow: function(e) {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			shareConfig(type){
				var messages = [
					{
						title: '领券点外卖，开福袋抽免单',
						imageUrl: 'http://cdn.letwind.com/zy/free/share-thumb-1.png',
						path: '/pages/index/index?fromUid=' + store.state.userInfo.id,
					},
				];
				var messagesTimeline = [
					{
						title: '领券点外卖，开福袋抽免单',
						imageUrl: 'http://cdn.letwind.com/zy/free/logo.png',
						path: '/pages/index/index?fromUid=' + store.state.userInfo.id,
					},
				];
				if(type == 'timeline'){
					return messagesTimeline[Math.floor(Math.random()*messagesTimeline.length)];
				}else{
					return messages[Math.floor(Math.random()*messages.length)];
				}
			},
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* @import 'animate.css'; */
	@import './static/iconfont/iconfont.scss';
</style>
