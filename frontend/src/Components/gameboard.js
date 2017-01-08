import React from 'react';
import { Stage, Layer, Rect } from 'react-konva';

const config = {
  bgcolor: "#000"
};

class Gameboard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      containerStyle = {},
      stageStyle = {},
      stageWidth,
      stageHeight,
    } = this.props;
    return (
      <div style={containerStyle}>
        <Stage width={stageWidth} height={stageHeight} style={stageStyle}>
          <Layer>
            <Rect
              x={0} y={0}
              width={stageWidth} height={stageHeight}
              fill={config.bgcolor} />
          </Layer>
          <Layer>
            <Rect
              x={10} y={10}
              width={50} height={50}
              fill={"#ff0"}
              shadowBlur={10} />
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default Gameboard;
