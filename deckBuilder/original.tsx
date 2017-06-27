// TODO: should be able to remove id

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

function stripedPattern(id: number, color: string, scale: number | null) {
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

function oval(id: number, color: string, shading: string, num: number) {
  return (
    <div>
      <svg width={symbolWidth + 10} height={symbolHeight + 10}>
        <defs>
          {stripedPattern(id, color, null)}
        </defs>
        <rect
          x="5"
          y="5"
          width={symbolWidth}
          height={symbolHeight}
          rx={symbolWidth / 2}
          ry={symbolWidth / 2}
          style={symbolStyle(id, color, shading, 1)}
        />
      </svg>
    </div>
  );
}

function diamond(id: number, color: string, shading: string, num: number) {
  return (
    <div>
      <svg width={symbolWidth + 10} height={symbolHeight + 10}>
        <defs>
          {stripedPattern(id, color, null)}
        </defs>
        <polygon
          points={`
            0,${symbolHeight / 2}
            ${symbolWidth / 2},0
            ${symbolWidth},${symbolHeight / 2}
            ${symbolWidth / 2},${symbolHeight}
          `}
          style={symbolStyle(id, color, shading, 1)}
        />
      </svg>
    </div>
  );
}

function kidney(id: number, color: string, shading: string, num: number) {
  return (
    <div style={{width: symbolWidth + 10}}>
      <svg width="100%" height="100%" viewBox="0 0 1860 3880">
        <defs>
          {stripedPattern(id, color, 18)}
        </defs>
        <g transform="translate(-500)">
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
      </svg>

    </div>
  );
}

function createSvg(id: number, color: string, shading: string, shape: string, num: number) {
  const symbols = [];
  for (let i = 0; i < num; i++) {
    if (shape === 'oval') {
      symbols.push(oval(id, color, shading, num));
    } else if (shape === 'kidney') {
      symbols.push(kidney(id, color, shading, num));
    } else {
      symbols.push(diamond(id, color, shading, num));
    }
  }
  // TODO: export as svg
}

const deck = [];
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
