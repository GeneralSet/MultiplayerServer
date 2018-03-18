import * as React from 'react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { onUsers } from './api';
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
  roomName: string;
  username: string;
}

@autobind
class MultiPlayer extends React.Component<ReduxProps, State> {

  constructor(props: ReduxProps) {
    super(props);

    this.state = {
      roomName: 'test',
      username: 'tim',
    };
    this.props.dispatch(onUsers(this.props.socket));
  }

  setRoomName(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({roomName: event.target.value});
  }

  setUsername(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({username: event.target.value});
  }

  host(event: React.MouseEvent<HTMLInputElement>): void {
    event.preventDefault();
    this.props.socket.emit('createRoom', {username: this.state.username, roomName: this.state.roomName});
    // this.props.history.push(`${this.props.match.url}/${this.state.roomName}`);
  }

  join(event: React.MouseEvent<HTMLInputElement>): void {
    event.preventDefault();
    this.props.socket.emit('join', {username: this.state.username, roomName: this.state.roomName});
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
          {this.props.users.map(user => <li key={user}>{user}</li>)}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state: ReduxState, _ownProps: Props) {
  return state.multiPlayer;
}

function mapDispatchToProps(dispatch: Dispatch<Props>) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MultiPlayer));
