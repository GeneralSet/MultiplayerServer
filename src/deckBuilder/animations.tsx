import * as React from 'react';
import GeometricDeckGenerator from './GeometricDeckGenerator';

const BORDER = 3;
const HEIGHT = (250 - (BORDER * 2));
const WIDTH = (100 - (BORDER * 2));

function open(shape: JSX.Element, _color: string, _scale: number | null) {
  return (
    <g style={{fill: 'transparent'}}>
      {shape}
    </g>
  );
}

function triangles(shape: JSX.Element, color: string, scale: number | null) {
  return (
    <g style={{fill: `url(#pattern)`}}>
      <defs>
        <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <polygon points="15,10 25,10 20,20"/>
        </pattern>
      </defs>
      {shape}
    </g>
  );
}

function striped(shape: JSX.Element, color: string, scale: number | null) {
  return (
    <g style={{fill: `url(#pattern)`}}>
      <pattern
        id={`pattern`}
        width="8"
        height="10"
        patternUnits="userSpaceOnUse"
        patternTransform={`rotate(90) ${scale ? `scale(${scale})` : ''}`}
      >
        <line stroke={color} strokeWidth="5px" y2="15"/>
      </pattern>
      {shape}
    </g>
  );
}

const DECK_DATA: DeckData = {
  shapes: [
    {
      name: 'scale',
      shape: (
        <rect
          x={BORDER}
          y={BORDER}
          width={WIDTH}
          height={HEIGHT}
          rx={WIDTH / 2}
          ry={WIDTH / 2}
        >
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="scale"
            values="1,1; 0.5,0.5; 1,1"
            begin="0s"
            dur="3s"
            repeatCount="indefinite"
          />
        </rect>
      ) as JSX.Element,
      fillScale: 2,
      strokeScale: 2,
      height: HEIGHT,
      width: WIDTH,
      border: BORDER,
    },
    {
      name: 'diamond',
      shape: (
        <rect
          x={BORDER}
          y={BORDER}
          width={WIDTH}
          height={HEIGHT}
          rx={WIDTH / 2}
          ry={WIDTH / 2}
        >
          <animate
            attributeName="height"
            attributeType="XML"
            values={`80;${HEIGHT};80`}
            begin="0s"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            attributeType="XML"
            values={`${HEIGHT / 2}; 5; ${HEIGHT / 2}`}
            begin="0s"
            dur="3s"
            repeatCount="indefinite"
          />
        </rect>
      ) as JSX.Element,

      fillScale: 2,
      strokeScale: 2,
      height: HEIGHT,
      width: WIDTH,
      border: BORDER,
    },
    {
      name: 'fade',
      shape: (
        <rect
          x={BORDER}
          y={BORDER}
          width={WIDTH}
          height={HEIGHT}
          rx={WIDTH / 2}
          ry={WIDTH / 2}
        >
          <animate
            attributeName="opacity"
            attributeType="XML"
            values="1; .2; 1"
            begin="0s"
            dur="3s"
            repeatCount="indefinite"
          />
        </rect>
      ) as JSX.Element,
      fillScale: 2,
      strokeScale: 2,
      height: HEIGHT,
      width: WIDTH,
      border: BORDER + 3,
    },
  ],
  colors: ['red', 'green', 'purple'],
  shadings: [open, striped, triangles],
  numbers: [1, 2, 3]
};

const generator = new GeometricDeckGenerator(DECK_DATA);
generator.exportDeck('public/decks/animations/');
