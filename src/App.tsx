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
  private readonly boardSize = 15;

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

  updateBoard(deck: CardProps[]): void {
    const board = [];
    while (board.length < this.boardSize) {
      for (let i = 0 ; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * deck.length);
        board.push(deck[randomIndex]);
        deck.splice(randomIndex, 1);
      }
    }
    // TODO: add check to see if borad contains a set
    this.setState({deck, board});
  }

  startGame(): void {
    const deck = this.initDeck();
    this.updateBoard(deck);
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
    console.log(selectedIndex);
    console.log(selectedIds);

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
          points: this.state.points - 1
        });
        return false;
      }
    }

    // Set found
    const board = this.state.board;
    const deck = this.state.deck;
    selectedIds.forEach((id) => {
      board.splice(id, 1);
    });
    // TODO: deduplicate board updating
    while (board.length < this.boardSize) {
      for (let i = 0 ; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * deck.length);
        board.push(deck[randomIndex]);
        deck.splice(randomIndex, 1);
      }
    }
    this.setState({
      alert: {isError: false, message: 'Set!'},
      points: this.state.points + 1,
      board, deck
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
          <table className="ui table">
            <tr>
              <td>Points</td>
              <td>{this.state.points}</td>
            </tr>
            <tr>
              <td>Remaining Cards</td>
              <td>{this.state.deck.length}</td>
            </tr>
          </table>
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
