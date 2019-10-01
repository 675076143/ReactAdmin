/*
* 入口js
* */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './app.css'
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.min.css'
import 'nprogress/nprogress.css'
import storageUtils from "./utils/storageUtils";
import memoryUtils from "./utils/memoryUtils";

//从localstorage中读取user保存到内存中
memoryUtils.user = storageUtils.getUser()

//将APP组件标签渲染到index页面的div上
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
