import React, {Component} from "react";
import './login.css'
import logo from './images/logo.jpg'
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';
import {reqLogin} from "../../api";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import {Redirect} from "react-router-dom";
import LinkButton from "../../components/link-button";

/*
* 登录的路由组件
* */

class Login extends Component{

    handleSubmit = e => {
        //阻止事件的默认行为(发送请求)
        e.preventDefault();
        //取得form对象
        const form  = this.props.form;
        //表单验证
        form.validateFields(async (err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                //发送ajax请求
                const {username, password} = values
                const result = await reqLogin(username,password)
                //console.log('请求成功',response.data)
                if(result.code === "200"){//登陆成功
                    message.success(result.msg)
                    //内存中保存User
                    memoryUtils.user = result.data;
                    //localstorage中保存User

                    storageUtils.setUser(result.data)
                    //跳转到后台管理页面
                    //由于不需要回退到登录界面，所以用replace
                    //如果需要则应用push
                    this.props.history.replace('/admin')
                }else {//登录失败
                    message.error(result.msg)
                }

            }else {

            }
        });
    };

    render() {
        const user = memoryUtils.user
        //如果内存中有User
        //返回admin界面
        if (JSON.stringify(user)!=='{}'){
            return <Redirect to={'/admin'}/>
        }


        const { getFieldDecorator } = this.props.form;
        return(
            <div className='login'>
                <header className='login-header'>
                    <img alt='logo' className='logo' src={logo} />
                    <h1>React后台管理项目</h1>
                </header>
                <section className='login-content'>
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                //声明式验证：直接用别人定义好的规则进行验证
                                rules: [
                                    /*
                                    * 必须输入
                                    * 大于4位
                                    * 小于12位
                                    * 英文、数字、下划线
                                    * */
                                    { required: true, message: '请输入用户名！' },
                                    { min: 4, message: '用户名不小于4位！' },
                                    { max: 12, message: '用户名不大于12位！' },
                                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能由字母、数字、下划线组成！' },

                                    ],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="用户名"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [
                                    /*
                                    * 必须输入
                                    * 大于4位
                                    * 小于12位
                                    * 英文、数字、下划线
                                    * */
                                    { required: true, message: '请输入密码！' },
                                    { min: 4, message: '密码不小于4位！' },
                                    { max: 12, message: '密码不大于12位！' },
                                    { pattern: /^[a-zA-Z0-9_]+$/, message: '密码只能由字母、数字、下划线组成！' },

                                ],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="密码"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>记住账号</Checkbox>)}
                            <LinkButton>
                                忘记密码
                            </LinkButton>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                            Or <a href="/register">注册</a>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
/*
* 包装Form组件 生成一个新的组件:Form(Login)
* 新组件会向Form组件传递一个强大的对象属性
* */
/*
* 1.高阶函数
*   1).一类特别的函数
*       a.接受函数类型的参数
*       b.返回值是函数
*   2).常见
*       a.定时器：setTimeout()/setInterval()
*       b.Promise: Promise(()=>{}) then(value =>{}, reason => {})
*       c.数组遍历相关方法：forEach()/filter()/map()/reduce()/find()/findIndex()
*       d.函数对象的bind()
*       e.Form.create()()/getFieldDecorator
*   3).高阶函数更新动态更加具有扩展性
*
* 2.高阶组件
*   1).本质就是一个函数
*   2).接受一个组件(被包装组件)，返回一个新的组件(包装组件)，包装组件会向被包装组件传入特定属性
*   3).作用：扩展组件的功能
* */
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);
export default WrappedNormalLoginForm