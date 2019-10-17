import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {Card,Icon,List} from "antd";
import {extractId} from "less/lib/less-browser/utils";
import "./product.css"
import {reqCategoryName} from "../../api";
import {BASE_IMG_URL} from "../../utils/constants";

const Item = List.Item
/*
* 主页
* */

export default class ProductDetails extends Component{

    state = {
        topCategoryName:'',
        secondaryCategoryName:''
    }

    getCategoryName = async (secondaryCategoryID)=>{
        const result = await reqCategoryName(secondaryCategoryID)
        if(result.code=="200"){
            this.setState({
                topCategoryName:result.data.topCategoryName,
                secondaryCategoryName:result.data.secondaryCategoryName
            })
        }
    }

    componentDidMount() {
        const {secondaryCategoryID} = this.props.location.state
        this.getCategoryName(secondaryCategoryID)
    }


    render(){
        //读取上一个页面传来的state数据
        const {productID, productName,productDesc,price,detail,image} = this.props.location.state
        const {topCategoryName,secondaryCategoryName} = this.state
        const title = (
            <span>
                <a onClick={()=>this.props.history.goBack()} style={{marginRight:10}}>
                    <Icon type='arrow-left'/>
                </a>
                <span>商品详情</span>
            </span>
        )

        return (
            <Card title={title} className='product-detail'>
                <List>
                    <Item>
                        <span className='left'>商品名称: </span>
                        <span>{productName}</span>
                    </Item>
                    <Item>
                        <span className='left'>商品描述: </span>
                        <span>{productDesc}</span>
                    </Item>
                    <Item>
                        <span className='left'>商品价格: </span>
                        <span>￥{price}</span>
                    </Item>
                    <Item>
                        <span className='left'>所属分类: </span>
                        <span>{topCategoryName}->{secondaryCategoryName}</span>
                    </Item>
                    <Item>
                        <span className='left'>商品图片: </span>
                        <span>
                            <img src={BASE_IMG_URL+image} className='product-img'/>
                        </span>
                    </Item>
                </List>
            </Card>
        )
    }
}