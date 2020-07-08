import React, { useState, useEffect } from 'react';
import styles from '../styles/lunbo.less';
const number = [1, 3, 5, 7];
let showIndex = 0;
let timeOut;

function xxx() {
    console.log('ffd')
}


export default (props) => {

    const [numbers, setNumber] = useState(number);
    // const [showIndex,setShowIndex]=useState(0);
    const [left, setLeft] = useState(0);
    useEffect(() => {
        console.log('6' / 3);
        console.log(xxx('dfdf'));


        timeOut = setInterval(() => {
            addIndex();
            console.log(showIndex);
        }, 2000);
    }, [])
    const ClickAdd=()=>{
        clearInterval(timeOut)
        addIndex();
        setTimeout(()=>{
            timeOut = setInterval(() => {
                addIndex();
                console.log(showIndex);
            }, 2000);
        },3000)
      
    }
    const ClickLeft=()=>{
        clearInterval(timeOut);
        reduceindex();
        setTimeout(()=>{
            timeOut = setInterval(() => {
                reduceindex();
                console.log(showIndex);
            }, 2000);
        },3000) 
    }



    const addIndex = () => {
        if (showIndex == number.length - 1) {
            showIndex = 0;
        } else {
            showIndex++;
        }
        setLeft(showIndex * 100);

    };
    const reduceindex=()=>{
        if(showIndex<1){
            showIndex=number.length-1;
        }else{
            showIndex--
        }
        setLeft(showIndex * 100);
    };

    return (
        <div>
        <button onClick={ClickLeft}>left</button>
        <div className="game" style={{ width: '100px', height: '50px', backgroundColor: 'red', overflow: 'hidden', position: 'relative' }}>
            <div style={{ left: -left + 'px', width: numbers.length * 100 + 'px', position: 'relative' }}>
                {
                    numbers.map((item, index) => {
                        return (<div key={index} className={styles.content}>{item}</div>)

                    })}
            </div>
        </div>
        <button onClick={ClickAdd}>right</button>
        </div>
    )
}