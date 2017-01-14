import React from 'react';
import { Motion, StaggeredMotion, TransitionMotion, spring } from 'react-motion';
import { Line, Circle } from 'react-konva';
import { ReactMotionLoop as MotionLoop } from 'react-motion-loop';

export const Block = (props) => (
  <Line
    fill="white"
    strokeWidth={0}
    closed={true}
    {...props}
    />
);

export const Goal = (props) => (
  <Line
    fill="red"
    strokeWidth={0}
    closed={true}
    {...props}
    />
);

const stateToSpring = (object) => (
  Object.keys(object).reduce((obj, key) => {
    obj[key] = spring(object[key]);
    return obj;
  }, {})
);

export const MotionBlock = ({from, to, alternate=true, children, ...props}) => (
  <MotionLoop
    styleFrom={alternate?stateToSpring(from):from}
    styleTo={stateToSpring(to)}
    {...props}
    >
    {interpolatingStyles => React.cloneElement(children, {...props, ...interpolatingStyles})}
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
