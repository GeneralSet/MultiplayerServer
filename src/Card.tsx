import * as React from 'react';
import './Card.css';

export interface CardProps {
  color: 'red' | 'green' | 'purple';
  shading: 'solid' | 'partial' | 'none';
  shape: 'oval' | 'kidney' | 'diamond';
  number: 1 | 2 | 3;
  selected: boolean;
}

export default class Card extends React.Component<CardProps, null> {

  constructor(props: CardProps) {
    super(props);
  }

  render() {
    return (
      <div className={`ui card ${ this.props.selected ? 'blue' : null}`}>
        <div className="content">
          <div className="description">
            <p>{this.props.color}</p>
            <p>{this.props.shading}</p>
            <p>{this.props.shape}</p>
            <p>{this.props.number}</p>
          </div>
        </div>
      </div>
    );
  }
}