import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";
import "./home.css"
/*
* 主页
* */

export default class Home extends Component{
    render(){
        return (
            <div className='home'>
                <h1>React后台管理项目</h1>
            </div>
        )
    }
}