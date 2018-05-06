import GeometricDeckGenerator from './GeometricDeckGenerator';
import { patterns } from './features/patterns';
import { shapes } from './features/shapes';

const DECK_DATA: DeckData = {
  shapes: [shapes.scale, shapes.middle, shapes.fade],
  colors: ['red', 'green', 'purple'],
  shadings: [patterns.open, patterns.striped, patterns.triangles],
  numbers: [1, 2, 3]
};

const generator = new GeometricDeckGenerator(DECK_DATA);
generator.exportDeck('../../dist/decks/animations/');
