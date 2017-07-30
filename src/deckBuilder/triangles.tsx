import * as React from 'react';
import GeometricDeckGenerator from './GeometricDeckGenerator';

const BORDER = 3;
const HEIGHT = (250 - (BORDER * 2));
const WIDTH = (100 - (BORDER * 2));

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
  shadings: ['solid', 'striped', 'none'],
  numbers: [1, 3, 5]
};

const generator = new GeometricDeckGenerator(DECK_DATA);
generator.exportDeck('public/decks/triangles/');
