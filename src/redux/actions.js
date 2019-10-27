/*
包含N个action creator函数的模块
同步action: 对象{type:'',data:''}
异步action: 函数 dispatch=>{}
 */
import {RECEIVE_USER, SET_HEAD_TITLE, SHOW_ERROR_MSG} from "./action_type";
import {reqLogin} from "../api";
import storageUtils from "../utils/storageUtils";

export const setHeadTitle = (headTitle) => ({type:SET_HEAD_TITLE,data:headTitle})


/*
接收用户信息的同步action
 */
export const receiveUser = (user)=> ({type:RECEIVE_USER,user})

/*
显示错误信息的同步action
 */
export const showErrorMsg = (errorMsg)=>({type:SHOW_ERROR_MSG,errorMsg})

/*
登录的异步action
 */
export const login = (username,password)=>{
    return async dispatch =>{
        //实行异步ajax请求
        const result =await reqLogin(username, password)
        //如果成功,分发同步的action
        if(result.code==='200'){
            const user = result.data
            //保存在local中
            storageUtils.setUser(user)
            dispatch(receiveUser(user))
        }else {//如果失败,分发失败的同步action
            const errorMsg = result.message
            dispatch(showErrorMsg(errorMsg))
        }
    }
}
