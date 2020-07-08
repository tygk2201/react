import React from 'react';
import styles from '../styles/weekTable.css';

let week = [];
let timeTable = [];
let meetingTouchStartY,meetingTouchIdSt;
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToday: -1,
            meetingList: [],
            createMeeing: '',
            isTopMove:false
        };

    };
    componentWillMount() {
        this.getNewMeetingList();
        getWeek();
       
    };
    componentDidMount(){
        document.getElementById("scrollBody").scrollTop += 648;
    };
    render() {
        return (
            <div className={styles.weekTable}>
                <div className={styles.weekHeader}>
                    <div className={[styles.headerFirst, styles.headerBox].join(' ')}>时间</div>
                    <GetdayHeader />
                </div>
                <div className={styles.scrollBody} id="scrollBody">
                    <div className={styles.leftTime}><GetLeftTime /></div>
                    <div className={styles.weekTableBody}>
                        {
                            this.state.meetingList.map((item, index) => {
                                return (
                                    <div className={styles.oneDayTable} key={'meetingBox' + index}>
                                        <div className={styles.oneDayItem} onClick={this.addMeeting}>
                                            <DomOneDayItem row={index} />
                                        </div>
                                        {
                                            item.meetingList.map((res, i) => {
                                                return (
                                                    <DomMeetingItem data={res} key={'meeting' + i}></DomMeetingItem>
                                                )
                                            })
                                        }
                                    </div>)
                            })
                        }
                        {

                            this.state.createMeeing &&

                            <div className={[styles.meetingItemBox, styles.meetingCreate].join(' ')} style={this.state.createMeeing.style} onMouseDown={this.touchStart} onMouseMove={this.touchMove} onMouseUp={this.touchEnd}>
                                <div className={styles.rightSpan}>
                                    <div>再次点击创建会议</div>
                                    <div>{this.state.createMeeing.startTime + '-' + this.state.createMeeing.endTime}</div>
                                </div>
                                <div className={styles.topMove} onMouseDown={this.topStart} onMouseMove={this.topMove} onMouseUp={this.topEnd}></div>
                                <div className={styles.bottomMove} onMouseDown={this.bottomStart} onMouseMove={this.bottomMove} onMouseUp={this.bottomEnd}></div>
                            </div>
                        }
                    </div>
                    <GetToday />

                </div>
            </div>
        )
    };
    //会议数据重组
    getNewMeetingList() {
        let meetingList = [{ meetingName: 'dhfj', timeLen: 30, startTime: "08:00", red: false, day: 0 },
        { meetingName: 'dhfj', timeLen: 30, startTime: "12:00", red: true, day: 2 },
        { meetingName: 'dhfj', timeLen: 120, startTime: "14:00", red: true, day: 2 },
        { meetingName: 'xxxxx', timeLen: 60, startTime: "09:00", red: true, day: 4 },];
        let newMeetings = [];
        for (let i = 0; i < 7; i++) {
            let list = [];
            for (let j = 0; j < meetingList.length; j++) {
                if (meetingList[j].day == i) {
                    list.push(meetingList[j])
                }
            }
            newMeetings.push({
                meetingList: list,
            })
        }
        this.setState({
            meetingList: newMeetings
        })
    };
    addMeeting = (e) => {
        this.setState({
            move: false,
            isTopMove:false,
        })
        let className = e.target.className;
        let x = parseInt(e.target.getAttribute('x')), y = parseInt(e.target.getAttribute('y'));
        if (className.indexOf('ItemBox') != -1) {
            let eY = y + 8;
            let date = week[x].date;
            let startTime = timeTable[y].text;
            let endTime = timeTable[eY].text;
            var Top = y * 18 + 1;
            var height = 8 * 18 - 1;
            var data = {
                height: height,
                top: Top,
                date: date,
                x: x,
                style: { top: Top + 'px', height: height + 'px', left: (x * 135 + 1) + 'px' },
                startId: y,
                endId: eY,
                meetingName: "再次点击创建会议",
                length: 8,
                startTime: startTime,
                endTime: endTime
            }
        }
        this.setState({
            createMeeing: data

        })
    };
    createMeet = () => {
        console.log(this.state.createMeeing);
        alert('建会功能自己写')

    };
    //拖动鼠标开始
     touchStart = (e) => {
        this.setState({
            move: true,
        });
        meetingTouchStartY=e.clientY;
        meetingTouchIdSt=this.state.createMeeing.startId;

    };
    touchMove = (e) => {
        let self = this;
        if (self.state.move==true&&this.state.isTopMove==false) {
            console.log('.......');
            let y = e.clientY;
            let ny = y - meetingTouchStartY; //移动相对位移
            let nid = Math.floor(ny / 18); //移动的单元格个数
            let meeting = self.state.createMeeing;
            let top = meetingTouchIdSt*18 + ny; //top值
            let idSt = meetingTouchIdSt + nid;
            let idEnd = idSt + meeting.length;

            if (idSt < 0) {
                return;
            } else if (idEnd > 96) {
                return;
            };
            let startTime = timeTable[idSt].text;
            let endTime = timeTable[idEnd].text;
            let NewcreateMeet = {
                height: meeting.height,
                top: top,
                date: meeting.date,
                x: meeting.x,
                style: { top: top + 'px', height: meeting.height + 'px', left: (meeting.x * 135 + 1) + 'px' },
                startId: idSt,
                endId: idEnd,
                meetingName: "再次点击创建会议",
                length: meeting.length,
                startTime: startTime,
                endTime: endTime
            };
            self.setState({
                createMeeing: NewcreateMeet
            })
        };
    }
    touchEnd = (e) => {     
        this.setState({
            move: false
        })
        if(meetingTouchStartY==e.clientY){
            this.createMeet();
            return;
        }
        let meeting = this.state.createMeeing;
        let trueTop = meeting.startId *18+1;
        if (trueTop != meeting.top) {
            let NewcreateMeet = {
                height: meeting.height,
                top: trueTop,
                date: meeting.date,
                x: meeting.x,
                style: { top: trueTop + 'px', height: meeting.height + 'px', left: (meeting.x * 135 + 1) + 'px' },
                startId: meeting.startId,
                endId: meeting.endId,
                meetingName: "再次点击创建会议",
                length: meeting.length,
                startTime: meeting.startTime,
                endTime: meeting.endTime
            };
            this.setState({
                createMeeing: NewcreateMeet
            })
          }
    }
    topStart=(e)=>{
        e.stopPropagation();
        this.setState({
            isTopMove:true,
            topMove:{
                topId: this.state.createMeeing.startId,
                startY:e.clientY
            }
        })

    }
    topMove=(e)=>{
        e.stopPropagation();       
        if(this.state.isTopMove==false||this.state.move==true){
            return;
        }
        let meeting=this.state.createMeeing;
        let startY = this.state.topMove.startY;
        let topId = parseInt(this.state.topMove.topId);
        //移动会议方块
        let y = e.clientY;
        let nid = Math.floor((y - startY) / 18); //移动单元格个数

        let stId = topId + nid,
          endId = meeting.endId;
        let top = topId * 18 + (y - startY); //top值
        let height = (endId - topId) * 18 - (y - startY); //会议高度
        // if(height<0){
        //     top=meeting.startId*18;
        //     endId=stId;
        //     stId=meeting.endId;
        //     height=-height;
        // }
        let startTime = timeTable[stId].text;
        let endTime = timeTable[endId].text;

        let NewcreateMeet = {
            height: height,
            top: top,
            date: meeting.date,
            x: meeting.x,
            style: { top: top + 'px', height: height + 'px', left: (meeting.x * 135 + 1) + 'px' },
            startId: stId,
            endId: endId,
            meetingName: "再次点击创建会议",
            length: endId - topId,
            startTime: startTime,
            endTime: endTime
        };
        this.setState({
            createMeeing: NewcreateMeet
        })
        
    }
    topEnd=(e)=>{
        e.stopPropagation();
        if(this.state.isTopMove==false||this.state.move==true){
            return;
        }
        this.setState({
            isTopMove:false,
            topMove:{}
        })
        if(this.state.topMove.startY==e.clientY){
            return;
        }
        let meeting = this.state.createMeeing;
        let trueTop = meeting.startId *18+1;
        let height=(meeting.endId -meeting.startId)*18-1;
        if (trueTop != meeting.top) {
            let NewcreateMeet = {
                height: height,
                top: trueTop,
                date: meeting.date,
                x: meeting.x,
                style: { top: trueTop + 'px', height: height + 'px', left: (meeting.x * 135 + 1) + 'px' },
                startId: meeting.startId,
                endId: meeting.endId,
                meetingName: "再次点击创建会议",
                length: meeting.length,
                startTime: meeting.startTime,
                endTime: meeting.endTime
            };
            this.setState({
                createMeeing: NewcreateMeet
            })
          }
        
    }
    bottomStart=(e)=>{
        e.stopPropagation();
        this.setState({
            isBottomMove:true,
            bottomMove:{
                endId: this.state.createMeeing.endId,
                startY:e.clientY
            }
        })

    }
    bottomMove=(e)=>{
        e.stopPropagation();
        
        if(!this.state.isBottomMove||this.state.move==true){
            return;
        }
        let meeting=this.state.createMeeing;
        let startY = this.state.bottomMove.startY;
        let eId = parseInt(this.state.bottomMove.endId);
        //移动会议方块
        let y = e.clientY;
        let nid = Math.ceil((y - startY) / 18); //移动单元格个数
        let endId = eId +nid,
          startId = meeting.startId;
          let height = y - startY + (eId - startId) * 18;
        let endTime = timeTable[endId].text;

        let NewcreateMeet = {
            height: height,
            top: meeting.top,
            date: meeting.date,
            x: meeting.x,
            style: { top: meeting.top + 'px', height: height + 'px', left: (meeting.x * 135 + 1) + 'px' },
            startId: startId,
            endId: endId,
            meetingName: "再次点击创建会议",
            length: endId - startId,
            startTime: meeting.startTime,
            endTime: endTime
        };
        this.setState({
            createMeeing: NewcreateMeet
        })
        
    }
    bottomEnd=(e)=>{
        e.stopPropagation();
        if(!this.state.isBottomMove||this.state.move==true){
            return;
        }
        this.setState({
            isBottomMove:false,
            bottomMove:{}
        })
        if(this.state.bottomMove.startY==e.clientY){
            return;
        }
        let meeting = this.state.createMeeing;
        let trueHeight= meeting.length *18 -1;
        if (trueHeight != meeting.height) {
            let NewcreateMeet = {
                height: trueHeight,
                top: meeting.top,
                date: meeting.date,
                x: meeting.x,
                style: { top: meeting.top + 'px', height: trueHeight + 'px', left: (meeting.x * 135 + 1) + 'px' },
                startId: meeting.startId,
                endId: meeting.endId,
                meetingName: "再次点击创建会议",
                length: meeting.length,
                startTime: meeting.startTime,
                endTime: meeting.endTime
            };
            this.setState({
                createMeeing: NewcreateMeet
            })
          }
        
    }
};


function GetdayHeader() {
    let elements = [];
    var weekname = ["一", "二", "三", "四", "五", "六", "七"]
    var w = week;
    for (var i = 0; i < 7; i++) {
        // html += " <div class='HeaderBox'>" + week[i].dataName + "(星期" + weekname[i] + ")" + "</div>";
        elements.push(<div className={styles.headerBox} key={"header" + i}> {w[i].date.substring(5) + "(星期" + weekname[i] + ")"}  </div>)
    }
    return (elements);
}
//获取作左边的时间表
function GetLeftTime() {
    let elements = [];
    timeTable = [];
    for (var i = 0; i < 96; i++) {
        let timeText = i / 4 < 10 ? '0' + Math.floor(i / 4) : Math.floor(i / 4);
        timeText += ":";
        if (i % 4 === 0) {
            timeText = timeText + '00';
            elements.push(<div className={styles.leftHourItem} key={'left' + i}> {timeText} </div>)
        } else {
            timeText = timeText + i % 4 * 15;
            elements.push(<div className={styles.leftItem} key={'left' + i}>{timeText} </div>)
        }
        timeTable.push({ text: timeText, y: i })
    }
    return (elements);
}

//渲染一天的时间表格
function DomOneDayItem(props) {
    let row = props.row;
    let elements = [];
    for (var i = 0; i < 96; i++) {
        if (i > 0 && (i) % 4 === 0) {
            elements.push(<div className={[styles.ItemBox, styles.hourBoder].join(' ')} y={i} x={row} key={row + ':' + i}></div>)
        } else {
            elements.push(<div className={styles.ItemBox} y={i} x={row} key={row + ':' + i}></div>)
        }
    }
    return (
        elements
    );
}
//单条会议情况渲染
function DomMeetingItem(props) {
    let data = props.data;
    var time = data.startTime;
    time = parseInt(time.substring(0, 2)) * 4 + parseInt(time.substring(3) / 15);
    var Top = time * 18 + 1;
    var height = data.timeLen / 15 * 18 - 1;
    // var heightText = { height: (height - 6) + 'px' };
    var isred = "";
    isred = data.red == true ? styles.meetingRed : styles.meetingGreen;
    return (
        <div className={[styles.meetingItemBox, isred].join(' ')} style={{ top: Top + 'px', height: height + 'px' }}>
            <div className={styles.leftSpan}></div>
            <div className={styles.rightSpan} >
                <div>{data.meetingName} </div>
                <div>{data.startTime}</div>
                <div>罗晓</div>
            </div>
        </div>
    )
};
//获取今天的时间线
function GetToday() {
    var now = new Date();
    var hour = now.getHours();
    var min = now.getMinutes();
    var allMin = hour * 60 + min;
    var nowTime = allMin * 72 / 60;
    return (
        <div className={styles.todayTime} style={{ top: nowTime + 'px' }}>
            <div className={styles.todayHeader}></div>
            <div className={styles.timeLine}></div>
        </div>
    )
};

function getWeek() {
    var currentDate = new Date();
    var timesStamp = currentDate.getTime();
    var currenDay = currentDate.getDay();
    var dates = [];
    for (var i = 0; i < 7; i++) {
        let timeDate = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString().replace(/\//g, '-').split("-");
        let time = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7));
        let hour = ('00' + (time.getMonth() + 1)).slice(-2);
        let day = ('00' + time.getDate()).slice(-2);
        dates.push({ date: time.getFullYear() + '-' + hour + '-' + day, day: i })

    }
    week = dates;
}




export default App;