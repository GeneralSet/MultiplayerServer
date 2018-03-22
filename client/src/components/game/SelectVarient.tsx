import * as React from 'react';
import autobind from 'autobind-decorator';
import { style } from 'typestyle';
import Card from './Card';

export interface Props {
  onSlecet: (gameType: gameType) => void;
  selected?: gameType;
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
      minWidth: '30vh',
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
    active: style({
      backgroundColor: '#555',
      color: 'white',
      cursor: 'pointer',
    }),
  };

  constructor(props: Props) {
    super(props);
  }

  private gamePreviewButton(varient: SetVarient, index: number): JSX.Element | null {
    const linkClasses = [this.classStyles.selector];
    if (this.props.selected === varient.gameType) {
      linkClasses.push(this.classStyles.active);
    }
    return (
      <a
        className={linkClasses.join(' ')}
        onClick={() => this.props.onSlecet(varient.gameType)}
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
