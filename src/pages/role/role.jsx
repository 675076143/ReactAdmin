import React,{Component} from "react";
import {Button, Card, Table} from "antd";
import {formateDate} from "../../utils/dateUtils";
import {PAGE_SIZE} from "../../utils/constants";
import {reqRoles} from "../../api";

export default class Role extends Component{

    state ={
        loading:false,
        roles:[],//所有角色
        role:{}//当前选中的角色
    }

    initColumns = ()=>{
        this.columns = [
            {
                title:'角色名称',
                dataIndex:'roleName'
            },
            {
                title:'创建时间',
                dataIndex:'createTime',
                render: (createTime)=>(
                    formateDate(createTime)
                )
            },
            {
                title:'授权时间',
                dataIndex:'authTime',
                render: (authTime) => (
                    formateDate(authTime)
                )
            },
            {
                title:'授权者',
                dataIndex:'authName'
            },
        ]
    }

    initRoles = async ()=>{
        const result = await reqRoles()
        if(result.code==="200"){
            const roles = result.data
            this.setState({roles})
        }
    }

    onRow = (role)=>{
        return{
            onClick: event =>{//点击行
                this.setState({role})
                console.log(this.state.role)
            }
        }
    }


    componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.initRoles()
    }

    render() {

        const {role,roles,loading} = this.state
        const title = (
            <span>
                <Button type='primary' style={{marginRight:10}}>创建角色</Button>
                <Button type='primary' disabled={!role.roleID}>设置角色权限</Button>
            </span>
        )
        return(
            <Card title={title}>
                <Table
                    loading={loading}
                    rowKey='roleID'
                    bordered={true}
                    pagination={{defaultPageSize:PAGE_SIZE}}
                    columns={this.columns}
                    dataSource={roles}
                    onRow={this.onRow}
                    rowSelection={{type:'radio', selectedRowKeys:[role.roleID]}}
                />
            </Card>
        )
    }
}