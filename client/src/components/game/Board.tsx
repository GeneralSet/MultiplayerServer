import * as React from 'react';
import autobind from 'autobind-decorator';
import { media, style } from 'typestyle';
import Card from './Card';

interface Props {
  board: string[];
  selected: string[];
  gameType: gameType;
  onSelect: (id: string, index: number) => void;
}

@autobind
export default class Board extends React.Component<Props, {}> {

  private readonly classStyles = {
    board: style(
      {
        width: '840px',
        margin: 'auto',
      },
      media({maxWidth: '860px'}, {width: '100%'}),
    ),
    flexCenter: style({
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    }),
    cardWrap: style({
      width: '25vh',
    }),
  };

  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <div className={`${this.classStyles.board} ${this.classStyles.flexCenter}`}>
        {this.props.board.map((id: string, index: number) => {
          return (
            <a
              className={this.classStyles.cardWrap}
              onClick={() => this.props.onSelect(id, index)}
              key={index}
            >
              <Card
                features={id}
                selected={this.props.selected.includes(id)}
                gameType={this.props.gameType}
              />
            </a>
          );
        })}
      </div>
    );
  }
}
