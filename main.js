import Vue from 'vue'
import App from './App'

import store from './store'
Vue.prototype.$store = store

import api from '@/common/api/base'
Vue.prototype.$api = api

import config from '@/common/config/index'
Vue.prototype.$config = config

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App,
})
app.$mount()
