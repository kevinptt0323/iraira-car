import React, { PropTypes }  from 'react';
import { Stage, Layer, Group, Rect, Line } from 'react-konva';

import { Block, Goal, VirtualCursor } from './objects'

const config = {
  bgcolor: "#000"
};

class Gameboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cursorX: 0,
      cursorY: 0
    };

    this.handleBlock = this.handleBlock.bind(this);
    this.handleGoal = this.handleGoal.bind(this);
    this.handleLockChange = this.handleLockChange.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }
  handleBlock() {
    const { increaseScore } = this.context;
    increaseScore(-10);
  }
  handleGoal() {
    const { increaseScore } = this.context;
    increaseScore(100);
  }
  handleMouseMove(e) {
    const { width, height } = this.props;
    let { cursorX, cursorY } = this.state;
    let { startX, startY } = this.props.stageData;
    cursorX += e.movementX;
    cursorY += e.movementY;
    if (cursorX<0) cursorX = 0;
    if (cursorX>=width) cursorX = width-1;
    if (cursorY<0) cursorY = 0;
    if (cursorY>=height) cursorY = height-1;
    const curr = {x: cursorX, y: cursorY};
    if (this.refs.blocks.getIntersection(curr)) {
      [cursorX, cursorY] = [startX, startY];
      this.handleBlock();
    } else if (this.refs.goals.getIntersection(curr)) {
      [cursorX, cursorY] = [startX, startY];
      this.handleGoal();
    }
    this.setState({cursorX, cursorY});
  }
  handleLockChange() {
    const canvas = this.refs.mainCanvas.getLayer().getCanvas()._canvas;
    if (document.pointerLockElement === canvas) {
      document.addEventListener("mousemove", this.handleMouseMove, false);
    } else {
      document.removeEventListener("mousemove", this.handleMouseMove, false);
    }
  }
  componentDidMount() {
    const canvas = this.refs.mainCanvas.getLayer().getCanvas()._canvas;
    canvas.addEventListener('click', (e) => {e.target.requestPointerLock();}, false);
    document.addEventListener('pointerlockchange', this.handleLockChange, false);
  }
  componentWillUnmount() {
    document.exitPointerLock();
  }
  render() {
    const {
      style = {},
      width,
      height,
      stageData,
      stageLoaded
    } = this.props;
    return (
      <Stage {...{width, height, style}}>
        <Layer>
          <Rect
            x={0} y={0}
            width={width} height={height}
            fill={config.bgcolor} />
        </Layer>
        <Layer ref="blocks">
          {stageLoaded ? stageData.blocks.map((points, idx) =>
            <Block key={`block-${idx}`} points={points} />
          ) : null}
        </Layer>
        <Layer ref="goals">
          {stageLoaded ? stageData.goals.map((points, idx) =>
            <Goal key={`goal-${idx}`} points={points} />
          ) : null}
        </Layer>
        <Layer ref="mainCanvas">
          <VirtualCursor x={this.state.cursorX} y={this.state.cursorY} radius={5} />
        </Layer>
      </Stage>
    );
  }
}

Gameboard.contextTypes = {
  increaseScore: PropTypes.func.isRequired
};

export default Gameboard;
