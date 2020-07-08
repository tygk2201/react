import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
    // HashRouter as Router,
    BrowserRouter as Router,  //使用as相当于重命名，如果需要从浏览器路由改成HasRouter只需要在这里把BrowserRouter改成HasRouter就可以了，其他地方还是使用Router包着不需要改变
    Switch,		//和js里面的switch语法差不多，这个是用来判断路由地址
    Route,		//用来路由的
    Redirect
} from "react-router-dom";
import { Menu } from 'antd';
const { SubMenu } = Menu;
import RoomMeeting from '../pages/roomMeeting';
import deviceList from '../pages/deviceList';
import meetingList from '../pages/meetingList';
import deviceMonitor from '../pages/deviceMonitor';
import {
    HomeOutlined,
    SettingOutlined,
    AppstoreOutlined
  } from '@ant-design/icons';

class Left extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          current: 'meeting',
        };
        this.handleClick=this.handleClick.bind(this)
      }
      handleClick (e) {
        console.log('click ', e);
      };

    render() {
        return (
            <div className='systemBody'>
                <Router >
                    <div>
                        <Menu
                            onClick={this.handleClick}
                            style={{ width: 256 }}
                            defaultSelectedKeys={['6']}
                            defaultOpenKeys={['sub2']}
                            mode="inline"
                        >
                            <SubMenu
                                key="sub2"
                                title={
                                    <span>
                                        <AppstoreOutlined />
                                        <span>会议室配置</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="5"><NavLink to='/systemManage/scenesManage' className='menuItem'>场景管理</NavLink></Menu.Item>
                                <Menu.Item key="6"><NavLink to='/systemManage/meetingList' className='menuItem'>会议室列表</NavLink></Menu.Item>
                    
                            </SubMenu>
                            <SubMenu
                                key="sub4"
                                title={
                                    <span>
                                        <SettingOutlined />
                                        <span>设备管理</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="9"><NavLink to='/systemManage/deviceMonitor' className='menuItem'>设备监控</NavLink></Menu.Item>
                                <Menu.Item key="10">  <NavLink to='/systemManage/deviceList' className='menuItem'> 设备列表</NavLink></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </div>
                    <Switch>                     
                        <Route path="/systemManage/scenesManage" exact component={RoomMeeting} />
                        <Route path='/systemManage/deviceMonitor' exact component={deviceMonitor} />
                        <Route path='/systemManage/meetingList' exact component={meetingList} />
                        <Route path='/systemManage/deviceList' exact component={deviceList} />
                        <Redirect from="/systemManage" to="/systemManage/meetingList" />
                    </Switch>
                </Router>
            </div>

        )
    }
}

export default Left;