import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import ProductHome from "./home";
import ProductDetails from "./details";
import ProductAddOrUpdate from "./add&update";
/*
* 主页
* */

export default class Product extends Component{
    render(){
        return (
            <Switch>
                <Route path='/admin/product' component={ProductHome} exact/>{/*exact:路径完全匹配*/}
                <Route path='/admin/product/details' component={ProductDetails}/>
                <Route path='/admin/product/add&update' component={ProductAddOrUpdate}/>
                <Redirect to='/admin/product'/>
            </Switch>
        )
    }
}