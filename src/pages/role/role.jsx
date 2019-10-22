import React,{Component} from "react";
import {Button, Card, message, Modal, Table} from "antd";
import {formateDate} from "../../utils/dateUtils";
import {PAGE_SIZE} from "../../utils/constants";
import {reqAddRoles, reqRoles} from "../../api";
import AddRoleForm from "./add-role-form";
import AuthRoleForm from "./auth-role-form";

export default class Role extends Component{

    state ={
        loading:false,
        roles:[],//所有角色
        role:{},//当前选中的角色
        modalVisible:0//0不可见,1添加角色可见,2设置权限可见
    }

    //初始化列
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
    //初始化数据
    initRoles = async ()=>{
        const result = await reqRoles()
        if(result.code==="200"){
            const roles = result.data
            this.setState({roles})
        }
    }
    //当选中的role发生改变时
    onRow = (role)=>{
        return{
            onClick: event =>{//点击行
                this.setState({role})
                console.log(this.state.role)
            }
        }
    }
    //添加角色
    addRole = async () =>{
        this.form.validateFields( async (err,values)=>{
            if(!err){
                const {roleName} = values
                const result = await reqAddRoles(roleName)
                if(result.code==='200'){
                    message.success("添加角色成功")
                    this.initRoles()
                }else {
                    message.error("添加角色失败")
                }
            }
        })
        //清除输入数据
        this.form.resetFields()
        //更新状态
        this.setState({
            modalVisible:0
        })

    }
    //设置权限
    authRole = ()=>{
        this.setState({
            modalVisible:0
        })
    }

    //关闭Modal
    handleCancel = () =>{
        if(this.state.modalVisible===1){
            //清除输入数据
            this.form.resetFields()
        }
        //更新状态
        this.setState({
            modalVisible:0
        })
    }

    componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.initRoles()
    }

    render() {

        const {role,roles,loading,modalVisible} = this.state
        const title = (
            <span>
                <Button type='primary' style={{marginRight:10}} onClick={()=>{this.setState({modalVisible: 1})}}>创建角色</Button>
                <Button type='primary' disabled={!role.roleID} onClick={()=>{this.setState({modalVisible: 2})}}>设置角色权限</Button>
            </span>
        )
        return(
            <Card title={title}>
                <Table
                    loading={loading}
                    rowKey='roleID'
                    bordered={true}
                    pagination={{defaultPageSize:6}}
                    columns={this.columns}
                    dataSource={roles}
                    onRow={this.onRow}
                    rowSelection={{type:'radio', selectedRowKeys:[role.roleID]}}
                />
                <Modal
                    title="添加角色"
                    visible={modalVisible===1}
                    onOk={this.addRole}
                    onCancel={this.handleCancel}
                >
                    {/*setForm: 将组件传递给父组件!!!*/}
                    <AddRoleForm setForm={(form)=>{this.form = form}}/>
                </Modal>
                <Modal
                    title="设置权限"
                    visible={modalVisible===2}
                    onOk={this.authRole}
                    onCancel={this.handleCancel}
                >
                    {/*setForm: 将组件传递给父组件!!!*/}
                    <AuthRoleForm role={role} />
                </Modal>
            </Card>
        )
    }
}