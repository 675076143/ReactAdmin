import React, {Component} from "react";
import './left-nav.css'
import {Link} from "react-router-dom";
import logo from "../../assets/img/logo.jpg"
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;
/*
* 左侧导航条组件
* */
export default class LeftNav extends Component{
    render() {
        return(
            <div className='left-nav'>
                <Link to='/admin' className='left-nav-header'>
                    <img src={logo} />
                    <h1>后台管理</h1>
                </Link>

                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                >
                    <Menu.Item key="1">
                        <Icon type="pie-chart" />
                        <span>Option 1</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="desktop" />
                        <span>Option 2</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="inbox" />
                        <span>Option 3</span>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                <Icon type="mail" />
                <span>Navigation One</span>
              </span>
                        }
                    >
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                <Icon type="appstore" />
                <span>Navigation Two</span>
              </span>
                        }
                    >
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                </Menu>

            </div>
        )
    }
}