import React, {Component} from "react";
import {Form,Input} from "antd";
import FormItem from "antd/es/form/FormItem";

/*
* 添加商品分类的Form组件
* */
class UpdateCategoryForm extends Component{

    componentWillMount() {
        //将Form对象通过setForm()传递给父组件
        this.props.setForm(this.props.form)
    }

    render() {
        const {getFieldDecorator} = this.props.form
        return (
            <Form>
                <FormItem>
                    {
                        getFieldDecorator(
                            'categoryName',
                            {initialValue: this.props.categoryName}
                        )(<Input placeholder='分类名称'/>)
                    }

                </FormItem>
            </Form>
        )
    }
}

export default Form.create()(UpdateCategoryForm)