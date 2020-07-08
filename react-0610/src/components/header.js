import React from 'react';
import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;
import { NavLink,Link  } from 'react-router-dom';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'meeting',
    };
    this.handleClick=this.handleClick.bind(this)
  }
  handleClick (e) {
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <div>
        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
          <Menu.Item key="meeting"><Link to='/book'/>预顶会议室</Menu.Item>
          <Menu.Item key="meetingRoomManage"><Link to='/meetingManage'/>会议室管理</Menu.Item>
          <SubMenu
            title={
              <span className="submenu-title-wrapper">会议管理
            </span>
            }
          >
             <Menu.Item key='item222'><Link to='/meeting/first'/> 会议纪要</Menu.Item>
             <Menu.Item  key='item2222'><Link to='/meeting/second'/> 会议签到</Menu.Item>
          </SubMenu>
          <Menu.Item key="systemManage"><Link to='/systemManage'/>系统管理</Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default Board;