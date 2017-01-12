import React, { PropTypes }  from 'react';
import request from 'superagent';

import Gameboard from './Components/gameboard';
import Player from './Components/player';
import Scoreboard from './Components/scoreboard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: 'kevinptt',
      score: 0,
      stage: 1,
      stageData: {},
      stageLoaded: false
    };

    this.increaseScore = this.increaseScore.bind(this);
    this.loadStage(this.state.stage).then((res) => {
      this.setState({stageData: res.body, stageLoaded: true}, () => {
        this.refs.gameboard.setState({cursorX: res.body.startX, cursorY: res.body.startY});
      });
    });
  }
  getChildContext() {
    const { increaseScore } = this;
    return {
      increaseScore
    };
  }
  increaseScore(delta) {
    this.setState({score: this.state.score+delta});
  }
  loadStage(stage) {
    let req = request.get(`/stages/${stage}.json`);
    return req;
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
    const { state } = this;
    return (
      <div style={style}>
        <div className="gameboard">
          <Gameboard ref="gameboard"
            width={800}
            height={600}
            style={stageStyle}
            stage={state.stage}
            stageData={state.stageData}
            stageLoaded={state.stageLoaded}
            />
        </div>
        <div className="navbar">
          <Player player={this.state.player} />
          <Scoreboard score={this.state.score} />
        </div>
      </div>
    );
  }
}

App.childContextTypes = {
  increaseScore: PropTypes.func
};

export default App;
