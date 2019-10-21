import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {Card,Icon,Form,Input,Cascader,Upload,Button} from "antd";
import number from "less/lib/less/functions/number";
import {reqSecondaryCategory, reqSecondaryCategoryBySecondaryCategoryID, reqTopCategory} from "../../api";
import PicturesWall from "./pictures-wall";
import LinkButton from "../../components/link-button";

const {TextArea} = Input
const {Item} = Form
/*
* 主页
* */



class ProductAddOrUpdate extends Component{

    state = {
        options:[],//级联选项数据
        topCategoryID:0
    }

    //通过ref的方式, 在父组件中取得子组件
    constructor(props){
        super(props)
        //创建用来保存ref标识的标签对象
        this.picturesWall = React.createRef()
    }

    //获取一级列表, 如果当前是修改页面则应该把二级列表也获取到
    getTopCategories = async ()=>{
        const {data} = await reqTopCategory();
        const options = data.map(item =>({
            value:item.topCategoryID,
            label:item.topCategoryName,
            isLeaf:false
        }))

        //根据二级分类ID获取到一级分类ID
        const {updateOrAdd,product} = this
        const {secondaryCategoryID} = product
        //如果是更新页面
        if(updateOrAdd){
            //取到一级分类ID
            const topCategoryID = await this.getTopCategoryID(secondaryCategoryID)
            //通过一级分类ID来取得当前应该选中哪个一级分类
            const targetOption = options.find(option=> option.value===topCategoryID)
            //通过一级列表来取得所有子分类
            const children = await this.getSecondaryCategories(topCategoryID)
            //在选中的分类下添加子分类
            targetOption.children = children
        }
        this.setState({options})
        console.log(options)
    }
    //根据一级列表ID获取二级列表Option
    getSecondaryCategories = async (topCategoryID)=>{
        //根据当前选中项获取二级列表
        const {data} = await reqSecondaryCategory(topCategoryID)
        const options = data.map(item =>({
            value:item.secondaryCategoryID,
            label:item.secondaryCategoryName,
            isLeaf:true
        }))
        console.log("获取二级列表:",topCategoryID)
        return options
    }

    //根据商品二级列表ID获取一级列表ID
    getTopCategoryID = async (secondaryCategoryID)=>{
        const {data} = await reqSecondaryCategoryBySecondaryCategoryID(secondaryCategoryID)
        const {topCategoryID} = data
        this.setState({topCategoryID})
        return topCategoryID
    }

    //级联选择改变时执行
    onChange = (value, selectedOptions) => {
        console.log(value, selectedOptions);
    };

    //加载下一级列表数据的回调函数
    loadData = async selectedOptions => {
        //当前选中项
        const targetOption = selectedOptions[selectedOptions.length - 1];
        //显示loading
        targetOption.loading = true;
        //根据当前选中项获取二级列表
        const options = await this.getSecondaryCategories(targetOption.value)
        //隐藏loading
        targetOption.loading = false;
        //更新状态
        targetOption.children = options
        this.setState({
            options: [...this.state.options],
        });

    };

    //验证商品价格
    validatePrice = (rule, value, callback) =>{
        if(value*1 > 0){
            callback()
        }else {
            callback('商品价格必须大于0')
        }
    }
    //验证商品分类, 必须选中二级分类
    validateCategory = (rule, value, callback) =>{
        if(value[1]){
            callback()
        }else {
            callback('您还没选中二级分类!')
        }
    }

    //提交表单
    submit = () =>{
        //表单验证
        this.props.form.validateFields((errors, values) => {
            if(!errors){
                alert("submit")
                console.log(values)
                //获取图片上传子组件的图片数据
                const images = this.picturesWall.current.getAllImages()
            }
        })
    }
    componentWillMount() {
        //取出上个页面携带的state
        const product = this.props.location.state
        console.log(product)
        /*
        * 两个感叹号能将其转为bool类型
        * 如果product有值:
        * !product->false
        * !!product->true
        * true: 更新商品
        * false: 添加商品
        * */
        this.updateOrAdd = !!product
        //保存product
        this.product = product||{}
    }

    componentDidMount () {
        //取得一级分类列表
        this.getTopCategories()
    }

    render(){
        const {updateOrAdd,product} = this
        const {secondaryCategoryID} = product
        const {topCategoryID} = this.state
        //级联分类ID
        const categoryID = []
        if(updateOrAdd){//true代表是更新页面
            categoryID.push(topCategoryID,secondaryCategoryID)
        }
        console.log("categoryID:  ",categoryID)

        const title = (
            <span>
                <LinkButton onClick={()=>this.props.history.goBack()} style={{marginRight:10}}>
                    <Icon type='arrow-left'/>
                </LinkButton>
                <span>{updateOrAdd ? '修改商品' : '添加商品'}</span>
            </span>
        )


        function onChange(value) {
            console.log(value);
        }

        //表单布局
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
        };
        //表单验证
        const { getFieldDecorator } = this.props.form;

        return (
            <Card title={title}>
                <Form {...formItemLayout} >
                    <Item label='商品名称' >
                        {getFieldDecorator('productName', {
                            initialValue: product.productName,
                            rules: [
                                {
                                    required: true,
                                    message: '商品名称不能为空!',
                                },
                            ],
                        })(<Input placeholder='请输入商品名称'/>)}
                    </Item>
                    <Item label='商品描述' >
                        {getFieldDecorator('productDesc', {
                            initialValue: product.productDesc,
                            rules: [
                                {
                                    required: true,
                                    message: '商品描述不能为空!',
                                },
                            ],
                        })(<TextArea placeholder='请输入商品描述' autosize />)}

                    </Item>
                    <Item label='商品价格' >
                        {getFieldDecorator('price', {
                            initialValue: product.price,
                            rules: [
                                {
                                    required: true,
                                    message: '商品价格不能为空!',
                                },
                                {
                                    validator:this.validatePrice
                                }
                            ],
                        })(<Input type='number' placeholder='请输入商品价格' addonAfter='元'/>)}
                    </Item>
                    <Item label='商品分类'>
                        {getFieldDecorator('category',{
                            initialValue:categoryID,
                            rules:[
                                {required:true, message:'请选择商品分类!'},
                                {validator:this.validateCategory}
                            ]
                        })(
                        <Cascader
                            options={this.state.options} //需要显示的列表数据
                            loadData={this.loadData} //选择某级分类时,加载下一级列表的监听回调
                            onChange={this.onChange}
                            changeOnSelect
                        />)}
                    </Item>
                    <Item label='商品图片'>
                        <PicturesWall ref={this.picturesWall} productImg={product.image}/>
                    </Item>
                    <Item>
                        <Button type='primary' onClick={this.submit}>提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(ProductAddOrUpdate)

/*
* 子组件调用父组件: 将父组件的方法已函数的形式传递给子组件, 子组件就可以调用
* 父组件调用子组件的方法: 在父组件中通过ref的方式得到子组件标签对象(组件), 调用其方法
* */