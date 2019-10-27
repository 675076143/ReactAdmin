import React,{Component} from "react";
import {Button, Card, message, Modal, Table} from "antd";
import {formateDate} from "../../utils/dateUtils";
import {reqAddRoles, reqAuthRole, reqRoles} from "../../api";
import AddRoleForm from "./add-role-form";
import AuthRoleForm from "./auth-role-form";
import user from '../../utils/memoryUtils'

export default class Role extends Component{

    state ={
        loading:false,
        roles:[],//所有角色
        role:{},//当前选中的角色
        modalVisible:0//0不可见,1添加角色可见,2设置权限可见
    }
    //取到子组件的值
    constructor (props){
        super(props)
        this.authRoleForm = React.createRef()
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
    authRole = async ()=>{
        const {role} = this.state
        const {roleID} = role
        const rolePermissions = this.authRoleForm.current.getRolePermissions();
        //取出内存中存储的user, 将其作为授权者
        const authName = user.user.userName
        const data = {
            permissionNames:[],
            authName: authName
        }
        data.permissionNames = rolePermissions
        data.authName = authName
        const result = await reqAuthRole(roleID, data)
        if(result.code==='200'){
            //如果当前设置的是登录的角色,应该强制退出登录
            message.success('授权成功! ')
            const role = result.data
            this.setState({role})
            this.initRoles()
        }else {
            message.error('授权失败! ')
        }
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
        console.log("ref:",this.authRoleForm)
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
                    rowSelection={{
                        type:'radio',
                        selectedRowKeys:[role.roleID],
                        onSelect: (role)=>{this.setState({role})}}}
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
                    {/*setForm: 将组件传递给父组件!!!
                       ref: 取到子组件的值
                    */}
                    <AuthRoleForm role={role} ref={this.authRoleForm} />
                </Modal>
            </Card>
        )
    }
}