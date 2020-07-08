import React from 'react';
import DayTable from './dayTable';
import { DatePicker } from 'antd';
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';
class App extends React.Component {
 
  constructor(props) {
    super(props);
    let td=new Date();
    td=new Date(td.getFullYear(), td.getMonth(), td.getDate());
    this.state = {
      selectDay:td,
    };
  };
  render() {
    return (
      <div className="rightBox">
        <DatePicker defaultValue={moment(this.state.selectDay,dateFormat)}  allowClear={false} onChange={this.dayChoose}/>
        <DayTable selectDay={this.state.selectDay}></DayTable>
      </div>
    );
  };
  dayChoose =(date,dateString) =>{
    this.setState({
      selectDay:dateString
    })
    console.log(dateString,this.state.selectDay)
  }
}

export default App;