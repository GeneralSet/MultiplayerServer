
interface Shape {
  name?: string;
  shape: JSX.Element;
  width: number;
  height: number;
  border: number;
  fillScale: number | null;
  strokeScale: number;
}

type ShadingFunction = (shape: JSX.Element, color: string,  scale: number | null) => JSX.Element;

interface DeckData {
  shapes?: Shape[];
  colors?: string[];
  shadings?: ShadingFunction[];
  numbers?: number[];
  animation?: JSX.Element[];
}

type ValidFeatures = 'shapes' | 'colors' | 'shadings' | 'numbers' | 'animation';

interface CardData {
  shapes?: Shape;
  colors?: string;
  shadings?: ShadingFunction;
  numbers?: number;
  animation?: JSX.Element;
}

// jsx types hack

declare namespace JSX {
  interface IntrinsicElements {
    'animateTransform': React.SVGProps<SVGElement>;
  }
}
