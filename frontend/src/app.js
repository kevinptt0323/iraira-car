import React from 'react';

import Gameboard from './Components/gameboard';
import Player from './Components/player';
import Scoreboard from './Components/scoreboard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: 'kevinptt',
      score: 7122
    };
  }
  render() {
    const style = {
      backgroundColor: 'black',
      height: '100%',
      width: '100%'
    };
    const stageStyle = {
      border: '1px solid #fff',
    };
    return (
      <div style={style}>
        <div className="gameboard">
          <Gameboard
            width={800}
            height={600}
            style={stageStyle} />
        </div>
        <div className="navbar">
          <Player player={this.state.player} />
          <Scoreboard score={this.state.score} />
        </div>
      </div>
    );
  }
}

export default App;
