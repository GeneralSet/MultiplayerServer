import * as React from 'react';
import './App.css';
import Card from './Card';

export default class App extends React.Component<{}, null> {
  render() {
    return (
      <div className="App">
        <Card color="red" shading="solid" shape="oval" number={1}/>
      </div>
    );
  }
}
