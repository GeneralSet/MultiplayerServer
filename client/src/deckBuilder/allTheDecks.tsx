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

const validNumbers = [1, 2, 3, 4, 5];
const validShapes = Object.values(shapes);
const validShaddings = Object.values(patterns);
const validColors = ['#ED254E', '#F9DC5C', '#011936'];

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
