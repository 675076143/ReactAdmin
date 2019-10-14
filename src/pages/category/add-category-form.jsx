import React, {Component} from "react";
import {Form,Select,Input} from "antd";
import FormItem from "antd/es/form/FormItem";

/*
* 添加商品分类的Form组件
* */
class AddCategoryForm extends Component{
    render() {
        const {getFieldDecorator} = this.props.form
        return (
            <Form>
                <FormItem>
                    {
                        getFieldDecorator(
                            'categoryID',
                            {initialValue:'0'}
                        )
                        (
                            <Select>
                                <Select.Option value='0'>一级分类</Select.Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator(
                            'categoryName',
                            {initialValue: ''}
                        )
                        (
                            <Input placeholder='分类名称'/>
                        )
                    }

                </FormItem>
            </Form>
        )
    }
}

export default Form.create()(AddCategoryForm)