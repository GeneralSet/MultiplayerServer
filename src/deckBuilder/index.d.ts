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

type ShadingFunction = (shape: Shape, color: string,  scale: number | null) => JSX.Element;

interface DeckData {
  shapes: SvgData[];
  colors: string[];
  shadings: ShadingFunction[];
  numbers: number[];
}
