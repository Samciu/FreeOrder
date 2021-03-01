import http from './http'

/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 
 */

// 单独导出(测试接口) import {test} from '@/common/vmeitime-http/'
export const test = (data) => {
	/* http.config.baseUrl = "http://localhost:8080/api/"
	//设置请求前拦截器
	http.interceptor.request = (config) => {
		config.header = {
			"token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
		}
	} */
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		console.log('个性化response....')
		//判断返回状态 执行相应操作
		return response;
	}
    return http.request({
		baseUrl: 'https://unidemo.dcloud.net.cn/',
        url: 'ajax/echo/text?name=uni-app',
		dataType: 'text',
        data,
    })
}

//商品详情
const login = (code, encryptedData, iv) => {
    return http.request({
        url: '/free/v1/user/login',
        method: 'POST', 
        data: {
			code,
			encryptedData,
			iv,
		},
    })
}
//基础信息
const userInfo = () => {
    return http.request({
        url: '/free/v1/user/info',
        method: 'GET', 
        data: {
			
		},
    })
}
//任务中心
const taskList = () => {
    return http.request({
        url: '/free/v1/task/list',
        method: 'GET', 
        data: {
			
		},
    })
}
//抽奖
const lotteryDo = () => {
    return http.request({
        url: '/free/v1/lottery/do',
        method: 'POST', 
        data: {
			
		},
    })
}
//做任务
const taskDo = (alias) => {
    return http.request({
        url: '/free/v1/task/do',
        method: 'POST', 
        data: {
			alias,
		},
    })
}
// 默认全部导出  import api from '@/common/vmeitime-http/'
export default {
	login, userInfo, taskList, lotteryDo, taskDo
}