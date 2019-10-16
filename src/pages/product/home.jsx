import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {Card,Select,Input,Table,Button,Icon} from "antd";
/*
* 主页
* */

export default class ProductHome extends Component{

    state = {
        products:[
            {
                "productID": 1,
                "productName": "Alienware15",
                "productDesc": "采用超高效电压调节技术、Cryo-Tech v3.0 散热技术和全新工业设计的 15\" 游戏笔记本电脑。尽在更为纤薄的 15\" 笔记本电脑",
                "price": 9999.0,
                "topCategoryID": 0,
                "secondaryCategoryID": 13,
                "detail": null,
                "status": 0,
                "image": "Alienware15.png"
            },
            {
                "productID": 2,
                "productName": "Alienware17",
                "productDesc": "更为轻薄的Alienware 17\"笔记本电脑。采用镁合金打造，电池续航时间超长，且CPU可实现动态超频。",
                "price": 144999.0,
                "topCategoryID": 0,
                "secondaryCategoryID": 13,
                "detail": null,
                "status": 0,
                "image": "Alienware17.png"
            }
        ]
    }

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
                title: '操作',
                render:(product)=>{
                    return (
                        <span>
                            <a style={{margin:'0 10px'}}>详情</a>
                            <a>修改</a>
                        </span>
                    )
                }
            },
        ]
    }

    componentWillMount() {
        this.initColumns()
    }

    render(){
        //取出数据
        const {products} = this.state
        const title = (
            <span>
                <Select value='1'>
                    <Select.Option value='1'>按名称搜索</Select.Option>
                    <Select.Option value='2'>按描述搜索</Select.Option>
                </Select>
                <input placeholder='关键字' style={{width:150,margin:'0 15px'}}/>
                <Button type='primary'>搜索</Button>
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
                <Table bordered rowKey='productID' dataSource={products} columns={this.columns} />;
            </Card>
        )
    }
}