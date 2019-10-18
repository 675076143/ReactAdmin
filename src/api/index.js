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
export const reqLogin = (userName, password) => {
    console.log({userName,password})
    return ajax('/authentication/login',{userName,password},'POST')
}

//获取商品分类
//分类名称
export const reqCategoryName = (secondaryCategoryID)=> ajax('/api/categoryNames/'+secondaryCategoryID)
//一级分类
export const reqTopCategory = ()=>{
    return ajax('/api/topCategories')
}
//二级分类
export const reqSecondaryCategory = (topCategoryID)=>{
    return ajax('/api/secondaryCategories/'+topCategoryID)
}
export const reqSecondaryCategoryBySecondaryCategoryID = (secondaryCategoryID) =>{
    return ajax('/api/secondaryCategory/'+secondaryCategoryID)
}

//修改商品分类
//一级分类
export const reqUpdateTopCategory = (topCategoryID,topCategoryName)=>{
    return ajax('/api/topCategories/'+topCategoryID,{topCategoryName},"PUT")
}
//二级分类
export const reqUpdateSecondaryCategory = (secondaryCategoryID,secondaryCategoryName)=>{
    return ajax('/api/secondaryCategory/'+secondaryCategoryID,{secondaryCategoryName},"PUT")
}
//添加商品分类
//一级分类
export const reqAddTopCategory = (topCategoryName)=>{
    return ajax('/api/topCategories/'+topCategoryName, null,'POST')
}
//二级分类
export const reqAddSecondaryCategory = (secondaryCategoryName,topCategoryID)=>{
    return ajax('/api/secondaryCategory/'+secondaryCategoryName,{topCategoryID},'POST')
}

//商品列表
//获取商品列表
export const reqProduct = (pageNum,pageSize)=> ajax('/api/products',{pageNum,pageSize})
//模糊查询(商品名称)
export const reqProductByName = (productName, pageNum,pageSize)=> ajax('/api/products/productName',{productName, pageNum,pageSize})
//模糊查询(商品描述)
export const reqProductByDesc = (productDesc, pageNum,pageSize)=> ajax('/api/products/productDesc',{productDesc, pageNum,pageSize})
//更新商品信息
export const reqUpdateProductStatus = (productID, status) => ajax('/api/productStatus/'+productID,{status},"PUT")


//和风天气
export const reqWeather = (location) => {
    const url = `https://free-api.heweather.com/s6/weather`
    const data = {
        location:location,
        key:"ba11e85f276a4c72979682aae37a6dea"
    }
    return ajax(url,data)
}

//和风天气jsonp请求
/*
export const reqWeather = (location)=> {
    const url = `https://free-api.heweather.com/s6/weather?location=${location}&key=ba11e85f276a4c72979682aae37a6dea`
    jsonp(url,{}, (err,data)=>{
        console.log('jsonp() ',err,data)
    })
}
*/




