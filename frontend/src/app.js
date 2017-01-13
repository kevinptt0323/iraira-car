import React, { PropTypes }  from 'react';
import request from 'superagent';

import Gameboard from './Components/gameboard';
import Player from './Components/player';
import Scoreboard from './Components/scoreboard';

const defaultStage = 1;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: 'kevinptt',
      score: 0,
      stage: defaultStage,
      stageData: {},
      stageLoaded: false
    };

    this.increaseScore = this.increaseScore.bind(this);
    this.nextStage = this.nextStage.bind(this);
  }
  getChildContext() {
    const { increaseScore, nextStage } = this;
    return {
      increaseScore,
      nextStage,
    };
  }
  componentWillMount() {
    this.nextStage(this.state.stage);
  }
  increaseScore(delta) {
    this.setState({score: this.state.score+delta});
  }
  nextStage(stage = this.state.stage+1) {
    this.setState({stageLoaded: false}, () => {
      request
        .get(`/stages/${stage}.json`)
        .then((res) => {
          this.setState({stage, stageData: res.body, stageLoaded: true}, () => {
            this.refs.gameboard.setState({cursorX: res.body.startX, cursorY: res.body.startY});
          });
        })
        .catch((err) => {
          if (stage!=defaultStage) {
            this.nextStage(defaultStage);
          } else {
            console.log(`Can't load /stages/${stage}.json`);
          }
        });
    });
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
          <div className="stage"> Stage {state.stage} </div>
          <Scoreboard score={this.state.score} />
        </div>
      </div>
    );
  }
}

App.childContextTypes = {
  increaseScore: PropTypes.func,
  nextStage: PropTypes.func,
};

export default App;
