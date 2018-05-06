import * as React from 'react';
import './index.css';

interface Props {
  selected: boolean;
  hint?: boolean;
  features?: string;
  gameType?: gameType;
  svg?: JSX.Element;
}

export default class Card extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  private image(): JSX.Element {
    if (this.props.svg) {
      return <div className="card-image">{this.props.svg}</div>;
    } else {
      return (
        <img
          src={`/decks/${this.props.gameType}/${this.props.features}.svg`}
          className="card-image"
        />
      );
    }
  }

  render() {
    const selected = this.props.selected ? 'selected' : '';
    const hint = this.props.hint ? 'hint' : '';

    return (
      <div className={`card ${selected} ${hint}`}>
        <div className="card-content">
          {this.image()}
        </div>
      </div>
    );
  }
}
