import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './app.jsx';
import ErrorPage from './404.jsx';
import User from './user.jsx';
import Header from './header.jsx';
import Home from './home.jsx';
import Signup from './signup.jsx';
import Login from './login.jsx';
import Userlist from './userlist.jsx';
import FaTie from './faTie.jsx'
import Tiedetail from './tiedetail.jsx'
import Quan from './quan.jsx'
import AddQuan from './addquan.jsx'
import Quandetail from './quandetail.jsx'
import Quanfatie from './quanfatie.jsx'
import Setting from './setting.jsx'

const routes = (
    <Route path="/" component={App}>
        <IndexRoute components={{header:Header,main:Home}}/>
        <Route path="/404" components={{header:Header,main:ErrorPage}}/>
        <Route path="/home/:id" components={{header:Header,main:Home}}/>
        <Route path="/tiedetail/:id" components={{header:Header,main:Tiedetail}}/>
        <Route path="/user/:id" components={{header:Header,main:User}}/>
        <Route path="/login" components={{main:Login}}/>
        <Route path="/signup" components={{main:Signup}}/>
        <Route path="/userlist" components={{header:Header,main:Userlist}}/>
        <Route path="/fatie" components={{header:Header,main:FaTie}}/>
        <Route path="/quan" components={{header:Header,main:Quan}}/>
        <Route path="/addquan" components={{header:Header,main:AddQuan}}/>
        <Route path="/quanfatie/:id" components={{header:Header,main:Quanfatie}}/>
        <Route path="/quandetail/:id" components={{header:Header,main:Quandetail}}/>
        <Route path="/setting/:id" components={{header:Header,main:Setting}}/>
    </Route>
)

export default routes;