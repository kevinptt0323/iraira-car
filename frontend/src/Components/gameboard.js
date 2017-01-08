import React, { PropTypes }  from 'react';
import { Stage, Layer, Rect, Line } from 'react-konva';

import { Block, Goal } from './objects'

const config = {
  bgcolor: "#000"
};

class Gameboard extends React.Component {
  constructor(props) {
    super(props);

    this.handleBlock = this.handleBlock.bind(this);
    this.handleGoal = this.handleGoal.bind(this);
  }
  handleBlock() {
    const { increaseScore } = this.context;
    increaseScore(-10);
  }
  handleGoal() {
    const { increaseScore } = this.context;
    increaseScore(100);
  }
  render() {
    const {
      style = {},
      width,
      height,
    } = this.props;
    return (
      <Stage {...{width, height, style}}>
        <Layer>
          <Rect
            x={0} y={0}
            width={width} height={height}
            fill={config.bgcolor} />
        </Layer>
        <Layer>
          <Block points={[0, 0, 800, 0, 800, 300, 300, 300, 300, 100, 0, 100]} onmouseover={this.handleBlock} />
          <Block points={[0, 600, 800, 600, 800, 350, 250, 350, 250, 150, 0, 150]} onmouseover={this.handleBlock} />
          <Goal points={[750, 300, 800, 300, 800, 350, 750, 350]} onmouseover={this.handleGoal} />
        </Layer>
      </Stage>
    );
  }
}

Gameboard.contextTypes = {
  increaseScore: PropTypes.func.isRequired
};

export default Gameboard;
