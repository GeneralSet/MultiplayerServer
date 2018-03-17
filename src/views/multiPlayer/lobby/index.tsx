import * as React from 'react';
import autobind from 'autobind-decorator';

interface Props {
  socket: SocketIOClient.Socket;
}

interface State {
  users: string[];
}

@autobind
export default class MultiPlayer extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      users: [],
    };
    this.props.socket.on('users', (users: string[]) => this.setState({users}));
  }

  render() {
    return (
      <ul>
        {this.state.users.map(user => <li key="user">user</li>)}
      </ul>
    );
  }
}
