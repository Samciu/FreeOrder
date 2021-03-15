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
			shareConfig(){
				var messages = [
					{
						title: '领券点外卖，抽免单吃霸王餐',
						imageUrl: 'http://cdn.letwind.com/zy/free/share-thumb.png',
						path: '/pages/index/index?fromUid=' + store.state.userInfo.id,
					},
				];
				return messages[Math.floor(Math.random()*messages.length)];
			},
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import 'animate.css';
	@import './static/iconfont/iconfont.scss';
</style>
