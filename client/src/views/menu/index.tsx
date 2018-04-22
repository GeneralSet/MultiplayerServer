import * as React from 'react';
import { Link, match } from 'react-router-dom';
import SetBox from 'components/layout/SetBox';
import './index.css';

interface Props {
  match: match<{}>;
}

interface State {
}

export class Menu extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }

  render(): JSX.Element {
    return (
      <SetBox>
        <nav className="main-nav">
          <Link to="/single_player" className="main-nav-item">
            Single Player
          </Link>
          <Link to="/multi_player" className="main-nav-item">
            Multi Player
          </Link>
        </nav>
      </SetBox>
    );
  }
}
