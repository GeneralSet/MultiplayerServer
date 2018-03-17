import * as React from 'react';
import Board from './components/Board';
import GameSelect from './components/GameSelect';

interface State {
  gameType: gameTypes | null;
}

export default class App extends React.Component<{}, State> {
  constructor(props: {}) {
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
        <GameSelect startGame={this.startGame}/>
      </div>
    );
  }
}
