import React from 'react';
import { Line, Circle } from 'react-konva';

export const Block = ({points, onmouseover}) => (
  <Line
    points={points}
    fill="white"
    strokeWidth={0}
    closed={true}
    onmouseover={onmouseover}
    />
);

export const Goal = ({points, onmouseover}) => (
  <Line
    points={points}
    fill="red"
    strokeWidth={0}
    closed={true}
    onmouseover={onmouseover}
    />
);

export const VirtualCursor = ({x, y, radius=1}) => (
  <Circle
    x={x}
    y={y}
    radius={radius}
    fill="blue"
    strokeWidth={0}
    />
);
