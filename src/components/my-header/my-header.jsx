import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import './my-header.css'
import memoryUtils from "../../utils/memoryUtils";
import ajax from "../../api/ajax";
import {reqWeather} from "../../api";
import {formateDate} from "../../utils/dateUtils"
import menuConfig from "../../config/menuConfig";
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
        setInterval(()=>{
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
    //根据当前路径，取得当前Title
    getTitle = ()=>{
        let title = ''
        const pathname = this.props.location.pathname
        menuConfig.forEach(item=>{
            if(item.key==pathname){
                title = item.title
            }else if(item.children){
                item.children.forEach(item=>{
                    if(item.key==pathname){
                        title = item.title
                    }
                })
            }
        })
        return title
    }


    /*
    * 第一次render()之后执行一次
    * 一般在此执行异步操作
    * */
    componentDidMount() {
        // this.getWeather()
        // this.getTime()
    }

    render() {
        console.log(this.getTitle())
        const {currentTime,weather} = this.state
        return(
            <div className='my-header'>
                <div className='my-header-top'>
                    欢迎，{memoryUtils.user}
                    <a>退出</a>
                </div>
                <hr/>
                <div className='my-header-bottom'>
                    <div className='my-header-bottom-left'>
                        <h1>{this.getTitle()}</h1>
                    </div>
                    <div className='my-header-bottom-right'>
                        <span>{currentTime}</span>
                        <span>{}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(MyHeader)