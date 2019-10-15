import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";
import {Card, Button, Icon, Table, message, Modal} from 'antd';
import {reqTopCategory,
        reqSecondaryCategory,
        reqUpdateTopCategory,
        reqUpdateSecondaryCategory,
        reqAddTopCategory,
        reqAddSecondaryCategory} from "../../api";
import UpdateCategoryForm from "./update-category-form";
import AddCategoryForm from "./add-category-form"
/*
* 主页
* */

export default class Category extends Component{

    state = {
        categoryLevel:1,
        parentName:'',
        parentID:'0',//父组件ID ID为0时:一级分类列表 ID不为0时:二级分类列表
        rowKey:'topCategoryID',
        loading:false,
        categories:[], //一级分类列表
        //模态框的设置
        //0:不可见; 1:添加可见; 2:修改可见
        modalVisible:0
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
                        <a onClick={()=>{this.openUpdateModal(category)}}>修改分类</a>
                        {//判断当前是否为一级分类, 如果是,显示"查看子分类"
                            dataIndex=='topCategoryName'
                            ?<a style={{margin:"20px"}}
                                onClick={()=>{
                                    this.getSecondaryCategories(category.topCategoryID, category.topCategoryName)
                                }}>查看子分类</a>
                            :' '}
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
                categoryLevel:1,
                parentID:0
            })
            //为了方便新增分类,将一级分类列表保存起来
            this.topCategories = categories
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
                parentName:topCategoryName,
                parentID:topCategoryID
            })
        }else {
            message.error('获取分类失败!')
        }

    }

    //添加分类
    addCategory =  (parentID) =>{
        //表单验证
        this.form.validateFields(async (err,values)=>{
            if(!err){
                const {categoryID,categoryName} = values
                //categoryID为0时 添加一级分类, 否则添加二级分类
                if(categoryID==0){
                    const result = await reqAddTopCategory(categoryName)
                    if(result.code=="200"){
                        this.getTopCategories()
                    }
                }else{
                    const result = await reqAddSecondaryCategory(categoryName, parentID)
                    if(result.code=="200"){
                        this.getSecondaryCategories(parentID)
                    }
                }
                console.log("添加分类")
                //修改完成后隐藏Modal
                this.setState({
                    modalVisible:0
                })
            }

        })


    }

    //修改分类
    updateCategory = async (category, parentID, parentName) =>{
        let categoryID;
        const categoryName = this.form.getFieldValue("categoryName")
        //清除输入数据
        this.form.resetFields()
        //判断修改的是一级分类还是二级分类
        if(this.state.categoryLevel == 1){//一级分类
            categoryID = category.topCategoryID;
            console.log("修改一级分类",categoryID,categoryName)
            const result = await reqUpdateTopCategory(categoryID,categoryName)
            console.log(result)
            if(result.code=="200"){
                //重新获取所有数据
                this.getTopCategories()
            }
        }else if(this.state.categoryLevel == 2){//二级分类
            categoryID = category.secondaryCategoryID;
            console.log("修改二级分类",categoryID,categoryName)
            const result = await reqUpdateSecondaryCategory(categoryID,categoryName)
            console.log(result)
            if(result.code=="200"){
                //重新获取所有数据
                this.getSecondaryCategories(parentID,parentName)
            }
        }


        //修改完成后隐藏Modal
        this.setState({
            modalVisible:0
        })

    }

    //显示添加分类Modal
    openAddModal = () =>{
        this.setState({
            modalVisible:1
        })
    }

    //显示更新分类Modal
    openUpdateModal = (category) =>{
         this.category = category
        this.setState({
            modalVisible:2
        })
    }

    //关闭Modal
    handleCancel = () =>{
        //清除输入数据
        this.form.resetFields()
        //更新状态
        this.setState({
            modalVisible:0
        })
    }

    componentWillMount() {
        this.initColumns('topCategoryName','topCategoryID')
    }
    //发送异步AJAX请求
    componentDidMount() {
        this.getTopCategories()
    }

    render(){
        //读取一级分类列表
        const topCategories = this.topCategories
        //读取当前选中的category
        const category = this.category || {}
        //读取状态数据
        const {categoryLevel,parentName,parentID,categories,loading,rowKey,modalVisible} = this.state
        const title = categoryLevel===1?'一级分类列表':(
            <span>
                <a onClick={this.getTopCategories}>一级分类列表</a>
                <Icon type='arrow-right' style={{marginRight:5,marginLeft:5}}/>
                <span>{parentName}</span>
            </span>
        )
        const extra = (
            <Button type="primary" onClick={this.openAddModal}>
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

                <Modal
                    title="添加分类"
                    visible={modalVisible===1}
                    onOk={()=>{this.addCategory(parentID)}}
                    onCancel={this.handleCancel}
                >
                    {/*setForm: 将组件传递给父组件!!!*/}
                    <AddCategoryForm categories={topCategories}
                                     parentID={parentID}
                                     setForm={(form)=>{this.form = form}}/>
                </Modal>

                <Modal
                    title="修改分类"
                    visible={modalVisible===2}
                    onOk={()=>{this.updateCategory(category,parentID, parentName)}}
                    onCancel={this.handleCancel}
                >
                    {/*setForm: 将组件传递给父组件!!!*/}
                    <UpdateCategoryForm categoryName={category.topCategoryName||category.secondaryCategoryName}
                                        setForm={(form)=>{this.form = form}}/>
                </Modal>
            </Card>

        )
    }
}