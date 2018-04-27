import * as React from 'react';
import autobind from 'autobind-decorator';
import Card from 'components/game/card';
import './index.css';

interface Props {
  onSlecet: (gameType: gameType) => void;
  selected?: gameType;
}

@autobind
export default class SelectVarient extends React.Component<Props, {}> {
  private readonly SetVarients: SetVarient[] = [
    {
      gameType: 'original',
      name: 'Original',
    },
    {
      gameType: 'triangles',
      name: 'Triangles',
    },
    {
      gameType: 'filters',
      name: 'Filters',
    },
    {
      gameType: 'animations',
      name: 'Animations',
    },
    {
      gameType: 'custom',
      name: 'Custom',
    },
  ];

  constructor(props: Props) {
    super(props);
  }

  private gamePreviewButton(varient: SetVarient, index: number): JSX.Element | null {
    const linkClasses = ['game-selector'];
    if (this.props.selected === varient.gameType) {
      linkClasses.push('active');
    }
    return (
      <a
        className={linkClasses.join(' ')}
        onClick={() => this.props.onSlecet(varient.gameType)}
        key={index}
      >
        <h4>{varient.name}</h4>
        <div className="cards">
          <Card
            features="2_2_2_2"
            selected={false}
            gameType={varient.gameType}
          />
          <Card
            features="1_1_1_1"
            selected={false}
            gameType={varient.gameType}
          />
          <Card
            features="0_0_0_0"
            selected={false}
            gameType={varient.gameType}
          />
        </div>
      </a>
    );
  }

  render() {
    return (
      <div className="game-options">
        {this.SetVarients.map(this.gamePreviewButton)}
      </div>
    );
  }
}
