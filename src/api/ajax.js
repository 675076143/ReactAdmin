/*
* 在axios的基础上
* 封装ajax
* 函数的返回值是promise对象
* 使用NProgress在发送请求时显示进度条
* */
import axios from 'axios'
import {message} from "antd";
import NProgress from 'nprogress'

export default function ajax (url, data={}, method="GET") {

    //返回Promise对象
    //在函数内部处理异常
    return new Promise((resolve, reject) => {
        NProgress.start()
        let promise
        //1. 执行异步Ajax请求
        if (method=="GET"){//get请求
            promise = axios.get(url, {
                params: data
            })
        }else {//post请求
            promise = axios.post(url,data)
        }
        //2. 如果成功了，调用resolve
        promise.then(response=>{
            resolve(promise)
            NProgress.done();
        })
        //3. 如果失败了，调用reject
        promise.catch(error=>{
            //这里不调用reject，只需提示错误即可
            //reject(promise)
            //使用antd的message
            NProgress.done();
            message.error('请求错误： '+error.message)
        })

    })


}