import * as React from 'react';
import { style } from 'typestyle';
import UiCard from 'components/ui/Card';

interface Props {
  selected: boolean;
  features?: string;
  gameType?: gameType;
  svg?: JSX.Element;
}

export default class Card extends React.Component<Props, {}> {
  private readonly classStyles = {
    content: style({
      alignSelf: 'center',
      display: 'flex',
    }),
    image: style(
      {
        height: '10vh',
      },
    ),
  };

  constructor(props: Props) {
    super(props);
  }

  private image(): JSX.Element {
    if (this.props.svg) {
      return <div className={this.classStyles.image}>{this.props.svg}</div>;
    } else {
      return (
        <img
          src={`${process.env.PUBLIC_URL}/decks/${this.props.gameType}/${this.props.features}.svg`}
          className={`${this.classStyles.image}`}
        />
      );
    }
  }

  render() {
    return (
      <UiCard active={this.props.selected}>
        <div className={this.classStyles.content}>
          {this.image()}
        </div>
      </UiCard>
    );
  }
}
