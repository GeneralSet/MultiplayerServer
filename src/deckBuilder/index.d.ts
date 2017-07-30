type Shape = JSX.Element;

interface SvgData {
  name: string;
  shape: Shape;
  width: number;
  height: number;
  border: number;
  fillScale: number | null;
  strokeScale: number;
}

interface DeckData {
  shapes: SvgData[];
  colors: string[];
  shadings: string[];
  numbers: number[];
}
