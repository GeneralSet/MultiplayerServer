import * as React from 'react';
import './App.css';
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
}

export default class App extends React.Component<Props, State> {

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
      points: 0
    };
    this.verifySet = this.verifySet.bind(this);
    this.clearSelection = this.clearSelection.bind(this);
    this.initBoard = this.initBoard.bind(this);
    this.startGame = this.startGame.bind(this);

  }

  initDeck(): CardProps[] {
    const deck = [];
    const colors = ['red', 'green', 'purple'];
    const shading = ['solid', 'partial', 'none'];
    const shape = ['oval', 'kidney', 'diamond'];
    const numbers = [1, 2, 3];
    for (let i = 0; i < colors.length; i++) {
      for (let j = 0; j < shading.length; j++) {
        for (let k = 0; k < shape.length; k++) {
          for (let l = 0; l < numbers.length; l++) {
            deck.push({
              id: i + j + k + l,
              color: colors[i],
              shading: shading[j],
              shape: shape[k],
              number: numbers[l],
              selected: false
            } as CardProps);
          }
        }
      }
    }
    return deck;
  }

  initBoard(deck: CardProps[]): void {
    const board = [];
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * deck.length);
      board.push(deck[randomIndex]);
      deck.splice(randomIndex, 1);
    }
    this.setState({deck, board});
  }

  startGame(): void {
    const deck = this.initDeck();
    this.initBoard(deck);
  }

  selectCard(card: CardProps, index: number) {
    const board = this.state.board;
    const selectedIds = this.state.selectedIds;
    if (!board[index].selected) {
      selectedIds.push(index);
    }
    if (selectedIds.length >= 3) {
      this.verifySet();
    } else {
      board[index].selected = !board[index].selected;
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

  verifySet() {
    const selectedIds = this.state.selectedIds;
    this.clearSelection();
    // ensure right num cards selected
    if (selectedIds.length < 3 ) {
      this.setState({
        alert: {isError: true, message: 'Error: not enough cards selected'}
      });
      return;
    }

    const attributes = ['color', 'shading', 'shape', 'number'];
    const selectedCards = selectedIds.map((id) => {
      return this.state.board[id];
    });

    // check for set
    for (let i = 0; i < attributes.length; i++) {
      const attributeValues = selectedCards.map((card) => {
        return card[attributes[i]];
      });
      if (!(this.areAttributesEqual(attributeValues) ||
            this.areAttributesNotEqual (attributeValues))) {
        this.setState({
          alert: {isError: true, message: `Not a set. ${attributes[i]} is bad`},
          points: this.state.points > 0 ? this.state.points - 1 : 0
        });
        return false;
      }
    }
    const board = this.state.board;
    selectedIds.forEach((id) => {
      board.splice(id, 1);
    });
    this.setState({
      alert: {isError: false, message: 'Set!'},
      points: this.state.points + 1,
      board
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
            has all the same or all diffrent values
          </p>
          <button onClick={this.startGame}>Start game</button>
        </div>
      );
    } else {
      return (
        <div className="App">
        <div className="title-bar">
          { this.state.alert.message ?
          (<div className={`ui ${this.state.alert.isError ? 'error' : 'positive'} message`}>
            {this.state.alert.message}
          </div>) : null
          }
          <span>Points: {this.state.points}</span>
        </div>
          {this.state.board.map((card: CardProps, i: number) => {
            return (
              <a onClick={() => this.selectCard(card, i)} key={i}>
                <Card {...card}/>
              </a>
            );
          })}
        </div>
      );
    }

  }
}
