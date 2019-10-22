import React, {Component} from "react";
import {Form,Input,Tree} from "antd";
import FormItem from "antd/es/form/FormItem";
import menuConfig from "../../config/menuConfig";
const { TreeNode } = Tree;

/*
* 添加商品分类的Form组件
* */
export default class AuthRoleForm extends Component{

    constructor(props){
        super(props)
        //根据角色权限数组生成初始状态
        const {rolePermissions} = this.props.role
        this.state = {
            checkedKeys:rolePermissions
        }
    }

    getRolePermissions = ()=> this.state.checkedKeys

    onCheck = checkedKeys => {
        console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
    };

    getTreeNode = (menuConfig)=>{

        //使用map或者reduce, 根据菜单配置动态生成权限列表
        return menuConfig.map(item=>{
            //如果有子节点
            if(item.children){
                return (
                    <TreeNode title={item.title} key={item.key}>
                        {this.getTreeNode(item.children)}
                    </TreeNode>
                )
            }else {
                return (
                    <TreeNode title={item.title} key={item.key}>
                    </TreeNode>
                )
            }

        })
    }

    componentWillMount(){
        this.treeNode = this.getTreeNode(menuConfig)
    }
    render() {
        const {role} = this.props
        const {roleName} = role
        const {checkedKeys} = this.state
        //表单布局
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 15 },
            },
        };
        return (
            <Form {...formItemLayout}>
                <FormItem label='角色名称'>
                    <Input value={roleName} disabled/>
                </FormItem>
                <FormItem>
                    <Tree checkable defaultExpandAll
                          checkedKeys={checkedKeys}
                          onCheck={this.onCheck}>
                        <TreeNode title='平台权限' key='root'>
                            {this.treeNode}
                        </TreeNode>
                    </Tree>
                </FormItem>
            </Form>
        )
    }
}
