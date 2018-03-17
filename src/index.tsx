import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { style } from 'typestyle';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import SinglePlayer from './views/singlePlayer';
import MultiPlayer from './views/multiPlayer';
import { Menu } from './views/menu';

class App extends React.Component<{}, {}> {
  private readonly classStyles = {
    background: style({
      backgroundImage: `url("setBox.svg")`,
      backgroundSize: 'cover',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    purpleCard: style({
      backgroundColor: '#ac86b9',
      width: '80%',
      height: '80%',
      borderRadius: '20px',
      border: '3px black solid',
    }),
    title: style({
      color: '#fff',
      padding: '20px 0',
      width: '100%',
      fontSize: '5em',
      textAlign: 'center'
    }),
  };

  constructor(props: {}) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <div className={this.classStyles.background}>
          <div className={this.classStyles.purpleCard}>
            <div className={this.classStyles.title}><Link to="/">SET</Link></div>
            <Route exact={true} path="/" component={Menu}/>
            <Route path="/single_player" component={SinglePlayer}/>
            <Route path="/multi_player" component={MultiPlayer}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
