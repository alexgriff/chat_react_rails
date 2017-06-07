import React, { Component } from 'react';
import Chatroom from './components/Chatroom'

class App extends Component {
  constructor() {
    super()

    this.state = {
      selectedChatroom: 1,
      chatrooms: []
    }
  }

  render() {
    return (
      <div className="ui grid container">
        <Chatroom cableApp={this.props.cableApp} selectedChatroom={this.state.selectedChatroom} />
      </div>
    );
  }
}

export default App;
