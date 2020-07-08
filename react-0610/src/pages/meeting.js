import React, { useState, useEffect } from 'react';
import { Table, Space, Button, } from 'antd';
import { Link } from 'react-router-dom';
import ModelForm from '../components/modelForm';
import MeetingDetail from '../components/meetingDetail'
import { MyContext } from '../content-manager';
import Footer from '../components/footer';
import { connect } from 'react-redux';
import { addNum } from '../action';
import LunBo from './lunbo';



const mapDispatchToProps=(dispatch)=>{
    return {
      addNum1:()=>{dispatch(addNum())}

    }

}
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
    action: [{ name: '查看', path: '/meeting/edit' }, { name: '下载', path: '/meeting/edit' }]
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
const Page = (props) => {
  const [visible, setVisible] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [data, setData] = useState(data1);
  const [choose, setChoose] = useState();
  const columns = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      render:(actions, data, i)=>(
        <a>{i}</a>
      )
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
            if (tag.name == '编辑') {
              return (
                <Button type="link" onClick={() => {
                  setVisible(true);
                  setChoose(key)
                }} key={index} >{tag.name}
                </Button>
              )
            } else if (tag.name == '删除') {
              return (
                <Button type="link" onClick={() => {
                  setData(data.filter((item, j) => j !== i))
                }} key={index}>删除</Button>
              )

            } else if (tag.name == '查看') {
              return (
                <Button type="link" onClick={() => {
                  setShowDetail(true);
                  setChoose(key)
                }} key={index}>查看</Button>
              )

            }
            else {
              return (
                <Link to={tag.path} key={index}>{tag.name}</Link>
              )
            }

          })}
        </Space>
      ),
    },
  ];
  useEffect(()=>{
    if(props.addItem){
      if(props.addItem){
        let list=[...data,props.addItem];
        setData(list);
      } 
    }
  },[props.addItem])

  const  editDate=(editItem)=>{
    let list=data;
    list.map((item)=>{
      if(item.key == editItem.key){
        return editItem
      }else{
        return item
      } 
    })
    setData(list)
  }
  return (
    <div className="game">
      <Table dataSource={data} columns={columns} />
      <MyContext.Provider value={{ setVisible, choose ,editDate}}>
        <ModelForm visible={visible} data={choose}></ModelForm>
      </MyContext.Provider>
      <MyContext.Provider value={{ setShowDetail }}>
        <MeetingDetail visible={showDetail} data={choose}></MeetingDetail>
      </MyContext.Provider>
      <LunBo></LunBo>
    </div>

  );
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data1,
      item:''
    }
  }
  handleAdd = () => {
    let item={key: '4',
    name: '新增数据',
    date: 32,
    time: '20122212212',
    address: 'Sidney No. 1 Lake Park',
    state: 3,
    tags: 5,
    action: [ { name: '删除', path: '/meeting/edit' }]}
    this.setState({
      item:item
    });
    // let sUrl='wewew?name=wedd&age=18';
    // function getUrlParam(sUrl, sKey) {
      // let result = {};//用来存储参数键值对
      // sUrl.replace(/\??(\w+)=(\w+)&?/g, function(str, key, value) {
      //   console.log('str:',str, 'key:',key, 'value:',value)
      //  if (result[key] !== undefined) {//键值已定义
      //    var t = result[key];
      //     result[key] = [].concat(t, value);//把新元素拼接成一个数组
      //   } else {//键值未定义
      //     result[key] = value;//直接为对象创建这个新属性
      //   }
      // });
    // }
    let pattern9=/[\w]+@[\w]+\.com/g;
    let str='1512498@qq.com';
    console.log(pattern9.test(str))
    this.props.addNum1();
  };
  componentWillMount(){
    /* 在 render 之前调用 */
  }
  render(){
    return(
      <div>
      <Button onClick={this.handleAdd} type='primary'>新增会议</Button>
      <Page addItem={this.state.item}></Page>
      
      <Footer></Footer>   
      </div>
    )
  }
  componentDidMount(){
    // 只会在装载完成之后调用一次，在 render 之后调用，
  }
  componentDidUpdate(){
    console.log('stateChange')
  }
}
let contailer=connect(null,mapDispatchToProps)(App)
export default contailer;