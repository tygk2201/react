import React from 'react';
import canvasTest from '../canvas/index.html'


class App extends React.Component {
    constructor(props){
        super(props)
        this.draw=this.draw.bind(this)
    };
    draw(){
        let canvas = document.getElementById("test1");
        let context = canvas.getContext('2d');
        context.arc(195,150,70,0,2*Math.PI);
        context.stroke();        

    };
    render() {
        return (
            <div className="rightBox">
               
                <iframe 
                title="resg"
                srcDoc={canvasTest}
                style={{ width: '100%', border: '0px', height: '500px' }}
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                scrolling="auto"
                />
                 <canvas id="test1" width="450px" height="350px"></canvas>
            </div>
        );
    };
    componentDidMount(){
        this.draw();
    };
    componentWillUnmount(){
        this.draw();
    };
}

export default App;