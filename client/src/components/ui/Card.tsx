import * as React from 'react';
import './card.css';

export interface CardProps {
  active: boolean;
  children: JSX.Element;
}

export default class Card extends React.Component<CardProps, {}> {
  constructor(props: CardProps) {
    super(props);
  }

  render() {
    const active = this.props.active ? 'active' : '';
    return (
      <div className={`card ${active}`}>
        {this.props.children}
      </div>
    );
  }
}
