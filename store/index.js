import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/common/api/base'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		token: '',
		userInfo:{},
		lotteryNum: 0,
		balance: 0.00,
	},
	getters: {
		//是否登录
		isLogin: state => {
			return state.token != ''
		}	
	},
	mutations: {
		SET_TOKEN(state, token) {
			state.token = token;
			uni.setStorageSync('token', token)
		},
		SET_USERINFO(state, userInfo){
			state.userInfo = userInfo
			uni.setStorageSync('userInfo', userInfo)
		},
		SET_LOTTERYNUM(state, lotteryNum){
			state.lotteryNum = lotteryNum
		},
		SET_BALANCE(state, balance){
			state.balance = balance
		},
	},
	actions: {
		getStore({commit}) {
			let token = uni.getStorageSync('token');
			if (token) {
				commit('SET_TOKEN', token);
			}
			let userInfo = uni.getStorageSync('userInfo');
			if (userInfo) {
				commit('SET_USERINFO', userInfo);
			}
		},
		getUserInfo({commit}){
			api.userInfo().then((res)=>{
				commit('SET_USERINFO', res.data.user);
				commit('SET_LOTTERYNUM', res.data.lotteryNum);
				commit('SET_BALANCE', res.data.balance);
			}).catch((err)=>{
				uni.showToast({
					icon: 'none',
				    title: err.msg,
				    duration: 2000
				});
			})
		}
	}
})

export default store
