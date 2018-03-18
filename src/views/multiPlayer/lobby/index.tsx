import * as React from 'react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { match, withRouter, RouteComponentProps } from 'react-router-dom';
import { ReduxState } from 'reducers';

interface Props extends RouteComponentProps<{}> {
  match: match<{}>;
}

interface ReduxProps extends Props {
  dispatch: Dispatch<Props>;
  socket: SocketIOClient.Socket;
  users: string[];
}

interface State {
}

@autobind
class Lobby extends React.Component<ReduxProps, State> {

  constructor(props: ReduxProps) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ul>
        {this.props.users.map((user, index) => <li key={index}>{user}</li>)}
      </ul>
    );
  }
}

function mapStateToProps(state: ReduxState, _ownProps: Props) {
  return state.multiPlayer;
}

function mapDispatchToProps(dispatch: Dispatch<Props>) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Lobby));
