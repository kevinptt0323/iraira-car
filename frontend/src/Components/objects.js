import React from 'react';
import { Line } from 'react-konva';

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
