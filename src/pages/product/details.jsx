import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {Card,Icon,List} from "antd";
import {extractId} from "less/lib/less-browser/utils";
import "./product.css"

const Item = List.Item
/*
* 主页
* */

export default class ProductDetails extends Component{


    render(){
        const title = (
            <span>
                <Icon type='arrow-left'/>
                <span>商品详情</span>
            </span>
        )

        return (
            <Card title={title} className='product-detail'>
                <List>
                    <Item>
                        <span className='left'>商品名称: </span>
                        <span>Alienware15</span>
                    </Item>
                    <Item>
                        <span className='left'>商品描述: </span>
                        <span>采用超高效电压调节技术、Cryo-Tech v3.0 散热技术和全新工业设计的 15\" 游戏笔记本电脑。尽在更为纤薄的 15\" 笔记本电脑</span>
                    </Item>
                    <Item>
                        <span className='left'>商品价格: </span>
                        <span>￥9999.00</span>
                    </Item>
                    <Item>
                        <span className='left'>所属分类: </span>
                        <span>电脑</span>
                    </Item>
                    <Item>
                        <span className='left'>商品图片: </span>
                        <span>
                            <img src='D:\\Pictures\\goods\\电脑\\Alienware15.png' className='product-img'/>
                            <img src='D:\Pictures\goods\电脑\Alienware15.png' className='product-img'/>
                        </span>
                    </Item>
                </List>
            </Card>
        )
    }
}