import * as React from 'react';
import autobind from 'autobind-decorator';
import { style } from 'typestyle';
import Board from 'components/game/Board';
import { match } from 'react-router-dom';
import { Set } from 'Set';

interface Props {
  match: match<{gameType: gameType}>;
}

interface State {
  board: string[];
  selected: string[];
  deck: string[];
  alert: {
    isError: boolean,
    message: string
  };
  points: number;
  numberOfSets: number;
}

@autobind
export default class Game extends React.Component<Props, State> {
  private set: Set;
  private readonly cardsForSet = 3;

  private readonly classStyles = {
    flexCenter: style({
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    }),
  };

  constructor(props: Props) {
    super(props);
    this.set = new Set();
    const deck = this.set.initDeck();
    const updatedBoard = this.set.updateBoard(deck, [], 0);
    this.state = {
      deck: updatedBoard.deck,
      board: updatedBoard.board,
      selected: [],
      alert: {
        isError: false,
        message: ''
      },
      numberOfSets: updatedBoard.numberOfSets,
      points: 0
    };
  }

  selectCard(id: string, selectedIndex: number) {
    const board = this.state.board;
    const selected = this.state.selected;

    // update selected cards
    if (selected.includes(id)) {
      selected.forEach((cardId: string, index: number) => {
        if (cardId === id) {
          selected.splice(index, 1);
        }
      });
    } else {
      selected.push(id);
    }

    // update board
    if (selected.length >= this.cardsForSet) {
      this.verifySet();
    } else {
      this.setState({board, selected});
    }
  }

  clearSelection() {
    this.setState({selected: []});
  }

  verifySet(): boolean {
    const selected = this.state.selected;
    this.clearSelection();
    // ensure right num cards selected
    if (selected.length < this.cardsForSet) {
      this.setState({
        alert: {isError: true, message: 'Error: not enough cards selected'}
      });
      return false;
    }

    // check for set
    const isValidSet = this.set.isSet(selected);
    if (!isValidSet) {
      this.setState({
        alert: {isError: true, message: `Not a set.`},
        points: this.state.points - 1
      });
      return false;
    }

    // Set found
    const board = this.state.board;
    const deck = this.state.deck;
    selected.forEach((id) => {
      board.splice(board.indexOf(id), 1);
    });

    const updatedBoad = this.set.updateBoard(deck, this.state.board, this.state.numberOfSets);
    this.setState({
      alert: {isError: false, message: 'Set!'},
      points: this.state.points + 1,
      board: updatedBoad.board,
      deck: updatedBoad.deck,
      numberOfSets: updatedBoad.numberOfSets
    });
    return true;
  }

  render() {
    return (
      <div className="App">
        <div className={this.classStyles.flexCenter}>
          { this.state.alert.message ?
          (<div className={`ui ${this.state.alert.isError ? 'error' : 'positive'} message`}>
            {this.state.alert.message}
          </div>) : null
          }
          <button className="ui button" onClick={this.clearSelection}>Clear selection</button>
          <table className="ui table">
            <tbody>
              <tr>
                <td>Points</td>
                <td>{this.state.points}</td>
              </tr>
              <tr>
                <td>Remaining Cards</td>
                <td>{this.state.deck.length}</td>
              </tr>
              <tr>
                <td>Number of sets</td>
                <td>{this.state.numberOfSets}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Board
          board={this.state.board}
          selected={this.state.selected}
          gameType={this.props.match.params.gameType}
          onSelect={this.selectCard}
        />
      </div>
    );
  }
}
