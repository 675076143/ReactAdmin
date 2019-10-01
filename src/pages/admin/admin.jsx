import React, {Component} from "react";
import memoryUtils from "../../utils/memoryUtils"
import {message} from "antd";
import {Redirect, Route, Switch} from "react-router-dom";
import { Layout } from 'antd';
import LeftNav from "../../components/left-nav/left-nav";
import MyHeader from "../../components/my-header/my-header";
import Home from "../home/home";
import Line from "../chars/line";
import Bar from "../chars/bar";
import Pie from "../chars/pie"
import User from "../user/user";
const { Header, Footer, Sider, Content } = Layout;
/*
* 后台管理的路由组件
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
                    <Content style={{backgroundColor:'white'}}>
                        <Switch>
                            <Route path='/admin/home' component={Home}/>
                            <Route path='/admin/user' component={User}/>
                            <Route path='/admin/line' component={Line}/>
                            <Route path='/admin/bar' component={Bar}/>
                            <Route path='/admin/pie' component={Pie}/>
                            <Redirect to='/admin/home' />
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center',color:'gray'}}>建议使用Chrome浏览器</Footer>
                </Layout>
            </Layout>
        )
    }
}