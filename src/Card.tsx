import * as React from 'react';

interface Props {
  color: 'red' | 'green' | 'purole';
  shading: 'solid' | 'partial' | 'none';
  shape: 'oval' | 'kidney' | 'diamond';
  number: 1 | 2 | 3;
}

export default class Card extends React.Component<Props, null> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className="card">
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
