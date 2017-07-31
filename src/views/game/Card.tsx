import * as React from 'react';
import { style } from 'typestyle';
import UiCard from '../../components/Card';

export interface CardProps {
  features: string;
  selected: boolean;
  gameType: gameTypes;
}

export default class Card extends React.Component<CardProps, null> {
  private readonly classStyles = {
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
      <UiCard active={this.props.selected}>
        <div className={`${this.classStyles.content} ${this.props.features}`}>
          <img
            src={`${process.env.PUBLIC_URL}/decks/${this.props.gameType}/${this.props.features}.svg`}
            className={`${this.classStyles.image}`}
          />
        </div>
      </UiCard>
    );
  }
}
