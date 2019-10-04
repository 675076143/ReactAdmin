import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";
import { Card,Button,Icon,Table } from 'antd';
/*
* 主页
* */

export default class Category extends Component{
    render(){
        const title = '一级分类列表'
        const extra = (
            <Button type="primary">
                <Icon type="plus" />
                添加
            </Button>
        )
        //表格列名
        const columns = [
            { title: 'Name', dataIndex: 'name', key: 'name' },
            {
                title: '操作',
                dataIndex: '',
                key: 'x',
                render: () => (
                    <span>
                        <a>修改分类</a>
                        <a style={{margin:"20px"}}>查看子分类</a>
                    </span>
                )
            },
        ];
        //表格数据
        const data = [
            {
                key: 1,
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
                description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
            },
            {
                key: 2,
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
                description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
            },
            {
                key: 3,
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
            },
            {
                key: 4,
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
            },
            {
                key: 5,
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
            },
            {
                key: 6,
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
            },

        ];

        return (
            <Card title={title} extra={extra} style={{height:'100%'}}>
                <Table
                    rowKey='key'
                    bordered={true}
                    pagination={{pageSize:6}}
                    columns={columns}
                    dataSource={data}
                />
            </Card>
        )
    }
}