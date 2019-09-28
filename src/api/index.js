/*
* 根据接口文档
* 定义接口请求
* 包含应用中所有接口请求函数的模块
* 每个函数的返回值都是promise
* */

import ajax from './ajax'

//登录
export const reqLogin = (userName, password) => ajax('/user/login',{},'POST')

//添加用户
