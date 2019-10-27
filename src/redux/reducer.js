/*
用来根据老的state和指定的action生成并返回新的state函数
 */


import {combineReducers} from "redux";
import storageUtils from "../utils/storageUtils";
import {RECEIVE_USER, SET_HEAD_TITLE, SHOW_ERROR_MSG} from "./action_type";

const initHeaderTitle = '首页'

const initUser= storageUtils.getUser();

/*
用来管理头部标题的reducer函数
 */
function headTitle(state=initHeaderTitle,action) {
    switch (action.type) {
        case SET_HEAD_TITLE:
            return action.data
        default:
            return state
    }

}

/*
用来用户信息的reducer函数
 */
function user(state=initUser,action) {
    switch (action.type) {
        case RECEIVE_USER:
            return action.user
        case SHOW_ERROR_MSG:
            const errorMsg = action.errorMsg
            //不要直接修改原本的状态数据
            //state.errorMsg = errorMsg
            return {...state,errorMsg}
        default:
            return state
    }

}
/*
向外暴露的是合并产生的reducer函数
管理总的state的结构:
{
    headTitle: '首页'
    user: {}
}
 */
export default combineReducers({
    headTitle,
    user
})