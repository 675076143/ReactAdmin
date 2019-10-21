import React, {Component} from "react";
import './left-nav.css'
import {Link, withRouter} from "react-router-dom";
import logo from "../../assets/img/logo.jpg"
import { Menu, Icon } from 'antd';
import menuConfig from "../../config/menuConfig";

const { SubMenu } = Menu;
/*
* 左侧导航条组件
* */


export class LeftNav extends Component{

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
                //自动展开被访问的SubMenu
                //获取到与路径相同的item.key
                const selectedKey = this.props.location.pathname
                const selectedItem = item.children.find(item => item.key===selectedKey)
                if(selectedItem){
                    this.openKeys = item.key
                }
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

    /*
    * 生命周期：
    * 将要装载，在render之前调用
    * 装配菜单数据
    * */
    componentWillMount() {
        this.menu = this.generateMenuByMenuConfig(menuConfig)
    }

    render() {
        const selectedKey = this.props.location.pathname
        const openKeys = this.openKeys
        console.log(selectedKey)
        return(
            <div className='left-nav'>
                <Link to='/admin' className='left-nav-header'>
                    <img className='logo' src={logo} alt='logo' />
                    <h1>后台管理</h1>
                </Link>

                <Menu
                    selectedKeys={[selectedKey]}
                    defaultOpenKeys={[openKeys]}
                    mode="inline"
                    theme="dark"
                >
                    {
                        this.menu
                    }
                </Menu>
            </div>
        )
    }
}

/*
* withRouter高阶组件
* 包装新非路由组件
* 返回一个新的组件
* 新的组件向非路由组件传递三个参数
*   1.history
*   2.location
*   3.match
* */
export default withRouter(LeftNav)
