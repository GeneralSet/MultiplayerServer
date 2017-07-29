var fs = require('fs');
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

// TODO: should be able to remove id

const symbolGap = 20;
const symbolBorder = 3;
const symbolHeight = (250 - (symbolBorder * 2));
const symbolWidth = (100 - (symbolBorder * 2));

function symbolStyle(id: number, color: string, shading: string, scale: number) {
  if (shading === 'solid') {
    return {
      fill: color,
      strokeWidth: 3 * scale,
      stroke: color,
    };
  } else if (shading === 'partial') {
    return {
      fill: `url(#pattern${id})`,
      strokeWidth: 3 * scale,
      stroke: color,
    };
  } else {
    return {
      strokeWidth: 3 * scale,
      stroke: color,
      fill: 'transparent'
    };
  }
}

function stripedPattern(id: number, color: string, scale: number | null): JSX.Element {
  return (
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
}

function listSymbols(symbol: JSX.Element, length: number): JSX.Element[] {
  const symbolList: JSX.Element[] = [];
  for (let i = 0; i < length; i++) {
    symbolList.push(
      <g
        transform={`translate(${i * (symbolWidth + symbolGap)})`}
        key={i}
      >
        {symbol}
      </g>
    );
  }
  return symbolList;
}

function symbolsToSVG(shapes: JSX.Element[], scale: number | null, borderWidth: number, pattern: JSX.Element): JSX.Element {
  const numShapes: number = shapes.length;
  return (
    <svg
      width={((numShapes * (symbolWidth + symbolGap ))) + (borderWidth * numShapes)}
      height={symbolHeight + (borderWidth * 2)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {pattern}
      </defs>
      {shapes}
    </svg>
  );
}

function ovalSVG(id: number, color: string, shading: string, num: number): JSX.Element {
  const shape: JSX.Element = (
    <rect
      x={symbolBorder}
      y={symbolBorder}
      width={symbolWidth}
      height={symbolHeight}
      rx={symbolWidth / 2}
      ry={symbolWidth / 2}
      style={symbolStyle(id, color, shading, 1)}
    />
  );
  const scale: null = null;
  const shapes: JSX.Element[] = listSymbols(shape, num);
  const pattern: JSX.Element = stripedPattern(id, color, scale);
  return symbolsToSVG(shapes, scale, symbolBorder, pattern);
}

function diamond(id: number, color: string, shading: string, num: number) {
  const shape: JSX.Element = (
    <polygon
      points={`
        0,${symbolHeight / 2}
        ${symbolWidth / 2},0
        ${symbolWidth},${symbolHeight / 2}
        ${symbolWidth / 2},${symbolHeight}
      `}
      style={symbolStyle(id, color, shading, 1)}
    />
  );
  const scale: null = null;
  const shapes: JSX.Element[] = listSymbols(shape, num);
  const pattern: JSX.Element = stripedPattern(id, color, scale);
  return symbolsToSVG(shapes, scale, symbolBorder, pattern);
}

function kidney(id: number, color: string, shading: string, num: number) {
  const shape: JSX.Element = (
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
        style={symbolStyle(id, color, shading, 18)}
      />
    </g>
  );
  const shapes: JSX.Element[] = listSymbols(shape, num);
  const scale: number = 18;
  const pattern: JSX.Element = stripedPattern(id, color, scale);
  return symbolsToSVG(shapes, scale, (symbolBorder + 3), pattern);
}

function createSvg(id: number, color: string, shading: string, shape: string, num: number) {
  const symbols: JSX.Element[] = [];
  if (shape === 'kidney') {
    symbols.push(kidney(id, color, shading, num));
  } else if (shape === 'oval') {
    symbols.push(ovalSVG(id, color, shading, num));
  } else {
    symbols.push(diamond(id, color, shading, num));
  }
  var svg = ReactDOMServer.renderToStaticMarkup(symbols[0]);
  fs.writeFile(`test/${color}_${shading}_${shape}_${num}.svg`, svg, () => null);
}

// const deck = [];
const attributes = [
  ['red', 'green', 'purple'],
  ['solid', 'partial', 'none'],
  ['oval', 'kidney', 'diamond'],
  [1, 2, 3],
];

for (let i = 0; i < attributes[0].length; i++) {
  for (let j = 0; j < attributes[1].length; j++) {
    for (let k = 0; k < attributes[2].length; k++) {
      for (let l = 0; l < attributes[3].length; l++) {
        createSvg(
          i + (j * 10) + (k * 100) + (l * 1000),
          attributes[0][i] as string,
          attributes[1][j] as string,
          attributes[2][k] as string,
          attributes[3][l] as number,
        );
      }
    }
  }
}
