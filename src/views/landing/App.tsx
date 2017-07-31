import * as React from 'react';
import Board from '../game/Board';
import GameSelect from './components/GameSelect';

interface Props {}

interface State {
  gameType: gameTypes | null;
}

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      gameType: null,
    };
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
  }

  startGame(gameType: gameTypes): void {
    this.setState({gameType});
  }

  endGame(): void {
    this.setState({gameType: null});
  }

  render() {
    if (this.state.gameType !== null) {
      return (
        <Board
          endGame={this.endGame}
          gameType={this.state.gameType}
        />
      );
    }
    return (
      <div>
        <h1>SET</h1>
        <h4>Object:</h4>
        <p>
          To identify SETs of three cards where each individual feature is either all the same OR
          all diffrent on all three cards.
        </p>
        <p>
          Features:
        </p>
        <ul>
          <li>Color</li>
          <li>Shape</li>
          <li>Number</li>
          <li>Shading</li>
        </ul>
        <GameSelect startGame={this.startGame}/>
      </div>
    );
  }
}
