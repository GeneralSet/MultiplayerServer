import GeometricDeckGenerator from './GeometricDeckGenerator';
import { patterns } from './features/patterns';
import { shapes } from './features/shapes';

const DECK_DATA: DeckData = {
  shapes: [shapes.rightSideUp, shapes.right, shapes.upsideDown],
  colors: ['#ED254E', '#F9DC5C', '#011936'],
  shadings: [patterns.open, patterns.triangles, patterns.gradient],
  numbers: [1, 3, 5]
};

const generator = new GeometricDeckGenerator(DECK_DATA);
generator.exportDeck('../../dist/decks/triangles/');
