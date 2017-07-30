import * as React from 'react';
import GeometricDeckGenerator from './GeometricDeckGenerator';

const BORDER = 3;
const HEIGHT = (250 - (BORDER * 2));
const WIDTH = (100 - (BORDER * 2));

const DECK_DATA: DeckData = {
  shapes: [
    {
      name: 'oval',
      shape: (
        <rect
          x={BORDER}
          y={BORDER}
          width={WIDTH}
          height={HEIGHT}
          rx={WIDTH / 2}
          ry={WIDTH / 2}
        />
      ),
      fillScale: null,
      strokeScale: 1,
      height: HEIGHT,
      width: WIDTH,
      border: BORDER,
    },
    {
      name: 'diamond',
      shape: (
        <polygon
          points={`
            0,${HEIGHT / 2}
            ${WIDTH / 2},0
            ${WIDTH},${HEIGHT / 2}
            ${WIDTH / 2},${HEIGHT}
          `}
        />
      ),
      fillScale: null,
      strokeScale: 1,
      height: HEIGHT,
      width: WIDTH,
      border: BORDER,
    },
    {
      name: 'squiggle',
      shape: (
        <g transform="translate(-45, -10) scale(.07437774524)">
          <path
            d={`
              M955 3530 c-121 -24 -218 -83 -272 -164 -42 -61 -57 -115 -58 -196 0
              -80 31 -149 132 -290 141 -196 166 -251 182 -391 11 -98 -1 -251 -29 -359 -11
              -41 -60 -194 -109 -340 -181 -537 -210 -760 -135 -1029 83 -298 259 -485 524
              -555 241 -65 475 -56 645 23 107 51 175 114 220 204 80 162 60 228 -140 477
              -131 163 -170 225 -195 309 -20 65 -22 88 -17 190 7 137 17 176 137 523 148
              426 188 624 169 833 -29 309 -244 590 -544 710 -137 55 -380 81 -510 55z
            `}
          />
        </g>
      ),
      fillScale: 18,
      strokeScale: 18,
      height: HEIGHT,
      width: WIDTH,
      border: BORDER + 3,
    },
  ],
  colors: ['red', 'green', 'purple'],
  shadings: ['solid', 'striped', 'none'],
  numbers: [1, 2, 3]
};

const generator = new GeometricDeckGenerator(DECK_DATA);
generator.exportDeck();
