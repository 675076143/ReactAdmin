import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {message} from "antd";


export default class RichTextEditor extends Component {

     uploadImageCallBack = (file) => {
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/api/upload');
                const data = new FormData();
                data.append('file', file);
                xhr.send(data);
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText);
                    if(response.code === "200"){
                        message.success("图片上传成功!")
                        resolve({data:{url:response.data.url}})
                    }else {
                        message.error("图片上传失败!")
                    }
                });
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText);
                    reject(error);
                });
            }
        );
    }

    constructor(props) {
        super(props);
        //根据已有的HTML生成富文本数据
        const html = this.props.detail
        //如果有值
        if(html){
            const contentBlock = htmlToDraft(html);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                this.state = {
                    editorState,
                };
            }
        }

    }

    state = {
        editorState: EditorState.createEmpty(),//创建一个空的编辑对象
    }

    //获取商品详情数据
    getDetail = ()=>{
        //返回对应HTML格式的文本
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Editor
                    editorState={editorState}
                    editorStyle={{border:'1px solid black',minHeight:200, padding:10}}
                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={{
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                        image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
                    }}
                />
            </div>
        );
    }
}