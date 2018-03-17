import * as React from 'react';
import autobind from 'autobind-decorator';
import * as io from 'socket.io-client';
// import Lobby from './lobby';
// import { Route, match, withRouter } from 'react-router-dom';
import { match, withRouter } from 'react-router-dom';

interface Props {
  history: any;
  match: match<{}>;
}

interface State {
  roomName: string;
  username: string;
  users: string[];
}

@autobind
class MultiPlayer extends React.Component<Props, State> {
  private socket: SocketIOClient.Socket;

  constructor(props: Props) {
    super(props);
    this.socket = io('localhost:3001');

    this.state = {
      roomName: 'test',
      username: 'tim',
      users: [],
    };
    this.socket.on('users', (users: string[]) => this.setState({users}));
  }

  setRoomName(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({roomName: event.target.value});
  }

  setUsername(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({username: event.target.value});
  }

  host(event: any): void {
    event.preventDefault();
    this.socket.emit('createRoom', {username: this.state.username, roomName: this.state.roomName});
    // this.props.history.push(`${this.props.match.url}/${this.state.roomName}`);
  }

  join(event: any): void {
    event.preventDefault();
    this.socket.emit('join', {username: this.state.username, roomName: this.state.roomName});
    // this.props.history.push(`${this.props.match.url}/${this.state.roomName}`);
  }

  render() {
    return (
      <div>
        multiPlayer
        <div>
          <h3>Host</h3>
          <form>
            <label>
              Room name
              <input value={this.state.roomName} onChange={this.setRoomName}/>
            </label>
            <br/>
            <label>
              Username
              <input value={this.state.username} onChange={this.setUsername}/>
            </label>
            <br/>
            <input type="submit" value="Host" onClick={this.host}/>
          </form>
        </div>
        <div>
          <h3>Join</h3>
          <form>
            <label>
              Room name
              <input value={this.state.roomName} onChange={this.setRoomName}/>
            </label>
            <br/>
            <label>
              Username
              <input value={this.state.username} onChange={this.setUsername}/>
            </label>
            <br/>
            <input type="submit" value="Join" onClick={this.join}/>
          </form>
        </div>
        {/* <Route
          path={`${this.props.match.url}/:roomName`}
          render={() => <Lobby socket={this.socket}/>}
        /> */}
        <ul>
          {this.state.users.map(user => <li key={user}>{user}</li>)}
        </ul>
      </div>
    );
  }
}

export default withRouter(MultiPlayer as any);
