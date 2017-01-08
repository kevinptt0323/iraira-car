import React from 'react';

import Gameboard from './Components/gameboard';
import Scoreboard from './Components/scoreboard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 7122
    };
  }
  render() {
    const style = {
      backgroundColor: 'black',
      height: '100%',
      width: '100%'
    };
    const containerStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%'
    };
    const stageStyle = {
      border: '1px solid #fff',
    };
    return (
      <div style={style}>
        <Gameboard
          stageWidth={800}
          stageHeight={600}
          {...{stageStyle, containerStyle}} />
        <Scoreboard score={this.state.score} />
      </div>
    );
  }
}

export default App;
