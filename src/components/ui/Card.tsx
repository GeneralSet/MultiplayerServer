import * as React from 'react';
import { style } from 'typestyle';

export interface CardProps {
  active: boolean;
  children: JSX.Element;
}

export default class Card extends React.Component<CardProps, {}> {
  private readonly classStyles = {
    card: style({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '5px',
      padding: '10%',
      border: '1px #ccc solid',
      borderRadius: '5%',
      backgroundColor: 'white'
    }),
    active: style({
      boxShadow: '0 2px 3px 0 #1678c2, 0 0 0 2px #1678c2',
    }),
  };

  constructor(props: CardProps) {
    super(props);
  }

  render() {
    const active = this.props.active ? this.classStyles.active : '';
    return (
      <div className={`${this.classStyles.card} ${active}`}>
        {this.props.children}
      </div>
    );
  }
}
