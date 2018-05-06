import GeometricDeckGenerator from './GeometricDeckGenerator';
import { patterns } from './features/patterns';
import { shapes } from './features/shapes';

const NUM_DECKS = 1;

function shuffle(array: any): any {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function getRand<T>(options: T[]): T[] {
  const selected: T[] = [];
  // let index = Math.floor(Math.random() * options.length);
  selected.push(options[0]);
  // const options1 = options.splice(0, 1);

  // const index1 = Math.floor(Math.random() * options1.length);
  selected.push(options[1]);
  // const options2 = options1.splice(1, 1);

  // const index3 = Math.floor(Math.random() * options.length);
  selected.push(options[2]);

  return selected;
}

const validNumbers = [1, 2, 3, 4, 5];
const validShapes = Object.values(shapes);
const validShaddings = Object.values(patterns);
const validColors = ['#ED254E', '#F9DC5C', '#011936'];

for (let i = 0; i < NUM_DECKS; i++) {
  const DECK_DATA = {
    shapes: getRand(shuffle(validShapes)),
    colors: getRand(shuffle(validColors)),
    shadings: getRand(shuffle(validShaddings)),
    numbers: getRand(shuffle(validNumbers)),
  };

  const generator = new GeometricDeckGenerator(DECK_DATA as any);
  generator.exportDeck(`./decks/${i}/`);
}
