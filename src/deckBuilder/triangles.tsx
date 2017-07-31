import * as React from 'react';
import GeometricDeckGenerator from './GeometricDeckGenerator';

const BORDER = 3;
const HEIGHT = (250 - (BORDER * 2));
const WIDTH = (100 - (BORDER * 2));

function open(shape: Shape, _color: string, _scale: number | null) {
  return (
    <g style={{fill: 'transparent'}}>
      {shape}
    </g>
  );
}

function gradient(shape: Shape, color: string, _scale: number | null) {
  return (
    <g style={{fill: `url(#Gradient2)`}}>
      <defs>
        <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color}/>
          <stop offset="100%" stopColor="#fff"/>
        </linearGradient>
      </defs>
      {shape}
    </g>
  );
}

function triangles(shape: Shape, color: string, scale: number | null) {
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

const DECK_DATA: DeckData = {
  shapes: [
    {
      name: 'rightSideUp',
      shape: (
        <polygon
          points={`
            0,0
            ${WIDTH},0
            ${WIDTH / 2},${HEIGHT}
          `}
        />
      ),
      fillScale: 4,
      strokeScale: 3,
      height: HEIGHT,
      width: WIDTH,
      border: BORDER,
    },
    {
      name: 'right',
      shape: (
        <polygon
          points={`
            0,0
            ${WIDTH},0
            0,${HEIGHT}
          `}
        />
      ),
      fillScale: 4,
      strokeScale: 3,
      height: HEIGHT,
      width: WIDTH,
      border: BORDER,
    },
    {
      name: 'upsideDown',
      shape: (
        <polygon
          points={`
            0,${HEIGHT}
            ${WIDTH},${HEIGHT}
            ${WIDTH / 2},0
          `}
        />
      ),
      fillScale: 4,
      strokeScale: 3,
      height: HEIGHT,
      width: WIDTH,
      border: BORDER,
    },
  ],
  colors: ['#ED254E', '#F9DC5C', '#011936'],
  shadings: [open, triangles, gradient],
  numbers: [1, 3, 5]
};

const generator = new GeometricDeckGenerator(DECK_DATA);
generator.exportDeck('public/decks/triangles/');
