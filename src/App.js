/*
* 应用的根组件
* */

import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import Login from './pages/login/login'
import Admin from "./pages/admin/admin";

/*
* 应用的根组件
* */

function App() {
  return (
    <BrowserRouter>
        <Switch>{/*只匹配以下其中一个*/}
            <Route path='/login' component={Login}></Route>
            <Route path='/admin' component={Admin}></Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
