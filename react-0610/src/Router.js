import {
    // HashRouter as Router,
    BrowserRouter as Router,  //使用as相当于重命名，如果需要从浏览器路由改成HasRouter只需要在这里把BrowserRouter改成HasRouter就可以了，其他地方还是使用Router包着不需要改变
    Switch,		//和js里面的switch语法差不多，这个是用来判断路由地址
    Route,		//用来路由的
    Redirect,	//重定向，用来判断用户输入的地址是否满足条件，不满足就重定向到xxx页面
} from "react-router-dom";
import React from 'react';
import { NavLink } from 'react-router-dom';
import App from './pages/App';
import Error from './pages/error';
import User from './pages/user'
import Login from './pages/login';
import { Avatar, Badge } from 'antd';
import { connect } from 'react-redux';
import {
    HomeOutlined,
    SettingOutlined,
    UserOutlined,
    LogoutOutlined
} from '@ant-design/icons';

const mapStateToProps=(state)=>{
    if(typeof state=='undefined') return {num:0};
    return {
        count:state.reducerA.num
    }

}
class BasicRoute extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Router >
                    <div className='firstManu'>
                        <span>kedacom</span>
                        <NavLink to='/logout' className='menuItem'><LogoutOutlined /></NavLink>
                        <NavLink to='/user' className='menuItem'><Badge count={this.props.count}>
                            <Avatar size="small" icon={<UserOutlined />} /></Badge></NavLink>
                        <NavLink to='/setting' className='menuItem'><SettingOutlined /></NavLink>
                        <NavLink to='/home' className='menuItem'> <HomeOutlined /></NavLink>
                    </div>
                    <div className='firstBody'>
                        <Switch>
                            <Route path='/home' exact component={App} />
                            {/* <Route path='/' exact component={App} />  */}
                            <Route path='/setting' component={Error} />
                            <Route path='/logout' component={Login} />
                            <Route path='/user' component={User} />
                            <Redirect from="/" to="/home" />
                        </Switch>
                    </div>
            </Router>
        )
    }
};
export default connect(mapStateToProps,null)(BasicRoute)
// export default BasicRoute;