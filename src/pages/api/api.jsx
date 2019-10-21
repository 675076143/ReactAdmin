import React, {Component} from "react";
import './api.css'
export default class Api extends Component{
    render(){
        return (
            <iframe className='api-frame' title='swagger接口文档' src='http://114.55.36.231:8080/swagger-ui.html'/>
        )
    }
}