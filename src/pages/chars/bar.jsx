import React, {Component} from "react";
import {Card} from "antd";
import ReactEcharts from "echarts-for-react";

export default class Bar extends Component{

    /*
    返回柱状图的配置对象
     */
    getOption = ()=>{
        return {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        }
    }

    render(){
        return (
            <Card>
                <ReactEcharts option={this.getOption()}/>
            </Card>
        )
    }
}