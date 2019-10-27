import React, {Component} from "react";
import "./home.css"
import {Card, Icon, DatePicker, Button, Statistic, Timeline} from "antd";
import ReactEcharts from "echarts-for-react";
import * as echarts from 'echarts';
import moment from "moment";
const { RangePicker } = DatePicker;
/*
* 主页
* */

const dataAxis = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
const data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
const yMax = 500;
const dataShadow = [];

for (var i = 0; i < data.length; i++) {
    dataShadow.push(yMax);
}
export default class Home extends Component{

    getOption = ()=>{
        return {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name:'邮件营销',
                    type:'line',
                    stack: '总量',
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'联盟广告',
                    type:'line',
                    stack: '总量',
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'视频广告',
                    type:'line',
                    stack: '总量',
                    data:[150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name:'直接访问',
                    type:'line',
                    stack: '总量',
                    data:[320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name:'搜索引擎',
                    type:'line',
                    stack: '总量',
                    data:[820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        }
    }
    getOption2 = ()=>{
        return {
            title: {
                text: '',
                subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
            },
            xAxis: {
                data: dataAxis,
                axisLabel: {
                    inside: true,
                    textStyle: {
                        color: '#fff'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                z: 10
            },
            yAxis: {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#999'
                    }
                }
            },
            dataZoom: [
                {
                    type: 'inside'
                }
            ],
            series: [
                { // For shadow
                    type: 'bar',
                    itemStyle: {
                        normal: {color: 'rgba(0,0,0,0.05)'}
                    },
                    barGap:'-100%',
                    barCategoryGap:'40%',
                    data: dataShadow,
                    animation: false
                },
                {
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#83bff6'},
                                    {offset: 0.5, color: '#188df0'},
                                    {offset: 1, color: '#188df0'}
                                ]
                            )
                        },
                        emphasis: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#2378f7'},
                                    {offset: 0.7, color: '#2378f7'},
                                    {offset: 1, color: '#83bff6'}
                                ]
                            )
                        }
                    },
                    data: data
                }
            ]
        }
    }
    state = {
        key: '销售量',
        noTitleKey: '访问量',
    };

    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    }

    render(){

        const dateFormat = 'YYYY/MM/DD';

        const tabListNoTitle = [
            {
                key: '访问量',
                tab: '访问量',
            },
            {
                key: '销售量',
                tab: '销售量',
            },
        ];

        const contentListNoTitle = {
            销售量: <ReactEcharts option={this.getOption2()} style={{height:500}} />,
            访问量: (
                <div className='visit'>
                    <ReactEcharts option={this.getOption2()} style={{width:"70%",height:500}} />
                    <Card title='任务' extra={<Button shape='circle'><Icon type="redo" /></Button>} style={{width:"30%"}}>
                        <Timeline>
                            <Timeline.Item color="green">第一次创建React项目 2019-09-26</Timeline.Item>
                            <Timeline.Item color="red">
                                <p>引入路由</p>
                                <p>引入Antd</p>
                            </Timeline.Item>
                            <Timeline.Item>
                                <p>简单的登录功能 2019-09-28</p>
                            </Timeline.Item>
                            <Timeline.Item color="green">
                                <p>头部信息 2019-10-02</p>
                                <p>左侧菜单栏</p>
                            </Timeline.Item>
                            <Timeline.Item color="green">
                                <p>品类管理模块 2019-10-15</p>
                            </Timeline.Item>
                            <Timeline.Item color="green">
                                <p>商品管理模块 2019-10-15</p>
                            </Timeline.Item>
                            <Timeline.Item color="green">
                                <p>用户角色模块 2019-10-24</p>
                            </Timeline.Item>
                            <Timeline.Item color="red">
                                <p>echarts引入 2019-10-28</p>
                            </Timeline.Item>
                        </Timeline>
                    </Card>
                </div>
            )
        };

        return (
            <div className='home'>
                <Card title='商品总量' style={{width:'20%',minWidth:'200px'}}>
                    <p><span style={{fontSize:20, fontWeight:'500'}}>675,076,143</span>个</p>
                    <Statistic
                        title="周同比"
                        value={11.28}
                        precision={2}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<Icon type="arrow-up" />}
                        suffix="%"
                    />
                    <Statistic
                        title="日同比"
                        value={9.3}
                        precision={2}
                        valueStyle={{ color: '#cf1322' }}
                        prefix={<Icon type="arrow-down" />}
                        suffix="%"
                    />
                </Card>
                <ReactEcharts option={this.getOption()} style={{width:'70%',marginLeft:'5%'}} theme='walden'/>
                <Card
                    style={{ width: '100%',marginTop:30 }}
                    tabList={tabListNoTitle}
                    activeTabKey={this.state.noTitleKey}
                    tabBarExtraContent={
                        <RangePicker
                            defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                            format={dateFormat}
                        />
                    }
                    onTabChange={key => {
                        this.onTabChange(key, 'noTitleKey');
                    }}
                >
                    {contentListNoTitle[this.state.noTitleKey]}
                </Card>
            </div>
        )
    }
}