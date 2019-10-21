import React,{Component} from "react";
import {Upload, Icon, Modal, message} from 'antd';
import {BASE_IMG_URL} from "../../utils/constants";

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class PicturesWall extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [
        ],
    };

    //通过ref的方式, 在父组件中取得子组件
    constructor (props){
        super(props)
        const fileList = [];
        //取出传入的images
        const {productImg} = this.props
        //如果传入了images属性
        if(productImg){
            const image = {}
            image.uid = -1;
            image.name = productImg
            image.status = "done"
            image.url = BASE_IMG_URL+productImg
            fileList.push(image)
        }
        //初始化状态
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList
        }
    }

    //获取所有已上传的图片文件数组
    getAllImages = ()=>{
        return this.state.fileList
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    /*
    * fileList: 所有已上传文件对象的数组
    * fileList:[{uid,name,status,url},{}]
    * uid: 每个文件名独有的ID,建议取负数,防止和内部生成的ID冲突
    * name: 图片文件名
    * status: done->已上传, uploading->正在上传中, removed->已删除
    * url: 图片地址
    * file: 当前操作的图片文件(上传/删除)
    * */
    handleChange = ({ file, fileList }) => {
        //图片添加完成(done)
        if(file.status === 'done'){
            //获取接口返回结果
            const result = file.response
            if(result.code === "200"){
                message.success("图片上传成功")
                const {fileName,url} = result.data
                //取出所有文件中的最后一个
                file = fileList[fileList.length-1]
                file.name = fileName
                file.url = url
            }else {
                message.error("图片上传失败")
            }

        }else if(file.status === 'removed') {//删除图片
            //调用删除图片接口, 后端还没写好
            message.error("快去写图片删除接口!!!")
        }
        this.setState({ fileList })
    };


    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div>Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action="/api/upload"//上传图片的接口地址
                    accept='image/*'//只接收图片格式
                    name='file'//请求参数名
                    listType="picture-card" //卡片样式
                    fileList={fileList} //所有已上传图片的对象数组
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}
