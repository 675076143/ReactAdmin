import React, {Component} from "react";
import {Button, Card, message, Modal, Table} from "antd";
import {
    reqAddUser,
    reqDeleteUser,
    reqUpdateUser,
    reqUpdateUserInRoleName,
    reqUsers
} from "../../api";
import {formateDate} from "../../utils/dateUtils";
import LinkButton from "../../components/link-button";
import AddUserForm from "./add-user-form";

export default class User extends Component{
    state = {
        users:[],
        userRoles:[],//用户具有的角色（修改时候有数值）
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
                    roleName.map((item)=> result+=item+' ')
                    return result
                }
            },
            {
                title:'操作',
                render:(user)=>(
                    <span>
                        <LinkButton onClick={()=>this.updateUser(user)}>修改</LinkButton>
                        <LinkButton onClick={()=>this.deleteUser(user.userID)}>删除</LinkButton>
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
    //更新用户
    updateUser = (user) =>{
        this.user = user    //保存当前选中的user
        this.setState({modalVisible:1})
    }
    //删除用户
    deleteUser = (userID)=>{
        Modal.confirm({
            title: '确认删除用户?',
            content: '此操作不可逆',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: async() => {
                const result = await reqDeleteUser(userID)
                if(result.code === "200"){
                    message.success('删除成功')
                    this.initUsers()
                }
            }
        });
    }
    //添加用户
    addOrUpdateUser = ()=>{
        this.form.validateFields( async (err,values)=>{
            //console.log('values:',values)
            if(!err){
                const {userName,phone,email,userRoles} = values
                console.log(this.user)
                const {userID} = this.user
                let result
                if(userID){//如果有user,代表是更新, 否则是添加
                    const data = {
                        email:email,
                        phone:phone
                    }
                    result = await reqUpdateUser(userID,data)
                }else {
                    result = await reqAddUser(userName,email,phone)
                }
                //更新/添加用户成功后 执行修改用户角色
                if(result.code==='200'){
                    const userID = result.data.userID
                    const userRole = {
                        userID:0,
                        roleName:[]
                    }
                    userRole.userID = userID
                    userRole.roleName = userRoles
                    const resultUserRole = await reqUpdateUserInRoleName(userRole)
                    if(resultUserRole.code==='200'){
                        message.success("成功")
                    }
                    this.initUsers()
                }else {
                    message.error("失败")
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
        this.user={}
    }

    componentWillMount() {

        this.initColumns()
    }
    componentDidMount() {
        this.initUsers()
    }

    render(){
        const {user} = this || {}
        const title = (
            <Button type='primary' onClick={()=>this.setState({modalVisible:1})}>创建用户</Button>
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
                    title={user?"修改用户":"添加用户"}
                    visible={modalVisible===1}
                    onOk={this.addOrUpdateUser}
                    onCancel={this.handleCancel}
                >
                    {/*setForm: 将组件传递给父组件!!!*/}
                    {<AddUserForm setForm={(form)=>{this.form = form}} user={user}/>}
                </Modal>
            </Card>
        )
    }
}

