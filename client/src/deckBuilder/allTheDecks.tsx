import GeometricDeckGenerator from './GeometricDeckGenerator';
import { patterns } from './features/patterns';
import { shapes } from './features/shapes';

const NUM_DECKS = 1;

function getRand<T>(options: T[]): T[] {
  const selected: T[] = [];
  let index = Math.floor(Math.random() * options.length);
  selected.push(options[index]);
  options = options.splice(index, 1);

  index = Math.floor(Math.random() * options.length);
  selected.push(options[index]);
  options = options.splice(index, 1);

  index = Math.floor(Math.random() * options.length);
  selected.push(options[index]);

  return selected;
}

const validNumbers = [1, 2, 3, 4, 5];
// const validShapes = Object.keys(shapes);
// const validShaddings = Object.keys(patterns);
const validColors = ['#ED254E', '#F9DC5C', '#011936'];

for (let i = 0; i < NUM_DECKS; i++) {
  const DECK_DATA = {
    // shapes: getRand(validShapes),
    shapes: [shapes.rightSideUp, shapes.right, shapes.upsideDown],
    colors: getRand(validColors),
    shadings: [patterns.open, patterns.striped, patterns.triangles],

    // shadings: getRand(validShaddings),
    numbers: getRand(validNumbers),
  };

  const generator = new GeometricDeckGenerator(DECK_DATA );
  generator.exportDeck(`./decks/${i}/`);
}
