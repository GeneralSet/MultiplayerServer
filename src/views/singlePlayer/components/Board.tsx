import * as React from 'react';
import { media, style } from 'typestyle';
import Card from './Card';

interface Props {
  endGame: () => void;
  gameType: gameTypes;
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

export default class Board extends React.Component<Props, State> {
  private boardSize = 12;
  private readonly featureOptions = 3;
  private readonly numberOfFeatures = 4;
  private readonly cardsForSet = 3;

  private readonly classStyles = {
    board: style(
      {
        width: '840px',
        margin: 'auto',
      },
      media({maxWidth: '860px'}, {width: '100%'}),
    ),
    flexCenter: style({
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    }),
    cardWrap: style({
      width: '210px',
    }),
  };

  constructor(props: Props) {
    super(props);

    const deck = this.initDeck();
    const updatedBoard = this.updateBoard(deck);
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
    this.verifySet = this.verifySet.bind(this);
    this.clearSelection = this.clearSelection.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
  }

  initDeck(): string[] {
    const deck = [];
    for (let i = 0; i < this.featureOptions; i++) {
      for (let j = 0; j < this.featureOptions; j++) {
        for (let k = 0; k < this.featureOptions; k++) {
          for (let l = 0; l < this.featureOptions; l++) {
            deck.push(`${i}_${j}_${k}_${l}`);
          }
        }
      }
    }
    return deck;
  }

  numberOfSets(board: string[]): number {
    let count = 0;
    for (let i = 0; i < board.length; i++) {
      for (let j = i + 1; j < board.length; j++) {
        for (let k = j + 1; k < board.length; k++) {
          const isValidSet = this._isSet([board[i], board[j], board[k]]);
          if (isValidSet) {
            count++;
          }
        }
      }
    }
    return count;
  }

  updateBoard(deck: string[]): {deck: string[], board: string[], numberOfSets: number} {
    const board = this.state ? this.state.board : [];
    let numberOfSets = this.state ? this.state.numberOfSets : 0;
    while (board.length < this.boardSize || numberOfSets < 1) {
      if (deck.length < 1) {
        break;
      }
      for (let i = 0 ; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * deck.length);
        board.push(deck[randomIndex]);
        deck.splice(randomIndex, 1);
      }
      if (board.length >= this.boardSize) {
        numberOfSets = this.numberOfSets(board);
      }
    }
    return {deck, board, numberOfSets};
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

  areAttributesNotEqual(features: string[]): boolean {
    for (var i = 0; i < features.length; i++) {
      for (var j = i + 1; j < features.length; j++) {
        if (features[i] === features[j]) {
          return false;
        }
      }
    }
    return true;
  }

  areAttributesEqual(features: string[]): boolean {
    for (var i = 1; i < features.length; i++) {
      if (features[i] !== features[i - 1]) {
        return false;
      }
    }
    return true;
  }

  clearSelection() {
    this.setState({selected: []});
  }

  _isSet(ids: string[]): boolean {
    const selectedFeatures = ids.map((id) => id.split('_'));
    for (let i = 0; i < this.numberOfFeatures; i++) {
      const attributeValues = selectedFeatures.map((features) => {
        return features[i];
      });
      if (!(this.areAttributesEqual(attributeValues) ||
            this.areAttributesNotEqual (attributeValues))) {
        return false;
      }
    }
    return true;

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
    const isValidSet = this._isSet(selected);
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

    const updatedBoad = this.updateBoard(deck);
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
          <button className="ui button" onClick={this.props.endGame}>Quit</button>
        </div>
        <div className={`${this.classStyles.board} ${this.classStyles.flexCenter}`}>
          {this.state.board.map((id: string, index: number) => {
            return (
              <a
                className={this.classStyles.cardWrap}
                onClick={() => this.selectCard(id, index)}
                key={index}
              >
                <Card
                  features={id}
                  selected={this.state.selected.includes(id)}
                  gameType={this.props.gameType}
                />
              </a>
            );
          })}
        </div>
      </div>
    );
  }
}
