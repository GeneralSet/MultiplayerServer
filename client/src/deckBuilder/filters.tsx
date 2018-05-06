import { shapes } from './features/shapes';
import GeometricDeckGenerator from './GeometricDeckGenerator';
import { patterns } from './features/patterns';

const DECK_DATA: DeckData = {
  shapes: [shapes.rightSideUp, shapes.right, shapes.upsideDown],
  colors: ['#67fce9', '#009688', '#00443c'],
  shadings: [patterns.crinkle, patterns.ink, patterns.blur],
  numbers: [1, 2, 3]
};

const generator = new GeometricDeckGenerator(DECK_DATA);
generator.exportDeck('../../dist/decks/filters/');
