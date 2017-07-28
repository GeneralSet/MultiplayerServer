import * as React from 'react';
import { style } from 'typestyle';

export interface CardProps {
  id: number;
  color: 'red' | 'green' | 'purple';
  shading: 'solid' | 'partial' | 'none';
  shape: 'oval' | 'kidney' | 'diamond';
  number: 1 | 2 | 3;
  selected: boolean;
}

export default class Card extends React.Component<CardProps, null> {
  private symbolBorder = 3;
  private symbolHeight = (100 - (this.symbolBorder * 2));
  private symbolWidth = (40 - (this.symbolBorder * 2));
  private readonly classStyles = {
    card: style({
      height: '90%',
      width: '90%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '10%',
      border: '1px #ccc solid',
      borderRadius: '5%',
    }),
    cardSelected: style({
      boxShadow: '0 2px 3px 0 #1678c2, 0 0 0 2px #1678c2',
    }),
    content: style({
      alignSelf: 'center',
      display: 'flex',
    }),
  };

  constructor(props: CardProps) {
    super(props);
  }

  symbolStyle(scale: number) {
    if (this.props.shading === 'solid') {
      return {
        fill: this.props.color,
        strokeWidth: 3 * scale,
        stroke: this.props.color,
      };
    } else if (this.props.shading === 'partial') {
      return {
        fill: `url(#pattern${this.props.id})`,
        strokeWidth: 3 * scale,
        stroke: this.props.color,
      };
    } else {
      return {
        strokeWidth: 3 * scale,
        stroke: this.props.color,
        fill: 'transparent'
      };
    }
  }

  stripedPattern(scale: number | null) {
    return (
      <pattern
        id={`pattern${this.props.id}`}
        width="8"
        height="10"
        patternUnits="userSpaceOnUse"
        patternTransform={`rotate(90) ${scale ? `scale(${scale})` : ''}`}
      >
        <line stroke={this.props.color} strokeWidth="5px" y2="15"/>
      </pattern>
    );
  }

  oval() {
    return (
      <div>
        <svg width={this.symbolWidth + 10} height={this.symbolHeight + 10}>
          <defs>
            {this.stripedPattern(null)}
          </defs>
          <rect
            x="5"
            y="5"
            width={this.symbolWidth}
            height={this.symbolHeight}
            rx={this.symbolWidth / 2}
            ry={this.symbolWidth / 2}
            style={this.symbolStyle(1)}
          />
        </svg>
      </div>
    );
  }

  diamond() {
    return (
      <div>
        <svg width={this.symbolWidth + 10} height={this.symbolHeight + 10}>
          <defs>
            {this.stripedPattern(null)}
          </defs>
          <polygon
            points={`
              0,${this.symbolHeight / 2}
              ${this.symbolWidth / 2},0
              ${this.symbolWidth},${this.symbolHeight / 2}
              ${this.symbolWidth / 2},${this.symbolHeight}
            `}
            style={this.symbolStyle(1)}
          />
        </svg>
      </div>
    );
  }

  kidney() {
    return (
      <div style={{width: this.symbolWidth + 10}}>
        <svg width="100%" height="100%" viewBox="0 0 1860 3880">
          <defs>
            {this.stripedPattern(18)}
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
            style={this.symbolStyle(18)}
          />
          </g>
        </svg>

      </div>
    );
  }

  render() {
    const symbols = [];
    for (let i = 0; i < this.props.number; i++) {
      if (this.props.shape === 'oval') {
        symbols.push(this.oval());
      } else if (this.props.shape === 'kidney') {
        symbols.push(this.kidney());
      } else {
        symbols.push(this.diamond());
      }
    }
    return (
      <div className={`${this.classStyles.card} ${ this.props.selected ? this.classStyles.cardSelected : ''}`}>
        <div
          className={`${this.classStyles.content} ${this.props.color}_${this.props.shading}_${this.props.shape}_${this.props.number}`}
        >
          {symbols}
        </div>
      </div>
    );
  }
}
