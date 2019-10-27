import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import './my-header.css'
import memoryUtils from "../../utils/memoryUtils";
import {reqWeather} from "../../api";
import {formateDate} from "../../utils/dateUtils"
import { Modal } from 'antd';
import storageUtils from "../../utils/storageUtils";
import LinkButton from "../link-button";
import {connect} from "react-redux";
const { confirm } = Modal;


/*
* 左侧导航条组件
* */
export class MyHeader extends Component{
    state = {
        currentTime: formateDate(Date.now()),//当前时间
        weather: ''//当前天气
    }

    //实时获取当前时间
    getTime = ()=>{
        this.intervalID = setInterval(()=>{
            const currentTime = formateDate(Date.now())
            this.setState({currentTime})
        },1000)
    }
    //获取当前天气
    getWeather = async ()=>{
        //const weather = reqWeather("漳州")
        const weatherData =await reqWeather("漳州")
        const weather = weatherData.HeWeather6[0].now.cond_txt
        this.setState({weather})
    }


    //点击退出登录
    logout = ()=>{
        confirm({
            title: '退出登录?',
            onOk:()=> {
                //删除保存的数据
                memoryUtils.user = {}
                storageUtils.removeUser()
                //跳转到login
                this.props.history.replace('/login')
            },
        });
    }


    /*
    * 第一次render()之后执行一次
    * 一般在此执行异步操作
    * */
    componentDidMount() {
        this.getWeather()
        this.getTime()
    }
    /*
    * 当前组件卸载之前使用
    * */
    componentWillUnmount() {
        //清楚定时器
        clearInterval(this.intervalID)
    }

    render() {
        const {currentTime} = this.state
        return(
            <div className='my-header'>
                <div className='my-header-top'>
                    欢迎，{memoryUtils.user.userName}
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <hr/>
                <div className='my-header-bottom'>
                    <div className='my-header-bottom-left'>
                        <h1>{this.props.headTitle}</h1>
                    </div>
                    <div className='my-header-bottom-right'>
                        <span>{currentTime}</span>
                        <span>{this.state.weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state=>({headTitle:state.headTitle}),
    {}
)(withRouter(MyHeader))