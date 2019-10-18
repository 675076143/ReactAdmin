import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {Card,Icon} from "antd";
/*
* 主页
* */

export default class ProductUpdate extends Component{



    render(){
        const title = (
            <span>
                <a onClick={()=>this.props.history.goBack()} style={{marginRight:10}}>
                    <Icon type='arrow-left'/>
                </a>
                <span>更新商品</span>
            </span>
        )

        return (
            <Card title={title}>

            </Card>
        )
    }
}