import React from 'react';

import Player from './player';

class Landing extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { player, handleChange, handleClick } = this.props;
    return (
      <div className="landing-page">
        <h1>IraIra Online</h1>
        <Player player={player} handleChange={handleChange} />
        <div className="enter" onClick={handleClick}>Enter</div>
      </div>
    );
  }
}

export default Landing;


