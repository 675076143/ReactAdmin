import React, {Component} from "react";
import './left-nav.css'
import {Link} from "react-router-dom";
import logo from "../../assets/img/logo.jpg"
import { Menu, Icon } from 'antd';
import menuConfig from "../../config/menuConfig";

const { SubMenu } = Menu;
/*
* 左侧导航条组件
* */
export default class LeftNav extends Component{

    /*
    * 使用map动态生成菜单
    * */
    generateMenuByMenuConfig = (menuConfig)=>{
        return menuConfig.map(item=>{
            if(!item.children) {
                return(
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }else {
                return(
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {/*递归调用自身*/}
                        {this.generateMenuByMenuConfig(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    render() {


        return(
            <div className='left-nav'>
                <Link to='/admin' className='left-nav-header'>
                    <img src={logo} />
                    <h1>后台管理</h1>
                </Link>

                <Menu
                    defaultSelectedKeys={['/admin/home']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                >
                    {
                        this.generateMenuByMenuConfig(menuConfig)
                    }
                </Menu>

            </div>
        )
    }
}