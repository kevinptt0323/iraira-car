import React from 'react';

import Scoreboard from './Components/scoreboard';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Scoreboard score="123" />
      </div>
    );
  }
}

export default App;
