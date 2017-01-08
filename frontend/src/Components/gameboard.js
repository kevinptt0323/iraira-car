import React from 'react';
import { Stage, Layer, Rect, Line } from 'react-konva';

const config = {
  bgcolor: "#000"
};

class Gameboard extends React.Component {
  constructor(props) {
    super(props);
  }
  handlemouseover() {
    alert("GGG");
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
          <Rect
            x={10} y={10}
            width={50} height={50}
            fill={"#ff0"}
            shadowBlur={10}
            />
          <Line
            points={[0, 0, 800, 0, 800, 300, 300, 300, 300, 100, 0, 100]}
            stroke="white"
            fill="white"
            closed={true}
            onmouseover={this.handlemouseover}
            />
          <Line
            points={[0, 600, 800, 600, 800, 350, 250, 350, 250, 150, 0, 150]}
            stroke="white"
            fill="white"
            closed={true}
            onmouseover={this.handlemouseover}
            />
          <Line
            points={[750, 300, 800, 300, 800, 350, 750, 350]}
            stroke="white"
            fill="red"
            closed={true}
            onmouseover={this.handlemouseover}
            />
        </Layer>
      </Stage>
    );
  }
}

export default Gameboard;
