import * as React from 'react';
import { style } from 'typestyle';

export interface CardProps {
  features: string;
  selected: boolean;
  gameType: gameTypes;
}

export default class Card extends React.Component<CardProps, null> {
  private readonly classStyles = {
    card: style({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '5px',
      padding: '10%',
      border: '1px #ccc solid',
      borderRadius: '5%',
    }),
    cardSelected: style({
      boxShadow: '0 2px 3px 0 #1678c2, 0 0 0 2px #1678c2',
    }),
    content: style({
      alignSelf: 'center',
      display: 'flex',
    }),
    image: style({
      height: '80px',
    }),
  };

  constructor(props: CardProps) {
    super(props);
  }

  render() {
    return (
      <div className={`${this.classStyles.card} ${ this.props.selected ? this.classStyles.cardSelected : ''}`}>
        <div className={`${this.classStyles.content} ${this.props.features}`}>
          <img
            src={`/decks/${this.props.gameType}/${this.props.features}.svg`}
            className={`${this.classStyles.image}`}
          />
        </div>
      </div>
    );
  }
}
