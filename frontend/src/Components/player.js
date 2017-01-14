import React from 'react';

class Player extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { player, handleChange } = this.props;
    return (
      <div className="player">
        <input type="text" value={player} onChange={handleChange} />
      </div>
    );
  }
}

export default Player;

