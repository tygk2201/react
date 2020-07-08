import React from 'react';
import { connect } from 'react-redux';
import { addNum } from '../action';
import { Table, Space, Button, } from 'antd';

const mapStateToProps=(state)=>{
    if(typeof state=='undefined') return {num:0};
    return {
        num1:state.reducerA.num
    }

}
const mapDispatchToProps=(dispatch)=>{ 
    return {
        // addNum1:(count)=>bindActionCreators(addNum,dispatch);
        addNum1:()=>{dispatch(addNum())}

    }

}

class footer extends React.Component {
    constructor(props){
        super(props);
        this.state={
            num:0
        }

    }
    render(){
        return (
            <div>
                点击次数{this.props.num1}条
                <Button onClick={()=>{
                    this.props.addNum1();
                }}>新增</Button>
            </div>
        )
    }
}
const contailer=connect(mapStateToProps,mapDispatchToProps)(footer)
export default contailer