import * as React from 'react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { style } from 'typestyle';
import Board from 'components/game/Board';
import { match, withRouter, RouteComponentProps } from 'react-router-dom';
import { ReduxState } from 'reducers';
import { onUsers, updateGame } from './api';

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
  selected: string[];
  alert: {
    isError: boolean,
    message: string
  };
}

@autobind
class Game extends React.Component<ReduxProps, State> {
  private readonly cardsForSet = 3;
  private readonly classStyles = {
    flexCenter: style({
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    }),
  };

  constructor(props: ReduxProps) {
    super(props);
    this.state = {
      selected: [],
      alert: {
        isError: false,
        message: ''
      },
    };
    this.props.dispatch(onUsers(this.props.socket));
    this.props.dispatch(updateGame(this.props.socket));
  }

  public clearSelection(): void {
    this.setState({selected: []});
  }

  public selectCard(id: string, selectedIndex: number): void {
    const selected = this.state.selected;

    // update selected cards
    if (selected.includes(id)) {
      selected.forEach((cardId: string, index: number) => {
        if (cardId === id) {
          selected.splice(index, 1);
        }
      });
    } else {
      selected.push(id);
    }

    // update board
    if (selected.length >= this.cardsForSet) {
      // TODO verify set on server and update game state
      this.clearSelection();
      this.props.socket.emit(
        'verifySet',
        {roomName: this.props.match.params.roomName, selected}
      );

    } else {
      this.setState({selected});
    }
  }

  public render(): JSX.Element {
    if (!this.props.gameState.board || this.props.gameState.board.length < 1) {
      return <div>loading...</div>;
    }
    return (
      <div>
        <div className="App">
          <div className={this.classStyles.flexCenter}>
            <div>Users:</div>
            <ul>
              {this.props.users.map((user, index) => <li key={index}>{user.name}: {user.points}</li>)}
            </ul>
            { this.state.alert.message ?
            (<div className={`ui ${this.state.alert.isError ? 'error' : 'positive'} message`}>
              {this.state.alert.message}
            </div>) : null
            }
            <button className="ui button" onClick={this.clearSelection}>Clear selection</button>
            <table className="ui table">
              <tbody>
                <tr>
                  <td>Remaining Cards</td>
                  <td>{this.props.gameState.deck.length}</td>
                </tr>
                <tr>
                  <td>Number of sets</td>
                  <td>{this.props.gameState.numberOfSets}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Board
            board={this.props.gameState.board}
            selected={this.state.selected}
            gameType={this.props.match.params.gameType}
            onSelect={this.selectCard}
          />
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Game));
