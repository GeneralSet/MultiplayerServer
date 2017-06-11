import * as React from 'react';
import './App.css';
import Card, {CardProps} from './Card';

interface Props {}

interface State {
  board: CardProps[];
  selectedIds: number[];
}

export default class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      board: this.initBoard(),
      selectedIds: []
    };
    this.verifySet = this.verifySet.bind(this);

  }

  initBoard(): CardProps[] {
    return [
      {color: 'red', shading: 'solid', shape: 'oval', number: 1, selected: false},
      {color: 'red', shading: 'solid', shape: 'oval', number: 1, selected: false},
      {color: 'green', shading: 'partial', shape: 'kidney', number: 2, selected: false},
      {color: 'purple', shading: 'none', shape: 'diamond', number: 3, selected: false},
      {color: 'red', shading: 'solid', shape: 'oval', number: 1, selected: false},
      {color: 'red', shading: 'solid', shape: 'oval', number: 1, selected: false},
      {color: 'green', shading: 'partial', shape: 'kidney', number: 2, selected: false},
      {color: 'purple', shading: 'none', shape: 'diamond', number: 3, selected: false},
      {color: 'red', shading: 'solid', shape: 'oval', number: 1, selected: false},
      {color: 'red', shading: 'solid', shape: 'oval', number: 1, selected: false},
      {color: 'green', shading: 'partial', shape: 'kidney', number: 2, selected: false},
      {color: 'purple', shading: 'none', shape: 'diamond', number: 3, selected: false},
    ];
  }

  selectCard(card: CardProps, index: number) {
    const board = this.state.board;
    const selectedIds = this.state.selectedIds;
    if (!board[index].selected) {
      selectedIds.push(index);
    }
    if (selectedIds.length > 3) {
      const oldestId = selectedIds.shift();
      if (oldestId === undefined || !board[oldestId].selected) {
        console.error('ERROR: selected ids queue has run a muck');
        return;
      }
      board[oldestId].selected = false;
    }
    board[index].selected = !board[index].selected;
    this.setState({board, selectedIds});
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

  verifySet() {
    if (this.state.selectedIds.length < 3 ) {
      alert('not set');
      return;
    }
    const attributes = ['color', 'shading', 'shape', 'number'];
    const selectedCards = this.state.selectedIds.map((id) => {
      return this.state.board[id];
    });
    for (let i = 0; i < attributes.length; i++) {
      if (!(this.areAttributesEqual([
        selectedCards[0][attributes[i]],
        selectedCards[1][attributes[i]],
        selectedCards[2][attributes[i]]
      ]) || this.areAttributesNotEqual ([
        selectedCards[0][attributes[i]],
        selectedCards[1][attributes[i]],
        selectedCards[2][attributes[i]]
      ]))) {
        alert(`not set ${attributes[i]} no good`);
        return false;
      }
    }
    alert('set');
    return true;
  }

  render() {
    return (
      <div className="App">
        <div className="title-bar"><a onClick={this.verifySet}>Set!</a></div>
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
