import React from 'react';

import Gameboard from './Components/gameboard';
import Scoreboard from './Components/scoreboard';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Gameboard />
        <Scoreboard score="123" />
      </div>
    );
  }
}

export default App;
