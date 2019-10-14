import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";
import {Card, Button, Icon, Table, message} from 'antd';
import {reqLogin, reqTopCategory,reqSecondaryCategory} from "../../api";
/*
* 主页
* */

export default class Category extends Component{

    state = {
        rowKey:'topCategoryID',
        loading:false,
        categories:[], //一级分类列表
    }
    //初始化列
    initColumns = (dataIndex,key)=>{
        this.columns = [
            { title: 'Name', dataIndex: dataIndex, key: key },
            {
                title: '操作',
                dataIndex: '',
                key: 'x',
                render: (category) => (
                    <span>
                        <a>修改分类</a>
                        <a style={{margin:"20px"}} onClick={()=>{this.getSecondaryCategories(category.topCategoryID)}}>查看子分类</a>
                    </span>
                )
            },
        ];
    }
    //获取一级列表
    getTopCategories = async () =>{
        //发送请求前显示loading
        this.setState({loading:true})
        const  result = await reqTopCategory();
        if(result.code == 200){
            const categories = result.data;
            this.setState({
                categories
            })
        }else {
            message.error('获取分类失败!')
        }
        //请求结束隐藏loading
        this.setState({loading:false})

    }
    //获取二级列表
    getSecondaryCategories = async (topCategoryID) =>{
        console.log(topCategoryID)
        const result = await reqSecondaryCategory(topCategoryID)
        if(result.code == 200){
            //更换列的dataIndex和key
            this.initColumns('secondaryCategoryName','secondaryCategoryID')
            const categories = result.data;
            this.setState({
                categories,
                rowKey:'secondaryCategoryID'
            })
        }else {
            message.error('获取分类失败!')
        }

    }

    componentWillMount() {
        this.initColumns('topCategoryName','topCategoryID')
    }
    //发送异步AJAX请求
    componentDidMount() {
        this.getTopCategories()
    }

    render(){
        //读取状态数据
        const {categories,loading,rowKey} = this.state
        const title = '一级分类列表'
        const extra = (
            <Button type="primary">
                <Icon type="plus" />
                添加
            </Button>
        )
        console.log(this.state.data)
        return (
            <Card title={title} extra={extra} style={{height:'100%'}}>
                <Table
                    loading={loading}
                    rowKey={rowKey}
                    bordered={true}
                    pagination={{pageSize:6}}
                    columns={this.columns}
                    dataSource={categories}
                />
            </Card>
        )
    }
}