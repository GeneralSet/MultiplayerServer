var fs = require('fs');
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

const SYMBOL_GAP = 20;
const SYMBOL_BORDER = 3;
const SYMBOL_HEIGHT = (250 - (SYMBOL_BORDER * 2));
const SYMBOL_WIDTH = (100 - (SYMBOL_BORDER * 2));

function addStrokeStyle(shape: Shape, color: string, scale: number) {
  const style = {
    stroke: color,
    strokeWidth: 3 * scale,
  };
  return (
    <g style={style}>
      {shape}
    </g>
  );
}

function addFillStyle(shape: Shape, color: string, shading: string, scale: number | null) {
  let style: {fill: string};
  let defs: JSX.Element | null = null;

  if (shading === 'solid') {
    style = {fill: color};
  } else if (shading === 'striped') {
    const id = 10;
    defs = (
      <pattern
        id={`pattern${id}`}
        width="8"
        height="10"
        patternUnits="userSpaceOnUse"
        patternTransform={`rotate(90) ${scale ? `scale(${scale})` : ''}`}
      >
        <line stroke={color} strokeWidth="5px" y2="15"/>
      </pattern>
    );
    style = {fill: `url(#pattern${id})`};
  } else {
    style = {fill: 'transparent'};
  }
  return (
    <g style={style}>
      {defs}
      {shape}
    </g>
  );
}

function listSymbols(symbol: JSX.Element, length: number): JSX.Element[] {
  const symbolList: JSX.Element[] = [];
  for (let i = 0; i < length; i++) {
    symbolList.push(
      <g
        transform={`translate(${i * (SYMBOL_WIDTH + SYMBOL_GAP)})`}
        key={i}
      >
        {symbol}
      </g>
    );
  }
  return symbolList;
}

function symbolsToSVG(
  shapes: JSX.Element[],
  scale: number | null,
  borderWidth: number,
): JSX.Element {
  const numShapes: number = shapes.length;
  return (
    <svg
      width={((numShapes * (SYMBOL_WIDTH + SYMBOL_GAP ))) + (borderWidth * numShapes)}
      height={SYMBOL_HEIGHT + (borderWidth * 2)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {shapes}
    </svg>
  );
}

function createSvg(
  color: string,
  shading: string,
  shape: SvgData,
  num: number,
  filename: string
) {
  const shapePattern = addFillStyle(shape.shape, color, shading, shape.fillScale);
  const shapePatternColor = addStrokeStyle(shapePattern, color, shape.strokeScale);
  const shapes: JSX.Element[] = listSymbols(shapePatternColor, num);
  const symbol = symbolsToSVG(shapes, shape.fillScale, (SYMBOL_BORDER + 3));
  var svg = ReactDOMServer.renderToStaticMarkup(symbol);
  fs.writeFile(`public/decks/original/${filename}.svg`, svg, () => null);
}

const DECK_DATA: DeckData = {
  shapes: [
    {
      name: 'oval',
      shape: (
        <rect
          x={SYMBOL_BORDER}
          y={SYMBOL_BORDER}
          width={SYMBOL_WIDTH}
          height={SYMBOL_HEIGHT}
          rx={SYMBOL_WIDTH / 2}
          ry={SYMBOL_WIDTH / 2}
        />
      ),
      fillScale: null,
      strokeScale: 1,
    },
    {
      name: 'diamond',
      shape: (
        <polygon
          points={`
            0,${SYMBOL_HEIGHT / 2}
            ${SYMBOL_WIDTH / 2},0
            ${SYMBOL_WIDTH},${SYMBOL_HEIGHT / 2}
            ${SYMBOL_WIDTH / 2},${SYMBOL_HEIGHT}
          `}
        />
      ),
      fillScale: null,
      strokeScale: 1,
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
    },
  ],
  colors: ['red', 'green', 'purple'],
  shadings: ['solid', 'striped', 'none'],
  numbers: [1, 2, 3]
};

const attributes = [
  ['red', 'green', 'purple'],
  ['solid', 'striped', 'none'],
  ['oval', 'squiggle', 'diamond'],
  [1, 2, 3],
];

for (let i = 0; i < attributes[0].length; i++) {
  for (let j = 0; j < attributes[1].length; j++) {
    for (let k = 0; k < attributes[2].length; k++) {
      for (let l = 0; l < attributes[3].length; l++) {
        createSvg(
          DECK_DATA.colors[i],
          DECK_DATA.shadings[j],
          DECK_DATA.shapes[k],
          DECK_DATA.numbers[l],
          `${i}_${j}_${k}_${l}`
        );
      }
    }
  }
}
