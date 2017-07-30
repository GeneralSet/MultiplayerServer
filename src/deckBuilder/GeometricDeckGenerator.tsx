var fs = require('fs');
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

export default class GeometricDeckGenerator {
  deckData: DeckData;
  readonly attributeLength = 3;
  readonly symbolGap = 20;

  constructor(deckData: DeckData) {
    this.validateDeck(deckData);
    this.deckData = deckData;
  }

  private validateDeck(deckData: DeckData): void {
    if (
      deckData.shapes.length !== this.attributeLength ||
      deckData.colors.length !== this.attributeLength ||
      deckData.shadings.length !== this.attributeLength ||
      deckData.numbers.length !== this.attributeLength
    ) {
      throw `Invalid deck data all attributes must have ${this.attributeLength} options`;
    }
  }

  private validateAttributes(attr1: number, attr2: number, attr3: number, attr4: number): void {
    if (!
      (attr1 >= 0 && attr1 < this.attributeLength) &&
      (attr2 >= 0 && attr2 < this.attributeLength) &&
      (attr3 >= 0 && attr3 < this.attributeLength) &&
      (attr4 >= 0 && attr4 < this.attributeLength)
    ) {
      throw `
        Invalid value given for attribute.
        Attributes must be in the range of 0 - ${this.attributeLength - 1}
      `;
    }
  }

  private addStrokeStyle(shape: Shape, color: string, scale: number) {
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

  private addFillStyle(shape: Shape, color: string, shading: string, scale: number | null) {
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

  private listSymbols(symbol: JSX.Element, length: number, shape: SvgData): JSX.Element[] {
    const symbolList: JSX.Element[] = [];
    for (let i = 0; i < length; i++) {
      symbolList.push(
        <g
          transform={`translate(${i * (shape.width + this.symbolGap)})`}
          key={i}
        >
          {symbol}
        </g>
      );
    }
    return symbolList;
  }

  private symbolsToSVG(
    shapes: JSX.Element[],
    scale: number | null,
    shape: SvgData,
  ): JSX.Element {
    const numShapes: number = shapes.length;
    return (
      <svg
        width={((numShapes * (shape.width + this.symbolGap ))) + (shape.border * numShapes)}
        height={shape.height + (shape.border * 2)}
        xmlns="http://www.w3.org/2000/svg"
      >
        {shapes}
      </svg>
    );
  }

  private createSvg(
    color: string,
    shading: string,
    shape: SvgData,
    num: number
  ): JSX.Element {
    const shapePattern = this.addFillStyle(shape.shape, color, shading, shape.fillScale);
    const shapePatternColor = this.addStrokeStyle(shapePattern, color, shape.strokeScale);
    const shapes = this.listSymbols(shapePatternColor, num, shape);
    return this.symbolsToSVG(shapes, shape.fillScale, shape);
  }

  public exportDeck() {
    for (let i = 0; i < this.attributeLength; i++) {
      for (let j = 0; j < this.attributeLength; j++) {
        for (let k = 0; k < this.attributeLength; k++) {
          for (let l = 0; l < this.attributeLength; l++) {
            const filename = `${i}_${j}_${k}_${l}`;
            const symbol = this.createSvg(
              this.deckData.colors[i],
              this.deckData.shadings[j],
              this.deckData.shapes[k],
              this.deckData.numbers[l],
            );
            const svg = ReactDOMServer.renderToStaticMarkup(symbol);
            fs.writeFile(`public/decks/original/${filename}.svg`, svg, () => null);
          }
        }
      }
    }
  }

  public createSymbol(attr1: number, attr2: number, attr3: number, attr4: number) {
    this.validateAttributes(attr1, attr2, attr3, attr4);
    this.createSvg(
      this.deckData.colors[attr1],
      this.deckData.shadings[attr2],
      this.deckData.shapes[attr3],
      this.deckData.numbers[attr4],
    );
  }
}
