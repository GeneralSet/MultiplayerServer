var fs = require('fs');
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

export default class GeometricDeckGenerator {
  private deckData: DeckData;
  private features: ValidFeatures[];
  private readonly numFeatures = 4;
  private readonly featureOptionsLength = 3;
  private readonly symbolGap = 20;
  private readonly validFeatures: ValidFeatures[] = [
    'shapes', 'colors', 'shadings', 'numbers', 'animation'
  ];

  constructor(deckData: DeckData) {
    this.features = this.getFeatures(deckData);
    this.deckData = deckData;
  }

  private getFeatures(deckData: DeckData): ValidFeatures[] {
    const features: ValidFeatures[] = [];
    this.validFeatures.forEach((feature) => {
      const featureOptions = deckData[feature];
      if (typeof featureOptions === 'undefined') {
        return;
      }
      if (featureOptions.length !== this.featureOptionsLength) {
        throw `
          Invalid deck data.
          All attributes must have ${this.featureOptionsLength} options.
          ${feature} has ${featureOptions.length} options.
        `;
      }
      features.push(feature);
    });
    if (features.length !== this.numFeatures) {
      throw `Invalid deck data. Given ${this.numFeatures} features`;
    }
    return features;
  }

  private validateFeatureOptions(featureOptions: number[]): void {
    for (let i = 0; i < this.numFeatures; i++) {
      const value = featureOptions[i];
      if (!(value && (value >= 0) && (value < this.featureOptionsLength))) {
        throw `
          Invalid value given for attribute.
          Attributes must be in the range of 0 - ${this.featureOptionsLength - 1}
        `;
      }
    }
  }

  private addStrokeStyle(shape: JSX.Element, color: string, scale: number) {
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

  private listSymbols(symbol: JSX.Element, length: number, shape: Shape): JSX.Element[] {
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
    shape: Shape,
  ): JSX.Element {
    const numShapes: number = shapes.length;
    const width = ((numShapes * (shape.width + this.symbolGap ))) + (shape.border * numShapes);
    const height = shape.height + (shape.border * 2);
    return (
      <svg
        height="100%"
        width="100%"
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {shapes}
      </svg>
    );
  }

  private createSvg(cardData: CardData): JSX.Element {
    const color = cardData.colors;
    const shading = cardData.shadings;
    const shape = cardData.shapes;
    const num = cardData.numbers;
    if (!(color && shading && shape && num)) {
      throw 'error attributes does not exist when it should :(';
    }
    const shapePattern = shading(shape.shape, color, shape.fillScale);
    const shapePatternColor = this.addStrokeStyle(shapePattern, color, shape.strokeScale);
    const shapes = this.listSymbols(shapePatternColor, num, shape);
    return this.symbolsToSVG(shapes, shape.fillScale, shape);
  }

  private createCardData(features: number[]): CardData {
    const cardData: CardData = {};
    for (let i = 0; i < this.numFeatures; i++) {
      const feature = this.features[i];
      const optionValue = features[i];
      const f = this.deckData[feature];
      if (!f) {
        throw 'error attributes does not exist when it should :(';
      }
      cardData[feature] = f[optionValue];
    }
    return cardData;
  }

  public exportDeck(path: string): void {
    for (let i = 0; i < this.featureOptionsLength; i++) {
      for (let j = 0; j < this.featureOptionsLength; j++) {
        for (let k = 0; k < this.featureOptionsLength; k++) {
          for (let l = 0; l < this.featureOptionsLength; l++) {
            const filename = `${i}_${j}_${k}_${l}`;
            const cardData = this.createCardData([i, j, k, l]);
            const symbol = this.createSvg(cardData);
            const svg = ReactDOMServer.renderToStaticMarkup(symbol);
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path);
            }
            fs.writeFile(`${path}${filename}.svg`, svg, () => null);
          }
        }
      }
    }
  }

  public arrayDeck(): FeatureDeck {
    const deck: FeatureDeck = {};
    for (let i = 0; i < this.featureOptionsLength; i++) {
      for (let j = 0; j < this.featureOptionsLength; j++) {
        for (let k = 0; k < this.featureOptionsLength; k++) {
          for (let l = 0; l < this.featureOptionsLength; l++) {
            const filename = `${i}_${j}_${k}_${l}`;
            const cardData = this.createCardData([i, j, k, l]);
            const symbol = this.createSvg(cardData);
            deck[filename] = symbol;
          }
        }
      }
    }
    return deck;
  }

  public createSymbol(features: number[]): JSX.Element {
    this.validateFeatureOptions(features);
    return this.createSvg(this.createCardData(features));
  }
}
