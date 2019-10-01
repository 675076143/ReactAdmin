/*
* 应用的根组件
* */

import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import Login from './pages/login/login'
import Admin from "./pages/admin/admin";
import Register from "./pages/register/register";
import Home from "./pages/home/home";
import User from "./pages/user/user";
import Line from "./pages/chars/line";
import Bar from "./pages/chars/bar";
import Pie from "./pages/chars/pie";

/*
* 应用的根组件
* */

function App() {
  return (
    <BrowserRouter>
        <Switch>{/*只匹配以下其中一个*/}
            <Route path='/login' component={Login}></Route>
            <Route path='/admin' component={Admin}></Route>
            <Route path='/register' component={Register}></Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
