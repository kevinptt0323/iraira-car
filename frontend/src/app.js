import React, { PropTypes }  from 'react';
import request from 'superagent';
import socket from 'socket.io-client';

import Gameboard from './Components/gameboard';
import Landing from './Components/landing';
import Player from './Components/player';
import Scoreboard from './Components/scoreboard';

const defaultStage = 0;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      landing: true,
      player: 'Player ' + (((Math.random()*9)|0)+1),
      score: 0,
      stage: defaultStage,
      stageData: {},
      stageLoaded: false,
      positions: {}
    };

    this.enterGame = this.enterGame.bind(this);
    this.increaseScore = this.increaseScore.bind(this);
    this.nextStage = this.nextStage.bind(this);
    this.changePlayer = this.changePlayer.bind(this);
    this.ioEmit = this.ioEmit.bind(this);

    this.io = socket('/');
    this.listenIO();
  }
  getChildContext() {
    const { increaseScore, nextStage, ioEmit } = this;
    return {
      increaseScore,
      nextStage,
      ioEmit,
    };
  }
  listenIO() {
    const { io } = this;
    io.on('connect', () => { });
    io.on('position', (data) => {
      if (data.player != this.state.player) {
        this.setState({positions: {...this.state.positions, [data.player]: data}});
      }
    });
  }
  ioEmit(event, message) {
    this.io.emit(event, { player: this.state.player, ...message });
  }
  enterGame() {
    this.setState({landing: false});
    this.ioEmit('join');
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
  changePlayer(e) {
    this.setState({player: e.target.value});
  }
  componentWillMount() {
    this.nextStage(this.state.stage);
  }
  componentWillUnmount() {
    this.ioEmit('leave');
    this.io.disconnect();
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
          {state.landing ? (
            <Landing player={this.state.player} handleChange={this.changePlayer} handleClick={this.enterGame}/>
          ):(
            <Gameboard ref="gameboard"
              width={800}
              height={600}
              style={stageStyle}
              stage={state.stage}
              stageData={state.stageData}
              stageLoaded={state.stageLoaded}
              positions={state.positions}
              />
          )}
        </div>
        <div className="navbar">
          <Player player={this.state.player} handleChange={this.changePlayer} />
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
  ioEmit: PropTypes.func,
};

export default App;
