import React, {Component} from "react";
import {Form,Input} from "antd";
import FormItem from "antd/es/form/FormItem";

/*
* 添加商品分类的Form组件
* */
class AddRoleForm extends Component{

    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    render() {
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
                <FormItem label='角色名称'>
                    {
                        getFieldDecorator(
                            'roleName',
                            {
                                initialValue: '',
                                rules:[{required:true,message:"请输入角色名称!"}]
                            }
                        )(
                            <Input placeholder='分类名称'/>
                        )
                    }

                </FormItem>
            </Form>
        )
    }
}

export default Form.create()(AddRoleForm)