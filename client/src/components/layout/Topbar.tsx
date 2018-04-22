import * as React from 'react';
import { Link } from 'react-router-dom';
import './topbar.css';

export default class Topbar extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    return (
      <div className="topbar-title">
        <Link
          to="/"
          className="logo"
        >
          GeneralSet.io
        </Link>
      </div>
    );
  }
}
