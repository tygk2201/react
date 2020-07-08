import React from 'react';

import WeekTable from './weekTable'

class App extends React.Component {
    render() {
        return (
            <div className="rightBox">
                <WeekTable></WeekTable>
                
        </div>
        );
    };
    componentWillUnmount() {
        this.isMount === false
    }
}

export default App;