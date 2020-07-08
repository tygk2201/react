import React from 'react';

let  meetingDate=[{'name':'sdsd','time':'736473','des':'sdgfsgdfsghd'},{'name':'sdsd','time':'736473','des':'sdgfsgdfsghd'},{'name':'sdsd','time':'736473','des':'sdgfsgdfsghd'}];
function  MeetingList(props){
    const data=props.data;
    const dataItem=data.map((item,index)=>
        <div key={'meet'+index}>{item.name}</div>
    );
    return (<div className='table'>{dataItem}</div>);

};

class App extends React.Component {
    constructor(props){
        super(props)
        this.state={
            meetingDate: meetingDate
        };
        this.changeData=this.changeData.bind(this);

    }
    changeData(){
        this.setState({
            meetingDate:[{'name':'sdsd','time':'736473','des':'sdgfsgdfsghd'},{'name':'sdsd','time':'736473','des':'sdgfsgdfsghd'}]
        })
    };
    render() {
        return (
            <div className="rightBox">
                <button onClick={this.changeData}>check</button>
                <MeetingList data={this.state.meetingDate} />            
           </div>
        );
    }
}

export default App;