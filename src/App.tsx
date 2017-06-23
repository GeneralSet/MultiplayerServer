import * as React from 'react';
import './App.css';
import Card, {CardProps} from './Card';

interface Props {}

interface State {
  board: CardProps[];
  selectedIds: number[];
  alert: {
    isError: boolean,
    message: string
  };
}

export default class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      board: this.initBoard(),
      selectedIds: [],
      alert: {
        isError: false,
        message: ''
      }
    };
    this.verifySet = this.verifySet.bind(this);
    this.clearSelection = this.clearSelection.bind(this);

  }

  initBoard(): CardProps[] {
    const board = [];
    const colors = ['red', 'green', 'purple'];
    const shading = ['solid', 'partial', 'none'];
    const shape = ['oval', 'kidney', 'diamond'];
    const numbers = [1, 2, 3];
    function randomElement(a: string[]|number[]) {
      return a[Math.floor(Math.random() * a.length)];
    }
    for (let i = 0; i < 12; i++) {
      board.push({
        id: i,
        color: randomElement(colors),
        shading: randomElement(shading),
        shape: randomElement(shape),
        number: randomElement(numbers),
        selected: false
      });
    }
    return board as CardProps[];
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
          alert: {isError: true, message: `Not a set. ${attributes[i]} is bad`}
        });
        return false;
      }
    }
    this.setState({
      alert: {isError: false, message: 'Set!'}
    });
    return true;
  }

  render() {
    return (
      <div className="App">
      <div className="title-bar">
        { this.state.alert.message ?
        (<div className={`ui ${this.state.alert.isError ? 'error' : 'positive'} message`}>
          {this.state.alert.message}
        </div>) : null
        }
      </div>
        {this.state.board.map((card: CardProps, i: number) => {
          return (
            <a onClick={() => this.selectCard(card, i)}>
              <Card {...card} key={i}/>
            </a>
          );
        })}
      </div>
    );
  }
}
