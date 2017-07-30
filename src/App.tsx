import * as React from 'react';
// import { style } from 'typestyle';
import Board from './Board';

interface Props {}

interface State {
  showLanding: boolean;
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
      showLanding: true,
    };
    this.startGame = this.startGame.bind(this);
  }

  startGame(): void {
    this.setState({showLanding: true});
  }

  render() {
    if (!this.state.showLanding) {
      return (
        <div>
          <h1>Set</h1>
          <p>
            select 3 cards where for each attribute (color, shading, shape, and number) each card
            has all the same or all different values
          </p>
          <button onClick={this.startGame}>Start game</button>
        </div>
      );
    } else {
      return (
        <Board/>
      );
    }

  }
}
