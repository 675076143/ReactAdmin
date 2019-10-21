import React, {Component} from "react";
import {Form,Select,Input} from "antd";
import FormItem from "antd/es/form/FormItem";

/*
* 添加商品分类的Form组件
* */
class AddCategoryForm extends Component{

    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    render() {
        const {getFieldDecorator} = this.props.form
        const categories = this.props.categories
        const parentID = String(this.props.parentID)
        return (
            <Form>
                <FormItem>
                    {
                        getFieldDecorator(
                            'categoryID',
                            {initialValue: parentID}
                        )(
                            <Select>
                                <Select.Option value='0'>一级分类列表</Select.Option>
                                {categories.map(item=><Select.Option value={String(item.topCategoryID)}>{item.topCategoryName}</Select.Option>)}
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator(
                            'categoryName',
                            {
                                initialValue: '',
                                rules:[{required:true,message:"请输入分类名称!"}]
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

export default Form.create()(AddCategoryForm)