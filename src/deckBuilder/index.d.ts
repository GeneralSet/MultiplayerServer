type Shape = JSX.Element;

interface SvgData {
  name: string;
  shape: Shape;
  fillScale: number | null;
  strokeScale: number;
}

interface DeckData {
  shapes: SvgData[];
  colors: string[];
  shadings: string[];
  numbers: number[];
}
