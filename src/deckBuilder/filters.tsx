import * as React from 'react';
import GeometricDeckGenerator from './GeometricDeckGenerator';

const BORDER = 3;
const HEIGHT = (250 - (BORDER * 2));
const WIDTH = (90 - (BORDER * 2));

function crinkle(shape: Shape, color: string, _scale: number | null) {
  return (
    <g style={{filter: `url(#turbuMap)`, fill: color}}>
      <defs>
        <filter id="turbuMap">
          <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="2" result="turbulence" data-filterId="3"/>
          <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" in2="turbulence" scale="100"/>
        </filter>
      </defs>
      {shape}
    </g>
  );
}

function blur(shape: Shape, color: string, _scale: number | null) {
  return (
    <g style={{filter: `url(#blurMe)`, fill: color}}>
      <defs>
        <filter id="blurMe">
         <feGaussianBlur in="SourceGraphic" stdDeviation="10"/>
        </filter>
      </defs>
      {shape}
    </g>
  );
}

function ink(shape: Shape, color: string, scale: number | null) {
  return (
    <g style={{filter: `url(#displacementFilter)`, fill: color}}>
      <defs>
        <filter id="displacementFilter">
          <feTurbulence type="turbulence" baseFrequency="0.1" numOctaves="2" result="turbulence"/>
          <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="40" xChannelSelector="R" yChannelSelector="G"/>
        </filter>
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
            ${WIDTH},${HEIGHT / 2}
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
  colors: ['#67fce9', '#009688', '#00443c'],
  shadings: [crinkle, ink, blur],
  numbers: [1, 2, 3]
};

const generator = new GeometricDeckGenerator(DECK_DATA);
generator.exportDeck('public/decks/filters/');
