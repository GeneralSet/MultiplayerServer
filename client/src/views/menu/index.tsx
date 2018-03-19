import * as React from 'react';
import { style } from 'typestyle';
import { Link, match } from 'react-router-dom';

interface Props {
  match: match<{}>;
}

interface State {
}

export class Menu extends React.Component<Props, State> {
  private readonly classStyles = {
    nav: style({
      display: 'grid',
      width: '200px',
      margin: '0 auto'
    }),
    navItem: style({
      justifySelf: 'center',
      textAlign: 'center',
      padding: '10px 0'
    }),

  };

  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }

  render(): JSX.Element {
    return (
        <nav className={this.classStyles.nav}>
          <Link to="/single_player">
            <div className={this.classStyles.navItem}>Single Player</div>
          </Link>
          <Link to="/multi_player">
            <div className={this.classStyles.navItem}>Multi Player</div>
          </Link>
        </nav>
    );
  }
}
