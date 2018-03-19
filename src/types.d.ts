type gameType = 'original' | 'triangles' | 'filters' | 'animations';

interface SetVarient {
  gameType: gameType;
  name: string;
}

interface GameState {
  deck: string[];
  board: string[];
  numberOfSets: number;
}

interface User {
  name: string;
  points: number;
}
