import * as React from 'react';
// import { style } from 'typestyle';
import Board from './Board';

interface Props {}

interface State {
  gameType: gameTypes | null;
}

export default class App extends React.Component<Props, State> {
  // private readonly classStyles = {
  //   board: style({
  //     height: '750px',
  //     width: '700px',
  //     margin: 'auto',
  //   }),
  // };

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
        <h1>Set</h1>
        <p>
          select 3 cards where for each attribute (color, shading, shape, and number) each card
          has all the same or all different values
        </p>
        <button onClick={() => this.startGame('original')}>Original game</button>
        <button onClick={() => this.startGame('triangles')}>Triangle World</button>
      </div>
    );
  }
}
