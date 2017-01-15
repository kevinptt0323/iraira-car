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

const stateToSpring = (object, config={}) => (
  Object.keys(object).reduce((obj, key) => {
    obj[key] = spring(object[key], config);
    return obj;
  }, {})
);

export const MotionBlock = ({from, to, config, alternate=true, children, ...props}) => (
  <MotionLoop
    styleFrom={alternate?stateToSpring(from, config):from}
    styleTo={stateToSpring(to, config)}
    {...props}
    >
    {interpolatingStyles => React.cloneElement(children, {...props, ...interpolatingStyles})}
  </MotionLoop>
);

export const VirtualCursor = ({x, y, ...props}) => (
  <Circle
    x={x}
    y={y}
    radius={1}
    fill="blue"
    strokeWidth={0}
    {...props}
    />
);
