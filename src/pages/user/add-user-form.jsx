import React, {Component} from "react";
import {Form,Input,Checkbox, Row, Col} from "antd";
import FormItem from "antd/es/form/FormItem";
import {reqRoles} from "../../api";

/*
* 添加商品分类的Form组件
* */
class AddUserForm extends Component{

    onChange =(checkedValues)=> {
        console.log('checked = ', checkedValues);
        this.setState({checkedValues})
        //return checkedValues
    }


    initCheckBoxData= async ()=>{
        const result = await reqRoles()
        if(result.code==='200'){
            this.setState({roles:result.data})
        }
    }
    state = {
        roles:[],
        checkedValues:[],
    }

    //返回角色选中项
    //getUserRoles = ()=>this.state.checkedValues
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    componentDidMount() {
        this.initCheckBoxData()
    }


    render() {
        const user = this.props.user || {}
        const {roles} = this.state
        //表单布局
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 15 },
            },
        };
        const {getFieldDecorator} = this.props.form
        return (
            <Form {...formItemLayout}>
                <FormItem label='用户名'>
                    {
                        getFieldDecorator(
                            'userName',
                            {
                                initialValue: user.userName,
                                rules:[{required:true,message:"请输入用户名称!"}]
                            }
                        )(
                            <Input placeholder='用户名' disabled={user.userName?true:false}/>
                        )
                    }

                </FormItem>

                <FormItem label='初始密码'>
                    <Input value='123456' disabled/>
                </FormItem>
                <FormItem label='手机号'>
                    {
                        getFieldDecorator(
                            'phone',
                            {
                                initialValue: user.phone,
                                rules:[]
                            }
                        )(
                            <Input placeholder='请输入电话号码'/>
                        )
                    }

                </FormItem>
                <FormItem label='邮箱'>
                    {
                        getFieldDecorator(
                            'email',
                            {
                                initialValue: user.email,
                                rules:[]
                            }
                        )(
                            <Input placeholder='请输入邮箱'/>
                        )
                    }

                </FormItem>

                <FormItem label='用户角色'>
                    {
                        getFieldDecorator(
                            'userRoles',
                            {
                                initialValue: user.roleName,
                                rules:[]
                            }
                        )(
                            <Checkbox.Group style={{ width: '100%' }} onChange={this.onChange}>
                            <Row>
                                {
                                    roles.map((item)=>{
                                        return(
                                            <Col key={item.roleID}  span={8}>
                                                <Checkbox value={item.roleName} >{item.roleName}</Checkbox>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                            </Checkbox.Group>
                        )
                    }




                </FormItem>
            </Form>
        )
    }
}

export default Form.create()(AddUserForm)