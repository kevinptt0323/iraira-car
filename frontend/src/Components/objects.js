import React from 'react';
import { Motion, StaggeredMotion, TransitionMotion, spring } from 'react-motion';
import { Line, Circle } from 'react-konva';
import { ReactMotionLoop as MotionLoop } from 'react-motion-loop';

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

const stateToSpring = (object) => (
  Object.keys(object).reduce((obj, key) => {
    obj[key] = spring(object[key]);
    return obj;
  }, {})
);

export const MovingBlock = ({points, onmouseover, from, to}) => (
  <MotionLoop
    styleFrom={stateToSpring(from)}
    styleTo={stateToSpring(to)}
    >
    {interpolatingStyles => (
      <Line ref="object"
        points={points}
        fill="white"
        strokeWidth={0}
        closed={true}
        onmouseover={onmouseover}
        {...interpolatingStyles}
        />
    )}
  </MotionLoop>
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
