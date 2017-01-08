import React from 'react';

const Scoreboard = (props) => (
  <div className="scoreboard">
    <p>score</p>
    <p>{props.score}</p>
  </div>
);

export default Scoreboard;
