import React, { Component } from 'react'
import MessageList from './MessageList'
import MessageForm from './MessageForm'
import io from 'socket.io-client'


class Chatroom extends Component {

  constructor() {
    super()
    this.socket = io(`${window.location.hostname}:5001`)
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

  componentDidMount() {
    this.socket.on('message-created', (message)=>{
      console.log("something", message)
      this.setState({messages: [...this.state.messages, message]})
    })
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
