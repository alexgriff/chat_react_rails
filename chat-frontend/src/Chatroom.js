import React, { Component } from 'react'
import MessageList from './MessageList'
import MessageForm from './MessageForm'

class Chatroom extends Component {

  constructor() {
    super()
    this.state = {
      messages: [
        {
          id: 1,
          username: 'jj',
          chatroom_id: 1,
          content: 'hello world',
        }
      ]
    }
  }

  handleMessageCreate(msgState) {
    console.log(msgState);
  }

  render() {
    return (
      <div className="Chatroom">
        <MessageList messages={this.state.messages} />
        <MessageForm onSubmit={(msgState) => this.handleMessageCreate(msgState)}/>
      </div>
    )
  }
}

export default Chatroom
