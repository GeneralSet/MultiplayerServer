import * as React from 'react';
import autobind from 'autobind-decorator';
import Board from 'components/game/board';
import PreviousSelection from 'components/game/previousSelection';
import { match } from 'react-router-dom';
import { Set } from 'Set';
import FullscreenPage from 'components/layout/FullscreenPage';
import './index.css';

interface Props {
  match: match<{gameType: gameType}>;
}

interface State {
  board: string[];
  selected: string[];
  previousSelection: string[];
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

  constructor(props: Props) {
    super(props);
    this.set = new Set();
    const deck = this.set.initDeck();
    const updatedBoard = this.set.updateBoard(deck, [], 0);
    this.state = {
      deck: updatedBoard.deck,
      board: updatedBoard.board,
      selected: [],
      previousSelection: [],
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
        alert: {isError: true, message: 'Error: not enough cards selected'},
        previousSelection: selected
      });
      return false;
    }

    // check for set
    const isValidSet = this.set.isSet(selected);
    if (!isValidSet) {
      this.setState({
        alert: {isError: true, message: `-1 Not a set.`},
        points: this.state.points - 1,
        previousSelection: selected
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
      alert: {isError: false, message: '+1 Set!'},
      points: this.state.points + 1,
      board: updatedBoad.board,
      deck: updatedBoad.deck,
      numberOfSets: updatedBoad.numberOfSets,
      previousSelection: selected
    });
    return true;
  }

  render() {
    return (
      <FullscreenPage>
        <div>
          <div className="score-board">
            <table className="ui table">
              <tbody>
                <tr>
                  <td>{this.state.points}</td>
                  <td>Points</td>
                </tr>
                <tr>
                  <td>{this.state.deck.length}</td>
                  <td>Cards Remaining</td>
                </tr>
                <tr>
                  <td>{this.state.numberOfSets}</td>
                  <td>Sets on the Board</td>
                </tr>
              </tbody>
            </table>
            <PreviousSelection
              cards={this.state.previousSelection}
              gameType={this.props.match.params.gameType}
              message={this.state.alert.message}
              success={!this.state.alert.isError}
            />
          </div>
          <Board
            board={this.state.board}
            selected={this.state.selected}
            gameType={this.props.match.params.gameType}
            onSelect={this.selectCard}
          />
        </div>
      </FullscreenPage>
    );
  }
}