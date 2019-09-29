import React, {Component} from "react";
import memoryUtils from "../../utils/memoryUtils"
import {message} from "antd";
import {Redirect} from "react-router-dom";
import { Layout } from 'antd';
import LeftNav from "../../components/left-nav/left-nav";
import MyHeader from "../../components/my-header/my-header";
const { Header, Footer, Sider, Content } = Layout;
/*
* 登录的路由组件
* */
export default class Admin extends Component{
    render() {
        const user = memoryUtils.user
        //如果内存中没有User
        //返回登录界面
        if (JSON.stringify(user)=='{}'){
            message.error("您还未登录！")
            return <Redirect to={'/login'}/>
        }
        return(
            <Layout style={{height:'100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <MyHeader/>
                    <Content style={{backgroundColor:'white'}}>Content</Content>
                    <Footer style={{textAlign:'center',color:'gray'}}>建议使用Chrome浏览器</Footer>
                </Layout>
            </Layout>
        )
    }
}