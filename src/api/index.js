/*
* 根据接口文档
* 定义接口请求
* 包含应用中所有接口请求函数的模块
* 每个函数的返回值都是promise
* 使用jsonp库
* */

import ajax from './ajax'
import jsonp from 'jsonp'

//登录
export const reqLogin = (userName, password) => ajax('/user/login',{},'POST')

//添加用户

//和风天气jsonp请求
/*
export const reqWeather = (location)=> {
    const url = `https://free-api.heweather.com/s6/weather?location=${location}&key=ba11e85f276a4c72979682aae37a6dea`
    jsonp(url,{}, (err,data)=>{
        console.log('jsonp() ',err,data)
    })
}
*/

//和风天气
export const reqWeather = (location) => {
    const url = `https://free-api.heweather.com/s6/weather`
    const data = {
        location:location,
        key:"ba11e85f276a4c72979682aae37a6dea"
    }
    return ajax(url,data)
}



