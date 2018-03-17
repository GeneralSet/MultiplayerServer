import * as React from 'react';
import * as io from 'socket.io-client';

interface State {
}

export default class App extends React.Component<{}, State> {
  private socket: SocketIOClient.Socket;

  constructor(props: {}) {
    super(props);
    this.socket = io('localhost:3001');
    console.log(this.socket);
  }

  render() {
    return (
      <div>
        multiPlayer
      </div>
    );
  }
}
