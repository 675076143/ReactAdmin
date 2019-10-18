import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {Card,Icon,Form,Input,Cascader,Upload,Button} from "antd";
import number from "less/lib/less/functions/number";
import {reqSecondaryCategory, reqTopCategory} from "../../api";

const {TextArea} = Input
const {Item} = Form
/*
* 主页
* */



class ProductAdd extends Component{

    state = {
        options:[]
    }
    //获取一级列表
    getTopCategories = async ()=>{
        const {data} = await reqTopCategory();
        const options = data.map(item =>({
            value:item.topCategoryID,
            label:item.topCategoryName,
            isLeaf:false
        }))
        this.setState({options})
        console.log(options)
    }

    //级联选择改变时执行
    onChange = (value, selectedOptions) => {
        console.log(value, selectedOptions);
    };

    //加载下一级列表数据的回调函数
    loadData = async selectedOptions => {
        //当前选中项
        const targetOption = selectedOptions[selectedOptions.length - 1];
        //显示loading
        targetOption.loading = true;
        //根据当前选中项获取二级列表
        const {data} = await reqSecondaryCategory(targetOption.value)
        const options = data.map(item =>({
            value:item.secondaryCategoryID,
            label:item.secondaryCategoryName,
            isLeaf:true
        }))
        //隐藏loading
        targetOption.loading = false;
        //更新状态
        targetOption.children = options
        this.setState({
            options: [...this.state.options],
        });

    };

    //验证商品价格
    validatePrice = (rule, value, callback) =>{
        if(value*1 > 0){
            callback()
        }else {
            callback('商品价格必须大于0')
        }
    }
    //验证商品分类, 必须选中二级分类
    validateCategory = (rule, value, callback) =>{
        if(value[1]){
            callback()
        }else {
            callback('您还没选中二级分类!')
        }
    }

    //提交表单
    submit = () =>{
        //表单验证
        this.props.form.validateFields((errors, values) => {
            if(!errors){
                alert("submit")
                console.log(values)
            }
        })
    }

    componentDidMount() {
        this.getTopCategories()
    }

    render(){
        const title = (
            <span>
                <a onClick={()=>this.props.history.goBack()} style={{marginRight:10}}>
                    <Icon type='arrow-left'/>
                </a>
                <span>添加商品</span>
            </span>
        )


        function onChange(value) {
            console.log(value);
        }

        //表单布局
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
        };
        //表单验证
        const { getFieldDecorator } = this.props.form;

        return (
            <Card title={title}>
                <Form {...formItemLayout} >
                    <Item label='商品名称' >
                        {getFieldDecorator('productName', {
                            rules: [
                                {
                                    required: true,
                                    message: '商品名称不能为空!',
                                },
                            ],
                        })(<Input placeholder='请输入商品名称'/>)}
                    </Item>
                    <Item label='商品描述' >
                        {getFieldDecorator('productDesc', {
                            rules: [
                                {
                                    required: true,
                                    message: '商品描述不能为空!',
                                },
                            ],
                        })(<TextArea placeholder='请输入商品描述' autosize />)}

                    </Item>
                    <Item label='商品价格' >
                        {getFieldDecorator('price', {
                            rules: [
                                {
                                    required: true,
                                    message: '商品价格不能为空!',
                                },
                                {
                                    validator:this.validatePrice
                                }
                            ],
                        })(<Input type='number' placeholder='请输入商品价格' addonAfter='元'/>)}
                    </Item>
                    <Item label='商品分类'>
                        {getFieldDecorator('category',{
                            initialValue:[],
                            rules:[
                                {required:true, message:'请选择商品分类!'},
                                {validator:this.validateCategory}
                            ]
                        })(
                        <Cascader
                            options={this.state.options} //需要显示的列表数据
                            loadData={this.loadData} //选择某级分类时,加载下一级列表的监听回调
                            onChange={this.onChange}
                            changeOnSelect
                        />)}
                    </Item>
                    <Item>
                        <Button type='primary' onClick={this.submit}>提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(ProductAdd)