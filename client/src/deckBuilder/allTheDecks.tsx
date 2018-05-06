import GeometricDeckGenerator from './GeometricDeckGenerator';
import { patterns } from './features/patterns';
import { shapes } from './features/shapes';

const NUM_DECKS = 1;
const OPTIONS = 3;

function getRand<T>(options: T[]): T[] {
  const selected: T[] = [];
  while (selected.length < OPTIONS) {
    const index = Math.floor(Math.random() * options.length);
    if (!selected.includes(options[index])) {
      selected.push(options[index]);
    }
  }
  return selected;
}

function getRandColors(): string[] {
  const colors: string[] = [];
  while (colors.length < OPTIONS) {
    const color = '#' + (Math.random()*0xFFFFFF<<0).toString(16);
    if (!colors.includes(color)) {
      colors.push(color);
    }
  }
  return colors;
}

const validNumbers = [1, 2, 3, 4, 5];
const validShapes = Object.values(shapes);
const validShaddings = Object.values(patterns);
const validColors = getRandColors();

for (let i = 0; i < NUM_DECKS; i++) {
  const DECK_DATA = {
    shapes: getRand(validShapes),
    colors: getRand(validColors),
    shadings: getRand(validShaddings),
    numbers: getRand(validNumbers),
  };

  const generator = new GeometricDeckGenerator(DECK_DATA as any);
  generator.exportDeck(`./decks/${i}/`);
}
