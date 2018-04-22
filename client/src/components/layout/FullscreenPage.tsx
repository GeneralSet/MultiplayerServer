import * as React from 'react';
import Topbar from './Topbar';
import './fullscreenPage.css';

export default class FullscreenPage extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    return (
      <div className="fullscreen-page">
        <Topbar/>
        {this.props.children}
      </div>
    );
  }
}
