import * as React from 'react';
import './Card.css';

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
  private symbolHeight = (250 - (this.symbolBorder * 2));
  private symbolWidth = (100 - (this.symbolBorder * 2));

  constructor(props: CardProps) {
    super(props);
  }

  symbolStyle() {
    if (this.props.shading === 'solid') {
      return {
        fill: this.props.color,
        strokeWidth: 3,
        stroke: this.props.color,
      };
    } else if (this.props.shading === 'partial') {
      return {
        fill: `url(#pattern${this.props.id})`,
        strokeWidth: 3,
        stroke: this.props.color,
      };
    } else {
      return {
        strokeWidth: 3,
        stroke: this.props.color,
        fill: 'transparent'
      };
    }
  }

  stripedPattern() {
    return (
      <pattern
        id={`pattern${this.props.id}`}
        width="8"
        height="10"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(90)"
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
            {this.stripedPattern()}
          </defs>
          <rect
            x="5"
            y="5"
            width={this.symbolWidth}
            height={this.symbolHeight}
            rx={this.symbolWidth / 2}
            ry={this.symbolWidth / 2}
            style={this.symbolStyle()}
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
            {this.stripedPattern()}
          </defs>
          <polygon
            points={`
              0,${this.symbolHeight / 2}
              ${this.symbolWidth / 2},0
              ${this.symbolWidth},${this.symbolHeight / 2}
              ${this.symbolWidth / 2},${this.symbolHeight}
            `}
            style={this.symbolStyle()}
          />
        </svg>
      </div>
    );
  }

  kidney() {
    return (
      <div>
        <svg width={this.symbolWidth + 10} height={this.symbolHeight + 10}>
          <defs>
            {this.stripedPattern()}
          </defs>
          <path
            d={`
              m 33,180 c 6,-13 11,-23 26,-28 15,-5 31,-1 58,7 23,7 36,0 43,-3 7,-4 17,-9 30,-9
              13,0 18,21 12,33 -5,11 -14,23 -26,28 -12,5 -32,1 -59,-7 -17,-5 -29,-3 -42,3 -9,4
              -18,10 -30,9 -13,0 -19,-18 -12,-33 z
            `}
            transform="translate(30) rotate(90 100 100)"
            style={this.symbolStyle()}
          />
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
      <div className={`ui card ${ this.props.selected ? 'blue' : ''}`}>
        <div className="content">
          {symbols}
        </div>
      </div>
    );
  }
}
