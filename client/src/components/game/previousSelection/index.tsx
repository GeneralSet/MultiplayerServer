import * as React from 'react';
import autobind from 'autobind-decorator';
import Card from 'components/game/card';
import './index.css';

interface Props {
  cards: string[];
  gameType: gameType;
  message: string;
  success: boolean;
}

@autobind
export default class PreviousSelection extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
  }

  private cardDisplay(card: string, index: number): JSX.Element | null {
    return (
      <Card
        key={index}
        features={card}
        selected={false}
        gameType={this.props.gameType}
      />
    );
  }

  render() {
    if (this.props.cards.length <= 0) {
      return null;
    }
    return (
      <div className={`previous-selection ${this.props.success ? 'success' : 'error'}`}>
        <div className="message">{this.props.message}</div>
        <div className="cards">
          {this.props.cards.map(this.cardDisplay)}
        </div>
      </div>
    );
  }
}
