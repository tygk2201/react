import React from 'react';
// import logo from '../logo.svg';
// import '../App.css';

import {
  // HashRouter as Router,
  BrowserRouter as Router,  //使用as相当于重命名，如果需要从浏览器路由改成HasRouter只需要在这里把BrowserRouter改成HasRouter就可以了，其他地方还是使用Router包着不需要改变
  Switch,		//和js里面的switch语法差不多，这个是用来判断路由地址
  Route,		//用来路由的
  Redirect,	//重定向，用来判断用户输入的地址是否满足条件，不满足就重定向到xxx页面
} from "react-router-dom";
import Meeting from './meeting';
import Second from './second';
import Header from '../components/header';
import RoomMeeting from './roomMeeting';
import LeftManu from '../components/leftMenu';
import EditMeeting from './editMeeting';
import { Menu } from 'antd';
const { SubMenu } = Menu;


class App extends React.Component {
  render() {
    return (
      <div>
        <Router >
          <Header/>
          <Switch>
            {/* <Route path="/" exact component={RoomMeeting} /> */}
            <Route path='/home' exact component={RoomMeeting} />
            <Route path='/meetingManage' exact component={Second} />
            <Route path='/meeting/first' exact component={Meeting} />
            <Route path='/meeting/second' exact component={Second} />
            <Route path='/systemManage' exact component={LeftManu} />
            <Route path='/meeting/edit' exact component={EditMeeting} />
            <Redirect from="/book" to="/home" />
          </Switch>
        </Router>
      </div>

    )
  }
}

export default App;
