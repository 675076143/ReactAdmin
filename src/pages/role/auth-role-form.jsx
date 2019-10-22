import React, {Component} from "react";
import {Form,Input,Tree} from "antd";
import FormItem from "antd/es/form/FormItem";
import menuConfig from "../../config/menuConfig";
const { TreeNode } = Tree;

/*
* 添加商品分类的Form组件
* */
export default class AuthRoleForm extends Component{

    state = {
        role: this.props.role,
    }

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

        const {role} = this.state
        const {roleName} = role
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
                    <Tree checkable defaultExpandAll checkedKeys={role.permissions}>
                        <TreeNode title='平台权限' key='root'>
                            {this.treeNode}
                        </TreeNode>
                    </Tree>
                </FormItem>
            </Form>
        )
    }
}
