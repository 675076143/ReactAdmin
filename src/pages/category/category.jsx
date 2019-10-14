import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";
import {Card, Button, Icon, Table, message} from 'antd';
import {reqLogin, reqTopCategory,reqSecondaryCategory} from "../../api";
/*
* 主页
* */

export default class Category extends Component{

    state = {
        categoryLevel:1,
        parentName:'',
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
                        <a style={{margin:"20px"}} onClick={()=>{this.getSecondaryCategories(category.topCategoryID, category.topCategoryName)}}>查看子分类</a>
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
            //更换列的dataIndex和key
            this.initColumns('topCategoryName','topCategoryID')
            const categories = result.data;
            //设置状态
            this.setState({
                categories,
                rowKey:'topCategoryID',
                categoryLevel:1
            })
        }else {
            message.error('获取分类失败!')
        }
        //请求结束隐藏loading
        this.setState({loading:false})

    }
    //获取二级列表
    getSecondaryCategories = async (topCategoryID, topCategoryName) =>{
        console.log(topCategoryID,topCategoryName)
        const result = await reqSecondaryCategory(topCategoryID)
        if(result.code == 200){
            //更换列的dataIndex和key
            this.initColumns('secondaryCategoryName','secondaryCategoryID')
            const categories = result.data;
            //设置状态
            this.setState({
                categories,
                rowKey:'secondaryCategoryID',
                categoryLevel:2,
                parentName:topCategoryName
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
        const {categoryLevel,parentName,categories,loading,rowKey} = this.state
        const title = categoryLevel===1?'一级分类列表':(
            <span>
                <a onClick={this.getTopCategories}>一级分类列表</a>
                <Icon type='arrow-right' style={{marginRight:5,marginLeft:5}}/>
                <span>{parentName}</span>
            </span>
        )
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