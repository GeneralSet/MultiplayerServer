import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import SinglePlayer from './views/singlePlayer';
import MultiPlayer from './views/multiPlayer';

const Home = () => (
  <div>
    <h4>Object:</h4>
    <p>
      To identify SETs of three cards where each individual feature is either all the same OR
      all diffrent on all three cards.
    </p>
    <p>
      Features:
    </p>
    <ul>
      <li>Color</li>
      <li>Shape</li>
      <li>Number</li>
      <li>Shading</li>
    </ul>
    <ul>
      <li><Link to="/single_player">Single Player</Link></li>
      <li><Link to="/multi_player">Multi Player</Link></li>
    </ul>
  </div>
);

export default class App extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div>
          <header>
            <Link to="/">
              <h1>Set</h1>
            </Link>
          </header>
          <Route exact={true} path="/" component={Home}/>
          <Route path="/single_player" component={SinglePlayer}/>
          <Route path="/multi_player" component={MultiPlayer}/>
        </div>
      </Router>
    );
  }
}
