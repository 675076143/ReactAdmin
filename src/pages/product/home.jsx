import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {Card, Select, Input, Table, Button, Icon, message} from "antd";
import {reqProduct, reqProductByDesc, reqProductByName} from "../../api";
import {PAGE_SIZE} from "../../utils/constants";
/*
* 主页
* */

export default class ProductHome extends Component{

    state = {
        loading:false,
        totalNum:0,//商品总条数
        products:[],//商品列表
        keyType:"productName",//搜索类型
        keyword:""//搜索关键字
    }

    //初始化列
    initColumns =() =>{
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'productName',
            },
            {
                title: '商品描述',
                dataIndex: 'productDesc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render:(price)=>'￥'+price   //当前指定了dataIndex, 所以传入的是price
            },
            {
                title: '状态',
                dataIndex: 'status',
                render:(status)=>{
                    return(
                        <span>
                            <Button type='primary'>下架</Button><br/>
                            <span>在售</span>
                        </span>
                    )
                }
            },
            {
                width:100,
                title: '操作',
                render:(product)=>{
                    return (
                        <span>
                            <a style={{margin:'0 5px'}}>详情</a>
                            <a>修改</a>
                        </span>
                    )
                }
            },
        ]
    }

    //获取商品
    getProducts = async (pageNum) =>{
        this.setState({loading:true})//显示loading
        const {keyType,keyword} = this.state
        let result
        if(keyword!=''){//判断关键字是否为空
            if(keyType=="productName"){//判断查询类型
                result = await reqProductByName(keyword,pageNum,PAGE_SIZE)
            }else {
                result = await reqProductByDesc(keyword,pageNum,PAGE_SIZE)
            }

        }else {
            result = await reqProduct(pageNum,PAGE_SIZE)
        }

        console.log(result)
        if(result.code=="200"){
            const {totalNum,product} = result.data
            this.setState({
                totalNum:totalNum,
                products:product
            })
        }
        this.setState({loading:false})//隐藏loading
    }

    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getProducts(1)
    }

    render(){
        //取出数据
        const {loading,totalNum,products,keyType,keyword} = this.state
        const title = (
            <span>
                <Select value={keyType} onChange={value => this.setState({keyType: value})}>
                    <Select.Option value='productName'>按名称搜索</Select.Option>
                    <Select.Option value='productDesc'>按描述搜索</Select.Option>
                </Select>
                <input placeholder='关键字' value={keyword} style={{width:150,margin:'0 15px'}} onChange={event => this.setState({keyword: event.target.value})}/>
                <Button type='primary' onClick={()=>{this.getProducts(1)}}>搜索</Button>
            </span>
        )
        const extra = (
            <Button type='primary'>
                <Icon type='plus'/>
                添加商品
            </Button>
        )

        return (

            <Card title={title} extra={extra}>
                <Table
                    loading={loading}
                    bordered
                    rowKey='productID'
                    dataSource={products}
                    columns={this.columns}
                    pagination={{
                        defaultPageSize:PAGE_SIZE,
                        showQuickJumper:true,
                        total:totalNum,
                        onChange:this.getProducts
                    }} />;
            </Card>
        )
    }
}