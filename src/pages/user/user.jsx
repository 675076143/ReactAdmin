import React, {Component} from "react";
import {Button, Card, Modal, Table} from "antd";
import {reqUsers} from "../../api";
import {formateDate} from "../../utils/dateUtils";
import LinkButton from "../../components/link-button";

export default class User extends Component{
    state = {
        users:[],
        modalVisible:0,
        loading:false
    }

    //初始化列
    initColumns = ()=>{
        this.columns = [
            {
                title:'角色名称',
                dataIndex:'userName'
            },
            {
                title:'角色状态',
                dataIndex:'userState',
            },
            {
                title:'创建时间',
                dataIndex:'createTime',
                render: (createTime) => (
                    formateDate(createTime)
                )
            },
            {
                title:'邮箱',
                dataIndex:'email'
            },
            {
                title:'邮箱',
                dataIndex:'phone'
            },
            {
                title:'角色',
                dataIndex:'roleName',
                render:  (roleName)=>{
                    let result = ''
                    roleName.map((item)=>{
                        result+=item+' '
                    })
                    return result
                }
            },
            {
                title:'操作',
                render:()=>(
                    <span>
                        <LinkButton>修改</LinkButton>
                        <LinkButton>删除</LinkButton>
                    </span>
                )
            }
        ]
    }
    //初始化数据
    initUsers = async ()=>{
        const result = await reqUsers()
        if(result.code==="200"){
            const users = result.data
            this.setState({users})
        }
    }

    componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.initUsers()
    }

    render(){
        const title = (
            <Button type='primary'>创建用户</Button>
        )
        const {users,modalVisible,loading} = this.state
        return (
            <Card title={title}>
                <Table
                    loading={loading}
                    rowKey='userID'
                    bordered={true}
                    pagination={{defaultPageSize:6}}
                    columns={this.columns}
                    dataSource={users}
                    onRow={this.onRow}
                />
                <Modal
                    title="添加用户"
                    visible={modalVisible===1}
                    onOk={this.addRole}
                    onCancel={this.handleCancel}
                >
                    {/*setForm: 将组件传递给父组件!!!*/}
                    {/*<AddRoleForm setForm={(form)=>{this.form = form}}/>*/}
                </Modal>
            </Card>
        )
    }
}