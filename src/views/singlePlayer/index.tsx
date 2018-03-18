import * as React from 'react';
import Card from './components/Card';
import { style } from 'typestyle';
import { Link, match } from 'react-router-dom';

interface Props {
  match: match<{}>;
}

interface State {
}

export default class SinglePlayer extends React.Component<Props, State> {
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
    this.state = {
    };
  }

  private gamePreviewButton(varient: SetVarient, index: number): JSX.Element | null {
    if (!this.props.match.isExact) {
      return null;
    }
    return (
      <Link
        to={`${this.props.match.url}/${varient.gameType}`}
        key={index}
      >
        <div className={this.classStyles.selector}>
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
      </div>
      </Link>
    );
  }

  render() {
    return (
      <div className={this.classStyles.gameOptions}>
        {this.SetVarients.map((varient: SetVarient, index: number) => this.gamePreviewButton(varient, index))}
      </div>
    );
  }
}
