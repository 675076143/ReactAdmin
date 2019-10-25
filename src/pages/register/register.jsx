import React, {Component} from "react";
import './register.css'
import logo from './images/logo.jpg'
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
} from 'antd';
import LinkButton from "../../components/link-button";

/*
* 注册的路由组件
* */

const { Option } = Select;


class Register extends Component{
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('密码不匹配！');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>,
        );


        return (
            <div className='register'>
                <header className='register-header'>
                    <img alt='logo' className='logo' src={logo} />
                    <h1>React后台管理项目</h1>
                </header>
                <section className='register-content'>
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item label="用户名">
                            {getFieldDecorator('userName', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入用户名！',
                                    },
                                ],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="密码" hasFeedback>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入您的密码！',
                                    },
                                    {
                                        validator: this.validateToNextPassword,
                                    },
                                ],
                            })(<Input.Password />)}
                        </Form.Item>
                        <Form.Item label="确认密码" hasFeedback>
                            {getFieldDecorator('confirm', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请确认您的密码！',
                                    },
                                    {
                                        validator: this.compareToFirstPassword,
                                    },
                                ],
                            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                        </Form.Item>
                        <Form.Item label="电子邮箱">
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        type: 'email',
                                        message: '这不是一个有效的电子邮箱！',
                                    },
                                    {
                                        required: true,
                                        message: '请输入您的电子邮箱！',
                                    },
                                ],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="手机号码">
                            {getFieldDecorator('phone', {
                                rules: [{ required: true, message: '请输入您的手机号码！' }],
                            })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                        </Form.Item>
                        <Form.Item label="验证码" extra="机器人Or真人？">
                            <Row gutter={8}>
                                <Col span={12}>
                                    {getFieldDecorator('captcha', {
                                        rules: [{ required: true, message: '请输入验证码！' }],
                                    })(<Input />)}
                                </Col>
                                <Col span={12}>
                                    <Button>获取验证码</Button>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            {getFieldDecorator('agreement', {
                                valuePropName: 'checked',
                            })(
                                <Checkbox>
                                    我已阅读 <LinkButton href="">用户协议</LinkButton>
                                </Checkbox>,
                            )}
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        );
    }

}

const WrappedRegistrationForm = Form.create({ name: 'register' })(Register);
export default WrappedRegistrationForm;