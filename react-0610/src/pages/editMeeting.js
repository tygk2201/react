import React from 'react';
import { Table, Space, Button, } from 'antd';
import { Link } from 'react-router-dom';
import ModelForm  from '../components/modelForm';
import MeetingDetail from '../components/meetingDetail'
import { MyContext } from '../content-manager';
const data1 = [
  {
    key: '1',
    name: 'John Brown',
    date: 32,
    time: '20122212212',
    address: 'New York No. 1 Lake Park',
    state: 3,
    tags: 7,
    action: [{ name: '查看', path: '/meeting/edit' }]
  },
  {
    key: '2',
    name: 'Jim Green',
    date: 32,
    time: '20122212212',
    address: 'London No. 1 Lake Park',
    state: 3,
    tags: 6,
    action: [{ name: '查看', path: '/meeting/edit' }, { name: '下载', path: '/meeting/edit' }, { name: '发送', path: '/meeting/edit' }]
  },
  {
    key: '3',
    name: 'Joe Black',
    date: 32,
    time: '20122212212',
    address: 'Sidney No. 1 Lake Park',
    state: 3,
    tags: 5,
    action: [{ name: '查看', path: '/meeting/edit' }, { name: '下载', path: '/meeting/edit' }, { name: '编辑', path: '/meeting/edit' }, { name: '删除', path: '/meeting/edit' }]
  },
];


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data1
    }
  }
  handleDelete = key => {
    const dataSource = [...this.state.data];
    this.setState({
      data: dataSource.filter(item => item.key !== key),
    });
  };
  render() {
    const { data } = this.state;
    const columns = [
      {
        title: '序号',
        dataIndex: 'key',
        key: 'key',
      },
      {
        title: '会议室名称',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: '日期',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: '会议室时间',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '会议状态',
        dataIndex: 'state',
        key: 'state',
      },
      {
        title: '会场',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '参会人数',
        key: 'tags',
        dataIndex: 'tags',
      },
      {
        title: '操作',
        key: 'action',
        dataIndex: 'action',
        render: (actions, key, i) => (
          <Space size="middle">{
            actions.map((tag, index) => {
              if (tag.name == '删除') {
                return (
                  <Button type="link" onClick={() => {
                    // this.setState({data:data.splice(i,1)
                    this.setState({
                      data: data.filter((item, index) => index !== i),
                    })


                  }} key={index}>删除</Button>
                )

              } else {
                return (
                  <Link to={tag.path} key={index}>{tag.name}</Link>
                )
              }

            })}
          </Space>
        ),
      },
    ];
    return (
      <div className="game">
        <Table dataSource={data} columns={columns} />
      </div>
    );
  }
}

export default App;