import * as React from 'react';
import { style } from 'typestyle';
import Card, {CardProps} from './Card';

interface Props {}

interface State {
  board: CardProps[];
  selectedIds: number[];
  deck: CardProps[];
  alert: {
    isError: boolean,
    message: string
  };
  points: number;
  numberOfSets: number;
}

export default class App extends React.Component<Props, State> {
  private boardSize = 12;
  private readonly attributes = ['color', 'shading', 'shape', 'number'];
  private readonly classStyles = {
    board: style({
      height: '750px',
      width: '700px',
      margin: 'auto',
    }),
    flexCenter: style({
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    }),
    cardWrap: style({
      width: '175px',
      height: '250px',
    }),
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      deck: [],
      board: [],
      selectedIds: [],
      alert: {
        isError: false,
        message: ''
      },
      numberOfSets: 0,
      points: 0
    };
    this.verifySet = this.verifySet.bind(this);
    this.clearSelection = this.clearSelection.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  initDeck(): CardProps[] {
    const deck = [];
    const attributes = [
      ['red', 'green', 'purple'],
      ['solid', 'partial', 'none'],
      ['oval', 'kidney', 'diamond'],
      [1, 2, 3],
    ];
    for (let i = 0; i < attributes[0].length; i++) {
      for (let j = 0; j < attributes[1].length; j++) {
        for (let k = 0; k < attributes[2].length; k++) {
          for (let l = 0; l < attributes[3].length; l++) {
            deck.push({
              id: i + (j * 10) + (k * 100) + (l * 1000),
              color: attributes[0][i],
              shading: attributes[1][j],
              shape: attributes[2][k],
              number: attributes[3][l],
              selected: false
            } as CardProps);
          }
        }
      }
    }
    return deck;
  }

  numberOfSets(board: CardProps[]): number {
    let count = 0;
    for (let i = 0; i < board.length; i++) {
      for (let j = i + 1; j < board.length; j++) {
        for (let k = j + 1; k < board.length; k++) {
          const isValidSet = this._isSet(
            [board[i], board[j], board[k]]
          );
          if (isValidSet) {
            count++;
          }
        }
      }
    }
    return count;
  }

  updateBoard(deck: CardProps[]): {deck: CardProps[], board: CardProps[], numberOfSets: number} {
    const board = [];
    let numberOfSets = 0;
    while (board.length < this.boardSize && numberOfSets < 1) {
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

  startGame(): void {
    const deck = this.initDeck();
    this.setState(this.updateBoard(deck));
  }

  selectCard(card: CardProps, selectedIndex: number) {
    const board = this.state.board;
    const selectedIds = this.state.selectedIds;

    // update selected cards
    if (board[selectedIndex].selected) {
      selectedIds.forEach(function(cardId: number, i: number) {
        if (cardId === selectedIndex) {
          selectedIds.splice(i, 1);
        }
      });
    } else {
      selectedIds.push(selectedIndex);
    }

    // update board
    if (selectedIds.length >= 3) {
      this.verifySet();
    } else {
      board[selectedIndex].selected = !board[selectedIndex].selected;
      this.setState({board, selectedIds});
    }
  }

  areAttributesNotEqual(attributes: string[]): boolean {
    const len = attributes.length;
    for (var i = 0; i < len; i++) {
      for (var j = i + 1; j < len; j++) {
        if (attributes[i] === attributes[j]) {
          return false;
        }
      }
    }
    return true;
  }

  areAttributesEqual(attributes: string[]): boolean {
    const len = attributes.length;
    for (var i = 1; i < len; i++) {
      if (attributes[i] !== attributes[i - 1]) {
        return false;
      }
    }
    return true;
  }

  clearSelection() {
    const board = this.state.board;
    this.state.selectedIds.forEach((id) => {
      board[id].selected = false;
    });
    this.setState({board, selectedIds: []});
  }

  _isSet(cards: CardProps[]): boolean {
    for (let i = 0; i < this.attributes.length; i++) {
      const attributeValues = cards.map((card) => {
        return card[this.attributes[i]];
      });
      if (!(this.areAttributesEqual(attributeValues) ||
            this.areAttributesNotEqual (attributeValues))) {
        return false;
      }
    }
    return true;

  }

  verifySet(): boolean {
    const selectedIds = this.state.selectedIds;
    this.clearSelection();
    // ensure right num cards selected
    if (selectedIds.length < 3 ) {
      this.setState({
        alert: {isError: true, message: 'Error: not enough cards selected'}
      });
      return false;
    }

    const selectedCards = selectedIds.map((id) => {
      return this.state.board[id];
    });

    // check for set
    const isValidSet = this._isSet(selectedCards);
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
    selectedIds.forEach((id) => {
      board.splice(id, 1);
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
    if (!this.state.deck.length && !this.state.board.length) {
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
        <div className="App">
          <div className={this.classStyles.flexCenter}>
            { this.state.alert.message ?
            (<div className={`ui ${this.state.alert.isError ? 'error' : 'positive'} message`}>
              {this.state.alert.message}
            </div>) : null
            }
            <button className="ui button" onClick={() => this.clearSelection()}>Clear</button>
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
          <div className={`${this.classStyles.board} ${this.classStyles.flexCenter}`}>
            {this.state.board.map((card: CardProps, i: number) => {
              return (
                <a className={this.classStyles.cardWrap} onClick={() => this.selectCard(card, i)} key={i}>
                  <Card {...card}/>
                </a>
              );
            })}
          </div>
        </div>
      );
    }

  }
}
