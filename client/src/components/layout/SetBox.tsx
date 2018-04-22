import * as React from 'react';
import Topbar from './Topbar';
import './setBox.css';

export default class SetBox extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    return (
      <div className="set-box-background">
        <div className="set-box-purple-card">
          <Topbar/>
          {this.props.children}
        </div>
      </div>
    );
  }
}
