import * as React from 'react';
import autobind from 'autobind-decorator';
import SelectVarient from 'components/game/SelectVarient';
import { RouteComponentProps } from 'react-router-dom';

@autobind
export default class SinglePlayer extends React.Component<RouteComponentProps<{}>, {}> {
  constructor(props: RouteComponentProps<{}>) {
    super(props);
  }

  private onClick(gameType: gameType) {
    this.props.history.push(`${this.props.match.url}/${gameType}`);
  }

  public render() {
    return <SelectVarient onClick={this.onClick}/>;
  }
}
