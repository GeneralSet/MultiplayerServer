import * as React from 'react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { actions } from './actions';
import { match, withRouter, RouteComponentProps } from 'react-router-dom';
import { ReduxState } from 'reducers';
import SelectVarient from 'components/game/SelectVarient';
import { setGameType, updateGame } from './api';

interface Props extends RouteComponentProps<{}> {
  match: match<{roomName: string, gameType: gameType}>;
}

interface ReduxProps extends Props {
  dispatch: Dispatch<Props>;
  socket: SocketIOClient.Socket;
  users: User[];
  gameType: gameType;
  gameState: GameState;
}

interface State {
}

@autobind
class Lobby extends React.Component<ReduxProps, State> {

  constructor(props: ReduxProps) {
    super(props);
    this.props.dispatch(setGameType(this.props.socket));
    this.props.dispatch(updateGame(this.props.socket));
  }

  private onSlecet(gameType: gameType): void {
    this.props.socket.emit(
      'setGameType',
      {roomName: this.props.match.params.roomName, gameType}
    );
    this.props.dispatch(actions.setGameType(gameType));
  }

  private play(event: React.MouseEvent<HTMLInputElement>): void {
    event.preventDefault();
    this.props.socket.emit(
      'startGame',
      {roomName: this.props.match.params.roomName}
    );
    this.props.history.push(
      `${this.props.match.url}/${this.props.gameType}`
    );
  }

  public render(): JSX.Element {
    return (
      <div>
        <div>Users:</div>
        <ul>
          {this.props.users.map((user, index) => <li key={index}>{user.name}</li>)}
        </ul>
        <SelectVarient
          onSlecet={this.onSlecet}
          selected={this.props.gameType}
        />
        <input type="button" value="Play" onClick={this.play}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Lobby));
