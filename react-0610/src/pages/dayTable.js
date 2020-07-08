import React from 'react';
import styles from '../styles/table.css';
let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
let data = [{
    name: '苏州',
    id: 23,
    meetingGroup: []
}, {
    name: '上海',
    id: 23213213,
    meetingGroup: []
}, {
    name: '南京',
    id: 55555,
    meetingGroup: []
}];
class App extends React.Component {
    constructor(props) {
        super(props);     
        this.openMeeing = this.openMeeing.bind(this);
        let isToday = this.getDayName(props.selectDay);
        this.state = {
            isToday:isToday,
            data: data,
            left: -648,
        };

    };
    componentWillReceiveProps(props) {
        let isToday = this.getDayName(props.selectDay);
        this.setState({
            isToday:isToday
        },()=>{
            console.log(this.state.isToday);
        })       
    };
    //判断是否为今天
    getDayName(d) {
        var isToday = -1;
        var td = new Date();
        td = new Date(td.getFullYear(), td.getMonth(), td.getDate());
        var od = new Date(d);
        od = new Date(od.getFullYear(), od.getMonth(), od.getDate());
        var xc = od - td;
        if (xc < 0) {
            isToday = -1
        } else if (xc == 0) {
            isToday = 0;
        } else {
            isToday = 1;
        };
        return isToday
    };
    openMeeing(index, isTrue) {
        let items = this.state.data;
        if (!!isTrue) {
            items[index].isOpen = false;

        } else {
            items[index].isOpen = true;
        }
        this.setState({
            data: items
        })

    };
    getTimeLeft = (v) => {
        this.setState({
            left: v
        })
    };
    toLeft = () => {

        if (this.state.left == -72 || this.state.left == -55) {
            this.setState({
                left: 0
            })
            return;
        }
        if (this.state.left > -72) {
            return;
        }
        this.setState({
            left: this.state.left + 72
        })

    };
    toRight = () => {
        if (this.state.left < -648) {
            return;
        }
        if (this.state.left == -648) {
            this.setState({
                left: -703
            })
            return;
        }
        this.setState({
            left: this.state.left - 72
        })
    };

    render() {

        return (
            <div className={styles.rightBox}>
                <div className={styles.dayTable}>
                    <div id="titleLeft" className={styles.titleLeft}>
                        <div className={[styles.leftBox, styles.timeHeaderLeft].join(' ')} id="titleLeftdiv">会议室</div>
                        <div className={styles.timeHeader} id='timeHeader'>
                            <div style={{ left: this.state.left + 'px' }} className={styles.timeHeaderBoxs}>
                                {
                                    arr.map((item, index) =>
                                        <div className={styles.timeHeaderBox} id={index} key={'header'+item}>{index < 10 ? '0' + index : index}:00</div>
                                    )
                                }
                            </div>
                        </div>

                    </div>
                    <div className={styles.scrollBox}>
                        <div className={[styles.scrollItem,styles.leftscroll].join(' ')} onClick={this.toLeft} >
                            <img src="http://localhost:3000/src/table/images/u207.png" />
                        </div>
                        <div className={[styles.scrollItem,styles.rightscroll].join(' ')} onClick={this.toRight}>
                            <img src="http://localhost:3000/src/table/images/u204.png" />
                        </div>

                    </div>
                    <div id="tableRight" className={styles.tableRight}>
                        {
                            this.state.isToday == 0 && (<GetToday left={this.state.left}></GetToday>)
                        }

                        {
                            this.state.data.map((item, index) => {
                                return (
                                    <div key={'daytable'+index}>
                                        <div className={styles.regionTool} id={item.id} row={index}>
                                            <div className={styles.openButton} id={'btn' + item.id} onClick={e => { this.openMeeing(index, item.isOpen) }}><span className={item.isOpen ? styles.openImg : styles.notOpenImg} /></div>
                                            <div className={styles.regionName}>{item.name} </div>
                                        </div>
                                        <div className={item.isOpen ? styles.showMeeting : styles.notShow}>
                                            {
                                                item.meetingGroup.map((v, i) => {
                                                    return (
                                                        <div className={styles.meetingItemTool} key={'meetingItemTool'+i+index}>
                                                            <div className={styles.leftMeetingName}>{v.roomName}</div>
                                                            <div className={styles.meetingTable} id={'scroll' + index + i}>
                                                                <div className={styles.timeHeaderBoxs} style={{ left: this.state.left + 'px' }}>

                                                                    <GetTimeBodyItem key={'i' + i} row={i} />
                                                                    {
                                                                        v.meeting.map((meeting, j) =>
                                                                            < DomMeetingItem key={j} data={meeting} />
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )

                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                
            </div>
        );
    };
    componentWillMount() {


    };
    componentDidMount() {
        let tt = this.state.data;
        tt[0].meetingGroup = [{
            roomName: '上海视讯4F-会议室1',
            roomId: 18,
            meeting: [{
                timeLen: 120,
                time: "05:00",
                red: true
            }, {
                timeLen: 90,
                time: "08:00",
                red: false
            },
            ]
        }, {
            roomName: '上海视讯4F-会议室2',
            roomId: 18,
            meeting: []
        }, {
            roomName: '上海视讯4F-会议室3',
            roomId: 18,
            meeting: [{
                timeLen: 30,
                time: "08:00",
                red: false
            }]
        }, {
            roomName: '上海视讯4F-会议室4',
            roomId: 18,
            meeting: []
        }, {
            roomName: '上海视讯4F-会议室5',
            roomId: 18,
            meeting: []
        },];
        tt[0].isOpen = true;

        tt[1].meetingGroup = [{
            roomName: '上海视讯4F-会议室1',
            roomId: 18,
            meeting: [{
                timeLen: 120,
                time: "05:00",
                red: true
            }, {
                timeLen: 90,
                time: "08:00",
                red: false
            },
            ]
        }, {
            roomName: '上海视讯4F-会议室2',
            roomId: 18,
            meeting: [{
                timeLen: 30,
                time: "24:00",
                red: false
            },]
        }]

        this.setState({
            data: tt,
        });


    };
}

//单条会议室一天时间线情况渲染
function GetTimeBodyItem(props) {
    let row = props.row
    let elements = [];
    for (let i = 0; i < 96; i++) {
        let classItemName = (i > 0 && (i + 1) % 4 === 0) ? [styles.ItemBox, styles.hourBoder].join(' ') : styles.ItemBox;
        elements.push(<div className={classItemName} x={i} y={row} key={i}></div>)
    }
    return (
        <div className={styles.bodyItem} onMouseDown={e => mouseStart(e)}>
            {elements}
        </div>
    )
};
function mouseStart(e) {
    console.log(e.target.className);
    let className = e.target.className;
    if (className.indexOf('ItemBox') == -1) {
        // closeMouse();
        // for (var i = 0; i < e.path.length; i++) {
        //     if (e.path[i].className.indexOf('meetingItemBox') != -1) {
        //         checkDetail(e.path[i]);
        //         break;
        //     }
        // }
        // return;
    }
};

//单条会议情况渲染
function DomMeetingItem(props) {
    let data = props.data;
    if (data === null) {
        return;
    }
    var time = data.time;
    time = parseInt(time.substring(0, 2)) * 4 + parseInt(time.substring(3) / 15);
    var marginLeft = 'left:' + time * 18 + 'px;';
    var wid = data.timeLen / 15 * 18 - 1;
    var width = "width:" + wid + 'px;';
    var widthText = "width:" + (wid - 14) + 'px;';
    let textClass = "";
    if (!!data.red) {
        textClass = styles.meetingRed;
    } else {
        textClass = styles.meetingGreen;
    }
    const Style = {
        left: time * 18 + 'px',
        width: wid + 'px'
    }
    return (
        <div className={[styles.meetingItemBox ,textClass].join(' ')} style={Style}>
            <div className={styles.leftSpan}></div>
            <div className={styles.rightSpan} style={{ width: (wid - 14) + 'px' }}><span>UCD例会</span></div>
        </div>
    )
};
//获取今天的时间线
function GetToday(props) {
    let lft = props.left;
    var now = new Date();
    var hour = now.getHours();
    var min = now.getMinutes();
    var allMin = hour * 60 + min;
    var le = allMin * 72 / 60 + 151;
    return (
        <div className={styles.todayTime} style={{ marginLeft: le + 'px', left: lft + 'px' }}>
            <div className={styles.todayHeader}></div>
            <div className={styles.timeLine}></div>
        </div>
    )
};
export default App;