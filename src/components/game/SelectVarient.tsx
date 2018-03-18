import * as React from 'react';
import autobind from 'autobind-decorator';
import { style } from 'typestyle';
import Card from './Card';

export interface Props {
  onClick: (gameType: gameType) => void;
}

@autobind
export default class SelectVarient extends React.Component<Props, {}> {
  private readonly SetVarients: SetVarient[] = [
    {
      gameType: 'original',
      name: 'Original Game',
    },
    {
      gameType: 'triangles',
      name: 'Tubular Triangles',
    },
    {
      gameType: 'filters',
      name: 'Fantastic Filters',
    },
    {
      gameType: 'animations',
      name: 'Awesome Animations',
    },
  ];
  private readonly classStyles = {
    gameOptions: style({
      display: 'flex',
      textAlign: 'center',
    }),
    selector: style({
      minWidth: '200px',
      padding: '10px',
      margin: '10px',
      border: '1px solid #ccc',
      $nest: {
       '&:hover': {
         backgroundColor: '#555',
         color: 'white',
         cursor: 'pointer',
       },
       '&:focus': {
         backgroundColor: '#555',
         color: 'white',
         cursor: 'pointer',
       }
     }
    }),
  };

  constructor(props: Props) {
    super(props);
  }

  private gamePreviewButton(varient: SetVarient, index: number): JSX.Element | null {
    return (
      <a
        className={this.classStyles.selector}
        onClick={() => this.props.onClick(varient.gameType)}
        key={index}
      >
        <h4>{varient.name}</h4>
        <Card
          features="0_0_0_0"
          selected={false}
          gameType={varient.gameType}
        />
        <Card
          features="1_1_1_1"
          selected={false}
          gameType={varient.gameType}
        />
        <Card
          features="2_2_2_2"
          selected={false}
          gameType={varient.gameType}
        />
      </a>
    );
  }

  render() {
    return (
      <div className={this.classStyles.gameOptions}>
        {this.SetVarients.map(this.gamePreviewButton)}
      </div>
    );
  }
}
